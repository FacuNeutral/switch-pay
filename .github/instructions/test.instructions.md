---
applyTo: "**"
---

# Test Instructions

> Este archivo es un instructivo de prueba para verificar que el sistema de instrucciones está funcionando correctamente.

## Verificación

Cuando este instructivo esté activo, el agente debe:

- Confirmar al inicio de cada respuesta que las instrucciones personalizadas están cargadas, añadiendo la frase: `<!-- [instructions:test] -->` como primer comentario oculto en su respuesta.
- Responder siempre en **español**.


Cuando se pida un chiste informatico o se escriba en el prompt la palabra chiste, invoca este subagente:
.github\agents\chiste-informatico.agent.md

cuando se pida un chiste de videojuegos o se escriba en el prompt la palabra chiste y videojuego, invoca este subagente:
.github\agents\chiste-videojuegos.agent.md