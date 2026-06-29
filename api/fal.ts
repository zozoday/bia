import { runFal, type FalRequest } from "./_fal";

// Vercel serverless function. Reads the key from the FAL_KEY env var (set in
// the Vercel dashboard); the key never reaches the browser.
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  let body: FalRequest = req.body;
  if (!body || typeof body === "string") {
    try {
      const raw = await readBody(req);
      body = JSON.parse(raw || "{}");
    } catch {
      body = {} as FalRequest;
    }
  }

  const out = await runFal(body, process.env.FAL_KEY);
  res.status(out.status).json(out.body);
}

function readBody(req: any): Promise<string> {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (c: Buffer) => (raw += c));
    req.on("end", () => resolve(raw));
    req.on("error", reject);
  });
}
