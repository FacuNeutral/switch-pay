import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useProductGalleryContext } from "../../../store/product-gallery.context";
import { useRenderCount } from "../../../hooks/useRenderCount";

/**
 * @DS_LAYER `ORGANISM`
 */
export const ProductFilters = observer(() => {
  useRenderCount("ProductFilters");
  const store = useProductGalleryContext();
  const [inputValue, setInputValue] = useState(store.search);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    store.setSearch(e.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        placeholder="Buscar productos..."
        value={inputValue}
        onChange={handleInputChange}
        className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-colors"
      />

      <select
        value={store.category}
        onChange={(e) => store.setCategory(e.target.value)}
        className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-colors appearance-none cursor-pointer min-w-[180px]"
      >
        <option value="">Todas las categorías</option>
        {store.categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
});
