//* @type Integration Component
//* @context Pages Explore
//* @utility Panel lateral de detalle con tabs de descripción y estructura interna.

import { useMemo, useRef, useEffect } from "react";
import { FileText, GitBranch, Box, Database, Zap, Route, Tag } from "lucide-react";
import { usePagesExplorerStore } from "../store/pages-explorer.slice";
import { PAGE_DOCS, ROUTE_MAP, type PageDoc, type DetailTab } from "../store/pages-explorer.mock";

export default function DebugDetailPanel() {
  const detailOpen = usePagesExplorerStore((s) => s.detailOpen);
  const detailTab = usePagesExplorerStore((s) => s.detailTab);
  const setDetailTab = usePagesExplorerStore((s) => s.setDetailTab);
  const activeRoute = usePagesExplorerStore((s) => s.activeRoute);

  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (detailOpen) {
      requestAnimationFrame(() => panelRef.current?.focus());
    }
  }, [detailOpen, detailTab]);

  const pageDoc = useMemo<PageDoc | undefined>(() => {
    const pathOnly = activeRoute.split("?")[0];

    return PAGE_DOCS.find((d) => {
      if (d.route === activeRoute) return true;

      const docPath = d.route.split("?")[0];
      if (docPath === pathOnly) return true;

      if (docPath.includes(":")) {
        const pattern = new RegExp(`^${docPath.replace(/:[\\w]+/g, "[^/]+")}$`);
        if (pattern.test(pathOnly)) return true;
      }

      if (d.route === "*") {
        const wildcardEntry = ROUTE_MAP.find((r) => r.path === "*");
        if (wildcardEntry && activeRoute === wildcardEntry.navigateTo) return true;
      }

      return false;
    });
  }, [activeRoute]);

  const tabs: { key: DetailTab; label: string; icon: React.ReactNode }[] = [
    { key: "description", label: "Description", icon: <FileText size={14} /> },
    { key: "structure", label: "Structure", icon: <GitBranch size={14} /> },
  ];

  const TABS: DetailTab[] = ["description", "structure"];

  function handlePanelKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = TABS[(TABS.indexOf(detailTab) + 1) % TABS.length];
      setDetailTab(next);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev = TABS[(TABS.indexOf(detailTab) - 1 + TABS.length) % TABS.length];
      setDetailTab(prev);
    }
  }

  if (!detailOpen) return null;

  return (
    <div ref={panelRef} tabIndex={-1} onKeyDown={handlePanelKeyDown} className="w-80 shrink-0 border-l border-debug-border dark:border-debug-border-dark bg-debug-surface dark:bg-debug-surface-dark overflow-y-auto scrollbar-debug outline-none">
      {/* ==========================================
          Tab Bar
         ========================================== */}
      <div className="flex border-b border-debug-border dark:border-debug-border-dark bg-debug-surface dark:bg-debug-surface-dark">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setDetailTab(tab.key)}
            className={`
              flex-1 flex items-center justify-center gap-1.5 px-3 py-3 text-sm font-medium
              transition-all duration-200 border-b-2
              ${
                detailTab === tab.key
                  ? "border-debug-primary text-debug-primary bg-debug-primary/5"
                  : "border-transparent text-debug-text-muted dark:text-debug-text-muted-dark hover:text-debug-text dark:hover:text-debug-text-dark hover:bg-debug-surface-overlay/50 dark:hover:bg-debug-surface-overlay-dark/50"
              }
            `}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* ==========================================
          Content
         ========================================== */}
      <div className="p-4">
        {!pageDoc ? (
          <div className="text-center text-debug-text-muted dark:text-debug-text-muted-dark text-xs py-8">
            No documentation found for this route
          </div>
        ) : detailTab === "description" ? (
          <DescriptionTab doc={pageDoc} />
        ) : (
          <StructureTab doc={pageDoc} />
        )}
      </div>
    </div>
  );
}

/* ==========================================
   Description Tab
   ========================================== */

