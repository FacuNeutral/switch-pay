//* @type Vite Plugin
//* @context Pages Explorer
//* @utility Plugin de Vite que expone endpoints dev para guardar y cargar screenshots de páginas.

import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

const SCREENSHOTS_DIR = path.resolve(
  __dirname,
  "src/devtools/pages-explorer/screenshots"
);

function sanitizeName(route: string): string {
  const slug = route
    .replace(/^\//, "")
    .replace(/[/:?&=]/g, "-")
    .replace(/-+/g, "-")
    .replace(/-$/, "")
    || "home";
  return `${slug}.page`;
}

export default function screenshotsPlugin(): Plugin {
  return {
    name: "pages-explorer-screenshots",
    configureServer(server) {
      // GET /__screenshots — lista los screenshots existentes como { route: dataUrl }
      server.middlewares.use("/__screenshots", (req, res, next) => {
        if (req.method === "GET" && (req.url === "/" || req.url === "")) {
          if (!fs.existsSync(SCREENSHOTS_DIR)) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({}));
            return;
          }

          const files = fs.readdirSync(SCREENSHOTS_DIR).filter((f) => f.endsWith(".png"));
          const manifest: Record<string, string> = {};

          // Leer el manifest.json que mapea route -> filename
          const manifestPath = path.join(SCREENSHOTS_DIR, "manifest.json");
          if (fs.existsSync(manifestPath)) {
            try {
              const raw = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
              for (const [route, filename] of Object.entries(raw)) {
                const filePath = path.join(SCREENSHOTS_DIR, filename as string);
                if (fs.existsSync(filePath)) {
                  const buf = fs.readFileSync(filePath);
                  manifest[route] = `data:image/png;base64,${buf.toString("base64")}`;
                }
              }
            } catch {
              // manifest corrupto, ignorar
            }
          }

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(manifest));
          return;
        }

        next();
      });

      // POST /__screenshots/save — guarda un screenshot { route, dataUrl }
      server.middlewares.use("/__screenshots/save", (req, res, next) => {
        if (req.method !== "POST") return next();

        let body = "";
        req.on("data", (chunk) => { body += chunk; });
        req.on("end", () => {
          try {
            const { route, dataUrl } = JSON.parse(body);
            if (!route || !dataUrl) {
              res.writeHead(400, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "Missing route or dataUrl" }));
              return;
            }

            if (!fs.existsSync(SCREENSHOTS_DIR)) {
              fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
            }

            const filename = `${sanitizeName(route)}.png`;
            const filePath = path.join(SCREENSHOTS_DIR, filename);

            // Extraer base64 del data URL
            const base64 = dataUrl.replace(/^data:image\/png;base64,/, "");
            fs.writeFileSync(filePath, Buffer.from(base64, "base64"));

            // Actualizar manifest
            const manifestPath = path.join(SCREENSHOTS_DIR, "manifest.json");
            let manifest: Record<string, string> = {};
            if (fs.existsSync(manifestPath)) {
              try {
                manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
              } catch {
                // reset si está corrupto
              }
            }
            manifest[route] = filename;
            fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ ok: true, filename }));
          } catch {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Failed to save screenshot" }));
          }
        });
      });
    },
  };
}
