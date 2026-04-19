interface SidebarProps {
  family: string;
  domain: string;
  complexity: string;
  onFamilyChange: (v: string) => void;
  onDomainChange: (v: string) => void;
  onComplexityChange: (v: string) => void;
}

const FAMILIES = ["", "card", "list", "input"];
const DOMAINS = ["", "ecommerce", "saas", "marketing", "dashboard", "content", "social"];
const COMPLEXITIES = ["", "low", "medium", "high"];

export function ExplorerSidebar({
  family,
  domain,
  complexity,
  onFamilyChange,
  onDomainChange,
  onComplexityChange,
}: SidebarProps) {
  return (
    <aside
      data-component="ExplorerSidebar"
      className="w-56 shrink-0 border-r border-zinc-800 p-4 flex flex-col gap-5"
    >
      <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Filters</h2>

      <FilterGroup label="Family" value={family} options={FAMILIES} onChange={onFamilyChange} />
      <FilterGroup label="Domain" value={domain} options={DOMAINS} onChange={onDomainChange} />
      <FilterGroup label="Complexity" value={complexity} options={COMPLEXITIES} onChange={onComplexityChange} />
    </aside>
  );
}

function FilterGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-zinc-400 font-medium">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-zinc-800 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-sm text-zinc-200 outline-none focus:border-indigo-500 transition-colors"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o || "All"}
          </option>
        ))}
      </select>
    </div>
  );
}
