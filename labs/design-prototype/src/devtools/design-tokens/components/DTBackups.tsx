//* @type Integration Component
//* @context Design Tokens
//* @utility Sección de backups: lista de backups guardados, crear nuevo, restaurar y eliminar.

import { useState } from "react";
import { Trash2, Plus, RotateCcw, Archive, X } from "lucide-react";
import { useDesignTokensStore } from "../store/design-tokens.slice";
import type { Backup } from "../store/design-tokens.mock";

export default function DTBackups() {
  const backups = useDesignTokensStore((s) => s.backups);
  const backupsLoading = useDesignTokensStore((s) => s.backupsLoading);
  const createBackup = useDesignTokensStore((s) => s.createBackup);
  const restoreBackup = useDesignTokensStore((s) => s.restoreBackup);
  const removeBackup = useDesignTokensStore((s) => s.removeBackup);

  const [showCreate, setShowCreate] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newReason, setNewReason] = useState("");

  const handleCreate = async () => {
    if (!newLabel.trim()) return;
    await createBackup(newLabel, newReason);
    setNewLabel("");
    setNewReason("");
    setShowCreate(false);
  };

  if (backupsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-sm text-debug-text-muted dark:text-debug-text-muted-dark animate-pulse">
          Loading backups...
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
      {/* <Tag> Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-debug-text dark:text-debug-text-dark">Backups</h2>
          <p className="text-xs text-debug-text-muted dark:text-debug-text-muted-dark mt-0.5">
            Snapshots of your design tokens. Restore any backup to load its tokens as pending changes.
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-(--radius-debug-tab) text-xs font-semibold bg-debug-primary text-debug-primary-foreground hover:bg-debug-primary-hover transition-colors duration-150"
        >
          <Plus size={13} />
          Create Backup
        </button>
      </div>

      {/* <Tag> Create Backup Form */}
      {showCreate && (
        <div className="p-4 rounded-(--radius-debug-panel) border border-debug-border dark:border-debug-border-dark bg-debug-surface-overlay dark:bg-debug-surface-overlay-dark space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-debug-text dark:text-debug-text-dark">New Backup from Current Tokens</h3>
            <button onClick={() => setShowCreate(false)} className="p-1 text-debug-text-muted dark:text-debug-text-muted-dark hover:text-debug-text dark:hover:text-debug-text-dark">
              <X size={14} />
            </button>
          </div>
          <div className="space-y-2">
            <input
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="Backup label — e.g. Before redesign"
              className="w-full px-3 py-2 rounded-(--radius-debug-tab) text-xs bg-debug-surface dark:bg-debug-surface-dark text-debug-text dark:text-debug-text-dark border border-debug-border dark:border-debug-border-dark outline-none focus:border-debug-primary"
            />
            <textarea
              value={newReason}
              onChange={(e) => setNewReason(e.target.value)}
              placeholder="Reason — why are you saving this backup?"
              rows={2}
              className="w-full px-3 py-2 rounded-(--radius-debug-tab) text-xs bg-debug-surface dark:bg-debug-surface-dark text-debug-text dark:text-debug-text-dark border border-debug-border dark:border-debug-border-dark outline-none focus:border-debug-primary resize-none"
            />
          </div>
          <button
            onClick={handleCreate}
            disabled={!newLabel.trim()}
            className="px-4 py-1.5 rounded-(--radius-debug-tab) text-xs font-semibold bg-debug-primary text-debug-primary-foreground hover:bg-debug-primary-hover transition-colors duration-150 disabled:opacity-40"
          >
            Save Backup
          </button>
        </div>
      )}

      {/* <Tag> Backups List */}
      {backups.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
          <Archive size={32} className="text-debug-text-muted dark:text-debug-text-muted-dark" />
          <p className="text-sm text-debug-text-muted dark:text-debug-text-muted-dark">No backups yet.</p>
          <p className="text-xs text-debug-text-subtle-dark">Create a manual backup or apply a palette — you&apos;ll be prompted to save one automatically.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {backups.map((backup) => (
            <BackupCard
              key={backup.id}
              backup={backup}
              onRestore={() => restoreBackup(backup)}
              onDelete={() => removeBackup(backup.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// Backup Card
// ==========================================

function BackupCard({ backup, onRestore, onDelete }: { backup: Backup; onRestore: () => void; onDelete: () => void }) {
  const colorTokens = Object.entries(backup.tokens)
    .filter(([key]) => key.startsWith("--color-") && !key.includes("debug"))
    .slice(0, 10);

  const isAuto = backup.id.startsWith("pre-palette-");

  return (
    <div className="p-4 rounded-(--radius-debug-panel) border border-debug-border dark:border-debug-border-dark bg-debug-surface-overlay dark:bg-debug-surface-overlay-dark hover:border-debug-border-active dark:hover:border-debug-border-active-dark transition-colors duration-150">
      {/* <Tag> Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-debug-text dark:text-debug-text-dark">{backup.label}</h3>
          <span className={`text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded-sm ${isAuto ? "bg-debug-accent/10 text-debug-accent" : "bg-debug-primary/10 text-debug-primary"}`}>
            {isAuto ? "Auto" : "Manual"}
          </span>
        </div>
        <button
          onClick={onDelete}
          className="p-1 rounded text-debug-text-muted dark:text-debug-text-muted-dark hover:text-error transition-colors"
          title="Delete backup"
        >
          <Trash2 size={13} />
        </button>
      </div>

      {/* <Tag> Reason */}
      {backup.reason && (
        <p className="text-xs text-debug-text-muted dark:text-debug-text-muted-dark mb-3 leading-relaxed">
          {backup.reason}
        </p>
      )}

      {/* <Tag> Color Swatches Preview */}
      {colorTokens.length > 0 && (
        <div className="flex gap-1.5 mb-3">
          {colorTokens.map(([key, value]) => (
            <div
              key={key}
              className="w-5 h-5 rounded-sm border border-debug-border dark:border-debug-border-dark"
              style={{ backgroundColor: value }}
              title={key}
            />
          ))}
        </div>
      )}

      {/* <Tag> Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-debug-border dark:border-debug-border-dark">
        <span className="text-[10px] text-debug-text-subtle-dark">
          {new Date(backup.createdAt).toLocaleString()} · {Object.keys(backup.tokens).length} tokens
        </span>
        <button
          onClick={onRestore}
          className="flex items-center gap-1 px-3 py-1 rounded-(--radius-debug-tab) text-[10px] font-semibold bg-debug-primary/10 text-debug-primary hover:bg-debug-primary/20 transition-colors duration-150"
        >
          <RotateCcw size={11} />
          Restore
        </button>
      </div>
    </div>
  );
}
