//* @type Organism
//* @context Global
//* @utility Header principal con logo, barra de búsqueda y acciones de usuario.

import { useState } from "react";
import { Search, Menu, Bell, Video, Mic, Sun, Moon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/zustand/auth/auth.slice";
import { useUiStore } from "@/zustand/ui/ui.slice";

export default function Header() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);
  const darkMode = useUiStore((s) => s.darkMode);
  const toggleDarkMode = useUiStore((s) => s.toggleDarkMode);

  //* Navega a la página de búsqueda con el query codificado.
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-14 px-4 bg-neutral dark:bg-neutral-dark border-b border-neutral dark:border-neutral-surface-dark">
      {/* <Tag> Header — logo y toggle sidebar */}
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-neutral dark:hover:bg-neutral-surface-dark transition-colors">
          <Menu className="w-5 h-5 text-neutral-dark dark:text-neutral" />
        </button>
        <Link to="/" className="flex items-center gap-1">
          <div className="bg-primary rounded-lg p-1">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary-foreground fill-current">
              <path d="M10 8l6 4-6 4V8z" />
            </svg>
          </div>
          <span className="text-lg font-semibold text-neutral-dark dark:text-neutral hidden sm:inline">VidTube</span>
        </Link>
      </div>

      {/* <Tag> Search */}
      <form onSubmit={handleSearch} className="flex items-center flex-1 max-w-xl mx-4">
        <div className="flex flex-1 border border-neutral dark:border-neutral-surface-dark rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="Buscar"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-2 bg-neutral dark:bg-neutral-dark text-neutral-dark dark:text-neutral placeholder:text-neutral-off-dark dark:placeholder:text-neutral-off outline-none text-sm"
          />
          <button type="submit" className="px-5 bg-neutral dark:bg-neutral-surface-dark hover:bg-neutral-off dark:hover:bg-neutral-off-dark transition-colors">
            <Search className="w-4 h-4 text-neutral-dark dark:text-neutral" />
          </button>
        </div>
        <button type="button" className="p-2 ml-2 rounded-full bg-neutral dark:bg-neutral-surface-dark hover:bg-neutral-off dark:hover:bg-neutral-off-dark transition-colors hidden sm:flex">
          <Mic className="w-4 h-4 text-neutral-dark dark:text-neutral" />
        </button>
      </form>

      {/* <Tag> Actions — dark mode toggle, usuario o acceder */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-neutral dark:hover:bg-neutral-surface-dark transition-colors"
          aria-label={darkMode ? "Activar modo claro" : "Activar modo oscuro"}
        >
          {darkMode ? <Sun className="w-5 h-5 text-neutral-dark dark:text-neutral" /> : <Moon className="w-5 h-5 text-neutral-dark dark:text-neutral" />}
        </button>
        {user ? (
          <>
            <button className="p-2 rounded-full hover:bg-neutral dark:hover:bg-neutral-surface-dark transition-colors hidden sm:flex">
              <Video className="w-5 h-5 text-neutral-dark dark:text-neutral" />
            </button>
            <button className="p-2 rounded-full hover:bg-neutral dark:hover:bg-neutral-surface-dark transition-colors">
              <Bell className="w-5 h-5 text-neutral-dark dark:text-neutral" />
            </button>
            <button onClick={logout} className="w-8 h-8 rounded-full overflow-hidden">
              <img src={user.avatar} alt={user.name} className="w-full h-full" />
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-1 px-3 py-1.5 border border-info text-info rounded-full text-sm hover:bg-info/10 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
            Acceder
          </Link>
        )}
      </div>
    </header>
  );
}
