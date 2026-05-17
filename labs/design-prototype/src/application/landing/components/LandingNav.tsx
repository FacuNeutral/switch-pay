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
   const [activeSection, setActiveSection] = useState<string | null>(null);

   useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 16);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
   }, []);

   useEffect(() => {
      const obs = new IntersectionObserver(
         (entries) => {
            for (const entry of entries) {
               if (entry.isIntersecting) setActiveSection(entry.target.id);
            }
         },
         { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
      );
      NAV_LINKS.forEach(({ id }) => {
         const el = document.getElementById(id);
         if (el) obs.observe(el);
      });
      return () => obs.disconnect();
   }, []);

   return (
      <header
         className={cn(
            "pointer-events-none fixed inset-x-0 z-[var(--z-header)]",
            "transition-[top,padding] duration-[var(--dur-fast)] ease-[var(--ease-out)]",
            scrolled ? "top-3 px-4 sm:top-4 flex justify-center" : "top-0 px-0 flex justify-center",
         )}
      >
         {/* Pill nav unificado: mobile siempre, desktop solo cuando scrolled */}
         <nav
            className={cn(
               "pointer-events-auto",
               "flex w-full items-center justify-between gap-3",
               "transition-[padding,background-color,border-color,border-radius,max-width,backdrop-filter] duration-[var(--dur-fast)] ease-[var(--ease-out)]",
               scrolled
                  ? "surface-pill-nav rounded-pill max-w-[1100px] py-2 pl-4 pr-2 sm:py-2 sm:pl-5 sm:pr-2"
                  : "max-w-[1280px] rounded-none border-transparent bg-transparent py-3 px-8 sm:py-4 min-[1250px]:hidden",
            )}
            aria-label="Navegacion principal"
         >
            <a href="#top" className={cn("flex items-center gap-1", scrolled ? "text-text-hi" : "text-neutral-ink")}>
               <BrandLogo variant="horizontal" size={26} />
               <span className={cn("hidden font-mono text-[10px] sm:inline", scrolled ? "text-text-low" : "text-neutral-muted")}>™</span>
            </a>

            <ul className="hidden items-center gap-7 lg:flex">
               {NAV_LINKS.map((l) => (
                  <li key={l.id}>
                     <a
                        href={`#${l.id}`}
                        className={cn(
                           "relative inline-block text-sm  transition-colors duration-(--dur-fast)",
                           scrolled
                              ? "text-text-mid hover:text-text-hi"
                              : "text-neutral-muted hover:text-neutral-ink",
                           activeSection === l.id && [
                              scrolled ? "text-text-hi" : "text-neutral-ink",
                              "after:absolute after:-bottom-1.25 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-primary",
                           ],
                        )}
                     >
                        {l.label}
                     </a>
                  </li>
               ))}
            </ul>

            <div className="flex items-center gap-2">
               <a
                  href="#login"
                  className={cn(
                     "hidden text-sm font-semibold transition-colors sm:inline",
                     scrolled ? "text-text-mid hover:text-text-hi" : "text-neutral-muted hover:text-neutral-ink",
                  )}
               >
                  Ingresar
               </a>
               <PillButton variant="primary" trailingIcon>Pedir demo</PillButton>
            </div>
         </nav>
      </header>
   );
}
