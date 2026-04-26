# Infrastructure — Reference

Reglas para definir, ubicar y mantener cada pieza del proyecto. Las convenciones son agnosticas al dominio: aplican sin importar que features existan hoy.

---

## Bootstrap y app shell

- `index.html` es el documento base. Solo contiene el contenedor de montaje y meta tags.
- `src/main.tsx` es el unico entrypoint de React. Solo monta `<App />` e importa el CSS global.
- `src/App.tsx` centraliza providers globales y la tabla de rutas. No contiene logica de UI ni de negocio.
- Cada provider nuevo se agrega en `App.tsx`, nunca dentro de un layout o page.

### Reglas

- No agregar side effects ni logica en `main.tsx`.
- No anidar providers dentro de layouts o pages; todos van en el shell.
- El orden de providers importa: los que dependen de otros van mas adentro.

---

## Routing

- Las rutas se definen de forma centralizada en `App.tsx`.
- Las rutas con shell compartido se anidan bajo un layout con `<Outlet />`.
- Las rutas standalone (login, register, error) van fuera del layout principal.
- La ruta catch-all (`*`) siempre existe y apunta a una page de not-found.

### Reglas

- No definir rutas fuera de `App.tsx`.
- No crear rutas sin una page asociada en `src/pages/`.
- Cada ruta nueva decide si va dentro de un layout existente o es standalone.

---

## Pages (`src/pages/`)

- Cada archivo es una page completa asociada a una ruta.
- Las pages solo componen: importan layouts, organismos y atoms. No implementan logica de UI compleja.
- Pueden leer estado global (stores) para pasarlo como props a organismos.

### Reglas

- No escribir markup extenso directo en una page; extraer a un organismo.
- No colocar llamadas a servicios ni transformaciones de datos dentro de la page.
- Una page no importa otra page.

---

## Layouts (`src/layouts/`)

- Resuelven estructura visual compartida entre varias rutas (header, sidebar, regiones).
- Renderizan `<Outlet />` para inyectar la page hija.
- Pueden consumir estado global de UI (sidebar, theme).

### Reglas

- No incluir logica de negocio ni contenido especifico de una feature.
- No crear un layout para una sola ruta salvo que sea un shell visual distinto.
- Si un layout necesita contexto propio, usar un store de UI, no un context local.

---

## Application — Features (`src/application/{feature}/`)

Screaming architecture: cada carpeta de primer nivel dentro de `application/` representa un dominio de negocio.

### Subcarpetas permitidas

| Subcarpeta    | Proposito                                                       |
| ------------- | --------------------------------------------------------------- |
| `components/` | Organismos acotados al feature                                  |
| `fragments/`  | Fragments acotados al feature — piezas irreducibles del organismo |
| `hooks/`      | Hooks que solo aplican dentro del feature                       |
| `helpers/`    | Funciones utilitarias locales al feature                        |
| `interfaces/` | Contratos comunes del feature que no son entidades ni props     |
| `contexts/`   | Estado local del feature via Context                            |
| `services/`   | Acceso a datos y API del feature                                |
| `layouts/`    | Layouts especificos del feature (raro)                          |

### Reglas

- Un organismo de feature no se importa desde otro feature. Si se necesita en mas de uno, se mueve a `src/components/core/`.
- Un hook de feature no se exporta fuera del feature. Si se reutiliza, se promueve a `src/hooks/`.
- Cada subcarpeta se crea solo cuando se necesita; no generar carpetas vacias por convencion.
- Los organismos consumen fragments, atoms (`src/components/ui/`) y core (`src/components/core/`), nunca al reves.
- Un fragment de feature no se importa desde otro feature. Si se necesita en mas de uno, se mueve a `src/components/fragments/`.

---

## Componentes reutilizables (`src/components/`)

### `components/ui/` — Atoms

- Componentes base primitivos (botones, inputs, dialogs, tooltips).
- Provienen de shadcn/radix o se crean con el mismo nivel de abstraccion.
- No conocen rutas, stores, features ni contexto de negocio.
- Reciben todo por props.

#### Reglas

- No importar stores, services ni hooks de feature dentro de un atom.
- No agregar logica condicional de negocio.
- Mantener la API del componente generica: props tipadas, sin acoplar a un dominio.

### `components/fragments/` — Fragments globales

- Piezas irreducibles de UI que componen organismos. Encapsulan markup y estilos repetidos sin logica de negocio propia.
- Son siempre reutilizables: cualquier organismo de cualquier feature puede consumirlos.
- No poseen estado propio de negocio. Reciben todo por props.
- Estan un nivel por encima de atoms: un fragment puede componer uno o mas atoms, pero nunca un organismo.

