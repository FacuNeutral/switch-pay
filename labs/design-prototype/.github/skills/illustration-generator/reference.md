# Illustration Generator — Reference

Documentacion ampliada de la skill `illustration-generator`. Aca viven los detalles que no entran en el flujo principal de `SKILL.md` para mantenerlo conciso.

> Las referencias visuales de `assets/` sirven para estudiar el estilo, pero no deben enviarse a `GenerateImage`. En este flujo, usar `reference_image_paths` hace fallar la generacion.

---

## 1. Paleta extendida con uso por elemento

### Fondos base

| HEX | Donde aplicarlo |
|-----|-----------------|
| `#F4F8F7` | Fondo claro recomendado |
| `#FFFFFF` | Cards, fondos blancos, highlights |
| `#09090B` | Fondo oscuro recomendado |
| `#101B2E` | Cards o superficies sobre negro |

### Verdes aqua (primarios)

| HEX | Donde aplicarlo |
|-----|-----------------|
| `#15B981` | Base de marca, ropa, sillon, iconos principales; funciona en claro y oscuro |
| `#0E8F66` | Variante `on-light`: bordes, iconos y profundidad sobre blanco |
| `#63D69F` | Variante `on-dark`: highlights, iconos y detalles sobre negro |
| `#DCF6E7` | Soft light: halos y fondos suaves sobre claro |
| `#123A31` | Soft dark: halos y bloques tonales sobre oscuro |

### Morados (secundarios)

| HEX | Donde aplicarlo |
|-----|-----------------|
| `#6F4DE8` | Base secundaria, elementos premium y switch; funciona en claro y oscuro |
| `#5A3DD1` | Variante `on-light`: bordes, iconos y profundidad sobre blanco |
| `#A996FF` | Variante `on-dark`: highlights, iconos y detalles sobre negro |
| `#E8E1FF` | Soft light: halos y fondos suaves sobre claro |
| `#261E4A` | Soft dark: halos y bloques tonales sobre oscuro |

### Neutros

| HEX | Donde aplicarlo |
|-----|-----------------|
| `#FFFFFF` | Cards flotantes, fondo del telefono, halos puntuales |
| `#F4F8F7` | Fondo principal de la escena |
| `#09090B` | Fondo oscuro principal |
| `#101B2E` | Superficie oscura secundaria |
| `#102021` | Cabello, outlines minimos, ojos, jeans/pantalones oscuros |
| `#F1FAF8` | Lineas claras sobre fondo oscuro |
| `#5C6B70` | Detalles tenues, hojas en sombra, lineas guia |

### Tonos de piel — guia de uso

Para crear diversidad, alternar tonos entre piezas. Reglas:

- En escenas con un solo personaje, elegir el tono que mejor contraste con la ropa.
- En escenas con dos personajes, elegir tonos distintos para diferenciarlos visualmente.
- Evitar repetir el mismo tono en la misma serie de imagenes.

| HEX | Notas |
|-----|-------|
| `#F4D6C0` | Funciona bien con sweaters `#15B981`, `#63D69F` y `#A996FF` |
| `#E6B89C` | Versatil, neutral, va con cualquier verde |
| `#C68F6B` | Buen contraste con fondos pale-mint |
| `#A06A45` | Destaca con ropa en `#63D69F`, `#A996FF` o `#FFFFFF` |
| `#6B4226` | Contraste fuerte con todos los verdes |

---

## 2. Composicion tipica

### Layout estandar (1:1)

```
┌─────────────────────────────┐
│  hojas       hojas decorat. │
│       ╭─────────────╮       │
│       │             │       │
│       │  PERSONAJE  │ CARDS │
│       │   (centro-  │ flota │
│       │    izq.)    │ derec.│
│       │             │       │
│       ╰─────────────╯       │
│  hojas        hojas decorat.│
└─────────────────────────────┘
```

- Personaje ocupa ~50-60% del alto.
- Circulo suave detras del personaje, mas grande que el personaje.
- Cards o iconos flotando en el cuadrante opuesto.
- Hojas decorativas pequeñas en al menos 2 esquinas.
- Mucho espacio respirado alrededor: blanco/off-white si fondo claro, negro/surface-dark si fondo oscuro.

### Layout con dos personajes

- Ambos a la misma altura visual.
- Espacio central reservado para iconos, cards o un objeto compartido.
- Tonos de piel distintos.
- Ropa con tonos diferenciados de la paleta activa. Validar contraste tanto sobre claro como sobre oscuro.

---

## 3. Iconografia permitida (cuando el usuario lo pide)

