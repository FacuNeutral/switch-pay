//* @type Fragment
//* @context Landing
//* @utility Bloque de metrica: numero gigante + caption.

import { cn } from "@/lib/utils";

interface StatBlockProps {
   value: string;
   label: string;
   suffix?: string;
   className?: string;
   align?: "left" | "center";
}

export default function StatBlock({ value, label, suffix, className, align = "left" }: StatBlockProps) {
   return (
      <div className={cn("flex flex-col gap-2", align === "center" && "items-center text-center", className)}>
         <p className="text-display text-[clamp(36px,4.5vw,56px)] text-text-hi">
            {value}
            {suffix && <span className="text-text-low">{suffix}</span>}
         </p>
         <p className="font-mono text-xs uppercase tracking-[0.14em] text-text-low">{label}</p>
      </div>
   );
}
