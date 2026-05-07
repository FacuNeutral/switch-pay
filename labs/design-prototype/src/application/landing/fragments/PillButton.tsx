//* @type Fragment
//* @context Landing
//* @utility CTA pill blanco con flecha opcional (estilo editorial-dark).

import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   variant?: "white" | "primary" | "ghost";
   trailingIcon?: boolean;
   asLink?: boolean;
   href?: string;
}

export default function PillButton({
   variant = "white",
   trailingIcon = false,
   asLink = false,
   href,
   children,
   className,
   ...props
}: PillButtonProps) {
   const styles =
      variant === "white"
         ? "bg-text-hi text-canvas hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-12px_rgba(244,248,247,0.45)]"
      : variant === "primary"
         ? "bg-primary text-canvas hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-12px_var(--color-primary-glow)]"
      : "bg-transparent text-text-hi border border-hairline hover:border-hairline-strong";

   const base = cn(
      "inline-flex items-center gap-2 rounded-pill px-5 py-2.5 text-sm font-medium",
      "transition-[transform,background-color,border-color,box-shadow] duration-[var(--dur-fast)] ease-[var(--ease-out)]",
      "active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
      styles,
      className,
   );

   const inner = (
      <>
         <span>{children}</span>
         {trailingIcon && <ArrowRight className="h-4 w-4" strokeWidth={1.75} />}
      </>
   );

   if (asLink) {
      return (
         <a href={href ?? "#"} className={base}>
            {inner}
         </a>
      );
   }

   return (
      <button type="button" className={base} {...props}>
         {inner}
      </button>
   );
}
