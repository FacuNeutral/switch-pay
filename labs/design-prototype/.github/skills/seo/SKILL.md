---
name: seo
description: "Mantener metadata, Open Graph, Twitter cards, assets publicos y SEO del proyecto. Usar cuando el trabajo toque index.html, head, title, description, canonical, robots, og:image, favicon, social previews, metadata por ruta o assets publicos de SEO."
---

# SEO

## When to Use

- Cambios en `index.html` o cualquier metadata del `<head>`.
- Ajustes de title, description, canonical, robots, Open Graph, Twitter cards o assets publicos SEO.
- Trabajo sobre previews sociales, favicons, `og-cover`, metadata por ruta o documentacion SEO.

## Procedure

1. Mantener consistencia entre la referencia SEO vigente del proyecto, la metadata basica y la metadata social.
2. Si cambian copy o branding, actualizar en conjunto `title`, `description`, `canonical`, Open Graph y Twitter.
3. Si se agregan o renombran assets de SEO, validar rutas publicas, dimensiones esperadas y alt text.
4. Si aparecen rutas dinamicas, definir la estrategia de metadata por pagina en lugar de dejar solo metadata global.
5. Consultar [reference.md](reference.md) para reglas detalladas de marca, dominio, metadata y assets.
6. Si el trabajo tambien cambia estructura de pages o layouts, cargar la skill `infrastructure`.
7. Si el trabajo tambien cambia la pieza visual del asset o del branding, cargar la skill `design-system`.

## Checklist

- [ ] Metadata basica y Open Graph siguen la misma referencia de marca, dominio y tono del proyecto.
- [ ] Las imagenes sociales usan URL absoluta y dimensiones correctas.
- [ ] Los assets publicos existen o el cambio deja claro que aun estan pendientes.
- [ ] Si el trabajo tambien toca pages, layouts o estructura de rutas, se combino con `infrastructure`.
- [ ] Si el trabajo tambien toca branding visual o assets graficos, se combino con `design-system`.

## Required Output

- Metadata consistente entre buscadores y redes sociales.
- Dominio, imagenes y textos alineados con la referencia SEO vigente del proyecto.
- Cambios preparados para escalar a metadata dinamica si el routing lo requiere.

## Reference

Para reglas de marca, metadata basica, Open Graph, assets publicos y metadata por ruta, consultar [reference.md](references/reference.md).
