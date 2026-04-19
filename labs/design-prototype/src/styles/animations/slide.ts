//* @type Helper
//* @context Global
//* @utility Slide animation variants para motion components — entrada/salida desde los bordes.

import type { Variants } from "motion/react"

//* Slide desde la izquierda — sidebars, paneles laterales.
export const slideLeft: Variants = {
   hidden: { x: "-100%", opacity: 0 },
   visible: { x: 0, opacity: 1 },
   exit: { x: "-100%", opacity: 0 },
}

//* Slide desde la derecha — paneles, sheets.
export const slideRight: Variants = {
   hidden: { x: "100%", opacity: 0 },
   visible: { x: 0, opacity: 1 },
   exit: { x: "100%", opacity: 0 },
}

//* Slide desde abajo — modales, toasts, bottom sheets.
export const slideUp: Variants = {
   hidden: { y: "100%", opacity: 0 },
   visible: { y: 0, opacity: 1 },
   exit: { y: "100%", opacity: 0 },
}

//* Slide desde arriba — dropdowns, notificaciones.
export const slideDown: Variants = {
   hidden: { y: "-100%", opacity: 0 },
   visible: { y: 0, opacity: 1 },
   exit: { y: "-100%", opacity: 0 },
}
