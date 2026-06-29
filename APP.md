# Bia — implementation

React + Vite + TypeScript implementation of the **Bia** design-collaboration app
(handoff bundle in `project/`, chat history in `chats/`). It recreates the
prototype `project/Bia.dc.html` pixel-for-pixel: a single clickable app on the
Magic Lantern brand with two surfaces and the full Slack → web-review → @Bia-edit
loop.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check (tsc) + production build to dist/
```

## Real image generation (Fal.ai)

Image generation and editing run on [Fal.ai](https://fal.ai) — **FLUX.1 [schnell]**
for text-to-image and **FLUX Pro Kontext** for instruction-based edits (model IDs
are centralized in `api/_fal.ts`; swap to `flux/dev` or `flux-pro` there).

The API key is **never exposed to the browser**. The client calls our own
`/api/fal` proxy, which injects the key server-side:

- **Local dev:** copy `.env.example` → `.env` and set `FAL_KEY=...` (get a key at
  https://fal.ai/dashboard/keys). A Vite dev-middleware (`vite.config.ts`) serves
  `/api/fal` using that key. Just run `npm run dev`.
- **Production (Vercel):** the serverless function `api/fal.ts` handles `/api/fal`.
  Set **`FAL_KEY`** as an Environment Variable in the Vercel project settings.

**No key? No problem.** Every Fal call falls back to the built-in simulation
(bundled hero artwork + theme-toggle "edits"), so the app always runs offline and
for free. Where Fal is used:

- Slack welcome-card generation → real generated hero image (branded text overlay).
- Slack inline edits + the review-tool `@Bia` comments → real image-to-image edits.

> Generating/editing images makes paid Fal API calls. `schnell` is fast and cheap;
> Kontext edits cost a bit more.

## What's here

- **Slack surface** — workspace rail, channel sidebar, DM with Bia. A scripted
  conversation asks follow-ups, "types," and renders the Welcome card, plus
  in-Slack iterative editing (inline edit chips, regenerate → v2).
- **Web surface**
  - **Library** — asset grid with file upload + drag-and-drop.
  - **Review** — frame.io-style zoomable/pannable canvas (pinch / wheel / drag),
    point-click comment pins, @Bia live regeneration, v1/v2 toggle.
  - **Brand kit** — URL brand extraction (simulated) + one-click revert; the
    whole library and the live Welcome card re-skin to the extracted theme.
  - **Brand voice** and **Team & access** admin screens.
  - **Share** modal.
- Surface switcher docked in both sidebars; toast notifications.

The brand extraction, image generation/editing, and agent replies are
**simulated** front-end only — faithful to the prototype (see `chats/chat1.md`).

## Structure

```
api/
  _fal.ts          # shared Fal handler (model IDs, runFal) — server-side only
  fal.ts           # Vercel serverless function for POST /api/fal
src/
  main.tsx, App.tsx, index.css
  bia/
    useBia.ts      # all state + handlers + the view model (ports renderVals)
    fal.ts         # browser client → /api/fal proxy (generateImage/editImage)
    constants.ts   # themes, presets, scripted turns, team/share data
    types.ts       # domain types
    assets.ts      # asset path resolver (was window.__resources)
  components/
    WelcomeCard.tsx          # the theme-driven asset Bia creates/reviews
    Toast.tsx
    slack/SlackSurface.tsx
    web/{WebSurface,Sidebar,Library,Review,BrandKit,BrandVoice,Team,ShareModal}.tsx
```

The Fal handler in `api/_fal.ts` is shared by both the Vercel function
(`api/fal.ts`, production) and the Vite dev-middleware (`vite.config.ts`, local),
so generation behaves identically in both environments.

State lives in the `useBia` hook, which mirrors the prototype's single-component
model: a central state object plus a computed view model (`Vals`) that the
presentational components consume. Inline styles are preserved from the
prototype to keep the output pixel-accurate; keyframe animations and hover
states live in `src/index.css`.

Static assets (brand marks, hero/full-frame images, the iBrands Ligature font)
are served from `public/`.
