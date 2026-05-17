# Resumen Ejecutivo  
Esta guía exhaustiva presenta cómo desarrollar una *skill* de IA que analice una imagen de referencia y genere un **prompt de sistema** preciso para Claude Opus (generación de imagen). Se listan y priorizan todos los **atributos visuales** (colores con hex, fondo, sujeto, composición, iluminación, etc.) y **estilísticos** (movimiento artístico, realismo, técnica, filtros, etc.) a extraer. Se abordan parámetros técnicos típicos (resolución, pasos de muestreo, CFG, semilla) y se señala “no especificado” lo desconocido. Se define el formato de salida: **Sistema (≤30 palabras)** + **Usuario (≤60 palabras)** + **Negativo (≤20 palabras)**, todo en español. Incluye vocabulario prioritario bilingüe, una taxonomía comparativa de descriptores, un flujo de trabajo detallado paso a paso con checklist, errores comunes y cómo evitarlos. Se muestran ejemplos concretos (4 diurnos, 2 atardeceres, 2 nocturnos) con atributos extraídos y prompts generados. También se presentan plantillas reutilizables, tablas comparativas (categorías de descriptores, plantillas de prompt, parámetros modelo) y ayudas visuales (un diagrama Mermaid del flujo de análisis y una tabla de prioridad de atributos). Las recomendaciones se apoyan en fuentes oficiales (Claude/Anthropic, Google Cloud, IBM, PhotoAI, OpenArt)【22†L391-L399】【26†L128-L133】.

## Atributos visuales clave (analizar)  
Los siguientes atributos deben extraerse y priorizarse del imagén:

- **Colores dominantes y paleta**: colores principales/secundarios (p.ej. rojo puro `#FF0000`, azul marino `#000080`), combinaciones, saturación, tonos cálidos/fríos【37†L207-L215】. Ejemplos: *“paleta de tonos tierra suaves”*, *“azul eléctrico vibrante”*.  
- **Fondo (background)**: escenario general (urbano, natural, interior, abstracto) y detalles (edificios, árboles, muebles). Contexto: “bosque nevado al fondo”, “pared blanca lisa sin textura”.  
- **Sujeto principal (foreground)**: descripción precisa del objeto o persona central (edad, género, vestimenta, pose). Ej.: *“hombre de 30 años con chaqueta negra, sonriendo, sentado”*.  
- **Elementos secundarios (apoyo)**: objetos o personajes adicionales en escena (planta, animal, accesorio). Ubicación relativa al sujeto (delante, detrás, al costado).  
- **Composición y punto focal**: arreglo espacial (simetría, regla de tercios), uso de *espacio negativo*. Determine el punto de atención (“rostro bien iluminado en el centro”). Formato de encuadre (retrato 3:4, apaisado 16:9, cuadrado 1:1)【33†L75-L81】.  
- **Perspectiva y ángulo de cámara**: vista (a nivel de ojos, contrapicada, picada). Distancia focal sugerida (“lente gran angular 35mm”, “teleobjetivo 85mm”)【37†L187-L194】. Esto influye en la escala de los objetos y la profundidad percibida.  
- **Profundidad de campo**: grado de enfoque. Indicar *“fondo desenfocado”* o *“todo en foco”*. Bokeh o zonas borrosas resaltan al sujeto【37†L187-L194】.  
- **Movimiento / Pose**: si el sujeto está estático o en movimiento (p.ej. “corre, salta”), gestos (“brazos en alto”), orientación (“de perfil, mirando hacia abajo”). Impacta la dinámica de la escena.  
- **Texturas, materiales y patrones**: superficie de elementos (“madera pulida”, “piel de serpiente”, “tejido de lino”), patrones repetitivos (“patrón geométrico”, “rayas verticales”).  
- **Escala y proporciones**: relación de tamaño entre elementos (p.ej. “edificio desproporcionado”, “modelo en miniatura”). Use puntos de referencia (personas, objetos familiares) para determinar proporciones.  
- **Lentes / Profundidad focal**: detalle de lente o sensor (“enfoque nítido en cara, fondo ligeramente desenfocado”). Esto define la claridad de primeros planos vs. fondo【37†L187-L194】.

