//* @type Integration Component
//* @context Brand Design
//* @utility Panel lateral de atajos de teclado del brand-design. Filtra los comandos de la sección "Brand Design" y "Tools" de DEBUG_COMMANDS.

import { useRef, useEffect } from "react";
import { X, Keyboard } from "lucide-react";
import { DEBUG_COMMANDS } from "../../pages-explorer/hooks/useDebugKeyboard";

const BD_SECTIONS = ["Brand Design", "Tools"];

interface BDCommandsPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function BDCommandsPanel({ open, onClose }: BDCommandsPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => panelRef.current?.focus());
    }
  }, [open]);

  if (!open) return null;

  const sections = DEBUG_COMMANDS
    .filter((cmd) => BD_SECTIONS.includes(cmd.section))
    .reduce<Record<string, typeof DEBUG_COMMANDS>>((acc, cmd) => {
      if (!acc[cmd.section]) acc[cmd.section] = [];
      acc[cmd.section].push(cmd);
      return acc;
    }, {});

  return (
    <div
      ref={panelRef}
      tabIndex={-1}
      className="fixed right-0 top-0 bottom-0 w-80 z-9300 bg-debug-surface dark:bg-debug-surface-dark border-l border-debug-border dark:border-debug-border-dark shadow-2xl shadow-black/20 flex flex-col outline-none"
    >
      {/* <Tag> Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-debug-border dark:border-debug-border-dark">
        <div className="flex items-center gap-2">
          <Keyboard size={16} className="text-debug-primary" />
          <span className="text-sm font-semibold text-debug-text dark:text-debug-text-dark">
            Keyboard Shortcuts
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-(--radius-debug-tab) text-debug-text-muted dark:text-debug-text-muted-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark transition-colors duration-150"
        >
          <X size={14} />
        </button>
      </div>

      {/* <Tag> Commands list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-debug">
        {Object.entries(sections).map(([section, commands]) => (
          <div key={section}>
            <h3 className="text-[10px] font-semibold uppercase tracking-widest text-debug-text-muted dark:text-debug-text-muted-dark mb-2.5 flex items-center gap-2">
              <span>{section}</span>
              <span className="flex-1 h-px bg-debug-border dark:bg-debug-border-dark" />
            </h3>
            <div className="space-y-1">
              {commands.map((cmd) => (
                <div
                  key={cmd.id}
                  className="flex items-center justify-between py-2 px-3 rounded-(--radius-debug-tab) hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark transition-colors duration-150"
                >
                  <span className="text-sm text-debug-text dark:text-debug-text-dark">
                    {cmd.label}
                  </span>
                  <kbd className="text-[10px] font-mono px-2 py-1 rounded-(--radius-debug-tab) bg-debug-primary/5 dark:bg-debug-primary/10 border border-debug-primary/15 dark:border-debug-primary/20 text-debug-primary">
                    {cmd.shortcut}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