Iconos solidos planos en el color dominante de la paleta activa: `#15B981`/`#0E8F66`/`#63D69F` para primarios o `#6F4DE8`/`#5A3DD1`/`#A996FF` para secundarios.

- **Categorias**: corazon-pulso (health), hoja (wellness), wallet (financial), sparkles (lifestyle).
- **Transporte y comida**: bus, bicicleta, auto, bowl, manzana, vianda.
- **Acciones**: shield-check, repeat (switch), arrow-swap, plus, check-circle.
- **UI**: dumbbell (gym), laptop (home office), heartbeat, ring de progreso.

Reglas:

- Cada icono va dentro de un circulo o card blanca con sombra suave.
- Sin etiquetas de texto debajo.
- Stroke uniforme cuando sea lineal; relleno solido cuando sea pictograma.

---

## 4. Formatos comunes

| Uso | Aspect ratio | Resolucion sugerida |
|-----|--------------|---------------------|
| Instagram feed | 1:1 | 1080x1080 |
| Instagram story / reel | 9:16 | 1080x1920 |
| Hero web | 16:9 | 1920x1080 |
| Tarjeta lateral | 4:3 | 1200x900 |
| Section illustration | 3:2 | 1500x1000 |

---

## 5. Plantillas de prompt por escenario

### A. Personaje solo con telefono

```
Flat vector illustration in modern banking-app style. A young [genero] with [piel HEX] skin tone, dark hair styled [estilo], wearing an aqua #15B981 sweater, sitting on a comfortable rounded armchair in [#15B981 or #0E8F66 for light background, #63D69F for dark background], holding a smartphone with both hands, [expresion]. Background is [#F4F8F7/#FFFFFF for light or #09090B/#101B2E for dark] with a large soft circle [#DCF6E7 on light or #123A31 on dark] behind the character. Rounded shapes, simple ovaloid eyes, no text anywhere, no logos. Color palette strictly: #15B981, #0E8F66, #63D69F, #DCF6E7, #123A31, #F4F8F7, #FFFFFF, #09090B, #101B2E, #102021, #F1FAF8, plus skin tone [piel HEX]. Must remain readable on both light and dark backgrounds. No purples, no magentas, no oranges. Square 1:1 format.
```

### B. Dos personajes lado a lado

```
Flat vector illustration in modern banking-app style. Two friendly characters side by side. Left character: young man with [piel HEX A] skin, dark short hair, wearing #15B981 sweater, holding [objeto]. Right character: young woman with [piel HEX B] skin, dark hair in a ponytail, wearing [#0E8F66 on light or #63D69F on dark] sweater, holding [objeto]. Between them, [elemento central opcional o vacio]. Background is [#F4F8F7/#FFFFFF for light or #09090B/#101B2E for dark] with two large soft circles [#DCF6E7 on light or #123A31 on dark] behind each character. Rounded shapes, friendly expressions, simple ovaloid eyes, no text anywhere, no logos. Color palette strictly: #15B981, #0E8F66, #63D69F, #DCF6E7, #123A31, #F4F8F7, #FFFFFF, #09090B, #101B2E, #102021, #F1FAF8, plus skin tones [piel HEX A] and [piel HEX B]. Must remain readable on both light and dark backgrounds. No purples, no magentas. Square 1:1 format.
```

### C. Personaje con cards/iconos flotantes

```
Flat vector illustration in modern banking-app style. A young [genero] with [piel HEX] skin tone, [cabello], wearing a #15B981 sweater, [pose y accion]. Surrounding the character, [N] floating circular bubbles in [#FFFFFF on light or #101B2E on dark] with subtle soft shadow, connected by very thin dashed lines in [#0E8F66 on light or #63D69F on dark]. Each bubble shows a different icon in [#0E8F66 on light or #63D69F on dark]: [lista de iconos]. Background is [#F4F8F7/#FFFFFF for light or #09090B/#101B2E for dark] with a large soft circle [#DCF6E7 on light or #123A31 on dark] behind the character. Rounded shapes, no text anywhere, no logos. Color palette strictly: #15B981, #0E8F66, #63D69F, #DCF6E7, #123A31, #F4F8F7, #FFFFFF, #09090B, #101B2E, #102021, #F1FAF8, plus skin tone [piel HEX]. Must remain readable on both light and dark backgrounds. No purples, no magentas, no oranges. Square 1:1 format.
```

### D. Modo blanco y negro (paleta opcion 4)

