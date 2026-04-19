import { makeAutoObservable } from "mobx";
import { paginate, getTotalPages } from "../helpers/paginate";
import { getCategories } from "../helpers/get-categories";

import { filterProducts } from "@/application/products/helpers/filter-products";
import type { Product } from "@/stores/products/products.interface";

/**
 * @DS_LAYER `LOCAL_STORE`
 */
export class ProductGalleryLocalStore {
    private pageSize: number = 6;
    category = "";
    search = "";
    page = 1;

    readonly items: Product[] = [];

    constructor() {

        makeAutoObservable(this);
    }

    // — Actions —

    loadProducts(products: Product[]) {
        this.items.splice(0, this.items.length, ...products);
    }

    setCategory(category: string) {
        this.category = category;
        this.page = 1;
    }

    setSearch(search: string) {
        this.search = search;
        this.page = 1;
    }

    setPage(page: number) {
        this.page = page;
    }

    // — Computed —

    get categories(): string[] {
        return getCategories(this.items);
    }

    get filtered(): Product[] {
        return filterProducts(this.items, {
            category: this.category,
            search: this.search,
        });
    }

    get totalPages(): number {
        return getTotalPages(this.filtered.length, this.pageSize);
    }

    get paginatedItems(): Product[] {
        return paginate(this.filtered, {
            page: this.page,
            pageSize: this.pageSize,
        });
    }

    get totalFiltered(): number {
        return this.filtered.length;
    }
}
