---
name: doc-pages-explorer
description: "Crear, actualizar y revisar archivos JSON de documentacion de paginas para el panel pages-explorer. Cubre schema JSON, campos, registro en PAGE_DOCS y ROUTE_MAP, e integracion con el store. Usar cuando el trabajo toque page doc, pages-explorer, detail panel, doc/pages, PageDoc, page JSON o documentacion de rutas."
---

# Pages Explorer — Documentation

Skill para crear y mantener los archivos JSON de documentacion de paginas que consume la integracion pages-explorer.

## When to Use

- Crear un archivo JSON de documentacion para una pagina nueva.
- Actualizar la documentacion de una pagina existente.
- Revisar que un archivo de documentacion cumpla el schema y sea coherente con la implementacion real.
- Agregar una nueva ruta al `ROUTE_MAP` y al `PAGE_DOCS` registry.

## Context

Pages-explorer es una herramienta de desarrollo integrada que permite previsualizar todas las paginas de la app con simulacion de viewport, navegacion de rutas y panel de detalle. El panel de detalle consume archivos JSON ubicados en `client/src/devtools/pages-explorer/docs/pages/`.

### Arquitectura del flujo

```
devtools/pages-explorer/docs/pages/{page}.json → pages-explorer.mock.ts (PAGE_DOCS) → DebugDetailPanel.tsx
```

### Archivos clave

| Archivo | Proposito |
|---|---|
| `client/src/devtools/pages-explorer/docs/pages/{page}.json` | Documentacion de cada pagina |
| `client/src/devtools/pages-explorer/store/pages-explorer.mock.ts` | Importa los JSON y los expone en `PAGE_DOCS` y `ROUTE_MAP` |
| `client/src/devtools/pages-explorer/components/DebugDetailPanel.tsx` | Consume `PAGE_DOCS` para renderear description y structure |

---

## JSON Schema

Cada archivo en `devtools/pages-explorer/docs/pages/` debe seguir esta estructura:

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

| Campo | Tipo | Requerido | Descripcion |
|---|---|---|---|
| `id` | `string` | Si | Identificador unico. Coincide con el nombre del archivo sin extension. |
| `title` | `string` | Si | Nombre legible de la pagina. |
| `route` | `string` | Si | Ruta del router. Puede incluir params (`:id`) o wildcard (`*`). |
| `layout` | `string` | Si | `"MainLayout"` para rutas con shell compartido, `"standalone"` para sin layout. |
| `description` | `string` | Si | Descripcion concisa. 1-3 oraciones. |
| `params` | `PageParam[]` | Si | Parametros de ruta. Array vacio si no tiene. |
| `queryParams` | `PageParam[]` | Si | Query params. Array vacio si no tiene. |
| `sections` | `PageSection[]` | Si | Componentes principales que componen la pagina. |
| `stores` | `string[]` | Si | Stores de Zustand que la pagina consume. Array vacio si no usa. |
| `processes` | `string[]` | Si | Pasos ordenados del flujo de datos y comportamiento. |

### `PageParam`

```json
{ "name": "string", "type": "string", "example": "string", "description": "string" }
```

### `PageSection`

```json
{ "name": "string", "component": "string", "path": "string | null", "description": "string" }
```

- `path` usa alias `@/`. `null` si el componente es inline.

---

## Procedure

### Crear documentacion para una nueva pagina

1. **Leer la implementacion** en `client/src/pages/{Page}Page.tsx`: componentes, stores, params, ruta, layout.
2. **Analizar los componentes** de primer nivel para describir cada seccion.
3. **Describir los procesos** en orden de ejecucion: montaje, interacciones, estados derivados.
4. **Crear el archivo JSON** en `client/src/devtools/pages-explorer/docs/pages/{id}.json`.
5. **Registrar en el mock**: importar en `pages-explorer.mock.ts` y agregar a `PAGE_DOCS`.
6. **Registrar en ROUTE_MAP** si es ruta nueva.

### Actualizar documentacion existente

1. Leer el JSON existente.
2. Comparar con la implementacion actual.
3. Actualizar solo los campos que cambiaron. No cambiar el `id`.

### Revisar documentacion

1. Verificar que cada `section.component` corresponde a un componente real.
2. Verificar paths de import validos con alias `@/`.
3. Verificar que los `stores` listados se usan realmente.
4. Verificar que los `processes` reflejan el flujo actual.
5. Verificar que `route` y `layout` coinciden con `App.tsx`.

---

## Reglas

- Cada pagina tiene exactamente un archivo JSON. No agrupar multiples paginas.
- El nombre del archivo es `{id}.json` donde `id` coincide con el campo `id` del JSON.
- Los `processes` se escriben en tercera persona: `"Lee categorias desde useVideosStore."`.
- Las `sections` solo incluyen componentes de primer nivel, no sub-componentes internos.
- Si una seccion es UI inline, usar `"component": "inline"` y `"path": null`.
- Los `stores` solo listan los que la pagina o sus secciones directas consumen.

## Anti-patrones

| Anti-patron | Por que evitarlo |
|---|---|
| Listar sub-componentes internos como secciones | Las secciones son bloques de primer nivel |
| Omitir `params` o `queryParams` cuando la pagina los lee | El panel no puede mostrar la info si falta |
| `"path": "@/components/ui/Button"` en una seccion | Los atoms no se listan como secciones |
| Describir processes como pasos de UX | Los processes describen flujo de datos |
| JSON sin registrar en `PAGE_DOCS` ni `ROUTE_MAP` | El panel no encuentra el doc |

## Checklist

- [ ] El `id` coincide con el nombre del archivo.
- [ ] La `route` coincide con la definicion en `App.tsx`.
- [ ] El `layout` es correcto.
- [ ] Todas las `sections` corresponden a componentes reales con paths validos.
- [ ] Los `stores` reflejan los que la pagina realmente consume.
- [ ] Los `processes` estan ordenados por flujo de ejecucion.
- [ ] El JSON esta importado en `pages-explorer.mock.ts` dentro de `PAGE_DOCS`.
- [ ] Si es una ruta nueva, esta registrada en `ROUTE_MAP`.
