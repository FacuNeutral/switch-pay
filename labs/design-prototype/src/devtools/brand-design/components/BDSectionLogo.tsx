//* @type Integration Component
//* @context Brand Design
//* @utility Seccion 02 — Logo & Usage. Variantes de color, lockups, clearspace, tamanos minimos y usos incorrectos.

import { X, Check } from "lucide-react";
import BDLogoMark from "./BDLogoMark";

const VARIANTS = [
  { id: "primary-light", label: "Primary on Light", bg: "#FFFFFF", color: "#15B981", textColor: "#102021", accent: "#6F4DE8" },
  { id: "primary-dark", label: "Primary on Dark", bg: "#09111F", color: "#15B981", textColor: "#F1FAF8", accent: "#6F4DE8" },
  { id: "inverse-on-aqua", label: "Inverse on Aqua", bg: "#15B981", color: "#FFFFFF", textColor: "#062014", accent: "#FFFFFF" },
  { id: "inverse-on-purple", label: "Inverse on Purple", bg: "#6F4DE8", color: "#FFFFFF", textColor: "#FFFFFF", accent: "#FFFFFF" },
  { id: "mono-dark", label: "Mono Dark", bg: "#FFFFFF", color: "#102021", textColor: "#102021", accent: "#102021" },
  { id: "mono-light", label: "Mono Light", bg: "#09111F", color: "#FFFFFF", textColor: "#FFFFFF", accent: "#FFFFFF" },
];

const SIZES = [
  { label: "Mark · 24px", size: 24 },
  { label: "Mark · 32px", size: 32 },
  { label: "Mark · 48px", size: 48 },
  { label: "Mark · 64px", size: 64 },
];

const INCORRECT = [
  { label: "Don't deform" },
  { label: "Don't rotate" },
  { label: "Don't recolor" },
  { label: "Don't add shadow" },
];

