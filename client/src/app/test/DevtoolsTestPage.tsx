import { DevtoolsProvider } from "@/devtools/trace-system/DevtoolsProvider";
import { DevtoolsPanel } from "@/devtools/trace-system/panel/DevtoolsPanel";
import { Card } from "./components/Card";

/**
 * @DS_LAYER `PAGE`
 */
export function DevtoolsTestPage() {
  return (
    <DevtoolsProvider>
      <section className="w-full max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-100">
            Devtools — Trace System
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Entorno aislado de testing visual. Interactúa con los componentes y
            observa las trazas de cambios de clase en tiempo real.
          </p>
        </div>

        <div className="flex gap-8 items-start">
          {/* Zona de componentes de prueba */}
          <div className="flex-1 flex flex-col gap-6">
            <h2 className="text-xs uppercase tracking-widest text-zinc-600 font-semibold">
              Componentes
            </h2>
            <Card />
          </div>

          {/* Panel de trazas */}
          <div className="shrink-0">
            <h2 className="text-xs uppercase tracking-widest text-zinc-600 font-semibold mb-4">
              Trazas
            </h2>
            <DevtoolsPanel />
          </div>
        </div>
      </section>
    </DevtoolsProvider>
  );
}
