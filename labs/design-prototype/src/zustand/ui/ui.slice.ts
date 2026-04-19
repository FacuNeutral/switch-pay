//* @type Store
//* @context UI – Global
//* @utility Gestiona el estado de la interfaz: sidebar colapsado/expandido y dark mode.

import { create } from "zustand";
import { SIDEBAR_DEFAULT_COLLAPSED } from "./ui.mock";

interface UiState {
  sidebarCollapsed: boolean;
  darkMode: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleDarkMode: () => void;
}

const getInitialDarkMode = () => {
  if (typeof window === "undefined") return true;
  return document.documentElement.classList.contains("dark");
};

export const useUiStore = create<UiState>((set) => ({
  sidebarCollapsed: SIDEBAR_DEFAULT_COLLAPSED,
  darkMode: getInitialDarkMode(),

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
}));
