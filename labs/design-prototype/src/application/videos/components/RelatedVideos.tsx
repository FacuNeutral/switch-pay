//* @type Molecule
//* @context Videos
//* @utility Lista lateral de videos relacionados al video en reproducción.

import { motion } from "motion/react"
import type { Video } from "@/entities/video.entity";
import VideoCard from "@/components/core/VideoCard";
import { staggerContainer, staggerItem, smooth } from "@/styles/animations"

interface RelatedVideosProps {
  videos: Video[];
}

export default function RelatedVideos({ videos }: RelatedVideosProps) {
  return (
    <motion.div
      className="w-full lg:w-96 shrink-0 space-y-3"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {videos.map((v) => (
        <motion.div key={v.id} variants={staggerItem} transition={smooth}>
          <VideoCard video={v} layout="list" />
        </motion.div>
      ))}
    </motion.div>
  );
}
