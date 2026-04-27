//* @type Integration Component
//* @context Brand Design
//* @utility Navbar del panel brand-design: branding, theme switch y boton close.

import { Sun, Moon, X, ChevronUp, ChevronDown, Keyboard } from "lucide-react";
import { useBrandDesignStore } from "../store/brand-design.slice";
import { useUiStore } from "@/zustand/ui/ui.slice";
import { BRAND_SECTIONS } from "../store/brand-design.mock";

export default function BDNavbar() {
  const close = useBrandDesignStore((s) => s.close);
  const activeSection = useBrandDesignStore((s) => s.activeSection);
  const nextSection = useBrandDesignStore((s) => s.nextSection);
  const prevSection = useBrandDesignStore((s) => s.prevSection);
  const shortcutsOpen = useBrandDesignStore((s) => s.shortcutsOpen);
  const toggleShortcuts = useBrandDesignStore((s) => s.toggleShortcuts);
  const darkMode = useUiStore((s) => s.darkMode);
  const toggleDarkMode = useUiStore((s) => s.toggleDarkMode);

  const current = BRAND_SECTIONS.find((s) => s.id === activeSection) ?? BRAND_SECTIONS[0];
  const idx = BRAND_SECTIONS.findIndex((s) => s.id === activeSection);

  return (
    <nav className="flex items-center justify-between h-12 px-4 border-b border-debug-border dark:border-debug-border-dark bg-debug-surface dark:bg-debug-surface-dark shrink-0">
      {/* <Tag> Left — brand identifier */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold uppercase tracking-widest text-debug-primary font-debug">
          BD
        </span>
        <span className="text-xs font-medium text-debug-text-muted dark:text-debug-text-muted-dark hidden sm:inline">
          SwitchPay Brand Manual
        </span>
      </div>

      {/* <Tag> Center — current section indicator */}
      <div className="flex items-center gap-3">
        <button
          onClick={prevSection}
          className="p-1.5 rounded-(--radius-debug-tab) text-debug-text-muted dark:text-debug-text-muted-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark transition-colors duration-150"
          title="Previous section (←)"
        >
          <ChevronUp size={14} />
        </button>
        <div className="flex items-baseline gap-2">
          <span className="text-[10px] uppercase tracking-widest font-bold text-debug-primary">
            {current.number}
          </span>
          <span className="text-xs font-semibold text-debug-text dark:text-debug-text-dark">
            {current.title}
          </span>
          <span className="text-[10px] text-debug-text-muted dark:text-debug-text-muted-dark hidden md:inline">
            {idx + 1}/{BRAND_SECTIONS.length}
          </span>
        </div>
        <button
          onClick={nextSection}
          className="p-1.5 rounded-(--radius-debug-tab) text-debug-text-muted dark:text-debug-text-muted-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark transition-colors duration-150"
          title="Next section (→)"
        >
          <ChevronDown size={14} />
        </button>
      </div>

      {/* <Tag> Right — actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleShortcuts}
          className={`p-1.5 rounded-(--radius-debug-tab) transition-colors duration-150 ${
            shortcutsOpen
              ? "bg-debug-primary/10 text-debug-primary"
              : "text-debug-text-muted dark:text-debug-text-muted-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark"
          }`}
          title="Keyboard shortcuts (Ctrl+Alt+H)"
        >
          <Keyboard size={14} />
        </button>

        <button
          onClick={toggleDarkMode}
          className="p-1.5 rounded-(--radius-debug-tab) text-debug-text-muted dark:text-debug-text-muted-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark transition-colors duration-150"
          title={darkMode ? "Switch to light (Ctrl+Alt+T)" : "Switch to dark (Ctrl+Alt+T)"}
        >
          {darkMode ? <Sun size={14} /> : <Moon size={14} />}
        </button>

        <button
          onClick={close}
          className="p-1.5 rounded-(--radius-debug-tab) text-debug-text-muted dark:text-debug-text-muted-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark transition-colors duration-150"
          title="Close Brand Design (Ctrl+Alt+Q)"
        >
          <X size={14} />
        </button>
      </div>
    </nav>
  );
}
