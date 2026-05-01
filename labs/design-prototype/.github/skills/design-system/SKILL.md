---
name: design-system
description: "Consumir, extender y mantener el sistema visual del proyecto. Cubre tokens, Tailwind, dark mode, colores, spacing, tipografia, motion, z-index, sombras, gradientes y configuracion de shadcn. Usar cuando el trabajo toque className, estilos, index.css, tailwind.config.ts, postcss.config.js, components.json o cualquier cambio visual."
---

# Design System

## When to Use

- Cambios visuales en componentes o pages.
- Ajustes de Tailwind, `className`, tokens, dark mode, motion y documentacion de tokens.
- Cambios en `src/styles/index.css`, `tailwind.config.ts`, `postcss.config.js` o `components.json`.
- Validacion de clases de color, spacing, typography, shadows, blur o z-index.

## Procedure

1. Resolver cada cambio visual con el sistema de tokens y clases Tailwind existentes antes de inventar nuevos valores.
2. Mantener el patron light + `dark:` explicito en cada clase que cambie por tema.
3. Si aparece un valor arbitrario repetible, convertirlo en token del sistema.
4. Si se agregan o cambian tokens, consultar [reference.md](reference.md) y actualizar `docs/markdown/design-tokens.md` cuando corresponda.
5. Si el trabajo tambien afecta ubicacion de archivos o dependencias entre capas, cargar la skill `infrastructure`.
6. Si el trabajo tambien afecta metadata o previews sociales, cargar la skill `seo`.

## Checklist

Antes de dar por terminado un cambio visual:

- [ ] Colores provienen de los tokens de la paleta, no de valores hardcodeados ni la paleta default de Tailwind.
- [ ] Cada clase de color tiene su par `dark:` correspondiente (salvo feedback invariante).
- [ ] No se introdujeron valores arbitrarios con brackets que puedan ser tokens.
- [ ] Las transiciones especifican la propiedad exacta, no `transition-all`.
- [ ] Los z-index usan tokens del sistema.
- [ ] Los nuevos tokens estan en `src/styles/index.css` dentro de `@theme inline` y documentados en `docs/markdown/design-tokens.md`.

## Required Output

- Componentes que consumen primitives del sistema, no valores hardcodeados.
- Dark mode resuelto con `dark:` y no con redefiniciones semanticas en `:root`.
- Configuracion de Tailwind y shadcn consistente con `src/styles/index.css`.

## Reference

Para arquitectura de tokens, paleta de color, dark mode, tipografia, spacing, motion, gradientes, z-index, anti-patrones y reglas de configuracion, consultar [reference.md](references/reference.md).