## Atributos de iluminación y ambiente  
En detalle:

- **Hora del día / luz ambiental**: amanecer/atardecer (luz cálida naranja), mediodía (luz neutra/azulada), noche (luz fría o artificial). Ejemplo: *“atardecer sobre el lago con cielo anaranjado”*【37†L159-L166】.  
- **Fuentes de luz**: natural (sol, luna), artificial (lamparas, neones). Dirección (“luz lateral izquierda”, “contraluz frontal”), calidad (“suave difusa”, “dura sombras definidas”)【37†L159-L166】.  
- **Iluminación clave**: luz principal (“key light”), luz de fondo o *fill*, luz de contorno o *rim*. Por ejemplo, “luz tenue de relleno proveniente abajo”.  
- **Sombras y highlights**: contraste (“sombras profundas”, “reflejos brillantes en metal”). Especulares (“destellos en ojos”, “brillo en metal pulido”).  
- **Temperatura de color**: tono general (cálido/anaranjado vs frío/azulado)【37†L159-L166】. Ej.: *“iluminación cálida de atardecer”, “neón frío violeta”*.  
- **Ánimos y atmósfera**: emoción transmitida: “melancólico”, “alegre”, “dramático”, “sereno”【37†L221-L226】. Vocabulario sugerido: *cinematográfico*, *noir*, *etéreo*, etc.  
- **Post-procesamiento**: posibles efectos añadidos (viñeta, film grain, desenfoque de movimiento). Ej.: *“luz de fondo con efecto bokeh”*, *“tonos desaturados estilo película”*.  

## Atributos estilísticos  
Considere el **estilo visual** global:

- **Movimiento artístico / géneros**: impresionismo, realismo, cubismo, surrealismo, futurismo, minimalismo, pop art, steampunk, cyberpunk, manga, etc.【33†L66-L74】. Nombres de artistas famosos pueden usarse para referencias (“estilo Picasso”, “fotografía al estilo Ansel Adams”).  
- **Nivel de realismo**: fotorrealista, hiperrealista, dibujo animado, ilustración digital, caricatura, boceto, acuarela, óleo. Ej.: *“retrato fotorrealista”* vs *“estilo cómic retro”*.  
- **Técnica de renderizado**: 3D CGI, pintura digital, ilustración vectorial, collage, animación. Ejemplo: “render 3D realista”, “ilustración a mano”.  
- **Pinceladas / líneas**: precisión del trazo (“líneas finas”, “pinceladas gruesas”), suavidad vs abstracción (“garabato”)【37†L187-L194】.  
- **Grano / ruido**: nivel de detalle fino (“ultra-HD”), o textura “con grano cinematográfico”, “ruido de fotografía analógica”.  
- **Filtros / efecto visual**: como “filtro noir”, “viñeta oscura”, “flare de lente”, “alta definición digital”, “textura retro”, “estilo Polaroid”.  

## Parámetros técnicos (Claude Opus y modelos de imagen)  
Los siguientes parámetros influyen en la generación (Claude Opus en sí no genera imágenes, pero se incluyen para referencia):

| Parámetro            | Descripción                                      | Valores típicos / Notas           |
|----------------------|--------------------------------------------------|-----------------------------------|
| Resolución           | Tamaño de la imagen en píxeles                   | e.g. 1024×1024, 1080p (sugerido)【8†L475-L482】 |
| Aspect Ratio         | Relación ancho:alto (formato)                    | 1:1 (cuadrado), 16:9, 9:16, 4:3【33†L75-L81】 |
| Pasos (Steps)        | Iteraciones de eliminación de ruido              | ~20–50 (↑ mejora detalle)【28†L185-L193】 |
| Muestreador (Sampler)| Algoritmo (Euler, DDIM, DPM) que genera imagen   | Ej. *Euler A* (sueños suaves)【28†L229-L233】 |
| CFG / Guidance       | Escala de guía del prompt (firmeza vs libertad)   | ~7 por defecto; 5–15 común【28†L239-L247】 |
| Semilla (Seed)       | Valor numérico para reproducibilidad (aleatorio)  | Mismo prompt+semilla→misma imagen【30†L268-L276】 |
| Tokens/Keywords      | Palabras clave específicas del modelo (si aplica) | *No especificado* (usar vocab. general) |

