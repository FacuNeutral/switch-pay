# SwitchPay Brand Manual

Manual oficial de marca y dise�o visual de **SwitchPay**, la app interna de beneficios laborales.
Este documento es la fuente de verdad del sistema visual: tokens, logo, tipograf�a, color, iconograf�a,
componentes UI y aplicaciones de marca. Cada secci�o tiene su par espejo dentro de la devtool
`brand-design`.

> Idea central: *Your benefits. Your choice. Your way.*
> Sensaci�n: confianza bancaria, cercan�a humana, libertad de elecci�n.

---

## 01. Brand Foundation

La identidad de SwitchPay se construye sobre tres pilares:

- **Switch** � cambiar, transformar, elegir.
- **Pay** � confianza bancaria, seguridad, transparencia.
- **You** � la persona en el centro: "tus beneficios, tu vida".

### Personalidad

- Confiable pero amable
- Premium pero simple
- Tecnol�gica sin verse compleja
- Minimalista pero c�lida

### Principios visuales

1. **Claridad antes que decoraci�n** � cada elemento aporta lectura.
2. **Acento controlado** � un solo color de acci�n por pantalla.
3. **Aire generoso** � spacing wide, jerarqu�a fuerte.
4. **Curvatura coherente** � esquinas redondeadas grandes y consistentes.
5. **Color con prop�sito** � verde aqua para acci�n y bienestar; morado para cambio inteligente.

---

## 02. Logo

El logo combina un **isotipo "S" de tres bandas** y un **wordmark "Switch Pay"**.
La "S" est� construida como tres paralelogramos diagonales ascendentes, evocando
"switch" (cambio) y movimiento controlado.

### Componentes

- **Isotipo (mark)** � la "S" sola para favicon, app icon, QR, badges.
- **Wordmark** � texto "Switch Pay" en typeface principal.
- **Lockup horizontal** � isotipo a la izquierda, wordmark a la derecha.
- **Lockup vertical** � isotipo arriba, wordmark debajo. Para tarjetas y stationery.

### Versiones de color

- **Primary** � isotipo en `primary-aqua` sobre fondo claro o `surface-dark`.
- **Inverse** � isotipo en blanco sobre fondo oscuro o sobre acento.
- **Mono dark** � isotipo en `ink` sobre fondo claro neutral.
- **Mono light** � isotipo en blanco sobre fondo oscuro o color s�lido.

### Clearspace

El espacio libre m�nimo alrededor del logo es **igual a la altura de una banda del isotipo (`x`)**.
Ning�n texto, imagen ni elemento gr�fico debe invadir ese margen.

### Tama�os m�nimos

| Aplicaci�n          | Tama�o m�nimo |
| ------------------- | -------------- |
| Isotipo digital     | `24px`         |
| Lockup horizontal   | `120px` ancho  |
| Lockup vertical     | `96px` ancho   |
| Favicon             | `16px`         |

### Usos incorrectos

- No deformar, rotar ni inclinar el logo.
- No cambiar los colores fuera de la paleta primaria.
- No aplicar sombras, contornos ni efectos.
- No colocar el logo sobre fondos con bajo contraste (< 4.5:1).
- No componer el wordmark en otra fuente.

---

## 03. Color Palette

La paleta combina un **verde aqua** vibrante y un **morado** complementario,
sostenidos por una base neutral c�lida que funciona en dark y light.

### Primary � Aqua

Acci�n, confirmaci�n, branding, progreso, bienestar.

| Token              | HEX        | Uso                                         |
| ------------------ | ---------- | ------------------------------------------- |
| `primary`          | `#15B981`  | CTAs, links, branding, isotipo              |
| `primary-hover`    | `#0FA571`  | Estado hover/pressed                        |
| `primary-soft`     | `#DCF6E7`  | Fondos suaves, chips informativos (light)   |
| `primary-foreground` | `#062014` | Texto sobre `bg-primary`                   |

### Accent � Purple

Cambio inteligente, switch, elementos secundarios, perks premium.

| Token              | HEX        | Uso                                         |
| ------------------ | ---------- | ------------------------------------------- |
| `accent`           | `#6F4DE8`  | Tags premium, switch icons, badges          |
| `accent-hover`     | `#5A3DD1`  | Hover/pressed accent                        |
| `accent-soft`      | `#E8E1FF`  | Fondos suaves accent (light)                |
| `accent-foreground`| `#FFFFFF`  | Texto sobre `bg-accent`                     |

### Neutral � Light

Base para light mode.

