---
name: illustration-generator
description: "Generar ilustraciones flat-vector estilo banking-friendly para SwitchPay con personajes humanos, paletas de marca y tonos de piel realistas. Cubre flujo guiado de 6 pasos con AskQuestion (fondo, paleta, entorno, acciones, logos/iconos, confirmacion), prompt engineering para image generation y validacion de estilo. Usar cuando el usuario pida generar una ilustracion, una imagen para la web, redes o secciones internas, o cuando mencione GenerateImage, ilustracion, imagen, render visual, escena o personaje SwitchPay."
---

# Illustration Generator

Skill para producir ilustraciones consistentes con la marca **SwitchPay**, en el mismo lenguaje visual que las referencias guardadas en `assets/`. Las imagenes son **flat vector**, con personajes amables, un **fondo base claro u oscuro** (definido en el paso 1), una de las **4 paletas disponibles** (definida en el paso 2) y sin texto.

> **Importante sobre `assets/`**: las imagenes en `assets/style-reference-*.png` son **acercamientos al estilo**, **no** son ejemplos exactos ni completos. Les faltan ajustes visuales (proporciones, sombreado, contraste, detalle de iconos). Tomalas como referencia de **direccion estetica**, no como ground truth.
> **No enviarlas a `GenerateImage`**: estas referencias son solo para analisis visual. La generacion debe hacerse sin `reference_image_paths` porque falla.

---

## When to Use

- El usuario pide generar una imagen, ilustracion, render o escena visual.
- Se necesita un asset visual para la web, landing, blog, redes sociales o secciones internas.
- Aparecen palabras clave como `ilustracion`, `imagen`, `escena`, `personaje`, `render`, `GenerateImage`, `figura`, `vector`.
- El trabajo requiere mantener coherencia con el estilo SwitchPay sin desviarse a otros lenguajes visuales.

---

## Reglas duras (no negociables)

1. **El fondo base lo define el paso 1**: primero elegir si la composicion se busca para fondo claro/blanco o fondo oscuro/negro.
2. **La paleta vigente la define el paso 2**: la opcion elegida (1, 2, 3 o 4) determina que HEX estan habilitados para esa generacion. Cualquier color **fuera** de la paleta elegida queda bloqueado para esa imagen.
3. **Debe verse bien en fondo claro y oscuro**: aunque el usuario elija un fondo base, seleccionar colores con suficiente contraste para que la ilustracion pueda funcionar luego sobre blanco o negro.
4. **Tonos de piel humana realistas siempre permitidos**: `#F4D6C0`, `#E6B89C`, `#C68F6B`, `#A06A45`, `#6B4226`. Aplican en cualquiera de las 4 opciones (incluida blanco-y-negro), porque representan figuras humanas, no decoracion.
5. **Sin textos** en la imagen, ni reales ni de relleno (no lorem ipsum, no UI mock con palabras legibles).
6. **Sin logos ni iconos** salvo que el usuario lo confirme explicitamente en el paso de iconos.
7. **Estilo flat vector** redondeado, sin foto, sin 3D, sin sombras dramaticas.
8. **Fondo limpio**: superficie principal clara u oscura con un circulo decorativo grande detras del personaje en un tono permitido por la paleta elegida.
9. **Prohibido siempre**: amarillos, naranjas, magentas saturados, rojos vibrantes y azules saturados ajenos a la marca. El resto de colores depende del paso 2. Los morados de marca (`#6F4DE8` y variantes) **estan permitidos** solo en opciones 2 (Secundarios) y 3 (Mezcla).
10. **No usar `reference_image_paths` al generar**: analizar las referencias locales si hace falta, pero invocar `GenerateImage` solo con prompt de texto y `filename`.

---

## Paletas disponibles

El fondo base se elige en el **paso 1** y la paleta activa en el **paso 2**. Solo los HEX de la opcion elegida (mas neutros y piel) pueden aparecer en la imagen.

### Fondos base

Aunque el usuario elija una direccion inicial, la ilustracion debe mantener contraste suficiente para funcionar despues en fondos claros y oscuros.

