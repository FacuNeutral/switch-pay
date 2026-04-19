//* @type Store
//* @context Design Tokens
//* @utility Estado central del design tokens explorer: tokens, edición, paletas, pestaña activa y persistencia.

import { create } from "zustand";
import {
  type DesignToken,
  type DesignTokensTab,
  type Palette,
  type Backup,
  parseRawTokens,
  fetchTokens,
  saveTokens,
  fetchPalettes,
  savePalette,
  deletePalette,
  fetchBackups,
  saveBackup,
  deleteBackup,
} from "./design-tokens.mock";

interface DesignTokensState {
  isOpen: boolean;
  activeTab: DesignTokensTab;
  tokens: DesignToken[];
  rawTokens: Record<string, string>;
  pendingChanges: Record<string, string>;
  hasPendingChanges: boolean;
  saving: boolean;
  loading: boolean;
  palettes: Palette[];
  palettesLoading: boolean;
  backups: Backup[];
  backupsLoading: boolean;
  editingToken: DesignToken | null;
  expandedCategories: Set<string>;
  /** Palette waiting for user confirmation about backup before apply */
  pendingPaletteApply: Palette | null;
  /** When true, skip the backup prompt and apply palettes directly */
  skipBackupPrompt: boolean;

  //* Abre el panel de design tokens
  open: () => void;
  //* Cierra el panel
  close: () => void;
  //* Cambia la pestaña activa
  setActiveTab: (tab: DesignTokensTab) => void;
  //* Carga tokens desde la API
  loadTokens: () => Promise<void>;
  //* Re-sincroniza tokens desde el CSS (descarta cambios pendientes)
  resyncTokens: () => Promise<void>;
  //* Actualiza un token en estado pendiente (no persiste hasta save)
  updateToken: (key: string, value: string) => void;
  //* Resetea un token pendiente a su valor original
  resetToken: (key: string) => void;
  //* Guarda todos los cambios pendientes al archivo CSS
  saveChanges: () => Promise<void>;
  //* Descarta todos los cambios pendientes
  discardChanges: () => void;
  //* Abre el editor para un token específico
  setEditingToken: (token: DesignToken | null) => void;
  //* Toggle de categoría expandida/colapsada
  toggleCategory: (categoryId: string) => void;
  //* Carga paletas desde la API
  loadPalettes: () => Promise<void>;
  //* Inicia el flujo de aplicar paleta (pide confirmación de backup)
  requestApplyPalette: (palette: Palette) => Promise<void>;
  //* Confirma aplicar paleta con backup previo
  confirmApplyPaletteWithBackup: () => Promise<void>;
  //* Confirma aplicar paleta sin backup
  confirmApplyPaletteSkipBackup: () => Promise<void>;
  //* Cancela la aplicación pendiente de paleta
  cancelApplyPalette: () => void;
  //* Aplica una paleta completa y guarda automáticamente (uso interno)
  applyPalette: (palette: Palette) => Promise<void>;
  //* Guarda el estado actual de tokens como nueva paleta
  saveCurrentAsPalette: (name: string, description: string, orientation: string) => Promise<void>;
  //* Elimina una paleta
  removePalette: (id: string) => Promise<void>;
  //* Carga backups desde la API
  loadBackups: () => Promise<void>;
  //* Crea un backup manual de los tokens actuales
  createBackup: (label: string, reason: string) => Promise<void>;
  //* Restaura tokens desde un backup como cambios pendientes
  restoreBackup: (backup: Backup) => void;
  //* Elimina un backup
  removeBackup: (id: string) => Promise<void>;
}

