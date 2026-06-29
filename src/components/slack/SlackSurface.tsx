import { res } from "../../bia/assets";
import type { Vals } from "../../bia/useBia";
import WelcomeCard from "../WelcomeCard";

const mark = res("markWhite");
const markOrange = res("markOrange");

export default function SlackSurface({ v }: { v: Vals }) {
  return (
    <div style={{ display: "flex", height: "100%", width: "100%", background: "#1A1D21" }}>
      {/* workspace rail */}
      <div
        style={{
          width: 68,
          flex: "none",
          background: "#15171A",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "14px 0",
          gap: 14,
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 14,
            background: "#FF5B10",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 0 2px rgba(255,255,255,0.18)",
          }}
        >
          <img src={mark} style={{ width: "54%", height: "54%", objectFit: "contain" }} />
        </div>
        {["N", "P"].map((c) => (
          <div
            key={c}
            style={{
              width: 42,
              height: 42,
              borderRadius: 14,
              background: "#2A2D31",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#9A9DA1",
              fontWeight: 600,
              fontSize: 15,
            }}
          >
            {c}
          </div>
        ))}
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 14,
            border: "1.5px dashed rgba(255,255,255,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#9A9DA1",
            fontSize: 22,
            fontWeight: 300,
          }}
        >
          +
        </div>
      </div>

      {/* channel sidebar */}
      <div
        style={{
          width: 248,
          flex: "none",
          background: "#1A1D21",
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            height: 56,
            flex: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            cursor: "pointer",
          }}
        >
          <div style={{ color: "#fff", fontWeight: 600, fontSize: 16 }}>Magic Lantern</div>
          <div style={{ color: "#9A9DA1", fontSize: 11 }}>▾</div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "12px 8px" }}>
          <div style={{ color: "#9A9DA1", fontSize: 13, padding: "6px 12px" }}>Channels</div>
          {["general", "design", "marketing", "launch-room"].map((ch) => (
            <div key={ch} style={{ color: "#B5B8BC", fontSize: 15, padding: "6px 12px", borderRadius: 8 }}>
              #&nbsp;&nbsp;{ch}
            </div>
          ))}
          <div style={{ color: "#9A9DA1", fontSize: 13, padding: "14px 12px 6px" }}>Direct messages</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 12px", borderRadius: 8, background: "#FF5B10" }}>
            <div style={{ width: 22, height: 22, borderRadius: 7, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
              <img src={markOrange} style={{ width: "60%", height: "60%" }} />
            </div>
            <span style={{ color: "#fff", fontWeight: 600, fontSize: 15 }}>Bia</span>
            <span style={{ marginLeft: "auto", fontSize: 9, fontWeight: 600, letterSpacing: "0.06em", background: "rgba(255,255,255,0.22)", color: "#fff", padding: "2px 5px", borderRadius: 4 }}>APP</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 12px", color: "#B5B8BC", fontSize: 15 }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#2BAC76" }} />
            Devin Rao
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 12px", color: "#B5B8BC", fontSize: 15 }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #6A6D71" }} />
            Maya Chen
          </div>
        </div>
        {/* surface switcher (dark) */}
        <div style={{ flex: "none", padding: "10px 12px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", gap: 3, background: "rgba(255,255,255,0.06)", padding: 3, borderRadius: 9999 }}>
            <button onClick={v.goSlack} style={{ flex: 1, cursor: "pointer", border: "none", fontFamily: "inherit", fontSize: 12, fontWeight: 600, letterSpacing: "-0.02em", padding: "7px 0", borderRadius: 9999, background: v.swSlackBg, color: v.swSlackFg }}>
              Slack
            </button>
            <button onClick={v.goWeb} style={{ flex: 1, cursor: "pointer", border: "none", fontFamily: "inherit", fontSize: 12, fontWeight: 600, letterSpacing: "-0.02em", padding: "7px 0", borderRadius: 9999, background: v.swWebBg, color: v.swWebFg }}>
              Bia web app
            </button>
          </div>
        </div>
      </div>

      {/* conversation */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", background: "#1A1D21" }}>
        <div style={{ height: 56, flex: "none", display: "flex", alignItems: "center", gap: 12, padding: "0 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ width: 30, height: 30, borderRadius: 9, background: "#FF5B10", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
            <img src={mark} style={{ width: "56%", height: "56%" }} />
          </div>
          <div style={{ color: "#fff", fontWeight: 600, fontSize: 16 }}>Bia</div>
          <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.06em", background: "#2A2D31", color: "#B5B8BC", padding: "3px 6px", borderRadius: 4 }}>APP</span>
          <div style={{ color: "#9A9DA1", fontSize: 13, marginLeft: 4 }}>Design partner · Active</div>
        </div>

        <div id="bia-conv" ref={v.convRef} style={{ flex: 1, overflowY: "auto", padding: "24px 28px 8px", background: "#1A1D21" }}>
          <div style={{ maxWidth: 760 }}>
            {/* intro divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
              <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.08)" }} />
              <div style={{ color: "#9A9DA1", fontSize: 12 }}>Today</div>
              <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.08)" }} />
            </div>

            {v.msgs.map((m) => (
              <div key={m.id} style={{ display: "flex", gap: 12, padding: "9px 0", animation: "biaFade 240ms ease both" }}>
                {m.isBia && (
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: "#FF5B10", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                    <img src={mark} style={{ width: "56%", height: "56%" }} />
                  </div>
                )}
                {m.isUser && (
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: "#0019FF", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flex: "none", fontWeight: 600, fontSize: 14 }}>
                    SO
                  </div>
                )}
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 9, marginBottom: 3 }}>
                    <span style={{ color: "#fff", fontWeight: 600, fontSize: 15 }}>{m.author}</span>
                    {m.isBia && <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.06em", background: "#2A2D31", color: "#B5B8BC", padding: "2px 5px", borderRadius: 4 }}>APP</span>}
                    <span style={{ color: "#9A9DA1", fontSize: 12 }}>{m.time}</span>
                  </div>
                  {m.isText && (
                    <div style={{ color: "#D7D9DC", fontSize: 15, lineHeight: 1.5, whiteSpace: "pre-line", maxWidth: 620 }}>{m.text}</div>
                  )}
                  {m.isGenerating && (
                    <div style={{ marginTop: 4, maxWidth: 420, border: "1px solid rgba(255,255,255,0.09)", borderRadius: 14, padding: 16, background: "#15171A" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#D7D9DC", fontSize: 14 }}>
                        <span style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(255,91,16,0.3)", borderTopColor: "#FF5B10", display: "inline-block", animation: "biaSpin 0.7s linear infinite" }} />
                        {m.genLabel}
                      </div>
                      <div style={{ marginTop: 12, height: 8, borderRadius: 6, overflow: "hidden", background: "linear-gradient(90deg,#222 25%,#3a3a3a 37%,#222 63%)", backgroundSize: "200% 100%", animation: "biaShimmer 1.3s linear infinite" }} />
                    </div>
                  )}
                  {m.isCard && (
                    <div style={{ marginTop: 6, maxWidth: 430, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, overflow: "hidden", background: "#15171A" }}>
                      <div style={{ width: "100%", aspectRatio: "40/21", position: "relative" }}>
                        <WelcomeCard version={m.cardVersion} accent={v.accent} accentText={v.accentText} surface={v.cardSurface} ink={v.cardInk} muted={v.cardMuted} brand={v.cardBrand} wordmark={v.cardWordmark} heroImage={m.heroUrl} />
                        {m.isEdit && (
                          <div style={{ position: "absolute", top: 10, left: 10, background: "rgba(20,20,20,0.72)", color: "#fff", fontSize: 11, fontWeight: 600, padding: "4px 9px", borderRadius: 9999, backdropFilter: "blur(4px)" }}>
                            ✦ Edited
                          </div>
                        )}
                      </div>
                      <div style={{ padding: "14px 16px" }}>
                        <div style={{ color: "#fff", fontWeight: 600, fontSize: 15 }}>Welcome — Maya Chen.png</div>
                        <div style={{ color: "#9A9DA1", fontSize: 13, marginTop: 2 }}>{m.cardMeta}</div>
                        <div style={{ display: "flex", gap: 9, marginTop: 14, flexWrap: "wrap" }}>
                          <button onClick={v.goReview} style={{ border: "none", cursor: "pointer", background: "#FF5B10", color: "#fff", fontFamily: "inherit", fontWeight: 600, fontSize: 14, letterSpacing: "-0.02em", padding: "10px 16px", borderRadius: 9999 }}>
                            Review in Bia →
                          </button>
                          <button onClick={v.postChannel} style={{ cursor: "pointer", background: "transparent", color: "#D7D9DC", border: "1px solid rgba(255,255,255,0.18)", fontFamily: "inherit", fontWeight: 500, fontSize: 14, padding: "10px 16px", borderRadius: 9999 }}>
                            Post to #design
                          </button>
                          <button onClick={v.regenSlack} style={{ cursor: "pointer", background: "transparent", color: "#D7D9DC", border: "1px solid rgba(255,255,255,0.18)", fontFamily: "inherit", fontWeight: 500, fontSize: 14, padding: "10px 16px", borderRadius: 9999 }}>
                            Regenerate
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {v.typing && (
              <div style={{ display: "flex", gap: 12, padding: "9px 0" }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "#FF5B10", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                  <img src={mark} style={{ width: "56%", height: "56%" }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, height: 38 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#9A9DA1", animation: "biaTyping 1.1s infinite" }} />
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#9A9DA1", animation: "biaTyping 1.1s infinite .18s" }} />
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#9A9DA1", animation: "biaTyping 1.1s infinite .36s" }} />
                </div>
              </div>
            )}

            {v.showInlineSuggestions && (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", padding: "4px 0 6px 50px", animation: "biaFade 240ms ease both" }}>
                {v.suggestions.map((sg) => (
                  <button key={sg.label} onClick={sg.onClick} style={{ cursor: "pointer", background: "rgba(255,91,16,0.1)", color: "#FF7A3D", border: "1px solid rgba(255,91,16,0.32)", fontFamily: "inherit", fontWeight: 500, fontSize: 14, padding: "9px 15px", borderRadius: 9999 }}>
                    {sg.label}
                  </button>
                ))}
              </div>
            )}
            <div style={{ height: 8 }} />
          </div>
        </div>

        {/* composer */}
        <div style={{ flex: "none", padding: "0 28px 22px" }}>
          <div style={{ maxWidth: 760 }}>
            <div style={{ border: "1px solid rgba(255,255,255,0.16)", borderRadius: 14, background: "#222528", overflow: "hidden" }}>
              <div style={{ display: "flex", gap: 14, padding: "8px 14px", borderBottom: "1px solid rgba(255,255,255,0.07)", color: "#9A9DA1", fontSize: 14 }}>
                <span style={{ fontWeight: 700 }}>B</span>
                <span style={{ fontStyle: "italic" }}>i</span>
                <span style={{ textDecoration: "line-through" }}>S</span>
                <span>🔗</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 10, padding: "10px 12px 10px 14px" }}>
                <input
                  value={v.composer}
                  onChange={v.onComposerInput}
                  onKeyDown={v.onComposerKey}
                  placeholder="Message Bia"
                  style={{ flex: 1, minWidth: 0, background: "transparent", border: "none", outline: "none", color: "#fff", fontFamily: "inherit", fontSize: 15, letterSpacing: "-0.02em" }}
                />
                <button onClick={v.sendSlack} style={{ width: 36, height: 36, flex: "none", border: "none", cursor: "pointer", borderRadius: 9, background: "#FF5B10", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19V5" />
                    <path d="M5 12l7-7 7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
