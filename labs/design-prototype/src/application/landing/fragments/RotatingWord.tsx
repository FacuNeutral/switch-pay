//* @type Fragment
//* @context Landing
//* @utility Palabra animada que rota entre opciones con fade+slide. Color primario con pulso de opacidad.

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RotatingWordProps {
   words: string[];
   interval?: number;
   className?: string;
}

export default function RotatingWord({ words, interval = 3000, className }: RotatingWordProps) {
   const [index, setIndex] = useState(0);
   const [visible, setVisible] = useState(true);
   const swapRef = useRef<ReturnType<typeof setTimeout> | null>(null);

   useEffect(() => {
      const timer = setInterval(() => {
         setVisible(false);
         swapRef.current = setTimeout(() => {
            setIndex((i) => (i + 1) % words.length);
            setVisible(true);
         }, 350);
      }, interval);

      return () => {
         clearInterval(timer);
         if (swapRef.current) clearTimeout(swapRef.current);
      };
   }, [words.length, interval]);

   return (
      <span
         className="inline-block"
         style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-14px)",
            filter: visible ? "blur(0px)" : "blur(8px)",
            transition: "opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out), filter var(--dur-base) var(--ease-out)",
         }}
      >
         <span className={cn("anim-word-glow", className ?? "text-primary-hover")}>{words[index]}</span>
      </span>
   );
}
