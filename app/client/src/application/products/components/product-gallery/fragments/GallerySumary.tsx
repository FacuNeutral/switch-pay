import { observer } from "mobx-react-lite";
import { useProductGalleryContext } from "../../../store/product-gallery.context";

/**
 * @DS_LAYER `FRAGMENT`
 */
export const GallerySummary = observer(() => {
    const store = useProductGalleryContext();
    const { totalFiltered, page, totalPages } = store;
    return (
        <div className="flex items-center justify-between">
            <p className="text-xs text-zinc-500">
                {totalFiltered} producto{totalFiltered !== 1 && "s"} encontrado{totalFiltered !== 1 && "s"}
            </p>
            <p className="text-xs text-zinc-500">
                Página {page} de {totalPages}
            </p>
        </div>
    );
});