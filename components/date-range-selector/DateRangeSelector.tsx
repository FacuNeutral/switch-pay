import { useState } from "react";

export interface DatePreset {
  label: string;
  days: number;
}

export interface DateRangeSelectorProps {
  startDate: string;
  endDate: string;
  onChange: (start: string, end: string) => void;
  presets?: DatePreset[];
}

function toDateStr(d: Date): string {
  return d.toISOString().split("T")[0];
}

export function DateRangeSelector({
  startDate,
  endDate,
  onChange,
  presets,
}: DateRangeSelectorProps) {
  const [localStart, setLocalStart] = useState(startDate);
  const [localEnd, setLocalEnd] = useState(endDate);

  const isInvalid = localStart > localEnd;
  const today = toDateStr(new Date());

  function applyPreset(days: number) {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    const s = toDateStr(start);
    const e = toDateStr(end);
    setLocalStart(s);
    setLocalEnd(e);
    onChange(s, e);
  }

  return (
    <div data-component="DateRangeSelector" className="flex flex-col gap-3">
      {presets && presets.length > 0 && (
        <div className="flex gap-1.5">
          {presets.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => applyPreset(p.days)}
              className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2.5 py-1 rounded transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={localStart}
          max={today}
          onChange={(e) => setLocalStart(e.target.value)}
          className={`bg-zinc-800 border rounded-lg px-3 py-1.5 text-sm text-zinc-200 outline-none transition-colors ${
            isInvalid ? "border-red-500" : "border-zinc-700 focus:border-indigo-500"
          }`}
        />
        <span className="text-zinc-500 text-xs">→</span>
        <input
          type="date"
          value={localEnd}
          max={today}
          onChange={(e) => setLocalEnd(e.target.value)}
          className={`bg-zinc-800 border rounded-lg px-3 py-1.5 text-sm text-zinc-200 outline-none transition-colors ${
            isInvalid ? "border-red-500" : "border-zinc-700 focus:border-indigo-500"
          }`}
        />
        <button
          type="button"
          disabled={isInvalid}
          onClick={() => onChange(localStart, localEnd)}
          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
            isInvalid
              ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-500 text-white"
          }`}
        >
          Apply
        </button>
      </div>
      {isInvalid && (
        <p className="text-xs text-red-400">Start date must be before end date</p>
      )}
    </div>
  );
}