Si Claude Opus no soporta algunos parámetros (por ejemplo *sampler* o *CFG*), anote como *“no especificado”*. Para guiar generadores de imágenes comunes, use los parámetros estándar anteriores【28†L185-L193】【28†L239-L247】. Por ejemplo, use 25–30 pasos de difusión y CFG ~7 para equilibrio entre creatividad y precisión【28†L185-L193】【28†L239-L247】. La semilla fija permite iterar variando sólo partes del prompt【30†L268-L276】.

## Formato de salida de la skill  
La *skill* debe devolver **tres partes** en español con estas restricciones:  

- **Sistema (≤30 palabras)**: instrucción breve que define el rol/estilo. Ejemplo: *“Eres un asistente de diseño gráfico especializado en ilustraciones realistas.”*  
- **Usuario (≤60 palabras)**: descripción concisa de la imagen a generar, incluyendo los atributos extraídos principales. Debe listar sujeto, entorno, iluminación y estilo dominante. Ejemplo: *“Una mujer con vestido rojo caminando por un bosque nevado al atardecer. Luz suave dorada, ambiente tranquilo, estilo fotorrealista.”*  
- **Negativo (≤20 palabras)**: lista de elementos a evitar (uso de negativos o exclusiones). Ejemplo: *“no incluir texto, baja resolución, colores irreales.”*  

**Ejemplo de formato**:  
```
Sistema: "Eres un generador de imágenes profesional en estilo futurista realista."
Usuario: "Un retrato de un astronauta en Marte, casco brillante, paisaje rojo polvoriento al atardecer. Fotografía hiperrealista, iluminación dramática cálida."
Negativo: "sin distorsiones, sin texturas de baja calidad, sin texto"
```
Cite fuentes de buenas prácticas de prompts (p.ej. Google Cloud【22†L391-L399】, PhotoAI【35†L124-L127】) para estructurar claridad y brevedad.

## Vocabulario prioritario (español / inglés)  
A continuación vocabulario relevante; elegir términos según la imagen:

- **Colores y tonos**: *cálido* / warm, *frío* / cool, *pastel*, *vibrante* / vibrant, *oscuro* / dark, *monocromático* / monochrome, *saturado* / saturated. Ej.: *“tonos tierra apagados (muted earth tones)”*.  
- **Iluminación**: *contraluz* / backlit, *iluminación suave* / soft lighting, *luz dura* / hard light, *hora dorada* / golden hour, *neón* / neon, *ambiental* / ambient.  
- **Estilos**: *impresionista* / impressionist, *surrealista* / surrealist, *fotorrealista* / photorealistic, *surreal*, *barroco* / baroque, *cyberpunk*, *retro*, *minimalista* / minimalist, *cinematográfico* / cinematic.  
- **Técnicas**: *acuarela* / watercolor, *óleo* / oil painting, *fotografía* / photograph, *ilustración digital* / digital illustration, *boceto* / sketch, *concept art*, *renderizado 3D* / 3D render.  
- **Ambiente / emoción**: *dramático* / dramatic, *sereno* / serene, *melancólico* / melancholic, *vibrante* / vibrant, *etéreo* / ethereal, *oscuro* / moody.  
- **Composición**: *simétrico* / symmetrical, *centrado* / centered, *profundo* / deep focus, *perspectiva aérea* / aerial view, *plano detalle* / close-up.  
- **Texturas**: *rugoso* / rough, *liso* / smooth, *metálico* / metallic, *mate* / matte, *bruñido* / glossy.  

