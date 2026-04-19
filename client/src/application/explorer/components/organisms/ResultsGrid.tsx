import type { ComponentMatchDTO } from "../../api/explorer.api";

interface ResultsGridProps {
  components: ComponentMatchDTO[];
  smartResults?: { name: string; score: number }[] | null;
  selectedName: string | null;
  onSelect: (name: string) => void;
  confidence?: number;
  reason?: string;
}

const familyColors: Record<string, string> = {
  card: "bg-blue-500/15 text-blue-400",
  list: "bg-emerald-500/15 text-emerald-400",
  input: "bg-amber-500/15 text-amber-400",
};

export function ResultsGrid({
  components,
  smartResults,
  selectedName,
  onSelect,
  confidence,
  reason,
}: ResultsGridProps) {
  // If smart results exist, order by them
  const items = smartResults
    ? smartResults.map((sr) => {
        const match = components.find((c) => c.name === sr.name);
        return { ...sr, match };
      })
    : components.map((c) => ({ name: c.name, score: 0, match: c }));

  return (
    <div data-component="ResultsGrid" className="flex flex-col gap-3">
      {smartResults && (
        <div className="flex items-center gap-3 text-xs">
          {confidence != null && (
            <span className="bg-indigo-600/20 text-indigo-300 px-2 py-0.5 rounded">
              confidence: {(confidence * 100).toFixed(0)}%
            </span>
          )}
          {reason && <span className="text-zinc-500 italic">{reason}</span>}
        </div>
      )}

      {items.length === 0 && (
        <p className="text-zinc-500 text-sm py-8 text-center">No components found</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map(({ name, score, match }) => (
          <button
            key={name}
            type="button"
            onClick={() => onSelect(name)}
            className={`text-left rounded-lg border p-4 transition-all duration-150 cursor-pointer ${
              selectedName === name
                ? "border-indigo-500 bg-indigo-500/5"
                : "border-zinc-800 bg-zinc-900 hover:border-zinc-600"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-zinc-100">{name}</h3>
              {score > 0 && (
                <span className="text-xs font-mono text-zinc-500">
                  {(score * 100).toFixed(0)}%
                </span>
              )}
            </div>
            {match && (
              <div className="flex flex-wrap gap-1.5">
                <span className={`text-xs px-1.5 py-0.5 rounded ${familyColors[match.family] ?? "bg-zinc-700 text-zinc-400"}`}>
                  {match.family}
                </span>
                {match.businessDomains.map((d) => (
                  <span key={d} className="text-xs bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded">
                    {d}
                  </span>
                ))}
                <span className="text-xs text-zinc-600">{match.complexity}</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
