//* @type Component
//* @context Landing
//* @utility Capacidades centrales de la webapp en grilla de cards con icono.

import {
   Layers,
   Wallet,
   BarChart3,
   ShieldCheck,
   Users,
   Sparkles,
} from "lucide-react";
import SectionHeader from "../fragments/SectionHeader";
import IconCard from "../fragments/IconCard";

const FEATURES = [
   {
      icon: Layers,
      title: "Catálogo curado",
      description:
         "Más de 200 perks listos para activar: bienestar, fitness, delivery, formación, salud y más. Vos elegís cuáles aparecen.",
      tag: "Catalog",
   },
   {
      icon: Wallet,
      title: "Billetera de créditos",
      description:
         "Cada persona tiene un saldo recargable. Lo usa en lo que necesite, cuando quiera, sin pedir aprobaciones.",
      tag: "Wallet",
   },
   {
      icon: BarChart3,
      title: "Métricas en vivo",
      description:
         "Adopción, categorías más usadas, presupuesto consumido y satisfacción. Reportes que llegan solos al cierre del mes.",
      tag: "Insights",
   },
   {
      icon: ShieldCheck,
      title: "Control sin fricción",
      description:
         "Aprobás topes por categoría, definís quién accede a qué y mantenés trazabilidad fiscal de cada movimiento.",
      tag: "Admin",
   },
   {
      icon: Users,
      title: "SSO + onboarding",
      description:
         "Integración con tu directorio corporativo. Un alta nueva tiene sus créditos disponibles el mismo día.",
      tag: "SSO",
   },
   {
      icon: Sparkles,
      title: "Campañas internas",
      description:
         "Premiá hitos, cumpleaños, proyectos cerrados o reconocimientos peer-to-peer con créditos extra en la billetera.",
      tag: "Engage",
   },
];

export default function FeaturesSection() {
   return (
      <section id="features" className="section-y border-t border-hairline">
         <div className="container-page flex flex-col gap-14 lg:gap-20">
            <SectionHeader
               eyebrow="La webapp"
               title="Una sola plataforma."
               ghostLines={["Para todo el ciclo."]}
               lead="Catálogo, billetera, reportes y administración en una sola interfaz pensada para mobile, tablet y desktop."
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
               {FEATURES.map((f) => (
                  <IconCard key={f.title} {...f} />
               ))}
            </div>
         </div>
      </section>
   );
}
