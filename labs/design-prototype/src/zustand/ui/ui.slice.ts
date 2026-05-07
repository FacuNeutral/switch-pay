//* @type Store
//* @context UI – Global
//* @utility Gestiona el estado de la interfaz: sidebar colapsado/expandido y dark mode.

import { create } from "zustand";
import { SIDEBAR_DEFAULT_COLLAPSED } from "./ui.mock";

interface UiState {
  sidebarCollapsed: boolean;
  darkMode: boolean;
  compactHeader: boolean;
  blindReady: boolean;
  subcategoryModalIndex: number | null;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleDarkMode: () => void;
  setCompactHeader: (compact: boolean) => void;
  setBlindReady: (ready: boolean) => void;
  openSubcategoryModal: (globalIndex: number) => void;
  closeSubcategoryModal: () => void;
}

const getInitialDarkMode = () => {
  if (typeof window === "undefined") return true;
  return document.documentElement.classList.contains("dark");
};

export const useUiStore = create<UiState>((set) => ({
  sidebarCollapsed: SIDEBAR_DEFAULT_COLLAPSED,
  darkMode: getInitialDarkMode(),
  compactHeader: false,
  blindReady: false,
  subcategoryModalIndex: null,

  //* Alterna el estado colapsado del sidebar.
  toggleSidebar: () => {
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
  },

  //* Fuerza el estado colapsado del sidebar.
  setSidebarCollapsed: (collapsed: boolean) => {
    set({ sidebarCollapsed: collapsed });
  },

  //* Alterna dark mode y sincroniza la clase en <html>.
  toggleDarkMode: () => {
    set((state) => {
      const next = !state.darkMode;
      document.documentElement.classList.toggle("dark", next);
      return { darkMode: next };
    });
  },

  //* Activa o desactiva el modo compacto del header.
  setCompactHeader: (compact: boolean) => {
    set({ compactHeader: compact });
  },

  //* Marca la persiana como completada — habilita animaciones de entrada.
  setBlindReady: (ready: boolean) => {
    set({ blindReady: ready });
  },

  //* Abre el modal de detalle de subcategoría con el índice global.
  openSubcategoryModal: (globalIndex: number) => {
    set({ subcategoryModalIndex: globalIndex });
  },

  //* Cierra el modal de detalle de subcategoría.
  closeSubcategoryModal: () => {
    set({ subcategoryModalIndex: null });
  },
}));
