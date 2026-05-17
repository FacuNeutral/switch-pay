//* @type Fragment
//* @context Landing
//* @utility Overlay de granulado SVG feTurbulence. Ajustable via opacity y frequency.

import { useId } from "react";
import { cn } from "@/lib/utils";

interface GrainOverlayProps {
   /** Intensidad del grano visible. Default: 0.08 */
   opacity?: number;
   /** Densidad del grano (frecuencia feTurbulence). Default: 0.65 */
   frequency?: number;
   className?: string;
}

export default function GrainOverlay({
   opacity = 0.08,
   frequency = 0.65,
   className,
}: GrainOverlayProps) {
   const id = useId();

   return (
      <svg
         className={cn("pointer-events-none absolute inset-0 w-full h-full", className)}
         xmlns="http://www.w3.org/2000/svg"
         aria-hidden
      >
         <filter id={id}>
            <feTurbulence
               type="fractalNoise"
               baseFrequency={frequency}
               numOctaves={4}
               stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
         </filter>
         <rect width="100%" height="100%" filter={`url(#${id})`} opacity={opacity} />
      </svg>
   );
}
