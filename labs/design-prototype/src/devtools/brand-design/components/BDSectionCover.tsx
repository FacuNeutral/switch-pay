//* @type Integration Component
//* @context Brand Design
//* @utility Seccion 01 — Brand Foundation. Cover editorial con identidad, principios y slogans.

import { Sparkles, ShieldCheck, Zap, HeartHandshake } from "lucide-react";
import BDLogoMark from "./BDLogoMark";
import { BRAND_SLOGANS } from "../store/brand-design.mock";

const PRINCIPLES = [
  { icon: Zap, title: "Clarity over decoration", text: "Every element adds readability." },
  { icon: Sparkles, title: "Controlled accent", text: "One action color per screen." },
  { icon: ShieldCheck, title: "Banking trust", text: "Premium yet simple." },
  { icon: HeartHandshake, title: "Human closeness", text: "Technology without complexity." },
];

export default function BDSectionCover() {
  return (
    <section className="px-8 lg:px-12 py-12 max-w-6xl mx-auto">
      {/* <Tag> Header — section number + title */}
      <div className="flex items-baseline gap-6 mb-12">
        <span className="text-7xl font-extrabold tracking-tighter text-debug-primary leading-none shrink-0">
          01
        </span>
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-debug-text dark:text-debug-text-dark">
            Brand Foundation
          </h1>
          <p className="mt-2 text-sm text-debug-text-muted dark:text-debug-text-muted-dark">
            SwitchPay's identity is built on three pillars: switch, pay and you.
            Change, trust and choose. The brand should feel trustworthy yet friendly, premium yet simple.
          </p>
        </div>
      </div>

      {/* <Tag> Hero — logo grande con bg dual */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {/* Light hero */}
        <div className="rounded-3xl bg-white border border-[#D9E8E5] p-12 flex flex-col items-center justify-center gap-6 min-h-[280px]">
          <BDLogoMark variant="vertical" size={88} color="#15B981" textColor="#102021" accentColor="#15B981" />
          <span className="text-[10px] uppercase tracking-widest font-semibold text-[#5C6B70]">
            Light surface
          </span>
        </div>

        {/* Dark hero */}
        <div className="rounded-3xl bg-[#09111F] p-12 flex flex-col items-center justify-center gap-6 min-h-[280px]">
          <BDLogoMark variant="vertical" size={88} color="#15B981" textColor="#F1FAF8" accentColor="#15B981" />
          <span className="text-[10px] uppercase tracking-widest font-semibold text-[#9BAEB7]">
            Dark surface
          </span>
        </div>
      </div>

      {/* <Tag> Slogans */}
      <div className="rounded-3xl bg-debug-surface-raised dark:bg-debug-surface-raised-dark border border-debug-border dark:border-debug-border-dark p-8 mb-12">
        <p className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark mb-4">
          Brand Voice
        </p>
        <ul className="space-y-3">
          {BRAND_SLOGANS.map((slogan) => (
            <li
              key={slogan}
              className="text-2xl font-bold text-debug-text dark:text-debug-text-dark leading-tight"
            >
              <span className="text-debug-primary mr-2">·</span>
              {slogan}
            </li>
          ))}
        </ul>
      </div>

      {/* <Tag> Principles grid */}
      <div>
        <p className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark mb-4">
          Visual Principles
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRINCIPLES.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl bg-debug-surface-raised dark:bg-debug-surface-raised-dark border border-debug-border dark:border-debug-border-dark p-5 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-debug-primary/10 flex items-center justify-center text-debug-primary shrink-0">
                <Icon size={18} strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-sm font-semibold text-debug-text dark:text-debug-text-dark">
                  {title}
                </p>
                <p className="mt-1 text-xs text-debug-text-muted dark:text-debug-text-muted-dark leading-relaxed">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