| Token | HEX | Uso |
|-------|-----|-----|
| `bg-light` | `#FAFAFA` | Fondo claro recomendado |
| `bg-white` | `#FFFFFF` | Fondo blanco puro / cards |
| `bg-dark` | `#09090B` | Fondo negro recomendado |
| `bg-surface-dark` | `#18181B` | Superficie oscura secundaria |
| `ink-on-light` | `#27272A` | Outlines y detalles sobre claro |
| `ink-on-dark` | `#F4F4F5` | Detalles claros sobre oscuro |

### Opcion 1 — Primarios (verdes aqua de marca)

| Token | HEX | Uso |
|-------|-----|-----|
| `aqua-base` | `#15B981` | Color de marca principal, valido en ambos fondos |
| `aqua-on-light` | `#0E8F66` | Variante mas profunda para destacar sobre blanco |
| `aqua-on-dark` | `#63D69F` | Variante luminosa para destacar sobre negro |
| `aqua-soft-light` | `#DCF6E7` | Fondos suaves sobre claro, no usar como foreground |
| `aqua-soft-dark` | `#1A2E28` | Fondos tonales sobre oscuro |

### Opcion 2 — Secundarios (variantes de morado, accent de marca)

Color secundario oficial de SwitchPay: morado `#6F4DE8`. Esta paleta apunta a "switch", premium y elementos accent, sin verdes aqua.

| Token | HEX | Uso |
|-------|-----|-----|
| `accent-base` | `#6F4DE8` | Color secundario principal, valido en ambos fondos |
| `accent-on-light` | `#5A3DD1` | Variante mas profunda para destacar sobre blanco |
| `accent-on-dark` | `#A996FF` | Variante luminosa para destacar sobre negro |
| `accent-soft-light` | `#E8E1FF` | Fondos suaves sobre claro, no usar como foreground |
| `accent-soft-dark` | `#272130` | Fondos tonales sobre oscuro |

### Opcion 3 — Mezcla

Combina libremente los HEX de la opcion 1 y la opcion 2. Recomendacion: una paleta dominante (primaria o secundaria) + 1 o 2 acentos del otro grupo. Mantener contraste: usar variantes `on-light` si el fondo visible es claro y variantes `on-dark` si el fondo visible es oscuro.

### Opcion 4 — Blanco y negro

| Token | HEX | Uso |
|-------|-----|-----|
| `bw-white` | `#FFFFFF` | Superficie principal |
| `bw-off` | `#FAFAFA` | Fondos suaves |
| `bw-soft` | `#71717A` | Sombras y detalles tenues |
| `bw-ink` | `#27272A` | Outlines, cabello, ropa oscura |
| `bw-ink-dark` | `#F4F4F5` | Outlines claros sobre fondo oscuro |

Sin color de marca. Util para versiones mono o piezas editoriales.

### Neutros (siempre habilitados)

| Token | HEX | Uso |
|-------|-----|-----|
| `surface-light` | `#FAFAFA` | Fondo principal claro |
| `surface-white` | `#FFFFFF` | Fondo limpio alterno |
| `surface-dark` | `#09090B` | Fondo principal oscuro |
| `surface-dark-card` | `#18181B` | Card o bloque sobre oscuro |
| `ink-deep` | `#27272A` | Outlines, cabello, sombras de figura |
| `ink-light` | `#F4F4F5` | Outlines claros sobre oscuro |
| `ink-soft` | `#71717A` | Detalles tenues, lineas guia |

### Tonos de piel humana realistas (siempre habilitados)

Variar entre personajes para representar diversidad. Aplica en las 4 opciones.

| Token | HEX | Tipo |
|-------|-----|------|
| `skin-fair` | `#F4D6C0` | Piel clara |
| `skin-light` | `#E6B89C` | Piel clara-media |
| `skin-medium` | `#C68F6B` | Piel media |
| `skin-tan` | `#A06A45` | Piel media-oscura |
| `skin-deep` | `#6B4226` | Piel oscura |

### Prohibidos en todas las opciones

Amarillos, naranjas, rojos vibrantes, magentas saturados y azules ajenos a la marca. Estos colores no representan a SwitchPay y desvian el lenguaje visual.

> Nota: los morados (`#6F4DE8` y variantes) **no** son prohibidos: son el color secundario oficial. Se habilitan en opcion 2 (Secundarios) y 3 (Mezcla), y se bloquean en opcion 1 (Primarios) y 4 (Blanco y negro).

---

## Flujo obligatorio antes de generar

Cuando el usuario pide una ilustracion, NO generes directamente. Seguir este flujo paso a paso:

