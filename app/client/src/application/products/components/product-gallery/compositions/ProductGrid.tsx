import { observer } from "mobx-react-lite";
import { useProductGalleryContext } from "../../../store/product-gallery.context";
import { ProductCard } from "../organisms/ProductCard";

/**
 * @DS_LAYER `COMPOSITION`
 */
export const ProductGrid = observer(() => {
  const store = useProductGalleryContext();
  const items = store.paginatedItems;

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-zinc-500 text-sm">No se encontraron productos.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
});
