---
name: doc-pages-explorer
description: 'Use when creating, updating, or reviewing page documentation JSON files consumed by the pages-explorer detail panel. Covers the JSON schema, field rules, and integration with the pages-explorer store. Triggers: page doc, page documentation, pages-explorer, detail panel, doc/pages, PageDoc, page JSON, route documentation, page sections, page processes.'
argument-hint: 'Indica la página o ruta para la que necesitas crear o actualizar la documentación.'
---

# Pages Explorer — Documentation

Skill para crear y mantener los archivos JSON de documentación de páginas que consume la integración pages-explorer.

## When to Use

- Crear un archivo JSON de documentación para una página nueva.
- Actualizar la documentación de una página existente (nueva sección, cambio de ruta, nuevo store, etc.).
- Revisar que un archivo de documentación cumpla el schema y sea coherente con la implementación real de la página.
- Agregar una nueva ruta al `ROUTE_MAP` y al `PAGE_DOCS` registry.

## Context

Pages-explorer es una herramienta de desarrollo integrada que permite previsualizar todas las páginas de la app con simulación de viewport, navegación de rutas y panel de detalle. El panel de detalle consume archivos JSON ubicados en `client/src/devtools/pages-explorer/docs/pages/` para mostrar:

- **Description tab**: Metadata de la página (título, ruta, layout, descripción, parámetros, stores, procesos).
- **Structure tab**: Mapa de componentes y árbol de render visual.

### Arquitectura del flujo de documentación

```
devtools/pages-explorer/docs/pages/{page}.json → pages-explorer.mock.ts (PAGE_DOCS) → DebugDetailPanel.tsx
```

1. Cada página tiene un archivo `{page-id}.json` en `client/src/devtools/pages-explorer/docs/pages/`.
2. El mock (`pages-explorer.mock.ts`) importa cada JSON y lo expone en el array `PAGE_DOCS`.
3. El componente `DebugDetailPanel` consulta `PAGE_DOCS` para matchear la ruta activa y renderea la info.

### Archivos clave

| Archivo | Propósito |
|---|---|
| `client/src/devtools/pages-explorer/docs/pages/{page}.json` | Documentación de cada página |
| `client/src/devtools/pages-explorer/store/pages-explorer.mock.ts` | Importa los JSON y los expone en `PAGE_DOCS` y `ROUTE_MAP` |
| `client/src/devtools/pages-explorer/components/DebugDetailPanel.tsx` | Consume `PAGE_DOCS` para renderear description y structure |

---

## JSON Schema

Cada archivo en `devtools/pages-explorer/docs/pages/` debe seguir esta estructura exacta:

```json
{
  "id": "string",
  "title": "string",
  "route": "string",
  "layout": "string",
  "description": "string",
  "params": [],
  "queryParams": [],
  "sections": [],
  "stores": [],
  "processes": []
}
```

### Campos

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `id` | `string` | Sí | Identificador único de la página. Coincide con el nombre del archivo sin extensión. Ej: `"home"`, `"watch"`, `"not-found"`. |
| `title` | `string` | Sí | Nombre legible de la página. Se usa como heading en el panel de detalle. Ej: `"Home"`, `"Watch"`, `"Not Found (404)"`. |
| `route` | `string` | Sí | Ruta del router. Puede incluir params (`:id`) o wildcard (`*`). Ej: `"/"`, `"/watch/:id"`, `"*"`. |
| `layout` | `string` | Sí | Layout que envuelve la página. `"MainLayout"` para rutas con shell compartido, `"standalone"` para páginas sin layout. |
| `description` | `string` | Sí | Descripción concisa de qué hace la página. 1-3 oraciones. Incluir las piezas visuales principales y el comportamiento clave. |
| `params` | `PageParam[]` | Sí | Parámetros de ruta (`:param`). Array vacío si no tiene. |
| `queryParams` | `PageParam[]` | Sí | Query params (`?key=value`). Array vacío si no tiene. |
| `sections` | `PageSection[]` | Sí | Componentes principales que componen la página. Cada sección es un bloque visual significativo. |
| `stores` | `string[]` | Sí | Nombres de los stores de Zustand que la página consume. Array vacío si no usa stores. |
| `processes` | `string[]` | Sí | Lista ordenada de pasos que describen el flujo de datos y comportamiento. Cada ítem es una oración directa. |

