---
name: infrastructure
description: "Definir, ubicar y mantener cada pieza del proyecto. Cubre app shell, routing, pages, layouts, features (screaming architecture), componentes reutilizables, hooks, helpers, stores Zustand, entidades, interfaces, naming, cabeceras //* y regiones del DOM. Usar cuando el trabajo toque src/**, estructura de archivos, arquitectura o decisiones de ubicacion."
---

# Infrastructure

## When to Use

- Cambios en `src/**`.
- Decisiones sobre donde crear, mover o reutilizar archivos y carpetas.
- Refactors de app shell, routing, pages, layouts, features, stores, hooks, helpers, fragments y componentes compartidos.
- Validacion de cabeceras `//*` y comentarios de regiones del DOM.

## Procedure

1. Determinar primero la capa correcta: shell, page, layout, feature, shared component, hook, helper, data, store o service.
2. Mantener la direccion de dependencias segun la arquitectura del proyecto y evitar acoplamiento entre features.
3. Preservar naming, ubicacion de archivos, convenciones de export y reglas de documentacion inline.
4. Si el cambio crea o mueve archivos bajo `src/**`, consultar [reference.md](reference.md).
5. Si el trabajo tambien cambia estilos o tokens visuales, cargar la skill `design-system`.
6. Si el trabajo tambien cambia metadata o assets publicos SEO, cargar la skill `seo`.

## Required Output

- Cambios alineados con la screaming architecture existente.
- Rutas y providers centralizados en `src/App.tsx` cuando corresponda.
- Componentes, stores y helpers ubicados en la capa correcta sin crear convenciones paralelas.

## Reference

Para reglas de bootstrap, routing, pages, layouts, features, componentes, hooks, helpers, stores, entidades, interfaces, naming, dependencias y documentacion inline, consultar [reference.md](references/reference.md).
