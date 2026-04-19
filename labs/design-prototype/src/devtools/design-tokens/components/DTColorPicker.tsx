//* @type Integration Component
//* @context Design Tokens
//* @utility Modal de color picker estilo Figma con selector de matiz, saturación/brillo y entrada HEX/RGB.

import { useState, useRef, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { useDesignTokensStore } from "../store/design-tokens.slice";

// ==========================================
// Color Conversion Helpers
// ==========================================

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16) || 0;
  const g = parseInt(clean.substring(2, 4), 16) || 0;
  const b = parseInt(clean.substring(4, 6), 16) || 0;
  return [r, g, b];
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((c) => Math.round(c).toString(16).padStart(2, "0")).join("")}`;
}

function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return [h * 360, s * 100, v * 100];
}

function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  h /= 360; s /= 100; v /= 100;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
  let r = 0, g = 0, b = 0;
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// ==========================================
// Color Picker Component
// ==========================================

export default function DTColorPicker() {
  const editingToken = useDesignTokensStore((s) => s.editingToken);
  const updateToken = useDesignTokensStore((s) => s.updateToken);
  const setEditingToken = useDesignTokensStore((s) => s.setEditingToken);

  const currentValue = editingToken?.value || "#000000";
  const [rgb, setRgbState] = useState<[number, number, number]>(hexToRgb(currentValue));
  const [hsv, setHsvState] = useState<[number, number, number]>(rgbToHsv(...hexToRgb(currentValue)));
  const [hexInput, setHexInput] = useState(currentValue.replace("#", ""));

  const svCanvasRef = useRef<HTMLCanvasElement>(null);
  const hueCanvasRef = useRef<HTMLCanvasElement>(null);
  const draggingSV = useRef(false);
  const draggingHue = useRef(false);
  const lastSyncedKey = useRef<string | null>(null);

  // Sync when editingToken changes (adjust state during render — React recommended pattern)
  const editingKey = editingToken?.key ?? null;
  if (editingKey !== lastSyncedKey.current) {
    lastSyncedKey.current = editingKey;
    if (editingToken) {
      const r = hexToRgb(editingToken.value);
      const h = rgbToHsv(...r);
      setRgbState(r);
      setHsvState(h);
      setHexInput(editingToken.value.replace("#", ""));
    }
  }

  // Extract individual HSV values for stable dependency arrays
  const hue = hsv[0];
  const sat = hsv[1];
  const val = hsv[2];

  const setColorFromHsv = useCallback((h: number, s: number, v: number) => {
    const newRgb = hsvToRgb(h, s, v);
    setHsvState([h, s, v]);
    setRgbState(newRgb);
    const hex = rgbToHex(...newRgb);
    setHexInput(hex.replace("#", ""));
    if (editingToken) updateToken(editingToken.key, hex);
  }, [editingToken, updateToken]);

  // ==========================================
  // SV Canvas (Saturation/Value)
  // ==========================================

  const drawSVCanvas = useCallback(() => {
    const canvas = svCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width, h = canvas.height;

    // Base hue
    const hueRgb = hsvToRgb(hue, 100, 100);
    ctx.fillStyle = `rgb(${hueRgb[0]},${hueRgb[1]},${hueRgb[2]})`;
    ctx.fillRect(0, 0, w, h);

    // White gradient (left to right)
    const white = ctx.createLinearGradient(0, 0, w, 0);
    white.addColorStop(0, "rgba(255,255,255,1)");
    white.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = white;
    ctx.fillRect(0, 0, w, h);

    // Black gradient (top to bottom)
    const black = ctx.createLinearGradient(0, 0, 0, h);
    black.addColorStop(0, "rgba(0,0,0,0)");
    black.addColorStop(1, "rgba(0,0,0,1)");
    ctx.fillStyle = black;
    ctx.fillRect(0, 0, w, h);
  }, [hue]);

  useEffect(() => { drawSVCanvas(); }, [drawSVCanvas]);

  // ==========================================
  // Hue Canvas
  // ==========================================

  const drawHueCanvas = useCallback(() => {
    const canvas = hueCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const grad = ctx.createLinearGradient(0, 0, w, 0);
    for (let i = 0; i <= 360; i += 30) {
      const [r, g, b] = hsvToRgb(i, 100, 100);
      grad.addColorStop(i / 360, `rgb(${r},${g},${b})`);
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, canvas.height);
  }, []);

  useEffect(() => { drawHueCanvas(); }, [drawHueCanvas]);

  // ==========================================
  // SV Drag Handlers
  // ==========================================

  const handleSVMove = useCallback((e: React.MouseEvent<HTMLCanvasElement> | MouseEvent) => {
    const canvas = svCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, (e as MouseEvent).clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, (e as MouseEvent).clientY - rect.top));
    const s = (x / rect.width) * 100;
    const v = (1 - y / rect.height) * 100;
    setColorFromHsv(hue, s, v);
  }, [hue, setColorFromHsv]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => { if (draggingSV.current) handleSVMove(e); };
    const handleUp = () => { draggingSV.current = false; };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => { window.removeEventListener("mousemove", handleMove); window.removeEventListener("mouseup", handleUp); };
  }, [handleSVMove]);

  // ==========================================
  // Hue Drag Handlers
  // ==========================================

  const handleHueMove = useCallback((e: React.MouseEvent<HTMLCanvasElement> | MouseEvent) => {
    const canvas = hueCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, (e as MouseEvent).clientX - rect.left));
    const h = (x / rect.width) * 360;
    setColorFromHsv(h, sat, val);
  }, [sat, val, setColorFromHsv]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => { if (draggingHue.current) handleHueMove(e); };
    const handleUp = () => { draggingHue.current = false; };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => { window.removeEventListener("mousemove", handleMove); window.removeEventListener("mouseup", handleUp); };
  }, [handleHueMove]);

  // ==========================================
  // HEX/RGB Input Handlers
  // ==========================================

  const handleHexCommit = () => {
    const clean = hexInput.replace(/[^a-fA-F0-9]/g, "").slice(0, 6);
    if (clean.length === 6) {
      const newRgb = hexToRgb(clean);
      const newHsv = rgbToHsv(...newRgb);
      setRgbState(newRgb);
      setHsvState(newHsv);
      setHexInput(clean);
      if (editingToken) updateToken(editingToken.key, `#${clean}`);
    }
  };

  const handleRgbChange = (channel: 0 | 1 | 2, val: string) => {
    const num = Math.max(0, Math.min(255, parseInt(val) || 0));
    const newRgb: [number, number, number] = [...rgb];
    newRgb[channel] = num;
    const newHsv = rgbToHsv(...newRgb);
    setRgbState(newRgb);
    setHsvState(newHsv);
    const hex = rgbToHex(...newRgb);
    setHexInput(hex.replace("#", ""));
    if (editingToken) updateToken(editingToken.key, hex);
  };

  if (!editingToken) return null;

  const svPointerX = (hsv[1] / 100);
  const svPointerY = (1 - hsv[2] / 100);
  const huePointerX = hsv[0] / 360;

  return (
    <div className="fixed inset-0 z-9300 flex items-center justify-center">
      {/* <Tag> Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setEditingToken(null)} />

      {/* <Tag> Modal */}
      <div className="relative w-105 bg-debug-surface dark:bg-debug-surface-dark border border-debug-border dark:border-debug-border-dark rounded-(--radius-debug-panel) shadow-2xl shadow-black/40 overflow-hidden">
        {/* <Tag> Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-debug-border dark:border-debug-border-dark">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-(--radius-debug-tab) border border-debug-border dark:border-debug-border-dark shadow-sm"
              style={{ backgroundColor: `#${hexInput}` }}
            />
            <div>
              <span className="text-sm font-semibold text-debug-text dark:text-debug-text-dark block">
                {editingToken.label}
              </span>
              <span className="text-[10px] font-mono text-debug-text-muted dark:text-debug-text-muted-dark">
                {editingToken.key}
              </span>
            </div>
          </div>
          <button
            onClick={() => setEditingToken(null)}
            className="p-1.5 rounded-(--radius-debug-tab) text-debug-text-muted dark:text-debug-text-muted-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark transition-colors duration-150"
          >
            <X size={14} />
          </button>
        </div>

        {/* <Tag> SV Canvas */}
        <div className="relative mx-4 mt-4 rounded-(--radius-debug-tab) overflow-hidden cursor-crosshair" style={{ height: 200 }}>
          <canvas
            ref={svCanvasRef}
            width={380}
            height={200}
            className="w-full h-full block"
            onMouseDown={(e) => { draggingSV.current = true; handleSVMove(e); }}
          />
          {/* Pointer */}
          <div
            className="absolute w-4 h-4 rounded-full border-2 border-white shadow-md pointer-events-none -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${svPointerX * 100}%`, top: `${svPointerY * 100}%`, backgroundColor: `#${hexInput}` }}
          />
        </div>

        {/* <Tag> Hue Slider */}
        <div className="relative mx-4 mt-3 rounded-full overflow-hidden cursor-pointer" style={{ height: 16 }}>
          <canvas
            ref={hueCanvasRef}
            width={380}
            height={16}
            className="w-full h-full block rounded-full"
            onMouseDown={(e) => { draggingHue.current = true; handleHueMove(e); }}
          />
          {/* Pointer */}
          <div
            className="absolute top-1/2 w-4 h-4 rounded-full border-2 border-white shadow-md pointer-events-none -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${huePointerX * 100}%`, backgroundColor: `hsl(${hsv[0]}, 100%, 50%)` }}
          />
        </div>

        {/* <Tag> HEX & RGB Inputs */}
        <div className="px-4 py-4 space-y-3">
          {/* HEX */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-debug-text-muted dark:text-debug-text-muted-dark w-8">
              HEX
            </span>
            <div className="flex items-center gap-1.5 flex-1">
              <span className="text-xs text-debug-text-muted dark:text-debug-text-muted-dark">#</span>
              <input
                value={hexInput}
                onChange={(e) => setHexInput(e.target.value)}
                onBlur={handleHexCommit}
                onKeyDown={(e) => e.key === "Enter" && handleHexCommit()}
                maxLength={6}
                className="flex-1 px-2 py-1 rounded-(--radius-debug-tab) text-xs font-mono bg-debug-surface-overlay dark:bg-debug-surface-overlay-dark text-debug-text dark:text-debug-text-dark border border-debug-border dark:border-debug-border-dark outline-none focus:border-debug-primary transition-colors"
              />
              <div
                className="w-8 h-8 rounded-(--radius-debug-tab) border border-debug-border dark:border-debug-border-dark shrink-0"
                style={{ backgroundColor: `#${hexInput}` }}
              />
            </div>
          </div>

          {/* RGB */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-debug-text-muted dark:text-debug-text-muted-dark w-8">
              RGB
            </span>
            <div className="flex gap-2 flex-1">
              {(["R", "G", "B"] as const).map((ch, i) => (
                <div key={ch} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] font-semibold text-debug-text-muted dark:text-debug-text-muted-dark">
                    {ch}
                  </span>
                  <input
                    type="number"
                    min={0}
                    max={255}
                    value={rgb[i as 0 | 1 | 2]}
                    onChange={(e) => handleRgbChange(i as 0 | 1 | 2, e.target.value)}
                    className="w-full px-2 py-1.5 rounded-(--radius-debug-tab) text-xs font-mono text-center bg-debug-surface-overlay dark:bg-debug-surface-overlay-dark text-debug-text dark:text-debug-text-dark border border-debug-border dark:border-debug-border-dark outline-none focus:border-debug-primary transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* <Tag> Apply Button */}
        <div className="px-4 pb-4">
          <button
            onClick={() => setEditingToken(null)}
            className="w-full py-2.5 rounded-(--radius-debug-button) text-sm font-semibold bg-debug-primary text-debug-primary-foreground hover:bg-debug-primary-hover transition-colors duration-150"
          >
            Apply Color
          </button>
        </div>
      </div>
    </div>
  );
}
