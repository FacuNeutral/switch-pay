import type { Product } from "@/stores/products/products.interface";


interface ProductCardProps {
    product: Product;
}

/**
 * @DS_LAYER `ORGANISM`
 */
export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 flex flex-col gap-3 transition-colors hover:border-zinc-700">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-purple-400 bg-purple-400/10 px-2.5 py-1 rounded-full">
          {product.category}
        </span>
      </div>
      <h3 className="text-zinc-100 font-semibold text-sm leading-tight">
        {product.title}
      </h3>
      <p className="text-zinc-300 text-lg font-bold mt-auto">
        ${product.price.toFixed(2)}
      </p>
    </div>
  );
}