### Interaccion obligatoria con `AskQuestion`

- En **cada paso** del flujo usar `AskQuestion`, no texto libre como mecanismo principal.
- Las opciones deben abrirse en el chat para elegir con mouse o teclado.
- Cada `option.label` debe ser **corto**: idealmente entre 1 y 4 palabras.
- Cada opcion a elegir debe ser una opcion de texto resumida, no gigante.
- La explicacion va en el `prompt`, no dentro del label.
- Si hace falta detalle extra, hacer una **segunda pregunta corta** en lugar de una opcion larga.
- Si una opcion abre otra decision (por ejemplo `Sugerime`), hacer un nuevo `AskQuestion` de seguimiento.

### Paso 1 — Fondo base

Esta debe ser la primera decision del flujo. Preguntar si la ilustracion se busca inicialmente sobre fondo claro/blanco u oscuro/negro. Aunque elija uno, el resultado debe tener contraste suficiente para funcionar luego en ambos.

Usar esta estructura:

```text
title: "Fondo"
prompt: "Elegi el fondo base inicial."
options:
- "Claro"
- "Oscuro"
```

Despues de la seleccion, interpretar asi:

- `Claro` → componer sobre `#FAFAFA` o `#FFFFFF`, usando `on-light` para foreground y acentos.
- `Oscuro` → componer sobre `#09090B` o `#000000`, usando `on-dark` para foreground y acentos.

Regla: aunque el usuario elija `Claro`, no usar acentos tan palidos que desaparezcan sobre blanco; aunque elija `Oscuro`, no usar acentos tan profundos que desaparezcan sobre negro.

### Paso 2 — Eleccion de paleta

Presentar 4 opciones al usuario con `AskQuestion` y esperar su eleccion. La opcion elegida define **que colores quedan habilitados** para esa imagen. Los tonos de piel humana siempre estan permitidos.

Usar esta estructura:

```text
title: "Paleta"
prompt: "Elegi la paleta para esta ilustracion."
options:
- "Primarios"
- "Secundarios"
- "Mezcla"
- "Blanco y negro"
```

Despues de la seleccion, interpretar asi:

- `Primarios` → `#15B981`, `#0E8F66`, `#63D69F`, `#DCF6E7`, `#1A2E28` + neutros.
- `Secundarios` → `#6F4DE8`, `#5A3DD1`, `#A996FF`, `#E8E1FF`, `#272130` + neutros. Sin verdes aqua.
- `Mezcla` → todos los HEX de primarios + secundarios + neutros.
- `Blanco y negro` → `#FFFFFF`, `#FAFAFA`, `#09090B`, `#18181B`, `#71717A`, `#27272A`, `#F4F4F5` + tonos de piel.

En las 4 opciones siempre estan permitidos los tonos de piel humana (`#F4D6C0`, `#E6B89C`, `#C68F6B`, `#A06A45`, `#6B4226`) y los neutros (`#FFFFFF`, `#FAFAFA`, `#09090B`, `#18181B`, `#71717A`, `#27272A`, `#F4F4F5`).

Prohibido en todas: amarillos, naranjas, rojos vibrantes, magentas saturados y azules ajenos a la marca.

### Paso 3 — Entorno

Analizar el prompt del usuario e inferir **en que lugar transcurre la escena**. Proponer al menos 3 opciones relevantes derivadas del contexto y una opcion libre. Usar `AskQuestion`.

```text
title: "Entorno"
prompt: "Donde transcurre la escena? Elegi el lugar."
options:
- "Oficina"
- "Living"
- "Cafe"
- "Aire libre"
- "Otro"
```

Reglas:

- Derivar las opciones del prompt real del usuario. Si el prompt habla de trabajo, priorizar oficina/coworking. Si habla de comodidad o relax, priorizar living/sala de estar. Si habla de movilidad, priorizar calle/transporte/aire libre.
- Si el usuario elige `Otro`, hacer un segundo `AskQuestion` o pregunta corta para precisar.
- El entorno elegido **determina la decoracion y los objetos de escena**. No usar siempre los mismos elementos genericos.

Guia de objetos segun entorno:

