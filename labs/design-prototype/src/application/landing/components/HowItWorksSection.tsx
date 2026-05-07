//* @type Component
//* @context Landing
//* @utility Como funciona: 3 cards numeradas (define / asigna / elige).

import SectionHeader from "../fragments/SectionHeader";
import NumberedCard from "../fragments/NumberedCard";

const STEPS = [
   {
      index: "01",
      title: "Define",
      subtitle: "tu programa",
      description:
         "Decidís el presupuesto por persona o por área, qué categorías habilitar y qué proveedores incluir en el catálogo de tu empresa.",
   },
   {
      index: "02",
      title: "Asigna",
      subtitle: "créditos al equipo",
      description:
         "Cada colaborador recibe sus créditos en la billetera de SwitchPay. Sin tarjetas físicas, sin reembolsos manuales, sin esperas.",
   },
   {
      index: "03",
      title: "Elige",
      subtitle: "lo que de verdad sirve",
      description:
         "Tu equipo navega el catálogo y canjea sus créditos en lo que necesita. Vos ves la actividad y los reportes en tiempo real.",
      active: true,
   },
];

export default function HowItWorksSection() {
   return (
      <section id="como-funciona" className="section-y border-t border-hairline">
         <div className="container-page flex flex-col gap-14 lg:gap-20">
            <SectionHeader
               eyebrow="Cómo funciona"
               title="Tres pasos."
               ghostLines={["Cero fricción."]}
               lead="De la decisión a la entrega del beneficio en menos de una semana. Sin migrar nada, sin cambiar tu nómina."
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
               {STEPS.map((s) => (
                  <NumberedCard key={s.index} {...s} />
               ))}
            </div>
         </div>
      </section>
   );
}
