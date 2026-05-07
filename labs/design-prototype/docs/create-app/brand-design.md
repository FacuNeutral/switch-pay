# SwitchPay — Editorial Dark Brand System

> **Fuente de verdad de estilo visual.** Este documento describe **cómo se ve y
> cómo se siente** un producto construido con esta identidad: estructuras,
> jerarquía tipográfica, comportamiento de superficie, animaciones e imaginería.
>
> Sirve como **prompt-spec** para que un LLM (o un equipo) pueda recrear este
> lenguaje visual en cualquier proyecto nuevo, **sin importar el dominio del
> producto**. Aquí no se documenta arquitectura de carpetas ni contenido — solo
> diseño.
>
> Paleta tomada de [SwitchPay Brand Manual](../external-doc/switchpay-brand-manual.md).
> Estructura inspirada en [SwitchPay App Spec](../external-doc/switchpay-app-spec.md).

---

## 0. Tabla de contenidos

1. [Visión de estilo](#1-visión-de-estilo)
2. [Principios visuales](#2-principios-visuales)
3. [Design tokens](#3-design-tokens)
4. [Tipografía editorial](#4-tipografía-editorial)
5. [Layout & grid](#5-layout--grid)
6. [Componente: Hero](#6-componente-hero)
7. [Componente: Navbar (pill nav)](#7-componente-navbar-pill-nav)
8. [Componente: Cards](#8-componente-cards)
9. [Componente: Botones, chips e inputs](#9-componente-botones-chips-e-inputs)
10. [Imaginería: nature × neon](#10-imaginería-nature--neon)
11. [Iconografía](#11-iconografía)
12. [Animaciones & micro-interacciones](#12-animaciones--micro-interacciones)
13. [Estados, glows y bordes vivos](#13-estados-glows-y-bordes-vivos)
14. [Recursos visuales](#14-recursos-visuales)
15. [Checklist de implementación](#15-checklist-de-implementación)

---

## 1. Visión de estilo

Estética **editorial-dark, premium-tech**. La pantalla se siente como una
publicación nocturna: fondo casi negro, una sola tipografía de display
gigantesca, mucho aire, y una imagen orgánica iluminada con neón que respira
detrás del contenido.

- **Mood**: silencio, sofisticación, control, presencia.
- **Metáfora**: jardín nocturno con bioluminiscencia. Naturaleza viva sobre
  base oscura — orgánico encontrándose con tecnología.
- **Densidad**: baja. La página privilegia espacio negativo sobre información.
- **Acento**: un solo color de acción dominante por pantalla (aqua o purple),
  nunca ambos compitiendo.

> *Sensación final: leer una revista impresa premium en modo nocturno, donde
> cada sección respira y la imagen contrapesa el texto.*

---

## 2. Principios visuales

1. **Negro es el lienzo.** El fondo base es `neutral-dark` puro. Todo otro color
   es un evento.
2. **Tipografía como héroe.** El display tipográfico ocupa 50–70% del viewport
   en hero. La imagen acompaña, no compite.
3. **Stack tipográfico fantasma.** Las palabras del hero se apilan
   verticalmente: la primera en blanco pleno, las siguientes desvanecidas
   (`opacity 30% → 12%`), creando un eco visual.
4. **Bordes hairline.** Cada superficie usa un borde de `1px` casi invisible
   (`neutral-line-dark`). Nunca shadows pesadas.
5. **Esquinas sutiles.** Radios pequeños (`4–8px`) o rectos. Solo la pill nav
   y los chips usan `rounded-full`.
6. **Mono para metadata.** Toda etiqueta, tag, número de orden, badge o caption
   técnica usa monoespaciada en mayúsculas pequeñas.
7. **Iluminación, no decoración.** El color aparece como *glow* (resplandor
   suave detrás de un elemento) más que como fill plano.
8. **Una imagen por sección.** Cada sección tiene una sola pieza orgánica
   neon-lit como ancla visual. Nunca dos compitiendo.
9. **Movimiento contenido.** Las animaciones son lentas (400–800ms),
   amortiguadas (`ease-out`), nunca rebotan.
10. **Acento controlado.** Solo el carácter o palabra clave del hero recibe
    color; el resto del texto es blanco/gris.

---

## 3. Design tokens

Toda la paleta deriva del [Brand Manual de SwitchPay](../external-doc/switchpay-brand-manual.md).
Este sistema es **dark-first** — el modo claro es secundario.

### 3.1 Color base (dark canvas)

| Token                  | HEX        | Uso                                                     |
| ---------------------- | ---------- | ------------------------------------------------------- |
| `canvas`               | `#09090B`  | Fondo de página (alias de `neutral-dark`)               |
| `surface`              | `#0E0E10`  | Sección alternada, ligeramente más clara que el canvas  |
| `surface-raised`       | `#141416`  | Cards, modales, pill nav (`neutral-card-dark`)          |
| `surface-elevated`     | `#18181B`  | Card resaltada / "most popular" (`neutral-surface-dark`)|
| `hairline`             | `#27272A`  | Bordes 1px (`neutral-line-dark`)                        |
| `hairline-strong`      | `#3A3A3F`  | Borde de card resaltada / hover                         |

### 3.2 Texto (jerarquía dark)

| Token         | HEX        | Uso                                          |
| ------------- | ---------- | -------------------------------------------- |
| `text-hi`     | `#F4F8F7`  | Headlines, número del CTA (`neutral-ink-dark`) |
| `text-mid`    | `#A1A1AA`  | Body, párrafos, descripciones de feature     |
| `text-low`    | `#71717A`  | Captions, etiquetas, items del nav muted     |
| `text-ghost`  | `rgba(244,248,247,0.30)` | 2ª línea del hero stack         |
| `text-ghost-2`| `rgba(244,248,247,0.12)` | 3ª línea del hero stack         |

### 3.3 Acentos (un solo color por pantalla)

| Token            | HEX        | Uso                                                     |
| ---------------- | ---------- | ------------------------------------------------------- |
| `primary`        | `#15B981`  | CTA principal, glow primario, número activo del stepper |
| `primary-hover`  | `#0FA571`  | Hover/pressed                                           |
| `primary-glow`   | `rgba(21,185,129,0.35)` | Resplandor radial detrás de imágenes/cards |
| `accent`         | `#6F4DE8`  | Acento secundario, badge "most popular", letra acentuada del hero |
| `accent-glow`    | `rgba(111,77,232,0.35)` | Glow alterno                              |

### 3.4 Feedback

| Token       | HEX       | Uso                     |
| ----------- | --------- | ----------------------- |
| `success`   | `#63D69F` | Confirmaciones          |
| `warning`   | `#F3C74D` | Avisos                  |
| `error`     | `#EF5B5B` | Errores                 |
| `info`      | `#53C7F0` | Tips                    |

### 3.5 Radios, espaciado y sombras

| Token            | Valor                        | Uso                                  |
| ---------------- | ---------------------------- | ------------------------------------ |
| `radius-none`    | `0px`                        | Cards de feature, chips técnicos     |
| `radius-sm`      | `4px`                        | Inputs, items de lista               |
| `radius-md`      | `8px`                        | Cards estándar                       |
| `radius-pill`    | `9999px`                     | Nav flotante, CTA primario, badges   |
| `space-section`  | `clamp(96px, 12vw, 192px)`   | Padding vertical entre secciones     |
| `space-gutter`   | `clamp(24px, 4vw, 64px)`     | Padding horizontal de página         |
| `glow-soft`      | `0 0 80px 0 var(--primary-glow)` | Aura de imagen orgánica           |
| `glow-edge`      | `0 0 0 1px var(--primary), 0 0 24px -4px var(--primary-glow)` | Borde vivo en hover |
| `shadow-lift`    | `0 30px 60px -30px rgba(0,0,0,0.8)` | Card flotante "most popular"  |

### 3.6 Implementación CSS (referencia)

```css
:root {
  --canvas: #09090B;
  --surface: #0E0E10;
  --surface-raised: #141416;
  --surface-elevated: #18181B;
  --hairline: #27272A;
  --hairline-strong: #3A3A3F;

  --text-hi: #F4F8F7;
  --text-mid: #A1A1AA;
  --text-low: #71717A;

  --primary: #15B981;
  --primary-hover: #0FA571;
  --primary-glow: rgba(21,185,129,0.35);
  --accent: #6F4DE8;
  --accent-glow: rgba(111,77,232,0.35);

  --radius-md: 8px;
  --radius-pill: 9999px;
}
```

---

## 4. Tipografía editorial

### 4.1 Familias

- **Display / serif opcional** — `Plus Jakarta Sans` con `font-weight: 300–400`
  y `letter-spacing: -0.04em` para imitar la presencia de un serif editorial.
  *(Si el proyecto lo permite, sustituir por una serif moderna como `Fraunces`,
  `Instrument Serif` o `GT Sectra` para reforzar la sensación editorial.)*
- **Sans body** — `Plus Jakarta Sans` (400/500).
- **Mono** — `JetBrains Mono` o `Geist Mono` para tags, captions, numeración
  de pasos y badges técnicos.

### 4.2 Escala display (hero & secciones)

| Rol                 | Tamaño                             | Peso / spacing                          |
| ------------------- | ---------------------------------- | --------------------------------------- |
| `display-hero`      | `clamp(64px, 9vw, 160px)`          | `300`, `tracking: -0.045em`, `leading: 0.95` |
| `display-section`   | `clamp(48px, 6.5vw, 112px)`        | `300`, `tracking: -0.04em`              |
| `display-stack-line`| mismo que hero                     | mismo, pero color `text-ghost`/`ghost-2`|

### 4.3 Escala body & meta

| Rol           | Tamaño  | Peso / estilo                                         |
| ------------- | ------- | ----------------------------------------------------- |
| `lead`        | `18px`  | `400`, `text-mid`, max-width `52ch`                   |
| `body`        | `15px`  | `400`, `text-mid`                                     |
| `caption`     | `13px`  | `500`, `text-low`                                     |
| `eyebrow`     | `11px`  | mono, `uppercase`, `tracking: 0.18em`, `text-low`, prefijado por `—` |
| `kicker-num`  | `13px`  | mono, `text-low`, números `01 02 03` en cards-step    |
| `tag`         | `11px`  | mono, `uppercase`, `tracking: 0.12em`, dentro de chip rectangular |

### 4.4 Patrón "stack fantasma" (firma del sistema)

El hero apila 1, 2 o 3 palabras verticales con desvanecimiento:

```
Define.       ← color: text-hi      (100%)
Deploy.       ← color: text-ghost   (~30%)
Scale.        ← color: text-ghost-2 (~12%)
```

- Mismo `font-size` y `leading: 0.95` para que se toquen.
- Cada línea entra con `translateY(24px) → 0` y `opacity 0 → target` con
  delay escalonado (`0ms`, `120ms`, `240ms`).
- Variante: una sola palabra por viewport y la siguiente aparece al
  scrollear (efecto pin + crossfade).

### 4.5 Acento dentro del display

En hero principal, **una sola letra o palabra** de la frase recibe acento:

- gradiente lineal `primary → accent` aplicado vía `background-clip: text`,
- o color sólido `accent` con un `text-shadow: 0 0 24px var(--accent-glow)`.

Ejemplo: *"Distributed compute, agents that **sca**l**e**"* — solo `scale`
con gradiente.

---

## 5. Layout & grid

- **Viewport máximo de contenido**: `1280px` centrado, con `space-gutter`
  lateral. La navbar flotante respeta el mismo ancho.
- **Grid base**: 12 columnas, gutters de `24–32px`.
- **Patrón split (texto + imagen)**: texto `cols 1–6`, imagen orgánica
  `cols 7–12` con `aspect 1:1` o más alta, sangrando ligeramente al borde
  del viewport.
- **Patrón centrado**: texto en eje vertical con la imagen orgánica sangrando
  desde el borde inferior (vegetación / cliffside).
- **Patrón de grilla de cards**: 3 columnas iguales separadas por divisores
  hairline. En mobile, columna única apilada.
- **Card destacada**: dentro de una grilla puede haber **una** card elevada
  (`translateY(-16px)` + `shadow-lift`) con badge pill flotante encima
  (centrado, `bg-text-hi text-canvas`, mono uppercase).
- **Ritmo vertical**: bloques con `padding-block: space-section`. Entre
  bloques, divisor hairline opcional de ancho completo.

---

## 6. Componente: Hero

El hero es el ancla visual del sistema. Existen dos variantes; ambas comparten
el mismo lenguaje tipográfico y el patrón de imagen orgánica neon-lit.

### 6.1 Estructura común

- **Eyebrow** mono uppercase prefijado por `—`, en `text-low`.
- **Display** con tracking ajustado y `line-height: 0.95` (ver §4).
- **Lead** opcional: párrafo body en `text-mid`, `max-width: 52ch`.
- **Cluster de métricas** opcional debajo (3 ítems con número grande mono +
  caption `text-low`).
- **Imagen orgánica** (ver §10) con glow radial detrás.

### 6.2 Variante split (asimétrico)

- Eyebrow + display + lead alineados a la izquierda.
- Display en **stack fantasma** (§4.4) o en una sola línea con palabra
  acentuada.
- Imagen orgánica sangrando a la derecha del viewport.
- Métricas debajo del bloque de texto.

### 6.3 Variante centrada

- Eyebrow + display + lead centrados horizontalmente.
- Display en 2 líneas; la segunda en `text-ghost`.
- Imagen orgánica sangrando desde la base (campo florido, vegetación de
  cliff, raíces) — el texto queda flotando sobre el negro y la imagen
  ocupa el tercio inferior.

---

## 7. Componente: Navbar (pill nav)

- Posición `fixed top: 16px`, centrada, ancho `min(1100px, 92vw)`.
- Forma `radius-pill`, fondo `rgba(20,20,22,0.85)` con `backdrop-filter:
  blur(14px) saturate(140%)`, borde `1px solid hairline`.
- Altura `56–64px`, padding `8px 12px 8px 24px`.
- Layout: **logo + sufijo opcional (`™`) a la izquierda · links centrados ·
  link secundario + CTA pill a la derecha**.
- **Links**:
  - Mono o sans regular `13–14px`, `text-mid`. Hover → `text-hi`.
  - Item activo gana un underline de `1px primary` con animación
    `scaleX(0) → scaleX(1)` en 250ms.
- **CTA del navbar**: pill blanca (`bg-text-hi text-canvas`), peso 500,
  con hover `translateY(-1px)` + sombra suave.
- **Condensación al scroll**: al pasar `16px` de scroll, el navbar reduce su
  padding vertical y aumenta la opacidad del fondo (transición 300ms).

---

## 8. Componente: Cards

Todas las cards comparten el chasis base y se diferencian por contenido y
estado. Chasis base:

- Fondo `surface-raised`, borde `1px solid hairline`.
- Radio `radius-none` (rectangular editorial) o `radius-md` para variantes
  más suaves.
- Padding interno `40px 32px` en desktop; `28px 24px` en mobile.
- Comportamiento hover: ver §13 (border-glow + lift + cursor-spotlight).

### 8.1 Card numerada (kicker)

```
┌─────────────────────────────┐
│ 01 ───────────              │  ← kicker-num mono + línea hairline al borde
│                             │
│ Title                       │  ← display-section reducido (32–40px)
│ subtitle                    │  ← caption text-low
│                             │
│ Body description text...    │  ← body text-mid, max 28ch
└─────────────────────────────┘
```

- Número en mono `13px`, `text-low`. La línea hairline horizontal arranca
  después del número y se extiende hasta el borde derecho del card.

### 8.2 Card con icono

- Mismo chasis. Icono cuadrado `32×32` con borde hairline a la izquierda
  (ver §11) y a la derecha dos líneas de texto: título en `text-hi`
  semibold + descripción en `text-mid`.

### 8.3 Card métrica

- Una sola métrica gigante (`display-section`) en `text-hi`, opcionalmente
  con sufijo unidad en `text-low`. Caption descriptiva debajo.
- Puede acompañarse de una imagen orgánica integrada en el mismo card
  (mitad métrica, mitad imagen).

### 8.4 Card destacada (highlighted)

- Igual estructura que la base, pero **elevada** sobre la grilla
  (`translateY(-16px)`), con `shadow-lift` y borde `hairline-strong`.
- Lleva un **badge pill flotante** centrado sobre el borde superior
  (`bg-text-hi text-canvas`, mono uppercase, `padding: 6px 14px`).
- Su CTA interno es full-width y pill (`bg-text-hi text-canvas`).

### 8.5 Card de comparación / lista

- Header con título + subtítulo, divisor hairline, contenido principal
  (precio, métrica o headline numérico) y lista de bullets debajo.
- Bullets con icono `✓` en `primary` y texto en `text-mid`.
- Footer con CTA full-width (pill o rectangular).

---

## 9. Componente: Botones, chips e inputs

### 9.1 Botones

- **CTA primario (pill blanco)**: `bg-text-hi text-canvas`, `radius-pill`,
  `padding: 12px 22px`, peso 500, con icono trailing `→` opcional.
  Hover: `translateY(-1px)` + glow suave.
- **CTA acento**: `bg-primary text-canvas`, `radius-pill`. Reservado para
  acciones de confirmación.
- **CTA secundario (ghost)**: borde hairline, fondo transparente,
  `text-hi`. Hover: borde a `hairline-strong`.
- **CTA destructivo**: `bg-error text-text-hi`, `radius-pill`.
- Todos los botones respetan `cta-press` (§12) y focus outline `primary`.

### 9.2 Chips técnicos

- Rectangulares (`radius-none` o `radius-sm`), borde hairline, `padding:
  4px 10px`, mono `11px` uppercase, color `text-low`.
- Variante con punto pulse `6×6 rounded-full` en `primary` para indicar
  estado live/success.
- Nunca se mezclan colores en chips: por defecto monocromos sobre hairline.

### 9.3 Inputs

- Fondo `surface-raised` o transparente con borde inferior `1px hairline`
  (variante editorial sin caja).
- En foco: borde inferior pasa a `primary` con transición 250ms y aparece
  un glow tenue debajo (`box-shadow: 0 4px 16px -8px var(--primary-glow)`).
- Label flotante en mono uppercase `eyebrow` (§4.3).
- Placeholder en `text-low`.

### 9.4 Tabs / underline switcher

- Lista horizontal de items en `text-mid`, separados por gutter `24px`.
- Item activo: `text-hi` + underline `1px primary` que **desliza**
  horizontalmente al cambiar de tab (`tab-active-slide`, §12).

---

## 10. Imaginería: nature × neon

Toda imagen del sistema sigue una sola dirección de arte:

- **Sujeto**: elemento orgánico aislado sobre fondo negro puro — bonsái,
  campo de flores, esfera de raíces, escalera con musgo, manos de musgo,
  cliff con vegetación colgante.
- **Iluminación**: rim-light cálido (rosa/coral/dorado) o frío (aqua) que
  recorta el sujeto del fondo. Bioluminiscencia sutil.
- **Paleta interna de la imagen**: alineada al brand — pétalos rosa-magenta
  (eco del `accent`), brotes/musgo verde (eco del `primary`).
- **Composición**: el sujeto sangra al menos un borde del frame para sentirse
  "vivo dentro del layout" (no flotando aislado en el centro).
- **Sin sombras duras**, **sin fondos**, **sin texto sobreimpreso**.

### 10.1 Tratamiento al integrarlas

- `mix-blend-mode: screen` o `lighten` opcional sobre fondos `surface`
  para fusionar bordes.
- Glow extra detrás vía pseudo-elemento:
  `::after { background: radial-gradient(40% 40% at 50% 50%, var(--primary-glow), transparent 70%); filter: blur(60px); }`
- Animación lenta de respiración (`breath`, ver §12).

### 10.2 Catálogo de imágenes (uso por forma, no por contenido)

Ver §14 para la ubicación exacta de los archivos.

| Forma / silueta              | Imagen                         | Uso visual recomendado                              |
| ---------------------------- | ------------------------------ | --------------------------------------------------- |
| Sujeto vertical con copa     | `bonsai-pink.jpg`              | Hero split, side-bleed derecho                      |
| Banda horizontal de campo    | `field-flowers.jpg`            | Hero centrado, ocupa el tercio inferior             |
| Cuña diagonal con vegetación | `cliff-vegetation-left.jpg`    | Esquina inferior izquierda como acento decorativo   |
| Cuña diagonal espejo         | `cliff-vegetation-right.jpg`   | Esquina inferior derecha como acento decorativo     |
| Forma esférica detallada     | `roots-sphere.jpg`             | Card métrica grande, lado izquierdo                 |
| Composición horizontal puente| `mossy-hands.jpg`              | Bloque de conexión / split horizontal               |
| Composición vertical ascendente | `mossy-stairs.jpg`          | Bloque de progresión / fondo de card destacada      |
| Textura panorámica           | `colorful-grass.jpg`           | Footer o divisor decorativo full-width              |

---

## 11. Iconografía

- **Set**: `lucide-react` con `stroke-width: 1.5` y `stroke-linecap: round`.
- **Container de icono**: cuadrado `32×32` con `1px solid hairline`,
  `radius-none` o `radius-sm`. Icono dentro `16–18px` en `text-mid`.
- En hover de la card padre, el container se ilumina: borde pasa a `primary`,
  fondo a `rgba(primary, 0.06)`.
- Tamaños permitidos: múltiplos de 4 (`16, 20, 24, 28, 32`).
- Color hereda de contexto vía `currentColor`.

---

## 12. Animaciones & micro-interacciones

Filosofía: **lentas, suaves, intencionales**. Nada rebota; todo respira.

### 12.1 Curvas y duraciones

```
--ease-out:    cubic-bezier(0.22, 1, 0.36, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
--dur-fast:    250ms;
--dur-base:    400ms;
--dur-slow:    700ms;
--dur-ambient: 6s; /* loops ambientales */
```

### 12.2 Catálogo de animaciones

| Nombre              | Cuándo                                   | Cómo                                                                                         |
| ------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------- |
| `stack-reveal`      | Hero al cargar                           | Cada línea: `opacity 0→target, translateY 24px→0`, stagger 120ms, `dur-slow`, `ease-out`     |
| `letter-shimmer`    | Palabra acentuada del hero               | Loop infinito: gradiente `primary→accent→primary` recorriendo `background-position` (`dur-ambient`) |
| `border-glow`       | Hover sobre card                         | `border-color: hairline → hairline-strong`; box-shadow gana `glow-edge`; `dur-base`          |
| `card-lift`         | Hover sobre card                         | `transform: translateY(-4px)`; combinado con `border-glow`; `dur-base ease-out`              |
| `breath`            | Imagen orgánica idle                     | Loop: `scale 1 ↔ 1.015` y `filter: brightness(1 ↔ 1.08)` en `dur-ambient`, `ease-in-out`, infinite alternate |
| `glow-pulse`        | `primary-glow` detrás de imagen          | Loop: `opacity 0.3 ↔ 0.55`, `scale 1 ↔ 1.1`, `dur-ambient`                                   |
| `nav-condense`      | Scroll > 16px                            | Pill nav: `padding-block 16→10px`, fondo `0.6 → 0.92` de opacidad, `dur-fast`                |
| `link-underline`    | Hover sobre link de nav o footer         | Underline `scaleX(0) → scaleX(1)`, `transform-origin: left`, `dur-fast`                      |
| `cta-press`         | Active sobre CTA pill                    | `scale(1) → scale(0.97)`, `dur-fast`                                                         |
| `cursor-spotlight`  | Mousemove dentro de card                 | Radial-gradient de `primary-glow` que sigue al cursor (vía CSS vars `--mx --my`), `dur-fast` |
| `section-rise`      | Sección entra a viewport                 | `opacity 0→1, translateY 40px→0`, `dur-slow`, una sola vez (IntersectionObserver)            |
| `metric-countup`    | Métricas hero al ser visibles            | Conteo numérico animado `0 → valor` en `dur-slow`                                            |
| `image-parallax`    | Scroll sobre hero/sección con imagen     | `translateY(scroll * -0.08)` en la imagen orgánica                                           |
| `tab-active-slide`  | Cambio de tab/categoría                  | Underline de `primary` desliza horizontalmente al item activo, `dur-base ease-in-out`        |
| `dot-pulse`         | Indicador "live" / status success        | `scale 1↔1.4 + opacity 1↔0` en pseudo-elemento, `dur-ambient/3` infinite                     |

### 12.3 Reducción de movimiento

Respetar `prefers-reduced-motion: reduce` desactivando `breath`, `glow-pulse`,
`letter-shimmer`, `image-parallax` y `metric-countup` (mostrar valor final
estático). Mantener solo fades suaves.

---

## 13. Estados, glows y bordes vivos

Patrón firma del sistema: **bordes que se iluminan**.

```css
.card {
  border: 1px solid var(--hairline);
  background: var(--surface-raised);
  transition:
    border-color var(--dur-base) var(--ease-out),
    box-shadow var(--dur-base) var(--ease-out),
    transform var(--dur-base) var(--ease-out);
}

.card:hover {
  border-color: var(--primary);
  box-shadow:
    0 0 0 1px var(--primary),
    0 0 32px -8px var(--primary-glow),
    0 30px 60px -40px rgba(0,0,0,0.7);
  transform: translateY(-4px);
}

/* Cursor spotlight (opcional, vía JS que setee --mx, --my) */
.card::before {
  content: "";
  position: absolute; inset: 0;
  background: radial-gradient(
    240px circle at var(--mx, 50%) var(--my, 50%),
    var(--primary-glow), transparent 60%
  );
  opacity: 0;
  transition: opacity var(--dur-base);
  pointer-events: none;
}
.card:hover::before { opacity: 1; }
```

Reglas:

- **Solo un acento por pantalla**: si la sección usa `accent` (purple),
  los hovers usan `accent-glow` en lugar de `primary-glow`.
- **CTAs en estado focus** reciben `outline: 2px solid var(--primary);
  outline-offset: 4px;` — nunca quitar el outline.
- **Loading**: barra delgada `1px` de `primary` que recorre el top del
  contenedor (`shimmer` de izquierda a derecha).
- **Disabled**: `opacity: 0.4`, `pointer-events: none`, sin glow.

---

## 14. Recursos visuales

Estructura de carpetas dentro de `app-design/`:

```
app-design/
├── readme.md                       # este documento
├── assets/
│   ├── screenshots/                # capturas de referencia del estilo
│   │   ├── 01-hero-split.png       # hero split con stack tipográfico
│   │   ├── 02-cards-numbered.png   # grilla de cards numeradas (01/02/03)
│   │   ├── 03-hero-centered.png    # hero centrado con imagen al pie
│   │   ├── 04-card-metric.png      # card métrica + features con icono
│   │   └── 05-cards-highlighted.png # grilla con card destacada
│   └── images/                     # imágenes orgánicas reutilizables
│       ├── bonsai-pink.jpg
│       ├── field-flowers.jpg
│       ├── cliff-vegetation-left.jpg
│       ├── cliff-vegetation-right.jpg
│       ├── roots-sphere.jpg
│       ├── mossy-hands.jpg
│       ├── mossy-stairs.jpg
│       └── colorful-grass.jpg
└── references/                     # referencias externas (Pinterest, dribbble…)
```

> **Cómo guardar las referencias**: las capturas y las imágenes orgánicas
> compartidas como inspiración deben colocarse manualmente en
> `assets/screenshots/` y `assets/images/` con los nombres listados arriba.
> El readme las referencia por esos paths.

### 14.1 Cómo prompt-ear nuevas imágenes orgánicas

> *"A single [bonsai tree / mossy hand / cliff with hanging vegetation /
> sphere of roots / staircase of moss] isolated on pure black background,
> rim-lit with soft pink and coral neon glow, bioluminescent details,
> cinematic studio lighting, ultra-detailed, photorealistic, 4K, no text,
> no logo, transparent-ready edges, dark moody mood, editorial."*

Reglas obligatorias del prompt:
- fondo **pure black**;
- iluminación **rim-light rosa/coral o aqua**, nunca frontal plana;
- sujeto **único y centrado** (o con sangrado controlado);
- **bioluminiscencia sutil**;
- **sin texto, sin logos, sin marcas de agua**.

---

## 15. Checklist de implementación

Para considerar un proyecto "construido en este sistema" debe cumplir:

- [ ] Fondo de página en `--canvas` (#09090B) en todas las rutas.
- [ ] Tipografía display con `letter-spacing: -0.04em` y `line-height: 0.95`.
- [ ] Al menos un hero con **stack fantasma** (líneas con opacidad
      decreciente).
- [ ] Una palabra/letra acentuada con gradiente `primary → accent`.
- [ ] **Navbar pill** flotante con backdrop-blur y CTA blanca a la derecha.
- [ ] Cards con **borde hairline 1px** y **glow en hover** (border + shadow
      en `primary` o `accent`).
- [ ] Al menos una **imagen orgánica neon-lit** sangrando un borde del hero.
- [ ] Variante de card numerada con `01 02 03` en mono + línea hairline.
- [ ] Chips técnicos rectangulares (no redondeados) en mono uppercase.
- [ ] En grillas de cards comparables, **una** card destacada con
      `translateY(-16px)`, `shadow-lift` y badge pill flotante.
- [ ] Animaciones `stack-reveal`, `border-glow`, `breath`, `nav-condense`
      implementadas.
- [ ] `prefers-reduced-motion` respetado.
- [ ] **Un solo color de acento por pantalla** (no mezclar primary y
      accent en glows simultáneos).
- [ ] Espaciado vertical entre bloques ≥ `96px` en mobile, `192px` en
      desktop.
- [ ] Toda metadata, tag, número de paso y badge usa **monoespaciada
      uppercase**.
- [ ] Estados de focus con `outline: 2px solid primary; outline-offset: 4px`.
- [ ] Botones primarios en forma **pill** (`radius-pill`).
- [ ] Inputs con **borde inferior** que pasa a `primary` en foco (variante
      editorial sin caja).

---

> **Para LLMs**: cuando se solicite *"crear un proyecto nuevo con este
> estilo"*, asume **dark canvas + editorial typography stack + organic
> neon imagery + hairline cards with hover glow + pill navbar** como punto
> de partida no negociable. Usa **solo** los tokens de la §3 (paleta
> SwitchPay). Nunca introducir gradientes pastel, bordes gruesos, sombras
> suaves grises, ilustraciones flat o emojis decorativos. Este documento
> describe **componentes y lenguaje visual**, no estructura de contenido:
> el LLM debe componer hero, navbar, cards, chips, inputs y botones
> según el dominio del proyecto.
