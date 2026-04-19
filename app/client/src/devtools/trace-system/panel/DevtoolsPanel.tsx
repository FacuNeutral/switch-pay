import { useSyncExternalStore, useState } from "react";
import {
  getTraces,
  subscribe,
  clearTraces,
  type TraceLog,
} from "../store/trace.store";

function GroupedLogs({ logs }: { logs: TraceLog[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const grouped = logs.reduce<Record<string, TraceLog[]>>((acc, log) => {
    (acc[log.dataId] ??= []).push(log);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-3">
      {Object.entries(grouped).map(([dataId, entries]) => (
        <div
          key={dataId}
          className="border border-zinc-700 rounded-lg overflow-hidden"
        >
          <button
            type="button"
            onClick={() => setExpanded(expanded === dataId ? null : dataId)}
            className="w-full flex items-center justify-between px-4 py-2 bg-zinc-800 hover:bg-zinc-750 transition-colors text-left cursor-pointer"
          >
            <span className="font-mono text-sm text-violet-400">
              [{dataId}]
            </span>
            <span className="text-xs text-zinc-500">
              {entries.length} cambio{entries.length !== 1 && "s"}
            </span>
          </button>

          {expanded === dataId && (
            <div className="flex flex-col divide-y divide-zinc-800">
              {entries.map((entry) => (
                <div key={entry.id} className="px-4 py-3 flex flex-col gap-1">
                  <span className="text-[10px] text-zinc-600 font-mono">
                    {new Date(entry.timestamp).toLocaleTimeString()}
                  </span>

                  {entry.added.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {entry.added.map((cls) => (
                        <span
                          key={cls}
                          className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-emerald-900/40 text-emerald-400 border border-emerald-800/50"
                        >
                          + {cls}
                        </span>
                      ))}
                    </div>
                  )}

                  {entry.removed.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {entry.removed.map((cls) => (
                        <span
                          key={cls}
                          className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-red-900/40 text-red-400 border border-red-800/50"
                        >
                          - {cls}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function DevtoolsPanel() {
  const traces = useSyncExternalStore(subscribe, getTraces);

  return (
    <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col overflow-hidden shadow-xl shadow-black/40">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
          <span className="text-sm font-semibold text-zinc-100">
            Trace Panel
          </span>
        </div>
        <button
          type="button"
          onClick={clearTraces}
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
        >
          Limpiar
        </button>
      </div>

      {/* Body */}
      <div className="px-5 py-4 max-h-105 overflow-y-auto">
        {traces.length === 0 ? (
          <p className="text-sm text-zinc-600 text-center py-8">
            Sin cambios detectados aún. Interactúa con los componentes.
          </p>
        ) : (
          <GroupedLogs logs={traces} />
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-2 border-t border-zinc-800 text-[10px] text-zinc-600 text-right">
        {traces.length} registro{traces.length !== 1 && "s"}
      </div>
    </div>
  );
}
