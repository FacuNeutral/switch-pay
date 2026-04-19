import { useState } from "react";

export interface RatingInputProps {
  value: number;
  onChange: (rating: number) => void;
  maxStars?: number;
  disabled?: boolean;
}

const labels: Record<number, string> = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Great",
  5: "Excellent",
};

export function RatingInput({
  value,
  onChange,
  maxStars = 5,
  disabled = false,
}: RatingInputProps) {
  const [hoverValue, setHoverValue] = useState(0);

  const display = hoverValue || value;
  const label = labels[display] ?? (display === 0 ? "No rating" : `${display}/${maxStars}`);

  return (
    <div data-component="RatingInput" className="flex items-center gap-3">
      <div className="flex gap-1">
        {Array.from({ length: maxStars }, (_, i) => {
          const starIndex = i + 1;
          const isActive = starIndex <= display;
          return (
            <button
              key={starIndex}
              type="button"
              disabled={disabled}
              className={`text-2xl transition-colors ${
                disabled ? "cursor-default" : "cursor-pointer"
              } ${isActive ? "text-amber-400" : "text-zinc-700 hover:text-zinc-500"}`}
              onMouseEnter={() => !disabled && setHoverValue(starIndex)}
              onMouseLeave={() => !disabled && setHoverValue(0)}
              onClick={() => !disabled && onChange(starIndex)}
            >
              ★
            </button>
          );
        })}
      </div>
      <span className="text-sm text-zinc-400">{label}</span>
    </div>
  );
}
