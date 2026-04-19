---
name: design-system
description: 'Use when modifying UI styling/estilos, Tailwind classes, tokens, dark mode, colors, spacing, typography, shadows, z-index, motion, src/index.css, tailwind.config.ts, postcss.config.js, components.json, or shadcn configuration. Triggers: design system, visual, CSS, Tailwind, token, theme, dark, className, component styles, animation, layout styling.'
argument-hint: 'Describe el cambio visual o los archivos de styling afectados.'
---

# Design System

## When to Use

- Cambios visuales en componentes o pages.
- Ajustes de Tailwind, `className`, tokens, dark mode, motion y documentacion de tokens.
- Cambios en `src/index.css`, `tailwind.config.ts`, `postcss.config.js` o `components.json`.
- Validacion de nuevas clases de color, spacing, typography, shadows, blur o z-index.

## Procedure

1. Resuelve cada cambio visual con el sistema de tokens y clases Tailwind existentes antes de inventar nuevos valores.
2. Mantene el patron light + `dark:` explicito en cada clase que cambie por tema.
3. Si aparece un valor arbitrario repetible, conviertelo en token del sistema en lugar de hardcodearlo.
4. Si agregas o cambias tokens, consulta la file instruction [design-system.instructions.md](../../instructions/design-system.instructions.md) y actualiza `design-token.md` cuando corresponda.
5. Si el trabajo tambien afecta ubicacion de archivos o dependencias entre capas, carga la skill `infrastructure`.
6. Si el trabajo tambien afecta metadata o previews sociales, carga la skill `seo`.

## Required Output

- Componentes que consumen primitives del sistema, no valores hardcodeados.
- Dark mode resuelto con `dark:` y no con redefiniciones semanticas en `:root`.
- Configuracion de Tailwind y shadcn consistente con `src/index.css`.

## Instruction

- [Design system instruction](../../instructions/design-system.instructions.md)