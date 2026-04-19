---
name: infrastructure
description: 'Use when modifying src structure/estructura, app shell, routing/rutas, pages, layouts, feature folders, reusable components, hooks, helpers, Zustand stores, file placement, naming, headers, or DOM region comments. Triggers: src, structure, architecture, routing, page, layout, component, feature, store, hook, helper, context, folder, screaming architecture.'
argument-hint: 'Describe el cambio estructural o los archivos afectados.'
---

# Infrastructure

## When to Use

- Cambios en `src/**`.
- Decisiones sobre donde crear, mover o reutilizar archivos y carpetas.
- Refactors de app shell, routing, pages, layouts, features, stores, hooks, helpers, fragments y componentes compartidos.
- Validacion de cabeceras `//*` y comentarios de regiones del DOM.

## Procedure

1. Determina primero la capa correcta: shell, page, layout, feature, shared component, hook, helper, data, store o service.
2. Mantene la direccion de dependencias segun la arquitectura del proyecto y evita acoplamiento entre features.
3. Preserva naming, ubicacion de archivos, convenciones de export y reglas de documentacion inline.
4. Si el cambio crea o mueve archivos bajo `src/**`, consulta la file instruction [infrastructure.instructions.md](../../instructions/infrastructure.instructions.md).
5. Si el trabajo tambien cambia estilos o tokens visuales, carga la skill `design-system`.
6. Si el trabajo tambien cambia metadata o assets publicos SEO, carga la skill `seo`.

## Required Output

- Cambios alineados con la screaming architecture existente.
- Rutas y providers centralizados en `src/App.tsx` cuando corresponda.
- Componentes, stores y helpers ubicados en la capa correcta sin crear convenciones paralelas.

## Instruction

- [Infrastructure instruction](../../instructions/infrastructure.instructions.md)