//* @type Mock
//* @context Brand Design
//* @utility Datos hardcodeados del manual de marca SwitchPay: tokens, paleta, tipografia, iconos y secciones.

/* ==========================================
   Section IDs
   ========================================== */
export type BrandSection =
  | "cover"
  | "logo"
  | "color"
  | "typography"
  | "iconography"
  | "components"
  | "app-surfaces"
  | "imagery";

export interface BrandSectionMeta {
  id: BrandSection;
  number: string;
  title: string;
  caption: string;
}

export const BRAND_SECTIONS: BrandSectionMeta[] = [
  {
    id: "cover",
    number: "01",
    title: "Brand Foundation",
    caption: "Identidad y principios visuales",
  },
  {
    id: "logo",
    number: "02",
    title: "Logo & Usage",
    caption: "Isotipo, lockups, clearspace y uso",
  },
  {
    id: "color",
    number: "03",
    title: "Color Palette",
    caption: "Aqua, purple, neutrales y feedback",
  },
  {
    id: "typography",
    number: "04",
    title: "Typography",
    caption: "Plus Jakarta Sans + Inter",
  },
  {
    id: "iconography",
    number: "05",
    title: "Iconography",
    caption: "Set lineal, stroke 1.5",
  },
  {
    id: "components",
    number: "06",
    title: "Components & UI",
    caption: "Buttons, cards, inputs, chips",
  },
  {
    id: "app-surfaces",
    number: "07",
    title: "App Surfaces",
    caption: "Pantallas clave de SwitchPay",
  },
  {
    id: "imagery",
    number: "08",
    title: "Imagery & Patterns",
    caption: "Gradientes, blending, social",
  },
];

/* ==========================================
   Brand Tokens — hardcoded source of truth
   ========================================== */
export interface BrandColorToken {
  key: string;
  label: string;
  hex: string;
  description: string;
  textOn?: "dark" | "light";
}

export interface BrandColorGroup {
  id: string;
  label: string;
  description: string;
  tokens: BrandColorToken[];
}

export const BRAND_COLOR_GROUPS: BrandColorGroup[] = [
  {
    id: "primary",
    label: "Primary — Aqua",
    description: "Acción, branding, confirmación, bienestar.",
    tokens: [
      { key: "primary", label: "Primary", hex: "#15B981", description: "CTAs, links, isotipo", textOn: "dark" },
      { key: "primary-hover", label: "Primary Hover", hex: "#0FA571", description: "Estado hover/pressed", textOn: "dark" },
      { key: "primary-soft", label: "Primary Soft", hex: "#DCF6E7", description: "Fondos suaves, chips (light)", textOn: "dark" },
      { key: "primary-foreground", label: "Primary Foreground", hex: "#062014", description: "Texto sobre bg-primary", textOn: "light" },
    ],
  },
  {
    id: "accent",
    label: "Accent — Purple",
    description: "Switch, premium, secundario.",
    tokens: [
      { key: "accent", label: "Accent", hex: "#6F4DE8", description: "Tags premium, badges, switch", textOn: "light" },
      { key: "accent-hover", label: "Accent Hover", hex: "#5A3DD1", description: "Hover/pressed accent", textOn: "light" },
      { key: "accent-soft", label: "Accent Soft", hex: "#E8E1FF", description: "Fondos suaves accent (light)", textOn: "dark" },
      { key: "accent-foreground", label: "Accent Foreground", hex: "#FFFFFF", description: "Texto sobre bg-accent", textOn: "dark" },
    ],
  },
  {
    id: "neutral-light",
    label: "Neutral — Light",
    description: "Base de superficies y texto en light mode.",
    tokens: [
      { key: "neutral", label: "Neutral", hex: "#FFFFFF", description: "Fondo base claro", textOn: "dark" },
      { key: "neutral-off", label: "Neutral Off", hex: "#F4F8F7", description: "Fondo secundario, listas", textOn: "dark" },
      { key: "neutral-mist", label: "Neutral Mist", hex: "#EDF7F5", description: "Banners suaves, secciones tonales", textOn: "dark" },
      { key: "neutral-line", label: "Neutral Line", hex: "#D9E8E5", description: "Bordes, dividers", textOn: "dark" },
      { key: "neutral-muted", label: "Neutral Muted", hex: "#5C6B70", description: "Texto secundario, captions", textOn: "light" },
      { key: "neutral-ink", label: "Neutral Ink", hex: "#102021", description: "Texto principal sobre claro", textOn: "light" },
    ],
  },
  {
    id: "neutral-dark",
    label: "Neutral — Dark",
    description: "Base de superficies y texto en dark mode.",
    tokens: [
      { key: "neutral-dark", label: "Neutral Dark", hex: "#09111F", description: "Fondo base oscuro", textOn: "light" },
      { key: "neutral-surface-dark", label: "Neutral Surface", hex: "#101B2E", description: "Surfaces elevadas, cards", textOn: "light" },
      { key: "neutral-card-dark", label: "Neutral Card", hex: "#17243A", description: "Cards sobre surfaces, modales", textOn: "light" },
      { key: "neutral-line-dark", label: "Neutral Line Dark", hex: "#22324A", description: "Bordes en dark", textOn: "light" },
      { key: "neutral-muted-dark", label: "Neutral Muted Dark", hex: "#9BAEB7", description: "Texto secundario en dark", textOn: "dark" },
      { key: "neutral-ink-dark", label: "Neutral Ink Dark", hex: "#F1FAF8", description: "Texto principal en dark", textOn: "dark" },
    ],
  },
  {
    id: "feedback",
    label: "Feedback",
    description: "Invariantes entre light y dark.",
    tokens: [
      { key: "success", label: "Success", hex: "#63D69F", description: "Confirmaciones, transacciones OK", textOn: "dark" },
      { key: "warning", label: "Warning", hex: "#F3C74D", description: "Avisos, límites", textOn: "dark" },
      { key: "error", label: "Error", hex: "#EF5B5B", description: "Errores, validaciones críticas", textOn: "light" },
      { key: "info", label: "Info", hex: "#53C7F0", description: "Tips, mensajes neutros", textOn: "dark" },
    ],
  },
];

