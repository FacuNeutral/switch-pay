---
name: "Infrastructure"
description: "Use when modifying src structure, app shell, routing, pages, layouts, feature folders, reusable components, hooks, helpers, Zustand stores, file placement, naming, headers, or DOM region comments."
applyTo: "client/src/**"
---

# Infrastructure

Reglas para definir, ubicar y mantener cada pieza del proyecto. Las convenciones son agnósticas al dominio: aplican sin importar qué features existan hoy.

---

## Bootstrap y app shell

- `index.html` es el documento base. Solo contiene el contenedor de montaje y meta tags.
- `src/main.tsx` es el único entrypoint de React. Solo monta `<App />` e importa el CSS global.
- `src/App.tsx` centraliza providers globales y la tabla de rutas. No contiene lógica de UI ni de negocio.
- Cada provider nuevo se agrega en `App.tsx`, nunca dentro de un layout o page.

### Reglas

- No agregar side effects ni lógica en `main.tsx`.
- No anidar providers dentro de layouts o pages; todos van en el shell.
- El orden de providers importa: los que dependen de otros van más adentro.

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
- Las pages solo componen: importan layouts, organismos y atoms. No implementan lógica de UI compleja.
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

- No incluir lógica de negocio ni contenido específico de una feature.
- No crear un layout para una sola ruta salvo que sea un shell visual distinto.
- Si un layout necesita contexto propio, usar un store de UI, no un context local.

---

## Application — Features (`src/application/{feature}/`)

Screaming architecture: cada carpeta de primer nivel dentro de `application/` representa un dominio de negocio.

### Subcarpetas permitidas

| Subcarpeta    | Propósito                                                       |
| ------------- | --------------------------------------------------------------- |
| `components/` | Organismos acotados al feature                                  |
| `fragments/`  | Fragments acotados al feature — piezas irreducibles del organismo |
| `hooks/`      | Hooks que solo aplican dentro del feature                       |
| `helpers/`    | Funciones utilitarias locales al feature                        |
| `interfaces/` | Contratos comunes del feature que no son entidades ni props     |
| `contexts/`   | Estado local del feature vía Context                            |
| `services/`   | Acceso a datos y API del feature                                |
| `layouts/`    | Layouts específicos del feature (raro)                          |

### Reglas

- Un organismo de feature no se importa desde otro feature. Si se necesita en más de uno, se mueve a `src/components/core/`.
- Un hook de feature no se exporta fuera del feature. Si se reutiliza, se promueve a `src/hooks/`.
- Cada subcarpeta se crea solo cuando se necesita; no generar carpetas vacías por convención.
- Los organismos consumen fragments, atoms (`src/components/ui/`) y core (`src/components/core/`), nunca al revés.
- Un fragment de feature no se importa desde otro feature. Si se necesita en más de uno, se mueve a `src/components/fragments/`.

---

## Componentes reutilizables (`src/components/`)

### `components/ui/` — Atoms

- Componentes base primitivos (botones, inputs, dialogs, tooltips).
- Provienen de shadcn/radix o se crean con el mismo nivel de abstracción.
- No conocen rutas, stores, features ni contexto de negocio.
- Reciben todo por props.

#### Reglas

- No importar stores, services ni hooks de feature dentro de un atom.
- No agregar lógica condicional de negocio.
- Mantener la API del componente genérica: props tipadas, sin acoplar a un dominio.

### `components/fragments/` — Fragments globales

- Piezas irreducibles de UI que componen organismos. Encapsulan markup y estilos repetidos sin lógica de negocio propia.
- Son siempre reutilizables: cualquier organismo de cualquier feature puede consumirlos.
- No poseen estado propio de negocio. Reciben todo por props.
- Están un nivel por encima de atoms: un fragment puede componer uno o más atoms, pero nunca un organismo.

#### Reglas

