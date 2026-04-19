import { useEffect } from "react";

export function useKeyDown(key: string, handler: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === key) handler();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [key, handler, enabled]);
}