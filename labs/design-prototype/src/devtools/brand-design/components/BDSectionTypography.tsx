//* @type Integration Component
//* @context Brand Design
//* @utility Seccion 04 — Typography. Familias, escala, pesos y combinaciones de uso.

import { BRAND_TYPE_FAMILIES, BRAND_TYPE_STYLES } from "../store/brand-design.mock";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ALPHABET_LOWER = "abcdefghijklmnopqrstuvwxyz";
const NUMERALS = "0123456789 · $ , . %";

const FONT_FAMILY_MAP: Record<string, string> = {
  primary: "'Plus Jakarta Sans', 'Poppins', system-ui, sans-serif",
  secondary: "'Inter', system-ui, sans-serif",
};

export default function BDSectionTypography() {
  return (
    <section className="px-8 lg:px-12 py-12 max-w-6xl mx-auto space-y-12">
      {/* <Tag> Header */}
      <div className="flex items-baseline gap-6">
        <span className="text-7xl font-extrabold tracking-tighter text-debug-primary leading-none shrink-0">
          04
        </span>
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-debug-text dark:text-debug-text-dark">
            Typography
          </h1>
          <p className="mt-2 text-sm text-debug-text-muted dark:text-debug-text-muted-dark max-w-xl">
            Plus Jakarta Sans para UI y branding; Inter para datos, números y bloques
            tabulares. Combinación humanista + neutral, ideal para banca digital moderna.
          </p>
        </div>
      </div>

      {/* <Tag> Aa hero per family */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {BRAND_TYPE_FAMILIES.map((family) => (
          <div
            key={family.id}
            className="rounded-3xl bg-debug-surface-raised dark:bg-debug-surface-raised-dark border border-debug-border dark:border-debug-border-dark p-8 flex flex-col justify-between min-h-[300px]"
          >
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark">
                {family.id === "primary" ? "Primary" : "Secondary"}
              </span>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark">
                {family.weights.length} weights
              </span>
            </div>

            <div
              className="text-debug-text dark:text-debug-text-dark"
              style={{ fontFamily: FONT_FAMILY_MAP[family.id] }}
            >
              <p className="text-[10rem] font-extrabold leading-none tracking-tighter">
                Aa
              </p>
            </div>

            <div>
              <p
                className="text-xl font-bold text-debug-text dark:text-debug-text-dark"
                style={{ fontFamily: FONT_FAMILY_MAP[family.id] }}
              >
                {family.name}
              </p>
              <p className="text-xs text-debug-text-muted dark:text-debug-text-muted-dark mt-1">
                {family.role}
              </p>
              <p className="mt-2 text-[10px] font-mono text-debug-text-muted dark:text-debug-text-muted-dark">
                {family.weights.join(" · ")}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* <Tag> Charset */}
      <div className="rounded-3xl bg-debug-surface-raised dark:bg-debug-surface-raised-dark border border-debug-border dark:border-debug-border-dark p-8 space-y-4">
        <p className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark">
          Charset · Plus Jakarta Sans
        </p>
        <p
          className="text-2xl font-semibold tracking-wide text-debug-text dark:text-debug-text-dark break-all"
          style={{ fontFamily: FONT_FAMILY_MAP.primary }}
        >
          {ALPHABET}
        </p>
        <p
          className="text-2xl font-medium tracking-wide text-debug-text-muted dark:text-debug-text-muted-dark break-all"
          style={{ fontFamily: FONT_FAMILY_MAP.primary }}
        >
          {ALPHABET_LOWER}
        </p>
        <p
          className="text-2xl font-bold tracking-wide text-debug-primary"
          style={{ fontFamily: FONT_FAMILY_MAP.secondary }}
        >
          {NUMERALS}
        </p>
      </div>

      {/* <Tag> Type scale */}
      <div>
        <p className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark mb-4">
          Type Scale & Combinations
        </p>
        <div className="rounded-2xl bg-debug-surface-raised dark:bg-debug-surface-raised-dark border border-debug-border dark:border-debug-border-dark divide-y divide-debug-border dark:divide-debug-border-dark">
          {BRAND_TYPE_STYLES.map((style) => (
            <div
              key={style.id}
              className="grid grid-cols-12 gap-4 p-5 items-baseline"
            >
              <div className="col-span-3">
                <p className="text-xs font-semibold text-debug-text dark:text-debug-text-dark">
                  {style.label}
                </p>
                <p className="text-[10px] font-mono text-debug-text-muted dark:text-debug-text-muted-dark mt-0.5">
                  {style.size}
                </p>
                <p className="text-[10px] font-mono text-debug-text-muted dark:text-debug-text-muted-dark">
                  {style.weightLabel} · {style.weight}
                </p>
              </div>
              <div className="col-span-9">
                <p
                  className="text-debug-text dark:text-debug-text-dark"
                  style={{
                    fontFamily: FONT_FAMILY_MAP[style.family],
                    fontSize: style.size.split(" / ")[0],
                    fontWeight: style.weight,
                    letterSpacing: style.tracking,
                    lineHeight: 1.15,
                  }}
                >
                  {style.sample}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
