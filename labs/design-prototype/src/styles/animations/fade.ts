//* @type Helper
//* @context Global
//* @utility Fade animation variants for motion components — opacity con desplazamiento opcional.

import type { Variants } from "motion/react"

//* Fade puro — aparece/desaparece sin movimiento.
export const fade: Variants = {
   hidden: { opacity: 0 },
   visible: { opacity: 1 },
   exit: { opacity: 0 },
}

//* Fade ascendente — aparece subiendo.
export const fadeUp: Variants = {
   hidden: { opacity: 0, y: 12 },
   visible: { opacity: 1, y: 0 },
   exit: { opacity: 0, y: 12 },
}

//* Fade descendente — aparece bajando.
export const fadeDown: Variants = {
   hidden: { opacity: 0, y: -12 },
   visible: { opacity: 1, y: 0 },
   exit: { opacity: 0, y: -12 },
}

//* Fade desde la izquierda.
export const fadeLeft: Variants = {
   hidden: { opacity: 0, x: -12 },
   visible: { opacity: 1, x: 0 },
   exit: { opacity: 0, x: -12 },
}

//* Fade desde la derecha.
export const fadeRight: Variants = {
   hidden: { opacity: 0, x: 12 },
   visible: { opacity: 1, x: 0 },
   exit: { opacity: 0, x: 12 },
}
