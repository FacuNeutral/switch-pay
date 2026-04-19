//* @type Integration Component
//* @context Design Tokens
//* @utility Dialog de confirmación que sugiere crear backup antes de aplicar una paleta.

import { Archive, SkipForward, X } from "lucide-react";
import { useDesignTokensStore } from "../store/design-tokens.slice";

export default function DTBackupPrompt() {
  const pendingPaletteApply = useDesignTokensStore((s) => s.pendingPaletteApply);
  const confirmApplyPaletteWithBackup = useDesignTokensStore((s) => s.confirmApplyPaletteWithBackup);
  const confirmApplyPaletteSkipBackup = useDesignTokensStore((s) => s.confirmApplyPaletteSkipBackup);
  const cancelApplyPalette = useDesignTokensStore((s) => s.cancelApplyPalette);

  if (!pendingPaletteApply) return null;

  return (
    <div className="fixed inset-0 z-9300 flex items-center justify-center">
      {/* <Tag> Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={cancelApplyPalette} />

      {/* <Tag> Dialog */}
      <div className="relative w-96 bg-debug-surface dark:bg-debug-surface-dark border border-debug-border dark:border-debug-border-dark rounded-(--radius-debug-panel) shadow-2xl shadow-black/40 overflow-hidden">
        {/* <Tag> Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-debug-border dark:border-debug-border-dark">
          <h3 className="text-sm font-semibold text-debug-text dark:text-debug-text-dark">
            Save Backup?
          </h3>
          <button
            onClick={cancelApplyPalette}
            className="p-1 text-debug-text-muted dark:text-debug-text-muted-dark hover:text-debug-text dark:hover:text-debug-text-dark transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* <Tag> Body */}
        <div className="px-4 py-4 space-y-3">
          <p className="text-xs text-debug-text-muted dark:text-debug-text-muted-dark leading-relaxed">
            You&apos;re about to apply the palette <span className="font-semibold text-debug-text dark:text-debug-text-dark">&quot;{pendingPaletteApply.name}&quot;</span>.
            This will overwrite your current pending token values.
          </p>
          <p className="text-xs text-debug-text-muted dark:text-debug-text-muted-dark leading-relaxed">
            Would you like to save a backup of your current tokens before applying?
          </p>
        </div>

        {/* <Tag> Actions */}
        <div className="flex items-center gap-2 px-4 py-3 border-t border-debug-border dark:border-debug-border-dark bg-debug-surface-overlay/50 dark:bg-debug-surface-overlay-dark/50">
          <button
            onClick={confirmApplyPaletteWithBackup}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-(--radius-debug-tab) text-xs font-semibold bg-debug-primary text-debug-primary-foreground hover:bg-debug-primary-hover transition-colors duration-150"
          >
            <Archive size={13} />
            Backup & Apply
          </button>
          <button
            onClick={confirmApplyPaletteSkipBackup}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-(--radius-debug-tab) text-xs font-medium text-debug-text-muted dark:text-debug-text-muted-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark border border-debug-border dark:border-debug-border-dark transition-colors duration-150"
          >
            <SkipForward size={13} />
            Skip & Apply
          </button>
        </div>
      </div>
    </div>
  );
}