export default function BDSectionLogo() {
  return (
    <section className="px-8 lg:px-12 py-12 max-w-6xl mx-auto space-y-12">
      {/* <Tag> Header */}
      <div className="flex items-baseline gap-6">
        <span className="text-7xl font-extrabold tracking-tighter text-debug-primary leading-none shrink-0">
          02
        </span>
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-debug-text dark:text-debug-text-dark">
            Logo & Usage
          </h1>
          <p className="mt-2 text-sm text-debug-text-muted dark:text-debug-text-muted-dark max-w-xl">
            Isotipo "S" en cuatro bandas formando dos chevrones entrelazados, lockups horizontal
            y vertical. Funciona sobre fondos claros, oscuros y bloques de color.
          </p>
        </div>
      </div>

      {/* <Tag> Lockups overview */}
      <div>
        <p className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark mb-4">
          Lockups
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-white border border-[#D9E8E5] p-8 flex flex-col items-center justify-center gap-4 min-h-[200px]">
            <BDLogoMark variant="mark" size={80} color="#15B981" />
            <span className="text-[10px] uppercase tracking-widest font-semibold text-[#5C6B70]">
              Isotype
            </span>
          </div>
          <div className="rounded-2xl bg-white border border-[#D9E8E5] p-8 flex flex-col items-center justify-center gap-4 min-h-[200px]">
            <BDLogoMark variant="horizontal" size={56} color="#15B981" textColor="#102021" />
            <span className="text-[10px] uppercase tracking-widest font-semibold text-[#5C6B70]">
              Horizontal
            </span>
          </div>
          <div className="rounded-2xl bg-white border border-[#D9E8E5] p-8 flex flex-col items-center justify-center gap-4 min-h-[200px]">
            <BDLogoMark variant="vertical" size={64} color="#15B981" textColor="#102021" />
            <span className="text-[10px] uppercase tracking-widest font-semibold text-[#5C6B70]">
              Vertical
            </span>
          </div>
        </div>
      </div>

      {/* <Tag> Color variants */}
      <div>
        <p className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark mb-4">
          Color Variants
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {VARIANTS.map((v) => (
            <div
              key={v.id}
              className="rounded-2xl border border-debug-border dark:border-debug-border-dark overflow-hidden"
            >
              <div
                className="aspect-[4/3] flex items-center justify-center"
                style={{ background: v.bg }}
              >
                <BDLogoMark
                  variant="horizontal"
                  size={44}
                  color={v.color}
                  textColor={v.textColor}
                  accentColor={v.accent}
                />
              </div>
              <div className="px-3 py-2 bg-debug-surface-raised dark:bg-debug-surface-raised-dark text-[11px] font-medium text-debug-text dark:text-debug-text-dark">
                {v.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <Tag> Clearspace */}
      <div>
        <p className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark mb-4">
          Clearspace · x = altura de banda
        </p>
        <div className="rounded-2xl bg-debug-surface-raised dark:bg-debug-surface-raised-dark border border-debug-border dark:border-debug-border-dark p-12 flex items-center justify-center">
          <div className="relative">
            {/* Outer dashed bounding box */}
            <div className="absolute -inset-8 border-2 border-dashed border-debug-primary/40 rounded-2xl" />
            {/* x markers */}
            <span className="absolute -top-12 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-debug-primary">
              x
            </span>
            <span className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-debug-primary">
              x
            </span>
            <span className="absolute top-1/2 -left-12 -translate-y-1/2 text-[10px] font-mono font-bold text-debug-primary">
              x
            </span>
            <span className="absolute top-1/2 -right-12 -translate-y-1/2 text-[10px] font-mono font-bold text-debug-primary">
              x
            </span>
            <BDLogoMark variant="horizontal" size={64} color="#15B981" textColor="var(--color-debug-text)" />
          </div>
        </div>
      </div>

      {/* <Tag> Minimum sizes */}
      <div>
        <p className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark mb-4">
          Minimum Sizes
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SIZES.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-debug-surface-raised dark:bg-debug-surface-raised-dark border border-debug-border dark:border-debug-border-dark p-6 flex flex-col items-center justify-center gap-3 min-h-[140px]"
            >
              <BDLogoMark variant="mark" size={s.size} color="#15B981" />
              <span className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* <Tag> Correct vs incorrect */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Correct */}
        <div className="rounded-2xl bg-debug-surface-raised dark:bg-debug-surface-raised-dark border border-debug-border dark:border-debug-border-dark p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-[#63D69F]/15 text-[#63D69F] flex items-center justify-center">
              <Check size={14} strokeWidth={2.5} />
            </span>
            <p className="text-sm font-semibold text-debug-text dark:text-debug-text-dark">Correct use</p>
          </div>
          <ul className="space-y-2 text-xs text-debug-text-muted dark:text-debug-text-muted-dark leading-relaxed">
            <li>· Mantener proporciones originales del isotipo.</li>
            <li>· Usar la combinación de color que cumpla contraste 4.5:1 mínimo.</li>
            <li>· Respetar el clearspace en TODA aplicación.</li>
            <li>· Usar el wordmark en la familia tipográfica primaria.</li>
          </ul>
        </div>

        {/* Incorrect */}
        <div className="rounded-2xl bg-debug-surface-raised dark:bg-debug-surface-raised-dark border border-debug-border dark:border-debug-border-dark p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-[#EF5B5B]/15 text-[#EF5B5B] flex items-center justify-center">
              <X size={14} strokeWidth={2.5} />
            </span>
            <p className="text-sm font-semibold text-debug-text dark:text-debug-text-dark">Incorrect use</p>
          </div>
          <ul className="space-y-2 text-xs text-debug-text-muted dark:text-debug-text-muted-dark leading-relaxed">
            {INCORRECT.map((rule) => (
              <li key={rule.label}>· {rule.label}.</li>
            ))}
            <li>· No componer el wordmark en una fuente distinta.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
