import { createContext, useContext } from "react";
import type { ProductGalleryLocalStore } from "./product-gallery.store";

const ProductGalleryContext = createContext<ProductGalleryLocalStore | null>(null);

export const ProductGalleryProvider = ProductGalleryContext.Provider;

export function useProductGalleryContext(): ProductGalleryLocalStore {
  const ctx = useContext(ProductGalleryContext);
  if (!ctx) {
    throw new Error("useProductGalleryContext must be used within ProductGalleryProvider");
  }
  return ctx;
}
