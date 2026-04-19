# Historias de Usuario - SwitchPay

## Versión: 1.0.0

---

# Índice de Épicas

1. [Épica 1: Gestión de Autenticación y Seguridad](#épica-1-gestión-de-autenticación-y-seguridad)
2. [Épica 2: Gestión de Cuenta Bancaria](#épica-2-gestión-de-cuenta-bancaria)
3. [Épica 3: Gestión de Transacciones](#épica-3-gestión-de-transacciones)
4. [Épica 4: Gestión de Beneficios Laborales](#épica-4-gestión-de-beneficios-laborales)
5. [Épica 5: Perfil y Configuración de Usuario](#épica-5-perfil-y-configuración-de-usuario)
6. [Épica 6: Seguridad y Verificación](#épica-6-seguridad-y-verificación)

---

# Épica 1: Gestión de Autenticación y Seguridad

**Como** empleado de la empresa  
**Quiero** gestionar mi acceso a la plataforma de forma segura  
**Para** proteger mis datos financieros y personales

## Historia 1.1: Registro de nuevo usuario

**Como** empleado nuevo en la empresa  
**Quiero** registrarme en la plataforma con mi correo corporativo  
**Para** comenzar a utilizar mis beneficios laborales

**Criterios de aceptación:**
- El usuario puede ingresar email y contraseña
- El email debe ser único en el sistema
- La contraseña debe cumplir requisitos mínimos de seguridad (mínimo 8 caracteres, mayúsculas, minúsculas, números)
- El sistema envía un email de confirmación
- El registro avanza al paso "set-profile"

**Prioridad:** Alta  
**Estimación:** 5 puntos

---

## Historia 1.2: Login con credenciales básicas

**Como** empleado registrado  
**Quiero** iniciar sesión con mi email y contraseña  
**Para** acceder a mi cuenta y beneficios

**Criterios de aceptación:**
- El usuario ingresa email y contraseña válidos
- El sistema valida las credenciales contra la base de datos
- Se genera un refresh token almacenado en cookie httpOnly
- El usuario recibe confirmación de login exitoso
- Se registra la sesión con IP y dispositivo

**Prioridad:** Alta  
**Estimación:** 5 puntos

---

## Historia 1.3: Configuración de PIN de seguridad

**Como** empleado que completó su perfil  
**Quiero** establecer un código PIN de 6 dígitos  
**Para** proteger mis transacciones y operaciones sensibles

**Criterios de aceptación:**
- El usuario debe ingresar un PIN de exactamente 6 dígitos numéricos
- El PIN debe confirmarse ingresándolo dos veces
- El PIN se almacena encriptado en la base de datos
- El registro avanza al paso "complete"
- El usuario recibe confirmación de configuración exitosa

**Prioridad:** Alta  
**Estimación:** 3 puntos

---

## Historia 1.4: Iniciar sesión activa con PIN

**Como** empleado logueado  
**Quiero** iniciar una sesión activa usando mi PIN  
**Para** realizar transacciones y operaciones dentro de la aplicación

**Criterios de aceptación:**
- El usuario debe estar logueado (con refresh token válido)
- El usuario ingresa su PIN de 6 dígitos
- El sistema valida el PIN contra el almacenado
- Se genera un access token con duración limitada
- El access token se almacena en cookie httpOnly
- El usuario puede acceder a funciones protegidas

**Prioridad:** Alta  
**Estimación:** 5 puntos

---

## Historia 1.5: Cerrar sesión (logout)

**Como** empleado con sesión activa  
**Quiero** cerrar sesión de forma segura  
**Para** proteger mi cuenta cuando no esté usando la aplicación

**Criterios de aceptación:**
- El usuario puede cerrar sesión desde cualquier pantalla
- Se invalidan tanto refresh token como access token
- Se eliminan las cookies de autenticación
- Se registra el cierre de sesión en el historial
- El usuario es redirigido a la pantalla de login

**Prioridad:** Alta  
**Estimación:** 3 puntos

---

## Historia 1.6: Manejo de sesiones múltiples

**Como** empleado que usa múltiples dispositivos  
**Quiero** ver y gestionar mis sesiones activas  
**Para** controlar desde dónde se accede a mi cuenta

**Criterios de aceptación:**
- El usuario puede ver lista de sesiones activas
- Cada sesión muestra: dispositivo, IP, fecha de último acceso
- El usuario puede cerrar sesiones específicas remotamente
- El sistema notifica cuando se detecta un nuevo dispositivo

**Prioridad:** Media  
**Estimación:** 5 puntos

---

# Épica 2: Gestión de Cuenta Bancaria

**Como** empleado de la empresa  
**Quiero** gestionar mi cuenta bancaria interna  
**Para** administrar los fondos de mis beneficios laborales

## Historia 2.1: Creación automática de cuenta bancaria

**Como** empleado que completa su registro  
**Quiero** que se cree automáticamente una cuenta bancaria interna  
**Para** recibir y gestionar mis beneficios

**Criterios de aceptación:**
- Al completar el registro se crea automáticamente una cuenta bancaria
- La cuenta inicia con balance en 0
- La moneda por defecto es USD
- El estado inicial es "Habilitada"
- Se genera un identificador único para la cuenta

**Prioridad:** Alta  
**Estimación:** 3 puntos

---

## Historia 2.2: Visualizar balance de cuenta

**Como** empleado  
**Quiero** ver el balance actual de mi cuenta  
**Para** conocer cuántos fondos tengo disponibles para beneficios

**Criterios de aceptación:**
- El usuario puede ver su balance actualizado en tiempo real
- Se muestra la moneda (USD)
- El balance refleja todas las transacciones completadas
- Se actualiza automáticamente después de cada transacción

**Prioridad:** Alta  
**Estimación:** 2 puntos

---

## Historia 2.3: Ver detalles de cuenta

**Como** empleado  
**Quiero** ver los detalles completos de mi cuenta bancaria  
**Para** conocer toda la información relevante

**Criterios de aceptación:**
- El usuario puede ver: ID de cuenta, moneda, balance, estado, fecha de creación
- Los datos sensibles están protegidos
- La información se actualiza en tiempo real

**Prioridad:** Media  
**Estimación:** 2 puntos

---

# Épica 3: Gestión de Transacciones

**Como** empleado  
**Quiero** realizar y consultar transacciones en mi cuenta  
**Para** utilizar mis beneficios y llevar control de mis gastos

## Historia 3.1: Recibir depósito de beneficios

**Como** empleado  
**Quiero** recibir depósitos automáticos de mis beneficios mensuales  
**Para** tener fondos disponibles en mi cuenta

**Criterios de aceptación:**
- La empresa puede depositar fondos en la cuenta del empleado
- El depósito se registra como transacción tipo "deposit"
- El balance se actualiza inmediatamente al completarse
- El estado inicial es "pending" y cambia a "completed"
- Se registra la fecha y hora de la transacción
- No se aplican comisiones en depósitos corporativos

**Prioridad:** Alta  
**Estimación:** 5 puntos

---

## Historia 3.2: Realizar retiro de fondos

**Como** empleado  
**Quiero** retirar fondos de mi cuenta a métodos de pago externos  
**Para** usar el dinero fuera de la plataforma cuando lo necesite

**Criterios de aceptación:**
- El usuario debe tener sesión activa (access token válido)
- El monto a retirar no puede exceder el balance disponible
- Se aplica una comisión según el método de pago elegido
- Se soportan métodos: Paypal, MercadoPago
- El retiro se registra como transacción tipo "withdrawal"
- Se requiere confirmación con PIN
- El estado cambia de "pending" a "completed" cuando se procesa

**Prioridad:** Alta  
**Estimación:** 8 puntos

---

## Historia 3.3: Adquirir beneficio (Perk)

**Como** empleado  
**Quiero** canjear mis fondos por beneficios específicos  
**Para** acceder a servicios que me interesan (gimnasio, alimentación, transporte)

**Criterios de aceptación:**
- El usuario puede ver el catálogo de beneficios disponibles
- Cada beneficio muestra: nombre, costo, duración en días
- El usuario selecciona un beneficio y confirma la compra
- Se registra como transacción tipo "perk"
- Se descuenta el monto del balance
- Se registra la duración del beneficio en días
- Se requiere confirmación con PIN
- El beneficio queda activo por el período especificado

**Prioridad:** Alta  
**Estimación:** 8 puntos

---

## Historia 3.4: Consultar historial de transacciones

**Como** empleado  
**Quiero** ver el historial completo de mis transacciones  
**Para** llevar control de mis gastos y beneficios utilizados

**Criterios de aceptación:**
- El usuario puede ver todas sus transacciones ordenadas por fecha
- Cada transacción muestra: tipo, monto, moneda, estado, método de pago, fecha
- Se puede filtrar por tipo de transacción (deposit, withdrawal, transfer, perk)
- Se puede filtrar por rango de fechas
- Se implementa paginación para manejar grandes volúmenes

**Prioridad:** Media  
**Estimación:** 5 puntos

---

## Historia 3.5: Ver detalle de transacción individual

**Como** empleado  
**Quiero** ver los detalles completos de una transacción específica  
**Para** obtener información detallada sobre una operación

**Criterios de aceptación:**
- El usuario puede seleccionar cualquier transacción del historial
- Se muestra: ID, tipo, monto, moneda, estado, método de pago, comisión, duración (si es perk), fechas
- Los datos son de solo lectura
- Se puede descargar comprobante (implementación futura)

**Prioridad:** Baja  
**Estimación:** 3 puntos

---

## Historia 3.6: Recibir notificación de transacción completada

**Como** empleado  
**Quiero** recibir notificación cuando una transacción se complete  
**Para** estar informado sobre los movimientos en mi cuenta

**Criterios de aceptación:**
- Se envía email automático cuando una transacción cambia a "completed"
- El email incluye: tipo de transacción, monto, nuevo balance
- La notificación se envía solo para transacciones exitosas

**Prioridad:** Media  
**Estimación:** 3 puntos

---

# Épica 4: Gestión de Beneficios Laborales

**Como** empleado  
**Quiero** gestionar mis beneficios laborales de forma flexible  
**Para** adaptar los beneficios a mis necesidades actuales

## Historia 4.1: Ver catálogo de beneficios disponibles

**Como** empleado  
**Quiero** ver todos los beneficios disponibles ofrecidos por la empresa  
**Para** conocer mis opciones y decidir cuáles me interesan

**Criterios de aceptación:**
- El usuario puede ver lista completa de beneficios
- Cada beneficio muestra: nombre, descripción, proveedor, costo, duración
- Se pueden filtrar beneficios por categoría (alimentación, transporte, gimnasio, etc.)
- Se indica claramente si son beneficios internos o externos
- Los beneficios internos están destacados (según ON2: aumentar uso 40%)

**Prioridad:** Alta  
**Estimación:** 5 puntos

---

## Historia 4.2: Activar beneficio seleccionado

**Como** empleado  
**Quiero** activar un beneficio que me interesa  
**Para** comenzar a utilizarlo inmediatamente

**Criterios de aceptación:**
- El usuario selecciona un beneficio del catálogo
- Se muestra resumen con: costo, duración, términos
- El usuario confirma la activación con PIN
- Se procesa el pago descontando del balance
- El beneficio queda activo con fecha de inicio y fin
- Se genera un código/comprobante de acceso

**Prioridad:** Alta  
**Estimación:** 8 puntos

---

## Historia 4.3: Ver beneficios activos

**Como** empleado  
**Quiero** ver mis beneficios actualmente activos  
**Para** saber cuáles puedo usar y cuándo vencen

**Criterios de aceptación:**
- El usuario puede ver lista de beneficios activos
- Cada beneficio muestra: nombre, fecha de activación, fecha de vencimiento, días restantes
- Se ordenan por fecha de vencimiento próxima
- Se destaca visualmente cuando un beneficio está por vencer (< 7 días)

**Prioridad:** Alta  
**Estimación:** 3 puntos

---

## Historia 4.4: Modificar beneficio activo

**Como** empleado con necesidades cambiantes  
**Quiero** cambiar un beneficio activo por otro  
**Para** adaptar mis beneficios a mi situación actual

**Criterios de aceptación:**
- El usuario puede seleccionar un beneficio activo para modificar
- Se muestra el valor proporcional no utilizado
- El usuario puede elegir un nuevo beneficio
- El sistema calcula el ajuste de precio
- Se aplica el crédito del beneficio anterior al nuevo
- Se requiere confirmación con PIN
- Se actualiza inmediatamente la disponibilidad

**Prioridad:** Alta  
**Estimación:** 13 puntos

---

## Historia 4.5: Generar código de acceso para beneficio

**Como** empleado con beneficio activo  
**Quiero** generar un código de acceso rápido  
**Para** utilizar el beneficio en el proveedor sin complicaciones

**Criterios de aceptación:**
- El usuario selecciona el beneficio que desea usar
- Se genera un código QR o código numérico único
- El código tiene validez temporal (ejemplo: 5 minutos)
- El código puede ser escaneado por el proveedor
- Se registra cada uso del beneficio

**Prioridad:** Media  
**Estimación:** 8 puntos

---

## Historia 4.6: Ver historial de beneficios utilizados

**Como** empleado  
**Quiero** ver el historial de todos los beneficios que he usado  
**Para** analizar mis patrones de consumo

**Criterios de aceptación:**
- El usuario puede ver todos los beneficios utilizados en el pasado
- Cada entrada muestra: nombre, proveedor, período de uso, costo, veces modificado
- Se puede filtrar por tipo de beneficio y rango de fechas
- Se muestra estadística de beneficio más usado

**Prioridad:** Baja  
**Estimación:** 5 puntos

---

# Épica 5: Perfil y Configuración de Usuario

**Como** empleado  
**Quiero** gestionar mi perfil y configuración personal  
**Para** mantener mi información actualizada y personalizar mi experiencia

## Historia 5.1: Completar perfil inicial

**Como** empleado recién registrado  
**Quiero** completar mi perfil con información personal  
**Para** finalizar mi configuración inicial

**Criterios de aceptación:**
- El usuario ingresa: nombre, apellido, alias (opcional)
- Todos los campos obligatorios deben completarse
- El alias debe ser único si se proporciona
- Al guardar, el registerStep avanza de "set-profile" a "set-pin-code"
- Se valida formato de datos antes de guardar

**Prioridad:** Alta  
**Estimación:** 3 puntos

---

## Historia 5.2: Actualizar información personal

**Como** empleado  
**Quiero** modificar mi información personal  
**Para** mantener mis datos actualizados

**Criterios de aceptación:**
- El usuario puede editar: nombre, apellido, alias
- No se puede modificar el email (requiere proceso especial)
- Se validan los nuevos datos antes de guardar
- Se requiere confirmar cambios con contraseña actual
- Se notifica al usuario de actualización exitosa

**Prioridad:** Media  
**Estimación:** 3 puntos

---

## Historia 5.3: Cambiar contraseña

**Como** empleado  
**Quiero** cambiar mi contraseña de acceso  
**Para** mantener mi cuenta segura

**Criterios de aceptación:**
- El usuario debe ingresar contraseña actual
- El usuario ingresa nueva contraseña dos veces
- La nueva contraseña debe cumplir requisitos de seguridad
- Al cambiar contraseña, se invalidan todas las sesiones activas excepto la actual
- Se genera nuevo tokenPassword
- Se envía email de confirmación del cambio

**Prioridad:** Alta  
**Estimación:** 5 puntos

---

## Historia 5.4: Cambiar PIN de seguridad

**Como** empleado  
**Quiero** modificar mi PIN de seguridad  
**Para** actualizar mi método de autenticación de transacciones

**Criterios de aceptación:**
- El usuario debe ingresar PIN actual
- El usuario ingresa nuevo PIN de 6 dígitos dos veces
- Se valida que el nuevo PIN sea diferente al anterior
- Se almacena encriptado
- Se requiere confirmación por email
- Las transacciones pendientes no se ven afectadas

**Prioridad:** Media  
**Estimación:** 3 puntos

---

## Historia 5.5: Ver perfil completo

**Como** empleado  
**Quiero** ver toda mi información de perfil  
**Para** revisar mis datos personales y de cuenta

**Criterios de aceptación:**
- El usuario puede ver: nombre completo, alias, email, fecha de registro
- Se muestra información de la cuenta bancaria asociada
- Se muestra cantidad de beneficios activos
- Los datos sensibles (contraseña, PIN) no son visibles

**Prioridad:** Baja  
**Estimación:** 2 puntos

---

# Épica 6: Seguridad y Verificación

**Como** empleado  
**Quiero** contar con mecanismos adicionales de seguridad  
**Para** proteger mi cuenta y realizar operaciones de forma segura

## Historia 6.1: Solicitar código de verificación por email

**Como** empleado que necesita verificar su identidad  
**Quiero** recibir un código de verificación en mi email  
**Para** confirmar operaciones sensibles

**Criterios de aceptación:**
- El usuario solicita código para una acción específica (cambio de email, recuperación, etc.)
- Se genera código numérico aleatorio de 6 dígitos
- El código se envía al email registrado
- El código tiene validez de 10 minutos
- Se puede solicitar reenvío después de 1 minuto
- Se registra el tipo de acción asociada (userAction)

**Prioridad:** Alta  
**Estimación:** 5 puntos

---

## Historia 6.2: Validar código de verificación

**Como** empleado que recibió un código de verificación  
**Quiero** ingresar el código para validar mi identidad  
**Para** completar la operación solicitada

**Criterios de aceptación:**
- El usuario ingresa el código de 6 dígitos recibido
- El sistema valida que el código coincida y no haya expirado
- El código se marca como "usado" después de validación exitosa
- Máximo 3 intentos de validación antes de bloquear
- Si el código es correcto, se permite continuar con la operación

**Prioridad:** Alta  
**Estimación:** 5 puntos

---

## Historia 6.3: Recuperar acceso por contraseña olvidada

**Como** empleado que olvidó su contraseña  
**Quiero** recuperar acceso a mi cuenta  
**Para** poder volver a usar la plataforma

**Criterios de aceptación:**
- El usuario solicita recuperación desde pantalla de login
- Se envía código de verificación al email registrado
- El usuario valida el código
- El usuario ingresa nueva contraseña dos veces
- La nueva contraseña cumple requisitos de seguridad
- Se invalidan todas las sesiones activas
- Se confirma recuperación exitosa por email

**Prioridad:** Alta  
**Estimación:** 8 puntos

---

## Historia 6.4: Detectar actividad sospechosa

**Como** empleado  
**Quiero** ser notificado de actividad inusual en mi cuenta  
**Para** protegerme de accesos no autorizados

**Criterios de aceptación:**
- Se detectan intentos de login desde ubicación inusual
- Se detectan múltiples intentos fallidos de login (> 5)
- Se detectan cambios en datos sensibles
- Se envía email de alerta inmediatamente
- Se puede bloquear cuenta temporalmente como precaución
- El usuario puede confirmar que fue él mediante código

**Prioridad:** Media  
**Estimación:** 13 puntos

---

## Historia 6.5: Habilitar autenticación de dos factores (2FA)

**Como** empleado que desea máxima seguridad  
**Quiero** activar autenticación de dos factores con TOTP  
**Para** agregar una capa extra de protección a mi cuenta

**Criterios de aceptación:**
- El usuario activa 2FA desde configuración de seguridad
- Se genera QR para escanear con Google Authenticator
- El usuario valida el setup ingresando código TOTP
- En futuros logins se solicita código TOTP además de contraseña
- Se generan códigos de respaldo para emergencias
- Se puede desactivar 2FA con proceso de verificación

**Prioridad:** Baja  
**Estimación:** 13 puntos

---

## Resumen de Prioridades

### Prioridad Alta (MVP)
- Épica 1: Gestión de Autenticación y Seguridad (Historias 1.1 - 1.5)
- Épica 2: Gestión de Cuenta Bancaria (Historias 2.1 - 2.2)
- Épica 3: Gestión de Transacciones (Historias 3.1 - 3.3)
- Épica 4: Gestión de Beneficios Laborales (Historias 4.1 - 4.4)
- Épica 5: Perfil y Configuración de Usuario (Historias 5.1, 5.3)
- Épica 6: Seguridad y Verificación (Historias 6.1 - 6.3)

### Prioridad Media (Segunda fase)
- Historia 1.6: Manejo de sesiones múltiples
- Historia 2.3: Ver detalles de cuenta
- Historias 3.4, 3.6: Historial y notificaciones
- Historias 4.5: Códigos de acceso
- Historias 5.2, 5.4: Actualizaciones de perfil
- Historia 6.4: Detección de actividad sospechosa

### Prioridad Baja (Mejoras futuras)
- Historia 3.5: Detalle individual de transacción
- Historia 4.6: Historial de beneficios
- Historia 5.5: Ver perfil completo
- Historia 6.5: Autenticación 2FA

---

## Métricas de Éxito Relacionadas

### ON1: Incrementar retención de talento (30% modifiquen 1 beneficio en P2)
- **Historias relacionadas:** 4.4 (Modificar beneficio activo)

### ON2: Aumentar 40% uso de beneficios internos en P2
- **Historias relacionadas:** 4.1 (Ver catálogo con destaque de internos), 4.2 (Activar beneficio)

### CE1: 50% de usuarios invierten en beneficios internos en P1
- **Historias relacionadas:** 4.2 (Activar beneficio), 3.3 (Adquirir perk)

### CE2: Al menos 1 beneficio se solicita 3+ veces desde P1
- **Historias relacionadas:** 4.4 (Modificar beneficio), 4.6 (Historial de uso)
