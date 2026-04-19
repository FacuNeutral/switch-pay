# Ai Frontend Kit Lite

Ai Frontend Kit Lite es una base frontend orientada a proyectos de escala pequeña y mediana — SaaS, herramientas internas o productos de enfoque privado. El entorno viene preparado para iterar rapido, de forma individual o con asistencia de IA generativa, sobre una arquitectura que no sera necesario descartar cuando el proyecto crezca.


## Herramientas de Debug

El proyecto incluye dos devtools integradas que se activan desde el navegador con `Ctrl+Alt+<`. Permiten inspeccionar y modificar aspectos visuales y estructurales del proyecto sin salir del entorno de desarrollo.

| Herramienta | Descripcion | Documentacion |
|---|---|---|
| **Design Tokens** | Editor visual de tokens: colores, tipografia, spacing, sombras, paletas y backups. | [Ver documentacion](client/docs/markdown/design-tokens.md) |
| **Pages Explorer** | Navegador de paginas con simulacion de viewports, documentacion por ruta y galeria visual. | [Ver documentacion](client/docs/markdown/pages-explorer.md) |


## Resumen

- Dos modos de uso: MVP funcional listo para conectar, o referencia de diseño para replicar en otro frontend.
- Orientado a proyectos pequeños y medianos: SaaS, herramientas privadas, productos de nicho.
- Enfoque mock-first: permite explorar la interfaz y validar antes de integrar backends.
- Sistema visual con tokens, dark mode y componentes accesibles para iterar diseño sin perder consistencia.
- Arquitectura por features (screaming architecture) que separa UI base, componentes reutilizables y logica de dominio desde el primer dia.
- Stack completo ya conectado: routing, estado global, formularios, validacion, feedback y testing.
- SEO basico incluido: meta tags, Open Graph, favicon y estructura preparada para indexacion.

## Enfoque

Este proyecto esta pensado para:

- Levantar un MVP funcional de un SaaS o producto privado sin definir infraestructura desde cero.
- Prototipar pantallas navegables como referencia de diseño para un frontend de mayor escala.
- Explorar ideas visuales, componentes y flujos de interfaz con datos simulados.
- Validar decisiones de producto antes de comprometer integraciones reales.

Si se necesita una base para experimentar, presentar o construir una primera version usable de un producto web — o para diseñar la interfaz que despues se va a replicar en otro proyecto — este repositorio cubre ambos caminos.

## Que ofrece

- Arquitectura por features (screaming architecture) y desacoplamiento entre UI base, componentes reutilizables y logica de dominio.
- React, Vite y TypeScript para desarrollo rapido con tipado fuerte.
- Tailwind CSS y design tokens para construir una UI consistente y facil de iterar.
- shadcn/ui y Radix UI como primitivas accesibles y extensibles.
- React Router para routing y shells de layout compartidos.
- Zustand para estado global organizado por feature.
- React Hook Form y Zod para formularios y validacion.
- Motion One para animaciones ligeras y faciles de implementar.
- Toasters, tooltips y componentes base ya integrados para feedback de UI.
- Vitest, Testing Library y Playwright para cubrir pruebas unitarias, de integracion y end-to-end si apunta a ser el frontend real de un producto.
- SEO basico con meta tags en la ruta principal.

## Tecnologias

| Capa | Tecnologia |
|---|---|
| UI | React 19, Tailwind CSS 4, shadcn/ui, Radix UI, Lucide |
| Engine | TypeScript 6, React Router 7 |
| States | Zustand, Context |
| Forms | React Hook Form, Zod |
| Performance | ESLint, Vitest, Testing Library, Playwright |
| Tooling | Vite 8, SWC, PostCSS |

## Arquitectura Base

