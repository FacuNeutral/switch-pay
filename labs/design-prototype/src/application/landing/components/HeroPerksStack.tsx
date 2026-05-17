//* @type Component
//* @context Landing
//* @utility Stack flotante de perks toggleables sobre la imagen del hero. El presupuesto disponible se reduce al activar perks.

import { useMemo, useState } from "react";
import { Heart, GraduationCap, PiggyBank, Users, Laptop, Check, Wallet, Shuffle, Receipt, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import perksData from "../data/heroPerks.json";

const ICONS: Record<string, LucideIcon> = {
   Heart,
   GraduationCap,
   PiggyBank,
   Users,
   Laptop,
};

interface Perk {
   id: string;
   name: string;
   description: string;
   price: number;
   icon: string;
   active: boolean;
}

const formatCurrency = (value: number, symbol: string) =>
   `${symbol}${value}`;

export default function HeroPerksStack() {
   const [perks, setPerks] = useState<Perk[]>(perksData.perks);

   const togglePerk = (id: string) => {
      setPerks((prev) =>
         prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p)),
      );
   };

   const spent = useMemo(
      () => perks.filter((p) => p.active).reduce((sum, p) => sum + p.price, 0),
      [perks],
   );

   const remaining = useMemo(
      () => perksData.baseSalary - spent,
      [spent],
   );

   return (
      <div className="flex w-full max-w-[340px] flex-col gap-2">
         {/* Card cabecera — cambiar beneficio laboral */}
         <div className="rounded-lg border border-neutral-line-dark bg-neutral-dark/90 px-5 py-4 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.30)]">
            <div className="flex items-center gap-4">
               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white">
                  <Shuffle size={22} strokeWidth={1.75} />
               </div>
               <div className="flex flex-1 flex-col leading-snug">
                  <span className="text-base font-medium text-white">
                     Cambia tus beneficios
                  </span>
                  <span className="text-sm text-white/65">
                     Elige según tus prioridades del momento.
                  </span>
               </div>
            </div>
         </div>

         {/* Perks toggleables */}
         <div className="flex flex-col gap-5 pt-4">
         {perks.map((perk) => {
            const Icon = ICONS[perk.icon] ?? Heart;
            return (
               <button
                  key={perk.id}
                  type="button"
                  onClick={() => togglePerk(perk.id)}
                  aria-pressed={perk.active}
                  className={cn(
                     "group relative flex items-center gap-4 rounded-lg border px-5 py-4 text-left backdrop-blur-xl transition-all duration-(--dur-fast)",
                     "shadow-[0_4px_20px_rgba(0,0,0,0.22)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.30)]",
                     perk.active
                        ? "border-neutral-line-dark bg-neutral-surface-dark/60 hover:bg-neutral-surface-dark/75"
                        : "border-neutral-line-dark bg-neutral-card-dark hover:border-neutral-muted-dark/40 hover:bg-neutral-surface-dark",
                  )}
               >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
                     <Icon size={22} strokeWidth={1.75} />
                  </div>

                  <div className="flex flex-1 flex-col leading-snug">
                     <span className="text-base font-medium text-white">{perk.name}</span>
                     <span className="text-sm text-white/65">{perk.description}</span>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                     <span
                        data-numeric="true"
                        className={cn(
                           "text-sm font-medium transition-colors duration-(--dur-fast)",
                           perk.active ? "text-white" : "text-white/60",
                        )}
                     >
                        -{formatCurrency(perk.price, perksData.currencyLabel)}
                     </span>
                     <span
                        className={cn(
                           "flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-(--dur-fast)",
                           perk.active
                              ? "border-white bg-white text-primary"
                              : "border-white/40 bg-transparent text-transparent",
                        )}
                        aria-hidden
                     >
                        <Check size={12} strokeWidth={3} />
                     </span>
                  </div>
               </button>
            );
         })}
            {/* Card total gastado */}
            <div className="rounded-lg border border-neutral-line-dark bg-neutral-dark/90 px-5 py-4 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.30)]">
               <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white">
                     <Receipt size={22} strokeWidth={1.75} />
                  </div>
                  <div className="flex flex-1 flex-col leading-snug">
                     <span className="text-base font-medium text-white">Total </span>
                     <span data-numeric="true" className="text-sm text-white/65 transition-all duration-(--dur-base)">
                        {formatCurrency(spent, perksData.currencyLabel)}
                     </span>
                  </div>
                  <span data-numeric="true" className="text-sm font-medium text-white/50">
                   
                  </span>
               </div>
            </div>
         </div>

         {/* Botón cambiar beneficios */}
      
      </div>
   );
}