- Un fragment es irreducible: si se puede descomponer en sub-fragments con sentido propio, hacerlo.
- No importar stores, services ni hooks de feature dentro de un fragment.
- Si un fragment solo se usa dentro de un feature, vive en `application/{feature}/fragments/`, no aquí.
- Se promueve a global cuando más de un feature lo consume.
- Nombrar describiendo la pieza, no el dominio: `FormField`, `StatRow`, no `AuthField`.

### `components/core/` — Organismos cross-feature

- Organismos reutilizables que se usan en más de un feature o page.
- Pueden componer atoms de `ui/` y hooks genéricos.
- Pueden consumir estado global de UI, pero no de un feature específico.

#### Reglas

- Solo se promueve a core cuando el componente se usa (o se usará de forma comprobable) en más de un feature.
- No crear wrappers de un solo atom solo para darle un nombre de dominio.
- Si un core empieza a acumular lógica de un solo feature, moverlo de vuelta a `application/{feature}/components/`.

---

## Hooks (`src/hooks/`)

- Hooks genéricos reutilizables sin acoplamiento a un feature concreto.
- Resuelven preocupaciones transversales: responsive, toasts, media queries, timers.

### Reglas

- Un hook genérico no importa stores de feature ni services.
- Si un hook solo se usa dentro de un feature, vive en `application/{feature}/hooks/`.
- Nombrar con el prefijo `use` y describir la capacidad, no el feature: `useIsMobile`, no `useVideosMobile`.

---

## Helpers (`src/helpers/`)

- Funciones puras, simples y reutilizables. Sin side effects, sin estado, sin hooks.
- Se crean cuando una utilidad se repite más de una vez con alcance transversal.

### Reglas

- No colocar lógica de negocio que dependa de un feature.
- Si la función solo se usa en un feature, vive en `application/{feature}/helpers/`.
- Preferir funciones pequeñas y testables sobre helpers que acumulen responsabilidades.

---

## Lib (`src/lib/`)

- Utilidades base de infraestructura: class merging, formatters, adapters de terceros.
- Nivel de abstracción más bajo que helpers; no resuelve negocio sino tooling.

### Reglas

- No duplicar utilidades que ya expone una dependencia instalada.
- Mantener cada archivo enfocado en una sola responsabilidad.

---

## Data (`src/data/`)

Capa de **generadores y datasets** compartidos entre features. Aquí viven los datos genéricos, no las formas del dominio ni la lógica de cómo se consumen.

### Qué va en `src/data/`

- **Generadores genéricos**: factorías que producen datos a partir de parámetros sin asumir un feature concreto (`generateVideos(count)`).
- **Datasets base**: colecciones pre-generadas que sirven como materia prima para los mocks de feature.
- **Re-exports de entidades**: si un generador necesita exponer el tipo de la entidad que genera, lo re-exporta desde `src/entities/`.

### Qué NO va en `src/data/`

- **Definiciones de tipos o interfaces de dominio**: esas viven en `src/entities/`.
- **Helpers de query de dominio**: funciones como filtrar por categoría, buscar por texto o encontrar relacionados. Esas pertenecen al mock del feature (`zustand/{feature}/{feature}.mock.ts`) o a un service.
- **Constantes de comportamiento**: delays de simulación, breakpoints, valores default de UI. Van en el mock del feature correspondiente.

### Reglas

- `data/` es la fuente de **materia prima y generadores**, no de formas del dominio.
- Las definiciones de tipo de dominio viven en `src/entities/`. `data/` puede re-exportarlas si así lo requiere su API.
- Si un generador empieza a recibir parámetros de dominio específico (filtros, queries), debe moverse al mock del feature.

---

## Entidades (`src/entities/`)

Capa de **modelos de dominio completos**. Cada entidad define la forma canónica de un concepto del negocio.

### Estructura

Un archivo por entidad con el patrón `{name}.entity.ts`:

```
src/entities/
  video.entity.ts
  channel.entity.ts
  product.entity.ts
  user.entity.ts
```

### Qué va en una entidad

