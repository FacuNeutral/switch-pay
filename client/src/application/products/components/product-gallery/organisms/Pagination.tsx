import { observer } from "mobx-react-lite";
import { useProductGalleryContext } from "../../../store/product-gallery.context";

/**
 * @DS_LAYER `ORGANISM`
 */
export const Pagination = observer(() => {
  const store = useProductGalleryContext();
  const pages = Array.from({ length: store.totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-1.5">
      <button
        onClick={() => store.setPage(store.page - 1)}
        disabled={store.page <= 1}
        className="px-3 py-2 text-sm rounded-lg border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-colors disabled:opacity-40 disabled:pointer-events-none"
      >
        Anterior
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => store.setPage(page)}
          className={`min-w-[36px] h-9 text-sm rounded-lg border transition-colors ${
            page === store.page
              ? "bg-purple-500/20 border-purple-500/50 text-purple-300"
              : "border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => store.setPage(store.page + 1)}
        disabled={store.page >= store.totalPages}
        className="px-3 py-2 text-sm rounded-lg border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-colors disabled:opacity-40 disabled:pointer-events-none"
      >
        Siguiente
      </button>
    </nav>
  );
});
