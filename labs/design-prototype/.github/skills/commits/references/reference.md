# Commits — Reference

Reglas completas para crear commits claros, atomicos y convencionales. Aplican a cualquier area del workspace.

## Idioma de escritura

- commit name: `english`
- commit description: `english`
- assistant response: `spanish`

## Configuracion

- auto create issue: `true`

## Versionado (semver)

### Formato

`MAJOR.MINOR.PATCH` (z.y.x)

### Reglas generales

- La version vive en `package.json` → campo `version`.
- **MAJOR (z) NO se modifica automaticamente bajo ninguna circunstancia.**
- Si se detecta un `BREAKING CHANGE` o `!`:
  - ❌ NO modificar MAJOR.
  - ✅ Reportar: `"breaking change detectado"`.
  - ✅ Continuar evaluacion como si fuera MINOR.

### Tipos y su impacto en version

#### Incrementan version

| Tipo     | Bump    |
| -------- | ------- |
| `feat`   | MINOR   |
| `fix`    | PATCH   |
| `style`  | PATCH   |

#### Pueden afectar PATCH (solo si impactan comportamiento)

| Tipo       | Condicion                                      |
| ---------- | ---------------------------------------------- |
| `perf`     | PATCH si hay mejora observable                 |
| `refactor` | PATCH solo si afecta comportamiento externo; si no → ignorar |

#### NO afectan version

| Tipo     | Accion   |
| -------- | -------- |
| `docs`   | ignorar  |
| `test`   | ignorar  |
| `chore`  | ignorar  |
| `agent`  | ignorar  |
| `revert` | evaluar segun el commit revertido |

### Seleccion del incremento

- Elegir **el mayor impacto presente**: `feat > fix > otros`.
- Ejemplo: `feat + fix` → MINOR. Multiples `fix` → PATCH.
- **Nunca acumular incrementos**:
  - ❌ 2 feat → NO es +2 MINOR.
  - ❌ 5 fix → NO es +5 PATCH.
- Evaluar el **impacto real**, no la cantidad de commits. Agrupar como una sola release.

### Reset de version

- Si sube MINOR → PATCH se resetea a 0 (ej. `1.2.3` → `1.3.0`).
- MAJOR nunca cambia automaticamente.

### Sufijo `-alpha`

- Si `src/application/` **tiene contenido** (carpetas o archivos) → la version lleva sufijo `-alpha` (ej. `1.2.0-alpha`).
- Si `src/application/` **esta vacio o no existe** → la version **no lleva** sufijo alpha (ej. `1.2.0`).
- Verificar el estado de `src/application/` antes de cada commit para determinar el sufijo.

### Flujo de version en commit

1. Leer version actual de `package.json`.
2. Determinar bump (MINOR o PATCH) segun el tipo de mayor impacto del commit.
3. Si hay breaking change → reportar flag, tratar como MINOR.
4. Aplicar reset: si MINOR sube, PATCH → 0.
5. Verificar si `src/application/` tiene contenido → aplicar o quitar `-alpha`.
6. Actualizar `package.json` con la nueva version.
7. Incluir el cambio de version en el mismo commit.

### Salida obligatoria del calculo de version

1. Incremento: `MINOR` o `PATCH`.
2. Nueva version (respetando MAJOR actual).
3. Flags: `"breaking change detectado"` (si aplica).
4. Justificacion breve.

### Prohibiciones

- ❌ No modificar MAJOR automaticamente.
- ❌ No acumular versiones por cantidad de commits.
- ❌ No considerar `docs`, `test`, `chore`, `agent` como cambios versionables.
- ❌ No generar versiones inconsistentes (ej: `1.2.3` → `1.3.4`).

## Formato obligatorio

```
<TYPE>(<scope>): <description>

# Tasks
- ...

# Context
- ...

# Impact
- ...
```

## Types