| Entorno | Objetos y decoracion coherentes |
|---------|-------------------------------|
| Oficina | Escritorio, monitor, silla ergonomica, lampara de escritorio, estanteria, pizarra, reloj de pared |
| Living / Sala de estar | Sillon, mesa ratona, alfombra, lampara de pie, cuadro en pared, cojines |
| Cafe / Restaurante | Mesa redonda, taza, silla bistro, vitrina, barra, lampara colgante |
| Aire libre / Parque | Banco de plaza, arbol, cielo limpio, camino, bicicleta, farola |
| Calle / Ciudad | Edificios simples al fondo, semaforo, vereda, parada de bus |
| Transporte | Asiento de bus/tren, ventanilla, baranda, mochila |
| Dormitorio | Cama, mesita de luz, velador, cortina, alfombra |
| Coworking | Mesa compartida, laptop, auriculares, pizarra, taburete alto |

- **Prohibido** repetir plantas/macetas como decoracion por defecto. Las plantas solo corresponden si el entorno las justifica (living, aire libre, oficina con planta decorativa) y deben combinarse con otros objetos del entorno.
- Si ningun entorno de la tabla aplica, adaptar los objetos al lugar elegido con el mismo criterio: objetos que alguien encontraria realmente en ese sitio.

### Paso 4 — Acciones detectadas

Analizar el prompt del usuario y proponer **al menos 2 acciones** que estan ocurriendo en la escena. Confirmar cual aplica o si combinan ambas usando `AskQuestion`.

Usar `allow_multiple: true` cuando tenga sentido combinar acciones.

```text
title: "Accion"
prompt: "Detecte estas acciones posibles. Elegi una o mas."
options:
- "Mirar app"
- "Deslizar card"
- "Pensar"
- "Confirmar"
- "Otra"
```

Reglas:

- Los labels tienen que ser concretos y cortos.
- Derivar las opciones del prompt real del usuario.
- Si el usuario elige `Otra`, hacer un segundo `AskQuestion` o una pregunta corta para precisar.

Las acciones deben ser concretas: *sostener un telefono*, *deslizar una card*, *mirar un dashboard*, *pensar con la mano en el menton*, *sentarse en un sillon*, *senalar una opcion*, etc.

### Paso 5 — Logos o iconos

Preguntar siempre antes de incluir cualquier logo o icono usando `AskQuestion`. La pregunta combina la decision de incluir o no iconos con el modo de color a usar:

```text
title: "Iconos"
prompt: "Queres sumar iconos? Elegi como pintarlos."
options:
- "Si, color tematica"
- "Si, primarios y secundarios"
- "No"
```

Interpretacion:

- `Si, color tematica` → incluir iconos pintados **solo con la paleta elegida en el paso 2** (primarios, secundarios, mezcla o blanco-y-negro). Mantiene la coherencia con el resto de la ilustracion.
- `Si, primarios y secundarios` → incluir iconos pintados combinando **primarios + secundarios** (paleta `Mezcla`), incluso si la ilustracion principal usa otra paleta. Util para diferenciar iconos como acentos.
- `No` → no incluir iconos. Seguir con `ninguno`.

Despues de elegir una opcion afirmativa, abrir un segundo `AskQuestion` para definir cuales iconos:

```text
title: "Iconos a usar"
prompt: "Elegi los iconos o escribi cuales sumar."
options:
- "Sugerime"
- "Escribir cuales"
```

Flujo segundo paso:

- `Sugerime` → proponer una lista corta basada en el contexto (entorno + accion + tematica) y abrir un nuevo `AskQuestion` con opciones breves y `allow_multiple: true`.
- `Escribir cuales` → pedir en una pregunta corta de texto libre cuales quiere.

Ejemplo de seguimiento para `Sugerime`:

```text
title: "Iconos sugeridos"
prompt: "Elegi los iconos que queres sumar."
options:
- "Bus"
- "Escudo"
- "Heart"
- "Wallet"
- "Pesa"
- "Plato"
- "Ninguno"
```

No incluir iconos sin confirmacion explicita del usuario.

#### Estilo obligatorio de los iconos

Los iconos deben seguir un estilo unico y consistente, alineado con las referencias `assets/icon-reference-row-01.png` y `assets/icon-reference-character-01.png`:

