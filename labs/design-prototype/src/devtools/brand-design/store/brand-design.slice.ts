//* @type Store
//* @context Brand Design
//* @utility Estado del panel brand-design: open, seccion activa, copia de tokens al clipboard.

import { create } from "zustand";
import { BRAND_SECTIONS, type BrandSection } from "./brand-design.mock";

interface BrandDesignState {
  isOpen: boolean;
  activeSection: BrandSection;
  /** Token copiado más reciente (para feedback visual). */
  copiedToken: string | null;

  //* Abre el panel de brand design
  open: () => void;
  //* Cierra el panel
  close: () => void;
  //* Toggle del panel
  toggle: () => void;
  //* Cambia la sección activa por id
  setActiveSection: (section: BrandSection) => void;
  //* Avanza a la siguiente sección con wrap
  nextSection: () => void;
  //* Retrocede a la sección anterior con wrap
  prevSection: () => void;
  //* Marca un token como copiado y limpia el flag a los 1.6s
  markCopied: (token: string) => void;
}

export const useBrandDesignStore = create<BrandDesignState>((set, get) => ({
  isOpen: false,
  activeSection: "cover",
  copiedToken: null,

  open: () => {
    document.body.style.overflow = "hidden";
    set({ isOpen: true });
  },

  close: () => {
    document.body.style.overflow = "";
    set({ isOpen: false });
  },

  toggle: () => {
    const next = !get().isOpen;
    document.body.style.overflow = next ? "hidden" : "";
    set({ isOpen: next });
  },

  setActiveSection: (section) => set({ activeSection: section }),

  nextSection: () => {
    const current = get().activeSection;
    const idx = BRAND_SECTIONS.findIndex((s) => s.id === current);
    const next = BRAND_SECTIONS[(idx + 1) % BRAND_SECTIONS.length];
    set({ activeSection: next.id });
  },

  prevSection: () => {
    const current = get().activeSection;
    const idx = BRAND_SECTIONS.findIndex((s) => s.id === current);
    const prev = BRAND_SECTIONS[(idx - 1 + BRAND_SECTIONS.length) % BRAND_SECTIONS.length];
    set({ activeSection: prev.id });
  },

  markCopied: (token) => {
    set({ copiedToken: token });
    setTimeout(() => {
      if (get().copiedToken === token) set({ copiedToken: null });
    }, 1600);
  },
}));
