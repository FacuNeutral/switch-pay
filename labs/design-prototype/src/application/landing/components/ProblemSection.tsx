//* @type Component
//* @context Landing
//* @utility Plantea el problema desde dos angulos: empleados y empresas. Dos cards numeradas.

import SectionHeader from "../fragments/SectionHeader";
import NumberedCard from "../fragments/NumberedCard";

export default function ProblemSection() {
   return (
      <section id="problema" className="section-y border-t border-hairline">
         <div className="container-page flex flex-col gap-14 lg:gap-20">
            <SectionHeader
               eyebrow="El problema"
               title="Beneficios que nadie usa."
               ghostLines={["Presupuesto que se diluye."]}
               lead="La mayoría de los programas de beneficios se diseñan desde el escritorio. Llegan iguales para todos, viven en un PDF y terminan ignorados."
               size="lg"
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
               <NumberedCard
                  index="01"
                  title="Tu equipo"
                  subtitle="lo que sienten los empleados"
                  description="Reciben el mismo beneficio genérico que otra persona con realidad distinta. Si no encaja, no lo usan — y queda la sensación de que la empresa no escucha."
               />
               <NumberedCard
                  index="02"
                  title="Tu empresa"
                  subtitle="lo que pierde RRHH"
                  description="Presupuesto disperso entre proveedores, baja adopción, métricas inexistentes y reportes manuales. El beneficio existe pero no se ve, no se mide, no fideliza."
               />
            </div>
         </div>
      </section>
   );
}
