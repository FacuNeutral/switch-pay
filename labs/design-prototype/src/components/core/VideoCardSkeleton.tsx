//* @type Atom
//* @context Videos
//* @utility Placeholder animado de carga para VideoCard.

import { motion } from "motion/react"
import { pulse } from "@/styles/animations"

export default function VideoCardSkeleton() {
  return (
    <motion.div
      className="flex flex-col gap-2"
      variants={pulse}
      initial="initial"
      animate="animate"
    >
      <div className="aspect-video rounded-xl bg-neutral dark:bg-neutral-surface-dark" />
      <div className="flex gap-3">
        <div className="w-9 h-9 rounded-full bg-neutral dark:bg-neutral-surface-dark shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-neutral dark:bg-neutral-surface-dark rounded w-full" />
          <div className="h-3 bg-neutral dark:bg-neutral-surface-dark rounded w-3/4" />
          <div className="h-3 bg-neutral dark:bg-neutral-surface-dark rounded w-1/2" />
        </div>
      </div>
    </motion.div>
  );
}