/* ==========================================
   Typography
   ========================================== */
export interface BrandTypeStyle {
  id: string;
  label: string;
  family: "primary" | "secondary";
  size: string;
  weight: string;
  weightLabel: string;
  tracking?: string;
  sample: string;
}

export const BRAND_TYPE_FAMILIES = [
  { id: "primary", name: "Plus Jakarta Sans", role: "Primaria — UI, headings, branding", weights: [300, 400, 500, 600, 700, 800] },
  { id: "secondary", name: "Inter", role: "Secundaria — números, datos densos", weights: [400, 500, 600, 700] },
];

export const BRAND_TYPE_STYLES: BrandTypeStyle[] = [
  { id: "hero", label: "Hero", family: "primary", size: "2.25rem / 36px", weight: "800", weightLabel: "ExtraBold", tracking: "-0.02em", sample: "Your benefits. Your way." },
  { id: "heading-1", label: "Heading 1", family: "primary", size: "1.875rem / 30px", weight: "700", weightLabel: "Bold", sample: "Your Top Picks" },
  { id: "heading-2", label: "Heading 2", family: "primary", size: "1.5rem / 24px", weight: "600", weightLabel: "SemiBold", sample: "Active perks" },
  { id: "subtitle", label: "Subtitle", family: "primary", size: "1.125rem / 18px", weight: "500", weightLabel: "Medium", sample: "Annual benefits balance" },
  { id: "body", label: "Body", family: "primary", size: "1rem / 16px", weight: "400", weightLabel: "Regular", sample: "Choose the benefits that fit your life and your future." },
  { id: "body-secondary", label: "Body Secondary", family: "secondary", size: "0.875rem / 14px", weight: "500", weightLabel: "Medium", sample: "Available · 62% used" },
  { id: "caption", label: "Caption", family: "primary", size: "0.75rem / 12px", weight: "500", weightLabel: "Medium", tracking: "0.06em", sample: "TRUSTED · SECURE · FLEXIBLE" },
  { id: "amount", label: "Amount", family: "secondary", size: "2.25rem / 36px", weight: "700", weightLabel: "Bold", tracking: "-0.01em", sample: "$1,250.00" },
];

/* ==========================================
   Iconography
   ========================================== */
export interface BrandIconGroup {
  id: string;
  label: string;
  icons: { id: string; label: string; icon: string }[];
}