### `PageParam`

```json
{
  "name": "string",
  "type": "string",
  "example": "string",
  "description": "string"
}
```

| Campo | Descripción |
|---|---|
| `name` | Nombre del parámetro sin `:` ni `?`. Ej: `"id"`, `"q"`. |
| `type` | Tipo del valor. Generalmente `"string"`. |
| `example` | Valor de ejemplo para testing. Ej: `"vid-001"`, `"music"`. |
| `description` | Qué representa el parámetro. Ej: `"ID del video a reproducir"`. |

### `PageSection`

```json
{
  "name": "string",
  "component": "string",
  "path": "string | null",
  "description": "string"
}
```

| Campo | Descripción |
|---|---|
| `name` | Nombre legible de la sección. Describe el bloque visual. Ej: `"Video Player"`, `"Login Form"`. |
| `component` | Nombre del componente React. Si la UI es inline (sin componente externo), usar `"inline"`. |
| `path` | Path de import con alias `@/`. `null` si el componente es inline. Ej: `"@/application/videos/components/VideoPlayer"`. |
| `description` | Qué hace la sección, cómo se comporta y qué variantes tiene. 1-2 oraciones. |

---

## Procedure

### Crear documentación para una nueva página

1. **Leer la implementación de la página** en `client/src/pages/{Page}Page.tsx`:
   - Identificar qué componentes importa y renderiza (→ `sections`).
   - Identificar qué stores consume con `useXxxStore` (→ `stores`).
   - Identificar qué params de ruta lee con `useParams` (→ `params`).
   - Identificar qué query params lee con `useSearchParams` (→ `queryParams`).
   - Identificar la ruta asociada en `App.tsx` (→ `route`).
   - Determinar si usa `MainLayout` o es standalone (→ `layout`).

2. **Analizar los componentes de la página** para describir cada sección:
   - Leer el archivo de cada componente principal.
   - Describir su aspecto visual y comportamiento clave.
   - Anotar el path de import.

3. **Describir los procesos** en orden de ejecución:
   - Flujo de montaje: qué se ejecuta al cargar la página.
   - Interacciones: qué ocurre cuando el usuario actúa.
   - Estados derivados: cómo cambia la UI según el estado.

4. **Crear el archivo JSON** en `client/src/devtools/pages-explorer/docs/pages/{id}.json` siguiendo el schema.

5. **Registrar en el mock**:
   - Importar el nuevo JSON en `client/src/devtools/pages-explorer/store/pages-explorer.mock.ts`.
   - Agregarlo al array `PAGE_DOCS`.

6. **Registrar en el ROUTE_MAP** (si es una ruta nueva):
   - Agregar una entrada en el array `ROUTE_MAP` con `path`, `label`, `navigateTo` (con ejemplo concreto), `nested` y `layout`.

### Actualizar documentación existente

1. **Leer el JSON existente** en `client/src/devtools/pages-explorer/docs/pages/{id}.json`.
2. **Comparar con la implementación actual** de la página y sus componentes.
3. **Actualizar solo los campos que cambiaron**: nuevas secciones, nuevos stores, procesos modificados, etc.
4. **No cambiar el `id`** — es el identificador estable del archivo.

### Revisar documentación

1. Verificar que cada `section.component` corresponde a un componente real importado por la página.
2. Verificar que cada `section.path` es un path de import válido con alias `@/`.
3. Verificar que los `stores` listados se usan realmente en la página o sus componentes directos.
4. Verificar que los `processes` reflejan el flujo actual, no uno obsoleto.
5. Verificar que `route` y `layout` coinciden con la definición en `App.tsx`.

---

## Reglas

