//* @type Integration Component
//* @context Brand Design
//* @utility Seccion 03 — Color Palette. Muestra todos los grupos de color con HEX, descripcion y copy-on-click.

import { Copy, Check } from "lucide-react";
import { useBrandDesignStore } from "../store/brand-design.slice";
import {
  BRAND_COLOR_GROUPS,
  type BrandColorToken,
} from "../store/brand-design.mock";

function copyToClipboard(text: string) {
  if (navigator?.clipboard) {
    navigator.clipboard.writeText(text).catch(() => {});
  }
}

function ColorSwatch({ token }: { token: BrandColorToken }) {
  const copiedToken = useBrandDesignStore((s) => s.copiedToken);
  const markCopied = useBrandDesignStore((s) => s.markCopied);
  const isCopied = copiedToken === token.key;
  const onText = token.textOn === "light" ? "#FFFFFF" : "#062014";

  function handleCopy() {
    copyToClipboard(token.hex);
    markCopied(token.key);
  }

  return (
    <div className="rounded-2xl border border-debug-border dark:border-debug-border-dark overflow-hidden flex flex-col">
      {/* <Tag> Swatch surface */}
      <button
        onClick={handleCopy}
        className="relative aspect-[5/3] flex items-end p-4 group transition-transform duration-200 hover:scale-[1.01]"
        style={{ background: token.hex }}
        title={`Copiar ${token.hex}`}
      >
        <span
          className="text-[11px] font-mono font-bold uppercase tracking-wider"
          style={{ color: onText }}
        >
          {token.hex}
        </span>
        <span
          className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: onText, color: token.hex }}
        >
          {isCopied ? <Check size={12} strokeWidth={2.5} /> : <Copy size={12} strokeWidth={2} />}
        </span>
      </button>

      {/* <Tag> Token meta */}
      <div className="px-4 py-3 bg-debug-surface-raised dark:bg-debug-surface-raised-dark">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold text-debug-text dark:text-debug-text-dark truncate">
            {token.label}
          </p>
          {isCopied && (
            <span className="text-[10px] uppercase tracking-wider font-bold text-debug-primary">
              copied
            </span>
          )}
        </div>
        <p className="text-[10px] font-mono text-debug-text-muted dark:text-debug-text-muted-dark mt-1 truncate">
          --color-{token.key}
        </p>
        <p className="text-[11px] text-debug-text-muted dark:text-debug-text-muted-dark mt-1.5 leading-snug line-clamp-2">
          {token.description}
        </p>
      </div>
    </div>
  );
}

export default function BDSectionColor() {
  return (
    <section className="px-8 lg:px-12 py-12 max-w-6xl mx-auto space-y-10">
      {/* <Tag> Header */}
      <div className="flex items-baseline gap-6">
        <span className="text-7xl font-extrabold tracking-tighter text-debug-primary leading-none shrink-0">
          03
        </span>
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-debug-text dark:text-debug-text-dark">
            Color Palette
          </h1>
          <p className="mt-2 text-sm text-debug-text-muted dark:text-debug-text-muted-dark max-w-xl">
            Aqua + Purple sobre una base neutral cálida. Construida para mantener
            contraste 4.5:1 mínimo en light y dark, con feedback colors invariantes.
          </p>
        </div>
      </div>

      {/* <Tag> Pairing hero — primary + accent */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-3xl p-8 min-h-[220px] flex flex-col justify-between" style={{ background: "#15B981" }}>
          <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "#062014" }}>
            Primary · Aqua
          </span>
          <div>
            <p className="text-3xl font-extrabold tracking-tight" style={{ color: "#062014" }}>
              #15B981
            </p>
            <p className="text-sm font-medium mt-2" style={{ color: "#062014", opacity: 0.7 }}>
              Acción, branding, confirmación
            </p>
          </div>
        </div>
        <div className="rounded-3xl p-8 min-h-[220px] flex flex-col justify-between" style={{ background: "#6F4DE8" }}>
          <span className="text-[10px] uppercase tracking-widest font-bold text-white">
            Accent · Purple
          </span>
          <div>
            <p className="text-3xl font-extrabold tracking-tight text-white">
              #6F4DE8
            </p>
            <p className="text-sm font-medium mt-2 text-white/75">
              Switch, premium, secundario
            </p>
          </div>
        </div>
      </div>

      {/* <Tag> Color groups */}
      {BRAND_COLOR_GROUPS.map((group) => (
        <div key={group.id}>
          <div className="mb-4">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark">
              {group.label}
            </p>
            <p className="text-sm text-debug-text dark:text-debug-text-dark mt-1">
              {group.description}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {group.tokens.map((token) => (
              <ColorSwatch key={token.key} token={token} />
            ))}
          </div>
        </div>
      ))}

      {/* <Tag> Gradient pair */}
      <div>
        <p className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark mb-4">
          Brand Gradient · Aqua → Purple
        </p>
        <div
          className="rounded-3xl min-h-[180px] flex items-end p-8"
          style={{ background: "linear-gradient(135deg, #15B981 0%, #6F4DE8 100%)" }}
        >
          <span className="text-xs font-mono font-bold text-white tracking-wider">
            linear-gradient(135deg, #15B981 0%, #6F4DE8 100%)
          </span>
        </div>
      </div>
    </section>
  );
}
