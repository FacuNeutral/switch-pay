//* @type Organism
//* @context Videos
//* @utility Muestra los resultados de búsqueda en formato lista con estado vacío.

import { motion } from "motion/react"
import type { Video } from "@/entities/video.entity";
import VideoCard from "@/components/core/VideoCard";
import { fadeUp, staggerContainer, staggerItem, smooth } from "@/styles/animations"

interface SearchResultsProps {
  query: string;
  results: Video[];
}

export default function SearchResults({ query, results }: SearchResultsProps) {
  return (
    <motion.div
      className="pb-8"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={smooth}
    >
      {/* <Tag> Header — título de búsqueda */}
      <h2 className="text-lg font-medium text-neutral-dark dark:text-neutral mb-4">
        Resultados para: <span className="text-neutral-off-dark dark:text-neutral-off">"{query}"</span>
      </h2>
      {/* <Tag> List | Empty State */}
      {results.length === 0 ? (
        <p className="text-neutral-off-dark dark:text-neutral-off text-center mt-20">No se encontraron resultados</p>
      ) : (
        <motion.div
          className="space-y-4 max-w-3xl"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {results.map((v) => (
            <motion.div key={v.id} variants={staggerItem} transition={smooth}>
              <VideoCard video={v} layout="list" />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
