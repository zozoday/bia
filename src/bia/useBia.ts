import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { res } from "./assets";
import { editImage, generateImage, HERO_PROMPT } from "./fal";
import {
  DEFAULT_THEME,
  EDIT_CHIPS,
  GENERIC_POOL,
  PRESETS,
  SCRIPT_TURNS,
  SHARE_LIST,
  TEAM,
} from "./constants";
import type { BiaState, Comment, Theme, WebView } from "./types";

function hexA(hex: string, a: number): string {
  try {
    let h = (hex || "#000").replace("#", "");
    if (h.length === 3)
      h = h
        .split("")
        .map((c) => c + c)
        .join("");
    const n = parseInt(h, 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
  } catch {
    return hex;
  }
}

function initialState(): BiaState {
  return {
    surface: "slack",
    webView: "library",
    selectedAsset: "welcome",
    msgs: [
      {
        id: "m_init",
        role: "bia",
        kind: "text",
        time: "9:31 AM",
        text: "Hi Sana. I'm Bia — your design partner, right here in Slack. Tell me what you need and I'll draft it on-brand, straight from your brand kit. What are we making?",
      },
    ],
    step: 0,
    typing: false,
    composer: "",
    suggestions: [
      "A welcome image for a new hire",
      "An Instagram post",
      "Recolor our logo",
    ],
    version: 1,
    regenerating: false,
    justUpdated: false,
    pendingPin: null,
    cDraft: "",
    tagBia: true,
    activeComment: "c1",
    comments: [
      {
        id: "c1",
        num: 1,
        author: "Devin Rao",
        initials: "DR",
        avatarBg: "#1D1D1D",
        time: "9:42 AM",
        text: "Type hierarchy looks great. It feels a touch quiet, though — can we make it more premium and on-brand?",
        tagsBia: false,
        x: 30,
        y: 38,
        resolved: false,
        replies: [
          {
            id: "r1",
            isBia: true,
            working: false,
            time: "9:43 AM",
            text: "I can lift the contrast and try our Lantern Orange as the ground. Drop a comment and tag me to apply it.",
          },
        ],
      },
    ],
    showShare: false,
    toast: null,
    zoom: 1,
    panX: 0,
    panY: 0,
    theme: DEFAULT_THEME,
    urlInput: "",
    extracting: false,
    extractHost: "",
    uploads: [],
    dragging: false,
    cardReady: false,
    slackV: 1,
    heroV1: null,
    heroV2: null,
  };
}

// Keep the regenerating shimmer visible for at least this long, even when Fal
// (or the fallback) resolves faster, so the motion reads as intentional.
const MIN_GEN_MS = 1400;

type Patch = Partial<BiaState> | ((prev: BiaState) => Partial<BiaState>);

export function useBia() {
  const [state, setRaw] = useState<BiaState>(initialState);
  const stateRef = useRef(state);
  stateRef.current = state;

  const timersRef = useRef<number[]>([]);
  const nRef = useRef(0);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const convRef = useRef<HTMLDivElement | null>(null);
  const panRef = useRef<{ sx: number; sy: number; px: number; py: number; moved: boolean } | null>(null);
  const didPanRef = useRef(false);

  const setState = useCallback((patch: Patch) => {
    setRaw((prev) => {
      const delta = typeof patch === "function" ? patch(prev) : patch;
      const next = { ...prev, ...delta };
      stateRef.current = next;
      return next;
    });
  }, []);

  const later = useCallback((fn: () => void, ms: number) => {
    const t = window.setTimeout(fn, ms);
    timersRef.current.push(t);
    return t;
  }, []);

  const uid = useCallback(() => {
    nRef.current++;
    return "id" + nRef.current;
  }, []);

  const now = useCallback(() => {
    const d = new Date();
    let h = d.getHours();
    const m = d.getMinutes();
    const ap = h < 12 ? "AM" : "PM";
    h = h % 12;
    if (h === 0) h = 12;
    return h + ":" + (m < 10 ? "0" : "") + m + " " + ap;
  }, []);

  const toast = useCallback(
    (text: string) => {
      setState({ toast: text });
      later(() => setState((s) => (s.toast === text ? { toast: null } : {})), 2800);
    },
    [setState, later],
  );

  const metaFor = useCallback(
    (v: number) => "1200×630 · PNG · Brand kit: " + stateRef.current.theme.brand + " · v" + v,
    [],
  );

  const scrollConv = useCallback(() => {
    const go = () => {
      const el = document.getElementById("bia-conv");
      if (el) el.scrollTop = el.scrollHeight;
    };
    [60, 200, 420, 750, 1200, 1700].forEach((ms) => later(go, ms));
  }, [later]);

  // ---- uploads ----
  const addFiles = useCallback(
    (list: FileList | null) => {
      const files = Array.from(list || []);
      if (!files.length) return;
      const ups = files.map((f) => {
        const t = f.type || "";
        let kind: "image" | "video" | "doc" = "doc";
        if (t.indexOf("image/") === 0) kind = "image";
        else if (t.indexOf("video/") === 0) kind = "video";
        const mb = f.size / 1048576;
        const szL = mb >= 1 ? mb.toFixed(1) + " MB" : Math.max(1, Math.round(f.size / 1024)) + " KB";
        let url: string | null = null;
        try {
          url = URL.createObjectURL(f);
        } catch {
          url = null;
        }
        nRef.current++;
        return {
          id: "up" + nRef.current,
          name: f.name,
          kind,
          url,
          typeLabel: (kind === "image" ? "Image" : kind === "video" ? "Video" : "PDF") + " · " + szL,
        };
      });
      setState((s) => ({ uploads: [...ups, ...s.uploads], dragging: false }));
      toast(files.length + " file" + (files.length > 1 ? "s" : "") + " uploaded · Bia is tagging to your brand kit");
    },
    [setState, toast],
  );

  const pickFiles = useCallback(() => {
    if (fileRef.current) fileRef.current.click();
  }, []);
  const onFiles = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      addFiles(e.target.files);
      e.target.value = "";
    },
    [addFiles],
  );
  const onDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!stateRef.current.dragging) setState({ dragging: true });
    },
    [setState],
  );
  const onDragLeave = useCallback(
    (e: React.DragEvent) => {
      if (e.currentTarget === e.target) setState({ dragging: false });
    },
    [setState],
  );
  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      addFiles(e.dataTransfer && e.dataTransfer.files);
    },
    [addFiles],
  );

  // ---- brand extraction ----
  const resolveTheme = useCallback((url: string): Theme | null => {
    const u = (url || "").toLowerCase().trim();
    if (!u) return null;
    const host = u.replace(/^https?:\/\//, "").replace(/^www\./, "").split(/[/?#]/)[0];
    if (!host) return null;
    for (const key in PRESETS) {
      if (host.includes(key.split(".")[0])) return { ...PRESETS[key], sourceUrl: host };
    }
    const name = host.split(".")[0];
    const brand = name.charAt(0).toUpperCase() + name.slice(1);
    let h = 0;
    for (let i = 0; i < host.length; i++) h = (h * 31 + host.charCodeAt(i)) >>> 0;
    const accent = GENERIC_POOL[h % GENERIC_POOL.length];
    return {
      id: "generic",
      brand,
      cardBrand: brand,
      wordmark: false,
      accent,
      accentText: "#FFFFFF",
      accentSoft: hexA(accent, 0.12),
      surface: "#FFFFFF",
      ink: "#14161A",
      muted: "#5A6068",
      font: "Inter",
      fontNote: "Closest match to " + brand + "'s site type. Aa Bb Cc 1234567890",
      wordmarkNote: "Detected wordmark, set in brand color.",
      colorCaption: "Extracted from " + host,
      palette: [
        { name: "Primary", hex: accent },
        { name: "Ink", hex: "#14161A" },
        { name: "Accent 2", hex: GENERIC_POOL[(h + 3) % GENERIC_POOL.length] },
        { name: "Slate", hex: "#5A6068" },
        { name: "Mist", hex: "#F3F4F6" },
        { name: "White", hex: "#FFFFFF" },
      ],
      sourceUrl: host,
    };
  }, []);

  const extractBrand = useCallback(() => {
    const t = resolveTheme(stateRef.current.urlInput);
    if (!t) {
      toast("Enter a website URL to extract from");
      return;
    }
    if (stateRef.current.extracting) return;
    setState({ extracting: true, extractHost: t.sourceUrl || "" });
    later(() => {
      setState({ theme: t, extracting: false });
      toast("Brand kit updated from " + t.sourceUrl + " · library re-skinned");
    }, 2300);
  }, [resolveTheme, setState, later, toast]);

  const revertBrand = useCallback(() => {
    setState({ theme: DEFAULT_THEME, urlInput: "" });
    toast("Reverted to the Magic Lantern brand kit");
  }, [setState, toast]);

  // ---- zoom / pan ----
  const zoomAt = useCallback(
    (px: number, py: number, factor: number) => {
      const z = stateRef.current.zoom;
      const nz = Math.max(0.3, Math.min(5, z * factor));
      const ratio = nz / z;
      setState((s) => ({ zoom: nz, panX: px - (px - s.panX) * ratio, panY: py - (py - s.panY) * ratio }));
    },
    [setState],
  );
  const zoomBtn = useCallback(
    (factor: number) => {
      const st = stageRef.current;
      if (!st) return;
      const r = st.getBoundingClientRect();
      zoomAt(r.width / 2, r.height / 2, factor);
    },
    [zoomAt],
  );
  const fitView = useCallback(() => setState({ zoom: 1, panX: 0, panY: 0 }), [setState]);

  const onStageDown = useCallback(
    (e: React.MouseEvent) => {
      panRef.current = { sx: e.clientX, sy: e.clientY, px: stateRef.current.panX, py: stateRef.current.panY, moved: false };
      const move = (ev: MouseEvent) => {
        if (!panRef.current) return;
        const dx = ev.clientX - panRef.current.sx;
        const dy = ev.clientY - panRef.current.sy;
        if (Math.abs(dx) + Math.abs(dy) > 4) panRef.current.moved = true;
        setState({ panX: panRef.current.px + dx, panY: panRef.current.py + dy });
      };
      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
        didPanRef.current = !!panRef.current && panRef.current.moved;
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    },
    [setState],
  );

  // ---- slack flow ----
  const advance = useCallback(() => {
    const turn = SCRIPT_TURNS[stateRef.current.step];
    if (!turn) {
      setState({ typing: false });
      return;
    }
    setState((s) => ({
      typing: false,
      suggestions: turn.sugg || [],
      step: s.step + 1,
      msgs: [...s.msgs, { id: uid(), role: "bia", kind: "text", text: turn.text, time: now() }],
    }));
    scrollConv();
    if (turn.card) {
      later(() => {
        setState((s) => ({
          msgs: [
            ...s.msgs,
            { id: "gen", role: "bia", kind: "generating", genLabel: "Rendering welcome card — pulling brand kit…", time: now() },
          ],
        }));
        scrollConv();
        const t0 = Date.now();
        const reveal = (url: string | null) => {
          setState((s) => ({
            cardReady: true,
            slackV: 1,
            version: 1,
            suggestions: EDIT_CHIPS,
            heroV1: url,
            heroV2: null,
            msgs: s.msgs
              .filter((m) => m.id !== "gen")
              .concat([
                { id: uid(), role: "bia", kind: "card", cardVersion: 1, cardMeta: metaFor(1), isEdit: false, heroUrl: url || undefined, time: now() },
                {
                  id: uid(),
                  role: "bia",
                  kind: "text",
                  time: now(),
                  text: "Here's v1 — a warm welcome card for Maya, built from your brand kit.\nWant changes? Just tell me right here — \"make it bolder,\" \"use our orange,\" anything — and I'll regenerate it. Or open it in Bia to comment.",
                },
              ]),
          }));
          scrollConv();
        };
        generateImage(HERO_PROMPT).then((url) => {
          later(() => reveal(url), Math.max(0, MIN_GEN_MS - (Date.now() - t0)));
        });
      }, 500);
    }
  }, [setState, uid, now, scrollConv, later, metaFor]);

  const editCard = useCallback(
    (text: string) => {
      const t = (text || "").toLowerCase();
      const cur = stateRef.current.slackV;
      let nv: number;
      if (/bold|orange|pop|vibrant|punch|loud|ground|strong|striking|brand colou?r/.test(t)) nv = 2;
      else if (/soft|warm|light|calm|subtle|muted|gentle|quiet|minimal/.test(t)) nv = 1;
      else nv = cur === 1 ? 2 : 1;
      const accentName =
        (stateRef.current.theme.palette[0] && stateRef.current.theme.palette[0].name) || "Lantern Orange";
      const reply =
        nv === 2
          ? "Done — flipped the ground to " + accentName + " and set the mark in white for contrast. Saved as v" + nv + ", and mirrored it to the review tool."
          : "Done — eased it back to the warm Stone layout with a single " + accentName + " accent. Saved as v" + nv + ", and mirrored it to the review tool.";
      setState((s) => ({
        typing: false,
        msgs: [...s.msgs, { id: "gen2", role: "bia", kind: "generating", genLabel: "Editing the welcome card — applying your changes…", time: now() }],
      }));
      scrollConv();
      const finish = (url: string | null) => {
        setState((s) => ({
          slackV: nv,
          version: nv,
          suggestions: EDIT_CHIPS,
          heroV2: url || s.heroV2,
          msgs: s.msgs
            .filter((m) => m.id !== "gen2")
            .concat([
              {
                id: uid(),
                role: "bia",
                kind: "card",
                cardVersion: nv,
                cardMeta: metaFor(nv),
                isEdit: true,
                heroUrl: (url || (nv === 2 ? s.heroV2 || s.heroV1 : s.heroV1)) || undefined,
                time: now(),
              },
              { id: uid(), role: "bia", kind: "text", time: now(), text: reply },
            ]),
        }));
        scrollConv();
      };
      const src = stateRef.current.heroV2 || stateRef.current.heroV1;
      if (src) {
        const t0 = Date.now();
        editImage(src, text).then((url) => later(() => finish(url), Math.max(0, MIN_GEN_MS - (Date.now() - t0))));
      } else {
        later(() => finish(null), 1900);
      }
    },
    [setState, now, scrollConv, later, uid, metaFor],
  );

  const send = useCallback(
    (text: string) => {
      text = (text || "").trim();
      if (!text) return;
      const editing = stateRef.current.cardReady && !SCRIPT_TURNS[stateRef.current.step];
      setState((s) => ({
        msgs: [...s.msgs, { id: uid(), role: "user", kind: "text", text, time: now() }],
        composer: "",
        suggestions: [],
        typing: true,
      }));
      scrollConv();
      later(() => (editing ? editCard(text) : advance()), editing ? 900 : 1200);
    },
    [setState, uid, now, scrollConv, later, editCard, advance],
  );

  const pick = useCallback((label: string) => send(label), [send]);
  const sendSlack = useCallback(() => send(stateRef.current.composer), [send]);

  // ---- navigation ----
  const goReview = useCallback(
    () => setState({ surface: "web", webView: "review", selectedAsset: "welcome", zoom: 1, panX: 0, panY: 0 }),
    [setState],
  );
  const goSlack = useCallback(() => setState({ surface: "slack", showShare: false }), [setState]);
  const goWeb = useCallback(() => setState({ surface: "web", showShare: false }), [setState]);
  const goLibrary = useCallback(() => setState({ webView: "library", showShare: false }), [setState]);
  const navTo = useCallback((v: WebView) => setState({ webView: v, showShare: false }), [setState]);
  const openAsset = useCallback(
    (id: string) => {
      if (id === "welcome") {
        setState({ surface: "web", webView: "review", selectedAsset: "welcome", zoom: 1, panX: 0, panY: 0 });
      } else {
        toast("This is a demo — the Maya welcome card is the wired example");
      }
    },
    [setState, toast],
  );
  const postChannel = useCallback(() => toast("Posted to #design"), [toast]);
  const regenSlack = useCallback(() => {
    if (stateRef.current.cardReady) {
      setState((s) => ({
        msgs: [...s.msgs, { id: uid(), role: "user", kind: "text", text: "Regenerate it", time: now() }],
        typing: true,
      }));
      later(() => editCard("regenerate"), 900);
    }
  }, [setState, uid, now, later, editCard]);
  const approve = useCallback(() => toast("Asset approved"), [toast]);
  const openShare = useCallback(() => setState({ showShare: true }), [setState]);
  const closeShare = useCallback(() => setState({ showShare: false }), [setState]);
  const stop = useCallback((e?: { stopPropagation?: () => void }) => {
    if (e && e.stopPropagation) e.stopPropagation();
  }, []);
  const copyLink = useCallback(() => toast("Link copied to clipboard"), [toast]);
  const setVersion = useCallback((v: number) => setState({ version: v }), [setState]);

  // ---- review interactions ----
  const onStageClick = useCallback(
    (e: React.MouseEvent) => {
      if (didPanRef.current) {
        didPanRef.current = false;
        return;
      }
      if (stateRef.current.regenerating) return;
      const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = Math.max(5, Math.min(95, ((e.clientX - r.left) / r.width) * 100));
      const y = Math.max(7, Math.min(93, ((e.clientY - r.top) / r.height) * 100));
      setState({ pendingPin: { x: Math.round(x), y: Math.round(y) }, cDraft: "", tagBia: true });
    },
    [setState],
  );
  const cancelPin = useCallback(() => setState({ pendingPin: null, cDraft: "" }), [setState]);
  const toggleTag = useCallback(() => setState((s) => ({ tagBia: !s.tagBia })), [setState]);
  const quickFill = useCallback(
    () => setState({ cDraft: "@Bia change the background to our Lantern Orange and make it pop", tagBia: true }),
    [setState],
  );
  const resolveComment = useCallback(
    (id: string) =>
      setState((s) => ({ comments: s.comments.map((c) => (c.id === id ? { ...c, resolved: !c.resolved } : c)) })),
    [setState],
  );
  const postComment = useCallback(() => {
    const s0 = stateRef.current;
    const text = (s0.cDraft || "").trim();
    if (!text || !s0.pendingPin) return;
    const tags = s0.tagBia || /@bia/i.test(text);
    const id = uid();
    const c: Comment = {
      id,
      num: s0.comments.length + 1,
      author: "Sana Okafor",
      initials: "SO",
      avatarBg: "#0019FF",
      time: now(),
      text,
      tagsBia: tags,
      x: s0.pendingPin.x,
      y: s0.pendingPin.y,
      resolved: false,
      replies: tags ? [{ id: uid(), isBia: true, working: true, time: now(), text: "On it — regenerating now…" }] : [],
    };
    setState((s) => ({ comments: [...s.comments, c], pendingPin: null, cDraft: "", activeComment: id }));
    if (tags) {
      setState({ regenerating: true });
      const apply = (url: string | null) => {
        setState((s) => ({
          version: 2,
          regenerating: false,
          justUpdated: true,
          heroV2: url || s.heroV2,
          comments: s.comments.map((cc) =>
            cc.id === id
              ? {
                  ...cc,
                  replies: [
                    {
                      id: uid(),
                      isBia: true,
                      working: false,
                      time: now(),
                      text: "Done. I swapped the ground to Lantern Orange and flipped the mark to white for contrast — saved as v2 and mirrored it back to #design.",
                    },
                  ],
                }
              : cc,
          ),
        }));
        toast("Bia updated this asset · now showing v2");
        later(() => setState({ justUpdated: false }), 1600);
      };
      const src = stateRef.current.heroV2 || stateRef.current.heroV1;
      if (src) {
        const t0 = Date.now();
        editImage(src, text).then((url) => later(() => apply(url), Math.max(0, 1800 - (Date.now() - t0))));
      } else {
        later(() => apply(null), 2300);
      }
    }
  }, [uid, now, setState, later, toast]);

  // ---- wheel (pinch-zoom / pan) listener ----
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const s = stateRef.current;
      if (s.surface !== "web" || s.webView !== "review") return;
      const st = stageRef.current;
      if (!st || !st.contains(e.target as Node)) return;
      e.preventDefault();
      const r = st.getBoundingClientRect();
      const px = e.clientX - r.left;
      const py = e.clientY - r.top;
      if (e.ctrlKey) {
        zoomAt(px, py, Math.exp(-e.deltaY * 0.01));
      } else {
        setState((cur) => ({ panX: cur.panX - e.deltaX, panY: cur.panY - e.deltaY }));
      }
    };
    document.addEventListener("wheel", onWheel, { passive: false });
    const timers = timersRef.current;
    return () => {
      document.removeEventListener("wheel", onWheel);
      timers.forEach(clearTimeout);
    };
  }, [zoomAt, setState]);

  // ========================= view model (renderVals) =========================
  const s = state;
  const th = s.theme;
  const isThemed = th.id !== "default";

  const msgs = s.msgs.map((m) => ({
    ...m,
    isUser: m.role === "user",
    isBia: m.role === "bia",
    isText: m.kind === "text",
    isGenerating: m.kind === "generating",
    isCard: m.kind === "card",
    genLabel: m.genLabel || "Working…",
    cardVersion: m.cardVersion || 1,
    cardMeta: m.cardMeta || "",
    isEdit: !!m.isEdit,
    author: m.role === "user" ? "Sana Okafor" : "Bia",
  }));

  const suggestions = s.suggestions.map((x) => ({ label: x, onClick: () => pick(x) }));

  const comments = s.comments.map((c) => ({
    ...c,
    pinBg: c.author === "Sana Okafor" ? "#FF5B10" : "#1D1D1D",
    avatarBg: c.avatarBg,
    borderColor: c.id === s.activeComment ? "#FF5B10" : "#E0D9CF",
    cardBg: c.resolved ? "#F6F2EF" : "#fff",
    resolveLabel: c.resolved ? "Resolved" : "Resolve",
    resolveBg: c.resolved ? "#1D1D1D" : "#fff",
    resolveFg: c.resolved ? "#fff" : "#565657",
    resolveBorder: c.resolved ? "#1D1D1D" : "#E0D9CF",
    onResolve: () => resolveComment(c.id),
    onFocus: (e: React.MouseEvent) => {
      stop(e);
      setState({ activeComment: c.id });
    },
    replies: (c.replies || []).map((r) => ({ ...r, done: !r.working })),
  }));
  const resolvedCount = s.comments.filter((c) => c.resolved).length;

  const uploadAssets = (s.uploads || []).map((u) => ({
    id: u.id,
    name: u.name,
    typeLabel: u.typeLabel,
    meta: "You · now",
    status: "New",
    statusBg: th.accentSoft,
    statusFg: th.accent,
    isHero: false,
    version: 1,
    isImage: u.kind === "image",
    isVideo: u.kind === "video",
    isDoc: u.kind === "doc",
    img: u.kind === "image" ? u.url : null,
    duration: u.kind === "video" ? "0:00" : undefined,
    pages: u.kind === "doc" ? "1" : undefined,
  }));

  type RawAsset = {
    id: string;
    name: string;
    typeLabel: string;
    meta: string;
    status: string;
    statusBg: string;
    statusFg: string;
    isHero?: boolean;
    version?: number;
    isImage?: boolean;
    isVideo?: boolean;
    isDoc?: boolean;
    img?: string | null;
    duration?: string;
    pages?: string | number;
  };

  const rawAssets: RawAsset[] = [
    ...uploadAssets,
    { id: "welcome", name: "Welcome — Maya Chen", typeLabel: "Image · 1200×630", meta: "Bia · now", status: "Needs review", statusBg: th.accentSoft, statusFg: th.accent, isHero: true, version: s.version },
    { id: "launch", name: "Launch teaser", typeLabel: "Video · 0:15", meta: "Devin · 2h", status: "In review", statusBg: "#F3EEEB", statusFg: "#565657", isVideo: true, duration: "0:15", img: res("fullFrame", "/assets/full-frame.png") },
    { id: "ig", name: "Spring sale — IG post", typeLabel: "Image · 1080²", meta: "Sana · 1d", status: "Approved", statusBg: "#1D1D1D", statusFg: "#fff", isImage: true, img: res("heroGrain", "/assets/hero-grain.png") },
    { id: "logopack", name: "Brand logo pack", typeLabel: "PDF · 6 pages", meta: "Bia · 2d", status: "Approved", statusBg: "#1D1D1D", statusFg: "#fff", isDoc: true, pages: 6 },
    { id: "deck", name: "Q3 culture deck", typeLabel: "PDF · 24 pages", meta: "Maya · 3d", status: "In review", statusBg: "#F3EEEB", statusFg: "#565657", isDoc: true, pages: 24 },
    { id: "banner", name: "Recruiting banner", typeLabel: "Image · 1584×396", meta: "Bia · 4d", status: "Needs review", statusBg: th.accentSoft, statusFg: th.accent, isImage: true, img: res("fullFrame", "/assets/full-frame.png") },
    { id: "reel", name: "Product reel — hero", typeLabel: "Video · 0:42", meta: "Devin · 5d", status: "Draft", statusBg: "#F3EEEB", statusFg: "#969496", isVideo: true, duration: "0:42", img: res("heroGrain", "/assets/hero-grain.png") },
    { id: "poster", name: "Studio reel poster", typeLabel: "Image · 2000×1125", meta: "Sana · 1w", status: "Approved", statusBg: "#1D1D1D", statusFg: "#fff", isImage: true, img: res("heroGrain", "/assets/hero-grain.png") },
  ];

  const assets = rawAssets.map((a) => ({
    ...a,
    isImage: !!a.isImage && !a.isHero,
    onOpen: () => openAsset(a.id),
    thumbStyle: (a.img
      ? {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('" + a.img + "')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: a.isVideo ? 0.82 : 1,
        }
      : {}) as CSSProperties,
  }));

  const navWorkspace = (
    [
      { label: "Brand kit", view: "brandkit" as const },
      { label: "Brand voice", view: "brandvoice" as const },
      { label: "Team & access", view: "team" as const },
    ]
  ).map((n) => ({
    label: n.label,
    onClick: () => navTo(n.view),
    bg: s.webView === n.view ? "#FFE9DF" : "transparent",
    color: s.webView === n.view ? "#FF5B10" : "#1D1D1D",
  }));

  const swatches = th.palette;

  type LogoTile = {
    isMark?: boolean;
    isInitial?: boolean;
    src?: string;
    initial?: string;
    tileStyle: CSSProperties;
    initialStyle?: CSSProperties;
  };

  const logoTiles: LogoTile[] = isThemed
    ? [
        { isInitial: true, initial: (th.brand[0] || "B").toUpperCase(), tileStyle: { background: th.accent, borderRadius: "16px", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center" }, initialStyle: { fontSize: "40px", fontWeight: 700, letterSpacing: "-0.04em", color: th.accentText } },
        { isInitial: true, initial: (th.brand[0] || "B").toUpperCase(), tileStyle: { background: "#fff", border: "1px solid #E0D9CF", borderRadius: "16px", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center" }, initialStyle: { fontSize: "40px", fontWeight: 700, letterSpacing: "-0.04em", color: th.accent } },
        { isInitial: true, initial: (th.brand[0] || "B").toUpperCase(), tileStyle: { background: th.ink, borderRadius: "16px", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center" }, initialStyle: { fontSize: "40px", fontWeight: 700, letterSpacing: "-0.04em", color: "#fff" } },
        { isInitial: true, initial: (th.brand[0] || "B").toUpperCase(), tileStyle: { background: th.surface === "#FFFFFF" ? "#F3F4F6" : th.surface, border: "1px solid #E0D9CF", borderRadius: "16px", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center" }, initialStyle: { fontSize: "40px", fontWeight: 700, letterSpacing: "-0.04em", color: th.ink } },
      ]
    : [
        { isMark: true, src: res("markWhite", "/assets/mark-white.svg"), tileStyle: { background: "#FF5B10", borderRadius: "16px", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center" } },
        { isMark: true, src: res("markOrange", "/assets/mark-orange.svg"), tileStyle: { background: "#fff", border: "1px solid #E0D9CF", borderRadius: "16px", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center" } },
        { isMark: true, src: res("markWhite", "/assets/mark-white.svg"), tileStyle: { background: "#1D1D1D", borderRadius: "16px", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center" } },
        { isMark: true, src: res("markBlack", "/assets/mark-black.svg"), tileStyle: { background: "#F6F2EF", border: "1px solid #E0D9CF", borderRadius: "16px", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center" } },
      ];

  const urlSuggestions = ["stripe.com", "linear.app", "spotify.com"].map((u) => ({
    label: u,
    onClick: () => {
      setState({ urlInput: u });
      later(() => extractBrand(), 60);
    },
  }));

  const extractSteps = [
    { label: "Fetching logo & favicon", ok: true },
    { label: "Sampling color palette", ok: true },
    { label: "Detecting type system", ok: true },
    { label: "Re-skinning library assets", ok: false },
  ].map((e) => ({
    label: e.label,
    color: e.ok ? "#1D1D1D" : "#969496",
    dotStyle: (e.ok
      ? { width: "16px", height: "16px", borderRadius: "50%", background: "#2BAC76", display: "inline-flex", flex: "none" }
      : { width: "16px", height: "16px", borderRadius: "50%", border: "2px solid rgba(255,91,16,0.3)", borderTopColor: "#FF5B10", display: "inline-block", flex: "none", animation: "biaSpin 0.7s linear infinite" }) as CSSProperties,
  }));

  return {
    // refs
    stageRef,
    fileRef,
    convRef,

    // surface / nav
    isSlack: s.surface === "slack",
    isWeb: s.surface === "web",
    atLibrary: s.webView === "library",
    atReview: s.webView === "review",
    atBrandkit: s.webView === "brandkit",
    atBrandvoice: s.webView === "brandvoice",
    atTeam: s.webView === "team",
    libBg: s.webView === "library" ? "#FFE9DF" : "transparent",
    libColor: s.webView === "library" ? "#FF5B10" : "#1D1D1D",

    // slack
    msgs,
    typing: s.typing,
    suggestions,
    hasSuggestions: s.suggestions.length > 0,
    showInlineSuggestions: s.suggestions.length > 0 && !s.typing,
    composer: s.composer,
    onComposerInput: (e: React.ChangeEvent<HTMLInputElement>) => setState({ composer: e.target.value }),
    onComposerKey: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendSlack();
      }
    },
    sendSlack: () => sendSlack(),
    goReview: () => goReview(),
    postChannel: () => postChannel(),
    regenSlack: () => regenSlack(),
    goSlack: () => goSlack(),
    goWeb: () => goWeb(),
    goLibrary: () => goLibrary(),

    // collections
    navWorkspace,
    assets,
    swatches,
    team: TEAM,
    shareList: SHARE_LIST,

    // uploads
    pickFiles: () => pickFiles(),
    onFiles: (e: React.ChangeEvent<HTMLInputElement>) => onFiles(e),
    onDragOver: (e: React.DragEvent) => onDragOver(e),
    onDragLeave: (e: React.DragEvent) => onDragLeave(e),
    onDrop: (e: React.DragEvent) => onDrop(e),
    gridStyle: { padding: "14px 40px 48px", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(264px,1fr))", gap: "22px" } as CSSProperties,
    dropCardStyle: {
      cursor: "pointer",
      minHeight: "180px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      borderRadius: "18px",
      border: s.dragging ? "2px dashed " + th.accent : "2px dashed #D8CFC2",
      background: s.dragging ? th.accentSoft : "#FBF9F7",
      transition: "background 140ms ease, border-color 140ms ease",
    } as CSSProperties,
    dropIconBg: th.accentSoft,
    dropTitle: s.dragging ? "Drop to upload" : "Upload files",

    // brand kit
    logoTiles,
    urlSuggestions,
    extractSteps,
    isThemed,
    brandName: th.brand,
    sourceUrl: th.sourceUrl || "",
    accent: th.accent,
    accentText: th.accentText,
    accentSoft: th.accentSoft,
    cardSurface: th.surface,
    cardInk: th.ink,
    cardMuted: th.muted,
    cardBrand: th.cardBrand,
    cardWordmark: th.wordmark,
    fontName: th.font,
    fontNote: th.fontNote,
    wordmarkNote: th.wordmarkNote,
    showWordmark: !isThemed,
    showBrandWord: isThemed,
    colorCaption: th.colorCaption,
    logoCaption: isThemed ? "Extracted · " + th.brand : "4 marks",
    kitChipBg: isThemed ? th.accentSoft : "#F3EEEB",
    kitChipBorder: isThemed ? hexA(th.accent, 0.3) : "#E0D9CF",
    urlBorder: s.urlInput ? hexA(th.accent, 0.4) : "#E0D9CF",
    urlInput: s.urlInput,
    onUrlInput: (e: React.ChangeEvent<HTMLInputElement>) => setState({ urlInput: e.target.value }),
    onUrlKey: (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        extractBrand();
      }
    },
    extractBrand: () => extractBrand(),
    revertBrand: () => revertBrand(),
    extracting: s.extracting,
    extractHost: s.extractHost,
    extractBarStyle: { height: "100%", width: "100%", background: "linear-gradient(90deg,#FF5B10,#FF8A4D)", transformOrigin: "left", animation: "biaShimmer 1.3s linear infinite", backgroundSize: "200% 100%" } as CSSProperties,

    // review
    version: s.version,
    heroImage: (s.version === 2 ? s.heroV2 || s.heroV1 : s.heroV1) || undefined,
    regenerating: s.regenerating,
    comments,
    commentCount: s.comments.length,
    resolvedCount,
    showPending: !!s.pendingPin,
    pendingPin: s.pendingPin || { x: 0, y: 0 },
    nextNum: s.comments.length + 1,
    cDraft: s.cDraft,
    onCDraftInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => setState({ cDraft: e.target.value }),
    tagBia: s.tagBia,
    toggleTag: () => toggleTag(),
    quickFill: () => quickFill(),
    onStageClick: (e: React.MouseEvent) => onStageClick(e),
    cancelPin: () => cancelPin(),
    postComment: () => postComment(),
    onStageDown: (e: React.MouseEvent) => onStageDown(e),
    zoomIn: () => zoomBtn(1.25),
    zoomOut: () => zoomBtn(0.8),
    fitView: () => fitView(),
    zoomLabel: Math.round(s.zoom * 100) + "%",
    invZoom: Math.round((1 / s.zoom) * 1000) / 1000,
    canvasStyle: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", transform: "translate(" + s.panX + "px," + s.panY + "px) scale(" + s.zoom + ")", transformOrigin: "0 0" } as CSSProperties,
    tagBg: s.tagBia ? "#FFE9DF" : "#fff",
    tagFg: s.tagBia ? "#FF5B10" : "#565657",
    tagBorder: s.tagBia ? "#FDD7CD" : "#E0D9CF",
    setV1: () => setVersion(1),
    setV2: () => setVersion(2),
    v1bg: s.version === 1 ? "#1D1D1D" : "transparent",
    v1fg: s.version === 1 ? "#fff" : "#565657",
    v2bg: s.version === 2 ? "#1D1D1D" : "transparent",
    v2fg: s.version === 2 ? "#fff" : "#565657",
    openShare: () => openShare(),
    closeShare: () => closeShare(),
    stop: (e: React.MouseEvent) => stop(e),
    copyLink: () => copyLink(),
    approve: () => approve(),
    showShare: s.showShare,

    // toast
    hasToast: !!s.toast,
    toast: s.toast,

    // surface switchers
    swSlackBg: s.surface === "slack" ? "#FF5B10" : "transparent",
    swSlackFg: s.surface === "slack" ? "#fff" : "#B5B8BC",
    swWebBg: s.surface === "web" ? "#FF5B10" : "transparent",
    swWebFg: s.surface === "web" ? "#fff" : "#B5B8BC",
    wSlackBg: s.surface === "slack" ? "#FF5B10" : "transparent",
    wSlackFg: s.surface === "slack" ? "#fff" : "#565657",
    wWebBg: s.surface === "web" ? "#1D1D1D" : "transparent",
    wWebFg: s.surface === "web" ? "#fff" : "#565657",
  };
}

export type Vals = ReturnType<typeof useBia>;
