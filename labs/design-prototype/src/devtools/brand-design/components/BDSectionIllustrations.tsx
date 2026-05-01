//* @type Integration Component
//* @context Brand Design
//* @utility Seccion 06 — Illustrations. Galeria dinamica de SVGs desde src/assets/illustrations/.

import { useMemo } from "react";

const svgModules = import.meta.glob<string>(
  "/src/assets/illustrations/*.svg",
  { eager: true, query: "?url", import: "default" },
);

function nameFromPath(path: string) {
  const file = path.split("/").pop() ?? "";
  return file
    .replace(/\.svg$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function BDSectionIllustrations() {
  const entries = useMemo(() => {
    return Object.entries(svgModules)
      .map(([path, url]) => ({ path, url, label: nameFromPath(path) }))
      .reverse();
  }, []);

  return (
    <section className="px-8 lg:px-12 py-12 max-w-6xl mx-auto space-y-12">
      {/* <Tag> Header */}
      <div className="flex items-baseline gap-6">
        <span className="text-7xl font-extrabold tracking-tighter text-debug-primary leading-none shrink-0">
          06
        </span>
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-debug-text dark:text-debug-text-dark">
            Illustrations
          </h1>
          <p className="mt-2 text-sm text-debug-text-muted dark:text-debug-text-muted-dark">
            Coleccion de ilustraciones flat-vector banking-friendly. Se cargan
            dinamicamente desde <code className="font-mono text-debug-primary">src/assets/illustrations/</code>.
            Agregar un SVG a la carpeta lo incluye automaticamente.
          </p>
        </div>
      </div>

      {/* <Tag> Count badge */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark">
          Assets
        </span>
        <span className="text-[11px] font-bold tabular-nums bg-debug-primary/10 text-debug-primary px-2 py-0.5 rounded-full">
          {entries.length}
        </span>
      </div>

      {/* <Tag> Gallery */}
      <div className="grid grid-cols-1 gap-6">
        {entries.map(({ path, url, label }) => (
          <article
            key={path}
            className="rounded-3xl border border-debug-border dark:border-debug-border-dark overflow-hidden"
          >
            {/* <Tag> Preview canvas — white in light, black in dark */}
            <div className="bg-white dark:bg-black flex items-center justify-center p-8 min-h-80">
              <img
                src={url}
                alt={label}
                className="w-full max-w-130 h-auto object-contain"
              />
            </div>

            {/* <Tag> Meta */}
            <div className="px-6 py-5 space-y-3 border-t border-debug-border dark:border-debug-border-dark bg-debug-surface-raised dark:bg-debug-surface-raised-dark">
              <h3 className="text-base font-bold text-debug-text dark:text-debug-text-dark">
                {label}
              </h3>

              {/* <Tag> Path */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark">
                  Path
                </span>
                <code className="text-[11px] font-mono text-debug-text dark:text-debug-text-dark truncate">
                  {path.replace(/^\//, "")}
                </code>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* <Tag> Empty state */}
      {entries.length === 0 && (
        <div className="rounded-3xl border border-dashed border-debug-border dark:border-debug-border-dark p-12 flex items-center justify-center">
          <p className="text-sm text-debug-text-muted dark:text-debug-text-muted-dark">
            No SVGs found in <code className="font-mono">src/assets/illustrations/</code>.
          </p>
        </div>
      )}
    </section>
  );
}
