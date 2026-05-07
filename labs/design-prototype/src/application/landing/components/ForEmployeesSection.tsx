//* @type Component
//* @context Landing
//* @utility Beneficios para el empleado. Split: texto + imagen organica derecha.

import { Check } from "lucide-react";
import SectionHeader from "../fragments/SectionHeader";
import ImagePlaceholder from "../fragments/ImagePlaceholder";

const BULLETS = [
   "Elegís el beneficio que de verdad usás, no el que vino por defecto.",
   "Saldo siempre visible: sabés cuántos créditos tenés y cuándo se renuevan.",
   "Canjeás en segundos desde el celular, sin enviar facturas ni esperar reembolsos.",
   "Historial completo de tu actividad y categorías favoritas.",
];

export default function ForEmployeesSection() {
   return (
      <section id="para-empleados" className="section-y border-t border-hairline">
         <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="flex flex-col gap-8 lg:col-span-7">
               <SectionHeader
                  eyebrow="Para tu equipo"
                  title="Tus beneficios."
                  ghostLines={["Tu vida."]}
               />

               <p className="max-w-[54ch] text-base text-text-mid sm:text-lg">
                  Cada persona tiene una realidad distinta. SwitchPay reconoce eso
                  y deja que cada empleado arme su propio mix de beneficios — desde
                  un gimnasio cerca de su casa hasta una sesión de terapia o un curso online.
               </p>

               <ul className="flex flex-col gap-3">
                  {BULLETS.map((b) => (
                     <li key={b} className="flex items-start gap-3 text-sm text-text-mid sm:text-base">
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border border-hairline text-primary">
                           <Check className="h-3 w-3" strokeWidth={2} />
                        </span>
                        <span>{b}</span>
                     </li>
                  ))}
               </ul>
            </div>

            <div className="lg:col-span-5">
               <ImagePlaceholder
                  ratio="portrait"
                  label="Manos cubiertas de musgo bioluminiscente"
                  description="Persona disfrutando un beneficio. Calidez + naturaleza neon."
                  tone="primary"
               />
            </div>
         </div>
      </section>
   );
}
