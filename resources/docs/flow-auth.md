# Flujo de Autenticación - Banking App

## Índice
1. [Arquitectura General](#arquitectura-general)
2. [Autenticación de Usuario](#autenticación-de-usuario)
3. [Sistema de Tokens](#sistema-de-tokens)
4. [Recuperación de Cuenta](#recuperación-de-cuenta)
5. [Invalidación de Tokens](#invalidación-de-tokens)
6. [Interacción entre Módulos](#interacción-entre-módulos)
7. [Diagramas de Flujo](#diagramas-de-flujo)

---

## Arquitectura General

### Módulos Principales del Sistema de Seguridad

- **Auth Module**: Gestión de autenticación y sesiones
- **Proofs Module**: Verificación mediante códigos OTT (One-Time Token)
- **Recoveries Module**: Recuperación de contraseña y PIN
- **Blacklist Service**: Invalidación de tokens
- **User Sessions Service**: Gestión de sesiones de usuario

---

## Autenticación de Usuario

### 1. Registro de Usuario (`POST /auth/register`)

**Flujo:**
- Usuario envía datos de registro (`CreateUserDto`)
- `UserManagerService` crea el nuevo usuario en la base de datos
- Contraseña se hashea con bcrypt antes de guardarse
- Usuario queda en estado `registerStep` inicial

**Datos requeridos:**
- Email
- Contraseña
- Información personal

---

### 2. Login de Usuario (`POST /auth/login`)

**Flujo paso a paso:**

1. **Validación de credenciales**
   - Usuario envía email y contraseña
   - `AuthService.checkUserCredentials()` busca el usuario por email
   - Compara contraseña hasheada usando bcrypt
   - Si falla: lanza `UnauthorizedException`

2. **Creación de sesión**
   - `UserSessionsService.create()` genera nueva sesión
   - Registra metadata (IP, dispositivo)
   - Sesión se guarda en SQLite (cold storage)
   - Retorna `sessionId` único

3. **Generación de Refresh Token**
   - `refreshTokenService` (JWT) firma el token
   - Payload incluye: `sessionId`, `userId`, datos del usuario
   - Token se almacena en cookie HttpOnly
   - Expiración configurada en `USER_REFRESH_TOKEN_EXPIRATION` (días)

4. **Respuesta**
   - Cookie `refreshToken` con flags de seguridad:
     - `httpOnly: true` (no accesible desde JavaScript)
     - `secure: true` (solo HTTPS en producción)
     - `sameSite: 'strict'` (protección CSRF)
   - Datos del usuario (sin password/pinCode)

**Código clave:**
```typescript
async loginUser(basicCredentialsDto: BasicCredentialsDto, metadata) {
  const db_user = await this.checkUserCredentials(basicCredentialsDto);
  const userSession = await this.userSessionsService.create({
    userId: db_user.id, ...metadata
  });
  const token = this.refreshTokenService.sign({ 
    sessionId: userSession.id, 
    ...result 
  });
  return { ...result, token };
}
```

---

### 3. Creación de Sesión Activa (`POST /auth/session`)

**Propósito:** Sistema de doble autenticación - el usuario ya está logueado pero necesita validar con PIN para acciones sensibles.

**Flujo:**

1. **Protección con Refresh Token**
   - Guard `RefreshTokenAuthGuard` valida cookie `refreshToken`
   - Extrae usuario y `sessionId` del token

2. **Validación de PIN**
   - Usuario envía `pinCode`
   - `AuthService.checkPinCode()` valida PIN hasheado
   - Si falla: lanza `UnauthorizedException`

3. **Generación de Access Token**
   - `accessTokenService` firma nuevo token
   - Payload: datos usuario + `sessionId`
   - Expiración más corta: `USER_ACCESS_TOKEN_EXPIRATION` (minutos)

4. **Almacenamiento**
   - Cookie `accessToken` con mismas medidas de seguridad
   - Expira en minutos (sesión de trabajo activa)

**Diferencias clave:**
- **Refresh Token**: Larga duración, solo para renovar acceso
- **Access Token**: Corta duración, para operaciones del sistema

---

### 4. Logout (`POST /auth/logout`)

**Flujo completo:**

1. **Validación**
   - Guard `RefreshTokenAuthGuard` verifica token válido
   - Extrae `userId` y `sessionId`

2. **Invalidación de tokens**
   - `BlacklistService.revokeToken()` añade `sessionId` a blacklist (Redis)
   - TTL configurado según tipo de token
   - Tokens quedan invalidados hasta su expiración natural

3. **Eliminación de sesión**
   - `UserSessionsService.revoke()` elimina sesión de SQLite
   - Sesión ya no existe en registros históricos

4. **Limpieza de cookies**
   - Se eliminan cookies `refreshToken` y `accessToken`
   - Flags `httpOnly` y `secure` mantenidos

**Código:**
```typescript
async logoutUser(userId: string, sessionId: string) {
  await this.blacklistService.revokeToken(sessionId, "refreshToken");
  await this.userSessionsService.revoke(sessionId);
}
```

---

## Sistema de Tokens

### Tipos de Tokens

#### 1. Refresh Token
- **Propósito**: Mantener sesión del usuario logueado
- **Duración**: Días (configurado en `USER_REFRESH_TOKEN_EXPIRATION`)
- **Almacenamiento**: Cookie HttpOnly
- **Uso**: Login inicial, renovación de sesiones
- **Payload**: `sessionId`, `userId`, datos usuario

#### 2. Access Token
- **Propósito**: Autorización para operaciones sensibles
- **Duración**: Minutos (configurado en `USER_ACCESS_TOKEN_EXPIRATION`)
- **Almacenamiento**: Cookie HttpOnly
- **Uso**: Transacciones, cambios de configuración
- **Requiere**: Validación adicional con PIN

#### 3. Recovery Token
- **Propósito**: Recuperación de contraseña/PIN
- **Duración**: Minutos (configurado en `USER_RECOVERY_TOKEN_EXPIRATION`)
- **Almacenamiento**: Bearer token (header Authorization)
- **Uso**: Reset de credenciales
- **Payload**: `userId`, `codeId`, `userAction`

### Estrategias JWT

Cada tipo de token tiene su propia estrategia Passport:

```typescript
// Refresh Token Strategy
class RefreshTokenStrategy extends JwtStrategyFactory(
  'REFRESH_TOKEN_STRATEGY',
  'refreshToken',
  envs.USER_REFRESH_TOKEN_SECRET,
)

// Access Token Strategy  
class AccessTokenStrategy extends JwtStrategyFactory(
  'ACCESS_TOKEN_STRATEGY',
  'accessToken',
  envs.USER_ACCESS_TOKEN_SECRET,
)

// Recovery Token Strategy
class RecoveryTokenStrategy extends JwtStrategyFactory(
  'RECOVERY_TOKEN_STRATEGY',
  'recoveryToken',
  envs.USER_RECOVERY_TOKEN_SECRET,
  'bearer'
)
```

### Validación de Tokens

**Proceso común en todas las estrategias:**

1. **Extracción del token**
   - Cookies (refreshToken, accessToken)
   - Bearer header (recoveryToken)

2. **Verificación de firma**
   - JWT verifica con secret correspondiente
   - Valida expiración automáticamente

3. **Verificación en blacklist**
   ```typescript
   async validate(payload: any) {
     const isTokenRevoked = await this.blacklistService.isTokenRevoked(payload.tokenId);
     if (isTokenRevoked) throw new UnauthorizedException('token invalid');
     return payload;
   }
   ```

4. **Retorno del payload**
   - Si válido: datos disponibles en `request.user`
   - Si inválido: `UnauthorizedException`

---

## Recuperación de Cuenta

### Flujo Completo de Recuperación

#### Paso 1: Solicitud de Código OTT (`POST /proofs/send-ott`)

**Proceso:**

1. **Entrada**
   - Email del usuario
   - `userAction`: tipo de acción (`"reset-password"` o `"reset-pin-code"`)

2. **Generación de código**
   - `SecurityCodeDao.createByUserId()` genera código único
   - Código se hashea con bcrypt
   - Se guarda en base de datos con:
     - `userId`
     - `userAction`
     - `used: false`
     - Timestamp de creación

3. **Envío de email**
   - `EmailSenderService.sendVerificationCode()` envía email
   - Incluye: nombre usuario, código, tipo de acción

4. **Seguridad**
   - Errores genéricos para evitar info leakage
   - No revela si el email existe o no

**Código:**
```typescript
async sendVerificationCode(userEmail: string, userAction: UserAction) {
  const db_user = await this.userDao.getUserByEmail(userEmail);
  const { code } = await this.securityCodeDao.createByUserId(db_user.id, userAction);
  
  await this.emailSender.sendVerificationCode(db_user.email, {
    firstName: db_user.firstName,
    lastName: db_user.lastName,
    code,
    userAction
  });
}
```

---

#### Paso 2: Verificación de Código (`POST /proofs/verify-code`)

**Proceso:**

1. **Validaciones**
   - Usuario existe por email
   - Código de seguridad existe para ese usuario y acción
   - Código no ha sido usado (`used: false`)
   - Código no ha expirado (tiempo < `USER_RECOVERY_TOKEN_EXPIRATION`)

2. **Comparación de código**
   ```typescript
   const checkCode = await bcrypt.compare(code, db_security_code.code);
   if (!checkCode) throw new UnauthorizedException('your code is invalid');
   ```

3. **Generación de Recovery Token**
   - JWT firmado con `USER_RECOVERY_TOKEN_SECRET`
   - Payload:
     ```typescript
     {
       id: userId,
       codeId: securityCodeId,
       userAction: "reset-password" | "reset-pin-code"
     }
     ```

4. **Marcado de código como usado**
   - `used: true` en base de datos
   - Código no puede reutilizarse

5. **Respuesta**
   - Token en formato Bearer
   - Usuario debe enviarlo en header `Authorization`

---

#### Paso 3: Reset de Contraseña (`PATCH /recovery/reset-password`)

**Protección:** `RecoveryTokenAuthGuard`

**Proceso:**

1. **Validación de token**
   - Guard extrae `RecoveryUserData` del token
   - Verifica que `userAction === "reset-password"`

2. **Validación de código**
   ```typescript
   const db_security_code = await this.securityCodeDao.getByUserId(data.id, data.userAction);
   if (db_security_code.id !== data.codeId)
     throw new UnauthorizedException("invalid security code");
   ```

3. **Actualización de contraseña**
   - Nueva contraseña se hashea con bcrypt (salt rounds: 10)
   - Se actualiza en base de datos

4. **Limpieza**
   - Security code se elimina de base de datos
   - Recovery token queda invalidado

**Código:**
```typescript
async resetUserPassword(data: RecoveryUserData, newPassword: string) {
  const db_security_code = await this.securityCodeDao.getByUserId(data.id, data.userAction);
  if (db_security_code.id !== data.codeId)
    throw new UnauthorizedException("invalid security code");
  
  const password = await bcrypt.hash(newPassword, 10);
  
  await this.userDao.update(data.id, { password }).save();
  await this.securityCodeDao.delete(db_security_code.id);
}
```

---

#### Paso 4: Reset de PIN (`PATCH /recovery/reset-pin-code`)

**Proceso idéntico a reset-password pero:**
- `userAction === "reset-pin-code"`
- Actualiza campo `pinCode` en lugar de `password`
- Mismo proceso de validación y limpieza

---

### Medidas de Seguridad en Recuperación

1. **Códigos de un solo uso**
   - Flag `used` previene reutilización
   - Eliminación tras uso exitoso

2. **Expiración temporal**
   - Códigos expiran en minutos
   - Validación de timestamp en verificación

3. **Tokens de corta duración**
   - Recovery tokens expiran rápido
   - Solo válidos para la acción específica

4. **Mensajes genéricos**
   - No revela si email existe
   - Previene enumeración de usuarios

5. **Asociación única**
   - Código vinculado a `userId` + `userAction`
   - `codeId` en token previene suplantación

---

## Invalidación de Tokens

### Blacklist Service

**Tecnología:** Redis (cache rápido)

**Propósito:** Invalidar tokens antes de su expiración natural.

### Funcionamiento

#### 1. Estructura de Blacklist

```typescript
// Key en Redis: tokenId (sessionId)
// Value: "1" (marcador simple)
// TTL: tiempo restante hasta expiración natural del token
```

#### 2. Revocación de Token

**Proceso:**

```typescript
async revokeToken(tokenId: string, tokenType: "accessToken" | "refreshToken") {
  let tllMs: number;
  
  switch (tokenType) {
    case "accessToken":
      tllMs = parseTimeMinutesToMs(envs.USER_ACCESS_TOKEN_EXPIRATION);
      break;
    case "refreshToken":
      tllMs = parseTimeDaysToMs(envs.USER_REFRESH_TOKEN_EXPIRATION);
      break;
  }
  
  await this.blacklistRepository.create(tokenId, tllMs);
}
```

**Características:**
- TTL automático: Redis elimina entry cuando expira
- No requiere limpieza manual
- Búsqueda O(1) por tokenId

#### 3. Verificación en Strategies

**Todas las estrategias verifican blacklist:**

```typescript
async validate(payload: any) {
  const isTokenRevoked = await this.blacklistService.isTokenRevoked(payload.tokenId);
  if (isTokenRevoked) throw new UnauthorizedException('token invalid');
  return payload;
}
```

**Flujo:**
1. Token válido según JWT
2. Check en Redis: ¿existe tokenId?
3. Si existe: token revocado → 401
4. Si no existe: token válido → continuar

### Casos de Invalidación

1. **Logout manual**
   - Usuario cierra sesión
   - `sessionId` (refreshToken) va a blacklist
   - accessToken también invalidado

2. **Logout de todas las sesiones**
   - `UserSessionsService.revokeAllUserSessions()`
   - Todos los `sessionId` del usuario a blacklist

3. **Cambio de contraseña**
   - Puede forzar invalidación de sesiones activas
   - Seguridad adicional tras compromiso

4. **Detección de actividad sospechosa**
   - Sistema puede revocar tokens programáticamente

### Ventajas del Sistema de Blacklist

✅ **Revocación inmediata**: Token inválido al instante  
✅ **No requiere modificar tokens**: JWT sigue siendo stateless  
✅ **Auto-limpieza**: Redis TTL elimina entries viejos  
✅ **Performance**: O(1) lookup time  
✅ **Escalable**: Redis distribuido si es necesario  

---

## Interacción entre Módulos

### Diagrama de Dependencias

```
┌─────────────────────────────────────────────────────────┐
│                    Auth Module                          │
│  ┌────────────────────────────────────────────────┐    │
│  │         Auth Service                            │    │
│  │  - loginUser()                                  │    │
│  │  - logoutUser()                                 │    │
│  │  - createUserSession()                          │    │
│  │  - checkUserCredentials()                       │    │
│  │  - checkPinCode()                               │    │
│  └────────────────────────────────────────────────┘    │
│                      ↓ usa                              │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ JWT Service │  │  Blacklist   │  │UserSessions  │  │
│  │ (Access)    │  │   Service    │  │   Service    │  │
│  │ JWT Service │  └──────────────┘  └──────────────┘  │
│  │ (Refresh)   │                                       │
│  └─────────────┘                                       │
└─────────────────────────────────────────────────────────┘
         │                     │                  │
         │ genera              │ invalida         │ gestiona
         │ tokens              │ tokens           │ sesiones
         ▼                     ▼                  ▼
┌──────────────┐     ┌──────────────┐   ┌──────────────┐
│   Cookies    │     │    Redis     │   │   SQLite     │
│ (HttpOnly)   │     │  (Blacklist) │   │  (Sessions)  │
└──────────────┘     └──────────────┘   └──────────────┘

┌─────────────────────────────────────────────────────────┐
│                  Proofs Module                          │
│  ┌────────────────────────────────────────────────┐    │
│  │       Proofs Service                            │    │
│  │  - sendVerificationCode()                       │    │
│  │  - verifyAndGenerateToken()                     │    │
│  └────────────────────────────────────────────────┘    │
│                      ↓ usa                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │SecurityCode  │  │ JWT Service  │  │    Email     │ │
│  │     DAO      │  │  (Recovery)  │  │   Service    │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
         │                     │                  │
         │ gestiona            │ genera           │ envía
         │ códigos             │ recovery token   │ emails
         ▼                     ▼                  ▼
┌──────────────┐     ┌──────────────┐   ┌──────────────┐
│  PostgreSQL  │     │Bearer Token  │   │    SMTP      │
│(SecurityCode)│     │  (temporal)  │   │   Server     │
└──────────────┘     └──────────────┘   └──────────────┘

┌─────────────────────────────────────────────────────────┐
│                Recoveries Module                        │
│  ┌────────────────────────────────────────────────┐    │
│  │      Recovery Service                           │    │
│  │  - resetUserPassword()                          │    │
│  │  - resetUserPinCode()                           │    │
│  └────────────────────────────────────────────────┘    │
│                      ↓ usa                              │
│  ┌──────────────┐  ┌──────────────┐                   │
│  │ User DAO     │  │SecurityCode  │                   │
│  │              │  │     DAO      │                   │
│  └──────────────┘  └──────────────┘                   │
└─────────────────────────────────────────────────────────┘
         │                     │
         │ actualiza           │ valida y elimina
         │ credenciales        │ código usado
         ▼                     ▼
┌──────────────┐     ┌──────────────┐
│  PostgreSQL  │     │  PostgreSQL  │
│    (User)    │     │(SecurityCode)│
└──────────────┘     └──────────────┘
```

### Flujo de Comunicación entre Módulos

#### Escenario 1: Login Completo

```
Cliente → AuthController.login()
           ↓
       AuthService.loginUser()
           ↓
       checkUserCredentials() → UserRepository (PostgreSQL)
           ↓
       UserSessionsService.create() → SessionRepository (SQLite)
           ↓
       refreshTokenService.sign() → JWT Token
           ↓
       Response con cookie refreshToken
```

#### Escenario 2: Creación de Sesión con PIN

```
Cliente → AuthController.createSession() + refreshToken cookie
           ↓
       RefreshTokenAuthGuard
           ↓ valida token
       RefreshTokenStrategy.validate()
           ↓ verifica
       BlacklistService.isTokenRevoked() → Redis check
           ↓ si no está revocado
       AuthService.createUserSession()
           ↓
       checkPinCode() → UserRepository (PostgreSQL)
           ↓
       accessTokenService.sign() → JWT Token
           ↓
       Response con cookie accessToken
```

#### Escenario 3: Recuperación de Contraseña

```
Cliente → ProofsController.sendOtt()
           ↓
       ProofsService.sendVerificationCode()
           ↓
       SecurityCodeDao.create() → PostgreSQL
           ↓
       EmailService.send() → SMTP
           ↓
       Response genérico

Cliente → ProofsController.verifyCode() + código
           ↓
       ProofsService.verifyAndGenerateToken()
           ↓
       SecurityCodeDao.getByUserId() → PostgreSQL
           ↓ valida código
       bcrypt.compare()
           ↓
       recoveryTokenService.sign() → JWT Token
           ↓
       SecurityCodeDao.update({used: true}) → PostgreSQL
           ↓
       Response con recovery token

Cliente → RecoveriesController.resetPassword() + Bearer token
           ↓
       RecoveryTokenAuthGuard
           ↓ valida token
       RecoveryTokenStrategy.validate()
           ↓ verifica
       BlacklistService.isTokenRevoked() → Redis check
           ↓
       RecoveryService.resetUserPassword()
           ↓
       SecurityCodeDao.getByUserId() → valida codeId
           ↓
       UserDao.update({password}) → PostgreSQL
           ↓
       SecurityCodeDao.delete() → PostgreSQL
           ↓
       Response exitoso
```

#### Escenario 4: Logout

```
Cliente → AuthController.logout() + refreshToken cookie
           ↓
       RefreshTokenAuthGuard
           ↓ valida token
       RefreshTokenStrategy.validate()
           ↓ verifica
       BlacklistService.isTokenRevoked() → Redis check
           ↓
       AuthService.logoutUser()
           ↓
       BlacklistService.revokeToken(sessionId) → Redis
           ↓
       UserSessionsService.revoke(sessionId) → SQLite
           ↓
       Response + clear cookies
```

### Puntos Clave de Integración

1. **Guards como punto de entrada**
   - Todos los endpoints protegidos usan Guards
   - Guards ejecutan Strategies correspondientes
   - Strategies validan token Y blacklist

2. **Servicios compartidos**
   - `BlacklistService`: usado por Auth, Proofs, Recoveries
   - `UserDao`: punto único de acceso a datos de usuario
   - `SecurityCodeDao`: gestión centralizada de códigos OTT

3. **Múltiples JWT Services**
   - Cada tipo de token tiene su propio servicio
   - Inyectados con tokens específicos: `"USER_ACCESS_TOKEN"`, `"USER_REFRESH_TOKEN"`, `"USER_RECOVERY_TOKEN"`
   - Diferentes secrets y expiraciones

4. **Almacenamiento distribuido**
   - **PostgreSQL**: datos persistentes (users, security codes)
   - **SQLite**: sesiones (cold storage, historial)
   - **Redis**: blacklist (cache temporal con TTL)

5. **Seguridad por capas**
   - Capa 1: Validación JWT (firma + expiración)
   - Capa 2: Verificación en blacklist
   - Capa 3: Validación de estado en base de datos
   - Capa 4: Verificación de permisos (Guards específicos)

---

## Diagramas de Flujo

### Diagrama 1: Flujo de Login y Sesión

```
┌─────────────┐
│   Cliente   │
└──────┬──────┘
       │
       │ POST /auth/login
       │ {email, password}
       ▼
┌─────────────────────┐
│  Auth Controller    │
└──────┬──────────────┘
       │
       │ loginUser()
       ▼
┌─────────────────────┐
│   Auth Service      │
└──────┬──────────────┘
       │
       ├─────────────────┐
       │                 │
       ▼                 ▼
  ┌─────────┐      ┌──────────────┐
  │ Check   │      │  User Query  │
  │Password │◄─────│  PostgreSQL  │
  └────┬────┘      └──────────────┘
       │ ✓ válido
       ▼
┌──────────────────────┐
│ UserSessionsService  │
│  create()            │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│   SQLite             │
│ INSERT session       │
│ return sessionId     │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ JWT Service          │
│ sign(refreshToken)   │
└──────┬───────────────┘
       │
       │ token generado
       ▼
┌─────────────────────┐
│  Set Cookie         │
│  refreshToken       │
│  httpOnly + secure  │
└──────┬──────────────┘
       │
       ▼
┌─────────────┐
│   Cliente   │
│ (logueado)  │
└─────────────┘
       │
       │ POST /auth/session
       │ {pinCode} + refreshToken cookie
       ▼
┌─────────────────────┐
│RefreshTokenGuard    │
│  validate token     │
└──────┬──────────────┘
       │
       ├──────────────┐
       │              │
       ▼              ▼
┌──────────┐   ┌─────────────┐
│BlackList │   │JWT Validate │
│  check   │   │             │
└────┬─────┘   └─────────────┘
     │ no revoked
     ▼
┌─────────────────────┐
│  Auth Service       │
│  createUserSession()│
└──────┬──────────────┘
       │
       ▼
┌──────────────────────┐
│  Check PIN Code      │
│  bcrypt.compare()    │
└──────┬───────────────┘
       │ ✓ válido
       ▼
┌──────────────────────┐
│ JWT Service          │
│ sign(accessToken)    │
└──────┬───────────────┘
       │
       ▼
┌─────────────────────┐
│  Set Cookie         │
│  accessToken        │
└──────┬──────────────┘
       │
       ▼
┌─────────────┐
│   Cliente   │
│(sesión full)│
└─────────────┘
```

### Diagrama 2: Flujo de Recuperación de Contraseña

```
┌─────────────┐
│   Cliente   │
└──────┬──────┘
       │
       │ POST /proofs/send-ott
       │ {email, userAction: "reset-password"}
       ▼
┌─────────────────────┐
│ Proofs Controller   │
└──────┬──────────────┘
       │
       │ sendVerificationCode()
       ▼
┌─────────────────────┐
│  Proofs Service     │
└──────┬──────────────┘
       │
       ├───────────────────┐
       │                   │
       ▼                   ▼
┌─────────────┐    ┌──────────────────┐
│User Query   │    │SecurityCode DAO  │
│PostgreSQL   │    │  create()        │
└─────────────┘    └────┬─────────────┘
                        │
                        │ código generado y hasheado
                        ▼
                 ┌──────────────────┐
                 │    PostgreSQL    │
                 │ INSERT code      │
                 │ (used: false)    │
                 └────┬─────────────┘
                      │
                      ▼
                 ┌──────────────────┐
                 │  Email Service   │
                 │  send code       │
                 └────┬─────────────┘
                      │
                      ▼
                 ┌──────────────────┐
                 │   SMTP Server    │
                 │  envía email     │
                 └────┬─────────────┘
                      │
                      ▼
               ┌─────────────┐
               │   Cliente   │
               │recibe email │
               └──────┬──────┘
                      │
                      │ POST /proofs/verify-code
                      │ {email, userAction, code}
                      ▼
               ┌─────────────────────┐
               │ Proofs Controller   │
               └──────┬──────────────┘
                      │
                      │ verifyAndGenerateToken()
                      ▼
               ┌─────────────────────┐
               │  Proofs Service     │
               └──────┬──────────────┘
                      │
                      ├───────────────────┐
                      │                   │
                      ▼                   ▼
               ┌─────────────┐    ┌──────────────────┐
               │SecurityCode │    │  Validaciones:   │
               │    Query    │    │  - exists        │
               │ PostgreSQL  │    │  - not used      │
               └─────────────┘    │  - not expired   │
                      │           └──────────────────┘
                      │ código válido
                      ▼
               ┌──────────────────┐
               │ bcrypt.compare() │
               │  valida código   │
               └────┬─────────────┘
                    │ ✓ correcto
                    ▼
               ┌──────────────────────┐
               │ JWT Service          │
               │ sign(recoveryToken)  │
               │ payload: {id,        │
               │  codeId, userAction} │
               └────┬─────────────────┘
                    │
                    ▼
               ┌──────────────────────┐
               │ SecurityCode Update  │
               │  {used: true}        │
               └────┬─────────────────┘
                    │
                    ▼
               ┌─────────────┐
               │   Cliente   │
               │ recibe token│
               └──────┬──────┘
                      │
                      │ PATCH /recovery/reset-password
                      │ {password} + Bearer recoveryToken
                      ▼
               ┌─────────────────────┐
               │RecoveryTokenGuard   │
               │  validate token     │
               └──────┬──────────────┘
                      │
                      ├──────────────┐
                      │              │
                      ▼              ▼
               ┌──────────┐   ┌─────────────┐
               │BlackList │   │JWT Validate │
               │  check   │   │             │
               └────┬─────┘   └─────────────┘
                    │ no revoked
                    ▼
               ┌─────────────────────┐
               │ Recovery Service    │
               │ resetUserPassword() │
               └──────┬──────────────┘
                      │
                      ├─────────────────────┐
                      │                     │
                      ▼                     ▼
               ┌─────────────┐      ┌──────────────┐
               │SecurityCode │      │Valida codeId │
               │   Query     │      │coincide      │
               └──────┬──────┘      └──────────────┘
                      │ válido
                      ▼
               ┌──────────────────┐
               │  Hash Password   │
               │  bcrypt.hash()   │
               └────┬─────────────┘
                    │
                    ▼
               ┌──────────────────┐
               │  User Update     │
               │  PostgreSQL      │
               └────┬─────────────┘
                    │
                    ▼
               ┌──────────────────┐
               │SecurityCode      │
               │  DELETE          │
               └────┬─────────────┘
                    │
                    ▼
               ┌─────────────┐
               │   Cliente   │
               │password reset│
               └─────────────┘
```

### Diagrama 3: Flujo de Logout e Invalidación

```
┌─────────────┐
│   Cliente   │
│(autenticado)│
└──────┬──────┘
       │
       │ POST /auth/logout
       │ refreshToken cookie
       ▼
┌─────────────────────┐
│RefreshTokenGuard    │
└──────┬──────────────┘
       │
       ├────────────────────────┐
       │                        │
       ▼                        ▼
┌─────────────┐         ┌──────────────┐
│JWT Verify   │         │Extract Data  │
│Signature    │         │sessionId,    │
│& Expiration │         │userId        │
└──────┬──────┘         └──────────────┘
       │
       ▼
┌─────────────────────┐
│ BlacklistService    │
│ isTokenRevoked()?   │
└──────┬──────────────┘
       │
       ├─────────┐
       │         │
       ▼         ▼
    ┌─────┐  ┌──────┐
    │Redis│  │Check │
    │Exist│  │ Key  │
    └──┬──┘  └──────┘
       │
       │ if exists → 401 Unauthorized
       │ if not exists → continue
       ▼
┌─────────────────────┐
│  Auth Service       │
│  logoutUser()       │
└──────┬──────────────┘
       │
       │
       ├─────────────────────┐
       │                     │
       ▼                     ▼
┌──────────────────┐  ┌─────────────────┐
│BlacklistService  │  │UserSessions     │
│revokeToken()     │  │Service.revoke() │
└────┬─────────────┘  └────┬────────────┘
     │                     │
     ▼                     ▼
┌──────────────────┐  ┌─────────────────┐
│     Redis        │  │     SQLite      │
│ SET sessionId    │  │DELETE session   │
│ TTL: token exp   │  │ WHERE id =      │
└────┬─────────────┘  └────┬────────────┘
     │                     │
     │                     │
     └────────┬────────────┘
              │
              ▼
       ┌──────────────────┐
       │ Clear Cookies    │
       │ - refreshToken   │
       │ - accessToken    │
       └────┬─────────────┘
            │
            ▼
       ┌─────────────┐
       │   Cliente   │
       │(deslogueado)│
       └─────────────┘
            
┌──────────────────────────────────────┐
│  Intento de uso de token revocado    │
└──────────────────────────────────────┘
            │
            │ Request con token revocado
            ▼
       ┌─────────────────────┐
       │ Guard (cualquier)   │
       └──────┬──────────────┘
              │
              ▼
       ┌─────────────────────┐
       │  Strategy.validate()│
       └──────┬──────────────┘
              │
              ▼
       ┌─────────────────────┐
       │ BlacklistService    │
       │ isTokenRevoked()    │
       └──────┬──────────────┘
              │
              ▼
       ┌─────────────────────┐
       │    Redis CHECK      │
       │  EXISTS sessionId   │
       └──────┬──────────────┘
              │
              │ key exists = TRUE
              ▼
       ┌─────────────────────┐
       │UnauthorizedException│
       │  'token invalid'    │
       └──────┬──────────────┘
              │
              ▼
       ┌─────────────┐
       │   Cliente   │
       │  401 Error  │
       └─────────────┘
```

### Diagrama 4: Arquitectura de Guards y Strategies

```
                    ┌────────────────────┐
                    │   HTTP Request     │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │    Endpoint        │
                    │    @UseGuards()    │
                    └─────────┬──────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
   ┌──────────────────┐ ┌─────────────────┐ ┌──────────────────┐
   │RefreshTokenGuard │ │AccessTokenGuard │ │RecoveryTokenGuard│
   └────────┬─────────┘ └────────┬────────┘ └────────┬─────────┘
            │                    │                    │
            │ extends            │ extends            │ extends
            ▼                    ▼                    ▼
   ┌────────────────────────────────────────────────────────┐
   │         AuthGuard('STRATEGY_NAME')                     │
   │         from @nestjs/passport                          │
   └────────┬───────────────────────────────────────────────┘
            │
            │ ejecuta estrategia correspondiente
            │
            ├─────────────────┬───────────────────┐
            │                 │                   │
            ▼                 ▼                   ▼
┌──────────────────┐ ┌─────────────────┐ ┌──────────────────┐
│RefreshToken      │ │AccessToken      │ │RecoveryToken     │
│  Strategy        │ │  Strategy       │ │   Strategy       │
└────────┬─────────┘ └────────┬────────┘ └────────┬─────────┘
         │                    │                    │
         │                    │                    │
         └──────────┬─────────┴────────┬───────────┘
                    │                  │
                    ▼                  ▼
         ┌─────────────────┐  ┌──────────────────┐
         │JwtStrategyFactory│  │ passport-jwt     │
         │  (custom)        │  │   Strategy       │
         └────────┬────────┘  └──────────────────┘
                  │
                  │ define
                  ▼
         ┌─────────────────────────┐
         │ Token Extraction        │
         │ - from cookies          │
         │ - from bearer header    │
         │ - or both               │
         └────────┬────────────────┘
                  │
                  ▼
         ┌─────────────────────────┐
         │  JWT Verification       │
         │  - verify signature     │
         │  - check expiration     │
         │  - extract payload      │
         └────────┬────────────────┘
                  │
                  ▼
         ┌─────────────────────────┐
         │  validate() method      │
         │  (en cada Strategy)     │
         └────────┬────────────────┘
                  │
                  ├──────────────────┐
                  │                  │
                  ▼                  ▼
         ┌─────────────┐    ┌────────────────┐
         │BlacklistSvc │    │  Check Redis   │
         │isRevoked()  │◄───│  for tokenId   │
         └──────┬──────┘    └────────────────┘
                │
                ├── if revoked
                │   └─► UnauthorizedException
                │
                └── if valid
                    └─► return payload
                         │
                         ▼
                ┌────────────────────┐
                │  Additional Guards │
                │  (opcional)        │
                │  - UserAuthGuard   │
                │  - CheckRegister   │
                └────────┬───────────┘
                         │
                         ▼
                ┌────────────────────┐
                │   Controller       │
                │   @CurrentUser()   │
                │   payload data     │
                └────────────────────┘
```

---

## Resumen de Flujos

### ✅ Autenticación Normal
1. **Login** → Refresh Token (cookie)
2. **Validar PIN** → Access Token (cookie)
3. **Realizar operaciones** → Tokens validados en cada request

### ✅ Recuperación de Cuenta
1. **Solicitar código** → Email con OTT
2. **Verificar código** → Recovery Token (bearer)
3. **Resetear credencial** → Nueva password/PIN guardada

### ✅ Cierre de Sesión
1. **Logout** → Tokens a blacklist
2. **Eliminar sesión** → SQLite cleanup
3. **Clear cookies** → Cliente sin tokens

### ✅ Validación Continua
- Cada request → Guard valida token
- Strategy → Verifica firma + blacklist
- Si token revocado → 401 Unauthorized
- Si token válido → Controller procesa request

---

## Tecnologías y Dependencias

### Backend
- **NestJS**: Framework principal
- **Passport**: Autenticación con Strategies
- **JWT (@nestjs/jwt)**: Generación y validación de tokens
- **bcrypt**: Hashing de contraseñas y PINs
- **TypeORM**: ORM para bases de datos

### Bases de Datos
- **PostgreSQL**: Datos principales (users, security codes)
- **SQLite**: Cold storage (sesiones históricas)
- **Redis**: Cache (blacklist de tokens)

### Seguridad
- Cookies **HttpOnly** y **Secure**
- **SameSite** protection contra CSRF
- **Bcrypt** con salt rounds para hashing
- **JWT** con secrets diferentes por tipo
- **TTL** automático en Redis para limpieza

---

## Variables de Entorno Clave

```env
# Access Token (sesión activa)
USER_ACCESS_TOKEN_SECRET=<secret>
USER_ACCESS_TOKEN_EXPIRATION=<minutos>

# Refresh Token (login)
USER_REFRESH_TOKEN_SECRET=<secret>
USER_REFRESH_TOKEN_EXPIRATION=<días>

# Recovery Token (recuperación)
USER_RECOVERY_TOKEN_SECRET=<secret>
USER_RECOVERY_TOKEN_EXPIRATION=<minutos>

# Modo desarrollo
DEV_MODE=true|false
```

---

## Conclusión

El sistema de autenticación implementa:

✅ **Seguridad multicapa** con validación de JWT + blacklist  
✅ **Doble autenticación** mediante password + PIN  
✅ **Recuperación segura** con códigos OTT de un solo uso  
✅ **Invalidación inmediata** mediante blacklist en Redis  
✅ **Separación de tokens** por propósito y duración  
✅ **Arquitectura modular** con responsabilidades claras  
✅ **Protección contra ataques** comunes (CSRF, timing, enumeración)  
✅ **Escalabilidad** con bases de datos distribuidas  

El diseño permite agregar nuevos tipos de autenticación (OAuth, 2FA, etc.) sin modificar la arquitectura base.
