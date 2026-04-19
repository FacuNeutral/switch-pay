import { useEffect, useRef } from "react";
import { pushTrace } from "../store/trace.store";

const HIGHLIGHT_DURATION_MS = 600;

function diffClasses(prev: string[], next: string[]) {
  const prevSet = new Set(prev);
  const nextSet = new Set(next);
  const added = next.filter((c) => !prevSet.has(c));
  const removed = prev.filter((c) => !nextSet.has(c));
  return { added, removed };
}

function highlightNode(node: HTMLElement) {
  const prev = node.style.outline;
  const prevTransition = node.style.transition;
  node.style.transition = "outline 0.15s ease";
  node.style.outline = "2px solid #a78bfa";
  setTimeout(() => {
    node.style.outline = prev;
    node.style.transition = prevTransition;
  }, HIGHLIGHT_DURATION_MS);
}

export function useMutationObserver() {
  const prevClassMap = useRef<Map<string, string>>(new Map());

  useEffect(() => {
    // Snapshot initial state of all [data-id] nodes
    const nodes = document.querySelectorAll<HTMLElement>("[data-id]");
    for (const node of nodes) {
      const dataId = node.getAttribute("data-id")!;
      prevClassMap.current.set(dataId, node.className);
    }

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type !== "attributes" ||
          mutation.attributeName !== "class"
        )
          continue;

        const target = mutation.target as HTMLElement;
        const dataId = target.getAttribute("data-id");
        if (!dataId) continue;

        const prev = prevClassMap.current.get(dataId) ?? "";
        const next = target.className;

        if (prev === next) continue;

        const prevList = prev.split(/\s+/).filter(Boolean);
        const nextList = next.split(/\s+/).filter(Boolean);
        const { added, removed } = diffClasses(prevList, nextList);

        if (added.length === 0 && removed.length === 0) continue;

        pushTrace({
          dataId,
          prev,
          next,
          added,
          removed,
          timestamp: Date.now(),
        });

        highlightNode(target);
        prevClassMap.current.set(dataId, next);
      }
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);
}
