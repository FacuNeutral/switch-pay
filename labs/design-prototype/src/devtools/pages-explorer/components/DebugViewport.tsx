//* @type Integration Component
//* @context Pages Explore
//* @utility Contenedor iframe-like que envuelve el contenido de la app con viewport controlado.

import { usePagesExplorerStore } from "../store/pages-explorer.slice";
import { VIEWPORT_MODE_WIDTHS } from "../store/pages-explorer.mock";
import { useUiStore } from "@/zustand/ui/ui.slice";

export default function DebugViewport({ children }: { children: React.ReactNode }) {
  const state = usePagesExplorerStore();
  const activeRoute = usePagesExplorerStore((s) => s.activeRoute);
  const darkMode = useUiStore((s) => s.darkMode);
  const landscapeMode = usePagesExplorerStore((s) => s.landscapeMode);

  const useIframe = state.viewportMode !== "responsive";

  const iframeSrc = (() => {
    if (!useIframe) return "";
    const separator = activeRoute.includes("?") ? "&" : "?";
    return `${activeRoute}${separator}__debug_dark=${darkMode ? "1" : "0"}`;
  })();

  /** Compute effective dimensions considering landscape rotation */
  const effectiveDimensions = (() => {
    const mode = state.viewportMode;
    if (mode === "responsive") return { width: undefined as string | undefined, height: "100%" };

    if (mode === "custom") {
      const w = landscapeMode ? state.customHeight : state.customWidth;
      const h = landscapeMode ? state.customWidth : state.customHeight;
      return { width: `${w}px`, height: `${h}px` };
    }

    // mobile / tablet / desktop — use mode widths with 9:16 ratio height
    const baseWidth = VIEWPORT_MODE_WIDTHS[mode];
    const baseHeight = Math.round(baseWidth * (16 / 9));
    const w = landscapeMode ? baseHeight : baseWidth;
    const h = landscapeMode ? baseWidth : baseHeight;
    return { width: `${w}px`, height: `${h}px` };
  })();

  const viewportLabel = (() => {
    const rotated = landscapeMode ? " ↻" : "";
    switch (state.viewportMode) {
      case "responsive":
        return "Responsive — 100%";
      case "mobile":
        return `Mobile — ${effectiveDimensions.width}${rotated}`;
      case "tablet":
        return `Tablet — ${effectiveDimensions.width}${rotated}`;
      case "desktop":
        return `Desktop — ${effectiveDimensions.width}${rotated}`;
      case "custom":
        return `Custom — ${state.customWidth}×${state.customHeight}px${rotated}`;
    }
  })();

  const modeColor = (() => {
    switch (state.viewportMode) {
      case "mobile":
        return "text-debug-viewport-mobile";
      case "tablet":
        return "text-debug-viewport-tablet";
      case "desktop":
        return "text-debug-viewport-desktop";
      default:
        return "text-debug-text-muted dark:text-debug-text-muted-dark";
    }
  })();

  return (
    <div className="flex-1 min-w-0 flex flex-col bg-debug-surface-overlay dark:bg-debug-surface-overlay-dark overflow-hidden">
      {/* ==========================================
          Viewport Indicator
         ========================================== */}
      <div className="flex items-center justify-center py-2 border-b border-debug-border dark:border-debug-border-dark bg-debug-surface dark:bg-debug-surface-dark">
        <span className={`text-[10px] font-medium tracking-widest uppercase ${modeColor}`}>
          {viewportLabel}
        </span>
      </div>

      {/* ==========================================
          Viewport Container
         ========================================== */}
      <div className="flex-1 flex justify-center overflow-auto p-4 scrollbar-debug">
        <div
          className="relative bg-neutral dark:bg-neutral-dark rounded-(--radius-debug-panel) overflow-hidden shadow-lg shadow-black/20 transition-all duration-300 border border-debug-border dark:border-debug-border-dark"
          style={{
            width: effectiveDimensions.width ?? "100%",
            maxWidth: "100%",
            height: effectiveDimensions.height,
            transform: "translateZ(0)",
          }}
        >
          {useIframe ? (
            <iframe
              name="__pages_explorer__"
              src={iframeSrc}
              className="w-full h-full border-0"
              title="Page Explorer Preview"
            />
          ) : (
            <div className="w-full h-full overflow-auto scrollbar-debug">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
