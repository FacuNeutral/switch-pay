---
name: commits
description: "Crear, revisar o asistir con git commits convencionales. Cubre formato, tipos, multi-type, versionado semver, flujo guiado y creacion automatica de issues. Usar cuando el usuario mencione commit, git commit, conventional commit, push, version, changelog o staging."
---

# Commits

## When to Use

- Crear o revisar mensajes de commit.
- Asistir con el flujo de commit (status → add → commit → push).
- Detectar tipo, scope y descripcion a partir de cambios en el workspace.
- Validar formato y reglas convencionales.
- Calcular version semver y actualizar `client/package.json`.

## Procedure

1. **Verificar GitHub CLI** — ejecutar `gh auth status`. Si NO esta autenticado, preguntar al usuario: activar (`gh auth login`), o ignorar.
2. Ejecutar `git status` o `git diff --stat` para detectar archivos modificados.
3. Analizar cambios y determinar tipo(s) y scope(s).
4. **Calcular version** — seguir el flujo de versionado definido en [reference.md](reference.md) (leer version actual, calcular bump, verificar alpha, actualizar `client/package.json`).
5. Si hay multiples tipos, preguntar al usuario: commit combinado, commits separados, o respuesta libre.
6. Generar mensaje con formato obligatorio (type, scope, description, Tasks, Context, Impact).
7. Validar contra checklist: 1 intencion, tipo correcto, descripcion ≤ 200 chars, Tasks y Context presentes.
8. Preguntar al usuario para confirmar, editar manualmente, o regenerar.
9. Ejecutar staging con `git add .` (siempre completo, nunca selectivo).
10. Ejecutar commit y sugerir push.
11. Preguntar para confirmar push antes de ejecutarlo.
12. Si el push falla por conflictos, preguntar: cancelar, o forzar con `--force` (con confirmacion adicional).
13. **Crear issues automaticas** — solo si `auto create issue: true`. Despues de push exitoso, preguntar para confirmar. Si se confirma, verificar y crear labels faltantes, luego crear issues segun las reglas en [reference.md](reference.md).

## Required Output

- Mensaje de commit completo siguiendo el formato convencional.
- Tipo correcto segun prioridad (`fix > feat > refactor > perf > docs > style > chore > agent`).
- Tasks, Context e Impact explicitos.
- Si hay multiples tipos acoplados, agrupar Tasks por tipo bajo el PRIMARY_TYPE.
- Version actualizada en `client/package.json` cuando corresponda.

## Reference

Para formato detallado, tipos, reglas de versionado, multi-type strategy, anti-patrones y ejemplos, consultar [reference.md](references/reference.md).
