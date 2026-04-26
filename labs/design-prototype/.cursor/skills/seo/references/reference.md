# SEO — Reference

Reglas para cambios de metadata y assets SEO del proyecto.

## Marca y dominio

- Usa la marca, el dominio canonico y el copy definidos por la referencia SEO vigente del proyecto.
- Si no existe una referencia SEO explicita, conserva los valores ya presentes en el codigo en lugar de inventar branding o dominio nuevos.
- Todo cambio de branding debe reflejarse en metadata basica y social.

## Metadata basica

- Mantene alineados `<title>`, `description`, `author`, `keywords`, `robots` y `canonical`.
- `canonical` debe coincidir con la URL oficial de la pagina segun la referencia SEO vigente del proyecto.
- `robots` solo cambia si existe una razon explicita para bloquear indexacion o crawling.

## Open Graph

- Mantene consistencia entre `og:title`, `og:description`, `og:type`, `og:url`, `og:site_name`, `og:locale`, `og:image` y sus metadatos asociados.
- `og:url` debe coincidir con la canonica.
- `og:image` debe ser una URL absoluta y publica.
- La imagen social recomendada es `1200x630`.

## Assets publicos

- Los assets SEO viven en `public/`.
- Assets esperados: `og-cover.png`, `favicon.ico` y `apple-touch-icon.png`.
- Si renombras un asset, actualiza todas sus referencias del `<head>`.

## Metadata por ruta

- Si aparecen rutas dinamicas, no dependas solo de metadata global.
- Define metadata por pagina con SSR, prerendering o una estrategia equivalente.
- El `title`, la `description` y las social cards deben reflejar el contenido real de la ruta.