- **Construccion**: outline fino redondeado (`stroke-linecap: round`, `stroke-linejoin: round`) con grosor uniforme (~1.5–2px relativo al tamano del icono) + fill plano solido.
- **Dos tonos como maximo por icono**: un tono para outline + un tono para fill. Sin gradientes, sin sombras internas, sin texturas.
- **Forma**: pictograma simple, geometria reconocible al primer vistazo, esquinas redondeadas.
- **Sin texto, sin numeros, sin letras** dentro del icono.
- **Sin detalle excesivo**: nada de lineas internas decorativas, hatching, puntos de brillo o sombreado.
- **Contenedor opcional**: pueden ir sueltos o dentro de un circulo/rounded-square con fondo limpio (blanco sobre fondo claro, oscuro sobre fondo oscuro) y borde sutil del color del outline.
- **Tamano relativo**: lo bastante grandes para ser legibles sin ser protagonistas; el personaje sigue siendo el foco.

#### Reglas de color de los iconos

El color usado depende de la opcion elegida en este paso 5, **no** del paso 2. Mantener siempre legibilidad sobre fondo claro y oscuro.

| Opcion paso 5 | Outline | Fill | HEX recomendados |
|---------------|---------|------|------------------|
| `Si, color tematica` (paso 2 = Primarios) | `#0E8F66` (sobre claro) o `#63D69F` (sobre oscuro) | `#15B981` o `#DCF6E7` | Solo aqua greens listados en primarios |
| `Si, color tematica` (paso 2 = Secundarios) | `#5A3DD1` (sobre claro) o `#A996FF` (sobre oscuro) | `#6F4DE8` o `#E8E1FF` | Solo morados listados en secundarios |
| `Si, color tematica` (paso 2 = Mezcla) | aqua o morado segun tematica del icono | aqua o morado | Aqua + morados |
| `Si, color tematica` (paso 2 = Blanco y negro) | `#27272A` o `#F4F4F5` | `#FAFAFA` o `#71717A` | Solo neutros |
| `Si, primarios y secundarios` | `#0E8F66` o `#5A3DD1` segun icono | `#15B981`, `#63D69F`, `#6F4DE8` o `#A996FF` | Aqua + morados, alternando entre iconos |

- **Contraste obligatorio**: cada icono debe verse bien si la ilustracion se mueve a fondo claro o oscuro. Para eso, combinar un tono `on-light` con uno `on-dark` cuando hay outline + fill.
- **Sin azules saturados, sin amarillos, sin naranjas, sin rojos, sin magentas**. Esta regla aplica siempre.
- **Tonos de piel** estan permitidos solo si el icono representa una persona o silueta humana, nunca como decoracion abstracta.

### Paso 6 — Mostrar contexto generado

Antes de invocar `GenerateImage`, mostrar el resumen estructurado y luego usar `AskQuestion` para confirmar:

```text
title: "Confirmacion"
prompt: "Revise el contexto y elegi como seguir."
options:
- "Generar"
- "Ajustar"
```

Contexto a mostrar antes de esa pregunta:

- Fondo base: [claro u oscuro + HEX activos]
- Paleta: [opcion elegida + HEX activos]
- Entorno: [lugar elegido en paso 3]
- Personaje(s): [cantidad + tono de piel + ropa + pose]
- Accion principal: [descripcion]
- Objetos de escena: [objetos coherentes con el entorno elegido]
- Iconos / logos: [listado + modo de color: "color tematica" / "primarios y secundarios" / "ninguno"]
- Fondo: [descripcion]
- Formato: [1:1 cuadrado | 9:16 vertical | 16:9 horizontal]

Si el usuario elige `Ajustar`, abrir otro `AskQuestion` con labels cortos:

```text
title: "Ajuste"
prompt: "Que queres cambiar?"
options:
- "Fondo"
- "Paleta"
- "Entorno"
- "Accion"
- "Iconos"
- "Personaje"
- "Formato"
```

Luego rehacer solo ese paso y volver a la confirmacion. **Nunca generar sin que el usuario elija `Generar`**.

---

## Esencia del estilo (no del contenido)

Lo que se conserva de las referencias en `assets/`, independiente de la paleta elegida:

