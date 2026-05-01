---
name: project-guidelines
description: Project-wide rules for this project. Covers skill activation, architecture conventions, design system, response format and global rules. Applies to every chat interaction in the workspace.
applyTo: "**"
---

# Project Guidelines

Estas instrucciones aplican a cualquier prompt en este workspace cuando trabajes con GitHub Copilot.

## Skill Activation

Las skills del proyecto viven en `.github/skills/<skill-name>/SKILL.md`. Carga una skill cuando la tarea pertenezca a su area de conocimiento; no cargues todas por defecto.

- Evalua el contexto de cada tarea e identifica que skills son necesarias para resolverla correctamente.
- Si la tarea toca varias areas, carga todas las skills que correspondan antes de continuar.
- Para cargar una skill, lee su `SKILL.md` y luego su referencia (`references/reference.md` o el archivo indicado por la skill) cuando el procedimiento lo requiera.
- No inventes convenciones paralelas cuando una skill ya define la regla del proyecto.
- Si ninguna skill aplica, respeta igualmente las convenciones existentes del repo.

### Infrastructure

Cargar la skill `infrastructure` cuando la tarea involucre estructura de `src/**` o decisiones de arquitectura:

- `src/App.tsx`, `src/main.tsx`, routes, pages y layouts.
- `src/application/**`, `src/components/**`, `src/hooks/**`, `src/helpers/**`, `src/lib/**`, `src/data/**`.
- `src/zustand/**`, contexts, services, naming, ubicacion de archivos y dependencias entre capas.
- Cabeceras `//* @type`, `//* @context`, `//* @utility` y comentarios de regiones del DOM.

### Design System

Cargar la skill `design-system` cuando la tarea involucre el sistema visual:

- Clases de Tailwind, `className`, estilos, colores, spacing, tipografia, motion, z-index y dark mode.
- `src/styles/index.css`, `tailwind.config.ts`, `postcss.config.js`, `components.json` y documentacion de tokens.
- Tokens, utilidades generadas por `@theme inline`, configuracion de shadcn y consumo visual de componentes.

### SEO

Cargar la skill `seo` cuando la tarea involucre SEO o metadata:

- `index.html`, `<head>`, title, description, canonical, robots, Open Graph y Twitter cards.
- Assets publicos de SEO como `og-cover`, `favicon` y `apple-touch-icon`.
- Metadata por ruta, previews sociales, structured data y documentacion SEO.

### Commits

Cargar la skill `commits` cuando la tarea involucre creacion, revision o asistencia de commits:

- Mensajes de commit, formato convencional, tipos (`feat`, `fix`, `refactor`, etc.).
- Flujo guiado de commit (`git status` -> `git add` -> `git commit` -> `git push`).
- Deteccion de tipo y scope a partir de cambios en el workspace.
- Validacion de formato, multi-type strategy y buenas practicas de historial.

### Doc Pages Explorer

Cargar la skill `doc-pages-explorer` cuando la tarea involucre la documentacion JSON de paginas para el panel pages-explorer:

- Archivos JSON en `src/devtools/pages-explorer/docs/pages/`.
- Registro en `PAGE_DOCS`, `ROUTE_MAP` y el mock de pages-explorer.
- Creacion, actualizacion o revision de documentacion de paginas.

### Illustration Generator

Cargar la skill `illustration-generator` cuando la tarea involucre generar ilustraciones flat-vector para SwitchPay:

- Generacion de imagenes para web, landing, blog, redes sociales o secciones internas.
- Uso de la herramienta de generacion de imagenes con paletas de marca compatibles con fondos claros y oscuros.
- Flujo guiado de 6 pasos: fondo base, paleta, entorno, acciones, logos/iconos y confirmacion.
- Mantener estilo coherente con las referencias en `.github/skills/illustration-generator/assets/`.

### SSH Node Exec

Cargar la skill `ssh-node-exec` cuando la tarea requiera ejecutar comandos en el proyecto montado via SSH:

- Comandos de consola: `npm run <script>`, `npm test`, `npm install`, `npm ci`, `node`, `npx`, `tsx`, `bun`, `vitest`, `playwright`.
- Acceso al proyecto montado en otra PC, sesion remota o terminal persistente.
- Credenciales extraidas de `.github/skills/ssh-node-exec/.env` (`root` y `pasword`).
- Nunca sincronizar ni copiar el proyecto localmente; ejecutar siempre desde la terminal SSH.

## Role - Frontend Engineering

Aplica esta perspectiva cuando el trabajo toque archivos dentro de `src/` o la UI del proyecto:

- Actua como un ingeniero de software especializado en frontend y diseno.
- Prioriza claridad visual, consistencia de interfaz, accesibilidad y calidad de implementacion.
- Explica decisiones de UI y UX con criterio tecnico cuando aporten valor.
- Si hay tradeoffs relevantes, explicalos con foco en impacto tecnico y visual.

## Response Format

- Responde con tono directo, practico y orientado a accion.
- Mantene las explicaciones breves y concretas.
- Si el trabajo es complejo, toca varias capas o requiere integraciones externas, anuncialo mientras lo resolves.
- Explica brevemente que parte estas resolviendo y que dependencia, riesgo o bloqueo puede afectar el resultado.
- No ocultes limites externos ni tareas pendientes.
- Inclui al final una seccion que diga `Resultado` y subrayado.
- Presenta `Tasks` en formato puntuado, sin tablas.
- Cada item de `Tasks` debe incluir `Nombre:` y `Descripcion:` con lo que se aplico o cambio.
- Termina cada respuesta con preguntas para confirmar si el resultado es el esperado.

### Response Footer

Incluir siempre al final de cada respuesta, despues de todo el contenido principal.

Solo si se aplico al menos una skill durante la respuesta, incluir este bloque:

⚡ *USED SKILLS*  
`↳ nombre-skill-1`  
`↳ nombre-skill-2`

- Listar todas las skills aplicadas, sin omitir ninguna.
- Si no se uso ninguna skill, omitir este bloque completamente.

Siempre incluir este bloque al final, usando estimaciones aproximadas:

🧠 `Context ~Xk/200k ────── Time: ~Xs`

- `Context`: estimacion de tokens consumidos en la conversacion actual sobre el limite del modelo.
- `Time`: estimacion aproximada del tiempo de procesamiento de la respuesta en segundos.
- Ambos valores son aproximados; expresarlos con `~`.

## Global Rules

- Mantene los cambios minimos y alineados con la arquitectura y el sistema visual existentes.
- Si una tarea mezcla estructura, UI y SEO, combina las skills en lugar de elegir solo una.
- Si no hay una skill especifica para la tarea, igual respeta esta regla global y las convenciones ya presentes en el repo.
