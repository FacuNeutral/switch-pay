//* @type Component
//* @context Landing
//* @utility FAQ con accordion shadcn. Estilo editorial-dark.

import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeader from "../fragments/SectionHeader";

const FAQS = [
   {
      q: "¿SwitchPay reemplaza a mis beneficios actuales?",
      a: "No. SwitchPay convive con tus convenios y obras sociales. Lo que centraliza es el presupuesto flexible que tu empresa decide entregar como crédito a cada persona.",
   },
   {
      q: "¿Cuánto tiempo toma la implementación?",
      a: "Una semana. Configuramos tu catálogo, integramos tu directorio (Google, Microsoft, Okta) y cargamos los créditos. El equipo recibe una invitación por email y entra al instante.",
   },
   {
      q: "¿Qué pasa con los créditos que no se usan?",
      a: "Definís vos las reglas: pueden acumularse, vencer al cierre del mes o renovarse. La regla queda visible para cada colaborador en su billetera.",
   },
   {
      q: "¿Es seguro? ¿Cumple con normativa fiscal?",
      a: "Cada movimiento queda registrado con su comprobante fiscal. Exportás reportes contables al cierre y mantenés trazabilidad completa por colaborador y categoría.",
   },
   {
      q: "¿Funciona desde el celular?",
      a: "Sí. La webapp está pensada mobile-first. Tu equipo no necesita instalar nada — abre el link y listo. También está optimizada para tablet y desktop.",
   },
];

export default function FaqSection() {
   return (
      <section id="faq" className="section-y border-t border-hairline">
         <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
               <SectionHeader
                  eyebrow="Dudas frecuentes"
                  title="Lo que más"
                  ghostLines={["nos preguntan."]}
                  lead="Si tu pregunta no está acá, escribinos a hola@switchpay.app y te respondemos el mismo día."
               />
            </div>

            <div className="lg:col-span-7">
               <Accordion type="single" collapsible className="border-t border-hairline">
                  {FAQS.map((f, i) => (
                     <AccordionItem
                        key={f.q}
                        value={`item-${i}`}
                        className="border-b border-hairline"
                     >
                        <AccordionTrigger className="py-6 text-left text-base text-text-hi hover:text-text-hi sm:text-lg">
                           {f.q}
                        </AccordionTrigger>
                        <AccordionContent className="pb-6 text-sm leading-relaxed text-text-mid sm:text-base">
                           {f.a}
                        </AccordionContent>
                     </AccordionItem>
                  ))}
               </Accordion>
            </div>
         </div>
      </section>
   );
}
