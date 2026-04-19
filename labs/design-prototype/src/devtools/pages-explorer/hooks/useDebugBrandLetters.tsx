//* @type Integration Hook
//* @context Pages Explore
//* @utility Renders brand logo text letter-by-letter with a staggered drop-in animation.

interface Segment {
  text: string;
  className?: string;
}

interface UseDebugBrandLettersOptions {
  segments: Segment[];
  delayStep?: number;
}

export function useDebugBrandLetters({ segments, delayStep = 0.04 }: UseDebugBrandLettersOptions) {
  let globalIndex = 0;

  const rendered = segments.map((segment, segIdx) =>
    segment.text.split("").map((char) => {
      const delay = globalIndex * delayStep;
      globalIndex++;
      return (
        <span
          key={`${segIdx}-${globalIndex}`}
          className={`animate-debug-letter-in inline-block${segment.className ? ` ${segment.className}` : ""}`}
          style={{ animationDelay: `${delay}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      );
    })
  );

  return rendered;
}
