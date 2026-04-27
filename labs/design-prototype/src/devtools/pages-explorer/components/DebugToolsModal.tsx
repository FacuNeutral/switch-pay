//* @type Integration Component
//* @context Debug Tools
//* @utility Modal estilo app launcher centrado. Muestra tools disponibles con navegación por teclado.

import { useEffect, useRef, useCallback, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Layers, X, Palette, Blocks, Sparkles, Keyboard } from "lucide-react";
import { useDebugToolsStore, DEBUG_TOOLS } from "../../core/store/debug-tools.slice";
import { usePagesExplorerStore } from "../store/pages-explorer.slice";
import { useDesignTokensStore } from "../../design-tokens/store/design-tokens.slice";
import { useBrandDesignStore } from "../../brand-design/store/brand-design.slice";

function MagneticButton({ children, disabled }: { children: React.ReactNode; disabled?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.1 });

  function handleMouseMove(e: React.MouseEvent) {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

export default function DebugToolsModal() {
  const isOpen = useDebugToolsStore((s) => s.isOpen);
  const selectedIndex = useDebugToolsStore((s) => s.selectedIndex);
  const setSelectedIndex = useDebugToolsStore((s) => s.setSelectedIndex);
  const close = useDebugToolsStore((s) => s.close);

  const gridRef = useRef<HTMLDivElement>(null);
  const [showShortcuts, setShowShortcuts] = useState(false);

  const activateTool = useCallback((toolId: string) => {
    const tool = DEBUG_TOOLS.find((t) => t.id === toolId);
    if (tool?.disabled) return;
    if (toolId === "pages-explorer") {
      usePagesExplorerStore.getState().open();
    }
    if (toolId === "design-tokens") {
      useDesignTokensStore.getState().open();
    }
    if (toolId === "brand-design") {
      useBrandDesignStore.getState().open();
    }
    close();
  }, [close]);

  /* ==========================================
     Keyboard Navigation
     ========================================== */
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          setSelectedIndex(Math.min(selectedIndex + 1, DEBUG_TOOLS.length - 1));
          break;
        case "ArrowLeft":
          e.preventDefault();
          setSelectedIndex(Math.max(selectedIndex - 1, 0));
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex(Math.min(selectedIndex + 1, DEBUG_TOOLS.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex(Math.max(selectedIndex - 1, 0));
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (!DEBUG_TOOLS[selectedIndex].disabled) {
            activateTool(DEBUG_TOOLS[selectedIndex].id);
          }
          break;
        case "Escape":
          e.preventDefault();
          close();
          break;
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, setSelectedIndex, close, activateTool]);

  if (!isOpen) return null;

  const selectedTool = DEBUG_TOOLS[selectedIndex];

  const TOOL_ICONS: Record<string, React.ReactNode> = {
    layers: <Layers size={28} />,
    palette: <Palette size={28} />,
    sparkles: <Sparkles size={28} />,
    blocks: <Blocks size={28} />,
  };

  return (
    <div className="fixed inset-0 z-9300 flex items-center justify-center">
      {/* ==========================================
          Backdrop
         ========================================== */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={close}
      />

      {/* ==========================================
          Modal Container
         ========================================== */}
      <div className="relative w-96 bg-debug-surface dark:bg-debug-surface-dark border border-debug-border dark:border-debug-border-dark rounded-(--radius-debug-panel) shadow-2xl shadow-black/30 overflow-hidden">
        {/* ==========================================
            Header
           ========================================== */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-debug-border dark:border-debug-border-dark">
          <span className="text-sm font-semibold uppercase tracking-wider text-debug-text-muted dark:text-debug-text-muted-dark">
            Debug Tools
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowShortcuts((v) => !v)}
              className={`p-1.5 rounded-(--radius-debug-tab) transition-colors duration-150 ${
                showShortcuts
                  ? "bg-debug-primary/10 text-debug-primary"
                  : "text-debug-text-muted dark:text-debug-text-muted-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark"
              }`}
              title="Keyboard shortcuts"
            >
              <Keyboard size={14} />
            </button>
            <button
              onClick={close}
              className="p-1.5 rounded-(--radius-debug-tab) text-debug-text-muted dark:text-debug-text-muted-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark transition-colors duration-150"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* ==========================================
            Tools Grid (App-style)
           ========================================== */}
        <div
          ref={gridRef}
          className="p-5 flex flex-nowrap justify-center gap-4"
          role="listbox"
          aria-label="Debug tools"
        >
          {DEBUG_TOOLS.map((tool, index) => {
            const isSelected = selectedIndex === index;
            const isDisabled = !!tool.disabled;
            return (
              <MagneticButton key={tool.id} disabled={isDisabled}>
              <button
                role="option"
                aria-selected={isSelected}
                aria-disabled={isDisabled}
                onClick={() => activateTool(tool.id)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`
                  flex flex-col items-center gap-2.5 p-4 w-20 rounded-(--radius-debug-panel)
                  transition-all duration-200 outline-none
                  ${isDisabled ? "opacity-40 cursor-not-allowed" : ""}
                  ${
                    isSelected && !isDisabled
                      ? "bg-debug-primary/10 ring-2 ring-debug-primary shadow-[0_0_20px_var(--color-debug-primary-glow)] scale-105"
                      : isSelected && isDisabled
                        ? "ring-2 ring-debug-border dark:ring-debug-border-dark"
                        : !isDisabled
                          ? "hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark"
                          : ""
                  }
                `}
              >
                <div
                  className={`
                    w-12 h-12 rounded-(--radius-debug-button) flex items-center justify-center
                    transition-all duration-200
                    ${
                      isSelected && !isDisabled
                        ? "bg-debug-primary text-debug-primary-foreground shadow-[0_0_16px_var(--color-debug-primary-glow)]"
                        : "bg-debug-surface-overlay dark:bg-debug-surface-overlay-dark text-debug-text dark:text-debug-text-dark"
                    }
                  `}
                >
                  {TOOL_ICONS[tool.icon] ?? <Layers size={28} />}
                </div>
                <span className="text-xs font-medium text-debug-text dark:text-debug-text-dark text-center leading-tight">
                  {tool.label}
                </span>
                {isDisabled && (
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-debug-text-muted dark:text-debug-text-muted-dark">
                    Soon
                  </span>
                )}
              </button>
              </MagneticButton>
            );
          })}
        </div>

        {/* ==========================================
            Description Section
           ========================================== */}
        <div className="px-4 py-3 border-t border-debug-border dark:border-debug-border-dark bg-debug-surface-overlay/50 dark:bg-debug-surface-overlay-dark/50">
          <h4 className="text-sm font-semibold text-debug-text dark:text-debug-text-dark mb-1">
            {selectedTool.label}
          </h4>
          <p className="text-xs leading-relaxed text-debug-text-muted dark:text-debug-text-muted-dark">
            {selectedTool.description}
          </p>
        </div>

        {/* ==========================================
            Keyboard Shortcuts (collapsible)
           ========================================== */}
        {showShortcuts && (
          <div className="px-4 py-3 border-t border-debug-border dark:border-debug-border-dark">
            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-debug-text-muted dark:text-debug-text-muted-dark mb-2 flex items-center gap-2">
              <span>Keyboard Shortcuts</span>
              <span className="flex-1 h-px bg-debug-border dark:bg-debug-border-dark" />
            </h4>
            <div className="space-y-1.5">
              {[
                { keys: "←  →", label: "Navigate tools" },
                { keys: "Enter / Space", label: "Open selected tool" },
                { keys: "Ctrl+Alt+<", label: "Toggle this panel" },
                { keys: "Esc", label: "Close" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <span className="text-[11px] text-debug-text dark:text-debug-text-dark">{s.label}</span>
                  <kbd className="text-[10px] font-mono px-2 py-0.5 rounded-(--radius-debug-tab) bg-debug-primary/5 dark:bg-debug-primary/10 border border-debug-primary/15 dark:border-debug-primary/20 text-debug-primary">
                    {s.keys}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
