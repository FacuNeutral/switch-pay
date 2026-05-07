//* @type Fragment
//* @context Landing
//* @utility Eyebrow editorial: linea horizontal + caption mono uppercase.

import { cn } from "@/lib/utils";

interface EyebrowProps {
   children: React.ReactNode;
   className?: string;
   align?: "left" | "center";
}

export default function Eyebrow({ children, className, align = "left" }: EyebrowProps) {
   return (
      <span
         className={cn(
            "inline-flex items-center gap-3 text-eyebrow",
            align === "center" && "justify-center",
            className,
         )}
      >
         <span className="h-px w-8 bg-hairline-strong" aria-hidden />
         <span>{children}</span>
      </span>
   );
}
