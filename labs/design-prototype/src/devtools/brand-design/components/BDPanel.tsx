//* @type Integration Root
//* @context Brand Design
//* @utility Panel raiz del brand-design devtool. Overlay completo con navbar, sidebar y contenido por seccion.

import { useBrandDesignStore } from "../store/brand-design.slice";
import BDNavbar from "./BDNavbar";
import BDSidebar from "./BDSidebar";
import BDSectionCover from "./BDSectionCover";
import BDSectionLogo from "./BDSectionLogo";
import BDSectionColor from "./BDSectionColor";
import BDSectionTypography from "./BDSectionTypography";
import BDSectionIconography from "./BDSectionIconography";
import BDSectionComponents from "./BDSectionComponents";
import BDSectionAppSurfaces from "./BDSectionAppSurfaces";
import BDSectionImagery from "./BDSectionImagery";

export default function BDPanel() {
  const isOpen = useBrandDesignStore((s) => s.isOpen);
  const activeSection = useBrandDesignStore((s) => s.activeSection);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9100 flex flex-col bg-debug-surface dark:bg-debug-surface-dark">
      {/* <Tag> Navbar */}
      <BDNavbar />

      {/* <Tag> Body — sidebar + content */}
      <div className="flex-1 min-h-0 flex">
        <BDSidebar />

        <main className="flex-1 min-w-0 overflow-y-auto scrollbar-debug">
          {activeSection === "cover" && <BDSectionCover />}
          {activeSection === "logo" && <BDSectionLogo />}
          {activeSection === "color" && <BDSectionColor />}
          {activeSection === "typography" && <BDSectionTypography />}
          {activeSection === "iconography" && <BDSectionIconography />}
          {activeSection === "components" && <BDSectionComponents />}
          {activeSection === "app-surfaces" && <BDSectionAppSurfaces />}
          {activeSection === "imagery" && <BDSectionImagery />}
        </main>
      </div>
    </div>
  );
}
