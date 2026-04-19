//* @type Integration Component
//* @context Design Tokens
//* @utility Vista técnica en crudo de todos los tokens: muestras de color, tipografía, spacing, radios, sombras, etc.

import { useDesignTokensStore } from "../store/design-tokens.slice";
import { groupTokens, TOKEN_CATEGORIES, type DesignToken } from "../store/design-tokens.mock";

export default function DTPreviewRaw() {
  const tokens = useDesignTokensStore((s) => s.tokens);
  const grouped = groupTokens(tokens);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-10">
      {/* <Tag> Colors Grid */}
      <RawColorSection tokens={grouped.get("color")} />

      {/* <Tag> Typography */}
      <RawTypographySection tokens={grouped.get("typography")} />

      {/* <Tag> Spacing */}
      <RawDimensionBarSection
        title="Spacing"
        tokens={grouped.get("spacing")?.get("spacing") ?? []}
        maxPx={80}
      />

      {/* <Tag> Border Radius */}
      <RawRadiusSection tokens={grouped.get("radius")?.get("radius") ?? []} />

      {/* <Tag> Shadows */}
      <RawShadowSection tokens={grouped.get("elevation")?.get("shadow") ?? []} />

      {/* <Tag> Blur */}
      <RawBlurSection tokens={grouped.get("blur")?.get("blur") ?? []} />

      {/* <Tag> Opacity */}
      <RawOpacitySection tokens={grouped.get("opacity")?.get("opacity") ?? []} />

      {/* <Tag> Z-Index */}
      <RawZIndexSection tokens={grouped.get("z-index")?.get("z-index") ?? []} />

      {/* <Tag> Breakpoints */}
      <RawDimensionBarSection
        title="Breakpoints"
        tokens={grouped.get("breakpoint")?.get("breakpoint") ?? []}
        maxPx={1400}
      />
    </div>
  );
}

// ==========================================
// Color Section
// ==========================================

