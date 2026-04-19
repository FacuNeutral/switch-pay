import { useState } from "react";

export interface TestimonialCardProps {
  authorName: string;
  authorRole?: string;
  company?: string;
  quote: string;
  avatarUrl?: string;
  rating?: number;
}

export function TestimonialCard({
  authorName,
  authorRole,
  company,
  quote,
  avatarUrl,
  rating,
}: TestimonialCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const initials = authorName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  const displayQuote = quote.length > 200 ? quote.slice(0, 197) + "..." : quote;

  return (
    <div
      data-component="TestimonialCard"
      className={`rounded-xl border border-zinc-800 bg-zinc-900 p-5 flex flex-col gap-3 transition-all duration-200 ${
        isHovered ? "shadow-md shadow-zinc-700/20" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {rating != null && (
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < rating ? "text-amber-400" : "text-zinc-700"}>
              ★
            </span>
          ))}
        </div>
      )}
      <p className="text-base italic text-zinc-300 leading-relaxed">"{displayQuote}"</p>
      <div className="flex items-center gap-3 mt-auto pt-2">
        {avatarUrl ? (
          <img src={avatarUrl} alt={authorName} className="w-9 h-9 rounded-full object-cover" />
        ) : (
          <div className="w-9 h-9 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-300">
            {initials}
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-zinc-100">{authorName}</p>
          {(authorRole || company) && (
            <p className="text-xs text-zinc-500">
              {authorRole}{authorRole && company ? " · " : ""}{company}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
