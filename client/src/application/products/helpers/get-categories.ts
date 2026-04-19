import type { Product } from "../types";

export function getCategories(products: Product[]): string[] {
  return [...new Set(products.map((p) => p.category))].sort();
}
