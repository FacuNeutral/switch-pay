---
name: "Project Guidelines"
description: "These rules apply to any prompt in this workspace. They define when to activate each skill and the global conventions for structure, UI and SEO. Always follow these guidelines in addition to the specific instructions of each skill."
applyTo: "**"
---

# Project Guidelines

Estas reglas aplican a cualquier prompt en este workspace.

## Skill Activation

- Antes de responder, proponer cambios o editar archivos, identifica que skill aplica y cargala.
- Si el trabajo toca varias areas, carga todas las skills relevantes antes de continuar.
- Las reglas detalladas de cada area viven en `.github/instructions/*.instructions.md`; usa la skill y su instruction correspondiente como una sola fuente de criterio.
- No inventes convenciones paralelas cuando una skill ya define la regla del proyecto.

### Response Format

Usa siempre la instruction `response-format` como formato obligatorio de respuesta para todo el workspace.

- Archivo: `.github/instructions/response-format.instructions.md`.
- Define tono, avisos de progreso durante trabajo complejo, y el cierre obligatorio con preguntas de validacion y seccion `Tasks`.
- Aplica a cualquier area, no solo a `client/`.

### Role

Usa la instruction `role` como criterio de perspectiva de frontend y diseno solo cuando el trabajo toque archivos dentro de `client/`.

- Archivo: `.github/instructions/role.instructions.md`.
- Define la perspectiva de ingenieria frontend, prioridades de UI/UX y criterio para tradeoffs visuales.
- No aplica fuera de `client/`.

### Infrastructure

Usa la skill `infrastructure` siempre que el trabajo toque la estructura de `client/src/**` o decisiones de arquitectura, incluyendo:

- `client/src/App.tsx`, `client/src/main.tsx`, routes, pages y layouts.
- `client/src/application/**`, `client/src/components/**`, `client/src/hooks/**`, `client/src/helpers/**`, `client/src/lib/**`, `client/src/data/**`.
- `client/src/zustand/**`, contexts, services, naming, ubicacion de archivos y dependencias entre capas.
- Cabeceras `//* @type`, `//* @context`, `//* @utility` y comentarios de regiones del DOM.

### Design System

Usa la skill `design-system` siempre que el trabajo toque el sistema visual, incluyendo:

- Clases de Tailwind, `className`, estilos, colores, spacing, tipografia, motion, z-index y dark mode.
- `client/src/index.css`, `client/tailwind.config.ts`, `client/postcss.config.js`, `client/components.json` y documentacion de tokens.
- Tokens, utilidades generadas por `@theme inline`, configuracion de shadcn y consumo visual de componentes.

### SEO

Usa la skill `seo` siempre que el trabajo toque SEO o metadata, incluyendo:

- `client/index.html`, `<head>`, title, description, canonical, robots, Open Graph y Twitter cards.
- Assets publicos de SEO como `og-cover`, `favicon` y `apple-touch-icon`.
- Metadata por ruta, previews sociales, structured data y documentacion SEO.

### Commits

Usa la skill `commits` siempre que el trabajo toque creacion, revision o asistencia de commits, incluyendo:

- Mensajes de commit, formato convencional, tipos (`feat`, `fix`, `refactor`, etc.).
- Flujo guiado de commit (`git status` → `git add` → `git commit` → `git push`).
- Deteccion de tipo y scope a partir de cambios en el workspace.
- Validacion de formato, multi-type strategy y buenas practicas de historial.

- Archivo: `.github/instructions/commits.instructions.md`.

## Global Rules

- Mantene los cambios minimos y alineados con la arquitectura y el sistema visual existentes.
- Si una tarea mezcla estructura, UI y SEO, combina las skills en lugar de elegir solo una.
- Si no hay una skill especifica para la tarea, igual respeta esta instruccion global y las convenciones ya presentes en el repo.