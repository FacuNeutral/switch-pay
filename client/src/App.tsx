import { useState } from "react";
import { ProductGalleryPage } from "./pages/ProductGalleryPage";
import { DevtoolsTestPage } from "./app/test/DevtoolsTestPage";
import { VideoGalleryPage } from "./pages/VideoGalleryPage";
import { ComponentExplorerPage } from "./pages/ComponentExplorerPage";
import { VideoPlayerModal } from "./components/global/modals/VideoPlayerModal";

type Route = "gallery" | "devtools" | "previews" | "explorer";

//<GLOBAL_LAYOUT>
function App() {
  const [route, setRoute] = useState<Route>("gallery");

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      {/* Top nav */}
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <span className="text-zinc-100 font-semibold tracking-wide text-sm">react-ast</span>
        <nav className="flex gap-6">
          <button
            type="button"
            onClick={() => setRoute("gallery")}
            className={`text-sm transition-colors cursor-pointer ${route === "gallery" ? "text-zinc-100" : "text-zinc-400 hover:text-zinc-100"}`}
          >
            Gallery
          </button>
          <button
            type="button"
            onClick={() => setRoute("devtools")}
            className={`text-sm transition-colors cursor-pointer ${route === "devtools" ? "text-zinc-100" : "text-zinc-400 hover:text-zinc-100"}`}
          >
            Devtools
          </button>
          <button
            type="button"
            onClick={() => setRoute("previews")}
            className={`text-sm transition-colors cursor-pointer ${route === "previews" ? "text-zinc-100" : "text-zinc-400 hover:text-zinc-100"}`}
          >
            Previews
          </button>
          <button
            type="button"
            onClick={() => setRoute("explorer")}
            className={`text-sm transition-colors cursor-pointer ${route === "explorer" ? "text-zinc-100" : "text-zinc-400 hover:text-zinc-100"}`}
          >
            Explorer
          </button>
          <a href="#" className="text-zinc-400 hover:text-zinc-100 text-sm transition-colors">Docs</a>
          <a href="#" className="text-zinc-400 hover:text-zinc-100 text-sm transition-colors">GitHub</a>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1 p-6">
        {route === "gallery" && <ProductGalleryPage />}
        {route === "devtools" && <DevtoolsTestPage />}
        {route === "previews" && <VideoGalleryPage />}
        {route === "explorer" && <ComponentExplorerPage />}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 px-6 py-4 text-center text-zinc-600 text-xs">
        react-ast &copy; {new Date().getFullYear()}
      </footer>

      {/* Global overlays */}
      <VideoPlayerModal />
    </div>
  )
}

export default App
