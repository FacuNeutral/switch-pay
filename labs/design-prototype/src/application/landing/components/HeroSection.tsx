//* @type Component
//* @context Landing
//* @utility Hero full-screen. Ocupa siempre 100dvh. Fondo de video previsto; imagen placeholder como stand-in temporal.

import PillButton from "../fragments/PillButton";
import ImagePlaceholder from "../fragments/ImagePlaceholder";
import SectionHeader from "../fragments/SectionHeader";
import RotatingWord from "../fragments/RotatingWord";

export default function HeroSection() {
   return (
      <section
         id="top"
         className="relative h-dvh overflow-hidden"
      >
         {/* Imagen de fondo absolute a la derecha */}
         <div
            className="pointer-events-none absolute right-0 top-0 h-full w-[55%] opacity-20 lg:opacity-30"
            aria-hidden
         >
            <ImagePlaceholder
               ratio="portrait"
               label="Bonsái rosa con rim-light coral sobre negro"
               description="Pieza visual de marca, eco organico."
               tone="primary"
               className="h-full w-full object-cover"
            />
         </div>

         {/* Fade izquierdo */}
         <div
            className="pointer-events-none absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-bg-base to-transparent"
            aria-hidden
         />

         {/* Fade inferior — elimina el corte con la siguiente sección */}
         <div
            className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-bg-base to-transparent"
            aria-hidden
         />

         {/* Ambient glow sutil */}
         <div
            className="pointer-events-none absolute right-[5%] top-1/3 h-[520px] w-[520px] rounded-full opacity-30 blur-[120px]"
            style={{ background: "var(--color-primary-glow)" }}
            aria-hidden
         />

         <div className="container-page relative z-10 flex h-full items-center">
            {/* Texto */}
            <div className="flex w-full flex-col gap-7">
               <SectionHeader
                  as="h1"
                  eyebrow="Beneficios laborales"
                  title={<>Brinda beneficios laborales <RotatingWord words={["flexibles.", "adaptables.", "basados en prioridades."]} /></>}
                  titleLines={["Acompaña las prioridades de tus empleados."]}
                  lead="Una plataforma que permite ofrecer opciones flexibles adaptadas a las necesidades y prioridades actuales de cada empleado, mientras impulsa el uso y aprovechamiento de tus beneficios corporativos."
               />

               <div className="flex flex-wrap items-center gap-3 pt-2">
                  <PillButton trailingIcon>Probar ahora</PillButton>
                  <PillButton variant="ghost" asLink href="#como-funciona">
                     Cómo funciona
                  </PillButton>
               </div>
            </div>
         </div>
      </section>
   );
}