```text
src/
├── application/        # UI y logica acotada por feature
├── entities/           # modelos de dominio completos
├── interfaces/         # contratos globales del proyecto
├── components/
│   ├── ui/             # primitives y wrappers base
│   ├── fragments/      # piezas reutilizables de composicion
│   └── core/           # organismos cross-feature
├── layouts/            # shells compartidos
├── pages/              # composicion por ruta
├── zustand/            # estado global por feature
├── data/               # generadores y datasets base
├── hooks/              # hooks reutilizables
├── helpers/            # utilidades transversales
└── lib/                # utilidades base de infraestructura
```

La estructura esta pensada para que el proyecto pueda iniciar como prototipo y seguir creciendo sin volverse caotico. Las pages componen, los layouts resuelven el shell, los features encapsulan logica acotada y los componentes base quedan desacoplados del dominio.

## Ejemplo de estructura aplicada

Un caso posible seria un sistema de reportes de prestamos bancarios, donde esta base se usa para construir un MVP funcional o para validar el diseno de un modulo de analitica antes de integrarlo en una plataforma mayor.

```text
src/
├── application/
│   ├── reports/
│   │   ├── components/
│   │   │   ├── LoanReportTable.tsx
│   │   │   ├── PortfolioSummary.tsx
│   │   │   └── DelinquencyChart.tsx
│   │   ├── fragments/
│   │   │   ├── ReportFilters.tsx
│   │   │   └── ExportActions.tsx
│   │   ├── interfaces/
│   │   │   └── report-filters.interface.ts
│   │   └── services/
│   │       └── reports.service.ts
│   ├── loans/
│   │   ├── components/
│   │   │   ├── LoanStatusCard.tsx
│   │   │   └── LoanTimeline.tsx
│   │   └── helpers/
│   │       └── loan-formatters.ts
│   └── clients/
│       └── components/
│           └── BorrowerProfile.tsx
├── entities/
│   ├── loan.entity.ts
│   ├── borrower.entity.ts
│   └── report.entity.ts
├── interfaces/
│   ├── api-response.interface.ts
│   └── paginated-result.interface.ts
├── pages/
│   ├── Reports.tsx
│   ├── LoanDetail.tsx
│   └── Borrowers.tsx
├── zustand/
│   ├── reports/
│   │   ├── reports.mock.ts
│   │   └── reports.slice.ts
│   └── loans/
│       ├── loans.mock.ts
│       └── loans.slice.ts
└── data/
	└── mockReports.ts
```

En ese escenario, `entities/` define el dominio financiero, `application/reports/` concentra la experiencia del modulo de reportes, `zustand/reports/` resuelve el estado compartido y `interfaces/` mantiene contratos tecnicos reutilizables. Si el objetivo fuera solo validar diseno, esa misma estructura permite trabajar con mocks realistas y entregar una referencia navegable lista para trasladarse despues a un frontend de mayor escala.

## Sistema Visual

- Design tokens primitivos definidos en `src/index.css`.
- Dark mode por clase con `dark:` de Tailwind.
- Integracion de shadcn/ui alineada con `components.json`.
- Base preparada para iterar color, spacing, tipografia, radios, sombras, overlays y jerarquia visual sin afectar la consistencia.


## Primeros Pasos

Ejemplo con Bun:

```bash
bun install
bun dev
```

Tambien es posible ejecutar los scripts con cualquier gestor de paquetes compatible.

## Scripts Disponibles

| Script | Descripcion |
|---|---|
| `dev` | Levanta el entorno local con Vite |
| `build` | Genera el build de produccion |
| `build:dev` | Genera un build en modo development |
| `lint` | Ejecuta ESLint |
| `test` | Ejecuta Vitest una vez |
| `test:watch` | Ejecuta Vitest en modo watch |
| `preview` | Sirve el build localmente |

## Idea Central

ai-frontend-kit-lite no es una aplicacion cerrada ni una plantilla atada a una vertical concreta. Es un punto de partida con dos salidas claras: convertirse en el frontend real de un producto pequeño o mediano, o funcionar como un espacio de diseño navegable cuyas decisiones visuales se trasladan a un proyecto de mayor escala. En ambos casos, la base es moderna, reutilizable y lo suficientemente flexible como para avanzar rapido sin sacrificar estructura.
