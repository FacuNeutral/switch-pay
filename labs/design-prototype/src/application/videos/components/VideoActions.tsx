//* @type Organism
//* @context Videos
//* @utility Barra de acciones del video: like, suscripción, compartir y más.

import { ThumbsUp, ThumbsDown, Share2, Scissors, MoreHorizontal } from "lucide-react";
import { useVideosStore } from "@/zustand/videos/videos.slice";

interface VideoActionsProps {
  channel: string;
  channelAvatar: string;
  subscribers: string;
  likes: string;
  videoId?: string;
}

export default function VideoActions({ channel, channelAvatar, subscribers, likes, videoId }: VideoActionsProps) {
  const toggleLike = useVideosStore((s) => s.toggleLike);
  const isVideoLiked = useVideosStore((s) => s.isVideoLiked);
  const toggleSubscription = useVideosStore((s) => s.toggleSubscription);
  const isSubscribed = useVideosStore((s) => s.isSubscribed);

  const liked = videoId ? isVideoLiked(videoId) : false;
  const subscribed = isSubscribed(channel);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mt-3">
      {/* <Tag> Channel Info */}
      <div className="flex items-center gap-3">
        <img src={channelAvatar} alt={channel} className="w-10 h-10 rounded-full" />
        <div>
          <p className="text-sm font-medium text-neutral-dark dark:text-neutral">{channel}</p>
          <p className="text-xs text-neutral-off-dark dark:text-neutral-off">{subscribers}</p>
        </div>
        <button
          onClick={() => toggleSubscription(channel)}
          className={`ml-3 px-4 py-2 rounded-full text-sm font-medium transition-opacity ${
            subscribed
              ? "bg-neutral dark:bg-neutral-surface-dark text-neutral-dark dark:text-neutral hover:bg-neutral/80 dark:hover:bg-neutral-surface-dark/80"
              : "bg-neutral-dark dark:bg-neutral text-neutral dark:text-neutral-dark hover:opacity-90"
          }`}
        >
          {subscribed ? "Suscrito" : "Suscribirse"}
        </button>
      </div>

      {/* <Tag> Toolbar — like, compartir, más */}
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-neutral dark:bg-neutral-surface-dark rounded-full overflow-hidden">
          <button
            onClick={() => videoId && toggleLike(videoId)}
            className={`flex items-center gap-1 px-4 py-2 hover:bg-neutral-off dark:hover:bg-neutral-off-dark transition-colors text-sm ${
              liked ? "text-info" : ""
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${liked ? "fill-current" : ""}`} /> {likes}
          </button>
          <div className="w-px h-6 bg-neutral dark:bg-neutral-off-dark" />
          <button className="px-3 py-2 hover:bg-neutral-off dark:hover:bg-neutral-off-dark transition-colors">
            <ThumbsDown className="w-4 h-4" />
          </button>
        </div>
        <button className="flex items-center gap-1 px-4 py-2 bg-neutral dark:bg-neutral-surface-dark rounded-full hover:bg-neutral-off dark:hover:bg-neutral-off-dark transition-colors text-sm">
          <Share2 className="w-4 h-4" /> Compartir
        </button>
        <button className="flex items-center gap-1 px-4 py-2 bg-neutral dark:bg-neutral-surface-dark rounded-full hover:bg-neutral-off dark:hover:bg-neutral-off-dark transition-colors text-sm hidden sm:flex">
          <Scissors className="w-4 h-4" /> Recortar
        </button>
        <button className="p-2 bg-neutral dark:bg-neutral-surface-dark rounded-full hover:bg-neutral-off dark:hover:bg-neutral-off-dark transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
