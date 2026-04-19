//* @type Integration Root
//* @context Pages Explore
//* @utility Componente raíz del panel de pages-explorer. Overlay completo con navbar, viewport y panel de detalle.

import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { usePagesExplorerStore } from "../store/pages-explorer.slice";
import DebugNavbar from "./DebugNavbar";
import DebugViewport from "./DebugViewport";
import DebugDetailPanel from "./DebugDetailPanel";
import PageGalleryModal from "./PageGalleryModal";

export default function DebugPanel({ children }: { children: React.ReactNode }) {
  const isOpen = usePagesExplorerStore((s) => s.isOpen);
  const activeRoute = usePagesExplorerStore((s) => s.activeRoute);
  const navigate = useNavigate();
  const location = useLocation();

  /** Ref para evitar loop circular entre los dos effects de sync */
  const navigatingFromStore = useRef(false);

  /** Ref estable para navigate (su referencia puede cambiar entre renders) */
  const navigateRef = useRef(navigate);
  navigateRef.current = navigate;

  /** Sync: cuando cambia activeRoute en el store, navega a esa ruta */
  useEffect(() => {
    if (isOpen) {
      const current = window.location.pathname + window.location.search;
      if (activeRoute !== current) {
        navigatingFromStore.current = true;
        navigateRef.current(activeRoute);
      }
    }
  }, [activeRoute, isOpen]);

  /** Sync: cuando cambie la ubicación del router, actualizar el store */
  useEffect(() => {
    if (!isOpen) return;
    if (navigatingFromStore.current) {
      navigatingFromStore.current = false;
      return;
    }
    const currentRoute = location.pathname + location.search;
    if (currentRoute !== usePagesExplorerStore.getState().activeRoute) {
      usePagesExplorerStore.getState().setActiveRoute(currentRoute);
    }
  }, [location.pathname, location.search, isOpen]);

  if (!isOpen) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-9100 flex flex-col bg-debug-surface-overlay dark:bg-debug-surface-overlay-dark">
      {/* ==========================================
          Debug Navbar
         ========================================== */}
      <DebugNavbar />

      {/* ==========================================
          Main Area: Viewport + Detail Panel
         ========================================== */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <DebugViewport>
          {children}
        </DebugViewport>

        {/* ==========================================
            Detail Panel (right sidebar)
           ========================================== */}
        <DebugDetailPanel />
      </div>

      {/* ==========================================
          Page Gallery Modal
         ========================================== */}
      <PageGalleryModal />
    </div>
  );
}