Estos términos se usan en prompts para evocar estilos específicos【33†L66-L74】【37†L221-L226】. Es útil combinar un adjetivo español con uno en inglés cuando se comunica con modelos entrenados principalmente en inglés, o viceversa.

## Taxonomía de descriptores (tabla comparativa)  

| Categoría          | Ejemplo Español           | Ejemplo Inglés        | Descripción breve                             |
|--------------------|---------------------------|-----------------------|-----------------------------------------------|
| **Estilo artístico** | impresionista, surrealista | impressionist, surreal | Movimientos artísticos o estéticos generales |
| **Realismo**        | fotorrealista, cómic      | photorealistic, cartoon | Nivel de detalle y realismo visual           |
| **Técnica**         | óleo sobre lienzo, CGI    | oil on canvas, CGI     | Medio o técnica de representación            |
| **Paleta de color** | tonos tierra, neón        | earth tones, neon      | Dominio de la paleta cromática               |
| **Iluminación**     | luz suave, contraluz      | soft light, backlight  | Características de la fuente de luz          |
| **Composición**     | simétrico, centrado       | symmetrical, centered  | Distribución espacial de elementos           |
| **Temática**        | ciberpunk, nocturno       | cyberpunk, night       | Género o escenario (punk, sci-fi, etc.)      |

Esta tabla resume cómo clasificar los descriptores clave. Puede ampliarse con ejemplos concretos (p.ej. añadir columna “Ejemplo Prompt”).  

## Flujo de trabajo y checklist paso a paso  

1. **Análisis Inicial:** Observe la imagen entera, registre impresiones generales (paleta, tema).  
2. **Extracción de atributos visuales:** Liste sujeto, objetos secundarios, colores principales (incluir hex si es posible), texturas, escala, composición (regla de tercios, simetría).  
3. **Iluminación y cámara:** Identifique hora del día, fuentes de luz (suave o dura, dirección, color). Determine ángulo y lente aproximado. Incluya DoF (fondo borroso o nítido).  
4. **Estilo y técnica:** Determine movimiento artístico o nivel de realismo. Busque técnicas específicas (óleo, acuarela, render digital, cómic).  
5. **Atmósfera / emoción:** Anote estado de ánimo (dramático, sereno, tenso) basado en color e iluminación.  
6. **Priorizar atributos:** Ordene atributos según impacto (p.ej. “color y luz” por alto, “textura” por medio). Puede usar una matriz de prioridad.  
7. **Redacción del Prompt:** Escriba el *prompt de sistema* (rol/estilo) y *user* (detalles visuales) utilizando los atributos. Use oraciones claras y concisas【22†L391-L399】【35†L124-L127】.  
8. **Prompt negativo:** Basado en defectos observados o comunes (manos deformes, etc.), añada exclusiones.  
9. **Iteración y revisión:** Pruebe el prompt, compare con la imagen de referencia, ajuste atributos o palabras clave hasta alinear la salida.  

Este flujo asegura un análisis metódico y fomenta prompts completos. El diagrama siguiente ilustra el proceso:  

```mermaid
flowchart LR
  A[Iniciar: Imagen de referencia] --> B[Extraer sujetos, fondo y colores]
  B --> C[Determinar iluminación y perspectiva]
  C --> D[Identificar estilo, técnica y emoción]
  D --> E[Escribir Prompt del Sistema (rol/estilo)]
  E --> F[Escribir Prompt del Usuario (detalles visuales)]
  F --> G[Generar Prompt Negativo (evitar errores)]
  G --> H[Ejecutar y comparar resultados con imagen]
  H --> I{¿Se requiere ajuste?}
  I -- Sí --> B
  I -- No --> J[Prompt finalizado]
```

## Errores comunes y mitigación  

