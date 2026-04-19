//* @type Store
//* @context Shorts
//* @utility Estado central de los shorts: navegación y video activo.

import { create } from "zustand";
import type { Short } from "@/entities/short.entity";
import { shortsMock, findShortById } from "./shorts.mock";

interface ShortsState {
  shorts: Short[];
  activeShort: Short | null;
  activeIndex: number;
  setActiveShort: (id: string) => void;
  goToNext: () => void;
  goToPrevious: () => void;
}

export const useShortsStore = create<ShortsState>((set, get) => ({
  shorts: shortsMock,
  activeShort: shortsMock[0] ?? null,
  activeIndex: 0,

  //* Establece el short activo por id.
  setActiveShort: (id: string) => {
    const short = findShortById(id) ?? null;
    const index = get().shorts.findIndex((s) => s.id === id);
    set({ activeShort: short, activeIndex: index >= 0 ? index : 0 });
  },

  //* Avanza al siguiente short.
  goToNext: () => {
    const { shorts, activeIndex } = get();
    const nextIndex = Math.min(activeIndex + 1, shorts.length - 1);
    set({ activeShort: shorts[nextIndex], activeIndex: nextIndex });
  },

  //* Retrocede al short anterior.
  goToPrevious: () => {
    const { shorts, activeIndex } = get();
    const prevIndex = Math.max(activeIndex - 1, 0);
    set({ activeShort: shorts[prevIndex], activeIndex: prevIndex });
  },
}));
