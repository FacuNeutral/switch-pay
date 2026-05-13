//* @type Fragment
//* @context Landing
//* @utility Header de seccion: eyebrow + display + lead opcional. Aplica stack ghost si se pasan extra lines.

import { cn } from "@/lib/utils";
import Eyebrow from "./Eyebrow";

interface SectionHeaderProps {
   eyebrow?: string;
   title: React.ReactNode;
   titleLines?: string[];
   ghostLines?: string[];
   lead?: React.ReactNode;
   align?: "left" | "center";
   className?: string;
   size?: "md" | "lg";
   as?: "h1" | "h2";
}

export default function SectionHeader({
   eyebrow,
   title,
   titleLines,
   ghostLines,
   lead,
   align = "left",
   size = "md",
   as: Heading = "h2",
   className,
}: SectionHeaderProps) {
   const display =
      size === "lg"
         ? "text-display text-5xl leading-tight tracking-tight lg:text-6xl"
         : "text-display text-4xl leading-tight tracking-tight lg:text-5xl";

   return (
      <header
         className={cn(
            "flex flex-col gap-7",
            align === "center" && "items-center text-center",
            className,
         )}
      >
         {eyebrow && <Eyebrow align={align}>{eyebrow}</Eyebrow>}

         <Heading className={cn(display, "w-full text-text-hi")}>
            {title}
            {titleLines?.map((line, i) => (
               <span key={line + i} className="block">
                  {line}
               </span>
            ))}
            {ghostLines?.map((line, i) => (
               <span
                  key={line + i}
                  className="block"
                  style={{ color: i === 0 ? "rgba(244,248,247,0.50)" : "rgba(244,248,247,0.40)" }}
               >
                  {line}
               </span>
            ))}
         </Heading>

         {lead && (
            <p
               className={cn(
                  "max-w-[80ch] text-base text-text-mid sm:text-lg",
                  align === "center" && "mx-auto",
               )}
            >
               {lead}
            </p>
         )}
      </header>
   );
}