- **Descripciones vagas:** Usar términos genéricos (“bonito”, “interesante”) confunde al modelo【35†L124-L127】. Mitigue con detalles precisos (“hermoso” → “luminoso, contrastado”).  
- **Mezclar estilos incompatibles:** Instrucciones contradictorias (p.ej. “realista y caricaturesco” juntos) producen resultados erráticos. Elija un estilo dominante【37†L238-L247】.  
- **Olvidar negativos:** No indicar exclusiones genera objetos indeseados (ruido, texto). Incluir *prompt negativo* mejora la calidad final【28†L166-L174】【37†L268-L277】.  
- **Ignorar parámetros técnicos:** No especificar proporción o resolución puede recortar la imagen. Siempre fije relación de aspecto y calidad (HD, 4K)【8†L475-L482】【33†L75-L81】.  
- **No iterar:** Tomar el primer resultado puede dejar errores. Alimente de nuevo iterando cambios pequeños (un atributo a la vez)【30†L268-L276】 para alinear con la referencia.  

## Ejemplos anotados (imágenes → atributos → prompt)  

**Ejemplo 1 (Día – Retrato a contraluz):** Sujeto: mujer vestida de blanco. Fondo: bosque nevado. Colores: predominan blancos/azules suaves. Iluminación: sol de la mañana detrás (contraluz dorado). Estilo: fotografía realista alta definición.  
- *Prompt:*  
  - Sistema: “Eres un asistente de generación de imágenes fotográficas realistas.”  
  - Usuario: “Retrato de una mujer de pie en un bosque nevado al amanecer. Viste abrigo blanco, luz dorada del sol detrás iluminando su cabello. Fotografía hiperrealista, alta resolución, enfoque nítido.”  
  - Negativo: “sin sobreexposición, sin desenfoque excesivo, sin texto.”  

**Ejemplo 2 (Día – Urbana vibrante):** Sujeto: persona bailando en calle. Fondo: ciudad moderna con grafiti. Colores: brillantes (rojo, amarillo, azul). Iluminación: luz diurna clara, sombras definidas. Estilo: ilustración digital pop art.  
- *Prompt:*  
  - Sistema: “Eres un generador artístico experto en ilustración pop moderna.”  
  - Usuario: “Escena de día en una calle urbana llena de color. Un joven baila con grafitis en las paredes. Colores saturados (rojo, amarillo, azul), luz solar intensa, sombra marcada. Estilo cómic pop art.”  
  - Negativo: “no incluir tonos apagados, sin desenfoque, sin elementos futuristas.”  

**Ejemplo 3 (Día – Paisaje natural):** Sujeto: río serpenteante. Fondo: montañas verdes. Colores: verdes, marrones terrosos. Iluminación: sol de mediodía directo. Estilo: pintura al óleo realista.  
- *Prompt:*  
  - Sistema: “Eres un generador de paisajes realistas en óleo.”  
  - Usuario: “Un río transparente rodeado de montañas verdes bajo el sol del mediodía. Árboles a la orilla, cielo azul. Pintura al óleo detallada, paleta de colores naturales.”  
  - Negativo: “evitar colores irreales, sin personajes, sin artefactos digitales.”  

**Ejemplo 4 (Día – Producto minimalista):** Sujeto: taza de té en primer plano. Fondo: madera clara. Colores: neutros (beige, blanco). Iluminación: luz suave difusa lateral. Estilo: fotografía minimalista comercial.  
- *Prompt:*  
  - Sistema: “Eres un fotógrafo de producto profesional.”  
  - Usuario: “Primer plano de una taza de té blanco sobre mesa de madera clara. Luz suave difusa lateral resaltando el contorno. Estilo minimalista, enfoque nítido en la taza, fondo desenfocado.”  
  - Negativo: “sin texto, sin objetos extra, sin alta saturación.”  

**Ejemplo 5 (Atardecer – Desierto dorado):** Sujeto: dunas de arena. Fondo: sol poniente bajo el horizonte. Colores: naranjas, dorados, sombras azuladas. Iluminación: contraste fuerte, sol de atardecer. Estilo: fotografía panorámica realista.  
- *Prompt:*  
  - Sistema: “Eres un asistente experto en fotografía de paisaje.”  
  - Usuario: “Panorama de desierto con grandes dunas iluminadas por el sol al atardecer. Cielo naranja y rosado, sombras alargadas azules. Fotografía realista en alta definición.”  
  - Negativo: “no incluir vegetación, sin cielo despejado, sin ruido digital.”  

