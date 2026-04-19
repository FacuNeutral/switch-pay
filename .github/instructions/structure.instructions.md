

# Component System – Estructura y Alcance

Descripción de cada capa del sistema de componentes y cómo interactúan entre sí.

## Conceptos extras:
- `Global-Zustand`: Estado global, accesible desde cualquier parte de la app.
- `Static-Props`: Propiedades que no cambian durante el ciclo de vida del componente.
- `Reactive-Props`: Propiedades que pueden cambiar y causar re-renderizados.

## Capas de componentes

### Page

- `Description`: Punto de entrada de una ruta. Conecta datos, estado global y layouts. Es una pantalla completa, responsable de invocar servicios, proveer contexto y ordenar lo que se renderiza en cada sección/pantalla.
- `Usage`: Invocado directamente por el router. No se anida dentro de ninguna otra capa.
- `Access`:
    - `Global-Zustand` — lee y modifica estado global (sesión, preferencias, datos compartidos entre rutas).
    - `Static-Props` — recibe parámetros de ruta o configuración inicial desde el router.
- `Rules`:
    - Resuelve el caso de uso de la ruta y delega la UI detallada hacia `Layout`, `Composition` y `Organism`.
    - Puede invocar servicios, normalizar datos y conectar estado global, pero no debe absorber lógica visual fina.
    - No debe transformarse en un contenedor de coordinación local profunda; si aparece esa necesidad, se crea una `Composition`.
    - Solo administra estado de alcance de ruta o wiring entre dominios, no estado interactivo fino de una sección.
- `Examples`:
    - `DashboardPage` — vista principal con resumen de métricas.
    - `SettingsPage` — pantalla de configuración de cuenta.
    - `LoginPage` — contenedor de formulario de autenticación con redirección post-login.

---

### Layout

- `Description`: Define la estructura visual macro de una página — es decir, dentro de ella ordena columnas, sidebars, paneles, headers. Sin lógica de negocio.
- `Usage`: Dentro de `Page`.
- `Access`:
    - `Reactive-Props` — recibe configuración estructural (slots, visibilidad de paneles, dirección de columnas).
- `Rules`:
    - Solo organiza estructura macro: regiones, paneles, columnas, headers y sidebars.
    - No invoca servicios ni coordina flujos de dominio.
    - No crea estado local salvo ajustes estructurales mínimos derivados de props.
    - Si una sección necesita coordinar datos, acciones o múltiples hijos, esa responsabilidad baja a `Composition`.

---

## Capas auxiliares de componentes

### Global Layout

- `Description`: Capa estructural global que vive por encima de las páginas y administra elementos persistentes o emergentes compartidos por toda la app, como modales, toasts, drawers globales o portales. A diferencia del `Layout` de página, esta capa sí puede contener lógica.
- `Usage`: En la raíz de la aplicación, envolviendo el router o el árbol principal de pantallas.
- `Access`:
    - `Global-Zustand` — controla el estado global de overlays y componentes emergentes.
    - `Reactive-Props` — recibe configuración dinámica del shell global, como temas, slots persistentes o reglas de visibilidad.
- `Rules`:
    - Solo administra concerns globales persistentes o emergentes compartidos entre rutas.
    - Puede tener lógica, pero esa lógica debe ser transversal a la app, a excepción de los estados globales, porque mi layout puede ser coordinado en cualquier parte.
    - No reemplaza a `Page` ni a `Composition` como boundary de dominio.
- `Examples`:
    - `ToastLayer` — renderiza notificaciones globales disparadas desde cualquier parte de la app.
    - `ModalHost` — administra modales emergentes abiertos desde flujos distintos.
    - `AppShell` — estructura global con navegación persistente, overlays y zonas compartidas.

---

### Composition