```
Flat vector monochrome illustration in modern banking-app style. A young [genero] with [piel HEX] skin tone, dark hair, wearing a light gray sweater, [accion]. Background is clean off-white #F4F8F7 with a large soft gray circle behind the character. Rounded shapes, simple ovaloid eyes, no text anywhere, no logos. Color palette strictly: #FFFFFF, #F4F8F7, #5C6B70, #102021, plus realistic skin tone [piel HEX]. No color at all except realistic skin tones. Pure grayscale composition. Premium, calm, minimal monochrome banking illustration. Square 1:1 format.
```

### E. Paleta secundaria — variantes de morado (opcion 2)

```
Flat vector illustration in modern banking-app style. A young [genero] with [piel HEX] skin tone, dark hair, wearing a purple #6F4DE8 sweater, [accion]. [Elementos de escena con HEX de la paleta secundaria: sillon en #5A3DD1 on light or #A996FF on dark, cards with #E8E1FF on light or #261E4A on dark]. Background is [#F4F8F7/#FFFFFF for light or #09090B/#101B2E for dark] with a large soft purple circle [#E8E1FF on light or #261E4A on dark] behind the character. Rounded shapes, simple ovaloid eyes, no text anywhere, no logos. Color palette strictly: #6F4DE8, #5A3DD1, #A996FF, #E8E1FF, #261E4A, #F4F8F7, #FFFFFF, #09090B, #101B2E, #102021, #F1FAF8, plus realistic skin tone [piel HEX]. Must remain readable on both light and dark backgrounds. No greens, no aqua tones, no teal. No yellows, no oranges, no reds. Premium, calm, minimal SwitchPay banking illustration. Square 1:1 format.
```

### F. Mezcla aqua + morado (opcion 3)

```
Flat vector illustration in modern banking-app style. A young [genero] with [piel HEX] skin tone, dark hair, wearing an aqua #15B981 sweater, [accion]. [Elementos accent en morado: card destacada con borde #6F4DE8, halo #E8E1FF on light or #261E4A on dark, highlight #A996FF on dark]. Background is [#F4F8F7/#FFFFFF for light or #09090B/#101B2E for dark] with a large soft circle [#DCF6E7 on light or #123A31 on dark] behind the character. Rounded shapes, simple ovaloid eyes, no text anywhere, no logos. Color palette strictly: #15B981, #0E8F66, #63D69F, #DCF6E7, #123A31, #6F4DE8, #5A3DD1, #A996FF, #E8E1FF, #261E4A, #F4F8F7, #FFFFFF, #09090B, #101B2E, #102021, #F1FAF8, plus realistic skin tone [piel HEX]. Must remain readable on both light and dark backgrounds. Only aqua greens and purple accent variants. No yellows, no oranges, no reds, no saturated blues. Premium, calm, minimal SwitchPay banking illustration. Square 1:1 format.
```

---

## 6. Errores comunes y como evitarlos

| Problema | Causa | Fix |
|----------|-------|-----|
| Aparece morado en una imagen de paleta primaria (opcion 1 o 4) | El modelo agrega accent fuera de paleta | Reforzar `No purples, no violets` solo cuando la opcion elegida lo prohibe |
| Aparece amarillo, naranja o rojo en cualquier opcion | Color fuera del lenguaje de marca | Agregar `No yellows, no oranges, no reds` al final del prompt |
| Falla `GenerateImage` al invocar la herramienta | Se enviaron referencias en `reference_image_paths` | No adjuntar imagenes de referencia. Usar solo `description` y `filename` |
| Aparece texto en pantallas o carteles | Falta refuerzo en el prompt | Agregar `no text anywhere in the image, screens show only abstract bars and dots` |
| Colores apagados o desviados del HEX | Lista de paleta poco enfatica | Listar todos los HEX dos veces: en la descripcion y en el bloque "color palette strictly" |
| La imagen se pierde sobre blanco o negro | Se uso solo una variante de color | Incluir siempre variantes `on-light` y `on-dark` en el prompt |
| Personaje muy fotorealista | Falta tag de estilo | Reforzar `flat vector illustration, simple ovaloid eyes, rounded shapes` |
| Outline grueso o tipo cartoon | Falta especificar trazo | Agregar `thin or no outline, color resolves the silhouette` |
| Aparece logo de marca real | El modelo improvisa | Agregar `no logos, no brand marks, no trademarks` |

---

## 7. Cuando combinar con otras skills

- **Si el resultado se va a integrar en componentes React** → cargar tambien la skill `infrastructure` para decidir donde vive el asset.
- **Si la imagen va al `<head>` o a OpenGraph** → cargar la skill `seo`.
- **Si se documenta una pagina con esta ilustracion** → cargar la skill `doc-pages-explorer`.
- **Si se ajustan tokens de color del proyecto a partir de la ilustracion** → cargar la skill `design-system`.