- La interface completa del modelo de dominio con todos sus campos.
- Type aliases derivados del modelo (`Pick`, `Omit`, `Partial`) si son reutilizados por múltiples consumidores.

### Qué NO va en una entidad

- Lógica de generación de datos (va en `data/` o en el mock del feature).
- Funciones de acceso, búsqueda o filtrado (van en el mock del feature o en un service).
- Constantes de comportamiento ni configuración.
- Interfaces de props de componente (van en el archivo del componente).
- Interfaces de proyecto que no representan un concepto del dominio (van en `interfaces/`).

### Reglas

- Cada entidad tiene su propio archivo. No agrupar múltiples entidades en un archivo.
- El nombre describe el concepto del dominio: `video.entity.ts`, no `videoTypes.ts` ni `models.ts`.
- Las entidades son **la fuente de verdad** de las formas del dominio. Ningún otro lugar redefine esos campos.
- Los consumidores (stores, mocks, componentes) importan directamente desde `@/entities/{name}.entity`.
- Si una entidad solo la usa un feature, igualmente vive en `src/entities/` — la separación es por naturaleza (dominio), no por alcance.
- Usar `@type Entity` en la cabecera del archivo.

---

## Interfaces (`src/interfaces/` y `application/{feature}/interfaces/`)

Capa de **contratos comunes del proyecto** que no representan modelos de dominio. Definen formas reutilizables para patrones técnicos transversales.

### Estructura

- **Globales**: `src/interfaces/` — contratos compartidos entre múltiples features o capas.
- **Por feature**: `application/{feature}/interfaces/` — contratos que solo aplican dentro de un feature.

### Qué va en interfaces

- Contratos técnicos reutilizables: paginación, respuestas de API, estados de carga, wrappers genéricos.
- Tipos utilitarios del proyecto que no sean del dominio ni de un componente.

### Qué NO va en interfaces

- **Modelos de dominio**: esos van en `src/entities/`.
- **Props de componentes**: esas se definen en el mismo archivo del componente.
- **Interfaces de estado de stores**: esas se definen en el slice.

### Reglas

- No crear interfaces vacías anticipándose a una necesidad futura. Se crean cuando existe un contrato concreto.
- Si una interface de feature se importa desde otro feature, se promueve a `src/interfaces/`.
- No duplicar lo que ya resuelve una entidad o el tipo de un store.
- Usar `@type Interface` en la cabecera del archivo.

---

## Estado global — Zustand (`src/zustand/`)

Cada feature con estado compartido tiene una carpeta con dos archivos:

| Archivo              | Propósito                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------- |
| `{feature}.mock.ts`  | Datos de dominio, constantes de comportamiento, accessors y adaptadores que el slice consume |
| `{feature}.slice.ts` | Store creado con `create<T>()`: estado y acciones                                            |

### `{feature}.mock.ts` — Fuente de datos del dominio

El mock es el **contrato de datos del feature**. Puede ser autocontenido o actuar como adaptador de `src/data/`.

#### Qué va en el mock

- **Tipos propios del feature** que no se comparten con otros features ni representan un modelo de dominio completo (interfaces locales, type aliases derivados).
- **Constantes de comportamiento**: delays de simulación, valores default, breakpoints propios.
- **Datasets de dominio**: colecciones listas para consumo directo del slice. Pueden venir de `data/` o generarse localmente.
- **Funciones de acceso**: búsqueda, filtrado, lookup por ID — lógica que opera sobre los datos del feature.
- **Re-exports adaptados**: si el feature usa datos de `src/data/`, el mock los importa y re-exporta con nombres propios del dominio.

#### Qué NO va en el mock

- Estado reactivo ni acciones — eso es responsabilidad del slice.
- Lógica de componente o de UI.

### `{feature}.slice.ts` — Store reactivo

- Define la interface de estado y acciones.
- Crea el store con `create<T>()`.
- Consume datos y funciones exclusivamente del mock del mismo feature, nunca de `src/data/` directamente.