- `Description`: Unidad de orquestación de una sección o dominio. Coordina múltiples organismos, fragments y subcompositions; define estado compartido, flujo de datos, acciones y estructura de render.
- `Usage`: Dentro de `Layout`, directamente en `Page` o anidado dentro de otro `Composition`.
- `Access`:
    - `Static-Props` — recibe configuración y contratos explícitos desde el padre.
    - `Global-Zustand` — fuente de datos externos compartidos y brinda acceso a otros componentes de la aplicación, no debe usarse como reemplazo de su estado local.
    - `MobX` — maneja el estado reactivo compartido de su árbol cuando coordina interacciones, flujo o sincronización entre múltiples hijos.
    - `useStoreContext` — pieza especial del DS que expone props derivados del store de `MobX` a sus sub-componentes: `state`, `actions` y `computed`.
- `Rules`:
    - Es el boundary de dominio dentro de la UI: controla estado, flujo y coordinación.
    - No expone el store directamente. Expone un contrato controlado mediante contexto.
    - La comunicación entre `Composition` y subcomposiciones debe ser por `Props`. Cada subcomposición puede tener su propio contexto interno.
    - El estado compartido de varios hijos vive en la `Composition`, no en los `Organisms`.
    - Si una subcomposición necesita estado propio, lo mantiene local solo si afecta exclusivamente a su propio subárbol, en todo caso, puede elevar parte de lo que necesite compartir de ese estado.
    - Si un estado/parte del estado necesita ser accedido por otro `Composition` hermano o más alto, este debe vivir en el root de composición común a ambos.

- `Contract`:
        - `Props` — contrato de entrada recibido desde el padre.
        - `State` — estado local compartido que controla el flujo del árbol.
        - `Actions` — acciones que modifican el estado o coordinan el comportamiento.
    - `useStoreContext` — expone props derivados del store hacia el subárbol: `state`, `actions` y `computed`.
- `Examples`:
    - `ProductGrid` — grilla de tarjetas de producto con paginación.
    - `CtaSection` — bloque de llamadas a la acción con título, subtítulo y botones.
    - `TeamList` — lista de miembros con avatar, nombre y rol.
    - `CatalogExplorer` — coordina filtros, resultados, empty state y paginación como un único flujo.

---

### Organism

- `Description`: Componente complejo con estado propio y lógica encapsulada. Puede tener interacciones, modos y variantes visuales que reaccionan a su estado interno mediante estado local.
- `Usage`: Dentro de `Composition`, `Layout` o `Page`.
- `Access`:
    - `Props` — entrada principal de datos y configuración visual desde el padre.
    - `UseContext` — expone estado local, acciones locales o valores derivados a los sub-componentes hijos sin prop drilling.
- `Rules`:
    - Su estado debe ser local, aislado y centrado en la interacción de su propia unidad.
    - No usa `MobX`, `useStoreContext` ni `Global-Zustand` como fuente de estado interno.
    - No coordina múltiples entidades hermanas ni orquesta un flujo completo de sección.
    - No debe convertirse en contenedor de varios organismos con estado compartido; si eso ocurre, el boundary correcto es `Composition`.
    - Puede recibir datos o callbacks desde una `Composition`, pero su estado interno sigue siendo local.
    - Si una decisión afecta a otros organismos externos, deja de ser responsabilidad del `Organism`.
- `Examples`:
    - `Navbar` — barra de navegación con links, búsqueda y menú de usuario.
    - `ProductCard` — tarjeta con imagen, título, precio e interacciones hover/expand.
    - `SearchBar` — input con sugerencias desplegables y estado de carga.
    - `SignUpForm` — formulario con validación, estados de error y envío.
    - `UserMenu` — menú desplegable con opciones de perfil, configuración y logout.
    - `FilterGallery` — conjunto de filtros interactivos con estado de selección y aplicación.

### Custom Organism

- `Description`: Variante de `Organism` pensada para integrar librerías o motores externos cuya estructura interna no sigue completamente esta jerarquía de componentes. Hacia afuera sigue comportándose como un organismo, pero internamente puede delegar parte de su render y lógica a APIs específicas de terceros.
- `Usage`: Dentro de `Composition`, `Layout` o `Page`, igual que cualquier otro `Organism`.
- `Access`:
    - `Reactive-Props` — define la configuración de entrada, datos, opciones de render y callbacks de integración.
