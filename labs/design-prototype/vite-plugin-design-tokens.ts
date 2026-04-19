//* @type Vite Plugin
//* @context Design Tokens
//* @utility Plugin de Vite que expone endpoints dev para leer y escribir design tokens en constants.css y gestionar paletas JSON.

import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

const CONSTANTS_PATH = path.resolve(__dirname, "src/styles/constants.css");
const PALETTES_DIR = path.resolve(__dirname, "src/devtools/design-tokens/palettes");
const BACKUPS_DIR = path.resolve(__dirname, "src/devtools/design-tokens/backups");

/** Parse the @theme inline block from constants.css into a flat key→value map */
function parseTokens(css: string): Record<string, string> {
  const tokens: Record<string, string> = {};
  const themeMatch = css.match(/@theme\s+inline\s*\{([\s\S]*?)\n\}/);
  if (!themeMatch) return tokens;

  const body = themeMatch[1];
  const propRegex = /--([\w-]+)\s*:\s*([^;]+);/g;
  let match: RegExpExecArray | null;
  while ((match = propRegex.exec(body)) !== null) {
    tokens[`--${match[1]}`] = match[2].trim();
  }
  return tokens;
}

/** Write updated tokens back to constants.css, replacing values in-place */
function writeTokens(updates: Record<string, string>): void {
  let css = fs.readFileSync(CONSTANTS_PATH, "utf-8");
  for (const [key, value] of Object.entries(updates)) {
    const propName = key.replace(/^--/, "");
    const regex = new RegExp(`(--${escapeRegex(propName)}\\s*:\\s*)([^;]+)(;)`, "g");
    css = css.replace(regex, `$1${value}$3`);
  }
  fs.writeFileSync(CONSTANTS_PATH, css, "utf-8");
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function designTokensPlugin(): Plugin {
  return {
    name: "design-tokens-api",
    configureServer(server) {
      //* GET /__design-tokens — read all tokens from constants.css
      server.middlewares.use("/__design-tokens", (req, res, next) => {
        if (req.method === "GET" && (req.url === "/" || req.url === "")) {
          try {
            const css = fs.readFileSync(CONSTANTS_PATH, "utf-8");
            const tokens = parseTokens(css);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(tokens));
          } catch (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: String(err) }));
          }
          return;
        }
        next();
      });

      //* POST /__design-tokens/save — write updated tokens to constants.css
      server.middlewares.use("/__design-tokens/save", (req, res, next) => {
        if (req.method !== "POST") return next();
        let body = "";
        req.on("data", (chunk) => { body += chunk; });
        req.on("end", () => {
          try {
            const updates: Record<string, string> = JSON.parse(body);
            if (!updates || typeof updates !== "object") {
              res.writeHead(400, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "Invalid payload" }));
              return;
            }
            writeTokens(updates);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ ok: true }));
          } catch (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: String(err) }));
          }
        });
      });

      //* GET /__design-tokens/palettes — list all saved palettes
      server.middlewares.use("/__design-tokens/palettes", (req, res, next) => {
        if (req.method === "GET" && (req.url === "/" || req.url === "")) {
          try {
            if (!fs.existsSync(PALETTES_DIR)) {
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify([]));
              return;
            }
            const files = fs.readdirSync(PALETTES_DIR).filter((f) => f.endsWith(".json"));
            const palettes = files.map((f) => {
              const raw = fs.readFileSync(path.join(PALETTES_DIR, f), "utf-8");
              return JSON.parse(raw);
            });
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(palettes));
          } catch (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: String(err) }));
          }
          return;
        }
        next();
      });

      //* POST /__design-tokens/palettes/save — save a palette JSON
      server.middlewares.use("/__design-tokens/palettes/save", (req, res, next) => {
        if (req.method !== "POST") return next();
        let body = "";
        req.on("data", (chunk) => { body += chunk; });
        req.on("end", () => {
          try {
            const palette = JSON.parse(body);
            if (!palette?.id || !palette?.name) {
              res.writeHead(400, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "Missing id or name" }));
              return;
            }
            if (!fs.existsSync(PALETTES_DIR)) {
              fs.mkdirSync(PALETTES_DIR, { recursive: true });
            }
            const filename = `${palette.id}.json`;
            fs.writeFileSync(path.join(PALETTES_DIR, filename), JSON.stringify(palette, null, 2), "utf-8");
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ ok: true }));
          } catch (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: String(err) }));
          }
        });
      });

      //* DELETE /__design-tokens/palettes/delete — remove a palette
      server.middlewares.use("/__design-tokens/palettes/delete", (req, res, next) => {
        if (req.method !== "POST") return next();
        let body = "";
        req.on("data", (chunk) => { body += chunk; });
        req.on("end", () => {
          try {
            const { id } = JSON.parse(body);
            const filePath = path.join(PALETTES_DIR, `${id}.json`);
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ ok: true }));
          } catch (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: String(err) }));
          }
        });
      });

      //* GET /__design-tokens/backups — list all saved backups
      server.middlewares.use("/__design-tokens/backups", (req, res, next) => {
        if (req.method === "GET" && (req.url === "/" || req.url === "")) {
          try {
            if (!fs.existsSync(BACKUPS_DIR)) {
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify([]));
              return;
            }
            const files = fs.readdirSync(BACKUPS_DIR).filter((f) => f.endsWith(".json"));
            const backups = files.map((f) => {
              const raw = fs.readFileSync(path.join(BACKUPS_DIR, f), "utf-8");
              return JSON.parse(raw);
            });
            backups.sort((a: { createdAt: string }, b: { createdAt: string }) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(backups));
          } catch (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: String(err) }));
          }
          return;
        }
        next();
      });

      //* POST /__design-tokens/backups/save — create a backup of tokens
      server.middlewares.use("/__design-tokens/backups/save", (req, res, next) => {
        if (req.method !== "POST") return next();
        let body = "";
        req.on("data", (chunk) => { body += chunk; });
        req.on("end", () => {
          try {
            const backup = JSON.parse(body);
            if (!backup?.id) {
              res.writeHead(400, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "Missing id" }));
              return;
            }
            if (!fs.existsSync(BACKUPS_DIR)) {
              fs.mkdirSync(BACKUPS_DIR, { recursive: true });
            }
            const filename = `${backup.id}.json`;
            fs.writeFileSync(path.join(BACKUPS_DIR, filename), JSON.stringify(backup, null, 2), "utf-8");
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ ok: true }));
          } catch (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: String(err) }));
          }
        });
      });

      //* POST /__design-tokens/backups/delete — remove a backup
      server.middlewares.use("/__design-tokens/backups/delete", (req, res, next) => {
        if (req.method !== "POST") return next();
        let body = "";
        req.on("data", (chunk) => { body += chunk; });
        req.on("end", () => {
          try {
            const { id } = JSON.parse(body);
            const filePath = path.join(BACKUPS_DIR, `${id}.json`);
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ ok: true }));
          } catch (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: String(err) }));
          }
        });
      });
    },
  };
}
