//* @type Helper
//* @context Global
//* @utility Transition presets aligned with design system duration tokens for motion components.

import type { Transition } from "motion/react"

//* Spring estándar — interacciones de UI responsivas.
export const spring: Transition = {
   type: "spring",
   stiffness: 400,
   damping: 30,
}

//* Spring con rebote — feedback visible en interacciones.
export const springBouncy: Transition = {
   type: "spring",
   stiffness: 300,
   damping: 20,
}

//* Tween rápido — microinteracciones (120ms).
export const fast: Transition = {
   type: "tween",
   ease: "easeInOut",
   duration: 0.12,
}

//* Tween estándar — transiciones de UI (240ms).
export const smooth: Transition = {
   type: "tween",
   ease: "easeInOut",
   duration: 0.24,
}

//* Tween lento — transiciones deliberadas (400ms).
export const slow: Transition = {
   type: "tween",
   ease: "easeInOut",
   duration: 0.4,
}