- `Rules`:
    - Su API pública debe seguir siendo explícita y controlada desde props.
    - Debe encapsular la complejidad de la librería externa sin filtrarla hacia el resto del árbol.
    - Si integra eventos o estado de terceros, debe adaptarlos a contratos internos claros.
- `Examples`:
    - `ChartPanel` — integra una librería de gráficas con series, ejes y tooltips configurados por API propia.
    - `SceneViewer` — encapsula una escena de `Three.js` con cámara, luces y controles interactivos.
    - `InteractiveCanvas` — maneja render custom sobre canvas con selección, arrastre y overlays.
    - `FlowEditor` — integra `React Flow` con nodos, conexiones y reglas de interacción especializadas.
    - `RichTextEditor` — envuelve un editor de texto enriquecido con su propia API de contenido, formato y eventos.

---

### Fragment

- `Description`: Agrupación mínima de átomos que forman una unidad semántica pequeña o parte/fragmento exclusivo de un organismo — un campo con su label, un avatar con nombre.
- `Usage`: Dentro de `Organism` o `Composition`.
- `Access`:
    - `Props` — toda su configuración y contenido viene del padre.
    - `UseContext` — puede consumir estado local, acciones locales o valores derivados expuestos por un `Organism`.
- `Rules`:
    - No crea estado propio de coordinación.
    - Solo agrupa piezas pequeñas con un significado semántico claro.
    - Puede reaccionar a contexto existente, pero no debe introducir nuevas reglas de flujo.
    - Si empieza a coordinar varias piezas con estado o variantes complejas, debe promoverse a `Organism` o `Composition`.
- `Examples`:
    - `FormField` — combinación de label, input y mensaje de ayuda.
    - `UserBadge` — avatar, nombre y estado en una sola pieza reutilizable.
    - `PriceBlock` — precio, moneda y texto auxiliar agrupados como una unidad visual.
    - `ListItem` — ícono, título y descripción para un elemento de lista o menú.

---

### Atom

- `Description`: La unidad más pequeña y 100% reutilizable. No debe pertenecer a ninguna otra capa.
- `Usage`: Dentro de cualquier capa superior (`Fragment`, `Organism`, `Composition`).
- `Access`:
    - `Props` — única forma de modificarlo. Todo su contenido, estilo y comportamiento viene del padre.
- `Rules`:
    - Debe ser completamente reutilizable y determinista a partir de props.
    - No conoce dominio, flujo ni estructura del árbol.
    - Si empieza a depender de contexto o comportamiento interno, ya no es un `Atom`.
- `Examples`:
    - `Icon` — ícono SVG con tamaño y color configurable via className o ui props específicos.
    - `Badge` — etiqueta de estado (ej. "Nuevo", "Beta") sin lógica propia.
    - `Spinner` — indicador visual de carga, puramente presentacional.
    - `Button` — botón simple sin estados de interacción ni lógica, solo estilos y contenido vía props.
    - `Avatar` — imagen de perfil con tamaño y forma configurable, sin lógica de carga o fallback.
    - `Text` — componente de texto básico (span, p, h1–h3) sin estilos propios, solo contenido y clases vía props.
    - `Tag` — etiqueta de texto con estilos predefinidos (ej. "Primario", "Secundario") pero sin lógica de interacción ni estado.

---

## Primitivos

- `Description`: Wrappers HTML mínimos. No tienen estilos propios — todo el estilo viene del `className` del consumidor.
- `Usage`: Base de composición para todos los niveles superiores.
- `Rules`:
    - Son la base estructural del sistema; no contienen lógica de negocio ni estado propio.
    - Deben usarse como ladrillos de composición, no como componentes de dominio.
    - Su comportamiento debe ser transparente y predecible.
- `Examples`:

