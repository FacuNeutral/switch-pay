import { useEffect, useState } from "react";

import { ProductGalleryLocalStore } from "../../../store/product-gallery.store";
import { ProductGalleryProvider } from "../../../store/product-gallery.context";
import { ProductFilters } from "../organisms/ProductFilters";
import { ProductGrid } from "./ProductGrid";
import { Pagination } from "../organisms/Pagination";
import { useRenderCount } from "../../../hooks/useRenderCount";
import { GallerySummary } from "../fragments/GallerySumary";
import { useProductsStore } from "@/stores/products/products.store";



/**
 * @DS_LAYER `COMPOSITION`
*/
export const ProductGallery = () => {
    
    const products = useProductsStore((s) => s.products);

    const [store, setStore] = useState(new ProductGalleryLocalStore());
    
    useEffect(() => {
        store.loadProducts(products);
    }, [products]);
    
    useRenderCount("ProductGallery");

    return (
        <ProductGalleryProvider value={store}>
            <div className="flex flex-col gap-6">
                <ProductFilters />
                <GallerySummary />
                <ProductGrid />
                <Pagination />
            </div>
        </ProductGalleryProvider>
    );
};
