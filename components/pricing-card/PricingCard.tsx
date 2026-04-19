import { useState } from "react";

export interface PricingCardProps {
  planId: string;
  planName: string;
  priceMonthly: number;
  features: string[];
  highlighted?: boolean;
  onSelect?: (planId: string) => void;
}

export function PricingCard({
  planId,
  planName,
  priceMonthly,
  features,
  highlighted = false,
  onSelect,
}: PricingCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      data-component="PricingCard"
      data-id={planId}
      className={`rounded-xl border bg-zinc-900 p-6 flex flex-col gap-4 transition-all duration-200 ${
        highlighted ? "border-indigo-500 ring-1 ring-indigo-500/30" : "border-zinc-800"
      } ${isHovered ? "shadow-lg -translate-y-0.5" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {highlighted && (
        <span className="self-start text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full">
          Popular
        </span>
      )}
      <h3 className="text-xl font-bold text-zinc-100">{planName}</h3>
      <div className="text-3xl font-extrabold text-zinc-100">
        {priceMonthly === 0 ? (
          "Free"
        ) : (
          <>
            ${priceMonthly}
            <span className="text-sm font-normal text-zinc-500">/mo</span>
          </>
        )}
      </div>
      <ul className="flex flex-col gap-2 flex-1">
        {features.map((f) => (
          <li key={f} className="text-sm text-zinc-400 flex items-center gap-2">
            <span className="text-emerald-400 text-xs">✓</span>
            {f}
          </li>
        ))}
      </ul>
      {onSelect && (
        <button
          type="button"
          onClick={() => onSelect(planId)}
          className={`mt-2 w-full py-2 rounded-lg text-sm font-medium transition-colors ${
            highlighted
              ? "bg-indigo-600 hover:bg-indigo-500 text-white"
              : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
          }`}
        >
          Select Plan
        </button>
      )}
    </div>
  );
}