| Primitivo | Rol |
|---|---|
| `Box` | Contenedor estructural base. Renderiza cualquier elemento HTML con `data-role` y eventos. |
| `Flex` | Ordena hijos directos en fila/columna (`flex`). |
| `Grid` | Ordena hijos directos en grilla (`grid`). |
| `Text` | Cualquier contenido de texto (span, p, h1–h3, label, etc.). |
| `RelativeBox` | Contenedor con `position: relative`. |
| `AbsolutePosition` | Contenedor con `position: absolute`. |
| `AbsOverlay` | Overlay absoluto. El hijo directo debe ser `Box`. |
| `FixedOverlay` | Overlay fixed — para modales y toasts. |
| `StickyOverlay` | Overlay sticky — para headers y toolbars. |

---

## Manejo de estado

### MobX — Local o SubComp

- `Description`: Estado reactivo local para manejar interacciones, modos y datos internos de una unidad compleja.
- `Usage`: Dentro de `Composition` y `Custom Organism`.
- `Access`:
    - `useStoreContext` — solo puede consumirse dentro de un contexto creado por un `Composition` que exponga props derivados de su store.
    - `Reactive-Props` — puede inicializarse o sincronizarse desde props reactivas recibidas por el componente padre.
- `Rules`:
    - En `Composition`, guarda estado compartido del árbol local: flujo, selección, filtros, sincronización y coordinación.
    - No pertenece al modelo interno de `Organism`; los organismos usan estado local con hooks.
    - Si el estado afecta a más de un hijo, se eleva al root de `Composition` más alto de ese árbol.
    - No debe usarse como atajo para saltar boundaries arquitectónicos.
---

### useStoreContext — Pieza especial del DS

- `Description`: Mecanismo para compartir props derivados del store entre una capa contenedora y sus sub-componentes cercanos sin prop drilling.
- `Usage`: Puede crearse en `Composition` y consumirse en sus capas hijas. No se usa en capas por encima de `Composition`.
- `Access`:
    - `MobX` — puede exponer `state`, `actions` y `computed` derivados del store observable definido internamente por la capa contenedora.
- `Rules`:
    - En `Composition`, expone props derivados del store: `state`, `actions` y `computed`.
    - No debe exponer el store bruto como dependencia directa de los `Organisms`.
    - Cada `Composition` mantiene su contexto aislado por nivel.

---

### UseContext — Local o SubComp

- `Description`: Mecanismo para compartir estado local, acciones locales o valores derivados entre un `Organism` y sus sub-componentes cercanos sin prop drilling.
- `Usage`: Puede crearse en `Organism`, `Pages`, `Routes` y consumirse en sus capas hijas.
- `Rules`:
    - Solo refleja el estado local del `Organism`.
    - No depende de `MobX` ni de stores globales.
    - Se usa para evitar prop drilling dentro del subárbol del organismo.
    - No debe usarse para coordinar múltiples organismos hermanos o un flujo de sección completo, solo uso interno de un organismo.

---

### Zustand — Global

- `Description`: Estado global accesible desde cualquier parte de la aplicación para compartir datos externos, sesión, preferencias o información transversal entre rutas.
- `Usage`: En `Global Layout`, `Page`, `Layout`, `Composition` y `Custom Organism` cuando actúa como adapter de un estado externo.
- `Access`:
    - `Global-Zustand` — fuente compartida para lectura y escritura de estado global.
- `Rules`:
    - Solo debe contener estado realmente global o transversal entre componentes.
    - No debe usarse para reemplazar estado local de `Composition` u `Organism`.
    - Un `Composition` puede leerlo o escribirlo cuando integra dominio local con estado global, pero su flujo interno sigue siendo suyo.
    - Un `Organism` no debe depender directamente de `Zustand` para su estado interno, pero puede usarse para sincronizar o reflejar el mismo en un estado local.
    - Si el estado no necesita sobrevivir fuera del árbol local, no debe ir a `Zustand`.

---