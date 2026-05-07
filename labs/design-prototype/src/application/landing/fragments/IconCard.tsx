//* @type Fragment
//* @context Landing
//* @utility Card con icono cuadrado hairline + titulo + descripcion. Hover ilumina el icono.

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconCardProps {
   icon: LucideIcon;
   title: string;
   description: string;
   tag?: string;
   className?: string;
}

export default function IconCard({ icon: Icon, title, description, tag, className }: IconCardProps) {
   return (
      <article
         className={cn(
            "card-editorial group flex h-full flex-col gap-5 rounded-md p-6 sm:p-7",
            "hover:border-primary hover:shadow-[0_0_0_1px_var(--color-primary),0_0_32px_-8px_var(--color-primary-glow),0_30px_60px_-40px_rgba(0,0,0,0.7)] hover:-translate-y-1",
            className,
         )}
      >
         <div className="flex items-start justify-between">
            <span
               className={cn(
                  "inline-flex h-9 w-9 items-center justify-center rounded-sm border border-hairline text-text-mid",
                  "transition-colors duration-[var(--dur-base)] ease-[var(--ease-out)]",
                  "group-hover:border-primary group-hover:bg-[rgba(21,185,129,0.06)] group-hover:text-primary",
               )}
            >
               <Icon className="h-4 w-4" strokeWidth={1.5} />
            </span>
            {tag && (
               <span className="rounded-sm border border-hairline bg-canvas/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-text-low">
                  {tag}
               </span>
            )}
         </div>

         <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-text-hi">{title}</h3>
            <p className="text-sm leading-relaxed text-text-mid">{description}</p>
         </div>
      </article>
   );
}
