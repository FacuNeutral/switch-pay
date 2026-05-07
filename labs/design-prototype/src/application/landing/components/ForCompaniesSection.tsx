//* @type Component
//* @context Landing
//* @utility Beneficios para empresa. Split inverso: imagen izquierda + KPIs + texto.

import SectionHeader from "../fragments/SectionHeader";
import StatBlock from "../fragments/StatBlock";
import ImagePlaceholder from "../fragments/ImagePlaceholder";

const KPIS = [
   { value: "3x", label: "más adopción que un beneficio fijo" },
   { value: "−42%", label: "tiempo administrativo de RRHH" },
   { value: "+27", label: "puntos eNPS al cabo de 6 meses" },
];

export default function ForCompaniesSection() {
   return (
      <section id="para-empresas" className="section-y border-t border-hairline">
         <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="order-2 lg:order-1 lg:col-span-5">
               <ImagePlaceholder
                  ratio="square"
                  label="Esfera de raíces con bioluminiscencia aqua"
                  description="Metafora de centralizacion: muchas raices, un solo nucleo."
                  tone="accent"
               />
            </div>

            <div className="order-1 flex flex-col gap-8 lg:order-2 lg:col-span-7">
               <SectionHeader
                  eyebrow="Para tu empresa"
                  title="Centralizá."
                  ghostLines={["Medí. Fidelizá."]}
                  lead="Dejá de gestionar diez proveedores, mil mails y cero datos. SwitchPay unifica el ciclo del beneficio y te devuelve métricas que importan."
               />

               <div className="grid grid-cols-1 gap-6 border-t border-hairline pt-8 sm:grid-cols-3">
                  {KPIS.map((k) => (
                     <StatBlock key={k.label} {...k} />
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
}
