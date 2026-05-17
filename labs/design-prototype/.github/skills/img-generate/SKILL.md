---
name: img-generate
description: "Analizar una imagen de referencia y devolver un prompt resumido (Sistema + Usuario + Negativo en espanol) listo para recrear ese diseno visual con un generador de imagenes. Cubre extraccion priorizada de atributos visuales (color, composicion, sujeto, iluminacion, estilo, tecnica, ambiente) y formato compacto de salida. Usar cuando el usuario adjunta o referencia una imagen y pide reproducirla, clonar su estilo, generar un prompt a partir de ella, describir como recrearla, o menciona analizar imagen, recrear diseno, prompt desde imagen, copiar estilo visual, image-to-prompt."
---

# Img Generate (Image to Prompt)

Skill para **analizar una imagen de referencia** y devolver un **prompt compacto en espanol** con todo lo necesario para recrear ese diseno visual en un generador de imagenes (Claude, Midjourney, SDXL, etc.).

La referencia detallada (vocabulario, taxonomia, ejemplos, errores comunes, flujo en mermaid) vive en [reference.md](reference.md). Cargarla solo cuando el caso lo requiera (estilo dudoso, varios elementos, iteracion fina).

---

## When to Use

- El usuario adjunta una imagen y pide **recrearla**, **clonar su estilo** o **generar un prompt**.
- Pide describir como reproducir un diseno visual existente.
- Menciona: `analizar imagen`, `image-to-prompt`, `recrear`, `copiar estilo`, `prompt desde imagen`, `como genero esto`.
- Necesita un prompt **listo para pegar** en un generador, no una descripcion narrativa larga.

No usar para:
- Generar ilustraciones de marca SwitchPay (usar `illustration-generator`).
- Editar imagenes existentes o describir contenido sin intencion de regenerarlo.

---

## Reglas duras (no negociables)

1. **Salida siempre en espanol** y siempre con **tres bloques**: `Sistema`, `Usuario`, `Negativo`.
2. **Limites estrictos de longitud**:
   - `Sistema` ≤ **30 palabras** (rol + estilo dominante).
   - `Usuario` ≤ **60 palabras** (sujeto, entorno, color, luz, composicion, tecnica).
   - `Negativo` ≤ **20 palabras** (exclusiones).
3. **Un solo estilo dominante**: no mezclar realismo + caricatura ni multiples movimientos artisticos en el mismo prompt.
4. **Priorizar Alta > Media > Baja** al elegir que entra en el prompt:
   - Alta: color dominante, sujeto, composicion.
   - Media: iluminacion, estilo, perspectiva.
   - Baja: textura, objetos secundarios, post-procesado.
5. **Incluir siempre** en `Usuario`: sujeto principal, entorno/fondo, paleta o tono dominante, calidad de luz y tecnica/estilo.
6. **Incluir siempre** en `Negativo`: al menos baja resolucion, deformaciones y texto/marcas de agua si no aparecen en la referencia.
7. **No inventar elementos** que no esten en la imagen. Si un atributo no se puede determinar, omitirlo (no escribir "no especificado" dentro del prompt).
8. **Sin emojis, sin markdown adornado, sin explicaciones**: solo los tres bloques en el formato indicado abajo.
9. **Vocabulario bilingue solo si suma**: terminos tecnicos consolidados en ingles (`bokeh`, `cyberpunk`, `golden hour`, `cinematic`) pueden quedar en ingles dentro del texto en espanol.
10. **Hex opcional**: incluir codigos hex solo si la paleta es muy especifica y cabe en el limite de palabras.

---

## Flujo de trabajo (4 pasos)

### Paso 1 — Analisis visual

Observar la imagen y extraer en orden de prioridad:

1. **Sujeto principal**: que es, pose, vestimenta, expresion.
2. **Fondo / entorno**: escenario, profundidad, elementos secundarios.
3. **Paleta**: 2-4 colores dominantes (nombrados; hex opcional).
4. **Iluminacion**: hora del dia, fuente, direccion, calidad (suave/dura), temperatura (calida/fria).
5. **Composicion**: encuadre (close-up, plano general), angulo, simetria, profundidad de campo.
6. **Estilo y tecnica**: fotografia realista, ilustracion digital, 3D, pintura, acuarela, cyberpunk, etc.
7. **Atmosfera**: dramatica, serena, melancolica, vibrante.

Si la imagen es ambigua, cargar [reference.md](reference.md) para el vocabulario completo y la taxonomia de descriptores.

### Paso 2 — Priorizacion

Descartar atributos de prioridad baja si el limite de 60 palabras aprieta. **Color, sujeto y composicion son no negociables**. Iluminacion y estilo entran salvo que sean redundantes.

### Paso 3 — Redaccion

Componer los tres bloques siguiendo la plantilla de salida. Ajustar palabras hasta cumplir los limites.

### Paso 4 — Validacion previa

Antes de devolver, verificar:

- [ ] Tres bloques presentes (`Sistema`, `Usuario`, `Negativo`).
- [ ] Conteo de palabras dentro de los limites.
- [ ] `Usuario` cubre: sujeto + entorno + color + luz + estilo.
- [ ] `Negativo` cubre al menos: baja resolucion, deformaciones, texto/marcas de agua.
- [ ] Un solo estilo dominante, sin contradicciones.
- [ ] Sin elementos inventados que no esten en la imagen.

---

## Formato de salida (obligatorio)

Devolver **exactamente** este bloque, sin texto antes ni despues (salvo el footer estandar del proyecto):

```
Sistema: "<rol y estilo dominante, ≤30 palabras>"
Usuario: "<sujeto + entorno + paleta + luz + composicion + tecnica, ≤60 palabras>"
Negativo: "<exclusiones separadas por comas, ≤20 palabras>"
```

### Ejemplo de salida

```
Sistema: "Eres un fotografo de retrato profesional especializado en luz natural cinematografica realista."
Usuario: "Retrato de mujer joven con abrigo blanco caminando en bosque nevado al amanecer. Contraluz dorado calido, fondo desenfocado en azules suaves, composicion centrada vertical. Fotografia hiperrealista, alta resolucion, enfoque nitido en rostro."
Negativo: "baja resolucion, manos deformes, texto, marca de agua, sobreexposicion, ruido digital, colores irreales."
```

---

## Errores comunes

- **Descripciones vagas** (`bonito`, `interesante`): reemplazar por adjetivos concretos (`luminoso`, `contrastado`, `desaturado`).
- **Mezclar estilos**: elegir uno dominante (no `realista y caricaturesco` a la vez).
- **Omitir negativo**: siempre incluir al menos exclusiones de calidad y deformaciones.
- **Sobrepasar limites**: recortar adjetivos redundantes antes que sacrificar sujeto o color.
- **Inventar detalles**: si no esta en la imagen, no va en el prompt.

---

## Referencia ampliada

Cargar [reference.md](reference.md) cuando:

- La imagen mezcla varios estilos y hay que decidir cual prevalece.
- Se necesita vocabulario especifico (taxonomia de descriptores, terminos bilingues).
- Se requiere iterar varias veces ajustando un solo atributo por vez.
- Hay que justificar parametros tecnicos (resolucion, aspect ratio, CFG, seed).
