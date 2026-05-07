//* @type Fragment
//* @context Landing
//* @utility Placeholder visual con marco hairline + grilla de cuadrante. Indica el tipo de imagen sugerida.

import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
   label: string;
   description?: string;
   ratio?: "square" | "portrait" | "landscape" | "tall" | "panorama";
   src?: string;
   alt?: string;
   tone?: "primary" | "accent";
   className?: string;
}

const ratioClass: Record<NonNullable<ImagePlaceholderProps["ratio"]>, string> = {
   square: "aspect-square",
   portrait: "aspect-[3/4]",
   landscape: "aspect-[16/10]",
   tall: "aspect-[4/5]",
   panorama: "aspect-[21/9]",
};

export default function ImagePlaceholder({
   label,
   description,
   ratio = "square",
   src,
   alt,
   tone = "primary",
   className,
}: ImagePlaceholderProps) {
   const glow =
      tone === "primary"
         ? "before:bg-[radial-gradient(closest-side,var(--color-primary-glow),transparent_70%)]"
         : "before:bg-[radial-gradient(closest-side,var(--color-accent-glow),transparent_70%)]";

   return (
      <figure
         className={cn(
            "relative w-full overflow-hidden rounded-md border border-hairline bg-surface",
            "before:absolute before:-inset-12 before:-z-0 before:opacity-60 before:blur-3xl before:content-['']",
            "anim-glow-pulse",
            ratioClass[ratio],
            glow,
            className,
         )}
      >
         {src ? (
            <img
               src={src}
               alt={alt ?? label}
               className="absolute inset-0 h-full w-full object-cover anim-breath"
               loading="lazy"
            />
         ) : (
            <>
               {/* Quadrant grid — solo en placeholder vacio */}
               <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                  <div className="border-b border-r border-hairline/50" />
                  <div className="border-b border-hairline/50" />
                  <div className="border-r border-hairline/50" />
                  <div />
               </div>
               <div className="absolute left-1/2 top-1/2 h-px w-12 -translate-x-1/2 -translate-y-1/2 bg-text-low/40" aria-hidden />
            </>
         )}

         <figcaption className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 border-t border-hairline bg-canvas/80 px-4 py-3 backdrop-blur">
            <div className="min-w-0">
               <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-low">
                  Imagen sugerida
               </p>
               <p className="truncate text-sm text-text-hi">{label}</p>
               {description && (
                  <p className="mt-0.5 truncate text-xs text-text-mid">{description}</p>
               )}
            </div>
            <span className="font-mono text-[10px] text-text-low">{ratio.toUpperCase()}</span>
         </figcaption>
      </figure>
   );
}
