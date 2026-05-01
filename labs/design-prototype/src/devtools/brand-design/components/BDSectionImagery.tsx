//* @type Integration Component
//* @context Brand Design
//* @utility Seccion 08 — Imagery & Patterns. Gradientes, patrones decorativos, social squares y app icon.

import BDLogoMark from "./BDLogoMark";

const GRADIENTS = [
  {
    id: "aqua-glow",
    label: "Aqua Glow",
    css: "linear-gradient(135deg, #15B981 0%, #6F4DE8 100%)",
    use: "Hero backgrounds, promotional banners",
    onText: "#FFFFFF",
  },
  {
    id: "mist-fade",
    label: "Mist Fade",
    css: "linear-gradient(180deg, #DCF6E7 0%, #FFFFFF 100%)",
    use: "Soft section backgrounds",
    onText: "#102021",
  },
  {
    id: "night-fade",
    label: "Night Fade",
    css: "linear-gradient(180deg, #09090B 0%, #141416 100%)",
    use: "Dark hero, dashboard balance",
    onText: "#FAFAFA",
  },
  {
    id: "purple-glow",
    label: "Purple Glow",
    css: "linear-gradient(135deg, #6F4DE8 0%, #15B981 100%)",
    use: "Premium perks, accent cards",
    onText: "#FFFFFF",
  },
];

