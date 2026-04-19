import { useState } from "react";

export interface EventCardProps {
  eventId: string;
  eventName: string;
  date: string;
  venue: string;
  price?: number;
  imageUrl?: string;
  onBook?: (eventId: string) => void;
}

export function EventCard({
  eventId,
  eventName,
  date,
  venue,
  price = 0,
  imageUrl,
  onBook,
}: EventCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      data-component="EventCard"
      data-id={eventId}
      className={`rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden transition-all duration-200 ${
        isHovered ? "shadow-lg shadow-indigo-500/10 -translate-y-0.5" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={eventName}
          className="w-full h-40 object-cover"
        />
      )}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-100">{eventName}</h3>
        <p className="text-sm text-zinc-400">{formattedDate} · {venue}</p>
        <div className="flex items-center justify-between mt-2">
          {price > 0 ? (
            <span className="text-sm font-medium text-emerald-400">${price}</span>
          ) : (
            <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">Free</span>
          )}
          {isHovered && onBook && (
            <button
              type="button"
              onClick={() => onBook(eventId)}
              className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded transition-colors"
            >
              Book
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
