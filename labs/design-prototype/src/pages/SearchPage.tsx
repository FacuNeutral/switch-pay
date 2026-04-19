//* @type Page
//* @context Videos
//* @utility Página de resultados de búsqueda; lee el query param y ejecuta la búsqueda.

import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useVideosStore } from "@/zustand/videos/videos.slice";
import SearchResults from "@/application/videos/components/SearchResults";

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const executeSearch = useVideosStore((s) => s.executeSearch);
  const searchResults = useVideosStore((s) => s.searchResults);

  useEffect(() => {
    executeSearch(query);
  }, [query, executeSearch]);

  return <SearchResults query={query} results={searchResults} />;
}
