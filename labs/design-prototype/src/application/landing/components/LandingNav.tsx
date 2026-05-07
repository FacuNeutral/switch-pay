//* @type Component
//* @context Landing
//* @utility Pill nav flotante con condensacion al scroll. Logo + links + CTA.

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import BrandLogo from "@/components/core/BrandLogo";
import PillButton from "../fragments/PillButton";

const NAV_LINKS = [
   { id: "problema", label: "Problema" },
   { id: "solucion", label: "Solución" },
   { id: "como-funciona", label: "Cómo funciona" },
   { id: "para-empresas", label: "Para empresas" },
   { id: "faq", label: "FAQ" },
];

export default function LandingNav() {
   const [scrolled, setScrolled] = useState(false);

   useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 16);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
   }, []);

   return (
      <header className="pointer-events-none fixed inset-x-0 top-3 z-[var(--z-header)] flex justify-center px-4 sm:top-4">
         <nav
            className={cn(
               "pointer-events-auto surface-pill-nav rounded-pill",
               "flex w-full max-w-[1100px] items-center justify-between gap-3",
               "transition-[padding,background-color] duration-[var(--dur-fast)] ease-[var(--ease-out)]",
               scrolled
                  ? "py-2 pl-4 pr-2 sm:py-2 sm:pl-5 sm:pr-2"
                  : "py-2.5 pl-4 pr-2 sm:py-3 sm:pl-6 sm:pr-2.5",
            )}
            aria-label="Navegacion principal"
         >
            <a href="#top" className="flex items-center gap-1 text-text-hi">
               <BrandLogo variant="horizontal" size={26} />
               <span className="hidden font-mono text-[10px] text-text-low sm:inline">™</span>
            </a>

            <ul className="hidden items-center gap-7 lg:flex">
               {NAV_LINKS.map((l) => (
                  <li key={l.id}>
                     <a
                        href={`#${l.id}`}
                        className="relative inline-block text-sm text-text-mid transition-colors duration-[var(--dur-fast)] hover:text-text-hi"
                     >
                        {l.label}
                     </a>
                  </li>
               ))}
            </ul>

            <div className="flex items-center gap-2">
               <a
                  href="#login"
                  className="hidden text-sm text-text-mid transition-colors hover:text-text-hi sm:inline"
               >
                  Ingresar
               </a>
               <PillButton trailingIcon>Pedir demo</PillButton>
            </div>
         </nav>
      </header>
   );
}