### Reglas

- **Separación por feature**: una carpeta por dominio.
- **Solo estado global**: no usar para estado local de formularios, animaciones o UI efímera.
- **Consumo directo**: los componentes importan el hook del slice sin providers ni wrappers.
- **Mock como fuente de verdad**: el slice importa del mock; nunca de `src/data/` ni de mocks de otro feature.
- **Interface explícita**: cada slice define su interface de estado y acciones antes de `create<>()`.
- No crear un store para un solo componente que puede resolver su estado con `useState`.
- Si el mock re-exporta desde `data/`, los tipos compartidos se importan desde `data/`, no se redefinen.
- Los modelos de dominio se importan desde `src/entities/`, no se redefinen en el mock ni en el slice.

---

## Estilos y sistema visual

- `src/index.css` materializa CSS variables, tokens runtime, animaciones y utilidades custom.
- `tailwind.config.ts` extiende la configuración con colores, radios, keyframes y animaciones basados en las variables.
- `components.json` fija la integración de shadcn con aliases y convenciones del proyecto.
- Los componentes usan clases de Tailwind y la utilidad `cn()` de `src/lib/utils.ts` para merge condicional.

### Reglas

- No hardcodear valores de color, spacing o radius inline; usar tokens CSS o clases de Tailwind.
- Nuevos tokens de color se agregan como CSS variables en `index.css` y se extienden en `tailwind.config.ts`.
- No crear archivos CSS por componente; toda la customización se resuelve con Tailwind o tokens globales.
- `src/App.css` no participa del flujo de estilos. No agregar estilos ahí.

---

## Shell público (`public/`)

- Assets estáticos que quedan fuera del bundle: favicon, imágenes, robots.txt.
- `index.html` referencia estos assets directamente.

### Reglas

- No colocar código fuente ni archivos que necesiten procesamiento.
- Cada asset público debe tener un propósito claro de entrega (SEO, branding, crawl).

---

## Criterios de ubicación — Tabla de decisión

| Pregunta                                            | Ubicación                                 |
| --------------------------------------------------- | ----------------------------------------- |
| ¿Es infraestructura de montaje o providers?         | `App.tsx`                                 |
| ¿Es una ruta nueva?                                 | `App.tsx` + `src/pages/`                  |
| ¿Es un componente base sin lógica de negocio?       | `components/ui/`                          |
| ¿Es un organismo usado en más de un feature?        | `components/core/`                        |
| ¿Es un organismo atado a un solo feature?           | `application/{feature}/components/`       |
| ¿Es una pieza irreducible usada en más de un feature? | `components/fragments/`                 |
| ¿Es una pieza irreducible usada solo en un feature?   | `application/{feature}/fragments/`      |
| ¿Es un hook genérico sin acoplamiento a feature?    | `src/hooks/`                              |
| ¿Es un hook específico de un feature?               | `application/{feature}/hooks/`            |
| ¿Es una función pura reutilizada transversalmente?  | `src/helpers/`                            |
| ¿Es una función pura usada solo en un feature?      | `application/{feature}/helpers/`          |
| ¿Es estado compartido entre componentes distantes?  | `src/zustand/{feature}/`                  |
| ¿Es estado local de un solo feature vía Context?    | `application/{feature}/contexts/`         |
| ¿Es un modelo de dominio completo?                  | `src/entities/{name}.entity.ts`           |
| ¿Es un contrato técnico compartido entre features?  | `src/interfaces/`                         |
| ¿Es un contrato técnico propio de un feature?       | `application/{feature}/interfaces/`       |
| ¿Es una interface de props de componente?           | En el mismo archivo del componente        |
| ¿Es un generador genérico de datos sin dominio?     | `src/data/`                               |
| ¿Es un dataset, accessor o constante de un feature? | `src/zustand/{feature}/{feature}.mock.ts` |
| ¿Es un tipo que solo usa un feature?                | `src/zustand/{feature}/{feature}.mock.ts` |
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