function RawColorSection({ tokens }: { tokens?: Map<string, DesignToken[]> }) {
  if (!tokens) return null;
  const subcats = Array.from(tokens.entries());

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-debug-text dark:text-debug-text-dark">Colors</h2>
      <div className="space-y-4">
        {subcats.map(([sub, tks]) => (
          <div key={sub}>
            <h3 className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark mb-2">
              {sub}
            </h3>
            <div className="flex flex-wrap gap-3">
              {tks.map((t) => (
                <div key={t.key} className="flex flex-col items-center gap-1.5">
                  <div
                    className="w-16 h-16 rounded-lg border border-debug-border dark:border-debug-border-dark shadow-sm"
                    style={{ backgroundColor: t.value }}
                  />
                  <span className="text-[9px] font-medium text-debug-text dark:text-debug-text-dark text-center max-w-16 truncate">
                    {t.label}
                  </span>
                  <span className="text-[8px] font-mono text-debug-text-muted dark:text-debug-text-muted-dark">
                    {t.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ==========================================
// Typography Section
// ==========================================

function RawTypographySection({ tokens }: { tokens?: Map<string, DesignToken[]> }) {
  if (!tokens) return null;

  const families = tokens.get("font-family") ?? [];
  const sizes = tokens.get("font-size") ?? [];
  const weights = tokens.get("font-weight") ?? [];

  return (
    <section className="space-y-6">
      <h2 className="text-lg font-semibold text-debug-text dark:text-debug-text-dark">Typography</h2>

      {/* Families */}
      {families.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark">
            Families
          </h3>
          <div className="space-y-2">
            {families.map((t) => (
              <div key={t.key} className="flex items-baseline gap-4">
                <span className="text-[10px] font-mono text-debug-text-muted dark:text-debug-text-muted-dark w-24 shrink-0">
                  {t.label}
                </span>
                <span
                  className="text-xl text-debug-text dark:text-debug-text-dark"
                  style={{ fontFamily: t.value }}
                >
                  The quick brown fox jumps over the lazy dog
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sizes */}
      {sizes.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark">
            Text Sizes
          </h3>
          <div className="space-y-2">
            {sizes.map((t) => (
              <div key={t.key} className="flex items-baseline gap-4">
                <span className="text-[10px] font-mono text-debug-text-muted dark:text-debug-text-muted-dark w-16 shrink-0">
                  {t.label}
                </span>
                <span className="text-[10px] font-mono text-debug-text-subtle-dark w-12 shrink-0">
                  {t.value}
                </span>
                <span
                  className="text-debug-text dark:text-debug-text-dark"
                  style={{ fontSize: t.value }}
                >
                  Design Tokens
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weights */}
      {weights.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark">
            Font Weights
          </h3>
          <div className="space-y-1">
            {weights.map((t) => (
              <div key={t.key} className="flex items-baseline gap-4">
                <span className="text-[10px] font-mono text-debug-text-muted dark:text-debug-text-muted-dark w-20 shrink-0">
                  {t.label}
                </span>
                <span className="text-[10px] font-mono text-debug-text-subtle-dark w-8 shrink-0">
                  {t.value}
                </span>
                <span
                  className="text-base text-debug-text dark:text-debug-text-dark"
                  style={{ fontWeight: t.value }}
                >
                  Aa Bb Cc 123
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

// ==========================================
// Dimension Bar Section (Spacing, Breakpoints)
// ==========================================

function RawDimensionBarSection({ title, tokens, maxPx }: { title: string; tokens: DesignToken[]; maxPx: number }) {
  if (tokens.length === 0) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-debug-text dark:text-debug-text-dark">{title}</h2>
      <div className="space-y-2">
        {tokens.map((t) => {
          const numericPx = parseFloat(t.value) * (t.value.includes("rem") ? 16 : 1);
          const pct = Math.min(100, (numericPx / maxPx) * 100);
          return (
            <div key={t.key} className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-debug-text-muted dark:text-debug-text-muted-dark w-12 shrink-0 text-right">
                {t.label}
              </span>
              <span className="text-[10px] font-mono text-debug-text-subtle-dark w-14 shrink-0">
                {t.value}
              </span>
              <div className="flex-1 h-4 rounded bg-debug-surface-overlay dark:bg-debug-surface-overlay-dark overflow-hidden">
                <div
                  className="h-full rounded bg-primary/30"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ==========================================
// Radius Section
// ==========================================

function RawRadiusSection({ tokens }: { tokens: DesignToken[] }) {
  if (tokens.length === 0) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-debug-text dark:text-debug-text-dark">Border Radius</h2>
      <div className="flex items-center gap-4">
        {tokens.map((t) => (
          <div key={t.key} className="flex flex-col items-center gap-1.5">
            <div
              className="w-14 h-14 bg-accent/15 border-2 border-accent/40"
              style={{ borderRadius: t.value }}
            />
            <span className="text-[9px] font-mono text-debug-text-muted dark:text-debug-text-muted-dark">{t.label}</span>
            <span className="text-[8px] font-mono text-debug-text-subtle-dark">{t.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ==========================================
// Shadow Section
// ==========================================

function RawShadowSection({ tokens }: { tokens: DesignToken[] }) {
  if (tokens.length === 0) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-debug-text dark:text-debug-text-dark">Shadows</h2>
      <div className="flex items-center gap-6">
        {tokens.map((t) => (
          <div key={t.key} className="flex flex-col items-center gap-2">
            <div
              className="w-20 h-20 rounded-xl bg-debug-surface dark:bg-debug-surface-raised-dark"
              style={{ boxShadow: t.value }}
            />
            <span className="text-[9px] font-mono text-debug-text-muted dark:text-debug-text-muted-dark">{t.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ==========================================
// Blur Section
// ==========================================

function RawBlurSection({ tokens }: { tokens: DesignToken[] }) {
  if (tokens.length === 0) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-debug-text dark:text-debug-text-dark">Blur</h2>
      <div className="flex items-center gap-6">
        {tokens.map((t) => (
          <div key={t.key} className="flex flex-col items-center gap-2">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-debug-border dark:border-debug-border-dark">
              <div className="absolute inset-0 bg-linear-to-br from-primary via-accent to-secondary" />
              <div
                className="absolute inset-0"
                style={{ backdropFilter: `blur(${t.value})` }}
              />
            </div>
            <span className="text-[9px] font-mono text-debug-text-muted dark:text-debug-text-muted-dark">{t.label}</span>
            <span className="text-[8px] font-mono text-debug-text-subtle-dark">{t.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ==========================================
// Opacity Section
// ==========================================

function RawOpacitySection({ tokens }: { tokens: DesignToken[] }) {
  if (tokens.length === 0) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-debug-text dark:text-debug-text-dark">Opacity</h2>
      <div className="flex items-center gap-6">
        {tokens.map((t) => (
          <div key={t.key} className="flex flex-col items-center gap-2">
            <div
              className="w-16 h-16 rounded-lg bg-primary"
              style={{ opacity: parseFloat(t.value) }}
            />
            <span className="text-[9px] font-mono text-debug-text-muted dark:text-debug-text-muted-dark">{t.label}</span>
            <span className="text-[8px] font-mono text-debug-text-subtle-dark">{t.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ==========================================
// Z-Index Section
// ==========================================

function RawZIndexSection({ tokens }: { tokens: DesignToken[] }) {
  if (tokens.length === 0) return null;

  return (
    <section className="space-y-3 pb-8">
      <h2 className="text-lg font-semibold text-debug-text dark:text-debug-text-dark">Z-Index Layers</h2>
      <div className="relative flex items-end gap-3 h-40">
        {tokens.map((t, i) => {
          const val = parseInt(t.value) || 1;
          const maxVal = Math.max(...tokens.map((tk) => parseInt(tk.value) || 1));
          const pct = Math.max(10, (val / maxVal) * 100);
          return (
            <div key={t.key} className="flex flex-col items-center gap-1 flex-1">
              <span className="text-[10px] font-mono font-semibold text-debug-accent">{t.value}</span>
              <div
                className="w-full rounded-t-md bg-accent/20 border border-accent/30 border-b-0 transition-all"
                style={{ height: `${pct}%` }}
              />
              <span className="text-[9px] font-mono text-debug-text-muted dark:text-debug-text-muted-dark">{t.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
