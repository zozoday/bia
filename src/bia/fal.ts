// Browser-side Fal client. It never sees the API key — it talks to our own
// /api/fal proxy, which injects the key server-side. Every call resolves to an
// image URL on success, or `null` on any failure (key not configured, network
// error, Fal error) so callers can transparently fall back to the simulation.

interface FalPayload {
  action: "generate" | "edit";
  prompt: string;
  imageUrl?: string;
}

async function callFal(payload: FalPayload): Promise<string | null> {
  try {
    const r = await fetch("/api/fal", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!r.ok) return null;
    const j = (await r.json()) as { url?: string };
    return j?.url || null;
  } catch {
    return null;
  }
}

export function generateImage(prompt: string): Promise<string | null> {
  return callFal({ action: "generate", prompt });
}

export function editImage(imageUrl: string, prompt: string): Promise<string | null> {
  return callFal({ action: "edit", prompt, imageUrl });
}

// The base prompt for the welcome-card hero artwork. The branded text/logo is
// rendered as an overlay on top of this generated image.
export const HERO_PROMPT =
  "Cinematic abstract backdrop for a corporate welcome banner, warm 35mm film grain, " +
  "soft orange and warm-stone tones, gentle light bloom, editorial and minimal, " +
  "no text, no logos, no faces, shallow depth of field";
