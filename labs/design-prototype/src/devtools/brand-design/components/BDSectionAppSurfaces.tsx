//* @type Integration Component
//* @context Brand Design
//* @utility Seccion 07 — App Surfaces. Mockups de pantallas clave: onboarding, dashboard, benefits picker.

import {
  ArrowRight,
  House,
  Gift,
  ChartBar,
  UserRound,
  HeartPulse,
  Leaf,
  Wallet,
  Sparkles,
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
  ShoppingBag,
} from "lucide-react";
import BDLogoMark from "./BDLogoMark";

/* ==========================================
   Phone Frame wrapper
   ========================================== */
function PhoneFrame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="rounded-[2.4rem] p-2 shadow-xl shrink-0"
        style={{ background: "#0B1422", border: "1px solid #22324A" }}
      >
        <div
          className="w-[280px] h-[560px] rounded-[2rem] overflow-hidden flex flex-col relative"
          style={{ background: "#FFFFFF" }}
        >
          {/* status bar */}
          <div
            className="flex items-center justify-between px-6 pt-3 pb-1.5 text-[10px] font-bold tabular-nums"
            style={{ color: "#102021" }}
          >
            <span>9:41</span>
            <span>· · ·</span>
          </div>
          {children}
        </div>
      </div>
      <span className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark">
        {label}
      </span>
    </div>
  );
}

/* ==========================================
   Onboarding mockup
   ========================================== */
function OnboardingScreen() {
  return (
    <div className="flex-1 flex flex-col items-center justify-between px-6 pb-6 pt-8" style={{ background: "#FFFFFF" }}>
      {/* hero */}
      <div className="flex-1 flex flex-col items-center justify-center gap-7 text-center">
        <BDLogoMark variant="vertical" size={64} color="#15B981" textColor="#102021" accentColor="#15B981" />
        <div>
          <p className="text-lg font-extrabold leading-tight" style={{ color: "#102021" }}>
            Your money,
            <br />
            <span style={{ color: "#15B981", textDecoration: "underline", textDecorationThickness: "2px", textUnderlineOffset: "3px" }}>
              made simple.
            </span>
          </p>
          <p className="text-[11px] mt-3 leading-relaxed max-w-[200px] mx-auto" style={{ color: "#5C6B70" }}>
            Send, receive and pay fast, secure and reliable.
          </p>
        </div>
        <div className="flex gap-1.5 mt-2">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#D9E8E5" }} />
          <span className="w-4 h-1.5 rounded-full" style={{ background: "#15B981" }} />
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#D9E8E5" }} />
        </div>
      </div>

      {/* CTAs */}
      <div className="w-full space-y-2">
        <button
          className="w-full py-3 rounded-2xl text-sm font-semibold"
          style={{ background: "#15B981", color: "#062014" }}
        >
          Sign in
        </button>
        <button
          className="w-full py-3 rounded-2xl text-sm font-semibold border"
          style={{ borderColor: "#D9E8E5", color: "#102021" }}
        >
          Create account
        </button>
      </div>
    </div>
  );
}

/* ==========================================
   Dashboard mockup
   ========================================== */
function DashboardScreen() {
  return (
    <div className="flex-1 flex flex-col" style={{ background: "#F4F8F7" }}>
      <div className="px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold" style={{ color: "#5C6B70" }}>
            Hello,
          </p>
          <p className="text-sm font-bold" style={{ color: "#102021" }}>
            Alex Morgan
          </p>
        </div>
        <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#E8E1FF" }}>
          <UserRound size={16} strokeWidth={1.5} style={{ color: "#6F4DE8" }} />
        </div>
      </div>

      {/* hero balance */}
      <div className="mx-4 rounded-3xl p-5 space-y-3" style={{ background: "#101B2E", color: "#F1FAF8" }}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "#9BAEB7" }}>
            Available
          </span>
          <span
            className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold"
            style={{ background: "#15B981", color: "#062014" }}
          >
            62% used
          </span>
        </div>
        <p className="text-2xl font-extrabold tracking-tight">$1,250.00</p>
        <p className="text-[10px]" style={{ color: "#9BAEB7" }}>
          Annual benefits balance
        </p>
      </div>

      {/* quick actions */}
      <div className="px-4 mt-4">
        <p className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: "#5C6B70" }}>
          Quick actions
        </p>
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: ShoppingBag, label: "Buy" },
            { icon: ArrowLeftRight, label: "Switch" },
            { icon: ArrowDownToLine, label: "Add" },
            { icon: ArrowUpFromLine, label: "Use" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="rounded-2xl py-3 flex flex-col items-center gap-1.5"
              style={{ background: "#FFFFFF", border: "1px solid #D9E8E5" }}
            >
              <Icon size={16} strokeWidth={1.5} style={{ color: "#15B981" }} />
              <span className="text-[9px] font-semibold" style={{ color: "#102021" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* active perks */}
      <div className="px-4 mt-4">
        <p className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: "#5C6B70" }}>
          Active perks
        </p>
        <div className="space-y-2">
          {[
            { icon: HeartPulse, name: "Health", price: "$200/y", color: "#15B981", bg: "#DCF6E7" },
            { icon: Leaf, name: "Wellness", price: "$120/y", color: "#6F4DE8", bg: "#E8E1FF" },
            { icon: Wallet, name: "Financial", price: "$80/y", color: "#F3C74D", bg: "#FFF4D6" },
          ].map(({ icon: Icon, name, price, color, bg }) => (
            <div
              key={name}
              className="rounded-2xl px-3 py-2.5 flex items-center gap-3"
              style={{ background: "#FFFFFF", border: "1px solid #D9E8E5" }}
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: bg }}>
                <Icon size={14} strokeWidth={1.5} style={{ color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold" style={{ color: "#102021" }}>
                  {name}
                </p>
                <p className="text-[10px]" style={{ color: "#5C6B70" }}>
                  {price}
                </p>
              </div>
              <ArrowRight size={12} strokeWidth={2} style={{ color: "#5C6B70" }} />
            </div>
          ))}
        </div>
      </div>

      {/* tab bar */}
      <div className="mt-auto flex items-center justify-around py-3" style={{ background: "#FFFFFF", borderTop: "1px solid #D9E8E5" }}>
        {[
          { icon: House, active: true },
          { icon: Gift, active: false },
          { icon: ChartBar, active: false },
          { icon: UserRound, active: false },
        ].map(({ icon: Icon, active }, i) => (
          <Icon
            key={i}
            size={20}
            strokeWidth={1.5}
            style={{ color: active ? "#15B981" : "#9BAEB7" }}
          />
        ))}
      </div>
    </div>
  );
}

