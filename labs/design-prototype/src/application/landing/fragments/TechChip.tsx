//* @type Fragment
//* @context Landing
//* @utility Chip rectangular mono uppercase (tag tecnico). Variante con dot pulse.

import { cn } from "@/lib/utils";

interface TechChipProps {
   children: React.ReactNode;
   live?: boolean;
   className?: string;
}

export default function TechChip({ children, live, className }: TechChipProps) {
   return (
      <span
         className={cn(
            "inline-flex items-center gap-2 rounded-sm border border-hairline px-2.5 py-1",
            "font-mono text-[11px] uppercase tracking-[0.12em] text-text-low",
            className,
         )}
      >
         {live && (
            <span className="relative inline-flex h-1.5 w-1.5">
               <span className="absolute inset-0 rounded-full bg-primary anim-dot-pulse" />
               <span className="relative h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
         )}
         {children}
      </span>
   );
}
