//* @type Integration Root
//* @context Brand Design
//* @utility Panel raiz del brand-design devtool. Overlay completo con navbar, sidebar y contenido por seccion.

import { useRef, useEffect, useCallback } from "react";
import { useBrandDesignStore } from "../store/brand-design.slice";
import BDNavbar from "./BDNavbar";
import BDSidebar from "./BDSidebar";
import BDCommandsPanel from "./BDCommandsPanel";
import BDSectionCover from "./BDSectionCover";
import BDSectionLogo from "./BDSectionLogo";
import BDSectionColor from "./BDSectionColor";
import BDSectionTypography from "./BDSectionTypography";
import BDSectionIconography from "./BDSectionIconography";
import BDSectionIllustrations from "./BDSectionIllustrations";
import BDSectionComponents from "./BDSectionComponents";
import BDSectionAppSurfaces from "./BDSectionAppSurfaces";
import BDSectionImagery from "./BDSectionImagery";

export default function BDPanel() {
  const isOpen = useBrandDesignStore((s) => s.isOpen);
  const activeSection = useBrandDesignStore((s) => s.activeSection);
  const shortcutsOpen = useBrandDesignStore((s) => s.shortcutsOpen);
  const toggleShortcuts = useBrandDesignStore((s) => s.toggleShortcuts);
  const nextSection = useBrandDesignStore((s) => s.nextSection);
  const prevSection = useBrandDesignStore((s) => s.prevSection);

  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        const el = mainRef.current;
        if (!el) return;
        el.scrollTop = 0;
        el.focus();
      });
    }
  }, [isOpen, activeSection]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSection();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSection();
    }
  }, [nextSection, prevSection]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-9100 flex flex-col bg-debug-surface dark:bg-debug-surface-dark"
      onKeyDown={handleKeyDown}
    >
      {/* <Tag> Navbar */}
      <BDNavbar />

      {/* <Tag> Body — sidebar + content */}
      <div className="flex-1 min-h-0 flex">
        <BDSidebar />

        <main
          ref={mainRef}
          tabIndex={-1}
          className="flex-1 min-w-0 overflow-y-auto scrollbar-debug outline-none"
        >
          {activeSection === "cover" && <BDSectionCover />}
          {activeSection === "logo" && <BDSectionLogo />}
          {activeSection === "color" && <BDSectionColor />}
          {activeSection === "typography" && <BDSectionTypography />}
          {activeSection === "iconography" && <BDSectionIconography />}
          {activeSection === "illustrations" && <BDSectionIllustrations />}
          {activeSection === "components" && <BDSectionComponents />}
          {activeSection === "app-surfaces" && <BDSectionAppSurfaces />}
          {activeSection === "imagery" && <BDSectionImagery />}
        </main>
      </div>

      {/* <Tag> Shortcuts panel */}
      <BDCommandsPanel open={shortcutsOpen} onClose={toggleShortcuts} />
    </div>
  );
}
