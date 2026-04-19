//* @type Hook
//* @context Pages Explore
//* @utility Centraliza atajos de teclado del entorno debug. Base: Ctrl+Alt.

import { useEffect } from "react";
import { usePagesExplorerStore } from "../store/pages-explorer.slice";
import { useDebugToolsStore } from "../../core/store/debug-tools.slice";
import { useUiStore } from "@/zustand/ui/ui.slice";
import type { ViewportMode } from "../store/pages-explorer.mock";

/* ==========================================
   Viewport Cycle Order
   ========================================== */
const VIEWPORT_CYCLE: ViewportMode[] = ["responsive", "mobile", "tablet", "desktop"];

/* ==========================================
   Command Definitions
   ========================================== */
export interface DebugCommand {
  id: string;
  label: string;
  shortcut: string;
  section: string;
}

export const DEBUG_COMMANDS: DebugCommand[] = [
  /* --- Viewport --- */
  { id: "viewport-1", label: "Responsive", shortcut: "Ctrl+Alt+1", section: "Viewport" },
  { id: "viewport-2", label: "Mobile", shortcut: "Ctrl+Alt+2", section: "Viewport" },
  { id: "viewport-3", label: "Tablet", shortcut: "Ctrl+Alt+3", section: "Viewport" },
  { id: "viewport-4", label: "Desktop", shortcut: "Ctrl+Alt+4", section: "Viewport" },
  { id: "viewport-cycle", label: "Cycle viewport", shortcut: "Ctrl+Alt+V", section: "Viewport" },
  { id: "viewport-rotate", label: "Toggle landscape", shortcut: "Ctrl+Alt+5", section: "Viewport" },

  /* --- Navigation --- */
  { id: "search-focus", label: "Focus page search", shortcut: "Ctrl+Alt+S", section: "Navigation" },
  { id: "gallery-open", label: "Open page gallery", shortcut: "Ctrl+Alt+S+S", section: "Navigation" },

  /* --- Panels --- */
  { id: "panel-description", label: "Toggle detail panel", shortcut: "Ctrl+Alt+D", section: "Panels" },
  { id: "panel-commands", label: "Open commands panel", shortcut: "Ctrl+Alt+H", section: "Panels" },
  { id: "hints-toggle", label: "Toggle shortcut hints", shortcut: "Ctrl+Alt+H+H", section: "Panels" },

  /* --- Tools --- */
  { id: "theme-toggle", label: "Toggle dark / light", shortcut: "Ctrl+Alt+T", section: "Tools" },
  { id: "exit-debug", label: "Exit debug mode", shortcut: "Ctrl+Alt+Q", section: "Tools" },
  { id: "open-debug", label: "Open debug tools", shortcut: "Ctrl+Alt+<", section: "Tools" },
];

/* ==========================================
   Hook
   ========================================== */
export function useDebugKeyboard() {
  useEffect(() => {
    let lastHTime = 0;
    let lastSTime = 0;

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

      /* --- Ctrl+Alt+1/2/3/4: select viewport by position --- */
      if (["Digit1", "Digit2", "Digit3", "Digit4"].includes(code)) {
        e.preventDefault();
        const store = usePagesExplorerStore.getState();
        const idx = parseInt(code.replace("Digit", ""), 10) - 1;
        if (idx >= 0 && idx < VIEWPORT_CYCLE.length) {
          store.setViewportMode(VIEWPORT_CYCLE[idx]);
        }
        return;
      }

      /* --- Ctrl+Alt+5: toggle landscape rotation --- */
      if (code === "Digit5") {
        e.preventDefault();
        usePagesExplorerStore.getState().toggleLandscape();
        return;
      }

      /* --- Ctrl+Alt+S / Ctrl+Alt+S+S: focus search / open gallery --- */
      if (code === "KeyS") {
        e.preventDefault();
        const store = usePagesExplorerStore.getState();
        if (!store.isOpen) return;
        const now = Date.now();
        if (now - lastSTime < 400) {
          /* double S — open gallery modal, close search dropdown */
          store.setSearchFocused(false);
          store.openGallery();
          lastSTime = 0;
        } else {
          /* single S — focus page search */
          store.setSearchFocused(true);
          lastSTime = now;
        }
        return;
      }

      /* --- Ctrl+Alt+V: cycle viewport --- */
      if (code === "KeyV") {
        e.preventDefault();
        const store = usePagesExplorerStore.getState();
        const currentIndex = VIEWPORT_CYCLE.indexOf(store.viewportMode);
        const idx = currentIndex === -1 ? 0 : currentIndex;
        const next = (idx + 1) % VIEWPORT_CYCLE.length;
        store.setViewportMode(VIEWPORT_CYCLE[next]);
        return;
      }

      /* --- Ctrl+Alt+D: toggle detail panel --- */
      if (code === "KeyD") {
        e.preventDefault();
        const store = usePagesExplorerStore.getState();
        if (!store.isOpen) return;
        store.toggleDetail();
        return;
      }

      /* --- Ctrl+Alt+T: toggle dark/light theme --- */
      if (code === "KeyT") {
        e.preventDefault();
        useUiStore.getState().toggleDarkMode();
        return;
      }

      /* --- Ctrl+Alt+Q: exit debug mode (with confirmation) --- */
      if (code === "KeyQ") {
        e.preventDefault();
        const store = usePagesExplorerStore.getState();
        if (!store.isOpen) return;
        store.setExitConfirmOpen(true);
        return;
      }

      /* --- Ctrl+Alt+H / Ctrl+Alt+H+H: commands panel / toggle hints --- */
      if (code === "KeyH") {
        e.preventDefault();
        const store = usePagesExplorerStore.getState();
        if (!store.isOpen) return;
        const now = Date.now();
        if (now - lastHTime < 400) {
          /* double H — toggle shortcut hints only, don't open commands */
          if (store.commandsOpen) store.toggleCommands();
          store.toggleShortcutHints();
          lastHTime = 0;
        } else {
          /* single H — toggle commands panel */
          store.toggleCommands();
          lastHTime = now;
        }
        return;
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
}
