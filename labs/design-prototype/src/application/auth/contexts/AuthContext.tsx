//* @type Context
//* @context Auth
//* @utility Provider legacy de autenticación con React Context (reemplazado por Zustand store).

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { User } from "@/entities/user.entity";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  //* Simula login con delay y setea el usuario.
  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setUser({
      email,
      name: email.split("@")[0],
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${email}`,
    });
    setIsLoading(false);
    return true;
  }, []);

  //* Simula registro con delay y setea el usuario.
  const register = useCallback(async (name: string, email: string, _password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setUser({
      email,
      name,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
    });
    setIsLoading(false);
    return true;
  }, []);

  //* Limpia el usuario del estado.
  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