| Tipo       | Uso                   |
| ---------- | --------------------- |
| `feat`     | nueva funcionalidad   |
| `fix`      | correccion de bug     |
| `refactor` | mejora interna        |
| `perf`     | mejora de performance |
| `docs`     | documentacion, cambios en archivos .md o ./copilot/** |
| `style`    | formato / estilos     |
| `test`     | testing               |
| `chore`    | tareas internas       |
| `agent`    | actualizaciones o nuevas caracteristicas del entorno del agente: skills, instructions, tools, hooks, prompts, y cualquier documentacion especifica para controlar el comportamiento del LLM |

## Reglas de descripcion

- Maximo 200 caracteres.
- Verbo en presente imperativo (`add`, `fix`, `remove`).
- Sin punto final.
- 1 commit = 1 intencion.

## Prioridad de tipos

```
fix > feat > refactor > perf > docs > style > chore > agent
```

El tipo principal es el de mayor impacto.

## Multi-type commits

### Si NO se puede dividir (cambios acoplados)

Usar el tipo de mayor prioridad como `PRIMARY_TYPE` y agrupar tasks por tipo:

```
<PRIMARY_TYPE>(<scope>): <description>

# Tasks

## fix
- ...

## feat
- ...

# Context
- ...

# Impact
- ...
```

## Flujo paso a paso

### Step 1 — Ver cambios

```bash
git status
```

Verificar archivos modificados y nuevos.

### Step 2 — Analizar cambios automaticamente

- ¿Es una feature? → `feat`
- ¿Es un bug? → `fix`
- ¿Hay multiples cambios? → intentar separar commits.

### Step 3 — Preparar staging

```bash
git add .
```

Siempre usar `git add .`. No usar staging selectivo ni rutas individuales.

### Step 4 — Crear commit

```bash
git commit
```

Escribir mensaje siguiendo el formato obligatorio.

### Step 5 — Validacion

Checklist:

- [ ] ¿1 sola intencion?
- [ ] ¿Tipo correcto?
- [ ] ¿Descripcion clara y ≤ 200 chars?
- [ ] ¿Tasks explican el cambio?
- [ ] ¿Context explica el por que?

### Step 6 — Subir cambios

```bash
git push origin <branch>
```

## Creacion automatica de issues

Solo si `auto create issue: true`. Despues de un push exitoso:

1. **Verificar y crear labels faltantes** con `gh label list` y `gh label create`:
   - `@auto-generated` → `#0075ca` — "Auto-generated by Copilot"
   - `agent` → `#7057ff` — "Commit type: agent"
   - `feat` → `#0e8a16` — "Commit type: feat"
   - `fix` → `#d73a4a` — "Commit type: fix"
   - `refactor` → `#e4e669` — "Commit type: refactor"
   - `perf` → `#f9ca24` — "Commit type: perf"
   - `docs` → `#1d76db` — "Commit type: docs"
   - `style` → `#cc6ed9` — "Commit type: style"
   - `test` → `#8b949e` — "Commit type: test"
   - `chore` → `#6e7681` — "Commit type: chore"

2. **Un solo grupo de tasks** (un solo tipo):
   - Crear una issue para el commit.
   - Titulo: `[<TYPE>] <description>`.
   - Body: Tasks, Context e Impact del commit.
   - Labels: `@auto-generated`, `<TYPE>`.

3. **Multiples grupos de tasks** (multi-type):
   - Crear una issue **separada por cada grupo de tipo**.
   - Titulo de cada issue: `[<TYPE>] <description>`.
   - Body: solo las tasks del grupo correspondiente, mas Context e Impact.
   - Labels: `@auto-generated`, `<TYPE>` del grupo.

4. Asignar al usuario que pushea.
5. Agregar un comentario obligatorio en **ingles**: `resolved on commit <short-sha> (<commit description>)`.
6. Cerrar cada issue automaticamente al crearla.

## Anti-patrones

- Commits grandes con multiples intenciones.
- Descripciones vagas (`fix stuff`, `update`).
- Mezclar logica distinta en un solo commit.
- No explicar contexto ni impacto.
- Commits sin estructura.

## Buenas practicas

- Commits pequeños y claros.
- Usar convenciones estandar.
- Explicar el "por que" en Context.
- Separar responsabilidades.
- Mantener historial limpio.

## Ejemplo

```
fix(product-card): resolve price rendering and add fallback

# Tasks

## fix
- Fix price rendering when value is null
- Prevent UI break on missing currency

## feat
- Add fallback price label ("Contact")
- Introduce reusable price formatter

# Context
- Bug occurred when products had incomplete data
- Required adding fallback logic tightly coupled with fix

# Impact
- Fixes broken UI in product cards
- Improves resilience of pricing system
- No breaking changes
```
