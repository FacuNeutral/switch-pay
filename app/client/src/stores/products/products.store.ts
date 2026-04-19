import { create } from "zustand";
import type { Product } from "./products.interface";
import { productsMock } from "@/stores/products/products.mock";


interface ProductsState {
  products: Product[];
}

export const useProductsStore = create<ProductsState>()(() => ({
  products: productsMock,
}));