- Las dependencias siempre van hacia abajo en esta jerarquía; nunca hacia arriba.
- Un atom nunca importa un fragment ni un organismo. Un fragment nunca importa un organismo. Un organismo nunca importa una page.
- Si una dependencia rompe la dirección, es señal de que la pieza está en la capa equivocada.

---

## Convenciones de naming

- **Archivos de componentes**: PascalCase (`VideoCard.tsx`, `MainLayout.tsx`).
- **Archivos de hooks**: camelCase con prefijo `use` (`use-mobile.tsx`, `use-toast.ts`).
- **Archivos de store**: `{feature}.slice.ts` y `{feature}.mock.ts`.
- **Archivos de entidad**: `{name}.entity.ts` en `src/entities/`.
- **Archivos de utilidad**: camelCase (`utils.ts`, `mockData.ts`).
- **Carpetas**: kebab-case o camelCase simple según la convención existente en su capa.
- **Exports de componentes**: named export para atoms y hooks; default export para pages y layouts.

---

## Documentación inline por archivo

Cada archivo fuente lleva un bloque de documentación comentado en la primera línea, antes de cualquier import. El formato usa comentarios `//*` para distinguirlos de comentarios regulares.

### Cabecera de archivo

Tres líneas obligatorias al inicio de cada archivo:

```
//* @type <tipo>
//* @context <contexto>
//* @utility <descripción breve de para qué sirve>
```

#### `@type` — Clasificación estructural

Indica qué rol cumple el archivo dentro de la arquitectura. Valores permitidos:

| Valor        | Cuándo usarlo                                                             |
| ------------ | ------------------------------------------------------------------------- |
| `Entrypoint` | Punto de montaje de la app (`main.tsx`)                                   |
| `Shell`      | App shell con providers y rutas (`App.tsx`)                               |
| `Page`       | Archivo en `src/pages/` asociado a una ruta                               |
| `Layout`     | Archivo en `src/layouts/` con `<Outlet />`                                |
| `Organism`   | Componente compuesto con lógica o múltiples atoms/fragments               |
| `Fragment`   | Pieza irreducible reutilizable que compone organismos                     |
| `Atom`       | Componente base primitivo (`components/ui/`, skeletons, wrappers mínimos) |
| `Hook`       | Custom hook (`use-*`)                                                     |
| `Store`      | Zustand slice (`{feature}.slice.ts`)                                      |
| `Mock`       | Datos, constantes y accessors del feature (`{feature}.mock.ts`)           |
| `Context`    | Provider con React Context                                                |
| `Entity`     | Modelo de dominio completo (`src/entities/{name}.entity.ts`)              |
| `Interface`  | Contrato común del proyecto que no es dominio (`src/interfaces/`)         |
| `Data`       | Generadores genéricos y datasets base (`src/data/`)                       |
| `Helper`     | Función pura reutilizable                                                 |
| `Lib`        | Utilidad de infraestructura (`src/lib/`)                                  |
| `Service`    | Acceso a datos o API                                                      |

#### `@context` — Alcance de aplicación

Describe dónde se aplica o a qué dominio pertenece. Ejemplos:

- `Global` — transversal, sin acoplamiento a feature.
- `Auth` — dominio de autenticación.
- `Users` — dominio de usuarios.
- `UI – Global` — estado de interfaz transversal.
- Cualquier nombre de feature en `application/` o `zustand/`.

#### `@utility` — Para qué sirve

Una línea breve y directa. No repetir el nombre del archivo; describir la responsabilidad.

### Documentación de métodos internos

Funciones, métodos y acciones relevantes dentro de un archivo se documentan con un comentario `//*` en la línea inmediatamente anterior:

```
//* Filtra videos por categoría con delay simulado de carga.
setActiveCategory: (category: string) => { ... }
```

#### Cuándo documentar un método

