//* @type Store
//* @context Debug Tools
//* @utility Estado del modal de debug tools a nivel app.

import { create } from "zustand";

export interface DebugTool {
  id: string;
  label: string;
  description: string;
  icon: string;
  disabled?: boolean;
}

export const DEBUG_TOOLS: DebugTool[] = [
  {
    id: "pages-explorer",
    label: "Pages Explorer",
    description: "Preview all application pages with viewport simulation, route navigation, component structure docs and screenshot gallery.",
    icon: "layers",
  },
  {
    id: "design-tokens",
    label: "Design Tokens",
    description: "Inspect and preview all design tokens: colors, spacing, typography, shadows, radii and animations defined in the theme.",
    icon: "palette",
  },
  {
    id: "components",
    label: "Components",
    description: "Browse the component library with live previews, prop tables, usage examples and variant playground.",
    icon: "blocks",
    disabled: true,
  },
];

interface DebugToolsState {
  isOpen: boolean;
  selectedIndex: number;
  toggle: () => void;
  open: () => void;
  close: () => void;
  setSelectedIndex: (index: number) => void;
}

export const useDebugToolsStore = create<DebugToolsState>((set) => ({
  isOpen: false,
  selectedIndex: 0,

  toggle: () => set((s) => ({ isOpen: !s.isOpen, selectedIndex: 0 })),
  open: () => set({ isOpen: true, selectedIndex: 0 }),
  close: () => set({ isOpen: false }),
  setSelectedIndex: (index) => set({ selectedIndex: index }),
}));
