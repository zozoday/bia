// Maps the prototype's `window.__resources` keys to real served asset paths.
// In the prototype these were lifted into embedded blobs for the standalone
// export; here they live in /public/assets and are served by Vite.
export const ASSETS = {
  markWhite: "/assets/mark-white.svg",
  markOrange: "/assets/mark-orange.svg",
  markBlack: "/assets/mark-black.svg",
  heroGrain: "/assets/hero-grain.png",
  fullFrame: "/assets/full-frame.png",
} as const;

export type AssetKey = keyof typeof ASSETS;

/** Resolve an asset key to its URL, mirroring the prototype's `res(k, fallback)`. */
export function res(key: AssetKey, fallback?: string): string {
  return ASSETS[key] ?? fallback ?? "";
}
