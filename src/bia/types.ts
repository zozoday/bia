export type Surface = "slack" | "web";
export type WebView = "library" | "review" | "brandkit" | "brandvoice" | "team";

export interface Swatch {
  name: string;
  hex: string;
}

export interface Theme {
  id: string;
  brand: string;
  cardBrand: string;
  wordmark: boolean;
  accent: string;
  accentText: string;
  accentSoft: string;
  surface: string;
  ink: string;
  muted: string;
  font: string;
  fontNote: string;
  wordmarkNote: string;
  sourceUrl: string | null;
  palette: Swatch[];
  colorCaption: string;
}

export type MsgRole = "user" | "bia";
export type MsgKind = "text" | "generating" | "card";

export interface Msg {
  id: string;
  role: MsgRole;
  kind: MsgKind;
  time: string;
  text?: string;
  genLabel?: string;
  cardVersion?: number;
  cardMeta?: string;
  isEdit?: boolean;
}

export interface Reply {
  id: string;
  isBia: boolean;
  working: boolean;
  time: string;
  text: string;
}

export interface Comment {
  id: string;
  num: number;
  author: string;
  initials: string;
  avatarBg: string;
  time: string;
  text: string;
  tagsBia: boolean;
  x: number;
  y: number;
  resolved: boolean;
  replies: Reply[];
}

export type UploadKind = "image" | "video" | "doc";

export interface Upload {
  id: string;
  name: string;
  kind: UploadKind;
  url: string | null;
  typeLabel: string;
}

export interface Pin {
  x: number;
  y: number;
}

export interface ScriptTurn {
  text: string;
  sugg: string[];
  card?: boolean;
}

export interface BiaState {
  surface: Surface;
  webView: WebView;
  selectedAsset: string;
  msgs: Msg[];
  step: number;
  typing: boolean;
  composer: string;
  suggestions: string[];
  version: number;
  regenerating: boolean;
  justUpdated: boolean;
  pendingPin: Pin | null;
  cDraft: string;
  tagBia: boolean;
  activeComment: string;
  comments: Comment[];
  showShare: boolean;
  toast: string | null;
  zoom: number;
  panX: number;
  panY: number;
  theme: Theme;
  urlInput: string;
  extracting: boolean;
  extractHost: string;
  uploads: Upload[];
  dragging: boolean;
  cardReady: boolean;
  slackV: number;
}
