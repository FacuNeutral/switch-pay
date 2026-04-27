//* @type Integration Component
//* @context Brand Design
//* @utility Seccion 05 — Iconography. Set lineal redondeado con stroke 1.5 agrupado por uso.

import {
  House,
  Gift,
  ChartBar,
  LifeBuoy,
  UserRound,
  HeartPulse,
  Leaf,
  Wallet,
  Sparkles,
  Bus,
  UtensilsCrossed,
  ShoppingBag,
  ArrowLeftRight,
  ArrowDownToLine,
  ArrowUpFromLine,
  Repeat,
  CreditCard,
  CircleCheck,
  TriangleAlert,
  Info,
  CircleX,
  Lock,
  ShieldCheck,
  Search,
  SlidersHorizontal,
  Settings,
  Bell,
  CircleQuestionMark,
  Ellipsis,
  type LucideIcon,
} from "lucide-react";
import { BRAND_ICON_GROUPS } from "../store/brand-design.mock";

const ICON_MAP: Record<string, LucideIcon> = {
  House,
  Gift,
  ChartBar,
  LifeBuoy,
  UserRound,
  HeartPulse,
  Leaf,
  Wallet,
  Sparkles,
  Bus,
  UtensilsCrossed,
  ShoppingBag,
  ArrowLeftRight,
  ArrowDownToLine,
  ArrowUpFromLine,
  Repeat,
  CreditCard,
  CircleCheck,
  TriangleAlert,
  Info,
  CircleX,
  Lock,
  ShieldCheck,
  Search,
  SlidersHorizontal,
  Settings,
  Bell,
  CircleQuestionMark,
  Ellipsis,
};

const SIZE_DEMO = [
  { size: 16, label: "16px" },
  { size: 20, label: "20px" },
  { size: 24, label: "24px" },
  { size: 28, label: "28px" },
  { size: 32, label: "32px" },
];

export default function BDSectionIconography() {
  return (
    <section className="px-8 lg:px-12 py-12 max-w-6xl mx-auto space-y-12">
      {/* <Tag> Header */}
      <div className="flex items-baseline gap-6">
        <span className="text-7xl font-extrabold tracking-tighter text-debug-primary leading-none shrink-0">
          05
        </span>
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-debug-text dark:text-debug-text-dark">
            Iconography
          </h1>
          <p className="mt-2 text-sm text-debug-text-muted dark:text-debug-text-muted-dark">
            Rounded linear set with uniform 1.5px stroke. Soft curves, rounded
            corners, scale in multiples of 4. Color inherits from context via currentColor.
          </p>
        </div>
      </div>

      {/* <Tag> Size scale demo */}
      <div className="rounded-2xl bg-debug-surface-raised dark:bg-debug-surface-raised-dark border border-debug-border dark:border-debug-border-dark p-6">
        <p className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark mb-4">
          Size Scale
        </p>
        <div className="flex items-end gap-8 flex-wrap">
          {SIZE_DEMO.map((d) => (
            <div key={d.size} className="flex flex-col items-center gap-2">
              <Sparkles size={d.size} strokeWidth={1.5} className="text-debug-primary" />
              <span className="text-[10px] font-mono font-bold text-debug-text-muted dark:text-debug-text-muted-dark">
                {d.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* <Tag> Icon groups */}
      {BRAND_ICON_GROUPS.map((group) => (
        <div key={group.id}>
          <p className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark mb-4">
            {group.label}
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {group.icons.map((iconDef) => {
              const Icon = ICON_MAP[iconDef.icon];
              if (!Icon) return null;
              return (
                <div
                  key={iconDef.id}
                  className="rounded-2xl bg-debug-surface-raised dark:bg-debug-surface-raised-dark border border-debug-border dark:border-debug-border-dark p-5 flex flex-col items-center gap-3 hover:border-debug-primary transition-colors duration-150"
                >
                  <Icon size={28} strokeWidth={1.5} className="text-debug-primary" />
                  <span className="text-[11px] font-medium text-debug-text dark:text-debug-text-dark">
                    {iconDef.label}
                  </span>
                  <span className="text-[10px] font-mono text-debug-text-muted dark:text-debug-text-muted-dark truncate max-w-full">
                    {iconDef.icon}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