#### Reglas

- Un fragment es irreducible: si se puede descomponer en sub-fragments con sentido propio, hacerlo.
- No importar stores, services ni hooks de feature dentro de un fragment.
- Si un fragment solo se usa dentro de un feature, vive en `application/{feature}/fragments/`, no aqui.
- Se promueve a global cuando mas de un feature lo consume.
- Nombrar describiendo la pieza, no el dominio: `FormField`, `StatRow`, no `AuthField`.

### `components/core/` — Organismos cross-feature

- Organismos reutilizables que se usan en mas de un feature o page.
- Pueden componer atoms de `ui/` y hooks genericos.
- Pueden consumir estado global de UI, pero no de un feature especifico.

#### Reglas

- Solo se promueve a core cuando el componente se usa (o se usara de forma comprobable) en mas de un feature.
- No crear wrappers de un solo atom solo para darle un nombre de dominio.
- Si un core empieza a acumular logica de un solo feature, moverlo de vuelta a `application/{feature}/components/`.

---

## Hooks (`src/hooks/`)

- Hooks genericos reutilizables sin acoplamiento a un feature concreto.
- Resuelven preocupaciones transversales: responsive, toasts, media queries, timers.

### Reglas

- Un hook generico no importa stores de feature ni services.
- Si un hook solo se usa dentro de un feature, vive en `application/{feature}/hooks/`.
- Nombrar con el prefijo `use` y describir la capacidad, no el feature: `useIsMobile`, no `useVideosMobile`.

---

## Helpers (`src/helpers/`)

- Funciones puras, simples y reutilizables. Sin side effects, sin estado, sin hooks.
- Se crean cuando una utilidad se repite mas de una vez con alcance transversal.

### Reglas

- No colocar logica de negocio que dependa de un feature.
- Si la funcion solo se usa en un feature, vive en `application/{feature}/helpers/`.
- Preferir funciones pequeñas y testables sobre helpers que acumulen responsabilidades.

---

## Lib (`src/lib/`)

- Utilidades base de infraestructura: class merging, formatters, adapters de terceros.
- Nivel de abstraccion mas bajo que helpers; no resuelve negocio sino tooling.

### Reglas

- No duplicar utilidades que ya expone una dependencia instalada.
- Mantener cada archivo enfocado en una sola responsabilidad.

---

## Data (`src/data/`)

Capa de **generadores y datasets** compartidos entre features.

### Que va en `src/data/`

- **Generadores genericos**: factorias que producen datos a partir de parametros sin asumir un feature concreto.
- **Datasets base**: colecciones pre-generadas que sirven como materia prima para los mocks de feature.
- **Re-exports de entidades**: si un generador necesita exponer el tipo de la entidad que genera, lo re-exporta desde `src/entities/`.

### Que NO va en `src/data/`

- Definiciones de tipos o interfaces de dominio (van en `src/entities/`).
- Helpers de query de dominio (van en el mock del feature).
- Constantes de comportamiento (van en el mock del feature correspondiente).

### Reglas

- `data/` es la fuente de **materia prima y generadores**, no de formas del dominio.
- Las definiciones de tipo de dominio viven en `src/entities/`. `data/` puede re-exportarlas si asi lo requiere su API.
- Si un generador empieza a recibir parametros de dominio especifico, debe moverse al mock del feature.

---

## Entidades (`src/entities/`)

Capa de **modelos de dominio completos**. Cada entidad define la forma canonica de un concepto del negocio.

### Estructura

Un archivo por entidad con el patron `{name}.entity.ts`:

```
src/entities/
  video.entity.ts
  channel.entity.ts
  product.entity.ts
  user.entity.ts
```

### Que va en una entidad

- La interface completa del modelo de dominio con todos sus campos.
- Type aliases derivados del modelo (`Pick`, `Omit`, `Partial`) si son reutilizados por multiples consumidores.

### Que NO va en una entidad

- Logica de generacion de datos.
- Funciones de acceso, busqueda o filtrado.
- Constantes de comportamiento ni configuracion.
- Interfaces de props de componente.
- Interfaces de proyecto que no representan un concepto del dominio.

### Reglas

- Cada entidad tiene su propio archivo. No agrupar multiples entidades en un archivo.
- El nombre describe el concepto del dominio: `video.entity.ts`, no `videoTypes.ts` ni `models.ts`.
- Las entidades son **la fuente de verdad** de las formas del dominio.
- Los consumidores importan directamente desde `@/entities/{name}.entity`.
- Usar `@type Entity` en la cabecera del archivo.

