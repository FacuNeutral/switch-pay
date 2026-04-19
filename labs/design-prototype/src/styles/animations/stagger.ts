//* @type Helper
//* @context Global
//* @utility Stagger animation variants para listas y grids — contenedor + item.

import type { Variants } from "motion/react"

//* Contenedor con stagger estándar — grids de cards, listas.
export const staggerContainer: Variants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: {
         staggerChildren: 0.06,
         delayChildren: 0.1,
      },
   },
}

//* Item de stagger — sube con fade desde abajo.
export const staggerItem: Variants = {
   hidden: { opacity: 0, y: 12 },
   visible: { opacity: 1, y: 0 },
}

//* Contenedor con stagger rápido — listas largas con muchos items.
export const staggerFastContainer: Variants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: {
         staggerChildren: 0.03,
      },
   },
}

//* Item de stagger con scale — entrada más enfática.
export const staggerScaleItem: Variants = {
   hidden: { opacity: 0, scale: 0.9 },
   visible: { opacity: 1, scale: 1 },
}
