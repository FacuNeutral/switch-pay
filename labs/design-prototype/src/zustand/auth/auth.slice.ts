//* @type Store
//* @context Auth
//* @utility Gestiona el estado de autenticación: login, registro y logout.

import { create } from "zustand";
import { generateMockUser, LOGIN_DELAY_MS, REGISTER_DELAY_MS, type User } from "./auth.mock";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,

  //* Simula login con delay y genera usuario mock.
  login: async (email: string, _password: string) => {
    set({ isLoading: true });
    await new Promise((r) => setTimeout(r, LOGIN_DELAY_MS));
    set({ user: generateMockUser(email), isLoading: false });
    return true;
  },

  //* Simula registro con delay y genera usuario mock.
  register: async (name: string, email: string, _password: string) => {
    set({ isLoading: true });
    await new Promise((r) => setTimeout(r, REGISTER_DELAY_MS));
    set({ user: generateMockUser(email, name), isLoading: false });
    return true;
  },

  //* Limpia el usuario del estado.
  logout: () => {
    set({ user: null });
  },
}));