| Token                 | HEX        | Uso                                |
| --------------------- | ---------- | ---------------------------------- |
| `neutral`             | `#FFFFFF`  | Fondo base claro                   |
| `neutral-off`         | `#F4F8F7`  | Fondo secundario, listas alternas  |
| `neutral-mist`        | `#EDF7F5`  | Banners suaves, secciones tonales  |
| `neutral-line`        | `#D9E8E5`  | Bordes, dividers                   |
| `neutral-muted`       | `#5C6B70`  | Texto secundario, captions         |
| `neutral-ink`         | `#102021`  | Texto principal sobre claro        |

### Neutral � Dark

Base para dark mode.

| Token                 | HEX        | Uso                                |
| --------------------- | ---------- | ---------------------------------- |
| `neutral-dark`        | `#09111F`  | Fondo base oscuro                  |
| `neutral-surface-dark`| `#101B2E`  | Surfaces elevadas, cards           |
| `neutral-card-dark`   | `#17243A`  | Cards sobre surfaces, modales      |
| `neutral-line-dark`   | `#22324A`  | Bordes dark                        |
| `neutral-muted-dark`  | `#9BAEB7`  | Texto secundario en dark           |
| `neutral-ink-dark`    | `#F1FAF8`  | Texto principal en dark            |

### Feedback

Invariantes entre light y dark.

| Token       | HEX       | Uso                            |
| ----------- | --------- | ------------------------------ |
| `success`   | `#63D69F` | Confirmaciones, transacciones OK |
| `warning`   | `#F3C74D` | Avisos, l�mites                |
| `error`     | `#EF5B5B` | Errores, validaciones cr�ticas |
| `info`      | `#53C7F0` | Tips, mensajes neutros         |

### Reglas de contraste

- Texto sobre `primary` � `primary-foreground` (`#062014`) ratio ` 7:1`.
- Texto sobre `accent` � `accent-foreground` (`#FFFFFF`) ratio ` 4.5:1`.
- Texto principal (`ink` o `ink-dark`) sobre fondo neutral ratio ` 12:1`.

---

## 04. Typography

### Familia tipogr�fica

- **Primaria** � `Plus Jakarta Sans`. Sans humanista moderna, redondeada, ideal para banca digital.
- **Secundaria** � `Inter`. Para n�meros, datos densos, captions y datos tabulares.

### Escala

| Token        | Px       | Uso                                    |
| ------------ | -------- | -------------------------------------- |
| `text-xs`    | `12px`   | Captions, metadata, kbd                |
| `text-sm`    | `14px`   | Body secundario, labels                |
| `text-base`  | `16px`   | Body principal                         |
| `text-lg`    | `18px`   | Subt�tulos                             |
| `text-xl`    | `20px`   | T�tulos de card, headings menores      |
| `text-2xl`   | `24px`   | Headings de secci�n                    |
| `text-3xl`   | `30px`   | Headings principales                   |
| `text-4xl`   | `36px`   | Hero, balance display                  |

### Pesos

- `Light` 300 � decorativo
- `Regular` 400 � body
- `Medium` 500 � labels, captions destacadas
- `SemiBold` 600 � subt�tulos, botones
- `Bold` 700 � titulares, balance amounts
- `ExtraBold` 800 � hero, n�meros muy destacados

### Combinaciones tipogr�ficas

- **Hero** � `text-4xl font-extrabold tracking-tight`
- **Heading 1** � `text-3xl font-bold`
- **Heading 2** � `text-2xl font-semibold`
- **Subtitle** � `text-lg font-medium`
- **Body** � `text-base font-regular`
- **Caption** � `text-xs font-medium tracking-wide uppercase`

---

## 05. Iconography

Set de iconos lineales y redondeados, peso uniforme `1.5px`.
La librer�a base es `lucide-react` con override de `strokeWidth` para mantener
consistencia con el lenguaje del logo (curvas suaves, esquinas redondeadas).

### Iconos clave

- **Navigation** � Home, Benefits, Activity, Profile
- **Categories** � Health, Wellness, Financial, Lifestyle
- **Actions** � Buy, Transfer, Deposit, Withdraw, Pay, Switch
- **Status** � Check, Alert, Info, X, Lock, Shield
- **Utility** � Search, Filter, Settings, Bell, Help

### Reglas

- Stroke `1.5px` uniforme.
- Esquinas y joins redondeados (`stroke-linecap: round`, `stroke-linejoin: round`).
- Tama�os m�ltiplos de 4: `16, 20, 24, 28, 32`.
- Color hereda del contexto: `currentColor` por defecto.