- **Personajes**: cuerpo medio o tres-cuartos, cabeza grande relativa al cuerpo, expresiones suaves y amables, ojos ovalados negros simples, sin cejas marcadas o cejas finas.
- **Cabello**: trazo solido en `ink-deep` (`#27272A`), mechones simples, sin lineas de detalle.
- **Ropa**: superficies planas con UN solo color por prenda (tomado de la paleta activa), sin patrones.
- **Manos**: simplificadas, dedos definidos pero sin detalle de unas o nudillos.
- **Outline**: linea muy fina en `ink-deep` o sin outline, dejando el color resolver el contorno.
- **Fondos**: claro (`#FAFAFA`/`#FFFFFF`) u oscuro (`#09090B`/`#18181B`) con UN circulo grande detras del personaje en un tono suave compatible con el fondo elegido.
- **Cards y UI**: rectangulos rounded-2xl flotantes con sombra suave, bordes sutiles, contenido abstracto (barras, dots, anillos), nunca texto.
- **Iconos en cards**: estilo line-art con outline fino redondeado + fill plano (maximo 2 tonos), siguiendo el patron de `assets/icon-reference-row-01.png` y `assets/icon-reference-character-01.png`. Sin gradientes, sin sombras, sin texto. El color sigue las reglas del paso 5.
- **Decoracion y objetos**: determinados por el entorno elegido en el paso 3. No usar plantas ni macetas por defecto; los elementos decorativos deben ser coherentes con el lugar de la escena (ver tabla de objetos segun entorno).
- **Composicion**: personaje a un lado, espacio compositivo respirado, objetos del entorno balanceando la composicion.

Lo que **NO** debe pasar:

- Caras hiper-detalladas, fotograficas o estilo anime.
- Sombreado complejo, gradientes pesados, texturas.
- Texto en pantallas de telefono, carteles, etiquetas.
- Logos de marcas reales.
- Colores fuera de la paleta elegida en el paso 2. Recordar: los morados son secundarios de marca (validos en opciones 2 y 3), pero los amarillos, naranjas, rojos vibrantes, magentas saturados y azules ajenos siempre estan prohibidos.

---

## Plantilla de prompt para `GenerateImage`

Usar esta plantilla generica completando los `[CAMPOS]`. El fondo cambia segun el paso 1 y la lista de HEX cambia segun la paleta elegida en el paso 2 (ver tablas mas arriba).

### Llamada a la herramienta

- Invocar `GenerateImage` solo con `description` y `filename`.
- No enviar `reference_image_paths`.
- Las imagenes de `assets/` son material de analisis previo, no inputs de la herramienta.

```
Flat vector illustration in modern banking-app style, friendly minimal corporate illustration. [PERSONAJE: edad aproximada, genero, color de piel HEX, cabello, ropa con HEX exacto, pose]. [ACCION principal en presente continuo]. Setting is [ENTORNO elegido en paso 3: oficina/living/cafe/aire libre/etc.] with environment-appropriate props: [OBJETOS DEL ENTORNO con HEX, tomados de la tabla de objetos segun entorno]. [BLOQUE DE ICONOS: ver instruccion abajo, o "no icons anywhere"]. Background is [FONDO BASE: clean light #FAFAFA/#FFFFFF or clean dark #09090B/#18181B] with a large soft circle [HEX suave de la paleta activa compatible con el fondo] behind the character and small decorative details matching the setting [HEX de la paleta activa] in the corners. Do not default to plants or leaves as decoration; use props that belong to the chosen setting. Use foreground/accent variants that remain readable on both light and dark backgrounds: [on-light HEX] and [on-dark HEX]. Rounded shapes, calm friendly posture, simple ovaloid eyes, no text anywhere in the image, no logos. Color palette strictly limited to: [LISTA COMPLETA de HEX habilitados por la opcion elegida en el paso 2 + HEX habilitados para iconos en paso 5, separados por coma], plus realistic skin tone [SKIN HEX]. No yellows, no oranges, no reds, no saturated blues, no out-of-brand colors. [BLOQUEOS ADICIONALES segun opcion]. Premium, calm, minimal SwitchPay banking illustration. [FORMATO].
```

#### Bloque de iconos (cuando paso 5 es afirmativo)

Reemplazar `[BLOQUE DE ICONOS]` con este texto, ajustando los HEX segun la opcion elegida en paso 5:

