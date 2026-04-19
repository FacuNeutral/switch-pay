import type { ReactNode } from "react";
import { useMutationObserver } from "./hooks/useMutationObserver";

interface DevtoolsProviderProps {
  children: ReactNode;
}

export function DevtoolsProvider({ children }: DevtoolsProviderProps) {
  useMutationObserver();
  return <>{children}</>;
}
