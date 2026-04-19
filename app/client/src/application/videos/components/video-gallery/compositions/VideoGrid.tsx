import type { Video } from "../../../types";
import { VideoCard } from "../organisms/VideoCard";

interface VideoGridProps {
  videos: Video[];
}

/**
 * @DS_LAYER `COMPOSITION`
 */
export function VideoGrid({ videos }: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-zinc-500 text-sm">No se encontraron videos.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
