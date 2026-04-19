//* @type Integration Component
//* @context Pages Explore
//* @utility Botón flotante que abre/cierra el panel de pages-explorer.

import { Layers } from "lucide-react";
import { usePagesExplorerStore } from "../store/pages-explorer.slice";

export default function DebugTrigger() {
  const toggle = usePagesExplorerStore((s) => s.toggle);
  const isOpen = usePagesExplorerStore((s) => s.isOpen);

  return (
    <button
      onClick={toggle}
      className={`
        fixed bottom-5 right-5 z-9300
        flex items-center justify-center
        w-12 h-12 rounded-(--radius-debug-button)
        transition-all duration-200
        shadow-md
        ${
          isOpen
            ? "bg-debug-primary text-debug-primary-foreground shadow-[0_0_20px_var(--color-debug-primary-glow)] animate-debug-glow-pulse"
            : "bg-debug-surface dark:bg-debug-surface-dark text-debug-text dark:text-debug-text-dark border border-debug-border dark:border-debug-border-dark hover:border-debug-primary hover:shadow-[0_0_12px_var(--color-debug-primary-glow)]"
        }
        hover:bg-debug-primary-hover hover:text-debug-primary-foreground
      `}
      title="Debug Panel"
    >
      <Layers size={20} />
    </button>
  );
}
