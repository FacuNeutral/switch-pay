//* @type Integration Component
//* @context Design Tokens
//* @utility Navbar del panel de design tokens: tabs de navegación, theme switch, indicador de cambios y botón save.

import { Paintbrush, Eye, LayoutGrid, Palette, Sun, Moon, Save, Undo2, X, RefreshCw, Archive } from "lucide-react";
import { useDesignTokensStore } from "../store/design-tokens.slice";
import { useUiStore } from "@/zustand/ui/ui.slice";
import type { DesignTokensTab } from "../store/design-tokens.mock";

const TABS: { id: DesignTokensTab; label: string; icon: React.ReactNode }[] = [
  { id: "tokens", label: "Tokens", icon: <Paintbrush size={15} /> },
  { id: "preview-landing", label: "Preview Landing", icon: <LayoutGrid size={15} /> },
  { id: "preview-raw", label: "Preview", icon: <Eye size={15} /> },
  { id: "palettes", label: "Palettes", icon: <Palette size={15} /> },
  { id: "backups", label: "Backups", icon: <Archive size={15} /> },
];

export default function DTNavbar() {
  const activeTab = useDesignTokensStore((s) => s.activeTab);
  const setActiveTab = useDesignTokensStore((s) => s.setActiveTab);
  const hasPendingChanges = useDesignTokensStore((s) => s.hasPendingChanges);
  const saving = useDesignTokensStore((s) => s.saving);
  const loading = useDesignTokensStore((s) => s.loading);
  const saveChanges = useDesignTokensStore((s) => s.saveChanges);
  const discardChanges = useDesignTokensStore((s) => s.discardChanges);
  const resyncTokens = useDesignTokensStore((s) => s.resyncTokens);
  const close = useDesignTokensStore((s) => s.close);
  const darkMode = useUiStore((s) => s.darkMode);
  const toggleDarkMode = useUiStore((s) => s.toggleDarkMode);

  return (
    <nav className="flex items-center justify-between h-12 px-4 border-b border-debug-border dark:border-debug-border-dark bg-debug-surface dark:bg-debug-surface-dark shrink-0">
      {/* <Tag> Left — Brand + Tabs */}
      <div className="flex items-center gap-4">
        <span className="text-xs font-bold uppercase tracking-widest text-debug-primary mr-2 font-debug">
          DT
        </span>

        <div className="flex items-center gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-(--radius-debug-tab) text-xs font-medium
                transition-colors duration-150
                ${
                  activeTab === tab.id
                    ? "bg-debug-primary/10 text-debug-primary"
                    : "text-debug-text-muted dark:text-debug-text-muted-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark hover:text-debug-text dark:hover:text-debug-text-dark"
                }
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* <Tag> Right — Actions */}
      <div className="flex items-center gap-2">
        {hasPendingChanges && (
          <>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-debug-viewport-mobile mr-1">
              {saving ? "Saving..." : "Unsaved changes"}
            </span>
            <button
              onClick={discardChanges}
              className="p-1.5 rounded-(--radius-debug-tab) text-debug-text-muted dark:text-debug-text-muted-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark transition-colors duration-150"
              title="Discard changes"
            >
              <Undo2 size={14} />
            </button>
            <button
              onClick={saveChanges}
              disabled={saving}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-(--radius-debug-tab) text-xs font-semibold bg-debug-primary text-debug-primary-foreground hover:bg-debug-primary-hover transition-colors duration-150 disabled:opacity-50"
            >
              <Save size={13} />
              Save
            </button>
          </>
        )}

        <button
          onClick={resyncTokens}
          disabled={loading}
          className="p-1.5 rounded-(--radius-debug-tab) text-debug-text-muted dark:text-debug-text-muted-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark transition-colors duration-150 disabled:opacity-50"
          title="Re-sync tokens from CSS"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
        </button>

        <button
          onClick={toggleDarkMode}
          className="p-1.5 rounded-(--radius-debug-tab) text-debug-text-muted dark:text-debug-text-muted-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark transition-colors duration-150"
          title={darkMode ? "Switch to light" : "Switch to dark"}
        >
          {darkMode ? <Sun size={14} /> : <Moon size={14} />}
        </button>

        <button
          onClick={close}
          className="p-1.5 rounded-(--radius-debug-tab) text-debug-text-muted dark:text-debug-text-muted-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark transition-colors duration-150"
          title="Close Design Tokens"
        >
          <X size={14} />
        </button>
      </div>
    </nav>
  );
}
