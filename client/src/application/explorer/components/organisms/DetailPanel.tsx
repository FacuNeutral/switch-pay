import { useState } from "react";

interface DetailPanelProps {
  metadata: Record<string, unknown> | null;
  isLoading: boolean;
}

type Tab = "overview" | "props" | "states" | "modifiers" | "rules" | "business" | "composition";

const TABS: { key: Tab; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "props", label: "Props" },
  { key: "states", label: "States" },
  { key: "modifiers", label: "Modifiers" },
  { key: "rules", label: "Rules" },
  { key: "business", label: "Business" },
  { key: "composition", label: "Composition" },
];

export function DetailPanel({ metadata, isLoading }: DetailPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  if (isLoading) {
    return (
      <div data-component="DetailPanel" className="p-6 text-zinc-500 text-sm">
        Loading metadata...
      </div>
    );
  }

  if (!metadata) {
    return (
      <div data-component="DetailPanel" className="p-6 text-zinc-600 text-sm text-center">
        Select a component to view details
      </div>
    );
  }

  const identity = metadata.identity as Record<string, unknown> | undefined;
  const organism = metadata.organism as Record<string, unknown> | undefined;

  return (
    <div data-component="DetailPanel" className="border-l border-zinc-800 flex flex-col min-w-80 max-w-100">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800">
        <h2 className="text-lg font-bold text-zinc-100">{identity?.name as string}</h2>
        <p className="text-xs text-zinc-500 mt-1">{identity?.description as string}</p>
        {organism && (
          <span className="inline-block mt-2 text-xs bg-violet-500/15 text-violet-400 px-2 py-0.5 rounded">
            {organism.type as string}
          </span>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-800 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setActiveTab(t.key)}
            className={`px-3 py-2 text-xs whitespace-nowrap transition-colors ${
              activeTab === t.key
                ? "text-indigo-400 border-b-2 border-indigo-400"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 text-sm">
        {activeTab === "overview" && <OverviewTab metadata={metadata} />}
        {activeTab === "props" && <JsonList data={metadata.props} />}
        {activeTab === "states" && <JsonList data={metadata.state} />}
        {activeTab === "modifiers" && <JsonList data={metadata.modifiers} />}
        {activeTab === "rules" && <RulesTab metadata={metadata} />}
        {activeTab === "business" && <BusinessTab metadata={metadata} />}
        {activeTab === "composition" && <JsonBlock data={metadata.composition} />}
      </div>
    </div>
  );
}

function OverviewTab({ metadata }: { metadata: Record<string, unknown> }) {
  const usage = metadata.usage as Record<string, unknown> | undefined;
  const identity = metadata.identity as Record<string, unknown> | undefined;

  return (
    <div className="flex flex-col gap-4">
      <Section title="Identity">
        <Info label="Version" value={identity?.version as string} />
        <Info label="Family" value={identity?.family as string} />
        <Info label="Complexity" value={metadata.complexity as string} />
      </Section>
      {usage && (
        <Section title="Usage">
          <p className="text-zinc-400 text-xs mb-2">{usage.purpose as string}</p>
          <Info label="Use Cases" value={(usage.useCases as string[])?.join(", ")} />
          <Info label="Not For" value={(usage.notUseCases as string[])?.join(", ")} />
        </Section>
      )}
      {renderTokens(metadata)}
    </div>
  );
}

function RulesTab({ metadata }: { metadata: Record<string, unknown> }) {
  const rules = (metadata.rules as string[]) ?? [];
  const conditions = (metadata.conditions as { if: string; then: string }[]) ?? [];

  return (
    <div className="flex flex-col gap-4">
      <Section title="Rules">
        {rules.map((r, i) => (
          <p key={i} className="text-zinc-400 text-xs">• {r}</p>
        ))}
      </Section>
      {conditions.length > 0 && (
        <Section title="Conditions">
          {conditions.map((c, i) => (
            <div key={i} className="text-xs mb-1">
              <span className="text-amber-400">if</span>{" "}
              <span className="text-zinc-300">{c.if}</span>{" "}
              <span className="text-emerald-400">→</span>{" "}
              <span className="text-zinc-400">{c.then}</span>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}

function BusinessTab({ metadata }: { metadata: Record<string, unknown> }) {
  const business = metadata.business as Record<string, unknown> | undefined;
  const businessData = (metadata.businessData as Record<string, unknown>[]) ?? [];

  return (
    <div className="flex flex-col gap-4">
      {business && (
        <Section title="Business Context">
          <Info label="Domains" value={(business.domains as string[])?.join(", ")} />
          <Info label="Scenarios" value={(business.scenarios as string[])?.join(", ")} />
          <Info label="Priority" value={business.priority as string} />
        </Section>
      )}
      {businessData.length > 0 && (
        <Section title="Business Data">
          {businessData.map((bp) => (
            <div key={bp.name as string} className="text-xs mb-1.5">
              <span className="text-indigo-300 font-mono">{bp.name as string}</span>
              <span className="text-zinc-600">: {bp.type as string}</span>
              {Boolean(bp.required) && <span className="text-red-400 ml-1">*</span>}
              <p className="text-zinc-500 ml-2">{bp.description as string}</p>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}

function JsonList({ data }: { data: unknown }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <p className="text-zinc-600 text-xs">No data</p>;
  }
  return (
    <div className="flex flex-col gap-2">
      {data.map((item, i) => (
        <div key={i} className="bg-zinc-800/50 rounded-lg p-3 text-xs">
          {Object.entries(item as Record<string, unknown>).map(([k, v]) => (
            <div key={k}>
              <span className="text-zinc-500">{k}:</span>{" "}
              <span className="text-zinc-300">{String(v)}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function JsonBlock({ data }: { data: unknown }) {
  if (!data) return <p className="text-zinc-600 text-xs">No data</p>;
  return (
    <pre className="text-xs text-zinc-400 bg-zinc-800/50 rounded-lg p-3 overflow-x-auto">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

function renderTokens(metadata: Record<string, unknown>): React.ReactNode {
  if (!metadata.tokens || typeof metadata.tokens !== "object") return null;
  const tokens = metadata.tokens as Record<string, string>;
  return (
    <Section title="Tokens">
      {Object.keys(tokens).map((k) => (
        <Info key={k} label={k} value={String(tokens[k])} />
      ))}
    </Section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">{title}</h3>
      {children}
    </div>
  );
}

function Info({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="text-xs mb-1">
      <span className="text-zinc-500">{label}:</span>{" "}
      <span className="text-zinc-300">{value}</span>
    </div>
  );
}
