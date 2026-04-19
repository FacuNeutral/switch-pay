//* @type Mock
//* @context Design Tokens
//* @utility Modelo de datos, categorías, tipos de token y helpers para el store de design tokens.

// ==========================================
// Token Types
// ==========================================

export type TokenType = "color" | "dimension" | "font-family" | "font-weight" | "shadow" | "blur" | "opacity" | "z-index" | "duration" | "easing" | "aspect-ratio" | "animation";

export interface DesignToken {
  key: string;
  value: string;
  type: TokenType;
  category: string;
  subcategory: string;
  label: string;
}

export interface TokenCategory {
  id: string;
  label: string;
  subcategories: TokenSubcategory[];
}

export interface TokenSubcategory {
  id: string;
  label: string;
}

export interface Palette {
  id: string;
  name: string;
  description: string;
  orientation: string;
  author: string;
  createdAt: string;
  tokens: Record<string, string>;
  /** Reference-only tokens for LLM guidance — not applied directly */
  referenceTokens?: Record<string, string>;
}

export interface Backup {
  id: string;
  label: string;
  reason: string;
  createdAt: string;
  tokens: Record<string, string>;
}

export type DesignTokensTab = "tokens" | "preview-landing" | "preview-raw" | "palettes" | "backups";

// ==========================================
// Token Categories Definition
// ==========================================

export const TOKEN_CATEGORIES: TokenCategory[] = [
  {
    id: "color",
    label: "Colors",
    subcategories: [
      { id: "neutral", label: "Neutral" },
      { id: "primary", label: "Primary" },
      { id: "accent", label: "Accent" },
      { id: "secondary", label: "Secondary" },
      { id: "tertiary", label: "Tertiary" },
      { id: "feedback", label: "Feedback" },
    ],
  },
  {
    id: "spacing",
    label: "Spacing",
    subcategories: [{ id: "spacing", label: "Scale" }],
  },
  {
    id: "breakpoint",
    label: "Breakpoints",
    subcategories: [{ id: "breakpoint", label: "Viewports" }],
  },
  {
    id: "aspect-ratio",
    label: "Aspect Ratios",
    subcategories: [{ id: "aspect-ratio", label: "Ratios" }],
  },
  {
    id: "radius",
    label: "Border Radius",
    subcategories: [{ id: "radius", label: "Scale" }],
  },
  {
    id: "typography",
    label: "Typography",
    subcategories: [
      { id: "font-family", label: "Families" },
      { id: "font-size", label: "Sizes" },
      { id: "font-weight", label: "Weights" },
      { id: "leading", label: "Line Heights" },
    ],
  },
  {
    id: "elevation",
    label: "Elevation",
    subcategories: [{ id: "shadow", label: "Shadows" }],
  },
  {
    id: "blur",
    label: "Blur",
    subcategories: [{ id: "blur", label: "Scale" }],
  },
  {
    id: "opacity",
    label: "Opacity",
    subcategories: [{ id: "opacity", label: "Levels" }],
  },
  {
    id: "z-index",
    label: "Z-Index",
    subcategories: [{ id: "z-index", label: "Layers" }],
  },
  {
    id: "motion",
    label: "Motion",
    subcategories: [
      { id: "ease", label: "Easing" },
      { id: "animation", label: "Animations" },
    ],
  },
];

// ==========================================
// Token Classification Logic
// ==========================================

