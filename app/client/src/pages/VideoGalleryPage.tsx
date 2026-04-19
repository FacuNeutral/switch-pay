import { VideoGallery } from "@/application/videos/components/video-gallery/fragments/VideoGallery";
import { videosMock } from "@/application/videos/mock/videos.mock";

/**
 * @DS_LAYER `PAGE`
 */
export function VideoGalleryPage() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-100">Video Gallery</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Galería de videos con preview al hacer hover
        </p>
      </div>
      <VideoGallery videos={videosMock} />
    </section>
  );
}
