import type { Product } from "@/stores/products/products.interface";
import type { Filters } from "../types";

export function filterProducts(products: Product[], filters: Filters): Product[] {
  let result = products;

  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }

  if (filters.search) {
    const term = filters.search.toLowerCase();
    result = result.filter((p) => p.title.toLowerCase().includes(term));
  }

  return result;
}