- Acciones de stores (zustand).
- Handlers con lógica significativa (submit, navigation, toggle).
- Funciones puras exportadas (helpers, utils, generators).
- Funciones internas cuyo nombre no basta para entender su efecto.

#### Cuándo NO documentar un método

- Getters triviales de una línea cuyo nombre ya lo dice todo.
- Callbacks inline dentro del JSX.
- Re-exports sin transformación.

### Ejemplo completo

```ts
//* @type Store
//* @context Videos
//* @utility Estado central del catálogo: filtrado, reproducción, búsqueda e interacciones.

import { create } from "zustand";

// ...

//* Filtra videos por categoría con delay simulado de carga.
setActiveCategory: (category: string) => { ... },

//* Alterna like en un video.
toggleLike: (videoId: string) => { ... },
```

### Reglas

- La cabecera siempre va antes del primer `import`.
- Usar `//*` (doble asterisco), no `//` ni `/**`.
- No agregar cabeceras a archivos de `components/ui/` (atoms de shadcn/radix gestionados por la librería).
- Mantener `@utility` en una sola línea; si necesita más detalle, el código ya debería explicarse solo.
- No duplicar la documentación de la cabecera con un comentario JSDoc adicional en el export.
- Al crear un archivo nuevo, incluir la cabecera como parte del scaffold.

---

## Regiones internas del DOM en componentes

Los componentes con estructura compuesta (Organism, Layout, Page) deben comentar las regiones semánticas de su DOM. Los fragments no llevan regiones porque son irreducibles por definición. Cada bloque principal lleva un comentario `{/* <Tag> Descripción */}` en la línea inmediatamente anterior al elemento que abre esa región.

### Formato

```tsx
return (
  <div>
    {/* <Tag> Card Header — branding y título */}
    <div>...</div>

    {/* <Tag> Main — contenido principal */}
    <div>...</div>

    {/* <Tag> Products Gallery — grid de productos */}
    <div>...</div>

    {/* <Tag> Footer — enlaces secundarios */}
    <div>...</div>
  </div>
);
```

El tag `<Tag>` actúa como marcador visual fijo para poder buscar y filtrar todas las regiones del proyecto. La descripción que lo acompaña es libre y describe el rol de esa pieza dentro del componente.

### Cuándo anotar regiones

- **Organisms**: siempre. Son componentes compuestos con múltiples piezas internas.
- **Molecules**: cuando tienen más de dos regiones semánticas distinguibles.
- **Layouts y Pages**: cuando componen más de un bloque visual directo.
- **Atoms**: nunca. Son primitivos de una sola responsabilidad.

### Cuándo NO anotar

- Elementos triviales de una sola línea.
- Wrappers que solo envuelven un hijo.
- Iteraciones dentro de una lista (el comentario va en el contenedor, no en cada item).

### Ejemplo completo

```tsx
//* @type Organism
//* @context Auth
//* @utility Formulario de login con email y contraseña.

export default function LoginForm() {
  return (
    <div>
      {/* <Tag> Header — branding y título */}
      <div>
        <Logo />
        <h1>Iniciar sesión</h1>
      </div>

      {/* <Tag> Main — formulario de credenciales */}
      <form>
        <Input label="Email" />
        <Input label="Contraseña" />
        <Button>Entrar</Button>
      </form>

      {/* <Tag> Footer — enlace a registro */}
      <p>
        ¿No tienes cuenta? <Link>Regístrate</Link>
      </p>
    </div>
  );
}
```

### Reglas

- Usar `{/* <Tag> Descripción */}` como formato único. No usar `//`, `region:` ni variantes.
- Un comentario de región va en la línea inmediatamente anterior al elemento que abre esa pieza.
- No anidar regiones salvo que la estructura lo justifique claramente.
- Si un componente solo tiene una región (todo es main), no anotar — el bloque completo ya es evidente.
- Al refactorizar un organismo, mantener las regiones actualizadas.
