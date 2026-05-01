---
name: ssh-node-exec
description: 'Flujo obligatorio para ejecutar comandos Node.js, npm, npx, ts-node, bun, vitest, playwright o cualquier script de testing y build en este workspace usando una sesión remota por SSH. USA ESTE SKILL solo cuando necesites testear, usar la consola o acceder al proyecto montado. NUNCA sincronices el proyecto ni uses copias locales: extrae root y pasword desde .github/skills/ssh-node-exec/.env, conectate por ssh y ejecuta todo desde esa terminal persistente. Triggers: run, execute, test, build, install, npm, node, npx, bun, vitest, playwright, ts-node, ssh, terminal, consola, proyecto montado, mounted project.'
argument-hint: 'Describe qué comando querés ejecutar en el proyecto remoto o qué validación de consola necesitás.'
---

# SSH Node Exec

## When to Use

- Cuando necesites correr comandos de consola sobre el proyecto montado.
- Para `npm run <script>`, `npm test`, `npm install`, `npm ci`, `node`, `npx`, `tsx`, `bun`, `vitest`, `playwright` o comandos equivalentes.
- Cuando el trabajo requiera testear, compilar, instalar dependencias o inspeccionar el proyecto desde terminal.
- Cuando haya que acceder al proyecto montado en otra PC por SSH.

## Do Not Use

- Para leer o editar archivos del workspace local.
- Para tareas que no requieran consola ni acceso al proyecto montado.
- Para crear sincronizaciones, mirrors o copias locales del repo.

## Credentials Source

Las credenciales viven en `.github/skills/ssh-node-exec/.env`.

Formato esperado:

```text
root: <usuario@host>
pasword: <password>
```

Extraer exactamente `root` y `pasword` antes de abrir la sesión.

## Terminal Types

Siempre se mantienen **dos terminales SSH** activas durante una sesión de trabajo:

| Tipo   | Uso                                                          | Ciclo de vida        |
| ------ | ------------------------------------------------------------ | -------------------- |
| `NODE` | Servidores y procesos de larga duración (`npm run dev`, etc.) | Persiste toda la sesión |
| `SYNC` | Scripts, tests y comandos que terminan solos                  | Reutilizable entre tareas |

Ambas terminales se abren en `mode=async` para que queden **visibles y activas** en el panel de VS Code.

## Terminal Reuse (Session Memory)

Antes de crear cualquier terminal, leer `/memories/session/ssh-terminals.md`:

- Si el archivo **existe** y contiene el ID del tipo necesario → **reutilizar esa terminal** con `send_to_terminal`.
- Si el archivo **no existe** o falta el tipo → crear la terminal con el script y **guardar su ID** en `/memories/session/ssh-terminals.md`.
- Si el ID existe pero la terminal ya no responde → recrearla y actualizar el archivo.

Formato del archivo de sesión:

```markdown
## NODE
id: <terminal-id>

## SYNC
id: <terminal-id>
```

## Procedure

1. **Leer credenciales** desde `.github/skills/ssh-node-exec/.env` → extraer `root` y `pasword`.
2. **Comprobar session memory** en `/memories/session/ssh-terminals.md`:
   - Si el tipo de terminal necesario ya tiene ID → saltar al paso 7.
   - Si no → continuar.
3. **Crear la(s) terminal(es) faltante(s)** con `run_in_terminal` en `mode=async` ejecutando el script:

   ```powershell
   .github\skills\ssh-node-exec\references\ssh-connect.ps1 -domain "<root>" -pass "<pasword>" -path "D:\Programacion_Extra\ldl"
   ```

   - Si se necesita `NODE` y `SYNC` a la vez, crear ambas en el mismo paso (llamadas paralelas al script).
4. **Guardar los IDs** devueltos por `run_in_terminal` en `/memories/session/ssh-terminals.md`.
5. **Verificar autenticación** con `get_terminal_output`:
   - Si el output contiene `password:` → enviar la contraseña con `send_to_terminal` usando `pasword` del `.env`.
   - Si el output contiene el prompt remoto (`user@host>`) → autenticación exitosa, continuar.
6. **Confirmar path remoto**: el prompt debe mostrar la ruta configurada. Si no, navegar con `send_to_terminal`:
   ```
   cd /d "D:\Programacion_Extra\ldl"
   ```
7. **Ejecutar comandos** en la terminal apropiada:
   - Procesos largos (`npm run dev`, servidores) → terminal `NODE`.
   - Scripts o tests que terminan → terminal `SYNC`.
8. **No cerrar terminales** salvo que el usuario lo pida explícitamente.

## Session Rules

- Mantener **dos terminales SSH activas** (`NODE` y `SYNC`) durante toda la sesión de trabajo.
- **Siempre comprobar session memory antes de crear** una terminal nueva — nunca crear duplicados.
- No ejecutar `npm`, `node`, `npx`, `bun`, `vitest`, `playwright` ni scripts del proyecto fuera de la sesión remota.
- Toda interacción con prompts se maneja **prompt a prompt** via `send_to_terminal`, leyendo output entre cada envío.
- Si una terminal se cierra o pierde conexión, recrearla con el script y **actualizar** el ID en session memory.

## Example

```powershell
# 1. Leer .github/skills/ssh-node-exec/.env → root=dev@192.168.1.32, pasword=funter

# 2. Comprobar /memories/session/ssh-terminals.md
#    → no existe todavía: crear ambas terminales

# 3a. Crear terminal NODE (modo async — visible en VS Code)
run_in_terminal mode=async:
  .github\skills\ssh-node-exec\references\ssh-connect.ps1 -domain "dev@192.168.1.32" -pass "funter" -path "D:\Programacion_Extra\ldl"
# → devuelve id=abc-111  (guardar en session memory como NODE)

# 3b. Crear terminal SYNC (modo async — visible en VS Code)
run_in_terminal mode=async:
  .github\skills\ssh-node-exec\references\ssh-connect.ps1 -domain "dev@192.168.1.32" -pass "funter" -path "D:\Programacion_Extra\ldl"
# → devuelve id=abc-222  (guardar en session memory como SYNC)

# 4. Si alguna terminal muestra "password:"
send_to_terminal id=abc-111: funter

# 5. Ejecutar en la terminal correcta
# Servidor  → NODE (id=abc-111)
send_to_terminal id=abc-111: cd client && npm run dev

# Test/script → SYNC (id=abc-222)
send_to_terminal id=abc-222: npm test
```

## Required Output

- Confirmación de que la sesión SSH quedó establecida.
- Ruta remota del proyecto usada para ejecutar comandos.
- Resultado del comando o test ejecutado.
- Si falló la autenticación o no se encontró el proyecto montado, reportarlo claramente.