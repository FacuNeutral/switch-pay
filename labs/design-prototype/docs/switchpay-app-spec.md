# SwitchPay — App Build Spec

> **Fuente de verdad**: este documento describe **qué construir** para la app
> de SwitchPay (web/mobile-first PWA) tomando como base el wireframe
> [`docs/assets/wireframes/bank.excalidraw`](assets/wireframes/bank.excalidraw).
>
> Sirve como **README único** para que un equipo (o un agente) pueda
> implementar todas las páginas, componentes y flujos necesarios.

---

## 0. Tabla de Contenidos

1. [Visión del producto](#1-visión-del-producto)
2. [Stack y arquitectura sugerida](#2-stack-y-arquitectura-sugerida)
3. [Estructura de rutas (sitemap)](#3-estructura-de-rutas-sitemap)
4. [Flujos principales](#4-flujos-principales)
5. [Especificación de páginas](#5-especificación-de-páginas)
    - 5.1 [Onboarding](#51-onboarding--welcome)
    - 5.2 [Login](#52-login)
    - 5.3 [Pin Code (login)](#53-pin-code-login)
    - 5.4 [Register](#54-register)
    - 5.5 [Recovery](#55-recovery-password--pin)
    - 5.6 [Dashboard](#56-dashboard)
    - 5.7 [Perks: details / buy](#57-perks-details--buy--checkout)
    - 5.8 [Money management](#58-money-management-deposit--transfer--withdraw)
    - 5.9 [Wallet history & activities](#59-wallet-history--activities)
    - 5.10 [Active perks](#510-active-perks-mis-suscripciones)
    - 5.11 [Access check (QR)](#511-access-check-identidad-en-comercios)
    - 5.12 [Profile & settings](#512-profile--settings)
6. [Componentes globales](#6-componentes-globales)
7. [Modales y estados globales](#7-modales-y-estados-globales)
8. [Datos mock y entidades](#8-datos-mock-y-entidades)
9. [Estado, hooks y servicios](#9-estado-hooks-y-servicios)
10. [Accesibilidad y responsive](#10-accesibilidad-y-responsive)
11. [Checklist de implementación](#11-checklist-de-implementación)

---

## 1. Visión del producto

**SwitchPay** es una app interna de **beneficios laborales** (perks) con
sensación bancaria. El empleado recibe un saldo de beneficios y elige
cómo gastarlo: suscripciones (gym, transporte, comida), planes cortos,
o transferencia directa entre compañeros.

- **Tagline**: *Your benefits. Your choice. Your way.*
- **Personalidad**: confiable, premium, simple, cercana.
- **Audiencia primaria**: empleado en mobile.
- **Modos**: light + dark, ambos first-class.

Pilares funcionales:

1. **Wallet** — saldo, depositar, transferir, retirar, historial.
2. **Perks** — explorar, contratar (suscripción / short plan), gestionar.
3. **Access check** — identificarse en comercio aliado vía QR o alias+PIN.
4. **Cuenta** — perfil, seguridad (password / PIN), preferencias, sesiones.

---

## 2. Stack y arquitectura sugerida

> El proyecto ya está montado en Vite + React + TS + Tailwind v4 + shadcn.
> Esta sección describe **cómo organizar** las nuevas piezas.

```
src/
├── App.tsx                  # Router root (React Router)
├── main.tsx
├── application/             # Features (screaming architecture)
│   ├── auth/                # login, register, recovery, pin
│   ├── wallet/              # deposit, transfer, withdraw, history
│   ├── perks/               # catalog, details, checkout, actives
│   ├── access-check/        # QR + manual identity
│   └── profile/             # settings, security, appearance, sessions
├── components/
│   ├── core/                # Header, BottomNav, Sidebar, BalanceCard…
│   ├── fragments/           # FormField, AmountInput, OtpInput, Avatar…
│   └── ui/                  # shadcn primitives (existentes)
├── layouts/
│   ├── AuthLayout.tsx       # centrado, hero ilustrado
│   └── AppLayout.tsx        # header + bottom nav + safe areas
├── pages/                   # 1 archivo por ruta
├── entities/                # User, Wallet, Perk, Subscription, Tx, Alias…
├── hooks/                   # useWallet, usePerks, usePin, useToast…
├── helpers/                 # currency, date, masking…
├── data/mockData.ts         # Datos mock para todo el flow
├── zustand/                 # auth, wallet, perks, ui (theme, modals)
└── styles/                  # estilos globales de app
```

**Routing** (React Router v6):

- Públicas: `/welcome`, `/login`, `/login/pin`, `/register/*`, `/recovery/*`.
- Protegidas (requieren sesión + PIN cuando aplica):
  `/`, `/wallet/*`, `/perks/*`, `/access-check/*`, `/activity/*`, `/profile/*`.

---

## 3. Estructura de rutas (sitemap)

```
/welcome                      # Onboarding / landing autenticación
/login                        # Email step
/login/password               # Password step
/login/pin                    # 5-digit PIN
/register                     # Email + password + T&C
/register/profile             # First/Last name + photo
/register/pin                 # Set PIN (5-digit)
/recovery/password            # Email para reset
/recovery/password/sent       # Estado "revisa tu correo"
/recovery/password/new        # Nueva password (desde link)
/recovery/pin                 # Reset PIN (email)
/recovery/pin/new             # Nuevo PIN

/                             # Dashboard
/perks                        # Catálogo de perks
/perks/:perkId                # Perk details (subscription o short plan)
/perks/:perkId/checkout       # Choose plan + payment method + confirm
/perks/actives                # Mis suscripciones / short plans activos
/perks/actives/:id/cancel     # Modal cancel subscription

/wallet/deposit               # Mostrar alias + métodos
/wallet/transfer              # Choose recipient → send money → confirm
/wallet/withdraw              # Retirar a método externo
/wallet/history               # Historial con filtros

/activity                     # Lista de transacciones
/activity/:txId               # Detalle de transacción

/access-check                 # QR + alternativa manual
/access-check/manual          # Alias + PIN

/profile                      # Resumen de perfil
/profile/personal             # Datos personales
/profile/security             # Password, PIN, sesiones
/profile/security/password    # Cambiar password
/profile/security/pin         # Cambiar PIN
/profile/security/alias       # Cambiar alias
/profile/appearance           # Light / Dark mode
/profile/sessions             # Sesiones activas
```

Bottom nav (5 ítems, mobile): **Home · Access Check · Activity · Account · Profile**.

---

## 4. Flujos principales

### 4.1 Autenticación

```
Welcome → Login (email) → Login (password) → PIN → Dashboard
                       ↘ Sign Up → Set Profile → Set PIN → Dashboard
                       ↘ Forgot password → Email sent → New password → Login
                       ↘ Forgot PIN     → Email sent → New PIN      → Login
```

### 4.2 Compra de Perk

```
Dashboard / Perks → Perk Details
   → Buy Perk → Choose Plan (suscripción o short plan)
              → Select Payment Method (PayPal / Mercado Pago / Wallet)
              → Security PIN modal
              → Success Message → Active perks
```

### 4.3 Transferencia

```
Dashboard → Transfer → Choose Recipient (alias)
                    → Enter Amount + concept
                    → Confirm details → Security PIN → Success
```

### 4.4 Access check (en comercio aliado)

```
Dashboard → Access Check
   → QR fullscreen (auto-refresh cada 60s)
   → Alternativa: Manual (alias + PIN)
   → Confirmación visual
```

---

## 5. Especificación de páginas

> Cada página describe: **propósito**, **layout**, **componentes**,
> **estados**, **CTA**, **navegación**.

### 5.1 Onboarding / Welcome

- **Ruta**: `/welcome`.
- **Propósito**: primer impacto de producto, CTA a Login / Sign Up.
- **Layout**: full-bleed, hero centrado.
- **Componentes**:
  - `BrandLogo`.
  - Headline: *"Welcome to SwitchPay"*.
  - Subhead: *"Your benefits. Your choice. Your way."*.
  - Ilustración de onboarding.
  - CTA principal: **Get started** → `/login`.
  - CTA secundario: **I already have an account** → `/login`.
  - Footer: *"Designed by Facundo Alvarez — 2025"*.
- **Estados**: solo idle.

### 5.2 Login

Dos pasos en rutas separadas para coincidir con el wireframe (LOGIN / PASSWORD).

#### 5.2.1 `/login` — Email step

- Header: back arrow → `/welcome`.
- Título: *"Login"*.
- `FormField` Email (`type=email`, validación en blur).
- Botón **Enter with Email** (deshabilitado hasta que sea email válido).
- Divider `or`.
- Social: `Button` outline con icono **Gmail** y **Facebook**.
- Link: *"Don't have an account? **Sign Up**"* → `/register`.
- Helper text bajo el input: *"To verify that this is your email address, complete the hidden part and click Get Code to receive your code."*
- CTA secundario: **Get Code** (envía email cuando aplica).

#### 5.2.2 `/login/password`

- Header back → `/login`.
- Email pre-llenado en input read-only con botón "change".
- `FormField` Password con toggle ojo.
- Link: *"Don't remember your password?"* → `/recovery/password`.
- Botón **Login** → `/login/pin`.

### 5.3 Pin Code (login)

- **Ruta**: `/login/pin`.
- Título: *"Please enter your Pin code"*.
- `OtpInput` 5 dígitos (mascarado con `*`).
- Link: **Forgot your PIN?** → `/recovery/pin`.
- Auto-submit al completar 5 dígitos → Dashboard.
- Errores: shake + mensaje `error`.

### 5.4 Register

Flow de 3 pasos con `<Stepper>` opcional arriba.

#### 5.4.1 `/register` — Sign Up

- `FormField` Email.
- `FormField` Password + Confirm Password (con strength meter).
- `Checkbox` *"Accept terms and conditions."* (link abre modal/PDF).
- CTA **Sign up** → `/register/profile`.
- Link: *"Already have an account? **Login**"*.

#### 5.4.2 `/register/profile` — Set Profile

- Avatar uploader: *"Select one profile photo"*.
- `FormField` First Name, Last Name.
- CTA **Continue** → `/register/pin`.

#### 5.4.3 `/register/pin` — Set Pin Code

- Título: *"Please set your own Pin Code"*.
- `OtpInput` 5 dígitos + texto *"Set Pin Code (5-digit)"*.
- CTA **Continue** → Dashboard (auto-login).

### 5.5 Recovery (password / PIN)

Mismo patrón para ambos:

1. **`/recovery/password`** o `/recovery/pin`: input email → botón **Get Code** → `…/sent`.
2. **`…/sent`**: ilustración de estado, mensaje *"Check your email"*, link *"Send again"*.
3. **`…/new`** (deep-link desde correo): nueva password / PIN + confirm → **Continue** → `/login`.

### 5.6 Dashboard

- **Ruta**: `/`.
- **Layout**: `AppLayout` (header + bottom nav).
- **Header**:
  - Saludo *"Good morning, Facundo 👋"*.
  - Avatar circular con dropdown a `/profile`.
  - Botón theme toggle.
- **Hero card** de saldo:
  - Label *"Current balance"*.
  - Monto destacado `$6,302.02`.
  - Ring de progreso de uso anual.
  - Subtexto *"Annual Benefits Balance · 62% used"*.
  - Mini-chips: *"Last Pay 22 May"* · *"Next pay 22 Nov"*.
- **Quick actions** (grid 4 cols mobile, icon + label):
  - Deposit · Transfer · Withdraw · Access Check.
- **Banner promocional**:
  - *"Build a better you with benefits that fit your life."*
  - CTA **Explore now** → `/perks`.
- **Sección "Your Top Picks"** (cards horizontales scroll):
  - Categorías Health · Wellness · Financial · Lifestyle (chips con icono).
- **Active services** (lista vertical con `PerkRow`):
  - Imagen / icono categoría · nombre · status (`Subscribed`, `1 month/s left`, `Free`).
  - Link **See all** → `/perks/actives`.
- **Last transactions**:
  - Item: avatar/icon · concepto (Gym, Service payment, Payment transferred) · hora · monto signed.
  - Link **See all** → `/activity`.

### 5.7 Perks: details / buy / checkout

#### 5.7.1 `/perks` — Catálogo

- Tabs por categoría con estado activo visible.
- Search + filtros (sheet bottom).
- Grid de `PerkCard` (img cover, título, categoría chip, precio "from $X /mo", badge premium si aplica).

#### 5.7.2 `/perks/:perkId` — Perk Details

- Hero image + back button.
- Título grande, categoría, rating.
- Sección **Information** con bullets (textos largos del wireframe).
- Sección **Plans**: tarjetas selección (suscripción 1/3/6 meses, short plan 14 días, etc.), cada una con precio (`$540.00`, `$720.00`) y "Saved X month/days".
- CTA fixed bottom: **Buy perk** → `/perks/:perkId/checkout`.
- Subtexto: *"By completing your purchase, you acknowledge that you have read and agree to be bound by our Terms of Use."*

#### 5.7.3 `/perks/:perkId/checkout` — Complete Payment

- Resumen estilo recibo: producto, plan elegido, fee, total.
- Sección **Select your payment method**: cards seleccionables (Wallet SwitchPay, PayPal, Mercado Pago).
- CTA **Pay now** → modal `SecurityPin` → modal `SuccessMessage`.

### 5.8 Money management (deposit / transfer / withdraw)

#### 5.8.1 `/wallet/deposit`

- Card con **alias** (`facundo.alvarez.pay`) + botón copy.
- Texto: *"Copy your alias to deposit funds from another account."*
- Lista de métodos externos (PayPal, Mercado Pago, transfer bancario).

#### 5.8.2 `/wallet/transfer` — Choose Recipient

- Búsqueda por alias (`facu.alvarez.pay`).
- Recientes (avatar + nombre + alias): Mónica Báez, Veronica Perez, Alfonso Perez, Ramiro Lizarraga.
- CTA **Continue** con recipient seleccionado.

##### Send Money (sub-paso)

- *"¿How much would you like to transfer?"*
- `AmountInput` USD grande centrado.
- Concepto opcional.
- Recipient resumido arriba (avatar + alias).
- CTA **Send transfer** → `/wallet/transfer/confirm`.

##### Complete Transfer

- Recibo con **From / To / Amount / Fee / Total / Date / Method**.
- CTA **Send** → `SecurityPin` → `SuccessMessage` *"Payment transferred"*.

#### 5.8.3 `/wallet/withdraw`

- Igual a transfer pero destino: cuenta externa (PayPal / banco).
- Campos: monto, método, fee, total.

### 5.9 Wallet history & activities

#### 5.9.1 `/activity`

- Header con filtros chips: **All time / All types / All methods**.
- Grupo por día (`Today`, `May 12th`, `May 11th`, …).
- `TransactionRow`: avatar/icon · concepto · hora · monto signed (verde +, ink −).
- Empty state con ilustración y mensaje.

#### 5.9.2 `/activity/:txId`

- Header con icono grande del tipo (Service payment, Money transfer, Deposit, Perk payment).
- Monto destacado (color según tipo).
- Detalles: ID, Date, Time, Method, Fee, Status (`Payment received`, `Checking payment`).
- Acciones: **Send again** (si aplica), **Close**.

#### 5.9.3 `/wallet/history` y **Set Wallet Filters**

- Sheet/Drawer con:
  - **Time Period**: Today, Last 7 days, Last Month, Last Year, All time, custom.
  - **Transaction Types**: Deposits, Transfers, Withdraws, Perk payment, Suscription, Service payment.
  - **Method**: PayPal, Mercado Pago, Wallet.
  - Botones **Reset all filters** y **Apply**.

### 5.10 Active perks (mis suscripciones)

- **Ruta**: `/perks/actives`.
- Tabs: **Suscriptions** / **Short plans**.
- `ActivePerkCard`: icono categoría, nombre, status (`1 month/s left`, `14 day/s left`, `2 days left`, `Free`), próxima renovación.
- Tap → drawer/modal **Suscription manager**:
  - Info del plan, fecha próxima cobro, método.
  - Botón destructive **Cancel subscription** → modal `CANCEL SUSCRIPTION`:
    - *"Are you sure you'd like to cancel this perk?"*
    - Texto largo de política (incluido en wireframe).
    - CTAs **Go back** / **End subscription** (destructive).

### 5.11 Access check (identidad en comercios)

#### 5.11.1 `/access-check`

- Fullscreen con QR grande.
- Texto: *"This is your digital key to quickly and securely identify yourself at partner locations."*
- Timer de refresh (`01:32`) y botón **Verify your identity manually** → `/access-check/manual`.
- Botón **Close** o swipe-down.

#### 5.11.2 `/access-check/manual`

- Texto: *"Please provide your alias and PIN code for manual identity verification."*
- `FormField` Alias + `OtpInput` PIN.
- CTA **Verify**.

### 5.12 Profile & settings

#### 5.12.1 `/profile` — Resumen

- Avatar grande + nombre + alias (`facundo.alvarez.pay`).
- Lista de secciones (icon + label + chevron):
  - **Profile information** → `/profile/personal`.
  - **Security** → `/profile/security`.
  - **Payment methods**.
  - **Appearance** → toggle light/dark.
  - **Sessions** → `/profile/sessions`.
  - **Logout** (destructive, modal de confirmación).

#### 5.12.2 `/profile/personal`

- Form: Full name, Email, Date.
- Botón **Save** (sticky).

#### 5.12.3 `/profile/security`

- Cards:
  - **Change password** → `/profile/security/password`.
  - **Change pin code** → `/profile/security/pin`.
  - **Change alias** → `/profile/security/alias` (modal `UPDATE ALIAS`).
  - **Sessions** → list.

#### 5.12.4 `/profile/appearance`

- Toggle Light / Dark / System.
- Preview en mini-card.

---

## 6. Componentes globales

> Localización sugerida: `src/components/core/` y `src/components/fragments/`.

| Componente            | Descripción                                                      |
| --------------------- | ----------------------------------------------------------------- |
| `BrandLogo`           | Logo reutilizable en auth, header y estados principales.         |
| `Header`              | Top bar con back / título / acciones.                            |
| `BottomNav`           | 5 items con icono + label, indicador de ruta activa.             |
| `BalanceCard`         | Hero card del Dashboard, ring de progreso animado.               |
| `QuickActionGrid`     | Grid de quick actions con icon + label.                          |
| `PromoBanner`         | Banner con contenido promocional + CTA.                          |
| `CategoryChips`       | Chips horizontales con icono.                                    |
| `PerkCard`            | Card del catálogo (img, título, precio, badge).                  |
| `ActivePerkCard`      | Card de perk activo (status + tiempo restante).                  |
| `TransactionRow`      | Fila de transacción con avatar/icon, concepto, monto signed.     |
| `RecipientRow`        | Avatar + nombre + alias para transferencias.                     |
| `AmountInput`         | Input grande centrado en USD, con teclado numérico mobile.       |
| `OtpInput`            | 5 (PIN) o 6 (OTP) celdas, masking opcional.                      |
| `FormField`           | Wrapper label + input + error + helper.                          |
| `EmptyState`          | Ilustración + título + subtítulo + CTA opcional.                 |
| `Stepper`             | Para flujos register / checkout.                                 |
| `Drawer` / `Sheet`    | Reuso shadcn para filtros y subscription manager.                |
| `SuccessScreen`       | Layout reusable: ilustración + check + monto + CTA.              |
| `SecurityPinModal`    | Modal global que pide PIN antes de operaciones sensibles.        |
| `ConfirmDialog`       | Genérico para cancelaciones (usa `AlertDialog` shadcn).          |

---

## 7. Modales y estados globales

### 7.1 `SecurityPinModal` (`GLOBAL / SECURITY PIN CODE`)

- Trigger: cualquier operación que mueva dinero (transfer, withdraw, buy perk, change settings críticas).
- Contenido: título *"Enter pin code before continuing"*, `OtpInput` 5 dígitos.
- Auto-submit al completar. Si falla: shake + `error`. 3 intentos → bloqueo temporal.

### 7.2 `SuccessScreen` (`GLOBAL / SUCCESS MESSAGE`)

- Layout fullscreen con:
  - Ilustración de estado.
  - Headline grande (`Congrats!`, `Great!`).
  - Subtexto contextual (*"Payment transferred"*, *"You've subscribed for transportation perk."*).
  - Monto destacado si aplica.
  - CTA principal: **Return** o **Continue**.

### 7.3 `CancelSubscriptionDialog`

- Pregunta de confirmación + texto de política + CTAs **Go back** / **End subscription** (destructive).

### 7.4 Toast / Notificaciones

- Usar `useToast` de shadcn ya disponible.
- Variantes: `success`, `error`, `info`.

---

## 8. Datos mock y entidades

> Crear `src/data/mockData.ts` con datasets para alimentar todas las pantallas.

### Entidades sugeridas (`src/entities/`)

```ts
// user.entity.ts
type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  alias: string;          // ej. "facundo.alvarez.pay"
  avatarUrl: string;
  createdAt: string;
};

// wallet.entity.ts
type Wallet = {
  userId: string;
  balance: number;        // 6302.02
  annualBudget: number;   // 10000
  usedPercent: number;    // 62
  lastPayDate: string;
  nextPayDate: string;
};

// perk.entity.ts
type PerkCategory = "health" | "wellness" | "financial" | "lifestyle"
                  | "food" | "transport" | "internet";
type Perk = {
  id: string;
  name: string;          // "Transportation perk"
  category: PerkCategory;
  cover: string;
  description: string;
  plans: Plan[];
  premium?: boolean;
};
type Plan = {
  id: string;
  type: "subscription" | "short";
  duration: "1d" | "7d" | "14d" | "1m" | "3m" | "6m" | "1y";
  price: number;
  saving?: string;       // "3 Months Saved"
};

// subscription.entity.ts
type Subscription = {
  id: string;
  perkId: string;
  planId: string;
  startedAt: string;
  expiresAt: string;
  status: "active" | "expiring" | "free" | "cancelled";
};

// transaction.entity.ts
type TxType = "deposit" | "transfer" | "withdraw"
            | "perk-payment" | "subscription" | "service-payment";
type TxStatus = "received" | "checking" | "sent" | "failed";
type Transaction = {
  id: string;
  type: TxType;
  amount: number;        // positivo o negativo según dirección
  fee?: number;
  method: "wallet" | "paypal" | "mercadopago" | "bank";
  counterpart?: { name: string; alias?: string; avatarUrl?: string };
  concept?: string;
  date: string;          // ISO
  status: TxStatus;
};

// alias-contact.entity.ts
type AliasContact = {
  alias: string;
  fullName: string;
  avatarUrl?: string;
};
```

### Datos sembrados mínimos

- 1 user (Facundo Alvarez, alias `facundo.alvarez.pay`).
- 1 wallet con balance `$6,302.02`, `62%` used.
- 6+ perks con planes (transportation, gym, internet, food & drink, mental health, lifestyle).
- 3+ subscriptions activas (Food & Drink subscribed, Internet free, Transportation 14d/2d left).
- 4+ aliasContacts (Mónica, Veronica, Alfonso, Ramiro).
- 15+ transactions distribuidas en distintos días para historial agrupado.

---

## 9. Estado, hooks y servicios

### Stores (Zustand)

- `useAuthStore` — `user`, `session`, `pinVerified`, `login`, `logout`, `requirePin()`.
- `useWalletStore` — `wallet`, `transactions`, `transfer`, `deposit`, `withdraw`.
- `usePerksStore` — `catalog`, `actives`, `subscribe`, `cancel`.
- `useUiStore` — `theme`, `bottomNavVisible`, `openModal('security-pin' | 'success' | …)`.

### Hooks

- `useWallet()` selector + helpers de formato.
- `usePerks(category?)`.
- `useTransactions(filters)`.
- `useSecurityPin()` — abre modal y devuelve promise resuelta al validar PIN.
- `useTheme()` — light/dark.
- `useBottomNav()` — show/hide en rutas concretas.

### Helpers

- `formatCurrency(amount, currency='USD')`.
- `formatDate`, `formatRelativeTime`, `groupByDay`.
- `maskAlias`, `maskPin`.
- `validateEmail`, `validatePassword`, `validatePin`.

---

## 10. Accesibilidad y responsive

- **Mobile-first**: 360–414px referencia. Tap targets ≥ 44px.
- **Safe areas** iOS: padding bottom dinámico para `BottomNav`.
- **Contraste**: cumplir AA (4.5:1 texto, 3:1 UI).
- **Keyboard**: foco visible en todo input/CTA. Modales con focus-trap (shadcn ya lo provee).
- **Screen readers**: aria-label en quick actions, `aria-live="polite"` en saldo.
- **Motion**: respetar `prefers-reduced-motion`.
- **Dark mode**: testear todas las pantallas y asegurar contraste consistente.
- **Desktop (opcional)**: contenedor mobile centrado y soporte para ilustraciones laterales en auth.

---

## 11. Checklist de implementación

### Fundaciones

- [ ] Layouts (`AuthLayout`, `AppLayout`) con safe areas y theme provider.
- [ ] Router con rutas públicas / protegidas y guard de PIN.
- [ ] `mockData.ts` cargado y stores Zustand inicializados.

### Auth

- [ ] `/welcome`, `/login`, `/login/password`, `/login/pin`.
- [ ] `/register`, `/register/profile`, `/register/pin`.
- [ ] `/recovery/password*`, `/recovery/pin*`.

### Core app

- [ ] Dashboard con `BalanceCard`, quick actions, banner, active services, last transactions.
- [ ] BottomNav 5 ítems.
- [ ] Theme toggle funcional.

### Perks

- [ ] Catálogo `/perks` con filtros y categorías.
- [ ] Details `/perks/:id` con planes (subscription / short).
- [ ] Checkout con select payment method.
- [ ] Active perks con cancelación.

### Money

- [ ] Deposit (alias copy + métodos).
- [ ] Transfer (recipient → amount → confirm → success).
- [ ] Withdraw.
- [ ] Wallet history con filtros.

### Activity

- [ ] List + agrupación por día.
- [ ] Detail page con todos los campos.

### Access check

- [ ] QR fullscreen + timer + manual fallback.

### Profile

- [ ] Personal info, Security (password / PIN / alias), Sessions, Appearance.

### Globales

- [ ] `SecurityPinModal`, `SuccessScreen`, `ConfirmDialog`.
- [ ] Toast configurado.
- [ ] Empty states con ilustraciones.

### QA

- [ ] Light + dark en todas las pantallas.
- [ ] Validaciones de formularios.
- [ ] Estados loading / empty / error.
- [ ] Navegación back consistente.
- [ ] Accesibilidad (axe / Lighthouse).

---

> **Notas finales**
>
> - Este spec **deriva 1:1 del wireframe** `bank.excalidraw`. Cualquier
>   ambigüedad debe resolverse priorizando lo que el wireframe muestra.
> - Para **ilustraciones nuevas** (success states extra, empty states,
>   onboarding alterno), seguir la sección visual correspondiente del README.
> - **No** importar assets, componentes ni estilos del proyecto raíz
>   `banking-app`; este lab es independiente y debe construirse con sus
>   propios recursos.
