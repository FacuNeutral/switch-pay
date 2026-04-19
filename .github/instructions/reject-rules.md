
- evita leer objetos y volverlos a desturucrar. con zustand debes ser lo más directo posible al usa un useStore

```ts
  const { modals, close } = useModalManagerStore();
  const { isOpen, payload: video } = modals.video;
  ```

- las acciones si puedes destructurarlas, pero el estado no, porque si lo haces, el componente se va a volver a renderizar cada vez que cambie cualquier parte del estado, aunque no sea la parte que estás usando

```ts
const isOpen = useModalManagerStore((s) => s.modals.video.isOpen);
  const video = useModalManagerStore((s) => s.modals.video.payload);
  const close = useModalManagerStore((s) => s.close);
```
- si seleccionas 2+ propiedades del mismo slice, o mezclas estado y acciones, usa `useShallow` para combinarlo todo en un único selector. Evita múltiples llamadas a `useStore` que disparan renders independientes.

```ts
import { useShallow } from "zustand/react/shallow";

const { isOpen, video, close } = useModalManagerStore(
  useShallow((s) => ({
    isOpen: s.modals.video.isOpen,
    video: s.modals.video.payload,
    close: s.close,
  }))
);
```

Si solo necesitas propiedades del mismo slice (sin mezclar acciones), también es válido:

```ts
const { isOpen, payload: video } = useModalManagerStore((s) => s.modals.video);
const close = useModalManagerStore((s) => s.close);
```



- cuando en el JSX aparecen comentarios que actúan como títulos de sección (`{/* Backdrop */}`, `{/* Modal panel */}`, `{/* Info + close */}`), es una señal clara de que ese bloque merece ser su propio componente. Evalúa extraerlo antes de dejarlo comentado.

```tsx
// ❌ comentarios como separadores de sección
return (
  <>
    {/* Backdrop */}
    <motion.div ... />

    {/* Modal panel */}
    <motion.div ...>
      ...
    </motion.div>
  </>
);

// ✅ componentes explícitos
return (
  <>
    <ModalBackdrop onClose={onClose} />
    <ModalPanel video={video} onClose={onClose} />
  </>
);
```

- prohibir prácitcas donde se usa un ternario anidado en el DOM.

- evita wrappers verbosos de funciones cuando la reducción es trivial. Si la llamada resultante es igual de legible, úsala directamente como inline o pásala tal cual.

```ts
// ❌ innecesario
const closeModal = () => close("video");
<button onClick={closeModal} />

// ✅ directo
<button onClick={() => close("video")} />
```





guardrails:
- no cambiar estructura base
- solo props / variants / fragments