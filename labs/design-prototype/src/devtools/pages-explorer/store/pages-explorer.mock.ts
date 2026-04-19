//* @type Mock
//* @context Pages Explore
//* @utility Datos, constantes y tipos para el panel de pages-explorer.

import homeDoc from "@/devtools/pages-explorer/docs/pages/home.json";
import searchDoc from "@/devtools/pages-explorer/docs/pages/search.json";
import watchDoc from "@/devtools/pages-explorer/docs/pages/watch.json";
import shortsDoc from "@/devtools/pages-explorer/docs/pages/shorts.json";
import loginDoc from "@/devtools/pages-explorer/docs/pages/login.json";
import registerDoc from "@/devtools/pages-explorer/docs/pages/register.json";
import notFoundDoc from "@/devtools/pages-explorer/docs/pages/not-found.json";

/* ==========================================
   Types
   ========================================== */

export interface PageSection {
  name: string;
  component: string;
  path: string | null;
  description: string;
}

export interface PageParam {
  name: string;
  type: string;
  example: string;
  description: string;
}

export interface PageDoc {
  id: string;
  title: string;
  route: string;
  layout: string;
  description: string;
  params: PageParam[];
  queryParams: PageParam[];
  sections: PageSection[];
  stores: string[];
  processes: string[];
}

/* ==========================================
   Viewport Presets
   ========================================== */

export type ViewportMode = "responsive" | "mobile" | "tablet" | "desktop" | "custom";

export interface ViewportPreset {
  label: string;
  width: number;
  height: number;
  icon: ViewportMode;
}

export const VIEWPORT_PRESETS: ViewportPreset[] = [
  { label: "iPhone SE", width: 375, height: 667, icon: "mobile" },
  { label: "iPhone 14 Pro", width: 393, height: 852, icon: "mobile" },
  { label: "Samsung Galaxy S21", width: 360, height: 800, icon: "mobile" },
  { label: "iPad Mini", width: 768, height: 1024, icon: "tablet" },
  { label: "iPad Pro 11\"", width: 834, height: 1194, icon: "tablet" },
  { label: "iPad Pro 12.9\"", width: 1024, height: 1366, icon: "tablet" },
  { label: "Laptop", width: 1366, height: 768, icon: "desktop" },
  { label: "Desktop HD", width: 1920, height: 1080, icon: "desktop" },
  { label: "Desktop 2K", width: 2560, height: 1440, icon: "desktop" },
];

export const VIEWPORT_MODE_WIDTHS: Record<Exclude<ViewportMode, "responsive" | "custom">, number> = {
  mobile: 375,
  tablet: 768,
  desktop: 1280,
};

/* ==========================================
   Detail Panel Tabs
   ========================================== */

export type DetailTab = "description" | "structure";

/* ==========================================
   Page Docs Registry
   ========================================== */

export const PAGE_DOCS: PageDoc[] = [
  homeDoc,
  searchDoc,
  watchDoc,
  shortsDoc,
  loginDoc,
  registerDoc,
  notFoundDoc,
] as PageDoc[];

/* ==========================================
   Route Map (for navigation with examples)
   ========================================== */

export interface RouteEntry {
  path: string;
  label: string;
  navigateTo: string;
  nested: boolean;
  layout: string;
}

export const ROUTE_MAP: RouteEntry[] = [
  { path: "/", label: "Home", navigateTo: "/", nested: false, layout: "MainLayout" },
  { path: "/shorts", label: "Shorts", navigateTo: "/shorts", nested: false, layout: "MainLayout" },
  { path: "/watch/:id", label: "Watch", navigateTo: "/watch/video-1", nested: true, layout: "MainLayout" },
  { path: "/search?q=", label: "Search", navigateTo: "/search?q=music", nested: false, layout: "MainLayout" },
  { path: "/login", label: "Login", navigateTo: "/login", nested: false, layout: "standalone" },
  { path: "/register", label: "Register", navigateTo: "/register", nested: false, layout: "standalone" },
  { path: "*", label: "404", navigateTo: "/this-does-not-exist", nested: false, layout: "standalone" },
];