---

## Interfaces (`src/interfaces/` y `application/{feature}/interfaces/`)

Capa de **contratos comunes del proyecto** que no representan modelos de dominio.

### Reglas

- No crear interfaces vacias anticipandose a una necesidad futura.
- Si una interface de feature se importa desde otro feature, se promueve a `src/interfaces/`.
- No duplicar lo que ya resuelve una entidad o el tipo de un store.
- Usar `@type Interface` en la cabecera del archivo.

---

## Estado global — Zustand (`src/zustand/`)

Cada feature con estado compartido tiene una carpeta con dos archivos:

| Archivo              | Proposito                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------- |
| `{feature}.mock.ts`  | Datos de dominio, constantes de comportamiento, accessors y adaptadores que el slice consume |
| `{feature}.slice.ts` | Store creado con `create<T>()`: estado y acciones                                            |

### Reglas

- **Separacion por feature**: una carpeta por dominio.
- **Solo estado global**: no usar para estado local de formularios, animaciones o UI efimera.
- **Consumo directo**: los componentes importan el hook del slice sin providers ni wrappers.
- **Mock como fuente de verdad**: el slice importa del mock; nunca de `src/data/` ni de mocks de otro feature.
- **Interface explicita**: cada slice define su interface de estado y acciones antes de `create<>()`.
- No crear un store para un solo componente que puede resolver su estado con `useState`.
- Los modelos de dominio se importan desde `src/entities/`.

---

## Criterios de ubicacion — Tabla de decision

| Pregunta                                            | Ubicacion                                 |
| --------------------------------------------------- | ----------------------------------------- |
| ¿Es infraestructura de montaje o providers?         | `App.tsx`                                 |
| ¿Es una ruta nueva?                                 | `App.tsx` + `src/pages/`                  |
| ¿Es un componente base sin logica de negocio?       | `components/ui/`                          |
| ¿Es un organismo usado en mas de un feature?        | `components/core/`                        |
| ¿Es un organismo atado a un solo feature?           | `application/{feature}/components/`       |
| ¿Es una pieza irreducible usada en mas de un feature? | `components/fragments/`                 |
| ¿Es una pieza irreducible usada solo en un feature?   | `application/{feature}/fragments/`      |
| ¿Es un hook generico sin acoplamiento a feature?    | `src/hooks/`                              |
| ¿Es un hook especifico de un feature?               | `application/{feature}/hooks/`            |
| ¿Es una funcion pura reutilizada transversalmente?  | `src/helpers/`                            |
| ¿Es una funcion pura usada solo en un feature?      | `application/{feature}/helpers/`          |
| ¿Es estado compartido entre componentes distantes?  | `src/zustand/{feature}/`                  |
| ¿Es estado local de un solo feature via Context?    | `application/{feature}/contexts/`         |
| ¿Es un modelo de dominio completo?                  | `src/entities/{name}.entity.ts`           |
| ¿Es un contrato tecnico compartido entre features?  | `src/interfaces/`                         |
| ¿Es un contrato tecnico propio de un feature?       | `application/{feature}/interfaces/`       |
| ¿Es una interface de props de componente?           | En el mismo archivo del componente        |
| ¿Es un generador generico de datos sin dominio?     | `src/data/`                               |
| ¿Es un dataset, accessor o constante de un feature? | `src/zustand/{feature}/{feature}.mock.ts` |
| ¿Es un token visual o variable global de estilo?    | `src/index.css` + `tailwind.config.ts`    |
| ¿Es una utilidad base de infraestructura?           | `src/lib/`                                |

---

## Reglas generales de dependencia

```
pages → layouts, application/*/components, components/core, components/ui
layouts → components/core, components/ui, zustand (solo UI)
application/*/components → application/*/fragments, components/fragments, components/core, components/ui, hooks, zustand, entities
application/*/fragments → components/ui, hooks
components/fragments → components/ui, hooks
components/core → components/fragments, components/ui, hooks, entities
components/ui → (sin dependencias internas, solo props)
hooks → lib
zustand → data, entities, lib
data → entities
entities → (sin dependencias internas)
interfaces → entities (solo para derivar tipos)
```

- Las dependencias siempre van hacia abajo en esta jerarquia; nunca hacia arriba.
- Un atom nunca importa un fragment ni un organismo. Un fragment nunca importa un organismo. Un organismo nunca importa una page.

