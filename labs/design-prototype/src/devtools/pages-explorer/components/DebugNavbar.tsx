//* @type Integration Component
//* @context Pages Explore
//* @utility Navbar del panel de pages-explorer: rutas, viewport switcher, presets custom y toggle de detalles.

import {
  Monitor,
  Tablet,
  Smartphone,
  Maximize2,
  PanelRight,
  ChevronDown,
  Scaling,
  Search,
  LayoutGrid,
  Check,
  RefreshCw,
  Keyboard,
  Sun,
  Moon,
  RotateCcw,
  LogOut,
} from "lucide-react";
import DebugCommandsPanel from "./DebugCommandsPanel";
import { useDebugBrandLetters } from "../hooks/useDebugBrandLetters";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { usePagesExplorerStore } from "../store/pages-explorer.slice";
import { useUiStore } from "@/zustand/ui/ui.slice";
import {
  ROUTE_MAP,
  VIEWPORT_PRESETS,
  type ViewportMode,
} from "../store/pages-explorer.mock";

export default function DebugNavbar() {
  const activeRoute = usePagesExplorerStore((s) => s.activeRoute);
  const setActiveRoute = usePagesExplorerStore((s) => s.setActiveRoute);
  const viewportMode = usePagesExplorerStore((s) => s.viewportMode);
  const setViewportMode = usePagesExplorerStore((s) => s.setViewportMode);
  const setCustomSize = usePagesExplorerStore((s) => s.setCustomSize);
  const detailOpen = usePagesExplorerStore((s) => s.detailOpen);
  const toggleDetail = usePagesExplorerStore((s) => s.toggleDetail);
  const openGallery = usePagesExplorerStore((s) => s.openGallery);
  const closeDebug = usePagesExplorerStore((s) => s.close);
  const exitConfirmOpen = usePagesExplorerStore((s) => s.exitConfirmOpen);
  const setExitConfirmOpen = usePagesExplorerStore((s) => s.setExitConfirmOpen);
  const commandsOpen = usePagesExplorerStore((s) => s.commandsOpen);
  const toggleCommands = usePagesExplorerStore((s) => s.toggleCommands);
  const showShortcutHints = usePagesExplorerStore((s) => s.showShortcutHints);
  const toggleShortcutHints = usePagesExplorerStore((s) => s.toggleShortcutHints);
  const searchFocused = usePagesExplorerStore((s) => s.searchFocused);
  const setSearchFocused = usePagesExplorerStore((s) => s.setSearchFocused);
  const searchHighlightIndex = usePagesExplorerStore((s) => s.searchHighlightIndex);
  const setSearchHighlightIndex = usePagesExplorerStore((s) => s.setSearchHighlightIndex);
  const landscapeMode = usePagesExplorerStore((s) => s.landscapeMode);
  const toggleLandscape = usePagesExplorerStore((s) => s.toggleLandscape);

  const darkMode = useUiStore((s) => s.darkMode);
  const toggleDarkMode = useUiStore((s) => s.toggleDarkMode);

  const [presetsOpen, setPresetsOpen] = useState(false);
  const presetsRef = useRef<HTMLDivElement>(null);
  const [routeQuery, setRouteQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (presetsRef.current && !presetsRef.current.contains(e.target as Node)) {
        setPresetsOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setSearchFocused]);

  /** Auto-focus input when searchFocused activates (e.g. via Ctrl+Alt+S) */
  useEffect(() => {
    if (searchFocused) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [searchFocused]);

  /** Escape closes shortcut hints */
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && showShortcutHints) {
        toggleShortcutHints();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showShortcutHints, toggleShortcutHints]);

  const filteredRoutes = useMemo(() => {
    if (!routeQuery.trim()) return ROUTE_MAP;
    const q = routeQuery.toLowerCase();
    return ROUTE_MAP.filter(
      (r) =>
        r.label.toLowerCase().includes(q) ||
        r.path.toLowerCase().includes(q)
    );
  }, [routeQuery]);

  const activeEntry = ROUTE_MAP.find((r) => r.navigateTo === activeRoute);
  const activePathDisplay = activeEntry?.navigateTo ?? activeRoute;

  const viewportButtons: { mode: ViewportMode; icon: React.ReactNode; label: string }[] = [
    { mode: "responsive", icon: <Maximize2 size={16} />, label: "Responsive" },
    { mode: "mobile", icon: <Smartphone size={16} />, label: "Mobile" },
    { mode: "tablet", icon: <Tablet size={16} />, label: "Tablet" },
    { mode: "desktop", icon: <Monitor size={16} />, label: "Desktop" },
  ];

  const handleSearchKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = searchHighlightIndex < filteredRoutes.length - 1 ? searchHighlightIndex + 1 : 0;
      setSearchHighlightIndex(next);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = searchHighlightIndex > 0 ? searchHighlightIndex - 1 : filteredRoutes.length - 1;
      setSearchHighlightIndex(prev);
    } else if (e.key === "Enter" && searchHighlightIndex >= 0 && searchHighlightIndex < filteredRoutes.length) {
      e.preventDefault();
      setActiveRoute(filteredRoutes[searchHighlightIndex].navigateTo);
      setRouteQuery("");
      setSearchFocused(false);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setSearchFocused(false);
    }
  }, [searchHighlightIndex, filteredRoutes, setSearchHighlightIndex, setActiveRoute, setSearchFocused]);

  const brandLetters = useDebugBrandLetters({
    segments: [
      { text: "PAGES EXPLORER ", className: "text-debug-primary animate-debug-brand" },
      { text: "- DEVTOOLS", className: "text-debug-text-muted dark:text-debug-text-muted-dark" },
    ],
  });

  return (
    <nav className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-3 bg-debug-surface dark:bg-debug-surface-dark border-b border-debug-border dark:border-debug-border-dark">
      {/* ==========================================
          Left — Brand label
         ========================================== */}
      <div className="flex items-center gap-2 justify-self-start">
        <span className="font-debug text-sm font-semibold select-none inline-flex tracking-wide">
          {brandLetters}
        </span>
      </div>

      {/* ==========================================
          Center — Route Search Bar
         ========================================== */}
      <div className="relative w-80" ref={searchRef}>
        <div
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-(--radius-debug-panel) bg-debug-surface-overlay dark:bg-debug-surface-overlay-dark border border-debug-border dark:border-debug-border-dark cursor-text transition-colors duration-150 hover:border-debug-border-active dark:hover:border-debug-border-active-dark focus-within:border-debug-primary focus-within:ring-1 focus-within:ring-debug-primary-glow"
          onClick={() => setSearchFocused(true)}
        >
          <Search size={15} className="text-debug-text-muted dark:text-debug-text-muted-dark shrink-0" />
          {searchFocused ? (
            <input
              ref={inputRef}
              type="text"
              value={routeQuery}
              onChange={(e) => {
                setRouteQuery(e.target.value);
                setSearchHighlightIndex(0);
              }}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search pages..."
              autoFocus
              className="flex-1 min-w-0 bg-transparent text-sm text-debug-text dark:text-debug-text-dark placeholder:text-debug-text-muted dark:placeholder:text-debug-text-muted-dark outline-none"
            />
          ) : (
            <span className="flex-1 min-w-0 truncate text-sm text-debug-text dark:text-debug-text-dark">
              {activePathDisplay}
            </span>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); openGallery(); }}
            className="shrink-0 p-0.5 rounded text-debug-text-muted dark:text-debug-text-muted-dark hover:text-debug-text dark:hover:text-debug-text-dark transition-colors duration-150"
            title="Open page gallery (Ctrl+Alt+S+S)"
          >
            <LayoutGrid size={14} />
          </button>
        </div>

        {/* Dropdown results */}
        {searchFocused && (
          <div className="absolute left-0 right-0 top-full mt-1.5 bg-debug-surface-raised dark:bg-debug-surface-raised-dark border border-debug-border dark:border-debug-border-dark rounded-(--radius-debug-panel) shadow-lg shadow-black/20 overflow-hidden z-9250">
            <div className="max-h-72 overflow-y-auto py-1 scrollbar-debug">
              {filteredRoutes.length === 0 ? (
                <div className="px-4 py-5 text-center text-sm text-debug-text-muted dark:text-debug-text-muted-dark">
                  No pages found
                </div>
              ) : (
                filteredRoutes.map((route, index) => {
                  const isActive = activeRoute === route.navigateTo;
                  const isHighlighted = searchHighlightIndex === index;
                  return (
                    <button
                      key={route.path}
                      onClick={() => {
                        setActiveRoute(route.navigateTo);
                        setRouteQuery("");
                        setSearchFocused(false);
                      }}
                      onMouseEnter={() => setSearchHighlightIndex(index)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150 ${
                        isActive
                          ? "bg-debug-primary/10 text-debug-primary font-medium"
                          : isHighlighted
                            ? "bg-debug-surface-overlay dark:bg-debug-surface-overlay-dark text-debug-text dark:text-debug-text-dark"
                            : "text-debug-text dark:text-debug-text-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark"
                      }`}
                    >
                      <span className="w-5 shrink-0 flex items-center justify-center">
                        {isActive && <Check size={14} className="text-debug-primary" />}
                      </span>
                      <span className="font-medium">{route.label}</span>
                      <span className="flex-1 text-left truncate text-xs text-debug-text-muted dark:text-debug-text-muted-dark">
                        {route.path}
                      </span>
                      {route.nested && (
                        <span className="text-[10px] px-2 py-0.5 rounded-(--radius-debug-chip) bg-debug-primary/10 border border-debug-primary/20 text-debug-primary font-medium">
                          :id
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* ==========================================
          Right — Controls
         ========================================== */}
      <div className="flex items-center gap-1 justify-self-end">
        <div className="w-px h-7 bg-debug-border dark:bg-debug-border-dark mx-1" />

        {/* Viewport Mode Buttons */}
        <div className="flex items-center gap-0.5">
          {viewportButtons.map((vp, index) => (
          <button
            key={vp.mode}
            onClick={() => setViewportMode(vp.mode)}
            className={`
              relative p-2 rounded-(--radius-debug-tab) transition-all duration-200
              ${
                viewportMode === vp.mode
                  ? "bg-debug-primary text-debug-primary-foreground shadow-[0_0_12px_var(--color-debug-primary-glow)]"
                  : "text-debug-text-muted dark:text-debug-text-muted-dark hover:text-debug-text dark:hover:text-debug-text-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark"
              }
            `}
            title={vp.label}
          >
            {vp.icon}
            {showShortcutHints && (
              <span className="absolute -bottom-1.5 -right-1.5 flex items-center justify-center px-1.5 py-0.5 rounded bg-debug-accent/20 border border-debug-accent/30 text-xs font-mono font-bold text-debug-accent leading-none">{index + 1}</span>
            )}
          </button>
          ))}
        </div>

        {/* Landscape Rotation Toggle */}
        <button
          onClick={toggleLandscape}
          disabled={viewportMode === "responsive"}
          className={`
            relative p-2 rounded-(--radius-debug-tab) transition-all duration-200
            ${viewportMode === "responsive" ? "opacity-30 cursor-not-allowed" : ""}
            ${
              landscapeMode
                ? "bg-debug-primary text-debug-primary-foreground shadow-[0_0_12px_var(--color-debug-primary-glow)]"
                : "text-debug-text-muted dark:text-debug-text-muted-dark hover:text-debug-text dark:hover:text-debug-text-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark"
            }
          `}
          title="Toggle landscape rotation"
        >
          <RotateCcw size={16} />
          {showShortcutHints && (
            <span className="absolute -bottom-1.5 -right-1.5 flex items-center justify-center px-1.5 py-0.5 rounded bg-debug-accent/20 border border-debug-accent/30 text-xs font-mono font-bold text-debug-accent leading-none">5</span>
          )}
        </button>

        {/* Custom Presets Dropdown */}
        <div className="relative" ref={presetsRef}>
          <button
            onClick={() => setPresetsOpen(!presetsOpen)}
            className={`
              flex items-center gap-1.5 px-2.5 py-2 rounded-(--radius-debug-tab) text-sm
              transition-all duration-200
              ${
                viewportMode === "custom"
                  ? "bg-debug-primary text-debug-primary-foreground shadow-[0_0_12px_var(--color-debug-primary-glow)]"
                  : "text-debug-text-muted dark:text-debug-text-muted-dark hover:text-debug-text dark:hover:text-debug-text-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark"
              }
            `}
          title="Custom resolution"
          >
            <Scaling size={16} />
            <ChevronDown size={13} />
          </button>

          {presetsOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-64 bg-debug-surface-raised dark:bg-debug-surface-raised-dark border border-debug-border dark:border-debug-border-dark rounded-(--radius-debug-panel) shadow-lg shadow-black/20 overflow-hidden z-9250">
              <div className="px-4 py-2.5 border-b border-debug-border dark:border-debug-border-dark">
                <span className="text-xs font-semibold uppercase tracking-wider text-debug-text-muted dark:text-debug-text-muted-dark">
                  Presets
                </span>
              </div>
              <div className="max-h-72 overflow-y-auto py-1 scrollbar-debug">
                {VIEWPORT_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => {
                      setCustomSize(preset.width, preset.height);
                      setPresetsOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-debug-text dark:text-debug-text-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark transition-colors duration-150"
                  >
                    <span className="flex items-center gap-2.5">
                      {preset.icon === "mobile" && <Smartphone size={14} />}
                      {preset.icon === "tablet" && <Tablet size={14} />}
                      {preset.icon === "desktop" && <Monitor size={14} />}
                      {preset.label}
                    </span>
                    <span className="text-xs text-debug-text-muted dark:text-debug-text-muted-dark">
                      {preset.width}×{preset.height}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="w-px h-7 bg-debug-border dark:bg-debug-border-dark mx-1" />

        {/* Detail Panel Toggle */}
        <button
          onClick={toggleDetail}
          className={`
            relative p-2 rounded-(--radius-debug-tab) transition-all duration-200
            ${
              detailOpen
                ? "bg-debug-primary text-debug-primary-foreground shadow-[0_0_12px_var(--color-debug-primary-glow)]"
                : "text-debug-text-muted dark:text-debug-text-muted-dark hover:text-debug-text dark:hover:text-debug-text-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark"
            }
          `}
          title="Toggle details panel"
        >
          <PanelRight size={16} />
          {showShortcutHints && (
            <span className="absolute -bottom-1.5 -right-1.5 flex items-center justify-center px-1.5 py-0.5 rounded bg-debug-accent/20 border border-debug-accent/30 text-xs font-mono font-bold text-debug-accent leading-none">D</span>
          )}
        </button>

        <div className="w-px h-7 bg-debug-border dark:bg-debug-border-dark mx-1" />

        {/* Keyboard Shortcuts Panel Toggle */}
        <button
          onClick={toggleCommands}
          className={`
            relative p-2 rounded-(--radius-debug-tab) transition-all duration-200
            ${
              commandsOpen
                ? "bg-debug-primary text-debug-primary-foreground shadow-[0_0_12px_var(--color-debug-primary-glow)]"
                : "text-debug-text-muted dark:text-debug-text-muted-dark hover:text-debug-text dark:hover:text-debug-text-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark"
            }
          `}
          title="Keyboard shortcuts"
        >
          <Keyboard size={16} />
          {showShortcutHints && (
            <span className="absolute -bottom-1.5 -right-1.5 flex items-center justify-center px-1.5 py-0.5 rounded bg-debug-accent/20 border border-debug-accent/30 text-xs font-mono font-bold text-debug-accent leading-none">H</span>
          )}
        </button>

        <div className="w-px h-7 bg-debug-border dark:bg-debug-border-dark mx-1" />

        {/* Dark / Light Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="relative p-2 rounded-(--radius-debug-tab) text-debug-text-muted dark:text-debug-text-muted-dark hover:text-debug-text dark:hover:text-debug-text-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark transition-all duration-200"
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          {showShortcutHints && (
            <span className="absolute -bottom-1.5 -right-1.5 flex items-center justify-center px-1.5 py-0.5 rounded bg-debug-accent/20 border border-debug-accent/30 text-xs font-mono font-bold text-debug-accent leading-none">T</span>
          )}
        </button>

        <div className="w-px h-7 bg-debug-border dark:bg-debug-border-dark mx-1" />

        {/* Exit Debug Mode */}
        <button
          onClick={() => setExitConfirmOpen(true)}
          className="relative p-2 rounded-(--radius-debug-tab) text-debug-accent hover:bg-debug-accent/10 hover:shadow-[0_0_12px_var(--color-debug-accent-glow)] transition-all duration-200"
          title="Exit debug mode (Ctrl+Alt+Q)"
        >
          <LogOut size={16} />
          {showShortcutHints && (
            <span className="absolute -bottom-1.5 -right-1.5 flex items-center justify-center px-1.5 py-0.5 rounded bg-debug-accent/20 border border-debug-accent/30 text-xs font-mono font-bold text-debug-accent leading-none">Q</span>
          )}
        </button>
      </div>

      {/* ==========================================
          Commands Panel
         ========================================== */}
      <DebugCommandsPanel open={commandsOpen} onClose={toggleCommands} />

      {/* ==========================================
          Exit Confirmation Toast
         ========================================== */}
      {exitConfirmOpen && (
        <ExitConfirmToast
          onConfirm={() => { setExitConfirmOpen(false); closeDebug(); }}
          onCancel={() => setExitConfirmOpen(false)}
        />
      )}
    </nav>
  );
}

function ExitConfirmToast({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => toastRef.current?.focus());

    function handleKey(e: KeyboardEvent) {
      /* Ignore modifier combos (Ctrl+Alt+Q re-opens, Meta shortcuts, etc.) */
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      e.preventDefault();
      if (e.key === "Enter" || e.key === " ") {
        onConfirm();
      } else {
        onCancel();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onConfirm, onCancel]);

  return (
    <div
      ref={toastRef}
      tabIndex={-1}
      className="fixed top-16 left-1/2 -translate-x-1/2 z-9400 flex items-center gap-4 px-6 py-4 rounded-(--radius-debug-panel) bg-debug-surface-raised dark:bg-debug-surface-raised-dark border border-debug-accent/30 shadow-xl shadow-debug-accent-glow outline-none animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <span className="text-base font-medium text-debug-text dark:text-debug-text-dark whitespace-nowrap">
        Exit debug mode?
      </span>
      <div className="flex items-center gap-2">
        <kbd className="text-xs font-mono px-2.5 py-1.5 rounded bg-debug-accent/20 border border-debug-accent/30 text-debug-accent">
          Enter
        </kbd>
        <span className="text-xs text-debug-text-muted dark:text-debug-text-muted-dark">/</span>
        <kbd className="text-xs font-mono px-2.5 py-1.5 rounded bg-debug-accent/20 border border-debug-accent/30 text-debug-accent">
          Space
        </kbd>
      </div>
      <span className="text-sm text-debug-text-muted dark:text-debug-text-muted-dark whitespace-nowrap">
        to confirm · any other key to cancel
      </span>
    </div>
  );
}
