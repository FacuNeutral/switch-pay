import { useState, useEffect, useCallback } from "react";
import {
  fetchComponents,
  fetchComponentByName,
  smartSearch,
  type ComponentMatchDTO,
  type SmartSearchDTO,
} from "../../api/explorer.api";
import { ExplorerSidebar } from "../organisms/ExplorerSidebar";
import { SearchPanel } from "../organisms/SearchPanel";
import { ResultsGrid } from "../organisms/ResultsGrid";
import { DetailPanel } from "../organisms/DetailPanel";
import { ComponentPreview } from "../organisms/ComponentPreview";

export function ComponentExplorer() {
  // Filter state
  const [family, setFamily] = useState("");
  const [domain, setDomain] = useState("");
  const [complexity, setComplexity] = useState("");

  // Data state
  const [components, setComponents] = useState<ComponentMatchDTO[]>([]);
  const [smartResult, setSmartResult] = useState<SmartSearchDTO | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<Record<string, unknown> | null>(null);

  // Loading
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  // Fetch component list on filter change
  useEffect(() => {
    setSmartResult(null);
    fetchComponents({
      family: family || undefined,
      domain: domain || undefined,
      complexity: complexity || undefined,
    }).then(setComponents).catch(() => setComponents([]));
  }, [family, domain, complexity]);

  // Fetch metadata when selecting a component
  useEffect(() => {
    if (!selectedName) {
      setMetadata(null);
      return;
    }
    setIsLoadingDetail(true);
    fetchComponentByName(selectedName)
      .then(setMetadata)
      .finally(() => setIsLoadingDetail(false));
  }, [selectedName]);

  const handleExactSearch = useCallback((q: string) => {
    setSmartResult(null);
    const lower = q.toLowerCase();
    fetchComponents().then((all) => {
      const filtered = all.filter(
        (c) =>
          c.name.toLowerCase().includes(lower) ||
          c.keywords.some((k) => k.includes(lower))
      );
      setComponents(filtered);
    });
  }, []);

  const handleSmartSearch = useCallback((q: string) => {
    setIsSearching(true);
    smartSearch(q)
      .then((res) => {
        setSmartResult(res);
        // Also fetch full list so ResultsGrid can cross-reference
        fetchComponents().then(setComponents);
        if (res.best) setSelectedName(res.best);
      })
      .finally(() => setIsSearching(false));
  }, []);

  return (
    <div data-component="ComponentExplorer" className="flex h-full">
      <ExplorerSidebar
        family={family}
        domain={domain}
        complexity={complexity}
        onFamilyChange={setFamily}
        onDomainChange={setDomain}
        onComplexityChange={setComplexity}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Search */}
        <div className="p-4 border-b border-zinc-800">
          <SearchPanel
            onExactSearch={handleExactSearch}
            onSmartSearch={handleSmartSearch}
            isLoading={isSearching}
          />
        </div>

        {/* Preview */}
        {selectedName && (
          <div className="border-b border-zinc-800 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-zinc-200">Preview</h3>
                <span className="text-xs text-zinc-500 font-mono">{selectedName}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedName(null)}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                ✕ Cerrar
              </button>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-6 flex items-start justify-center min-h-40">
              <ComponentPreview componentName={selectedName} />
            </div>
          </div>
        )}

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4">
          <ResultsGrid
            components={components}
            smartResults={smartResult?.all ?? null}
            selectedName={selectedName}
            onSelect={setSelectedName}
            confidence={smartResult?.confidence}
            reason={smartResult?.reason}
          />
        </div>
      </div>

      {/* Detail */}
      <DetailPanel metadata={metadata} isLoading={isLoadingDetail} />
    </div>
  );
}