**Ejemplo 6 (Atardecer – Ciudad melancólica):** Sujeto: calle empedrada vacía. Fondo: faroles encendidos y edificios antiguos. Colores: cálidos del atardecer, azules crepusculares. Iluminación: luz tenue dorada y sombras largas. Estilo: pintura digital atmosférica.  
- *Prompt:*  
  - Sistema: “Eres un generador de escenas cinemáticas urbanas.”  
  - Usuario: “Calle empedrada vacía al atardecer, con faroles antiguos encendidos. Luz dorada del sol poniente, sombras profundas. Paleta cálida mezclada con azules fríos. Arte digital detallado, atmósfera melancólica.”  
  - Negativo: “sin autos, sin cielos rojos intensos, sin artefactos.”  

**Ejemplo 7 (Noche – Cielo estrellado):** Sujeto: silueta de un viejo roble. Fondo: cielo nocturno con Vía Láctea. Colores: azul oscuro, estrellas blancas. Iluminación: luz lunar tenue. Estilo: fotografía de larga exposición, realista.  
- *Prompt:*  
  - Sistema: “Eres un fotógrafo nocturno especializado en astrofotografía.”  
  - Usuario: “Árbol solitario en primer plano bajo un cielo estrellado. Vía Láctea visible con tonos blancos y azulados. Iluminación de luz de luna pálida, ambiente tranquilo. Imagen fotorrealista, alta resolución.”  
  - Negativo: “evitar nubes, sin luces de ciudad, sin ruido de ISO.”  

**Ejemplo 8 (Noche – Neones urbanos):** Sujeto: persona con paraguas. Fondo: calle de ciudad con neones rosas y azules. Colores: neón brillante, reflejos en el asfalto mojado. Iluminación: luz dura de neón, contrastes fuertes. Estilo: estética cyberpunk.  
- *Prompt:*  
  - Sistema: “Eres un asistente generador de escenas futuristas.”  
  - Usuario: “Escena nocturna urbana estilo cyberpunk. Una persona con paraguas camina por calle mojada iluminada por letreros de neón rosa y azul. Luces de reflejos intensos, atmósfera futurista. Alta saturación y detalle.”  
  - Negativo: “sin iluminación natural, sin personajes adicionales, sin ruido.”  

## Plantilla reutilizable y guía de uso  
**Plantilla de prompt (español):**  
```
Sistema: "Eres un generador de imágenes experto en [rol/estilo específico]."
Usuario: "[Descripción breve del sujeto, entorno y estilo visual deseado]. [Detalle de iluminación y color]. [Formato/calidad]."
Negativo: "[Elementos a evitar: e.g. baja resolución, desenfoque, colores irreales, marcas de agua]."
```  
*Ejemplo de uso:* Para generar un paisaje montañoso al amanecer, el sistema podría ser *“fotógrafo de paisajes”*, y el usuario describiría la escena: *“Valles montañosos al amanecer con niebla suave, cielo rosado, enfoque nítido”*, añadiendo negativos como *“sin cielo despejado, sin personas”*. 

Esta plantilla asegura consistencia: el **sistema** define rol y estilo (limitado a ~30 palabras), mientras el **usuario** detalla la escena (~60 palabras), y **negativo** excluye aspectos no deseados (~20 palabras). Al usarla iterativamente, los resultados convergen con la imagen de referencia.  

## Resumen de prioridades de atributos  
| Prioridad | Atributos clave                 |
|----------:|----------------------------------|
| **Alta**  | Color, composición, sujeto       |
| **Media** | Iluminación, estilo, perspectiva |
| **Baja**  | Textura, objeto secundario, negativo |

En un prompt, los colores dominantes y la composición (sujeto vs fondo) deben priorizarse, seguidos por detalles de luz y estilo artístico【37†L207-L215】【37†L187-L194】. Los prompts negativos, aunque breves, deben incluirse para calidad.  