---

## Convenciones de naming

- **Archivos de componentes**: PascalCase (`VideoCard.tsx`, `MainLayout.tsx`).
- **Archivos de hooks**: camelCase con prefijo `use` (`use-mobile.tsx`, `use-toast.ts`).
- **Archivos de store**: `{feature}.slice.ts` y `{feature}.mock.ts`.
- **Archivos de entidad**: `{name}.entity.ts` en `src/entities/`.
- **Archivos de utilidad**: camelCase (`utils.ts`, `mockData.ts`).
- **Carpetas**: kebab-case o camelCase simple segun la convencion existente en su capa.
- **Exports de componentes**: named export para atoms y hooks; default export para pages y layouts.

---

## Documentacion inline por archivo

Cada archivo fuente lleva un bloque de documentacion comentado en la primera linea, antes de cualquier import. El formato usa comentarios `//*` para distinguirlos de comentarios regulares.

### Cabecera de archivo

Tres lineas obligatorias al inicio de cada archivo:

```
//* @type <tipo>
//* @context <contexto>
//* @utility <descripcion breve de para que sirve>
```

#### `@type` — Clasificacion estructural

| Valor        | Cuando usarlo                                                             |
| ------------ | ------------------------------------------------------------------------- |
| `Entrypoint` | Punto de montaje de la app (`main.tsx`)                                   |
| `Shell`      | App shell con providers y rutas (`App.tsx`)                               |
| `Page`       | Archivo en `src/pages/` asociado a una ruta                               |
| `Layout`     | Archivo en `src/layouts/` con `<Outlet />`                                |
| `Organism`   | Componente compuesto con logica o multiples atoms/fragments               |
| `Fragment`   | Pieza irreducible reutilizable que compone organismos                     |
| `Atom`       | Componente base primitivo (`components/ui/`, skeletons, wrappers minimos) |
| `Hook`       | Custom hook (`use-*`)                                                     |
| `Store`      | Zustand slice (`{feature}.slice.ts`)                                      |
| `Mock`       | Datos, constantes y accessors del feature (`{feature}.mock.ts`)           |
| `Context`    | Provider con React Context                                                |
| `Entity`     | Modelo de dominio completo (`src/entities/{name}.entity.ts`)              |
| `Interface`  | Contrato comun del proyecto que no es dominio (`src/interfaces/`)         |
| `Data`       | Generadores genericos y datasets base (`src/data/`)                       |
| `Helper`     | Funcion pura reutilizable                                                 |
| `Lib`        | Utilidad de infraestructura (`src/lib/`)                                  |
| `Service`    | Acceso a datos o API                                                      |

#### `@context` — Alcance de aplicacion

Ejemplos: `Global`, `Auth`, `Users`, `UI – Global`, o cualquier nombre de feature.

#### `@utility` — Para que sirve

Una linea breve y directa. No repetir el nombre del archivo; describir la responsabilidad.

### Documentacion de metodos internos

Funciones y acciones relevantes se documentan con un comentario `//*` en la linea anterior:

```
//* Filtra videos por categoria con delay simulado de carga.
setActiveCategory: (category: string) => { ... }
```

### Reglas

- La cabecera siempre va antes del primer `import`.
- Usar `//*` (doble asterisco), no `//` ni `/**`.
- No agregar cabeceras a archivos de `components/ui/` (atoms de shadcn/radix gestionados por la libreria).
- Mantener `@utility` en una sola linea.
- No duplicar la documentacion de la cabecera con un comentario JSDoc adicional en el export.

---

## Regiones internas del DOM en componentes

Los componentes con estructura compuesta (Organism, Layout, Page) deben comentar las regiones semanticas de su DOM con `{/* <Tag> Descripcion */}`.

### Cuando anotar

- **Organisms**: siempre.
- **Layouts y Pages**: cuando componen mas de un bloque visual directo.
- **Atoms y Fragments**: nunca.

### Formato

```tsx
return (
  <div>
    {/* <Tag> Card Header — branding y titulo */}
    <div>...</div>

    {/* <Tag> Main — contenido principal */}
    <div>...</div>

    {/* <Tag> Footer — enlaces secundarios */}
    <div>...</div>
  </div>
);
```

### Reglas

- Usar `{/* <Tag> Descripcion */}` como formato unico.
- Un comentario de region va en la linea inmediatamente anterior al elemento que abre esa pieza.
- No anidar regiones salvo que la estructura lo justifique.
- Si un componente solo tiene una region, no anotar.
