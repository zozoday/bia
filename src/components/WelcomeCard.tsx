import type { CSSProperties } from "react";
import { res } from "../bia/assets";

export interface WelcomeCardProps {
  version?: number;
  accent?: string;
  accentText?: string;
  surface?: string;
  ink?: string;
  muted?: string;
  brand?: string;
  wordmark?: boolean;
  /** A Fal-generated hero image URL. Falls back to the bundled grain when absent. */
  heroImage?: string;
}

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

/**
 * The actual asset Bia creates and reviews — a theme-driven welcome card.
 * Ported from WelcomeCard.dc.html. Sizes itself to its container using CSS
 * container-query units (cqw), so it renders crisply at any mount size.
 */
export default function WelcomeCard(props: WelcomeCardProps) {
  const v = Number(props.version ?? 1);
  const accent = props.accent || "#FF5B10";
  const accentText = props.accentText || "#000000";
  const surface = props.surface || "#F6F2EF";
  const ink = props.ink || "#000000";
  const muted = props.muted || "#565657";
  const brand = props.brand || "magic lantern";
  const wm = !(props.wordmark === false);
  const initial = ((brand || "M").trim()[0] || "M").toUpperCase();
  const v2 = v === 2;

  const outerBg = v2 ? accent : surface;
  const circleBg = v2 ? "#FFFFFF" : accent;
  const markSrc = v2
    ? res("markOrange", "/assets/mark-orange.svg")
    : res("markWhite", "/assets/mark-white.svg");
  const heroImg = props.heroImage || res("heroGrain", "/assets/hero-grain.png");
  const initialColor = v2 ? accent : accentText;
  const bigColor = v2 ? accentText : ink;
  const eyebrowColor = v2 ? hexA(accentText, 0.82) : accent;
  const metaColor = v2 ? hexA(accentText, 0.78) : muted;
  const wordmarkColor = v2 ? accentText : "#000000";
  const brandColor = v2 ? accentText : ink;

  const imgStyle: CSSProperties = v2
    ? {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        mixBlendMode: "luminosity",
        opacity: 0.92,
      }
    : {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      };

  const overlayStyle: CSSProperties = v2
    ? {
        position: "absolute",
        inset: 0,
        background: `linear-gradient(90deg, ${accent} 0%, ${hexA(accent, 0.12)} 38%, transparent 60%)`,
      }
    : {
        position: "absolute",
        inset: 0,
        boxShadow: `inset 7cqw 0 9cqw -4cqw ${surface}`,
      };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        containerType: "size",
        display: "flex",
        background: outerBg,
        overflow: "hidden",
        fontFamily: "'Poppins',sans-serif",
        letterSpacing: "-0.04em",
      }}
    >
      <div
        style={{
          flex: "1 1 60%",
          padding: "7cqw 6cqw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "2.4cqw" }}>
          <div
            style={{
              width: "7cqw",
              height: "7cqw",
              borderRadius: "9999px",
              background: circleBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: "none",
            }}
          >
            {wm ? (
              <img
                src={markSrc}
                alt=""
                style={{ width: "55%", height: "55%", objectFit: "contain" }}
              />
            ) : (
              <span
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontWeight: 700,
                  fontSize: "3.6cqw",
                  letterSpacing: "-0.04em",
                  color: initialColor,
                }}
              >
                {initial}
              </span>
            )}
          </div>
          {wm ? (
            <span
              style={{
                fontFamily: "'iBrands Ligature',serif",
                fontSize: "4.4cqw",
                letterSpacing: "-0.08em",
                color: wordmarkColor,
              }}
            >
              magic lantern
            </span>
          ) : (
            <span
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontWeight: 600,
                fontSize: "4cqw",
                letterSpacing: "-0.05em",
                color: brandColor,
              }}
            >
              {brand}
            </span>
          )}
        </div>
        <div>
          <div
            style={{
              fontSize: "2.6cqw",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: eyebrowColor,
              marginBottom: "2.5cqw",
            }}
          >
            Welcome aboard
          </div>
          <div
            style={{
              fontSize: "11cqw",
              fontWeight: 700,
              lineHeight: 0.98,
              color: bigColor,
            }}
          >
            Welcome,
            <br />
            Maya.
          </div>
        </div>
        <div style={{ fontSize: "3cqw", fontWeight: 500, color: metaColor }}>
          Design team&nbsp;&nbsp;·&nbsp;&nbsp;Joined June 2026
        </div>
      </div>
      <div style={{ flex: "1 1 40%", position: "relative", overflow: "hidden" }}>
        <img src={heroImg} alt="" style={imgStyle} />
        <div style={overlayStyle} />
      </div>
    </div>
  );
}
