//* @type Component
//* @context Landing
//* @utility Nav de hero split scroll=0: HeroNavLeft (logo) va en el lado imagen, HeroNavRight (links+CTA) en el lado oscuro.

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import SwitchPayLogo from "@/components/core/SwitchPayLogo";
import PillButton from "../fragments/PillButton";

const NAV_LINKS = [
   { id: "problema", label: "Problema" },
   { id: "solucion", label: "Solución" },
   { id: "como-funciona", label: "Cómo funciona" },
   { id: "para-empresas", label: "Para empresas" },
   { id: "faq", label: "FAQ" },
];

const HeroNavCtx = createContext<{ activeSection: string | null }>({ activeSection: null });

export function HeroNavProvider({ children }: { children: ReactNode }) {
   const [activeSection, setActiveSection] = useState<string | null>(null);

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

   return <HeroNavCtx.Provider value={{ activeSection }}>{children}</HeroNavCtx.Provider>;
}

/** Logo — se monta en la mitad imagen (izquierda) del hero */
export function HeroNavLeft() {
   return (
      <div className="hidden min-[1250px]:flex w-full shrink-0 items-center py-4 px-16">
         <a
            href="#top"
            className="flex items-center rounded-min bg-neutral-dark/80 px-3 py-2 border border-white/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.8)]"
         >
            <SwitchPayLogo size={28} accent="primary-hover" textTone="white" />
         </a>
      </div>
   );
}

/** Links + CTA — se monta en la mitad oscura (derecha) del hero */
export function HeroNavRight() {
   const { activeSection } = useContext(HeroNavCtx);

   return (
      <div className="hidden min-[1250px]:flex shrink-0 items-center justify-between py-4 px-16">
         <nav aria-label="Navegacion principal">
            <ul className="flex items-center gap-7 pl-1">
               {NAV_LINKS.map((l) => (
                  <li key={l.id}>
                     <a
                        href={`#${l.id}`}
                        className={cn(
                           "relative inline-block text-sm transition-colors duration-(--dur-fast)",
                           "text-white/80 hover:text-white",
                           activeSection === l.id && [
                              "text-white",
                              "after:absolute after:-bottom-1.25 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-white",
                           ],
                        )}
                     >
                        {l.label}
                     </a>
                  </li>
               ))}
            </ul>
         </nav>

         <div className="flex items-center gap-2">
            <a
               href="#login"
               className="text-sm font-semibold text-white/80 transition-colors hover:text-white"
            >
               Ingresar
            </a>
            <PillButton variant="primary" trailingIcon>Pedir demo</PillButton>
         </div>
      </div>
   );
}
