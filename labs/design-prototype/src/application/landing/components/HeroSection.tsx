//* @type Component
//* @context Landing
//* @utility Hero full-screen split: mitad derecha primary con card en verde claro, mitad izquierda imagen de fondo.

import { Sliders, Heart, BarChart3, Zap } from "lucide-react";
import heroBg from "@/assets/backgrounds/hero-bg.png";
import SwitchPayIsotype from "@/components/core/SwitchPayIsotype";

import PillButton from "../fragments/PillButton";
import SectionHeader from "../fragments/SectionHeader";
import RotatingWord from "../fragments/RotatingWord";
import GrainOverlay from "../fragments/GrainOverlay";
import HeroPerksStack from "./HeroPerksStack";
import { HeroNavProvider, HeroNavLeft, HeroNavRight } from "./HeroNavBar";

export default function HeroSection() {
   return (
      <HeroNavProvider>
         <section
            id="top"
            className="relative h-[min(100dvh,1080px)] flex flex-row-reverse overflow-hidden max-w-[1920px] mx-auto w-full"
         >
            {/* Imagen de fondo full hero */}
            <img
               src={heroBg}
               alt=""
               className="pointer-events-none absolute inset-0 h-full w-full object-cover  -scale-x-100"
               aria-hidden
            />

            {/* Mitad derecha: overlay semi-transparente con contenido */}
            <div className="relative flex w-full min-[1250px]:w-[60%] flex-col bg-linear-to-br bg-neutral-dark/95">
               <GrainOverlay opacity={0.06} frequency={0.45} className="z-0" />
               <HeroNavRight />
               {/* Scroll-down hint — solo desktop */}
               <a
                  href="#problema"
                  className="absolute bottom-7 right-16 z-20 hidden min-[1250px]:flex h-28 w-24 items-center justify-center rounded-lg  text-white/20 border border-white/20 backdrop-blur-md anim-scroll-bounce"
                  aria-label="Desplazarse hacia abajo"
               >
                  <svg width="20" height="52" viewBox="0 0 20 52" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                     <line x1="10" y1="0" x2="10" y2="44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                     <path d="M3 37L10 44L17 37" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
               </a>
               <div className="relative z-10 flex flex-1 flex-col px-8 pb-16 min-[1250px]:px-16">
                  <div className="my-auto w-full text-white">
                     <div className="flex flex-col gap-10">
                        <SectionHeader
                           as="h1"
                           inverted
                           className="[&_h1]:font-normal [&_h1]:text-display [&_h1] [&_h1]:text-white [&_h1]:text-4xl [&_h1]:min-[1250px]:text-5xl [&_h1]:leading-[1.25] [&_h1]:tracking-tight [&_p]:font-normal [&_p]:text-white/65 [&_p]:!text-lg [&_p]:min-[1250px]:!text-xl"
                           title={<>Brinda beneficios laborales <RotatingWord words={["flexibles.", "a medida.", "adaptables.", "mensuales."]} /></>}
                           ghostLines={["Opciones que tu empleado valorará."]}
                           lead="Una plataforma que permite ofrecer opciones flexibles adaptadas a las necesidades y prioridades actuales de cada empleado, mientras impulsa el uso y aprovechamiento de tus beneficios corporativos."
                        />

                        <div className="flex flex-wrap items-center gap-4">
                           <PillButton variant="primary" trailingIcon>Probar ahora</PillButton>
                           <PillButton variant="ghost" asLink href="#como-funciona">
                              Cómo funciona
                           </PillButton>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Divisor vertical primario — solo desktop */}
            <div className="relative z-10 hidden min-[1250px]:block w-px shrink-0 self-stretch bg-hairline" aria-hidden />

            {/* Mitad izquierda: logo + degradado — solo desktop */}
            <div className="relative hidden min-[1250px]:flex min-[1250px]:w-[40%] flex-col">
               <HeroNavLeft />
               {/* Degradado verde primary → transparente */}
               <div className="pointer-events-none absolute inset-y-0 right-0 w-[664px] bg-linear-to-l from-neutral-dark/20 to-transparent" aria-hidden />
               {/* Degradado negro inferior → transparente (cards) */}
               <div className="pointer-events-none absolute bottom-0 inset-x-0 h-[52%] bg-linear-to-t from-neutral-dark/90 to-transparent " aria-hidden />
               {/* Cards de frases — overlay inferior */}
               <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 grid grid-cols-1 min-[1400px]:grid-cols-2 gap-3 w-[calc(100%-2.5rem)] max-w-[620px]">
                  {([
                     { Icon: Sliders, title: "Beneficios a medida", desc: "Cada empleado elige según sus prioridades." },
                     { Icon: Heart, title: "Mayor satisfacción", desc: "Empleados más motivados y comprometidos." },
                     { Icon: BarChart3, title: "Control total del gasto", desc: "Presupuesto claro, sin sorpresas al cierre." },
                     { Icon: Zap, title: "Sin burocracia", desc: "Activación inmediata, sin papeleos ni aprobaciones." },
                  ] as const).map(({ Icon, title, desc }) => (
                     <div key={title} className="rounded-min border border-hairline bg-neutral-dark/50 px-5 py-4 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.30)]">
                        <div className="flex items-center gap-4">
                           <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-min bg-primary text-neutral-dark anim-icon-pop">
                              <Icon size={22} strokeWidth={1.75} />
                           </div>
                           <div className="flex flex-col leading-snug">
                              <span className="text-base font-medium text-white">{title}</span>
                              <span className="text-sm text-white/65">{desc}</span>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>



         </section>
      </HeroNavProvider>
   );
}