/* ==========================================
   Benefits picker mockup
   ========================================== */
function BenefitsScreen() {
  return (
    <div className="flex-1 flex flex-col" style={{ background: "#FFFFFF" }}>
      <div className="px-4 py-3">
        <p className="text-[10px] font-semibold" style={{ color: "#5C6B70" }}>
          Step 2 of 3
        </p>
        <p className="text-base font-bold leading-tight" style={{ color: "#102021" }}>
          Choose your benefits
        </p>
      </div>

      <div className="px-4 flex gap-2 overflow-x-auto pb-2">
        {[
          { label: "Health", active: true },
          { label: "Wellness", active: false },
          { label: "Financial", active: false },
          { label: "Lifestyle", active: false },
        ].map((tab) => (
          <span
            key={tab.label}
            className="px-3 py-1.5 rounded-full text-[10px] font-semibold whitespace-nowrap"
            style={{
              background: tab.active ? "#102021" : "#F4F8F7",
              color: tab.active ? "#FFFFFF" : "#5C6B70",
            }}
          >
            {tab.label}
          </span>
        ))}
      </div>

      <div className="flex-1 px-4 mt-2 space-y-2 overflow-hidden">
        {[
          { name: "Health Insurance", value: "$300/y", selected: true },
          { name: "Dental Care", value: "$150/y", selected: false },
          { name: "Vision Care", value: "$120/y", selected: false },
          { name: "Mental Wellness", value: "$200/y", selected: false },
          { name: "Gym Membership", value: "$80/m", selected: false },
        ].map((perk) => (
          <div
            key={perk.name}
            className="rounded-2xl px-3 py-3 flex items-center gap-3"
            style={{
              background: perk.selected ? "#DCF6E7" : "#F4F8F7",
              border: `1px solid ${perk.selected ? "#15B981" : "#D9E8E5"}`,
            }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: perk.selected ? "#15B981" : "#FFFFFF",
                border: `1px solid ${perk.selected ? "#15B981" : "#D9E8E5"}`,
              }}
            >
              {perk.selected && (
                <span className="text-white text-[12px] font-bold leading-none">·</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold" style={{ color: "#102021" }}>
                {perk.name}
              </p>
              <p className="text-[10px]" style={{ color: "#5C6B70" }}>
                Up to {perk.value}
              </p>
            </div>
            <Sparkles size={12} strokeWidth={1.5} style={{ color: perk.selected ? "#6F4DE8" : "#9BAEB7" }} />
          </div>
        ))}
      </div>

      {/* footer cta */}
      <div className="px-4 py-3" style={{ background: "#FFFFFF", borderTop: "1px solid #D9E8E5" }}>
        <button
          className="w-full py-3 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2"
          style={{ background: "#15B981", color: "#062014" }}
        >
          Review selection
          <ArrowRight size={14} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

/* ==========================================
   Section root
   ========================================== */
export default function BDSectionAppSurfaces() {
  return (
    <section className="px-8 lg:px-12 py-12 max-w-6xl mx-auto space-y-12">
      {/* <Tag> Header */}
      <div className="flex items-baseline gap-6">
        <span className="text-7xl font-extrabold tracking-tighter text-debug-primary leading-none shrink-0">
          07
        </span>
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-debug-text dark:text-debug-text-dark">
            App Surfaces
          </h1>
          <p className="mt-2 text-sm text-debug-text-muted dark:text-debug-text-muted-dark">
            Key SwitchPay screens applying the full visual system:
            onboarding, dashboard with hero balance and benefits picker.
          </p>
        </div>
      </div>

      {/* <Tag> Phone showcase */}
      <div className="rounded-3xl bg-debug-surface-raised dark:bg-debug-surface-raised-dark border border-debug-border dark:border-debug-border-dark p-8 lg:p-12 flex flex-wrap items-start justify-center gap-8">
        <PhoneFrame label="Onboarding">
          <OnboardingScreen />
        </PhoneFrame>
        <PhoneFrame label="Dashboard">
          <DashboardScreen />
        </PhoneFrame>
        <PhoneFrame label="Benefits picker">
          <BenefitsScreen />
        </PhoneFrame>
      </div>

      {/* <Tag> UX principles */}
      <div className="rounded-2xl bg-debug-surface-raised dark:bg-debug-surface-raised-dark border border-debug-border dark:border-debug-border-dark p-6">
        <p className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark mb-3">
          UX Principles
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-debug-text-muted dark:text-debug-text-muted-dark leading-relaxed">
          <li>· One primary action per screen.</li>
          <li>· Balance and status always visible at the top.</li>
          <li>· Clear confirmations before sensitive actions.</li>
          <li>· Benefits grouped by category with tabs.</li>
          <li>· Wide, readable cards with obvious hierarchy.</li>
          <li>· Icon + label on quick actions.</li>
        </ul>
      </div>
    </section>
  );
}
