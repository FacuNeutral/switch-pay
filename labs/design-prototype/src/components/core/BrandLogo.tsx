//* @type Component
//* @context Branding
//* @utility Logo SwitchPay (isotipo + lockups). SVG inline, hereda currentColor.

import { cn } from "@/lib/utils";

interface BrandLogoProps {
   variant?: "iso" | "horizontal" | "vertical";
   size?: number;
   className?: string;
   tone?: "primary" | "ink" | "white";
}

export default function BrandLogo({
   variant = "horizontal",
   size = 32,
   className,
   tone = "white",
}: BrandLogoProps) {
   const color =
      tone === "primary" ? "text-primary"
      : tone === "white" ? "text-text-hi"
      : "text-text-hi";

   const Mark = (
      <svg viewBox="0 0 48 48" width={size} height={size} className={cn(color, "shrink-0")} fill="none">
         <path d="M14 12 L36 12 L30 22 L8 22 Z"  fill="currentColor" opacity="0.95" />
         <path d="M9 22 L31 22 L25 32 L3 32 Z"  fill="currentColor" opacity="0.85" />
         <path d="M14 32 L36 32 L30 42 L8 42 Z" fill="currentColor" opacity="0.7" />
      </svg>
   );

   if (variant === "iso") {
      return (
         <span className={cn("inline-flex", className)} aria-label="SwitchPay">
            {Mark}
         </span>
      );
   }

   if (variant === "horizontal") {
      return (
         <span className={cn("inline-flex items-center gap-2", className)} aria-label="SwitchPay">
            {Mark}
            <span
               className={cn("font-semibold tracking-tight", color)}
               style={{ fontSize: size * 0.55, letterSpacing: "-0.01em" }}
            >
               Switch<span className="text-primary">Pay</span>
            </span>
         </span>
      );
   }

   return (
      <span className={cn("inline-flex flex-col items-center gap-2", className)} aria-label="SwitchPay">
         {Mark}
         <span className={cn("font-semibold tracking-tight", color)} style={{ fontSize: size * 0.45 }}>
            Switch<span className="text-primary">Pay</span>
         </span>
      </span>
   );
}
