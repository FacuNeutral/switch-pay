//* @type Lib
//* @context Global
//* @utility Barrel export de todos los motion animation presets.

export { spring, springBouncy, fast, smooth, slow } from "./transitions"

export { fade, fadeUp, fadeDown, fadeLeft, fadeRight } from "./fade"

export { scaleIn, popIn, hoverScale, hoverScaleSubtle } from "./scale"

export { slideLeft, slideRight, slideUp, slideDown } from "./slide"

export { pulse, spin, shimmer } from "./loading"

export {
   staggerContainer,
   staggerItem,
   staggerFastContainer,
   staggerScaleItem,
} from "./stagger"
