//* @type Helper
//* @context Global
//* @utility Scale animation variants e interaction presets para motion components.

import type { Variants } from "motion/react"

//* Scale desde 90% — entrada sutil de modales, cards.
export const scaleIn: Variants = {
   hidden: { opacity: 0, scale: 0.9 },
   visible: { opacity: 1, scale: 1 },
   exit: { opacity: 0, scale: 0.9 },
}

//* Pop desde 80% — entrada enfática con resorte.
export const popIn: Variants = {
   hidden: { opacity: 0, scale: 0.8 },
   visible: { opacity: 1, scale: 1 },
   exit: { opacity: 0, scale: 0.8 },
}

//* Scale sutil al hacer hover — cards, thumbnails interactivos.
export const hoverScale = {
   whileHover: { scale: 1.03 },
   whileTap: { scale: 0.97 },
}

//* Scale mínimo al hacer hover — elementos densos como chips, tags.
export const hoverScaleSubtle = {
   whileHover: { scale: 1.01 },
   whileTap: { scale: 0.99 },
}
