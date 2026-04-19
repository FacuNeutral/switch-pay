//* @type Hook
//* @context Debug Tools
//* @utility Orquestador central de atajos de teclado para todas las herramientas debug. Despacha según el tool activo.

import { useEffect } from "react";
import { useDebugToolsStore } from "../store/debug-tools.slice";
import { useUiStore } from "@/zustand/ui/ui.slice";
import { usePagesExplorerStore } from "../../pages-explorer/store/pages-explorer.slice";
import { useDesignTokensStore } from "../../design-tokens/store/design-tokens.slice";
import type { ViewportMode } from "../../pages-explorer/store/pages-explorer.mock";
import type { DesignTokensTab } from "../../design-tokens/store/design-tokens.mock";

/* ==========================================
   Pages Explorer Constants
   ========================================== */
const VIEWPORT_CYCLE: ViewportMode[] = ["responsive", "mobile", "tablet", "desktop"];

/* ==========================================
   Design Tokens Constants
   ========================================== */
const TAB_BY_DIGIT: Record<string, DesignTokensTab> = {
  Digit1: "tokens",
  Digit2: "preview-landing",
  Digit3: "preview-raw",
  Digit4: "palettes",
  Digit5: "backups",
};

/* ==========================================
   Pages Explorer Handler
   ========================================== */
function handlePagesExplorer(e: KeyboardEvent, code: string, lastSTime: { v: number }, lastHTime: { v: number }): boolean {
  const store = usePagesExplorerStore.getState();
  if (!store.isOpen) return false;

  /* --- Ctrl+Alt+1/2/3/4: select viewport by position --- */
  if (["Digit1", "Digit2", "Digit3", "Digit4"].includes(code)) {
    e.preventDefault();
    const idx = parseInt(code.replace("Digit", ""), 10) - 1;
    if (idx >= 0 && idx < VIEWPORT_CYCLE.length) {
      store.setViewportMode(VIEWPORT_CYCLE[idx]);
    }
    return true;
  }

  /* --- Ctrl+Alt+5: toggle landscape rotation --- */
  if (code === "Digit5") {
    e.preventDefault();
    store.toggleLandscape();
    return true;
  }

  /* --- Ctrl+Alt+S / Ctrl+Alt+S+S: focus search / open gallery --- */
  if (code === "KeyS") {
    e.preventDefault();
    const now = Date.now();
    if (now - lastSTime.v < 400) {
      store.setSearchFocused(false);
      store.openGallery();
      lastSTime.v = 0;
    } else {
      store.setSearchFocused(true);
      lastSTime.v = now;
    }
    return true;
  }

  /* --- Ctrl+Alt+V: cycle viewport --- */
  if (code === "KeyV") {
    e.preventDefault();
    const currentIndex = VIEWPORT_CYCLE.indexOf(store.viewportMode);
    const idx = currentIndex === -1 ? 0 : currentIndex;
    const next = (idx + 1) % VIEWPORT_CYCLE.length;
    store.setViewportMode(VIEWPORT_CYCLE[next]);
    return true;
  }

  /* --- Ctrl+Alt+D: toggle detail panel --- */
  if (code === "KeyD") {
    e.preventDefault();
    store.toggleDetail();
    return true;
  }

  /* --- Ctrl+Alt+Q: exit debug mode (with confirmation) --- */
  if (code === "KeyQ") {
    e.preventDefault();
    store.setExitConfirmOpen(true);
    return true;
  }

  /* --- Ctrl+Alt+H / Ctrl+Alt+H+H: commands panel / toggle hints --- */
  if (code === "KeyH") {
    e.preventDefault();
    const now = Date.now();
    if (now - lastHTime.v < 400) {
      if (store.commandsOpen) store.toggleCommands();
      store.toggleShortcutHints();
      lastHTime.v = 0;
    } else {
      store.toggleCommands();
      lastHTime.v = now;
    }
    return true;
  }

  return false;
}

/* ==========================================
   Design Tokens Handler
   ========================================== */
function handleDesignTokens(e: KeyboardEvent, code: string): boolean {
  const store = useDesignTokensStore.getState();
  if (!store.isOpen) return false;

  /* --- Ctrl+Alt+S: save pending changes --- */
  if (code === "KeyS") {
    e.preventDefault();
    if (store.hasPendingChanges && !store.saving) {
      store.saveChanges();
    }
    return true;
  }

  /* --- Ctrl+Alt+Z: discard pending changes --- */
  if (code === "KeyZ") {
    e.preventDefault();
    if (store.hasPendingChanges) {
      store.discardChanges();
    }
    return true;
  }

  /* --- Ctrl+Alt+R: re-sync tokens from CSS --- */
  if (code === "KeyR") {
    e.preventDefault();
    store.resyncTokens();
    return true;
  }

  /* --- Ctrl+Alt+1/2/3/4/5: switch tab --- */
  if (code in TAB_BY_DIGIT) {
    e.preventDefault();
    store.setActiveTab(TAB_BY_DIGIT[code]);
    return true;
  }

  /* --- Ctrl+Alt+Q: close design tokens panel --- */
  if (code === "KeyQ") {
    e.preventDefault();
    store.close();
    return true;
  }

  return false;
}

/* ==========================================
   Hook
   ========================================== */
export function useDevtoolsKeyboard() {
  useEffect(() => {
    if (import.meta.env.VITE_DEV_MODE !== "true") return;

    const lastHTime = { v: 0 };
    const lastSTime = { v: 0 };

    function handleKeyDown(e: KeyboardEvent) {
      const ctrl = e.ctrlKey;
      const alt = e.altKey;
      const code = e.code;

      if (!ctrl || !alt) return;

      /* --- Global: Ctrl+Alt+< — toggle debug tools modal --- */
      if (code === "IntlBackslash") {
        e.preventDefault();
        useDebugToolsStore.getState().toggle();
        return;
      }

      /* --- Global: Ctrl+Alt+T — toggle dark/light theme --- */
      if (code === "KeyT") {
        e.preventDefault();
        useUiStore.getState().toggleDarkMode();
        return;
      }

      /* --- Dispatch to active tool (design-tokens has priority over pages-explorer) --- */
      if (handleDesignTokens(e, code)) return;
      if (handlePagesExplorer(e, code, lastSTime, lastHTime)) return;
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
}
