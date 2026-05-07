//* @type Component
//* @context Landing
//* @utility Solucion: hero centrado con imagen organica al pie. Idea central "una webapp, tu eleccion".

import Eyebrow from "../fragments/Eyebrow";
import ImagePlaceholder from "../fragments/ImagePlaceholder";

export default function SolutionSection() {
   return (
      <section id="solucion" className="section-y relative overflow-hidden border-t border-hairline">
         {/* Glow ambient */}
         <div
            className="pointer-events-none absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
            style={{ background: "var(--color-accent-glow)" }}
            aria-hidden
         />

         <div className="container-page relative flex flex-col items-center gap-10 text-center">
            <Eyebrow align="center">La solución</Eyebrow>

            <h2 className="text-display text-[clamp(48px,8vw,120px)] text-text-hi">
               Una webapp.
               <span className="block" style={{ color: "rgba(244,248,247,0.30)" }}>
                  Mil <span className="text-shimmer">elecciones</span>.
               </span>
            </h2>

            <p className="max-w-[60ch] text-base text-text-mid sm:text-lg">
               SwitchPay convierte el catálogo de beneficios en una experiencia.
               La empresa define cuánto invertir y qué ofrecer. Cada persona usa
               sus créditos en lo que mejor le sirve — gimnasio, terapia, cursos,
               delivery, educación de los chicos. Todo desde un solo lugar.
            </p>

            {/* Imagen organica sangrando desde la base */}
            <div className="relative mt-8 w-full max-w-5xl">
               <ImagePlaceholder
                  ratio="panorama"
                  label="Campo florido con bioluminiscencia rosa-aqua sobre negro"
                  description="Banda horizontal anclando la seccion. Sangrado al borde inferior."
                  tone="accent"
               />
            </div>
         </div>
      </section>
   );
}
