import { fal } from "@fal-ai/client";

// Model IDs are centralized here. Swap to higher-quality tiers by changing
// these two lines, e.g. "fal-ai/flux/dev" or "fal-ai/flux-pro/v1.1".
const GEN_MODEL = "fal-ai/flux/schnell"; // fast, cheap text-to-image
const EDIT_MODEL = "fal-ai/flux-pro/kontext"; // instruction-based image editing

export interface FalRequest {
  action: "generate" | "edit";
  prompt: string;
  imageUrl?: string;
}

export interface FalResult {
  status: number;
  body: Record<string, unknown>;
}

// Allow-listed actions only — the client never picks the raw model, so this
// proxy can't be abused to call arbitrary Fal endpoints.
export async function runFal(body: FalRequest, falKey?: string): Promise<FalResult> {
  if (!falKey) return { status: 503, body: { error: "fal_not_configured" } };
  if (!body || typeof body.prompt !== "string" || !body.prompt.trim()) {
    return { status: 400, body: { error: "missing_prompt" } };
  }

  fal.config({ credentials: falKey });

  try {
    if (body.action === "edit") {
      if (!body.imageUrl) return { status: 400, body: { error: "missing_image" } };
      const r = (await fal.subscribe(EDIT_MODEL, {
        input: { prompt: body.prompt, image_url: body.imageUrl },
      })) as { data?: { images?: Array<{ url?: string }> } };
      const url = r?.data?.images?.[0]?.url;
      return url ? { status: 200, body: { url } } : { status: 502, body: { error: "no_image" } };
    }

    const r = (await fal.subscribe(GEN_MODEL, {
      input: {
        prompt: body.prompt,
        image_size: "landscape_4_3",
        num_images: 1,
        num_inference_steps: 4,
      },
    })) as { data?: { images?: Array<{ url?: string }> } };
    const url = r?.data?.images?.[0]?.url;
    return url ? { status: 200, body: { url } } : { status: 502, body: { error: "no_image" } };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return { status: 502, body: { error: "fal_error", message } };
  }
}
