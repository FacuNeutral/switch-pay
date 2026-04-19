---
name: seo
description: 'Use when modifying SEO/metadata, index.html head, title, description, canonical URL, robots, Open Graph, Twitter cards, social preview assets, favicons, og-cover images, or route-level metadata. Triggers: SEO, meta tags, canonical, og:image, twitter card, robots, favicon, social preview, metadata, index.html.'
argument-hint: 'Describe el cambio SEO, metadata o asset publico afectado.'
---

# SEO

## When to Use

- Cambios en `index.html` o cualquier metadata del `<head>`.
- Ajustes de title, description, canonical, robots, Open Graph, Twitter cards o assets publicos SEO.
- Trabajo sobre previews sociales, favicons, `og-cover`, metadata por ruta o documentacion SEO.

## Procedure

1. Mantene consistencia entre la referencia SEO vigente del proyecto, la metadata basica y la metadata social.
2. Si cambias copy o branding, actualiza en conjunto `title`, `description`, `canonical`, Open Graph y Twitter.
3. Si agregas o renombras assets de SEO, valida rutas publicas, dimensiones esperadas y alt text.
4. Si aparecen rutas dinamicas, define la estrategia de metadata por pagina en lugar de dejar solo metadata global.
5. Consulta la file instruction [seo.instructions.md](../../instructions/seo.instructions.md) y usa la referencia SEO vigente del proyecto como fuente de verdad para marca, dominio y copy.
6. Si el trabajo tambien cambia estructura de pages o layouts, carga la skill `infrastructure`.
7. Si el trabajo tambien cambia la pieza visual del asset o del branding, carga la skill `design-system`.

## Required Output

- Metadata consistente entre buscadores y redes sociales.
- Dominio, imagenes y textos alineados con la referencia SEO vigente del proyecto.
- Cambios preparados para escalar a metadata dinamica si el routing lo requiere.

## Instruction

- [SEO instruction](../../instructions/seo.instructions.md)