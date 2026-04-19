import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Video } from "../../../types";
import { useModalManagerStore } from "@/stores/modals/modal-manager.store";

interface VideoCardProps {
  video: Video;
}

/**
 * @DS_LAYER `ORGANISM`
 */
export function VideoCard({ video }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const open = useModalManagerStore((s) => s.open);

  const handleMouseEnter = () => {
    setIsHovering(true);
    setIsLoading(true);
    const el = videoRef.current;
    if (!el) return;
    el.preload = "auto";
    el.load();
  };

  const handleCanPlay = () => {
    setIsLoading(false);
    if (isHovering) {
      videoRef.current?.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setIsLoading(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="group flex flex-col gap-3 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => open("video", video)}
    >
      {/* Thumbnail / Video preview */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-800">
        {/* Thumbnail image */}
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovering ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Video preview on hover */}
        <video
          ref={videoRef}
          src={video.videoUrl}
          muted
          loop
          playsInline
          preload="none"
          onCanPlay={handleCanPlay}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Loading spinner */}
        <AnimatePresence>
          {isHovering && isLoading && (
            <motion.div
              key="spinner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex items-center justify-center bg-black/40"
            >
              <div className="w-8 h-8 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Duration badge */}
        <span
          className={`absolute bottom-2 right-2 bg-black/80 text-zinc-100 text-[11px] font-medium px-1.5 py-0.5 rounded transition-opacity duration-200 ${
            isHovering ? "opacity-0" : "opacity-100"
          }`}
        >
          {video.duration}
        </span>
      </div>

      {/* Info */}
      <div className="flex gap-3 text-left">
        <div className="w-9 h-9 rounded-full bg-zinc-700 shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1 min-w-0 items-start">
          <h3 className="text-zinc-100 font-medium text-sm leading-tight line-clamp-2 group-hover:text-white">
            {video.title}
          </h3>
          <span className="text-zinc-400 text-xs hover:text-zinc-300 transition-colors">
            {video.channel}
          </span>
          <span className="text-zinc-500 text-xs">
            {video.views} · {video.publishedAt}
          </span>
        </div>
      </div>
    </div>
  );
}
