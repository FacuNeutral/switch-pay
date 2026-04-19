//* @type Utility
//* @context Pages Explorer
//* @utility Captura screenshots de cada ruta usando html-to-image, los persiste en disco via Vite plugin.

import { toPng } from "html-to-image";
import { ROUTE_MAP } from "../store/pages-explorer.mock";
import { usePagesExplorerStore } from "../store/pages-explorer.slice";

const CAPTURE_WIDTH = 1280;
const CAPTURE_HEIGHT = 800;
const CAPTURE_DELAY = 1500;

/**
 * Carga screenshots guardados en disco (via Vite plugin).
 * Retorna true si encontró al menos uno.
 */
export async function loadSavedScreenshots(): Promise<boolean> {
  try {
    const res = await fetch("/__screenshots");
    if (!res.ok) return false;
    const saved: Record<string, string> = await res.json();
    const entries = Object.entries(saved);
    if (entries.length === 0) return false;

    for (const [route, dataUrl] of entries) {
      usePagesExplorerStore.getState().setScreenshot(route, dataUrl);
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Guarda un screenshot en disco via Vite plugin.
 */
async function saveScreenshot(route: string, dataUrl: string): Promise<void> {
  try {
    await fetch("/__screenshots/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ route, dataUrl }),
    });
  } catch {
    // Silencioso — el screenshot queda solo en memoria
  }
}

/**
 * Captura un screenshot de una ruta específica usando un iframe oculto.
 * Retorna un data URL (png base64).
 */
async function captureRoute(route: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.left = "-99999px";
    iframe.style.top = "0";
    iframe.style.width = `${CAPTURE_WIDTH}px`;
    iframe.style.height = `${CAPTURE_HEIGHT}px`;
    iframe.style.border = "none";
    iframe.style.opacity = "0";
    iframe.style.pointerEvents = "none";
    iframe.src = route;

    document.body.appendChild(iframe);

    iframe.onload = () => {
      setTimeout(async () => {
        try {
          const doc = iframe.contentDocument;
          if (!doc?.body) throw new Error("Cannot access iframe body");

          const dataUrl = await toPng(doc.body, {
            width: CAPTURE_WIDTH,
            height: CAPTURE_HEIGHT,
            cacheBust: true,
            skipFonts: true,
            fontEmbedCSS: "",
            style: {
              overflow: "hidden",
            },
          });

          resolve(dataUrl);
        } catch (err) {
          reject(err);
        } finally {
          document.body.removeChild(iframe);
        }
      }, CAPTURE_DELAY);
    };

    iframe.onerror = () => {
      document.body.removeChild(iframe);
      reject(new Error(`Failed to load route: ${route}`));
    };
  });
}

/**
 * Captura screenshots de todas las rutas del ROUTE_MAP.
 * Actualiza el store y guarda en disco conforme cada captura termina.
 */
export async function captureAllScreenshots(): Promise<void> {
  for (const entry of ROUTE_MAP) {
    const route = entry.navigateTo;
    usePagesExplorerStore.getState().addCapturingRoute(route);

    try {
      const dataUrl = await captureRoute(route);
      usePagesExplorerStore.getState().setScreenshot(route, dataUrl);
      await saveScreenshot(route, dataUrl);
    } catch {
      // Si falla, dejamos sin screenshot (se mostrará placeholder)
    } finally {
      usePagesExplorerStore.getState().removeCapturingRoute(route);
    }
  }
}

/**
 * Recaptura un screenshot individual para una ruta específica.
 */
export async function recaptureScreenshot(route: string): Promise<void> {
  usePagesExplorerStore.getState().addCapturingRoute(route);
  try {
    const dataUrl = await captureRoute(route);
    usePagesExplorerStore.getState().setScreenshot(route, dataUrl);
    await saveScreenshot(route, dataUrl);
  } catch {
    // Si falla, dejamos sin screenshot
  } finally {
    usePagesExplorerStore.getState().removeCapturingRoute(route);
  }
}

/**
 * Limpia todos los screenshots y los recaptura.
 */
export async function refreshAllScreenshots(): Promise<void> {
  usePagesExplorerStore.getState().clearScreenshots();
  await captureAllScreenshots();
}
