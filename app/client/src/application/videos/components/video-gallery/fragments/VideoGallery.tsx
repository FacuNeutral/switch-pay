import type { Video } from "../../../types";
import { VideoGrid } from "../compositions/VideoGrid";

interface VideoGalleryProps {
  videos: Video[];
}

/**
 * @DS_LAYER `FRAGMENT`
 */
export function VideoGallery({ videos }: VideoGalleryProps) {
  return (
    <div className="flex flex-col gap-6">
      <VideoGrid videos={videos} />
    </div>
  );
}
