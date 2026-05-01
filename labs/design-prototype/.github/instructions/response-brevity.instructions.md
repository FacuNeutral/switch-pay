---
name: response-brevity
description: Keep responses concise and direct. For straightforward queries, limit to 3 lines maximum unless complexity demands otherwise. Applies everywhere in the project.
applyTo: "**"
---

# Response Brevity

Mantén todas las respuestas **concisas y directas**.

## Regla Principal

Para cualquier pregunta o tarea:
- **Respuesta simple**: máximo 3 líneas (sin contar código)
- **Respuesta compleja**: explica brevemente por qué requiere más contexto
- Omite introducción innecesaria ("Aquí está...", "Te muestro...") e ir directo al punto

## Ejemplos

❌ **Incorrecto:**
```
"Claro, te ayudaré con esto. Lo que tienes que hacer es lo siguiente:
Primero necesitas entender que las variables tienen tipos, y en TypeScript..."
```

✅ **Correcto:**
```
Variables deben estar tipadas en TypeScript.
Usa `const` por defecto, `let` solo si cambia.
```

## Excepción

- Trabajo multi-paso complejo: anúncialo de inmediato ("Esto toca 3 capas, puede tomar varios pasos")
- Investigación required: explica qué necesitas explorar primero
