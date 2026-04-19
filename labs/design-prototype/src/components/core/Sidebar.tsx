//* @type Organism
//* @context Global
//* @utility Sidebar de navegación principal con enlaces, suscripciones y modo colapsado.

import { Link, useLocation } from "react-router-dom";
import { Home, Flame, Clock, ThumbsUp, FolderPlus, History, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useVideosStore } from "@/zustand/videos/videos.slice";
import { useUiStore } from "@/zustand/ui/ui.slice";

const mainLinks = [
  { icon: Home, label: "Principal", path: "/" },
  { icon: Flame, label: "Shorts", path: "/shorts" },
];

const userLinks = [
  { icon: History, label: "Historial", path: "/history" },
  { icon: FolderPlus, label: "Playlists", path: "/playlists" },
  { icon: Clock, label: "Ver más tarde", path: "/watch-later" },
  { icon: ThumbsUp, label: "Videos que gus...", path: "/liked" },
];

export default function Sidebar() {
  const location = useLocation();
  const [showAllChannels, setShowAllChannels] = useState(false);
  const collapsed = useUiStore((s) => s.sidebarCollapsed);
  const channels = useVideosStore((s) => s.channels);
  const visibleChannels = showAllChannels ? channels : channels.slice(0, 5);

  if (collapsed) {
    return (
      <aside className="fixed top-14 left-0 w-18 h-[calc(100vh-56px)] bg-neutral dark:bg-neutral-dark z-40 flex flex-col items-center pt-2 gap-1 overflow-y-auto scrollbar-hide">
        {/* <Tag> Nav — enlaces principales */}
        {mainLinks.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center justify-center w-16 py-4 rounded-lg text-[10px] gap-1 transition-colors ${
              location.pathname === path ? "bg-neutral dark:bg-neutral-surface-dark text-neutral-dark dark:text-neutral" : "text-neutral-off-dark dark:text-neutral-off hover:bg-neutral dark:hover:bg-neutral-surface-dark"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </Link>
        ))}
      </aside>
    );
  }

  return (
    <aside className="fixed top-14 left-0 w-56 h-[calc(100vh-56px)] bg-neutral dark:bg-neutral-dark z-40 overflow-y-auto scrollbar-hide py-2 px-2">
      {/* <Tag> Nav — enlaces principales */}
      <nav className="flex flex-col gap-0.5">
        {mainLinks.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-5 px-3 py-2 rounded-lg text-sm transition-colors ${
              location.pathname === path
                ? "bg-neutral dark:bg-neutral-surface-dark text-neutral-dark dark:text-neutral font-medium"
                : "text-neutral-dark dark:text-neutral hover:bg-neutral dark:hover:bg-neutral-surface-dark"
            }`}
          >
            <Icon className="w-5 h-5 shrink-0" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <div className="border-t border-neutral dark:border-neutral-surface-dark my-3" />

      {/* <Tag> Suscripciones */}
      <div className="px-3 mb-2">
        <h3 className="text-sm font-medium text-neutral-dark dark:text-neutral flex items-center gap-1">
          Suscripciones <ChevronDown className="w-4 h-4" />
        </h3>
      </div>
      <nav className="flex flex-col gap-0.5">
        {visibleChannels.map((ch) => (
          <button
            key={ch.name}
            className="flex items-center gap-3 px-3 py-1.5 rounded-lg text-sm text-neutral-dark dark:text-neutral hover:bg-neutral dark:hover:bg-neutral-surface-dark transition-colors w-full text-left"
          >
            <img src={ch.avatar} alt={ch.name} className="w-6 h-6 rounded-full" />
            <span className="flex-1 truncate">{ch.name}</span>
            {ch.hasNotification && <span className="w-1.5 h-1.5 rounded-full bg-info" />}
          </button>
        ))}
        <button
          onClick={() => setShowAllChannels(!showAllChannels)}
          className="flex items-center gap-5 px-3 py-2 rounded-lg text-sm text-neutral-dark dark:text-neutral hover:bg-neutral dark:hover:bg-neutral-surface-dark transition-colors"
        >
          {showAllChannels ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          <span>{showAllChannels ? "Mostrar menos" : "Mostrar más"}</span>
        </button>
      </nav>

      <div className="border-t border-neutral dark:border-neutral-surface-dark my-3" />

      {/* <Tag> Enlaces de usuario */}
      <div className="px-3 mb-2">
        <h3 className="text-sm font-medium text-neutral-dark dark:text-neutral">Tú</h3>
      </div>
      <nav className="flex flex-col gap-0.5">
        {userLinks.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className="flex items-center gap-5 px-3 py-2 rounded-lg text-sm text-neutral-dark dark:text-neutral hover:bg-neutral dark:hover:bg-neutral-surface-dark transition-colors"
          >
            <Icon className="w-5 h-5 shrink-0" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
