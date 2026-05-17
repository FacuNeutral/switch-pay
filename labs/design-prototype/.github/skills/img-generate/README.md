# Img Generate — Analisis de referencia: Retrato duotono con headphones

Spec visual completo extraido de una imagen de referencia (mujer de perfil con auriculares over-ear, iluminacion split rosa coral + azul violeta sobre fondo blush). Sirve como **ejemplo trabajado** del flujo de la skill [`img-generate`](SKILL.md) y como template reutilizable para campanas de producto con color grading duotono.

> Para el procedimiento general (reglas, formato de salida, limites de palabras) ver [SKILL.md](SKILL.md).
> Para vocabulario, taxonomia y errores comunes ver [reference.md](reference.md).

---

## 1. Resumen ejecutivo

Fotografia editorial de producto con modelo, **duochrome lighting** (rosa coral + azul violeta), composicion vertical de perfil, foco absoluto en los auriculares over-ear. Estetica de campana publicitaria moderna estilo *nura / Beats / Apple Music*: limpia, saturada, con gradiente cromatico que envuelve al sujeto.

---

## 2. Sujeto principal

| Atributo | Valor |
|---|---|
| Tipo | Retrato 3/4 trasero - perfil derecho |
| Genero / edad | Mujer joven, 20-30 anos |
| Peinado | Recogido alto tipo *top bun / messy bun*, cabello oscuro |
| Vestimenta | Sweater gris claro melange, cuello redondo, tejido visible |
| Pose | Mirando hacia la derecha fuera de cuadro, cuello expuesto, hombros relajados |
| Expresion | Neutra, serena, contemplativa |
| Producto destacado | Auriculares over-ear circumaurales (logo `nura`), color real oscuro, tenido de azul ultramar/cobalto por la luz |

---

## 3. Paleta cromatica (alta prioridad)

| Rol | HEX aprox | Nombre | Donde aparece |
|---|---|---|---|
| Fondo | `#F4C7C2` | Rosa coral suave / blush | Lado izquierdo del fondo y zona iluminada de la piel |
| Acento calido | `#E89A9A` - `#D96A75` | Coral / rosa salmon | Rim light en mejilla, oreja, cuello |
| Sombra fria | `#2A1E5C` - `#3B2D7A` | Indigo / azul violeta profundo | Auriculares, cabello, sombras |
| Medio tono | `#6B5A9E` | Lavanda apagado | Transicion piel-sombra |
| Neutro | `#B8B5BE` | Gris frio | Sweater |
| Highlight piel | `#F7D8D3` | Rosa palido | Reflejo en mejilla y nariz |

**Regla**: gradiente split-tone estricto. Lado izquierdo del cuadro = **calido/coral**; lado derecho del rostro = **frio/violeta**. Sin verdes, amarillos ni naranjas saturados.

---

## 4. Iluminacion

- **Esquema**: dos fuentes opuestas (split lighting / *gelled dual light*).
- **Key light** (izquierda, detras del sujeto): luz dura coloreada con gel **rosa coral**, crea rim caliente en oreja, mejilla, nucleo del cuello y borde del hombro.
- **Fill light** (derecha-frontal): luz mas suave coloreada con gel **azul/violeta**, dibuja el rostro de perfil y baja el contraste en sombras.
- **Calidad**: media-dura, sombras definidas pero sin recortes duros.
- **Temperatura**: contraste **calido vs frio** extremo (~2500K vs ~8000K aparentes).
- **Direccion dominante**: 3/4 trasera respecto al sujeto.
- **Ambiente**: estudio cerrado, sin luz ambiente neutra.

---

## 5. Composicion y encuadre

- **Formato**: vertical, ratio aprox **3:4 o 4:5** (apto mobile / IG portrait).
- **Encuadre**: medium close-up, corta a la altura del pecho.
- **Regla**: sujeto centrado horizontalmente con leve desplazamiento a la derecha; cabeza en el tercio superior.
- **Espacio negativo**: zona izquierda superior (rosa plano) para titulares / copy.
- **Punto focal**: copa del auricular derecho (centro optico).
- **Lineas guia**: curva del recogido + curva del headband forman una S desde la nuca al producto.
- **Profundidad de campo**: amplia, todo en foco; fondo plano sin textura (cyclorama liso pintado).

