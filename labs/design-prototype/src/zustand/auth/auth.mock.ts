//* @type Mock
//* @context Auth
//* @utility Datos ficticios y factories para el dominio de autenticación.

import type { User } from "@/entities/user.entity";

export type { User };

//* Crea un usuario mock a partir del email y nombre opcional.
export function generateMockUser(email: string, name?: string): User {
  const resolvedName = name ?? email.split("@")[0];
  return {
    email,
    name: resolvedName,
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(resolvedName)}`,
  };
}

export const LOGIN_DELAY_MS = 1500;
export const REGISTER_DELAY_MS = 2000;
