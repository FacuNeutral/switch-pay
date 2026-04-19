//* @type Store
//* @context Pages Explore
//* @utility Estado del panel de pages-explorer: visibilidad, viewport, ruta activa, detalle y tabs.

import { create } from "zustand";
import type { ViewportMode, DetailTab } from "./pages-explorer.mock";
import { VIEWPORT_MODE_WIDTHS } from "./pages-explorer.mock";

interface PagesExplorerState {
  /** Panel visible o no */
  isOpen: boolean;

  /** Viewport mode activo */
  viewportMode: ViewportMode;

  /** Ancho custom cuando mode es "custom" */
  customWidth: number;
  customHeight: number;

  /** Ruta actual seleccionada en el panel nav */
  activeRoute: string;

  /** Panel de detalle visible */
  detailOpen: boolean;

  /** Tab activa en el panel de detalle */
  detailTab: DetailTab;

  /** Gallery modal */
  galleryOpen: boolean;

  /** Commands panel visible */
  commandsOpen: boolean;

  /** Show keyboard shortcut hints below buttons */
  showShortcutHints: boolean;

  /** Search bar focused */
  searchFocused: boolean;

  /** Highlighted index in search results (-1 = none) */
  searchHighlightIndex: number;

  /** Landscape (rotated) mode for mobile/tablet viewports */
  landscapeMode: boolean;

  /** Exit confirmation visible */
  exitConfirmOpen: boolean;

  /** Screenshots por ruta (data URL) */
  screenshots: Record<string, string>;

  /** Rutas que se están capturando actualmente */
  capturingRoutes: Set<string>;

  /** Actions */
  toggle: () => void;
  open: () => void;
  close: () => void;
  setViewportMode: (mode: ViewportMode) => void;
  setCustomSize: (width: number, height: number) => void;
  setActiveRoute: (route: string) => void;
  toggleDetail: () => void;
  setDetailTab: (tab: DetailTab) => void;
  openGallery: () => void;
  closeGallery: () => void;
  toggleCommands: () => void;
  toggleShortcutHints: () => void;
  setSearchFocused: (focused: boolean) => void;
  setSearchHighlightIndex: (index: number) => void;
  toggleLandscape: () => void;
  setExitConfirmOpen: (open: boolean) => void;
  setScreenshot: (route: string, dataUrl: string) => void;
  clearScreenshots: () => void;
  addCapturingRoute: (route: string) => void;
  removeCapturingRoute: (route: string) => void;
}

export const usePagesExplorerStore = create<PagesExplorerState>((set) => ({
  isOpen: false,
  viewportMode: "responsive",
  customWidth: 1280,
  customHeight: 720,
  activeRoute: "/",
  detailOpen: false,
  detailTab: "description",
  galleryOpen: false,
  commandsOpen: false,
  showShortcutHints: false,
  searchFocused: false,
  searchHighlightIndex: -1,
  landscapeMode: false,
  exitConfirmOpen: false,
  screenshots: {},
  capturingRoutes: new Set(),

  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),

  setViewportMode: (mode) => set({ viewportMode: mode }),

  setCustomSize: (width, height) =>
    set({ customWidth: width, customHeight: height, viewportMode: "custom" }),

  setActiveRoute: (route) => set({ activeRoute: route }),

  toggleDetail: () => set((s) => ({ detailOpen: !s.detailOpen })),

  setDetailTab: (tab) => set({ detailTab: tab }),

  openGallery: () => set({ galleryOpen: true }),
  closeGallery: () => set({ galleryOpen: false }),
  toggleCommands: () => set((s) => ({ commandsOpen: !s.commandsOpen })),
  toggleShortcutHints: () => set((s) => ({ showShortcutHints: !s.showShortcutHints })),
  setSearchFocused: (focused) => set({ searchFocused: focused, searchHighlightIndex: 0 }),
  setSearchHighlightIndex: (index) => set({ searchHighlightIndex: index }),
  toggleLandscape: () => set((s) => ({ landscapeMode: !s.landscapeMode })),
  setExitConfirmOpen: (open) => set({ exitConfirmOpen: open }),

  setScreenshot: (route, dataUrl) =>
    set((s) => ({ screenshots: { ...s.screenshots, [route]: dataUrl } })),

  clearScreenshots: () => set({ screenshots: {} }),

  addCapturingRoute: (route) =>
    set((s) => {
      const next = new Set(s.capturingRoutes);
      next.add(route);
      return { capturingRoutes: next };
    }),

  removeCapturingRoute: (route) =>
    set((s) => {
      const next = new Set(s.capturingRoutes);
      next.delete(route);
      return { capturingRoutes: next };
    }),
}));

/** Helper: calcula el ancho del iframe según el viewport mode */
export function getViewportWidth(state: PagesExplorerState): string | undefined {
  switch (state.viewportMode) {
    case "responsive":
      return undefined; // 100%
    case "mobile":
    case "tablet":
    case "desktop":
      return `${VIEWPORT_MODE_WIDTHS[state.viewportMode]}px`;
    case "custom":
      return `${state.customWidth}px`;
  }
}
