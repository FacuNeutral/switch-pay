//* @type Lib
//* @context Global
//* @utility Merge condicional de clases CSS con clsx + tailwind-merge.

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

//* Combina y resuelve conflictos entre clases de Tailwind.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