export default function BDSectionImagery() {
  return (
    <section className="px-8 lg:px-12 py-12 max-w-6xl mx-auto space-y-12">
      {/* <Tag> Header */}
      <div className="flex items-baseline gap-6">
        <span className="text-7xl font-extrabold tracking-tighter text-debug-primary leading-none shrink-0">
          08
        </span>
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-debug-text dark:text-debug-text-dark">
            Imagery & Patterns
          </h1>
          <p className="mt-2 text-sm text-debug-text-muted dark:text-debug-text-muted-dark">
            Brand gradients, decorative patterns derived from the isotype and social
            compositions. Controlled use: one bold color piece per composition.
          </p>
        </div>
      </div>

      {/* <Tag> Gradients */}
      <div>
        <p className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark mb-4">
          Gradients
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GRADIENTS.map((g) => (
            <div
              key={g.id}
              className="rounded-3xl p-8 min-h-[200px] flex flex-col justify-between"
              style={{ background: g.css }}
            >
              <span
                className="text-[10px] uppercase tracking-widest font-bold"
                style={{ color: g.onText }}
              >
                {g.label}
              </span>
              <div>
                <p className="text-xs font-mono font-bold tracking-wider mb-2" style={{ color: g.onText }}>
                  {g.css}
                </p>
                <p className="text-[11px] font-medium" style={{ color: g.onText, opacity: 0.85 }}>
                  {g.use}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <Tag> Diagonal pattern */}
      <div>
        <p className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark mb-4">
          Diagonal Bands · pattern derived from isotype
        </p>
        <div
          className="rounded-3xl overflow-hidden relative min-h-[220px] flex items-center justify-center p-8"
          style={{
            background:
              "repeating-linear-gradient(115deg, #15B981 0px, #15B981 24px, transparent 24px, transparent 48px), #09090B",
          }}
        >
          <div className="text-center">
            <BDLogoMark variant="vertical" size={56} color="#FFFFFF" textColor="#FFFFFF" accentColor="#FFFFFF" />
            <p className="mt-4 text-xs font-bold uppercase tracking-widest text-white">
              Switch the way you live
            </p>
          </div>
        </div>
      </div>

      {/* <Tag> App icons */}
      <div>
        <p className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark mb-4">
          App Icons
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Light icon */}
          <div
            className="aspect-square rounded-3xl flex items-center justify-center"
            style={{ background: "#FFFFFF", border: "1px solid #D9E8E5" }}
          >
            <BDLogoMark variant="mark" size={72} color="#15B981" />
          </div>
          {/* Dark icon */}
          <div
            className="aspect-square rounded-3xl flex items-center justify-center"
            style={{ background: "#09090B" }}
          >
            <BDLogoMark variant="mark" size={72} color="#15B981" />
          </div>
          {/* Aqua icon */}
          <div
            className="aspect-square rounded-3xl flex items-center justify-center"
            style={{ background: "#15B981" }}
          >
            <BDLogoMark variant="mark" size={72} color="#FFFFFF" />
          </div>
          {/* Purple icon */}
          <div
            className="aspect-square rounded-3xl flex items-center justify-center"
            style={{ background: "#6F4DE8" }}
          >
            <BDLogoMark variant="mark" size={72} color="#FFFFFF" />
          </div>
        </div>
      </div>

      {/* <Tag> Social squares */}
      <div>
        <p className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark mb-4">
          Social Squares
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Square 1 — quote */}
          <div
            className="aspect-square rounded-3xl p-8 flex flex-col justify-between"
            style={{ background: "#FFFFFF", border: "1px solid #D9E8E5" }}
          >
            <BDLogoMark variant="horizontal" size={24} color="#15B981" textColor="#102021" accentColor="#15B981" />
            <div>
              <p className="text-xl font-extrabold leading-tight" style={{ color: "#102021" }}>
                Benefits that adapt to{" "}
                <span style={{ color: "#15B981" }}>your life</span>.
              </p>
              <p className="text-[11px] font-medium mt-3" style={{ color: "#5C6B70" }}>
                Choose what matters most.
              </p>
            </div>
          </div>

          {/* Square 2 — promo */}
          <div
            className="aspect-square rounded-3xl p-8 flex flex-col justify-between"
            style={{ background: "linear-gradient(135deg, #15B981 0%, #6F4DE8 100%)" }}
          >
            <span className="text-[10px] uppercase tracking-widest font-bold text-white">
              New
            </span>
            <div>
              <p className="text-2xl font-extrabold leading-tight text-white">
                Switch is here
              </p>
              <p className="text-xs font-medium mt-2 text-white/85">
                Update your perks anytime, without paperwork.
              </p>
            </div>
          </div>

          {/* Square 3 — dark */}
          <div
            className="aspect-square rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden"
            style={{ background: "#09090B" }}
          >
            {/* decorative blob */}
            <div
              className="absolute -bottom-12 -right-12 w-44 h-44 rounded-full"
              style={{ background: "#15B981", opacity: 0.18, filter: "blur(20px)" }}
            />
            <div className="relative">
              <BDLogoMark variant="mark" size={32} color="#15B981" />
            </div>
            <div className="relative">
              <p className="text-xl font-extrabold leading-tight text-white">
                Trust. Flexibility. Freedom.
              </p>
              <p className="text-[11px] font-medium mt-3" style={{ color: "#71717A" }}>
                The new way to choose your benefits.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <Tag> Card business */}
      <div>
        <p className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark mb-4">
          Branded Card
        </p>
        <div
          className="rounded-3xl p-8 max-w-md flex flex-col justify-between aspect-[1.6/1] relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #09090B 0%, #141416 100%)" }}
        >
          {/* diagonal bands decorative */}
          <div
            className="absolute -top-6 -right-6 w-40 h-40 opacity-25"
            style={{
              background:
                "repeating-linear-gradient(115deg, #15B981 0px, #15B981 12px, transparent 12px, transparent 24px)",
            }}
          />
          <div className="relative flex items-center justify-between">
            <BDLogoMark variant="horizontal" size={24} color="#15B981" textColor="#FAFAFA" accentColor="#15B981" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-white/60">
              Benefits
            </span>
          </div>
          <div className="relative space-y-4">
            <p
              className="text-xl font-bold tracking-widest text-white"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              ···· ···· ···· 4029
            </p>
            <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-bold text-white/70">
              <span>Alex Morgan</span>
              <span>02 / 28</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
