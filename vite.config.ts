import { defineConfig, loadEnv, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import { runFal } from "./api/_fal";

// Serves POST /api/fal during `npm run dev`, reusing the same handler the
// Vercel function uses in production. Reads FAL_KEY from .env (server-side
// only — never bundled into the client).
function falDevApi(env: Record<string, string>): PluginOption {
  return {
    name: "fal-dev-api",
    configureServer(server) {
      server.middlewares.use("/api/fal", (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.setHeader("content-type", "application/json");
          res.end(JSON.stringify({ error: "method_not_allowed" }));
          return;
        }
        let raw = "";
        req.on("data", (c: Buffer) => (raw += c));
        req.on("end", async () => {
          let body;
          try {
            body = JSON.parse(raw || "{}");
          } catch {
            body = {};
          }
          const out = await runFal(body, env.FAL_KEY || process.env.FAL_KEY);
          res.statusCode = out.status;
          res.setHeader("content-type", "application/json");
          res.end(JSON.stringify(out.body));
        });
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), falDevApi(env)],
  };
});
