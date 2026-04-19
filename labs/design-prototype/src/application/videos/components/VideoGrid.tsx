//* @type Organism
//* @context Videos
//* @utility Grid responsivo de video cards con estado de carga (skeletons).

import { motion } from "motion/react"
import type { Video } from "@/entities/video.entity";
import VideoCard from "@/components/core/VideoCard";
import VideoCardSkeleton from "@/components/core/VideoCardSkeleton";
import { staggerContainer, staggerItem, smooth } from "@/styles/animations"

interface VideoGridProps {
  videos: Video[];
  loading: boolean;
}

export default function VideoGrid({ videos, loading }: VideoGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 pt-4 pb-8"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      key={loading ? "loading" : "loaded"}
    >
      {loading
        ? Array.from({ length: 12 }).map((_, i) => (
            <motion.div key={i} variants={staggerItem} transition={smooth}>
              <VideoCardSkeleton />
            </motion.div>
          ))
        : videos.map((v) => (
            <motion.div key={v.id} variants={staggerItem} transition={smooth}>
              <VideoCard video={v} />
            </motion.div>
          ))}
    </motion.div>
  );
}
