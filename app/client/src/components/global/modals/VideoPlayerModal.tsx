import { AnimatePresence, motion } from "motion/react";
import { useModalManagerStore } from "@/stores/modals/modal-manager.store";
import { VideoModalInfo } from "./fragments/VideoModalInfo";
import { useKeyDown } from "@/hooks/events/useKeyDown";
import { useBodyScrollLock } from "@/hooks/global/useBodyScrollLock";
import { useShallow } from "zustand/shallow";

/**
 * @DS_LAYER `ORGANISM`
 * @Global_Layout mounted at app root as a persistent overlay host
 */
export function VideoPlayerModal() {
  const { isOpen, video, close } = useModalManagerStore(
    useShallow((s) => ({
      isOpen: s.modals.video.isOpen,
      video: s.modals.video.payload,
      close: s.close,
    }))
  );

  useKeyDown("Escape", () => close("video"), isOpen);
  useBodyScrollLock(isOpen);

  return (
    <AnimatePresence>
      {isOpen && video && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
            onClick={() => close("video")}
          />

          {/* Modal panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-4xl max-h-[90dvh] bg-zinc-900 border border-zinc-800 rounded-2xl overflow-y-auto shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video player */}
              <div className="relative aspect-video w-full bg-black">
                <video
                  key={video.id}
                  src={video.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Info + close */}
              <div className="flex items-start gap-4 p-6">
                <div className="flex-1 min-w-0">
                  <VideoModalInfo video={video} />
                </div>

                <button
                  type="button"
                  onClick={() => close("video")}
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 transition-colors"
                  aria-label="Cerrar"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
