# Design System — Reference

Reglas para consumir, extender y mantener el sistema visual del proyecto. Define como se usan los primitive tokens, como se implementa dark mode y como se integran los archivos de configuracion.

---

## Arquitectura de tokens

El sistema visual se construye sobre una sola capa de **primitive tokens**. No existe capa semantica intermedia. Los componentes consumen los primitives directamente a traves de las utilidades de Tailwind generadas desde CSS custom properties.

### Flujo

```
index.css (@theme inline) → Tailwind utilities → componentes (clases)
```

- `src/styles/index.css` define las CSS custom properties dentro de `@theme inline`.
- Tailwind genera automaticamente las utilidades a partir de esas variables (ej. `--color-primary` → `bg-primary`, `text-primary`, `border-primary`).
- `tailwind.config.ts` extiende solo lo que `@theme inline` no resuelve (container, plugins).
- Los componentes consumen exclusivamente clases de Tailwind y la utilidad `cn()` para merge condicional.

### Reglas

- No crear tokens semanticos como `--background`, `--foreground`, `--muted` ni redefinirlos en `:root` / `.dark`.
- No usar `var(--token)` en estilos inline de componentes. Todo se resuelve con clases de Tailwind.
- No duplicar tokens entre `index.css` y `tailwind.config.ts`. La fuente de verdad es `@theme inline` en `index.css`.

---

## Convencion de naming de tokens

### Formato

```
category-role-variant
```

### Ejemplos validos

```
color-primary
color-primary-hover
color-neutral-off-dark
spacing-md
radius-lg
blur-sm
z-modal
```

### Reglas

- Describir categoria y rol, no el componente ni la pantalla donde se usa.
- No usar valores puros como nombre: `green-500`, `16px`, `radius-8` estan prohibidos.
- Mantener variantes intuitivas: `off`, `hover`, `dark`, `foreground` cuando el grupo lo necesite.
- No agregar tokens superfluos. Si un valor se usa una sola vez y no justifica un token, evaluar si realmente pertenece al sistema.

---

## Paleta de color

### Grupos de la paleta

| Grupo | Tokens | Proposito |
|---|---|---|
| `neutral` | `neutral`, `neutral-off`, `neutral-off-dark`, `neutral-surface-dark`, `neutral-dark` | Fondos, textos y bordes base |
| `primary` | `primary`, `primary-off`, `primary-hover`, `primary-foreground` | Accion principal, branding |
| `accent` | `accent`, `accent-off`, `accent-hover`, `accent-foreground` | Enfasis secundario |
| `secondary` | `secondary`, `secondary-off`, `secondary-hover`, `secondary-foreground` | Complemento de accent |
| `tertiary` | `tertiary`, `tertiary-off`, `tertiary-hover` | Tercer nivel de acento |
| `feedback` | `info`, `warning`, `success`, `error` | Estados de feedback invariantes |

### Reglas

- La paleta neutral es la base del sistema. Todo fondo, texto y borde que no sea de accion o feedback usa neutral.
- Los colores de feedback (`info`, `warning`, `success`, `error`) son invariantes entre light y dark.
- No crear tokens de color fuera de estos grupos sin justificacion.
- `foreground` indica el color de texto sobre una superficie de ese grupo (ej. `text-primary-foreground` sobre `bg-primary`).

---

## Dark mode

Dark mode se implementa exclusivamente con la variante `dark:` de Tailwind. La estrategia es `class` — el tema se activa con la clase `.dark` en el elemento raiz.

### Patron de consumo

Cada clase que cambia entre light y dark lleva su par explicito:

```tsx
<div className="bg-neutral dark:bg-neutral-dark text-neutral-dark dark:text-neutral">
```

### Mapeos habituales

| Rol visual | Light | Dark |
|---|---|---|
| Fondo principal | `bg-neutral` | `dark:bg-neutral-dark` |
| Fondo secundario / surface | `bg-neutral` | `dark:bg-neutral-surface-dark` |
| Texto principal | `text-neutral-dark` | `dark:text-neutral` |
| Texto secundario | `text-neutral-off-dark` | `dark:text-neutral-off` |
| Borde por defecto | `border-neutral` | `dark:border-neutral-surface-dark` |
| Fondo muted / chips | `bg-neutral` | `dark:bg-neutral-off-dark` |
| Error / destructivo | `bg-error` / `text-error` | (invariante) |
| Ring de foco | `ring-primary` | (invariante) |

### Reglas

- Siempre declarar el par light + dark explicitamente. No depender de un default implicito.
- No redefinir variables CSS en `:root` y `.dark` para simular dark mode. Usar la variante `dark:` de Tailwind.
- Los tokens primitives son invariantes. El cambio light/dark se resuelve en cada componente eligiendo el token correcto con `dark:`.
- Los colores de feedback y `ring-primary` no necesitan variante `dark:` — son invariantes.

---

## Bordes

