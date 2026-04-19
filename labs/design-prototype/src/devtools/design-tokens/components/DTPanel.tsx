//* @type Integration Root
//* @context Design Tokens
//* @utility Panel raíz del design tokens explorer. Overlay completo con navbar y contenido por pestaña.

import { useDesignTokensStore } from "../store/design-tokens.slice";
import DTNavbar from "./DTNavbar";
import DTTokensView from "./DTTokensView";
import DTPreviewLanding from "./DTPreviewLanding";
import DTPreviewRaw from "./DTPreviewRaw";
import DTPalettes from "./DTPalettes";
import DTBackups from "./DTBackups";
import DTColorPicker from "./DTColorPicker";
import DTBackupPrompt from "./DTBackupPrompt";

export default function DTPanel() {
  const isOpen = useDesignTokensStore((s) => s.isOpen);
  const activeTab = useDesignTokensStore((s) => s.activeTab);
  const editingToken = useDesignTokensStore((s) => s.editingToken);
  const pendingPaletteApply = useDesignTokensStore((s) => s.pendingPaletteApply);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9100 flex flex-col bg-debug-surface dark:bg-debug-surface-dark">
      {/* <Tag> Navbar */}
      <DTNavbar />

      {/* <Tag> Content Area */}
      <div className="flex-1 min-h-0 min-w-0 w-full overflow-auto scrollbar-debug">
        {activeTab === "tokens" && <DTTokensView />}
        {activeTab === "preview-landing" && <DTPreviewLanding />}
        {activeTab === "preview-raw" && <DTPreviewRaw />}
        {activeTab === "palettes" && <DTPalettes />}
        {activeTab === "backups" && <DTBackups />}
      </div>

      {/* <Tag> Color Picker Modal */}
      {editingToken?.type === "color" && <DTColorPicker />}

      {/* <Tag> Backup Confirmation Prompt */}
      {pendingPaletteApply && <DTBackupPrompt />}
    </div>
  );
}