---

## 06. Components & UI

### Botones

- **Primary** � `bg-primary text-primary-foreground rounded-2xl px-6 py-3 font-semibold`.
- **Secondary** � `border border-neutral-line text-neutral-ink rounded-2xl bg-transparent`.
- **Ghost** � `text-primary hover:bg-primary-soft`.
- **Destructive** � `bg-error text-white`.

### Cards

- Radio: `rounded-2xl` (`16px`).
- Sombra: `shadow-sm` para cards de listado, `shadow-md` para cards elevadas.
- Borde: `border-neutral-line` (light) / `border-neutral-line-dark` (dark).
- Padding interno: `p-5` standard, `p-6` para cards principales.

### Inputs

- Radio: `rounded-xl` (`12px`).
- Borde: `border-neutral-line`, `focus:border-primary` con `ring-2 ring-primary/30`.
- Padding: `px-4 py-3`.

### Chips / Tags

- Radio: `rounded-full`.
- Variante soft: `bg-primary-soft text-primary` o `bg-accent-soft text-accent`.
- Padding: `px-3 py-1 text-xs font-medium`.

### Toggles / Switches

- Track: `bg-neutral-line` apagado, `bg-primary` encendido.
- Thumb: blanco, `shadow-sm`.

---

## 07. App Surfaces

Pantallas clave y c�mo aplican la marca.

### Onboarding

Hero centrado con isotipo grande, headline en `text-3xl font-bold` y CTA en `bg-primary`.
Background neutral con un blob suave de `primary-soft` decorativo.

### Dashboard

- Hero card oscura (`bg-neutral-surface-dark`) con saldo en `text-4xl font-extrabold` y
  ring de progreso en `primary`.
- Accesos r�pidos en grilla 4-cols con icon + label.
- Lista de actividad con avatares circulares y montos en `Inter` (font-secondary).

### Benefits Picker

- Tabs por categor�a con underline en `primary`.
- Cards con imagen, t�tulo, precio y bot�n `Add benefit`.
- Empty states ilustrados con tinte primary y accent.

### Confirmation

- Resumen tipo recibo con dividers y total destacado.
- CTA destructive solo si la acci�n es irreversible.

---

## 08. Brand Imagery & Patterns

### Gradientes

- **Aqua glow** � `linear-gradient(135deg, #15B981 0%, #6F4DE8 100%)`. Hero backgrounds, banners promocionales.
- **Mist fade** � `linear-gradient(180deg, rgba(31,207,164,0.10) 0%, transparent 100%)`. Fondos suaves.
- **Night fade** � `linear-gradient(180deg, transparent 0%, rgba(9,17,31,0.6) 100%)`. Overlays sobre im�genes.

### Patrones decorativos

- Bandas diagonales de 3-bandas (eco del isotipo) como decoraci�n de fondo.
- Esferas blur muy suaves en `primary-soft` o `accent-soft`.

### Im�genes y blending

- Fotograf�a humana, c�lida, con personas reales en contextos de bienestar y trabajo.
- Para versiones mono se aplica filtro duotone `aqua` + `ink`.
- Las im�genes se enmarcan en `rounded-2xl` o `rounded-3xl`.

---

## 09. Tarjetas y Stationery

### Card f�sica de SwitchPay

- Fondo: `bg-neutral-surface-dark`.
- Logo en blanco arriba-izquierda.
- N�mero en `font-secondary tracking-widest`.
- Banda diagonal sutil de `primary` como detalle gr�fico.

### App icon

- Cuadrado redondeado, fondo `neutral-dark`, isotipo en `primary`.
- Versi�n alterna fondo `primary`, isotipo blanco.

### Social squares

- Fondo limpio (`neutral` o `neutral-dark`), isotipo + headline en `text-2xl font-bold`.
- Una sola pieza de color por composici�n.

---

## 10. Reglas r�pidas

1. Usar **un solo color de acci�n por pantalla**.
2. **Aire generoso**: padding en m�ltiplos de 4 desde 8px.
3. **Cards con `rounded-2xl`** por defecto.
4. **Texto sobre primary** siempre `primary-foreground` (`#062014`).
5. **No mezclar gradiente con sombra fuerte** en el mismo elemento.
6. **Iconograf�a stroke 1.5** en toda la app.
7. **Feedback colors invariantes** en dark y light.
8. **Logo siempre con clearspace** = altura de banda del isotipo.
