import { useEffect } from "react";

export function useBodyScrollLock(enabled: boolean) {
  useEffect(() => {
    document.body.style.overflow = enabled ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [enabled]);
}