//* @type Page
//* @context Videos
//* @utility Página de reproducción: player, acciones, descripción y videos relacionados.

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "motion/react"
import { useVideosStore } from "@/zustand/videos/videos.slice";
import VideoPlayer from "@/application/videos/components/VideoPlayer";
import VideoActions from "@/application/videos/components/VideoActions";
import VideoDescription from "@/application/videos/components/VideoDescription";
import RelatedVideos from "@/application/videos/components/RelatedVideos";
import { fadeUp, smooth } from "@/styles/animations"

export default function WatchPage() {
  const { id } = useParams<{ id: string }>();
  const setCurrentVideo = useVideosStore((s) => s.setCurrentVideo);
  const video = useVideosStore((s) => s.currentVideo);
  const related = useVideosStore((s) => s.relatedVideos);

  useEffect(() => {
    setCurrentVideo(id || "");
  }, [id, setCurrentVideo]);

  if (!video) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-neutral-off-dark dark:text-neutral-off">
        Video no encontrado
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-col lg:flex-row gap-6 pb-8"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={smooth}
      key={video.id}
    >
      {/* <Tag> Main — reproductor y detalles */}
      <div className="flex-1 min-w-0">
        {/* <Tag> Media */}
        <VideoPlayer thumbnail={video.thumbnail} title={video.title} />
        <h1 className="text-lg font-semibold text-neutral-dark dark:text-neutral mt-3">{video.title}</h1>
        {/* <Tag> Actions */}
        <VideoActions
          channel={video.channel}
          channelAvatar={video.channelAvatar}
          subscribers={video.subscribers || ""}
          likes={video.likes || ""}
          videoId={video.id}
        />
        {/* <Tag> Content — descripción */}
        <VideoDescription
          views={video.views}
          timestamp={video.timestamp}
          description={video.description || ""}
        />
      </div>
      {/* <Tag> Related Videos */}
      <RelatedVideos videos={related} />
    </motion.div>
  );
}
