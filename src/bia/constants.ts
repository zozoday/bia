import type { ScriptTurn, Theme } from "./types";

export const DEFAULT_THEME: Theme = {
  id: "default",
  brand: "Magic Lantern",
  cardBrand: "magic lantern",
  wordmark: true,
  accent: "#FF5B10",
  accentText: "#000000",
  accentSoft: "#FFE9DF",
  surface: "#F6F2EF",
  ink: "#000000",
  muted: "#565657",
  font: "Poppins",
  fontNote:
    "Medium 500 is the default. Tight tracking everywhere. Aa Bb Cc 1234567890",
  wordmarkNote: "iBrands Ligature — reserved exclusively for the wordmark.",
  sourceUrl: null,
  palette: [
    { name: "Lantern Orange", hex: "#FF5B10" },
    { name: "Black", hex: "#000000" },
    { name: "Obsidian", hex: "#1D1D1D" },
    { name: "Stone", hex: "#F6F2EF" },
    { name: "Stone 300", hex: "#E0D9CF" },
    { name: "Ember", hex: "#FFE9DF" },
  ],
  colorCaption: "Lead with orange · warm neutrals",
};

export const PRESETS: Record<string, Theme> = {
  "stripe.com": {
    id: "stripe",
    brand: "Stripe",
    cardBrand: "Stripe",
    wordmark: false,
    accent: "#635BFF",
    accentText: "#FFFFFF",
    accentSoft: "#ECEBFF",
    surface: "#FFFFFF",
    ink: "#0A2540",
    muted: "#425466",
    font: "Söhne",
    fontNote: "Clean grotesque. Tight, neutral, engineered. Aa Bb Cc 1234567890",
    wordmarkNote: "Set in the brand sans, all caps avoided.",
    colorCaption: "Indigo lead · cool neutrals",
    sourceUrl: null,
    palette: [
      { name: "Indigo", hex: "#635BFF" },
      { name: "Ink", hex: "#0A2540" },
      { name: "Sky", hex: "#00D4FF" },
      { name: "Slate", hex: "#425466" },
      { name: "Cloud", hex: "#F6F9FC" },
      { name: "Line", hex: "#E3E8EE" },
    ],
  },
  "linear.app": {
    id: "linear",
    brand: "Linear",
    cardBrand: "Linear",
    wordmark: false,
    accent: "#5E6AD2",
    accentText: "#FFFFFF",
    accentSoft: "#ECEDFB",
    surface: "#FFFFFF",
    ink: "#08090A",
    muted: "#6B6F76",
    font: "Inter",
    fontNote:
      "Precise UI sans. High legibility at small sizes. Aa Bb Cc 1234567890",
    wordmarkNote: "Lowercase, tight tracking, brand indigo.",
    colorCaption: "Indigo lead · graphite neutrals",
    sourceUrl: null,
    palette: [
      { name: "Indigo", hex: "#5E6AD2" },
      { name: "Near-black", hex: "#08090A" },
      { name: "Violet", hex: "#7170FF" },
      { name: "Mercury", hex: "#E6E6E6" },
      { name: "Smoke", hex: "#F4F5F8" },
      { name: "Snow", hex: "#FFFFFF" },
    ],
  },
  "spotify.com": {
    id: "spotify",
    brand: "Spotify",
    cardBrand: "Spotify",
    wordmark: false,
    accent: "#1DB954",
    accentText: "#000000",
    accentSoft: "#D8F5E3",
    surface: "#FFFFFF",
    ink: "#121212",
    muted: "#535353",
    font: "Circular",
    fontNote: "Geometric, friendly, rounded. Aa Bb Cc 1234567890",
    wordmarkNote: "Bold, tight, brand green.",
    colorCaption: "Green lead · blackout neutrals",
    sourceUrl: null,
    palette: [
      { name: "Green", hex: "#1DB954" },
      { name: "Black", hex: "#121212" },
      { name: "Bright Green", hex: "#1ED760" },
      { name: "Ash", hex: "#535353" },
      { name: "Smoke", hex: "#B3B3B3" },
      { name: "White", hex: "#FFFFFF" },
    ],
  },
};

export const GENERIC_POOL = [
  "#3B82F6",
  "#10B981",
  "#8B5CF6",
  "#EF4444",
  "#F59E0B",
  "#EC4899",
  "#14B8A6",
  "#6366F1",
];

export const SCRIPT_TURNS: ScriptTurn[] = [
  {
    text: "Love it — a welcome card. Who are we welcoming, and which team are they joining?",
    sugg: ["Maya Chen, joining Design", "Someone else"],
  },
  {
    text: "Maya Chen, Design — nice. What should it feel like? I can go warm and editorial, or bold and graphic.",
    sugg: ["Warm & editorial", "Bold & graphic"],
  },
  {
    text: "On it. I'll use your brand kit — Stone ground, Lantern Orange accent, Poppins Medium — and render a 1200×630 welcome card.",
    sugg: [],
    card: true,
  },
];

export const EDIT_CHIPS = [
  "Make it bold — orange ground",
  "Soften it — warm & light",
  "More contrast on the type",
];

export interface TeamMember {
  name: string;
  email: string;
  initials: string;
  bg: string;
  role: string;
  bia: string;
  biaBg: string;
  biaFg: string;
  active: string;
}

export const TEAM: TeamMember[] = [
  { name: "Sana Okafor", email: "sana@magiclantern.studio", initials: "SO", bg: "#0019FF", role: "Admin", bia: "Full", biaBg: "#FFE9DF", biaFg: "#FF5B10", active: "now" },
  { name: "Devin Rao", email: "devin@magiclantern.studio", initials: "DR", bg: "#1D1D1D", role: "Editor", bia: "Full", biaBg: "#FFE9DF", biaFg: "#FF5B10", active: "2h" },
  { name: "Maya Chen", email: "maya@magiclantern.studio", initials: "MC", bg: "#FF5B10", role: "Reviewer", bia: "Comment", biaBg: "#F3EEEB", biaFg: "#565657", active: "1d" },
  { name: "Jonah Pace", email: "jonah@magiclantern.studio", initials: "JP", bg: "#2BAC76", role: "Viewer", bia: "None", biaBg: "#F3EEEB", biaFg: "#969496", active: "3d" },
  { name: "Priya Nair", email: "priya@magiclantern.studio", initials: "PN", bg: "#7A3DFF", role: "Editor", bia: "Full", biaBg: "#FFE9DF", biaFg: "#FF5B10", active: "5d" },
];

export interface SharePerson {
  isPerson?: boolean;
  isBia?: boolean;
  name: string;
  sub: string;
  initials?: string;
  bg?: string;
  role: string;
}

export const SHARE_LIST: SharePerson[] = [
  { isPerson: true, name: "Sana Okafor", sub: "sana@magiclantern.studio", initials: "SO", bg: "#0019FF", role: "Owner" },
  { isBia: true, name: "Bia", sub: "AI design agent", role: "Can edit" },
  { isPerson: true, name: "Devin Rao", sub: "devin@magiclantern.studio", initials: "DR", bg: "#1D1D1D", role: "Can edit" },
  { isPerson: true, name: "Design team", sub: "6 people", initials: "D", bg: "#FF5B10", role: "Can comment" },
];