```
The illustration includes [N] icons representing [LISTADO DE ICONOS, ej: "gym, transport, food"]. Each icon is rendered in clean line-art style: thin rounded outline (stroke-linecap round, stroke-linejoin round, uniform stroke weight ~2px) in [OUTLINE HEX] combined with a flat solid fill in [FILL HEX]. Maximum two color tones per icon. No gradients, no inner shadows, no textures, no extra detail lines, no text or numbers inside icons. Each icon may sit inside an optional circular or rounded-square container with a clean [light or dark] background and a subtle border in the same outline color. Icons must remain legible on both light and dark backgrounds. Style reference: minimalist banking-app pictograms similar to wallet, shield, dumbbell, bus, plate, heart icons.
```

Si paso 5 es `No`, reemplazar el bloque por: `Absolutely no icons anywhere in the image, only abstract environment props.`

### Bloqueos adicionales segun opcion

Reforzar al final del prompt para que el modelo no se desvie:

| Opcion | Linea de bloqueo a agregar |
|--------|----------------------------|
| 1 — Primarios | `No purples, no violets, no magentas. No yellows, no oranges. Only aqua greens within the listed HEX.` |
| 2 — Secundarios | `No greens, no aqua tones, no teal. Only purple variants within the listed HEX.` |
| 3 — Mezcla | `Only aqua greens and purple accent variants from the listed HEX. No yellows, no oranges, no reds.` |
| 4 — Blanco y negro | `No color at all except realistic skin tones. Pure grayscale composition.` |

### Reglas del prompt

- Listar HEX explicitos cada vez (la generacion suele desviarse si solo se nombra el color).
- Incluir el fondo base elegido y al menos una variante `on-light` y una `on-dark` para asegurar compatibilidad futura.
- Repetir `no text anywhere in the image, no logos` para reforzar.
- Cerrar siempre con la linea de bloqueo correspondiente a la opcion elegida.
- Definir el formato al final: `Square 1:1 format`, `Vertical 9:16 format` o `Horizontal 16:9 format`.

---

## Naming y guardado

Guardar siempre las imagenes en `assets/` del proyecto con naming descriptivo:

```
assets/illustration-[contexto-corto]-[NN].png
```

Ejemplos:

- `assets/illustration-benefits-discovery-01.png`
- `assets/illustration-secure-confirmation-02.png`

NO guardar dentro de la carpeta de la skill. Esa carpeta `assets/` es solo para referencias de estilo del agente.

---

## Checklist final

Antes de cerrar la generacion:

- [ ] En los 6 pasos se uso `AskQuestion` como UI principal.
- [ ] Los labels de las opciones fueron cortos y seleccionables con mouse o teclado.
- [ ] El usuario eligio fondo base en el paso 1.
- [ ] El usuario eligio paleta en el paso 2.
- [ ] El usuario eligio entorno en el paso 3 y los objetos de escena son coherentes con ese lugar.
- [ ] Se confirmaron las acciones del paso 4.
- [ ] Se decidio sobre logos/iconos en el paso 5 eligiendo entre `Si, color tematica`, `Si, primarios y secundarios` o `No`, con confirmacion explicita si fue "sugerimelos".
- [ ] Si hay iconos, siguen el estilo line-art con outline fino redondeado + fill plano (max 2 tonos), sin gradientes, sin texto, alineados con `assets/icon-reference-row-01.png`.
- [ ] El usuario aprobo el contexto del paso 6.
- [ ] La llamada a `GenerateImage` se hizo sin `reference_image_paths`.
- [ ] El prompt final lista HEX explicitos y bloquea colores fuera de paleta.
- [ ] El prompt incluye colores que funcionen tanto sobre fondo claro como oscuro.
- [ ] La imagen no contiene texto.
- [ ] El asset se guardo con naming descriptivo en `assets/` del proyecto.

---

## Recursos

- **Referencias de estilo de personajes**: `assets/style-reference-01.png`, `assets/style-reference-02.png`, `assets/style-reference-03.png`.
- **Referencias de estilo de iconos**: `assets/icon-reference-row-01.png` (fila de pictogramas con outline + fill aqua), `assets/icon-reference-character-01.png` (personaje rodeado de iconos contenidos en circulos).
  > No son ejemplos exactos ni completos. Les faltan ajustes visuales. Son aproximaciones a la direccion estetica buscada.
- **Detalles de paleta y composicion**: ver [reference.md](reference.md).
- **Pain points y prompts ya redactados**: `docs/design/instagram-pain-points.md`.
- **Manual de marca SwitchPay**: `docs/design/switchpay-brand-manual.md`.
