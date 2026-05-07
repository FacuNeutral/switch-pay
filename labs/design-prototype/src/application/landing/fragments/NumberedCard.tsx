//* @type Fragment
//* @context Landing
//* @utility Card numerada (kicker mono + linea hairline + titulo + body).

import { cn } from "@/lib/utils";

interface NumberedCardProps {
   index: string;
   title: string;
   subtitle?: string;
   description: string;
   active?: boolean;
   className?: string;
}

export default function NumberedCard({
   index,
   title,
   subtitle,
   description,
   active,
   className,
}: NumberedCardProps) {
   return (
      <article
         className={cn(
            "card-editorial group relative flex h-full flex-col gap-6 rounded-md p-7 sm:p-8",
            "hover:border-primary hover:shadow-[0_0_0_1px_var(--color-primary),0_0_32px_-8px_var(--color-primary-glow),0_30px_60px_-40px_rgba(0,0,0,0.7)] hover:-translate-y-1",
            active && "border-primary shadow-[0_0_0_1px_var(--color-primary),0_0_32px_-8px_var(--color-primary-glow)]",
            className,
         )}
      >
         <div className="flex items-center gap-4">
            <span
               className={cn(
                  "font-mono text-sm",
                  active ? "text-primary" : "text-text-low",
               )}
            >
               {index}
            </span>
            <span
               className={cn(
                  "h-px flex-1",
                  active ? "bg-primary/60" : "bg-hairline",
               )}
               aria-hidden
            />
         </div>

         <div className="flex flex-col gap-1">
            <h3 className="text-[clamp(28px,3vw,40px)] font-light tracking-tight text-text-hi">
               {title}
            </h3>
            {subtitle && (
               <p className="font-mono text-sm text-text-low">{subtitle}</p>
            )}
         </div>

         <p className="max-w-[28ch] text-sm leading-relaxed text-text-mid">
            {description}
         </p>
      </article>
   );
}
