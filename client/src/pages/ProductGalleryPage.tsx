import { ProductGallery } from "@/application/products/components/product-gallery/compositions/ProductGallery";


/**
 * @DS_LAYER `PAGE`
 */
export function ProductGalleryPage() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-100">Product Gallery</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Explora nuestro catálogo de productos
        </p>
      </div>
      <ProductGallery />
    </section>
  );
}
