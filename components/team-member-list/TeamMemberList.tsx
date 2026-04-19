import { useState } from "react";

export interface TeamMember {
  memberId: string;
  name: string;
  role: string;
  avatarUrl?: string;
  online?: boolean;
}

export interface TeamMemberListProps {
  members: TeamMember[];
  onSelect?: (memberId: string) => void;
}

export function TeamMemberList({ members, onSelect }: TeamMemberListProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (members.length === 0) {
    return (
      <div data-component="TeamMemberList" className="p-6 text-center text-zinc-500 text-sm">
        No team members
      </div>
    );
  }

  return (
    <div data-component="TeamMemberList" className="flex flex-col">
      {members.map((m) => {
        const initials = m.name.split(" ").map((w) => w[0]).join("").slice(0, 2);
        return (
          <div
            key={m.memberId}
            className={`flex items-center gap-3 px-4 py-3 transition-colors cursor-pointer ${
              hoveredId === m.memberId ? "bg-zinc-800/60" : ""
            }`}
            onMouseEnter={() => setHoveredId(m.memberId)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => onSelect?.(m.memberId)}
          >
            <div className="relative shrink-0">
              {m.avatarUrl ? (
                <img src={m.avatarUrl} alt={m.name} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-300">
                  {initials}
                </div>
              )}
              {m.online && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-zinc-900" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-100">{m.name}</p>
              <p className="text-xs text-zinc-500">{m.role}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
