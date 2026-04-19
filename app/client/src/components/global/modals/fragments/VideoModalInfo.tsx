import type { Video } from "@/application/videos/types";

interface VideoModalInfoProps {
  video: Video;
}

/**
 * @DS_LAYER `FRAGMENT`
 */
export function VideoModalInfo({ video }: VideoModalInfoProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-zinc-100 font-semibold text-lg leading-snug">
          {video.title}
        </h2>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-zinc-300 text-sm font-medium">{video.channel}</span>
          <span className="text-zinc-600 text-xs">·</span>
          <span className="text-zinc-500 text-xs">{video.views}</span>
          <span className="text-zinc-600 text-xs">·</span>
          <span className="text-zinc-500 text-xs">{video.publishedAt}</span>
        </div>
      </div>

      <div className="h-px bg-zinc-800" />

      <p className="text-zinc-400 text-sm leading-relaxed">
        {video.description}
      </p>

      <div className="flex items-center gap-2 mt-auto">
        <div className="w-8 h-8 rounded-full bg-zinc-700 shrink-0" />
        <div className="flex flex-col">
          <span className="text-zinc-300 text-sm font-medium">{video.channel}</span>
          <span className="text-zinc-500 text-xs">Canal verificado</span>
        </div>
      </div>
    </div>
  );
}
