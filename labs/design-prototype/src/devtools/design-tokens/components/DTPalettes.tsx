//* @type Integration Component
//* @context Design Tokens
//* @utility Sistema de paletas: lista de paletas precargadas, aplicar, crear nueva desde tokens actuales, y eliminar.

import { useState } from "react";
import { Trash2, Download, Plus, Sparkles, X } from "lucide-react";
import { useDesignTokensStore } from "../store/design-tokens.slice";
import type { Palette } from "../store/design-tokens.mock";

export default function DTPalettes() {
  const palettes = useDesignTokensStore((s) => s.palettes);
  const palettesLoading = useDesignTokensStore((s) => s.palettesLoading);
  const requestApplyPalette = useDesignTokensStore((s) => s.requestApplyPalette);
  const saveCurrentAsPalette = useDesignTokensStore((s) => s.saveCurrentAsPalette);
  const removePalette = useDesignTokensStore((s) => s.removePalette);

  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newOrientation, setNewOrientation] = useState("");

  const handleCreate = async () => {
    if (!newName.trim()) return;
    await saveCurrentAsPalette(newName, newDesc, newOrientation);
    setNewName("");
    setNewDesc("");
    setNewOrientation("");
    setShowCreate(false);
  };

  if (palettesLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-sm text-debug-text-muted dark:text-debug-text-muted-dark animate-pulse">
          Loading palettes...
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
      {/* <Tag> Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-debug-text dark:text-debug-text-dark">Palettes</h2>
          <p className="text-xs text-debug-text-muted dark:text-debug-text-muted-dark mt-0.5">
            Pre-configured token themes. Apply to preview, or save current tokens as a new palette.
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-(--radius-debug-tab) text-xs font-semibold bg-debug-primary text-debug-primary-foreground hover:bg-debug-primary-hover transition-colors duration-150"
        >
          <Plus size={13} />
          Save Current
        </button>
      </div>

      {/* <Tag> Create Palette Form */}
      {showCreate && (
        <div className="p-4 rounded-(--radius-debug-panel) border border-debug-border dark:border-debug-border-dark bg-debug-surface-overlay dark:bg-debug-surface-overlay-dark space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-debug-text dark:text-debug-text-dark">New Palette from Current Tokens</h3>
            <button onClick={() => setShowCreate(false)} className="p-1 text-debug-text-muted dark:text-debug-text-muted-dark hover:text-debug-text dark:hover:text-debug-text-dark">
              <X size={14} />
            </button>
          </div>
          <div className="space-y-2">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Palette name"
              className="w-full px-3 py-2 rounded-(--radius-debug-tab) text-xs bg-debug-surface dark:bg-debug-surface-dark text-debug-text dark:text-debug-text-dark border border-debug-border dark:border-debug-border-dark outline-none focus:border-debug-primary"
            />
            <textarea
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Description — what look does this palette aim for?"
              rows={2}
              className="w-full px-3 py-2 rounded-(--radius-debug-tab) text-xs bg-debug-surface dark:bg-debug-surface-dark text-debug-text dark:text-debug-text-dark border border-debug-border dark:border-debug-border-dark outline-none focus:border-debug-primary resize-none"
            />
            <input
              value={newOrientation}
              onChange={(e) => setNewOrientation(e.target.value)}
              placeholder="Design orientation — e.g. modern, minimal, vibrant, corporate"
              className="w-full px-3 py-2 rounded-(--radius-debug-tab) text-xs bg-debug-surface dark:bg-debug-surface-dark text-debug-text dark:text-debug-text-dark border border-debug-border dark:border-debug-border-dark outline-none focus:border-debug-primary"
            />
          </div>
          <button
            onClick={handleCreate}
            disabled={!newName.trim()}
            className="px-4 py-1.5 rounded-(--radius-debug-tab) text-xs font-semibold bg-debug-primary text-debug-primary-foreground hover:bg-debug-primary-hover transition-colors duration-150 disabled:opacity-40"
          >
            Save Palette
          </button>
        </div>
      )}

      {/* <Tag> Palettes Grid */}
      {palettes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
          <Sparkles size={32} className="text-debug-text-muted dark:text-debug-text-muted-dark" />
          <p className="text-sm text-debug-text-muted dark:text-debug-text-muted-dark">No palettes yet.</p>
          <p className="text-xs text-debug-text-subtle-dark">Save your current tokens as the first palette, or wait for pre-loaded themes.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {palettes.map((palette) => (
            <PaletteCard
              key={palette.id}
              palette={palette}
              onApply={() => requestApplyPalette(palette)}
              onDelete={() => removePalette(palette.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// Palette Card
// ==========================================

function PaletteCard({ palette, onApply, onDelete }: { palette: Palette; onApply: () => void; onDelete: () => void }) {
  // Extract color tokens for the preview swatches
  const colorTokens = Object.entries(palette.tokens)
    .filter(([key]) => key.startsWith("--color-") && !key.includes("debug"))
    .slice(0, 8);

  return (
    <div className="p-4 rounded-(--radius-debug-panel) border border-debug-border dark:border-debug-border-dark bg-debug-surface-overlay dark:bg-debug-surface-overlay-dark hover:border-debug-border-active dark:hover:border-debug-border-active-dark transition-colors duration-150 space-y-3">
      {/* <Tag> Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-debug-text dark:text-debug-text-dark">{palette.name}</h3>
          {palette.orientation && (
            <span className="text-[10px] uppercase tracking-wider font-semibold text-debug-accent mt-0.5 block">
              {palette.orientation}
            </span>
          )}
        </div>
        <button
          onClick={onDelete}
          className="p-1 rounded text-debug-text-muted dark:text-debug-text-muted-dark hover:text-error transition-colors"
          title="Delete palette"
        >
          <Trash2 size={13} />
        </button>
      </div>

      {/* <Tag> Description */}
      {palette.description && (
        <p className="text-xs text-debug-text-muted dark:text-debug-text-muted-dark leading-relaxed">
          {palette.description}
        </p>
      )}

      {/* <Tag> Color Swatches Preview */}
      {colorTokens.length > 0 && (
        <div className="flex gap-1.5">
          {colorTokens.map(([key, value]) => (
            <div
              key={key}
              className="w-6 h-6 rounded-sm border border-debug-border dark:border-debug-border-dark"
              style={{ backgroundColor: value }}
              title={key}
            />
          ))}
        </div>
      )}

      {/* <Tag> Meta */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-[10px] text-debug-text-subtle-dark">
          {palette.author} · {new Date(palette.createdAt).toLocaleDateString()}
        </span>
        <button
          onClick={onApply}
          className="flex items-center gap-1 px-3 py-1 rounded-(--radius-debug-tab) text-[10px] font-semibold bg-debug-primary/10 text-debug-primary hover:bg-debug-primary/20 transition-colors duration-150"
        >
          <Download size={11} />
          Apply
        </button>
      </div>

      {/* <Tag> Reference Tokens Indicator */}
      {palette.referenceTokens && Object.keys(palette.referenceTokens).length > 0 && (
        <div className="pt-1 border-t border-debug-border dark:border-debug-border-dark">
          <span className="text-[9px] text-debug-text-subtle-dark">
            + {Object.keys(palette.referenceTokens).length} reference tokens (LLM guidance only)
          </span>
        </div>
      )}
    </div>
  );
}
