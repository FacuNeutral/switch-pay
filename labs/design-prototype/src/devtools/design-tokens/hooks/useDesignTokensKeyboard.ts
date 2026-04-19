//* @type Hook
//* @context Design Tokens
//* @utility Centraliza atajos de teclado del design tokens explorer. Base: Ctrl+Alt.

import { useEffect } from "react";
import { useDesignTokensStore } from "../store/design-tokens.slice";
import { useDebugToolsStore } from "../../core/store/debug-tools.slice";
import { useUiStore } from "@/zustand/ui/ui.slice";
import type { DesignTokensTab } from "../store/design-tokens.mock";

/* ==========================================
   Command Definitions
   ========================================== */
export interface DesignTokensCommand {
  id: string;
  label: string;
  shortcut: string;
  section: string;
}

export const DESIGN_TOKENS_COMMANDS: DesignTokensCommand[] = [
  /* --- Actions --- */
  { id: "save-changes", label: "Save changes", shortcut: "Ctrl+Alt+S", section: "Actions" },
  { id: "discard-changes", label: "Discard changes", shortcut: "Ctrl+Alt+Z", section: "Actions" },
  { id: "resync-tokens", label: "Re-sync tokens", shortcut: "Ctrl+Alt+R", section: "Actions" },

  /* --- Tabs --- */
  { id: "tab-tokens", label: "Tokens tab", shortcut: "Ctrl+Alt+1", section: "Tabs" },
  { id: "tab-preview-landing", label: "Preview landing tab", shortcut: "Ctrl+Alt+2", section: "Tabs" },
  { id: "tab-preview-raw", label: "Preview raw tab", shortcut: "Ctrl+Alt+3", section: "Tabs" },
  { id: "tab-palettes", label: "Palettes tab", shortcut: "Ctrl+Alt+4", section: "Tabs" },
  { id: "tab-backups", label: "Backups tab", shortcut: "Ctrl+Alt+5", section: "Tabs" },

  /* --- Tools --- */
  { id: "theme-toggle", label: "Toggle dark / light", shortcut: "Ctrl+Alt+T", section: "Tools" },
  { id: "close-panel", label: "Close panel", shortcut: "Ctrl+Alt+Q", section: "Tools" },
  { id: "open-debug", label: "Open debug tools", shortcut: "Ctrl+Alt+<", section: "Tools" },
];

/* ==========================================
   Tab Cycle Order
   ========================================== */
const TAB_BY_DIGIT: Record<string, DesignTokensTab> = {
  Digit1: "tokens",
  Digit2: "preview-landing",
  Digit3: "preview-raw",
  Digit4: "palettes",
  Digit5: "backups",
};

/* ==========================================
   Hook
   ========================================== */
export function useDesignTokensKeyboard() {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const ctrl = e.ctrlKey;
      const alt = e.altKey;
      const code = e.code;

      if (!ctrl || !alt) return;

      /* --- Ctrl+Alt+< (key next to left Shift): debug tools modal --- */
      if (code === "IntlBackslash") {
        e.preventDefault();
        useDebugToolsStore.getState().toggle();
        return;
      }

      const store = useDesignTokensStore.getState();
      if (!store.isOpen) return;

      /* --- Ctrl+Alt+S: save pending changes --- */
      if (code === "KeyS") {
        e.preventDefault();
        if (store.hasPendingChanges && !store.saving) {
          store.saveChanges();
        }
        return;
      }

      /* --- Ctrl+Alt+Z: discard pending changes --- */
      if (code === "KeyZ") {
        e.preventDefault();
        if (store.hasPendingChanges) {
          store.discardChanges();
        }
        return;
      }

      /* --- Ctrl+Alt+R: re-sync tokens from CSS --- */
      if (code === "KeyR") {
        e.preventDefault();
        store.resyncTokens();
        return;
      }

      /* --- Ctrl+Alt+1/2/3/4/5: switch tab --- */
      if (code in TAB_BY_DIGIT) {
        e.preventDefault();
        store.setActiveTab(TAB_BY_DIGIT[code]);
        return;
      }

      /* --- Ctrl+Alt+T: toggle dark/light theme --- */
      if (code === "KeyT") {
        e.preventDefault();
        useUiStore.getState().toggleDarkMode();
        return;
      }

      /* --- Ctrl+Alt+Q: close design tokens panel --- */
      if (code === "KeyQ") {
        e.preventDefault();
        store.close();
        return;
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
}
