import type { Video } from "@/application/videos/types";

// ─── Modal Registry ───────────────────────────────────────────────────────────
// Agrega aquí cada nuevo modal con su tipo de payload.
export interface ModalRegistry {
  video: Video;
}

export type ModalKey = keyof ModalRegistry;

// ─── Modal Status Contract ────────────────────────────────────────────────────
export type ModalStatus = "idle" | "loading" | "disabled";

// ─── Modal Entry ──────────────────────────────────────────────────────────────
export interface ModalEntry<TPayload> {
  isOpen: boolean;
  status: ModalStatus;
  payload: TPayload | null;
}

// ─── Store Shape ──────────────────────────────────────────────────────────────
export type ModalsMap = {
  [K in ModalKey]: ModalEntry<ModalRegistry[K]>;
};

export interface ModalManagerState {
  modals: ModalsMap;
  open: <K extends ModalKey>(key: K, payload: ModalRegistry[K]) => void;
  close: (key: ModalKey) => void;
  setStatus: (key: ModalKey, status: ModalStatus) => void;
}
