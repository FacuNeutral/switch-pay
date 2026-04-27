//* @type Integration Component
//* @context Brand Design
//* @utility Sidebar con la Table of Contents numerada del manual de marca. Permite navegar entre secciones.

import { useBrandDesignStore } from "../store/brand-design.slice";
import { BRAND_SECTIONS } from "../store/brand-design.mock";
import BDLogoMark from "./BDLogoMark";

export default function BDSidebar() {
  const activeSection = useBrandDesignStore((s) => s.activeSection);
  const setActiveSection = useBrandDesignStore((s) => s.setActiveSection);

  return (
    <aside className="hidden lg:flex w-72 shrink-0 flex-col border-r border-debug-border dark:border-debug-border-dark bg-debug-surface-raised dark:bg-debug-surface-raised-dark">
      {/* <Tag> Header */}
      <div className="px-5 py-6 border-b border-debug-border dark:border-debug-border-dark">
        <span className="text-debug-text dark:text-debug-text-dark">
          <BDLogoMark
            variant="horizontal"
            size={32}
            color="#15B981"
            textColor="currentColor"
            accentColor="#15B981"
          />
        </span>
        <p className="mt-3 text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark">
          Brand Manual · v1.0
        </p>
      </div>

      {/* <Tag> Section: Table of Contents */}
      <div className="px-5 py-4 border-b border-debug-border dark:border-debug-border-dark">
        <p className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark">
          Table of Contents
        </p>
      </div>

      {/* <Tag> Section list */}
      <nav className="flex-1 overflow-y-auto scrollbar-debug py-2">
        {BRAND_SECTIONS.map((section, idx) => {
          const isActive = section.id === activeSection;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`
                w-full px-5 py-3 flex items-start gap-4 text-left
                transition-colors duration-150 group
                ${
                  isActive
                    ? "bg-debug-primary/10"
                    : "hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark"
                }
              `}
            >
              <span
                className={`
                  text-xs font-bold tracking-wider tabular-nums shrink-0 mt-0.5
                  ${isActive ? "text-debug-primary" : "text-debug-text-muted dark:text-debug-text-muted-dark"}
                `}
              >
                {section.number}
              </span>
              <span className="flex-1 min-w-0">
                <span
                  className={`
                    block text-sm font-semibold truncate
                    ${
                      isActive
                        ? "text-debug-primary"
                        : "text-debug-text dark:text-debug-text-dark"
                    }
                  `}
                >
                  {section.title}
                </span>
                <span className="block text-[11px] text-debug-text-muted dark:text-debug-text-muted-dark truncate mt-0.5">
                  {section.caption}
                </span>
              </span>
              <span
                className={`
                  text-[10px] font-mono tabular-nums shrink-0 mt-1
                  ${isActive ? "text-debug-primary" : "text-debug-text-muted/60 dark:text-debug-text-muted-dark/60"}
                `}
              >
                {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
              </span>
            </button>
          );
        })}
      </nav>

      {/* <Tag> Footer hint */}
      <div className="px-5 py-3 border-t border-debug-border dark:border-debug-border-dark text-[10px] text-debug-text-muted dark:text-debug-text-muted-dark space-y-1.5">
        <div className="flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 rounded bg-debug-surface-overlay dark:bg-debug-surface-overlay-dark border border-debug-border dark:border-debug-border-dark font-mono">
            ←  →
          </kbd>
          <span className="ml-1">navigate</span>
        </div>
        <div className="flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 rounded bg-debug-surface-overlay dark:bg-debug-surface-overlay-dark border border-debug-border dark:border-debug-border-dark font-mono">
            Ctrl+Alt+H
          </kbd>
          <span className="ml-1">all shortcuts</span>
        </div>
      </div>
    </aside>
  );
}