//* Clasifica un token CSS custom property en su tipo, categoría y subcategoría
export function classifyToken(key: string, value: string): { type: TokenType; category: string; subcategory: string; label: string } {
  const name = key.replace(/^--/, "");

  // Colors
  if (name.startsWith("color-")) {
    const rest = name.replace("color-", "");
    let subcategory = "neutral";
    if (rest.startsWith("primary")) subcategory = "primary";
    else if (rest.startsWith("accent")) subcategory = "accent";
    else if (rest.startsWith("secondary")) subcategory = "secondary";
    else if (rest.startsWith("tertiary")) subcategory = "tertiary";
    else if (["info", "warning", "success", "error"].some((f) => rest.startsWith(f))) subcategory = "feedback";
    else subcategory = "neutral";
    return { type: "color", category: "color", subcategory, label: formatLabel(rest) };
  }

  // Spacing
  if (name.startsWith("spacing-")) {
    return { type: "dimension", category: "spacing", subcategory: "spacing", label: formatLabel(name.replace("spacing-", "")) };
  }

  // Breakpoints
  if (name.startsWith("breakpoint-")) {
    return { type: "dimension", category: "breakpoint", subcategory: "breakpoint", label: formatLabel(name.replace("breakpoint-", "")) };
  }

  // Aspect Ratios
  if (name.startsWith("aspect-")) {
    return { type: "aspect-ratio", category: "aspect-ratio", subcategory: "aspect-ratio", label: formatLabel(name.replace("aspect-", "")) };
  }

  // Border Radius
  if (name.startsWith("radius-")) {
    return { type: "dimension", category: "radius", subcategory: "radius", label: formatLabel(name.replace("radius-", "")) };
  }

  // Font families
  if (name.startsWith("font-") && (value.includes("sans-serif") || value.includes("serif") || value.includes("mono"))) {
    return { type: "font-family", category: "typography", subcategory: "font-family", label: formatLabel(name.replace("font-", "")) };
  }

  // Font weights
  if (name.startsWith("font-weight-")) {
    return { type: "font-weight", category: "typography", subcategory: "font-weight", label: formatLabel(name.replace("font-weight-", "")) };
  }

  // Text sizes
  if (name.startsWith("text-")) {
    return { type: "dimension", category: "typography", subcategory: "font-size", label: formatLabel(name.replace("text-", "")) };
  }

  // Line height
  if (name.startsWith("leading-")) {
    return { type: "dimension", category: "typography", subcategory: "leading", label: formatLabel(name.replace("leading-", "")) };
  }

  // Shadows
  if (name.startsWith("shadow-")) {
    return { type: "shadow", category: "elevation", subcategory: "shadow", label: formatLabel(name.replace("shadow-", "")) };
  }

  // Blur
  if (name.startsWith("blur-")) {
    return { type: "blur", category: "blur", subcategory: "blur", label: formatLabel(name.replace("blur-", "")) };
  }

  // Opacity
  if (name.startsWith("opacity-")) {
    return { type: "opacity", category: "opacity", subcategory: "opacity", label: formatLabel(name.replace("opacity-", "")) };
  }

  // Z-Index
  if (name.startsWith("z-")) {
    return { type: "z-index", category: "z-index", subcategory: "z-index", label: formatLabel(name.replace("z-", "")) };
  }

  // Easing
  if (name.startsWith("ease-")) {
    return { type: "easing", category: "motion", subcategory: "ease", label: formatLabel(name.replace("ease-", "")) };
  }

  // Animations
  if (name.startsWith("animate-")) {
    return { type: "animation", category: "motion", subcategory: "animation", label: formatLabel(name.replace("animate-", "")) };
  }

  // Fallback
  return { type: "dimension", category: "misc", subcategory: "misc", label: formatLabel(name) };
}

//* Convierte kebab-case a un label legible
function formatLabel(str: string): string {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

//* Parsea los tokens raw (Record<string, string>) a un array estructurado de DesignToken
export function parseRawTokens(raw: Record<string, string>): DesignToken[] {
  return Object.entries(raw)
    .filter(([key]) => !key.startsWith("--color-debug") && !key.startsWith("--z-debug") && !key.startsWith("--radius-debug") && !key.startsWith("--font-debug"))
    .map(([key, value]) => {
      const { type, category, subcategory, label } = classifyToken(key, value);
      return { key, value, type, category, subcategory, label };
    });
}

//* Agrupa tokens por categoría y subcategoría
export function groupTokens(tokens: DesignToken[]): Map<string, Map<string, DesignToken[]>> {
  const grouped = new Map<string, Map<string, DesignToken[]>>();
  for (const token of tokens) {
    if (!grouped.has(token.category)) grouped.set(token.category, new Map());
    const subMap = grouped.get(token.category)!;
    if (!subMap.has(token.subcategory)) subMap.set(token.subcategory, []);
    subMap.get(token.subcategory)!.push(token);
  }
  return grouped;
}

// ==========================================
// API Helpers
// ==========================================

export async function fetchTokens(): Promise<Record<string, string>> {
  const res = await fetch("/__design-tokens");
  return res.json();
}

export async function saveTokens(updates: Record<string, string>): Promise<void> {
  await fetch("/__design-tokens/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
}

export async function fetchPalettes(): Promise<Palette[]> {
  const res = await fetch("/__design-tokens/palettes");
  return res.json();
}

export async function savePalette(palette: Palette): Promise<void> {
  await fetch("/__design-tokens/palettes/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(palette),
  });
}

export async function deletePalette(id: string): Promise<void> {
  await fetch("/__design-tokens/palettes/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
}

// ==========================================
// Backup API Helpers
// ==========================================

export async function fetchBackups(): Promise<Backup[]> {
  const res = await fetch("/__design-tokens/backups");
  return res.json();
}

export async function saveBackup(backup: Backup): Promise<void> {
  await fetch("/__design-tokens/backups/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(backup),
  });
}

export async function deleteBackup(id: string): Promise<void> {
  await fetch("/__design-tokens/backups/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
}