- Cada página tiene exactamente un archivo JSON. No agrupar múltiples páginas en un archivo.
- El nombre del archivo es `{id}.json` donde `id` coincide con el campo `id` del JSON.
- Los `processes` se escriben como oraciones directas en tercera persona: `"Lee categorías desde useVideosStore."`, no `"La página lee..."`.
- Las `sections` solo incluyen componentes de primer nivel que la página renderiza directamente. No listar sub-componentes internos de un organismo.
- Si una sección es UI inline sin componente externo, usar `"component": "inline"` y `"path": null`.
- Los `stores` solo listan los que la página o sus secciones directas consumen. No profundizar en stores de sub-componentes internos.
- La `description` del JSON describe la página completa, no un componente suelto.
- Los `params` y `queryParams` solo incluyen los que la página lee explícitamente, no params heredados de layouts.

## Ejemplo de referencia

```json
{
  "id": "watch",
  "title": "Watch",
  "route": "/watch/:id",
  "layout": "MainLayout",
  "description": "Página de reproducción de video. Muestra el player, acciones (like, suscribirse), descripción y videos relacionados en sidebar.",
  "params": [
    { "name": "id", "type": "string", "example": "vid-001", "description": "ID del video a reproducir" }
  ],
  "queryParams": [],
  "sections": [
    {
      "name": "Video Player",
      "component": "VideoPlayer",
      "path": "@/application/videos/components/VideoPlayer",
      "description": "Reproductor con thumbnail en aspect-video, botón de play superpuesto y barra de progreso estática."
    },
    {
      "name": "Video Actions",
      "component": "VideoActions",
      "path": "@/application/videos/components/VideoActions",
      "description": "Info del canal (avatar, nombre, suscriptores), botón suscribirse, likes/dislikes, compartir y más opciones."
    },
    {
      "name": "Video Description",
      "component": "VideoDescription",
      "path": "@/application/videos/components/VideoDescription",
      "description": "Metadata del video (vistas, fecha) y texto de descripción completa."
    },
    {
      "name": "Related Videos",
      "component": "RelatedVideos",
      "path": "@/application/videos/components/RelatedVideos",
      "description": "Sidebar lateral (w-96 en desktop) con lista de VideoCard en layout lista."
    }
  ],
  "stores": ["useVideosStore"],
  "processes": [
    "Extrae :id de la URL via useParams.",
    "Ejecuta setCurrentVideo(id) al montar y cuando cambia el ID.",
    "Si no encuentra el video, muestra estado de error.",
    "Videos relacionados se cargan automáticamente desde el store."
  ]
}
```

## Anti-patrones

| Anti-patrón | Por qué evitarlo |
|---|---|
| Listar sub-componentes internos de un organismo como secciones | Las secciones son los bloques de primer nivel que la página compone directamente |
| Omitir `params` o `queryParams` cuando la página los lee | El panel de detalle no puede mostrar la info si falta |
| `"path": "@/components/ui/Button"` en una sección | Los atoms no se listan como secciones — solo organismos o bloques significativos |
| Describir processes como pasos de UX | Los processes describen flujo de datos, no acciones del usuario |
| JSON sin registrar en `PAGE_DOCS` ni `ROUTE_MAP` | El panel de detalle no encuentra el doc si no está registrado |
| `id` diferente al nombre del archivo | Convención rota que dificulta el matching |

## Checklist

Antes de dar por terminada la documentación de una página, verificar:

- [ ] El `id` coincide con el nombre del archivo (`{id}.json`).
- [ ] La `route` coincide con la definición en `App.tsx`.
- [ ] El `layout` es correcto (`MainLayout` o `standalone`).
- [ ] Todas las `sections` corresponden a componentes reales con paths válidos.
- [ ] Los `stores` reflejan los que la página realmente consume.
- [ ] Los `processes` están ordenados por flujo de ejecución.
- [ ] Los `params` y `queryParams` están documentados si la página los lee.
- [ ] El JSON está importado en `pages-explorer.mock.ts` dentro de `PAGE_DOCS`.
- [ ] Si es una ruta nueva, está registrada en `ROUTE_MAP`.