---

## 6. Camara y optica

| Parametro | Valor sugerido |
|---|---|
| Lente | 85mm f/2.8 o 105mm (retrato editorial) |
| Distancia | Plano medio cerrado |
| Angulo | A la altura de los ojos, ligeramente decentrado |
| Apertura | f/5.6 - f/8 (todo nitido) |
| ISO | Bajo (100-200), sin grano |
| Sensor | Full frame, alta resolucion |

---

## 7. Estilo y tecnica

- **Genero**: fotografia comercial de producto + retrato editorial.
- **Tratamiento**: **color grading duotono** muy marcado (gel lighting real, no solo filtro photoshop).
- **Acabado**: limpio, alta nitidez, piel retocada sutil (poros visibles pero homogenea).
- **Referencias estilisticas**: campanas `nura`, `Beats by Dre`, `Apple AirPods Max`, editoriales tipo *Hypebeast* / *Wallpaper*.
- **Post**: contraste alto, microcontraste presente, sin HDR, sin vineta agresiva.

---

## 8. Atmosfera

- **Mood**: contemplativo, premium, immersivo, "perdida en la musica".
- **Energia**: estatica, silenciosa, introspectiva.
- **Asociaciones**: audio hi-fi, cancelacion de ruido, lifestyle aspiracional.

---

## 9. Detalles tecnicos del producto

- Headphones **circumaurales** (cubren toda la oreja), almohadillas gruesas mate.
- Headband acolchado, microajuste deslizable visible.
- Logo discreto `nura` en headband y copa.
- Acabado mate uniforme; el azul es producto del **gel light**, no del color real del objeto (el real es negro/grafito).

---

## 10. Prompt listo para regenerar (formato skill `img-generate`)

```
Sistema: "Eres un fotografo comercial editorial especializado en retrato de producto con iluminacion duotono de gel."
Usuario: "Mujer joven de perfil con recogido alto y sweater gris usando auriculares over-ear negros estilo nura. Iluminacion split: gel rosa coral desde atras izquierda crea rim calido en piel y cuello, gel azul violeta frontal derecho tine sombras y producto. Fondo liso rosa blush, encuadre vertical 4:5, foco en headphone, todo nitido, estilo campana premium."
Negativo: "baja resolucion, ruido digital, deformaciones, texto, marca de agua, sombras planas, fondo texturizado, colores calidos amarillos, naranjas, verdes, HDR exagerado, piel plastica."
```

---

## 11. Variables para iterar

| Variable | Opciones |
|---|---|
| Genero del gel | rosa+azul / azul+naranja / verde+magenta |
| Color de fondo | blush `#F4C7C2`, lila `#D9CFE8`, durazno `#F2B79E` |
| Producto | headphones, IEM, smartwatch, parlante portatil |
| Pose | perfil derecho / izquierdo / nuca pura |
| Vestimenta | sweater gris, hoodie negro, turtleneck blanco |
| Crop | 4:5 portrait, 1:1, 9:16 reel |

---

## 12. Checklist de validacion al recrear

- [ ] Dos colores de luz claramente diferenciados (calido vs frio).
- [ ] Rim light visible en mejilla, oreja y cuello.
- [ ] Producto centrado optica y narrativamente.
- [ ] Fondo plano sin gradiente vertical, solo el gradiente cromatico de la luz.
- [ ] Sweater conserva neutralidad (no se tine totalmente).
- [ ] Sin texto, logos extra ni elementos decorativos.
- [ ] Formato vertical, espacio negativo arriba-izquierda.

---

## 13. Compatibilidad con paleta SwitchPay

Esta referencia **no** es compatible directa con la paleta de marca SwitchPay (aqua/verdes). Para adaptar a campana SwitchPay manteniendo el concepto duotono:

- Sustituir gel rosa por **mint `#5FD3A3`**.
- Sustituir gel violeta por **aqua profundo `#0E8F66`**.
- Mantener fondo claro `#F4F8F7` o oscuro `#09090B`.
- Conservar split lighting, encuadre y composicion.

Para piezas de marca canonicas usar la skill [`illustration-generator`](../illustration-generator/SKILL.md) en lugar de fotografia real.
