//* @type Integration Component
//* @context Brand Design
//* @utility Seccion 06 — Components & UI. Botones, cards, inputs, chips, toggles, radios, sombras y spacing.

import { ArrowRight, Check, Bell, Search, Mail, TriangleAlert } from "lucide-react";
import { BRAND_RADIUS, BRAND_SHADOWS, BRAND_SPACING } from "../store/brand-design.mock";

export default function BDSectionComponents() {
  return (
    <section className="px-8 lg:px-12 py-12 max-w-6xl mx-auto space-y-12">
      {/* <Tag> Header */}
      <div className="flex items-baseline gap-6">
        <span className="text-7xl font-extrabold tracking-tighter text-debug-primary leading-none shrink-0">
          06
        </span>
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-debug-text dark:text-debug-text-dark">
            Components & UI
          </h1>
          <p className="mt-2 text-sm text-debug-text-muted dark:text-debug-text-muted-dark max-w-xl">
            Building blocks de la app: buttons, cards, inputs, chips. Curvatura coherente
            (rounded-2xl por defecto), spacing en múltiplos de 4, sombras suaves.
          </p>
        </div>
      </div>

      {/* <Tag> Buttons */}
      <div>
        <p className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark mb-4">
          Buttons
        </p>
        <div className="rounded-2xl bg-debug-surface-raised dark:bg-debug-surface-raised-dark border border-debug-border dark:border-debug-border-dark p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Primary */}
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark">
              Primary
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold text-white"
                style={{ background: "#15B981" }}
              >
                Add benefit
                <ArrowRight size={14} strokeWidth={2} />
              </button>
              <button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold text-white opacity-80"
                style={{ background: "#0FA571" }}
              >
                Hover state
              </button>
              <button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold text-white opacity-50 cursor-not-allowed"
                style={{ background: "#15B981" }}
                disabled
              >
                Disabled
              </button>
            </div>
          </div>

          {/* Secondary */}
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark">
              Secondary
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold border"
                style={{ borderColor: "#D9E8E5", color: "#102021", background: "#FFFFFF" }}
              >
                Review
              </button>
              <button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold"
                style={{ background: "#E8E1FF", color: "#6F4DE8" }}
              >
                Premium
              </button>
            </div>
          </div>

          {/* Ghost */}
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark">
              Ghost · Destructive
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold"
                style={{ color: "#15B981" }}
              >
                Skip
              </button>
              <button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold text-white"
                style={{ background: "#EF5B5B" }}
              >
                Cancel benefit
              </button>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark">
              Sizes
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <button
                className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-semibold text-white"
                style={{ background: "#15B981" }}
              >
                Small
              </button>
              <button
                className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold text-white"
                style={{ background: "#15B981" }}
              >
                Medium
              </button>
              <button
                className="inline-flex items-center px-6 py-3 rounded-2xl text-base font-semibold text-white"
                style={{ background: "#15B981" }}
              >
                Large
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <Tag> Inputs & form */}
      <div>
        <p className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark mb-4">
          Inputs
        </p>
        <div className="rounded-2xl bg-debug-surface-raised dark:bg-debug-surface-raised-dark border border-debug-border dark:border-debug-border-dark p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Default input */}
          <div>
            <label className="text-[10px] uppercase tracking-widest font-semibold text-[#5C6B70]">
              Email
            </label>
            <div
              className="mt-2 flex items-center gap-3 rounded-xl border bg-white px-4 py-3"
              style={{ borderColor: "#D9E8E5" }}
            >
              <Mail size={16} strokeWidth={1.5} style={{ color: "#5C6B70" }} />
              <input
                placeholder="alex@switchpay.com"
                className="flex-1 bg-transparent outline-none text-sm font-medium"
                style={{ color: "#102021" }}
                readOnly
              />
            </div>
          </div>

          {/* Focus state */}
          <div>
            <label className="text-[10px] uppercase tracking-widest font-semibold text-[#5C6B70]">
              Focus state
            </label>
            <div
              className="mt-2 flex items-center gap-3 rounded-xl border-2 bg-white px-4 py-3 ring-4"
              style={{ borderColor: "#15B981", "--tw-ring-color": "#15B98133" } as React.CSSProperties}
            >
              <Search size={16} strokeWidth={1.5} style={{ color: "#15B981" }} />
              <input
                placeholder="Search benefits..."
                defaultValue="health"
                className="flex-1 bg-transparent outline-none text-sm font-medium"
                style={{ color: "#102021" }}
                readOnly
              />
            </div>
          </div>

          {/* Error state */}
          <div>
            <label className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: "#EF5B5B" }}>
              Error
            </label>
            <div
              className="mt-2 flex items-center gap-3 rounded-xl border bg-white px-4 py-3"
              style={{ borderColor: "#EF5B5B" }}
            >
              <TriangleAlert size={16} strokeWidth={1.5} style={{ color: "#EF5B5B" }} />
              <input
                defaultValue="invalid"
                className="flex-1 bg-transparent outline-none text-sm font-medium"
                style={{ color: "#102021" }}
                readOnly
              />
            </div>
            <p className="mt-1 text-[11px]" style={{ color: "#EF5B5B" }}>
              Email format is invalid.
            </p>
          </div>

          {/* Toggle */}
          <div>
            <p className="text-[10px] uppercase tracking-widest font-semibold text-[#5C6B70]">
              Toggle
            </p>
            <div className="mt-2 flex items-center gap-4">
              <span
                className="relative inline-flex h-6 w-11 items-center rounded-full transition"
                style={{ background: "#15B981" }}
              >
                <span className="inline-block h-5 w-5 translate-x-5 rounded-full bg-white shadow-md transition" />
              </span>
              <span
                className="relative inline-flex h-6 w-11 items-center rounded-full transition"
                style={{ background: "#D9E8E5" }}
              >
                <span className="inline-block h-5 w-5 translate-x-1 rounded-full bg-white shadow-md transition" />
              </span>
              <span className="text-xs font-medium" style={{ color: "#5C6B70" }}>
                Notifications
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* <Tag> Chips & badges */}
      <div>
        <p className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark mb-4">
          Chips & Badges
        </p>
        <div className="rounded-2xl bg-debug-surface-raised dark:bg-debug-surface-raised-dark border border-debug-border dark:border-debug-border-dark p-8 flex flex-wrap items-center gap-3">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: "#DCF6E7", color: "#0FA571" }}
          >
            <Check size={12} strokeWidth={2.5} />
            Active
          </span>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: "#E8E1FF", color: "#6F4DE8" }}
          >
            Premium
          </span>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: "#FFF4D6", color: "#A37416" }}
          >
            <Bell size={12} strokeWidth={2.5} />
            New
          </span>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: "#FDE3E3", color: "#C03939" }}
          >
            Locked
          </span>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: "#EDF7F5", color: "#5C6B70" }}
          >
            Wellness
          </span>
        </div>
      </div>

      {/* <Tag> Card example */}
      <div>
        <p className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark mb-4">
          Card
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Light card */}
          <div
            className="rounded-3xl p-6 space-y-4"
            style={{
              background: "#FFFFFF",
              border: "1px solid #D9E8E5",
              boxShadow: "0 6px 18px rgba(8, 34, 28, 0.06)",
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-[10px] uppercase tracking-widest font-bold"
                style={{ color: "#5C6B70" }}
              >
                Available Budget
              </span>
              <span
                className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold"
                style={{ background: "#DCF6E7", color: "#0FA571" }}
              >
                62% used
              </span>
            </div>
            <p className="text-4xl font-extrabold tracking-tight" style={{ color: "#102021" }}>
              $1,250.00
            </p>
            <p className="text-xs" style={{ color: "#5C6B70" }}>
              Annual benefits balance · Resets in 78 days.
            </p>
          </div>

          {/* Dark card */}
          <div
            className="rounded-3xl p-6 space-y-4"
            style={{
              background: "#101B2E",
              border: "1px solid #22324A",
              boxShadow: "0 6px 18px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-[10px] uppercase tracking-widest font-bold"
                style={{ color: "#9BAEB7" }}
              >
                Active perk
              </span>
              <span
                className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold"
                style={{ background: "#6F4DE8", color: "#FFFFFF" }}
              >
                Premium
              </span>
            </div>
            <p className="text-2xl font-bold" style={{ color: "#F1FAF8" }}>
              Gym Membership
            </p>
            <p className="text-xs" style={{ color: "#9BAEB7" }}>
              $200 / year · 3 visits remaining this month.
            </p>
            <button
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold"
              style={{ background: "#15B981", color: "#062014" }}
            >
              View details
              <ArrowRight size={12} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* <Tag> Radius scale */}
      <div>
        <p className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark mb-4">
          Border Radius
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {BRAND_RADIUS.map((r) => (
            <div
              key={r.token}
              className="bg-debug-surface-raised dark:bg-debug-surface-raised-dark border border-debug-border dark:border-debug-border-dark p-4 flex flex-col items-center gap-3"
              style={{ borderRadius: r.value === "9999px" ? "20px" : r.value }}
            >
              <div
                className="w-12 h-12"
                style={{ background: "#15B981", borderRadius: r.value }}
              />
              <span className="text-[10px] font-mono font-bold text-debug-text dark:text-debug-text-dark">
                {r.value}
              </span>
              <span className="text-[10px] text-debug-text-muted dark:text-debug-text-muted-dark text-center">
                {r.token}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* <Tag> Spacing scale */}
      <div>
        <p className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark mb-4">
          Spacing
        </p>
        <div className="rounded-2xl bg-debug-surface-raised dark:bg-debug-surface-raised-dark border border-debug-border dark:border-debug-border-dark p-6 space-y-3">
          {BRAND_SPACING.map((s) => (
            <div key={s.token} className="flex items-center gap-4">
              <span className="text-[10px] font-mono font-bold w-24 text-debug-text-muted dark:text-debug-text-muted-dark">
                {s.token}
              </span>
              <span className="text-[10px] font-mono font-bold w-12 text-debug-text dark:text-debug-text-dark">
                {s.value}
              </span>
              <span
                className="h-3 rounded-sm"
                style={{ background: "#15B981", width: s.value }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* <Tag> Shadows */}
      <div>
        <p className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark mb-4">
          Elevation
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {BRAND_SHADOWS.map((s) => (
            <div
              key={s.token}
              className="rounded-2xl p-6 flex flex-col items-center gap-3"
              style={{ background: "#FFFFFF", boxShadow: s.value }}
            >
              <div
                className="w-12 h-12 rounded-xl"
                style={{ background: "#15B981" }}
              />
              <span className="text-[10px] font-mono font-bold" style={{ color: "#102021" }}>
                {s.token}
              </span>
              <span className="text-[10px] text-center" style={{ color: "#5C6B70" }}>
                {s.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