El base layer en `index.css` aplica borde por defecto a todos los elementos:

```css
* { @apply border-neutral dark:border-neutral-surface-dark; }
```

### Reglas

- No redefinir el borde global en componentes individuales salvo que necesiten un color distinto.
- Usar los tokens de radio (`rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-full`) para border-radius.
- No hardcodear valores de radio como `rounded-[8px]`. Si el radio necesario no existe, agregar un token.

---

## Tipografia

### Familias

| Token | Clase | Uso |
|---|---|---|
| `--font-primary` | `font-primary` | Familia principal — Poppins. Se aplica por defecto en body. |
| `--font-secondary` | `font-secondary` | Familia secundaria — Inter. Para contextos especificos. |

### Escala tipografica

La escala usa los tokens `text-xs` a `text-3xl` definidos en `@theme inline`. Los componentes consumen las clases estandar de Tailwind que mapean a estos tokens.

### Pesos

Valores disponibles: `font-light` (300), `font-normal`/`font-regular` (400), `font-medium` (500), `font-semibold` (600), `font-bold` (700), `font-extrabold` (800), `font-ultra-bold` (900).

### Reglas

- No hardcodear font-family, font-size ni font-weight. Usar las clases de Tailwind generadas desde los tokens.
- `font-primary` se aplica globalmente en body. Solo declarar `font-secondary` cuando se necesite cambiar familia explicitamente.
- Combinaciones habituales de jerarquia de texto:
  - Heading: `text-xl font-semibold` o `text-2xl font-bold`.
  - Body: `text-sm font-medium` o `text-base font-normal`.
  - Caption / metadata: `text-xs`.

---

## Spacing

La escala de spacing esta definida en tokens (`spacing-xs` a `spacing-2xl`). Tailwind los consume automaticamente como utilidades de gap, padding y margin.

### Reglas

- Preferir la escala del sistema (`gap-2`, `p-4`, `m-3`) sobre valores arbitrarios.
- No usar valores arbitrarios con brackets (`ml-[72px]`, `pt-[3.5rem]`) salvo que el valor no lo cubra ningun token existente y no justifique crear uno nuevo.
- Si un valor arbitrario se repite en mas de un lugar, convertirlo en token.

---

## Opacidad y transparencias

### Tokens de opacidad

| Token | Valor | Uso |
|---|---|---|
| `opacity-disabled` | `0.4` | Elementos deshabilitados |
| `opacity-muted` | `0.7` | Texto o superficies atenuadas |

### Transparencia sobre colores

Tailwind permite aplicar opacidad directamente sobre un color con la sintaxis `/`:

```tsx
<div className="bg-neutral/80 dark:bg-neutral-dark/80" /> 
```

### Reglas

- Usar la sintaxis `color/opacity` de Tailwind para fondos con transparencia, no `rgba()` ni `opacity` como propiedad.
- Reservar `opacity-disabled` y `opacity-muted` para estados funcionales, no para decoracion.

---

## Elevacion y sombras

### Tokens disponibles

| Token | Clase | Uso |
|---|---|---|
| `--shadow-sm` | `shadow-sm` | Elevacion sutil — cards, chips |
| `--shadow-md` | `shadow-md` | Elevacion media — dropdowns, popovers |

### Reglas

- No crear sombras inline con `style`. Usar las clases `shadow-sm` y `shadow-md`.
- Si se necesita un nuevo nivel de elevacion, agregar el token en `index.css` dentro de `@theme inline`.

---

## Blur

### Tokens disponibles

| Token | Clase | Uso |
|---|---|---|
| `--blur-sm` | `blur-sm` | Desenfoque ligero |
| `--blur-md` | `blur-md` | Glassmorphism, overlays |
| `--blur-lg` | `blur-lg` | Fondos difusos pesados |

### Reglas

- Usar `backdrop-blur-*` para efectos sobre el fondo del elemento (glassmorphism).
- Usar `blur-*` para desenfocar el contenido del elemento.
- No hardcodear valores de blur.

---

## Z-Index

### Tokens disponibles

| Token | Valor | Uso |
|---|---|---|
| `z-base` | `1` | Elementos con stacking minimo |
| `z-dropdown` | `100` | Menus desplegables, tooltips |
| `z-modal` | `1000` | Modales, dialogs |
| `z-toast` | `1100` | Notificaciones toast |

### Reglas

- Usar exclusivamente los tokens de z-index para controlar jerarquia de capas.
- No inventar valores intermedios como `z-50`, `z-[999]`. Si la jerarquia actual no alcanza, evaluar si la estructura del DOM es correcta antes de agregar un token.
- El header fijo y el sidebar deben respetar la jerarquia: header por encima del sidebar, ambos por debajo de modales.

---

## Motion y transiciones

### Tokens de duracion

| Token | Valor |
|---|---|
| `motion-duration-fast` | `120ms` |
| `motion-duration-normal` | `240ms` |
| `motion-duration-slow` | `400ms` |

