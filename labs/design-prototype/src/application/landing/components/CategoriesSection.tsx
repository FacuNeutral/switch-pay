//* @type Component
//* @context Landing
//* @utility Catalogo de categorias representado como grid de tech chips.

import SectionHeader from "../fragments/SectionHeader";
import TechChip from "../fragments/TechChip";

const CATEGORIES = [
   "Bienestar mental",
   "Fitness & gym",
   "Salud preventiva",
   "Alimentación",
   "Educación",
   "Cursos online",
   "Coworking",
   "Movilidad",
   "Streaming",
   "Hijos & familia",
   "Hobbies",
   "Suscripciones",
   "Wellness",
   "Coaching",
   "Idiomas",
   "Tecnología",
];

export default function CategoriesSection() {
   return (
      <section id="categorias" className="section-y border-t border-hairline">
         <div className="container-page flex flex-col gap-12">
            <SectionHeader
               eyebrow="Catálogo"
               title="Beneficios para todas las vidas."
               lead="Agregamos nuevos partners cada mes. Tu equipo siempre tiene algo nuevo donde gastar sus créditos."
            />

            <div className="flex flex-wrap gap-2.5">
               {CATEGORIES.map((c, i) => (
                  <TechChip key={c} live={i === 0}>
                     {c}
                  </TechChip>
               ))}
            </div>
         </div>
      </section>
   );
}
