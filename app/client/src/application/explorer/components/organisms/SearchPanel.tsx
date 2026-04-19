import { useState } from "react";

interface SearchPanelProps {
  onExactSearch: (q: string) => void;
  onSmartSearch: (q: string) => void;
  isLoading: boolean;
}

export function SearchPanel({ onExactSearch, onSmartSearch, isLoading }: SearchPanelProps) {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"exact" | "smart">("exact");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    if (mode === "smart") {
      onSmartSearch(query.trim());
    } else {
      onExactSearch(query.trim());
    }
  }

  return (
    <div data-component="SearchPanel" className="flex flex-col gap-3">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={mode === "smart" ? "card ecommerce hover..." : "EventCard..."}
          className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-indigo-500 transition-colors placeholder:text-zinc-600"
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors"
        >
          {isLoading ? "..." : "Search"}
        </button>
      </form>
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => setMode("exact")}
          className={`text-xs px-3 py-1 rounded transition-colors ${
            mode === "exact"
              ? "bg-zinc-700 text-zinc-100"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Exact
        </button>
        <button
          type="button"
          onClick={() => setMode("smart")}
          className={`text-xs px-3 py-1 rounded transition-colors ${
            mode === "smart"
              ? "bg-indigo-600/30 text-indigo-300"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Smart Search (CLI)
        </button>
      </div>
    </div>
  );
}
