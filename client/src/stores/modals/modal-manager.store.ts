import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ModalManagerState, ModalsMap } from "./modal-manager.types";

// ─── Initial state ────────────────────────────────────────────────────────────
const initialModals: ModalsMap = {
  video: { isOpen: false, status: "idle", payload: null },
};

// ─── Store ────────────────────────────────────────────────────────────────────
export const useModalManagerStore = create<ModalManagerState>()(
  devtools(
    (set) => ({
      modals: initialModals,

      open: (key, payload) =>
        set(
          (state) => ({
            modals: {
              ...state.modals,
              [key]: { isOpen: true, status: "idle", payload },
            },
          }),
          false,
          `modal/open/${key}`
        ),

      close: (key) =>
        set(
          (state) => ({
            modals: {
              ...state.modals,
              [key]: { ...state.modals[key], isOpen: false, status: "idle" },
            },
          }),
          false,
          `modal/close/${key}`
        ),

      setStatus: (key, status) =>
        set(
          (state) => ({
            modals: {
              ...state.modals,
              [key]: { ...state.modals[key], status },
            },
          }),
          false,
          `modal/setStatus/${key}/${status}`
        ),
    }),
    { name: "ModalManagerStore" }
  )
);
