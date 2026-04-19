//* @type Organism
//* @context Shorts
//* @utility Card individual de un short con thumbnail portrait, overlay de acciones y metadata.

import { Heart, MessageCircle, Share2 } from "lucide-react";
import { motion } from "motion/react"
import type { Short } from "@/entities/short.entity";
import { fadeUp, spring } from "@/styles/animations"

interface ShortCardProps {
  short: Short;
  active: boolean;
}

export default function ShortCard({ short, active }: ShortCardProps) {
  return (
    <motion.div
      className={`relative w-full max-w-90 mx-auto aspect-9/16 rounded-xl overflow-hidden bg-neutral-dark snap-center shrink-0 ${
        active ? "ring-2 ring-primary" : ""
      }`}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={spring}
    >
      {/* <Tag> Media — thumbnail portrait */}
      <img
        src={short.thumbnail}
        alt={short.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />

      {/* <Tag> Actions — lateral */}
      <div className="absolute right-3 bottom-24 flex flex-col items-center gap-5">
        <button className="flex flex-col items-center gap-1 group">
          <div className="w-10 h-10 rounded-full bg-neutral-dark/60 flex items-center justify-center group-hover:bg-neutral-dark/80 transition-colors">
            <Heart className="w-5 h-5 text-neutral" />
          </div>
          <span className="text-xs text-neutral font-medium">{short.likes}</span>
        </button>
        <button className="flex flex-col items-center gap-1 group">
          <div className="w-10 h-10 rounded-full bg-neutral-dark/60 flex items-center justify-center group-hover:bg-neutral-dark/80 transition-colors">
            <MessageCircle className="w-5 h-5 text-neutral" />
          </div>
          <span className="text-xs text-neutral font-medium">{short.comments}</span>
        </button>
        <button className="flex flex-col items-center group">
          <div className="w-10 h-10 rounded-full bg-neutral-dark/60 flex items-center justify-center group-hover:bg-neutral-dark/80 transition-colors">
            <Share2 className="w-5 h-5 text-neutral" />
          </div>
        </button>
      </div>

      {/* <Tag> Metadata — canal y título */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-neutral-dark/80 to-transparent">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={short.channelAvatar}
            alt={short.channel}
            className="w-8 h-8 rounded-full border border-neutral/30"
          />
          <span className="text-sm font-medium text-neutral">{short.channel}</span>
        </div>
        <p className="text-sm text-neutral line-clamp-2">{short.title}</p>
      </div>
    </motion.div>
  );
}