export const useDesignTokensStore = create<DesignTokensState>((set, get) => ({
  isOpen: false,
  activeTab: "tokens",
  tokens: [],
  rawTokens: {},
  pendingChanges: {},
  hasPendingChanges: false,
  saving: false,
  loading: false,
  palettes: [],
  palettesLoading: false,
  backups: [],
  backupsLoading: false,
  editingToken: null,
  expandedCategories: new Set(["color"]),
  pendingPaletteApply: null,
  skipBackupPrompt: false,

  open: () => {
    document.body.style.overflow = "hidden";
    set({ isOpen: true });
    get().loadTokens();
    get().loadPalettes();
    get().loadBackups();
  },

  close: () => {
    document.body.style.overflow = "";
    set({ isOpen: false, editingToken: null });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  loadTokens: async () => {
    set({ loading: true });
    try {
      const raw = await fetchTokens();
      const tokens = parseRawTokens(raw);
      set({ rawTokens: raw, tokens, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  resyncTokens: async () => {
    set({ loading: true });
    try {
      const raw = await fetchTokens();
      const tokens = parseRawTokens(raw);
      set({ rawTokens: raw, tokens, pendingChanges: {}, hasPendingChanges: false, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  updateToken: (key, value) => {
    const { rawTokens, pendingChanges } = get();
    const newPending = { ...pendingChanges, [key]: value };
    const original = rawTokens[key];
    if (value === original) {
      delete newPending[key];
    }
    const tokens = parseRawTokens({ ...rawTokens, ...newPending });
    set({
      pendingChanges: newPending,
      hasPendingChanges: Object.keys(newPending).length > 0,
      tokens,
    });
  },

  resetToken: (key) => {
    const { pendingChanges, rawTokens } = get();
    const newPending = { ...pendingChanges };
    delete newPending[key];
    const tokens = parseRawTokens({ ...rawTokens, ...newPending });
    set({
      pendingChanges: newPending,
      hasPendingChanges: Object.keys(newPending).length > 0,
      tokens,
    });
  },

  saveChanges: async () => {
    const { pendingChanges } = get();
    if (Object.keys(pendingChanges).length === 0) return;
    set({ saving: true });
    try {
      await saveTokens(pendingChanges);
      const raw = await fetchTokens();
      const tokens = parseRawTokens(raw);
      set({ rawTokens: raw, tokens, pendingChanges: {}, hasPendingChanges: false, saving: false });
    } catch {
      set({ saving: false });
    }
  },

  discardChanges: () => {
    const { rawTokens } = get();
    const tokens = parseRawTokens(rawTokens);
    set({ pendingChanges: {}, hasPendingChanges: false, tokens });
  },

  setEditingToken: (token) => set({ editingToken: token }),

  toggleCategory: (categoryId) => {
    const expanded = new Set(get().expandedCategories);
    if (expanded.has(categoryId)) expanded.delete(categoryId);
    else expanded.add(categoryId);
    set({ expandedCategories: expanded });
  },

  loadPalettes: async () => {
    set({ palettesLoading: true });
    try {
      const palettes = await fetchPalettes();
      set({ palettes, palettesLoading: false });
    } catch {
      set({ palettesLoading: false });
    }
  },

  applyPalette: async (palette) => {
    const { rawTokens } = get();
    const newPending: Record<string, string> = {};
    for (const [key, value] of Object.entries(palette.tokens)) {
      if (key in rawTokens && rawTokens[key] !== value) {
        newPending[key] = value;
      }
    }
    const tokens = parseRawTokens({ ...rawTokens, ...newPending });
    set({
      pendingChanges: newPending,
      hasPendingChanges: Object.keys(newPending).length > 0,
      tokens,
      pendingPaletteApply: null,
    });
    await get().saveChanges();
  },

  requestApplyPalette: async (palette) => {
    if (get().skipBackupPrompt) {
      await get().applyPalette(palette);
      return;
    }
    set({ pendingPaletteApply: palette });
  },

  confirmApplyPaletteWithBackup: async () => {
    const { pendingPaletteApply, rawTokens, pendingChanges } = get();
    if (!pendingPaletteApply) return;
    const merged = { ...rawTokens, ...pendingChanges };
    const timestamp = Date.now();
    const backup: Backup = {
      id: `pre-palette-${timestamp}`,
      label: `Before "${pendingPaletteApply.name}"`,
      reason: `Auto-backup before applying palette "${pendingPaletteApply.name}"`,
      createdAt: new Date().toISOString(),
      tokens: merged,
    };
    await saveBackup(backup);
    await get().applyPalette(pendingPaletteApply);
    await get().loadBackups();
  },

  confirmApplyPaletteSkipBackup: async () => {
    const { pendingPaletteApply } = get();
    if (!pendingPaletteApply) return;
    set({ skipBackupPrompt: true });
    await get().applyPalette(pendingPaletteApply);
  },

  cancelApplyPalette: () => {
    set({ pendingPaletteApply: null });
  },

  saveCurrentAsPalette: async (name, description, orientation) => {
    const { rawTokens, pendingChanges } = get();
    const merged = { ...rawTokens, ...pendingChanges };
    const palette: Palette = {
      id: name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      name,
      description,
      orientation,
      author: "User",
      createdAt: new Date().toISOString(),
      tokens: merged,
    };
    await savePalette(palette);
    await get().loadPalettes();
  },

  removePalette: async (id) => {
    await deletePalette(id);
    await get().loadPalettes();
  },

  loadBackups: async () => {
    set({ backupsLoading: true });
    try {
      const backups = await fetchBackups();
      set({ backups, backupsLoading: false });
    } catch {
      set({ backupsLoading: false });
    }
  },

  createBackup: async (label, reason) => {
    const { rawTokens, pendingChanges } = get();
    const merged = { ...rawTokens, ...pendingChanges };
    const timestamp = Date.now();
    const backup: Backup = {
      id: `manual-${timestamp}`,
      label,
      reason,
      createdAt: new Date().toISOString(),
      tokens: merged,
    };
    await saveBackup(backup);
    await get().loadBackups();
  },

  restoreBackup: (backup) => {
    const { rawTokens } = get();
    const newPending: Record<string, string> = {};
    for (const [key, value] of Object.entries(backup.tokens)) {
      if (key in rawTokens && rawTokens[key] !== value) {
        newPending[key] = value;
      }
    }
    const tokens = parseRawTokens({ ...rawTokens, ...newPending });
    set({
      pendingChanges: newPending,
      hasPendingChanges: Object.keys(newPending).length > 0,
      tokens,
    });
  },

  removeBackup: async (id) => {
    await deleteBackup(id);
    await get().loadBackups();
  },
}));
