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
  | "illustrations"
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
    caption: "Identity and visual principles",
  },
  {
    id: "logo",
    number: "02",
    title: "Logo & Usage",
    caption: "Isotype, lockups, clearspace & usage",
  },
  {
    id: "color",
    number: "03",
    title: "Color Palette",
    caption: "Aqua, purple, neutrals & feedback",
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
    id: "illustrations",
    number: "06",
    title: "Illustrations",
    caption: "Flat-vector scenes & characters",
  },
  {
    id: "components",
    number: "07",
    title: "Components & UI",
    caption: "Buttons, cards, inputs, chips",
  },
  {
    id: "app-surfaces",
    number: "08",
    title: "App Surfaces",
    caption: "Key SwitchPay screens",
  },
  {
    id: "imagery",
    number: "09",
    title: "Imagery & Patterns",
    caption: "Gradients, blending, social",
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
    description: "Action, branding, confirmation, wellness.",
    tokens: [
      { key: "primary", label: "Primary", hex: "#15B981", description: "CTAs, links, isotype", textOn: "dark" },
      { key: "primary-hover", label: "Primary Hover", hex: "#0FA571", description: "Hover/pressed state", textOn: "dark" },
      { key: "primary-soft", label: "Primary Soft", hex: "#DCF6E7", description: "Soft backgrounds, chips (light)", textOn: "dark" },
      { key: "primary-foreground", label: "Primary Foreground", hex: "#F4F8F7", description: "Text on bg-primary", textOn: "dark" },
    ],
  },
  {
    id: "accent",
    label: "Accent — Purple",
    description: "Switch, premium, secondary.",
    tokens: [
      { key: "accent", label: "Accent", hex: "#6F4DE8", description: "Tags premium, badges, switch", textOn: "light" },
      { key: "accent-hover", label: "Accent Hover", hex: "#5A3DD1", description: "Hover/pressed accent", textOn: "light" },
      { key: "accent-soft", label: "Accent Soft", hex: "#E8E1FF", description: "Soft backgrounds accent (light)", textOn: "dark" },
      { key: "accent-foreground", label: "Accent Foreground", hex: "#F4F8F7", description: "Text on bg-accent", textOn: "dark" },
    ],
  },
  {
    id: "neutral-light",
    label: "Neutral — Light",
    description: "Surface and text base for light mode.",
    tokens: [
      { key: "neutral", label: "Neutral", hex: "#F4F8F7", description: "Base light background", textOn: "dark" },
      { key: "neutral-off", label: "Neutral Off", hex: "#F4F8F7", description: "Secondary background, lists", textOn: "dark" },
      { key: "neutral-mist", label: "Neutral Mist", hex: "#EDF7F5", description: "Soft banners, tonal sections", textOn: "dark" },
      { key: "neutral-line", label: "Neutral Line", hex: "#D9E8E5", description: "Borders, dividers", textOn: "dark" },
      { key: "neutral-muted", label: "Neutral Muted", hex: "#5C6B70", description: "Secondary text, captions", textOn: "light" },
      { key: "neutral-ink", label: "Neutral Ink", hex: "#102021", description: "Primary text on light", textOn: "light" },
    ],
  },
  {
    id: "neutral-dark",
    label: "Neutral — Dark",
    description: "Surface and text base for dark mode.",
    tokens: [
      { key: "neutral-dark", label: "Neutral Dark", hex: "#09090B", description: "Base dark background", textOn: "light" },
      { key: "neutral-surface-dark", label: "Neutral Surface", hex: "#18181B", description: "Elevated surfaces, cards", textOn: "light" },
      { key: "neutral-card-dark", label: "Neutral Card", hex: "#141416", description: "Cards on surfaces, modals", textOn: "light" },
      { key: "neutral-line-dark", label: "Neutral Line Dark", hex: "#27272A", description: "Borders in dark", textOn: "light" },
      { key: "neutral-muted-dark", label: "Neutral Muted Dark", hex: "#71717A", description: "Secondary text in dark", textOn: "light" },
      { key: "neutral-ink-dark", label: "Neutral Ink Dark", hex: "#F4F8F7", description: "Primary text in dark", textOn: "dark" },
    ],
  },
  {
    id: "feedback",
    label: "Feedback",
    description: "Invariant between light and dark.",
    tokens: [
      { key: "success", label: "Success", hex: "#63D69F", description: "Confirmations, successful transactions", textOn: "dark" },
      { key: "warning", label: "Warning", hex: "#F3C74D", description: "Alerts, limits", textOn: "dark" },
      { key: "error", label: "Error", hex: "#EF5B5B", description: "Errors, critical validations", textOn: "light" },
      { key: "info", label: "Info", hex: "#53C7F0", description: "Tips, neutral messages", textOn: "dark" },
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
  { id: "primary", name: "Plus Jakarta Sans", role: "Primary — UI, headings, branding", weights: [300, 400, 500, 600, 700, 800] },
  { id: "secondary", name: "Inter", role: "Secondary — numbers, dense data", weights: [400, 500, 600, 700] },
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
  { token: "radius-sm", value: "4px", description: "Inner inputs, small chips" },
  { token: "radius-md", value: "8px", description: "Inputs, badges" },
  { token: "radius-lg", value: "12px", description: "Main inputs" },
  { token: "radius-xl", value: "16px", description: "Cards and buttons" },
  { token: "radius-2xl", value: "20px", description: "Main cards" },
  { token: "radius-3xl", value: "28px", description: "Modals, hero cards" },
  { token: "radius-full", value: "9999px", description: "Avatars, chips" },
];

export const BRAND_SHADOWS = [
  { token: "shadow-xs", value: "0 1px 2px rgba(8, 34, 28, 0.04)", description: "Subtle — inputs, hover" },
  { token: "shadow-sm", value: "0 2px 6px rgba(8, 34, 28, 0.06)", description: "List cards" },
  { token: "shadow-md", value: "0 6px 18px rgba(8, 34, 28, 0.08)", description: "Elevated cards, popovers" },
  { token: "shadow-lg", value: "0 16px 32px rgba(8, 34, 28, 0.12)", description: "Modals, hero cards" },
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
