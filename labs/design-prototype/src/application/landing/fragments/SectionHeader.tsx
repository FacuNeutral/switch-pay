//* @type Fragment
//* @context Landing
//* @utility Header de seccion: eyebrow + display + lead opcional. Aplica stack ghost si se pasan extra lines.

import { cn } from "@/lib/utils";
import Eyebrow from "./Eyebrow";

interface SectionHeaderProps {
   eyebrow?: string;
   title: React.ReactNode;
   ghostLines?: string[];
   lead?: React.ReactNode;
   align?: "left" | "center";
   className?: string;
   size?: "md" | "lg";
}

export default function SectionHeader({
   eyebrow,
   title,
   ghostLines,
   lead,
   align = "left",
   size = "md",
   className,
}: SectionHeaderProps) {
   const display =
      size === "lg"
         ? "text-display text-[clamp(48px,8vw,112px)]"
         : "text-display text-[clamp(36px,5.5vw,72px)]";

   return (
      <header
         className={cn(
            "flex flex-col gap-6",
            align === "center" && "items-center text-center",
            className,
         )}
      >
         {eyebrow && <Eyebrow align={align}>{eyebrow}</Eyebrow>}

         <h2 className={cn(display, "text-text-hi")}>
            {title}
            {ghostLines?.map((line, i) => (
               <span
                  key={line + i}
                  className="block"
                  style={{ color: i === 0 ? "rgba(244,248,247,0.30)" : "rgba(244,248,247,0.12)" }}
               >
                  {line}
               </span>
            ))}
         </h2>

         {lead && (
            <p
               className={cn(
                  "max-w-[52ch] text-base text-text-mid sm:text-lg",
                  align === "center" && "mx-auto",
               )}
            >
               {lead}
            </p>
         )}
      </header>
   );
}
