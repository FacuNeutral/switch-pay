//* @type Page
//* @context Videos
//* @utility Página principal: chips de categoría y grid de videos filtrados.

import CategoryChips from "@/components/core/CategoryChips";
import VideoGrid from "@/application/videos/components/VideoGrid";
import { useVideosStore } from "@/zustand/videos/videos.slice";

export default function HomePage() {
  const categories = useVideosStore((s) => s.categories);
  const activeCategory = useVideosStore((s) => s.activeCategory);
  const filteredVideos = useVideosStore((s) => s.filteredVideos);
  const isLoading = useVideosStore((s) => s.isLoadingCategory);
  const setActiveCategory = useVideosStore((s) => s.setActiveCategory);

  return (
    <div>
      <CategoryChips categories={categories} active={activeCategory} onSelect={setActiveCategory} />
      <VideoGrid videos={filteredVideos} loading={isLoading} />
    </div>
  );
}
