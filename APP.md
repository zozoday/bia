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
src/
  main.tsx, App.tsx, index.css
  bia/
    useBia.ts      # all state + handlers + the view model (ports renderVals)
    constants.ts   # themes, presets, scripted turns, team/share data
    types.ts       # domain types
    assets.ts      # asset path resolver (was window.__resources)
  components/
    WelcomeCard.tsx          # the theme-driven asset Bia creates/reviews
    Toast.tsx
    slack/SlackSurface.tsx
    web/{WebSurface,Sidebar,Library,Review,BrandKit,BrandVoice,Team,ShareModal}.tsx
```

State lives in the `useBia` hook, which mirrors the prototype's single-component
model: a central state object plus a computed view model (`Vals`) that the
presentational components consume. Inline styles are preserved from the
prototype to keep the output pixel-accurate; keyframe animations and hover
states live in `src/index.css`.

Static assets (brand marks, hero/full-frame images, the iBrands Ligature font)
are served from `public/`.