function DescriptionTab({ doc }: { doc: PageDoc }) {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h3 className="text-base font-semibold text-debug-text dark:text-debug-text-dark mb-1">
          {doc.title}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-(--radius-debug-chip) bg-debug-primary/10 border border-debug-primary/20 text-xs font-medium text-debug-primary">
            <Route size={11} />
            {doc.route}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-(--radius-debug-chip) bg-debug-accent/10 border border-debug-accent/20 text-xs font-medium text-debug-accent">
            <Tag size={11} />
            {doc.layout}
          </span>
        </div>
        <p className="text-sm text-debug-text-muted dark:text-debug-text-muted-dark leading-relaxed">
          {doc.description}
        </p>
      </div>

      {/* Params */}
      {(doc.params.length > 0 || doc.queryParams.length > 0) && (
        <div>
          <SectionTitle icon={<Route size={13} />} label="Parameters" />
          <div className="space-y-1.5">
            {doc.params.map((p) => (
              <ParamRow key={p.name} label={`:${p.name}`} example={p.example} description={p.description} />
            ))}
            {doc.queryParams.map((p) => (
              <ParamRow key={p.name} label={`?${p.name}=`} example={p.example} description={p.description} />
            ))}
          </div>
        </div>
      )}

      {/* Stores */}
      {doc.stores.length > 0 && (
        <div>
          <SectionTitle icon={<Database size={13} />} label="Stores" />
          <div className="space-y-1">
            {doc.stores.map((s) => (
              <div
                key={s}
                className="text-sm font-mono px-2.5 py-2 rounded-(--radius-debug-tab) bg-debug-primary/5 dark:bg-debug-primary/10 border border-debug-primary/15 dark:border-debug-primary/20 text-debug-primary"
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Processes */}
      {doc.processes.length > 0 && (
        <div>
          <SectionTitle icon={<Zap size={13} />} label="Processes" />
          <ul className="space-y-2">
            {doc.processes.map((p, i) => (
              <li key={i} className="flex gap-2 text-sm text-debug-text-muted dark:text-debug-text-muted-dark">
                <span className="text-debug-primary font-semibold shrink-0">{i + 1}.</span>
                <span className="leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ==========================================
   Structure Tab
   ========================================== */

function StructureTab({ doc }: { doc: PageDoc }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-semibold text-debug-text dark:text-debug-text-dark mb-3">
          Component Map
        </h3>
        <div className="space-y-3">
          {doc.sections.map((section, i) => (
            <div
              key={i}
              className="relative pl-4 border-l-2 border-debug-primary/30"
            >
              <div className="absolute -left-1.25 top-1 w-2 h-2 rounded-full bg-debug-primary" />
              <div className="flex items-center gap-1.5 mb-1">
                <Box size={13} className="text-debug-primary shrink-0" />
                <span className="text-sm font-semibold text-debug-text dark:text-debug-text-dark">
                  {section.component}
                </span>
              </div>
              {section.path && (
                <div className="text-[10px] font-mono text-debug-text-muted dark:text-debug-text-muted-dark mb-1 break-all">
                  {section.path}
                </div>
              )}
              <p className="text-sm text-debug-text-muted dark:text-debug-text-muted-dark leading-relaxed">
                {section.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Tree */}
      <div>
        <SectionTitle icon={<GitBranch size={13} />} label="Render Tree" />
        <div className="bg-debug-surface-overlay dark:bg-debug-surface-overlay-dark rounded-(--radius-debug-panel) p-3.5 font-mono text-[11px] text-debug-text dark:text-debug-text-dark border border-debug-border dark:border-debug-border-dark">
          <div className="text-debug-text-muted dark:text-debug-text-muted-dark">
            {"<"}<span className="text-debug-primary">{doc.layout === "MainLayout" ? "MainLayout" : "Page"}</span>{">"}
          </div>
          {doc.layout === "MainLayout" && (
            <>
              <div className="pl-3 text-debug-text-muted dark:text-debug-text-muted-dark">
                {"<"}<span className="text-debug-viewport-desktop">Header</span>{" />"} 
              </div>
              <div className="pl-3 text-debug-text-muted dark:text-debug-text-muted-dark">
                {"<"}<span className="text-debug-viewport-desktop">Sidebar</span>{" />"}
              </div>
              <div className="pl-3 text-debug-text-muted dark:text-debug-text-muted-dark">
                {"<"}<span className="text-debug-viewport-tablet">Outlet</span>{">"}
              </div>
            </>
          )}
          <div className={doc.layout === "MainLayout" ? "pl-6" : "pl-3"}>
            <div className="text-debug-text-muted dark:text-debug-text-muted-dark">
              {"<"}<span className="text-debug-primary font-semibold">{doc.title}Page</span>{">"}
            </div>
            {doc.sections.map((s, i) => (
              <div key={i} className="pl-3 text-debug-text-muted dark:text-debug-text-muted-dark">
                {"<"}<span className="text-debug-viewport-mobile">{s.component}</span>{" />"}
              </div>
            ))}
            <div className="text-debug-text-muted dark:text-debug-text-muted-dark">
              {"</"}<span className="text-debug-primary font-semibold">{doc.title}Page</span>{">"}
            </div>
          </div>
          {doc.layout === "MainLayout" && (
            <div className="pl-3 text-debug-text-muted dark:text-debug-text-muted-dark">
              {"</"}<span className="text-debug-viewport-tablet">Outlet</span>{">"}
            </div>
          )}
          <div className="text-debug-text-muted dark:text-debug-text-muted-dark">
            {"</"}<span className="text-debug-primary">{doc.layout === "MainLayout" ? "MainLayout" : "Page"}</span>{">"}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================
   Shared UI Fragments
   ========================================== */

function SectionTitle({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 mb-2.5">
      <span className="text-debug-primary">{icon}</span>
      <span className="text-[10px] font-semibold uppercase tracking-widest text-debug-text-muted dark:text-debug-text-muted-dark">
        {label}
      </span>
      <span className="flex-1 h-px bg-debug-border dark:bg-debug-border-dark ml-1" />
    </div>
  );
}

function ParamRow({ label, example, description }: { label: string; example: string; description: string }) {
  return (
    <div className="flex items-start gap-2 text-sm">
      <code className="shrink-0 px-2 py-0.5 rounded-(--radius-debug-chip) bg-debug-primary/10 border border-debug-primary/20 text-debug-primary font-mono text-xs">
        {label}
      </code>
      <div>
        <span className="text-debug-text dark:text-debug-text-dark">{description}</span>
        <span className="text-debug-text-muted dark:text-debug-text-muted-dark ml-1">e.g. {example}</span>
      </div>
    </div>
  );
}
