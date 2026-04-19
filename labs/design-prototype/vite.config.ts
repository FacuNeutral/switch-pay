import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import screenshotsPlugin from "./vite-plugin-screenshots";
import designTokensPlugin from "./vite-plugin-design-tokens";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), screenshotsPlugin(), designTokensPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