### Easing

Un unico easing estandar: `ease-standard` → `ease-in-out`.

### Patrones de uso en componentes

- `transition-colors` para cambios de color en hover/focus.
- `transition-transform` con `duration-200` para escalas en hover.
- Animaciones custom se definen como `@keyframes` en `index.css` y se registran como `--animate-*` en `@theme inline`.

### Reglas

- Mantener las transiciones conservadoras: solo `transition-colors` y `transition-transform` salvo necesidad especifica.
- No agregar `transition-all` por conveniencia — especificar la propiedad exacta.
- Nuevas animaciones se definen como keyframe en `index.css` y se registran en `@theme inline` como `--animate-*`.
- No definir keyframes inline ni en archivos CSS por componente.

---

## Gradientes

### Tokens definidos

```
gradient-primary:   135deg, primary → accent
gradient-secondary: 180deg, rgba(255,255,255,0.10) → transparente
gradient-tertiary:  180deg, transparente → rgba(26,26,26,0.72)
```

### Reglas

- Los gradientes se consumen como clases de Tailwind cuando estan registrados, o como CSS custom properties.
- No hardcodear gradientes inline con `background: linear-gradient(...)`. Si se necesita uno nuevo, registrarlo como token.

---

## Como agregar un token nuevo

1. Definir la CSS custom property en `src/styles/index.css` dentro del bloque `@theme inline`, en la seccion correspondiente a su categoria.
2. Tailwind genera automaticamente la utilidad. No es necesario tocar `tailwind.config.ts` salvo para plugins o configuraciones que `@theme inline` no soporte.
3. Seguir la convencion de naming: `category-role-variant`.
4. Documentar el token nuevo en `docs/markdown/design-tokens.md` dentro de su grupo.

### Reglas

- No agregar tokens en `tailwind.config.ts` si pueden vivir en `@theme inline`.
- No agregar tokens que solo se usan una vez — evaluar si es una constante del componente o un token del sistema.
- Cada token nuevo debe pertenecer a un grupo existente. Si define un grupo nuevo, justificarlo.

---

## Archivos de configuracion

### `src/styles/index.css`

- Fuente de verdad de todos los primitive tokens (dentro de `@theme inline`).
- Define la variante dark: `@custom-variant dark (&:is(.dark *))`.
- Contiene el base layer (`@layer base`) con reset de borde y estilos de body.
- Define keyframes y animaciones custom.
- Define utilidades custom (`@utility`).

#### Reglas

- No agregar estilos de componente aqui. Solo tokens, base layer, keyframes y utilidades custom.
- Mantener las secciones con comentarios de separacion por categoria de token.
- No importar otros archivos CSS desde aqui salvo `tailwindcss`.

### `tailwind.config.ts`

- Extiende solo lo que `@theme inline` no cubre: `container`, plugins.
- El plugin `tailwindcss-animate` se carga aqui.
- `darkMode: ["class"]` habilita dark mode por clase.

#### Reglas

- No duplicar tokens ya definidos en `@theme inline`.
- No agregar colores, spacing ni typography aqui — van en `index.css`.
- Mantener el config minimo: solo extensiones que requieren la API de config de Tailwind.

### `postcss.config.js`

- Carga `@tailwindcss/postcss` y `autoprefixer`.
- No requiere modificacion frecuente.

#### Regla

- No agregar plugins de PostCSS sin justificacion. El pipeline es `tailwindcss → autoprefixer`.

### `components.json`

- Configuracion de shadcn: estilo, aliases, ruta de CSS, uso de CSS variables.
- Los aliases deben coincidir con los paths de `tsconfig.app.json`.

#### Regla

- No modificar aliases sin actualizar tambien `tsconfig.app.json`.

---

## Anti-patrones

| Anti-patron | Por que evitarlo |
|---|---|
| `bg-background`, `text-foreground`, `bg-muted` | Tokens semanticos intermedios — usar primitives directamente |
| `var(--background)` con redefinicion en `:root`/`.dark` | Viola la estrategia de dark mode con variante `dark:` |
| `style={{ color: '#5EE1C0' }}` | Hardcodeo de valores — usar la clase `text-primary` |
| `neutral-white`, `neutral-light` | Tokens superfluos — la paleta neutral se resuelve con los tokens existentes |
| `padding-card`, `border-radius-primary` | Nombres acoplados a componentes |
| `color-green-500`, `radius-8` | Nombres basados en valores puros |
| `transition-all` | Demasiado amplio — especificar la propiedad exacta |
| `z-[999]`, `z-50` | Z-index arbitrarios fuera de los tokens del sistema |
| `rounded-[8px]`, `ml-[72px]` | Valores arbitrarios que deberian ser tokens |
| Crear archivos `.css` por componente | Todo se resuelve con Tailwind y tokens globales |
| `className="bg-blue-500"` | Usar colores de Tailwind que no pertenezcan a la paleta del proyecto |