export const BRAND_ICON_GROUPS: BrandIconGroup[] = [
  {
    id: "navigation",
    label: "Navigation",
    icons: [
      { id: "home", label: "Home", icon: "House" },
      { id: "benefits", label: "Benefits", icon: "Gift" },
      { id: "activity", label: "Activity", icon: "ChartBar" },
      { id: "support", label: "Support", icon: "LifeBuoy" },
      { id: "profile", label: "Profile", icon: "UserRound" },
    ],
  },
  {
    id: "categories",
    label: "Categories",
    icons: [
      { id: "health", label: "Health", icon: "HeartPulse" },
      { id: "wellness", label: "Wellness", icon: "Leaf" },
      { id: "financial", label: "Financial", icon: "Wallet" },
      { id: "lifestyle", label: "Lifestyle", icon: "Sparkles" },
      { id: "transport", label: "Transport", icon: "Bus" },
      { id: "food", label: "Food", icon: "UtensilsCrossed" },
    ],
  },
  {
    id: "actions",
    label: "Actions",
    icons: [
      { id: "buy", label: "Buy", icon: "ShoppingBag" },
      { id: "transfer", label: "Transfer", icon: "ArrowLeftRight" },
      { id: "deposit", label: "Deposit", icon: "ArrowDownToLine" },
      { id: "withdraw", label: "Withdraw", icon: "ArrowUpFromLine" },
      { id: "switch", label: "Switch", icon: "Repeat" },
      { id: "pay", label: "Pay", icon: "CreditCard" },
    ],
  },
  {
    id: "status",
    label: "Status",
    icons: [
      { id: "check", label: "Check", icon: "CircleCheck" },
      { id: "alert", label: "Alert", icon: "TriangleAlert" },
      { id: "info", label: "Info", icon: "Info" },
      { id: "close", label: "Close", icon: "CircleX" },
      { id: "lock", label: "Lock", icon: "Lock" },
      { id: "shield", label: "Shield", icon: "ShieldCheck" },
    ],
  },
  {
    id: "utility",
    label: "Utility",
    icons: [
      { id: "search", label: "Search", icon: "Search" },
      { id: "filter", label: "Filter", icon: "SlidersHorizontal" },
      { id: "settings", label: "Settings", icon: "Settings" },
      { id: "bell", label: "Bell", icon: "Bell" },
      { id: "help", label: "Help", icon: "CircleQuestionMark" },
      { id: "more", label: "More", icon: "Ellipsis" },
    ],
  },
];

/* ==========================================
   Spacing & Radius
   ========================================== */
export const BRAND_SPACING = [
  { token: "spacing-xs", value: "4px" },
  { token: "spacing-sm", value: "8px" },
  { token: "spacing-md", value: "12px" },
  { token: "spacing-lg", value: "16px" },
  { token: "spacing-xl", value: "24px" },
  { token: "spacing-2xl", value: "32px" },
  { token: "spacing-3xl", value: "48px" },
];

export const BRAND_RADIUS = [
  { token: "radius-sm", value: "4px", description: "Inputs internos, chips chicos" },
  { token: "radius-md", value: "8px", description: "Inputs, badges" },
  { token: "radius-lg", value: "12px", description: "Inputs principales" },
  { token: "radius-xl", value: "16px", description: "Cards y botones" },
  { token: "radius-2xl", value: "20px", description: "Cards principales" },
  { token: "radius-3xl", value: "28px", description: "Modales, hero cards" },
  { token: "radius-full", value: "9999px", description: "Avatares, chips" },
];

export const BRAND_SHADOWS = [
  { token: "shadow-xs", value: "0 1px 2px rgba(8, 34, 28, 0.04)", description: "Sutil — inputs, hover" },
  { token: "shadow-sm", value: "0 2px 6px rgba(8, 34, 28, 0.06)", description: "Cards de listado" },
  { token: "shadow-md", value: "0 6px 18px rgba(8, 34, 28, 0.08)", description: "Cards elevadas, popovers" },
  { token: "shadow-lg", value: "0 16px 32px rgba(8, 34, 28, 0.12)", description: "Modales, hero cards" },
];

/* ==========================================
   Brand Slogans
   ========================================== */
export const BRAND_SLOGANS = [
  "Your benefits. Your choice. Your way.",
  "Benefits that fit your life.",
  "Simple, secure, flexible.",
  "Choose what matters most.",
];
