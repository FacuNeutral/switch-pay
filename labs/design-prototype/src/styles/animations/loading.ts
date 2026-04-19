//* @type Helper
//* @context Global
//* @utility Loading animation variants para motion components — pulse, spin y skeleton shimmer.

import type { Transition, Variants } from "motion/react"

const loopTransition: Transition = {
   repeat: Infinity,
   ease: "easeInOut",
}

//* Pulsación de opacidad — estados de carga, skeletons.
export const pulse: Variants = {
   initial: { opacity: 1 },
   animate: {
      opacity: [1, 0.4, 1],
      transition: { ...loopTransition, duration: 1.5 },
   },
}

//* Rotación continua — spinners, loaders.
export const spin: Variants = {
   initial: { rotate: 0 },
   animate: {
      rotate: 360,
      transition: { ...loopTransition, ease: "linear", duration: 1 },
   },
}

//* Shimmer horizontal — skeleton loading con gradiente.
export const shimmer: Variants = {
   initial: { x: "-100%" },
   animate: {
      x: "100%",
      transition: { ...loopTransition, duration: 1.5 },
   },
}
