//* @type Component
//* @context Landing
//* @utility CTA final centrado con card destacada y badge pill.

import PillButton from "../fragments/PillButton";

export default function CtaSection() {
   return (
      <section id="cta" className="section-y border-t border-hairline">
         <div className="container-page">
            <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-8 rounded-md border border-hairline-strong bg-surface-elevated px-6 py-14 text-center sm:px-12 sm:py-20"
                 style={{ boxShadow: "var(--shadow-lift)" }}
            >
               <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-pill bg-text-hi px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-canvas">
                  Onboarding en 7 días
               </span>

               <h2 className="text-display text-[clamp(40px,6vw,80px)] text-text-hi">
                  Listo para que tu equipo
                  <span className="block text-shimmer">elija de verdad.</span>
               </h2>

               <p className="max-w-[52ch] text-base text-text-mid sm:text-lg">
                  Te mostramos en 20 minutos cómo SwitchPay encaja en tu programa
                  actual, qué proveedores ya tenemos integrados y cuánto presupuesto
                  podés recuperar.
               </p>

               <div className="flex flex-wrap items-center justify-center gap-3">
                  <PillButton trailingIcon>Pedir demo</PillButton>
                  <PillButton variant="ghost" asLink href="#faq">
                     Resolver dudas
                  </PillButton>
               </div>
            </div>
         </div>
      </section>
   );
}
