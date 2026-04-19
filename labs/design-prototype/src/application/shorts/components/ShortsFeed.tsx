//* @type Organism
//* @context Shorts
//* @utility Feed vertical de shorts con scroll snap y navegación por teclado.

import { useEffect, useRef, useCallback } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useShortsStore } from "@/zustand/shorts/shorts.slice";
import ShortCard from "./ShortCard";

export default function ShortsFeed() {
  const shorts = useShortsStore((s) => s.shorts);
  const activeIndex = useShortsStore((s) => s.activeIndex);
  const goToNext = useShortsStore((s) => s.goToNext);
  const goToPrevious = useShortsStore((s) => s.goToPrevious);
  const containerRef = useRef<HTMLDivElement>(null);

  //* Scroll al short activo cuando cambia el índice.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const children = container.children;
    if (children[activeIndex]) {
      children[activeIndex].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activeIndex]);

  //* Navegación por teclado.
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "j") goToNext();
      if (e.key === "ArrowUp" || e.key === "k") goToPrevious();
    },
    [goToNext, goToPrevious]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="relative flex items-start justify-center gap-4">
      {/* <Tag> Feed — scroll snap vertical */}
      <div
        ref={containerRef}
        className="flex flex-col items-center gap-4 h-[calc(100vh-7rem)] overflow-y-auto snap-y snap-mandatory scrollbar-hide py-4"
      >
        {shorts.map((short, i) => (
          <ShortCard key={short.id} short={short} active={i === activeIndex} />
        ))}
      </div>

      {/* <Tag> Nav — botones de navegación */}
      <div className="hidden md:flex flex-col gap-2 sticky top-1/2 -translate-y-1/2">
        <button
          onClick={goToPrevious}
          disabled={activeIndex === 0}
          className="w-10 h-10 rounded-full bg-neutral dark:bg-neutral-surface-dark flex items-center justify-center hover:bg-neutral-off dark:hover:bg-neutral-off-dark transition-colors disabled:opacity-disabled"
        >
          <ChevronUp className="w-5 h-5 text-neutral-dark dark:text-neutral" />
        </button>
        <button
          onClick={goToNext}
          disabled={activeIndex === shorts.length - 1}
          className="w-10 h-10 rounded-full bg-neutral dark:bg-neutral-surface-dark flex items-center justify-center hover:bg-neutral-off dark:hover:bg-neutral-off-dark transition-colors disabled:opacity-disabled"
        >
          <ChevronDown className="w-5 h-5 text-neutral-dark dark:text-neutral" />
        </button>
      </div>
    </div>
  );
}
