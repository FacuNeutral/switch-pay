//* @type Component
//* @context Landing
//* @utility Hero principal split. Stack ghost + acento shimmer + imagen organica + CTAs + metricas.

import Eyebrow from "../fragments/Eyebrow";
import PillButton from "../fragments/PillButton";
import StatBlock from "../fragments/StatBlock";
import ImagePlaceholder from "../fragments/ImagePlaceholder";

export default function HeroSection() {
   return (
      <section
         id="top"
         className="relative overflow-hidden pt-32 sm:pt-40 lg:pt-48"
      >
         {/* Ambient glow detras de la imagen */}
         <div
            className="pointer-events-none absolute right-[-10%] top-1/3 h-[520px] w-[520px] rounded-full opacity-50 blur-[120px]"
            style={{ background: "var(--color-primary-glow)" }}
            aria-hidden
         />

         <div className="container-page relative grid items-end gap-12 pb-20 lg:grid-cols-12 lg:gap-10 lg:pb-32">
            {/* Texto */}
            <div className="flex flex-col gap-8 lg:col-span-7">
               <Eyebrow>Webapp interna de beneficios laborales</Eyebrow>

               <h1 className="text-display text-[clamp(56px,9vw,140px)] text-text-hi">
                  <span className="block anim-stack-reveal" style={{ animationDelay: "0ms" }}>
                     Beneficios.
                  </span>
                  <span
                     className="block anim-stack-reveal"
                     style={{ animationDelay: "120ms", color: "rgba(244,248,247,0.30)" }}
                  >
                     Que cada
                  </span>
                  <span
                     className="block anim-stack-reveal"
                     style={{ animationDelay: "240ms", color: "rgba(244,248,247,0.12)" }}
                  >
                     persona <span className="text-shimmer">elige</span>.
                  </span>
               </h1>

               <p className="max-w-[54ch] text-base text-text-mid sm:text-lg">
                  SwitchPay es la webapp interna donde tu empresa centraliza todos los
                  beneficios y tu equipo elige el que de verdad necesita —
                  sin formularios, sin emails perdidos, sin presupuesto que se evapora.
               </p>

               <div className="flex flex-wrap items-center gap-3">
                  <PillButton trailingIcon>Pedir demo</PillButton>
                  <PillButton variant="ghost" asLink href="#como-funciona">
                     Ver cómo funciona
                  </PillButton>
               </div>
            </div>

            {/* Imagen organica (placeholder con cuadrante) */}
            <div className="relative lg:col-span-5">
               <ImagePlaceholder
                  ratio="portrait"
                  label="Bonsái rosa con rim-light coral sobre negro"
                  description="Pieza vertical, sangrado al borde derecho. Eco visual de marca."
                  tone="primary"
               />
            </div>
         </div>

         {/* Cluster de metricas */}
         <div className="container-page relative pb-16 sm:pb-24">
            <div className="grid grid-cols-2 gap-6 border-t border-hairline pt-8 sm:grid-cols-3 sm:gap-10 lg:grid-cols-4">
               <StatBlock value="3.5k" suffix="+" label="colaboradores activos" />
               <StatBlock value="12" label="categorías de beneficios" />
               <StatBlock value="98" suffix="%" label="adopción mensual" />
               <StatBlock value="4.7" suffix="/5" label="satisfacción del equipo" />
            </div>
         </div>
      </section>
   );
}
