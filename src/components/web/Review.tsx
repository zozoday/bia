import { res } from "../../bia/assets";
import type { Vals } from "../../bia/useBia";
import WelcomeCard from "../WelcomeCard";

const mark = res("markWhite");

export default function Review({ v }: { v: Vals }) {
  return (
    <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
      {/* stage column */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ height: 62, flex: "none", display: "flex", alignItems: "center", gap: 14, padding: "0 24px", borderBottom: "1px solid #E0D9CF", background: "#fff" }}>
          <button onClick={v.goLibrary} style={{ cursor: "pointer", background: "transparent", border: "none", color: "#565657", display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit", fontSize: 14, fontWeight: 500 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M15 18l-6-6 6-6" />
            </svg>{" "}
            Library
          </button>
          <div style={{ width: 1, height: 24, background: "#E0D9CF" }} />
          <div style={{ fontSize: 16, fontWeight: 600 }}>Welcome — Maya Chen</div>
          <div style={{ display: "flex", gap: 4, marginLeft: 4, background: "#F3EEEB", padding: 3, borderRadius: 9999 }}>
            <button onClick={v.setV1} style={{ cursor: "pointer", border: "none", fontFamily: "inherit", fontSize: 12, fontWeight: 600, padding: "5px 11px", borderRadius: 9999, background: v.v1bg, color: v.v1fg }}>v1</button>
            <button onClick={v.setV2} style={{ cursor: "pointer", border: "none", fontFamily: "inherit", fontSize: 12, fontWeight: 600, padding: "5px 11px", borderRadius: 9999, background: v.v2bg, color: v.v2fg }}>v2</button>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={v.openShare} style={{ cursor: "pointer", background: "#fff", border: "1px solid #E0D9CF", color: "#1D1D1D", fontFamily: "inherit", fontWeight: 600, fontSize: 14, padding: "9px 16px", borderRadius: 9999, display: "flex", alignItems: "center", gap: 7 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <circle cx="18" cy="5" r="2.6" />
                <circle cx="6" cy="12" r="2.6" />
                <circle cx="18" cy="19" r="2.6" />
                <path d="M8.3 10.8l7.4-4.3M8.3 13.2l7.4 4.3" />
              </svg>{" "}
              Share
            </button>
            <button onClick={v.approve} style={{ cursor: "pointer", background: "#1D1D1D", border: "none", color: "#fff", fontFamily: "inherit", fontWeight: 600, fontSize: 14, padding: "10px 18px", borderRadius: 9999 }}>Approve</button>
          </div>
        </div>

        <div ref={v.stageRef} onMouseDown={v.onStageDown} style={{ flex: 1, minHeight: 0, position: "relative", overflow: "hidden", cursor: "grab", userSelect: "none", WebkitUserSelect: "none", backgroundImage: "radial-gradient(circle at 50% 40%, #2A2727 0%, #161616 78%)" }}>
          <div style={v.canvasStyle}>
            <div onClick={v.onStageClick} style={{ position: "relative", width: "min(78%, 720px)", aspectRatio: "40/21", borderRadius: 10, overflow: "hidden", boxShadow: "0 30px 70px rgba(0,0,0,0.5)", cursor: "crosshair" }}>
              <div style={{ width: "100%", height: "100%", pointerEvents: "none" }}>
                <WelcomeCard version={v.version} accent={v.accent} accentText={v.accentText} surface={v.cardSurface} ink={v.cardInk} muted={v.cardMuted} brand={v.cardBrand} wordmark={v.cardWordmark} />
              </div>

              {v.comments.map((c) => (
                <button
                  key={c.id}
                  onClick={c.onFocus}
                  style={{ position: "absolute", left: c.x + "%", top: c.y + "%", transform: `translate(-50%,-50%) scale(${v.invZoom})`, transformOrigin: "center", width: 30, height: 30, borderRadius: "50% 50% 50% 2px", border: "2px solid #fff", background: c.pinBg, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", animation: "biaPop 280ms ease both", boxShadow: "0 4px 12px rgba(0,0,0,0.3)", zIndex: 3 }}
                >
                  {c.num}
                </button>
              ))}

              {v.showPending && (
                <div style={{ position: "absolute", left: v.pendingPin.x + "%", top: v.pendingPin.y + "%", transform: `translate(-50%,-50%) scale(${v.invZoom})`, transformOrigin: "center", width: 30, height: 30, borderRadius: "50% 50% 50% 2px", background: "#FF5B10", border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, zIndex: 4, animation: "biaPulse 1.4s infinite" }}>
                  +
                </div>
              )}

              {v.regenerating && (
                <div style={{ position: "absolute", inset: 0, zIndex: 5, background: "rgba(20,20,20,0.55)", backdropFilter: "blur(2px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, overflow: "hidden" }}>
                  <div style={{ position: "absolute", left: 0, right: 0, height: "36%", background: "linear-gradient(180deg, transparent, rgba(255,91,16,0.32), transparent)", animation: "biaScan 1.5s linear infinite" }} />
                  <div style={{ width: 30, height: 30, borderRadius: "50%", border: "3px solid rgba(255,255,255,0.25)", borderTopColor: "#FF5B10", animation: "biaSpin 0.7s linear infinite" }} />
                  <div style={{ color: "#fff", fontSize: 14, fontWeight: 500, letterSpacing: "-0.02em" }}>Bia is regenerating · applying Lantern Orange</div>
                </div>
              )}
            </div>
          </div>

          {/* hint */}
          <div style={{ position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)", color: "#9A9DA1", fontSize: 13, display: "flex", alignItems: "center", gap: 8, background: "rgba(20,20,20,0.6)", padding: "7px 14px", borderRadius: 9999, backdropFilter: "blur(6px)", pointerEvents: "none" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.5 9 9 0 0 1-4-1L3 20l1-5.5a8.5 8.5 0 1 1 17-3z" />
            </svg>
            Click to comment · tag <span style={{ color: "#FF7A3D", fontWeight: 600 }}>@Bia</span> · drag to pan · pinch to zoom
          </div>

          {/* zoom controls */}
          <div style={{ position: "absolute", top: 16, left: 18, display: "flex", alignItems: "center", gap: 2, background: "rgba(20,20,20,0.82)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9999, padding: 5, boxShadow: "0 8px 26px rgba(0,0,0,0.35)", backdropFilter: "blur(8px)" }}>
            <button className="bia-zoom-btn" onClick={v.zoomOut} title="Zoom out" style={{ cursor: "pointer", border: "none", background: "transparent", color: "#fff", width: 34, height: 34, borderRadius: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14" />
              </svg>
            </button>
            <button className="bia-zoom-btn" onClick={v.fitView} title="Reset to fit" style={{ cursor: "pointer", border: "none", background: "transparent", color: "#fff", fontFamily: "inherit", fontSize: 13, fontWeight: 600, letterSpacing: "-0.02em", minWidth: 52, height: 34, borderRadius: 9999 }}>
              {v.zoomLabel}
            </button>
            <button className="bia-zoom-btn" onClick={v.zoomIn} title="Zoom in" style={{ cursor: "pointer", border: "none", background: "transparent", color: "#fff", width: 34, height: 34, borderRadius: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
            <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.16)", margin: "0 4px" }} />
            <button className="bia-zoom-btn" onClick={v.fitView} title="Fit to screen" style={{ cursor: "pointer", border: "none", background: "transparent", color: "#fff", width: 34, height: 34, borderRadius: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* comments panel */}
      <div style={{ width: 380, flex: "none", background: "#fff", borderLeft: "1px solid #E0D9CF", display: "flex", flexDirection: "column" }}>
        <div style={{ height: 62, flex: "none", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", borderBottom: "1px solid #E0D9CF" }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Comments</div>
          <div style={{ fontSize: 13, color: "#969496" }}>{v.commentCount} · {v.resolvedCount} resolved</div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          {v.comments.map((c) => (
            <div key={c.id} style={{ marginBottom: 14, border: `1px solid ${c.borderColor}`, borderRadius: 14, padding: 14, background: c.cardBg, animation: "biaFade 240ms ease both" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: c.pinBg, color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>{c.num}</div>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: c.avatarBg, color: "#fff", fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>{c.initials}</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{c.author}</div>
                <div style={{ fontSize: 12, color: "#A5A3A4", marginLeft: "auto" }}>{c.time}</div>
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.5, color: "#1D1D1D", marginTop: 9 }}>{c.text}</div>

              {c.replies.map((r) => (
                <div key={r.id} style={{ marginTop: 11, paddingLeft: 12, borderLeft: "2px solid #F3EEEB", display: "flex", gap: 9 }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#FF5B10", flex: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src={mark} style={{ width: "56%", height: "56%" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>Bia <span style={{ fontWeight: 500, color: "#A5A3A4" }}>· {r.time}</span></div>
                    {r.working ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 4, color: "#FF7A3D", fontSize: 13 }}>
                        <span style={{ width: 13, height: 13, borderRadius: "50%", border: "2px solid rgba(255,91,16,0.3)", borderTopColor: "#FF5B10", display: "inline-block", animation: "biaSpin .7s linear infinite" }} />
                        {r.text}
                      </div>
                    ) : (
                      <div style={{ fontSize: 13, lineHeight: 1.5, color: "#565657", marginTop: 3 }}>{r.text}</div>
                    )}
                  </div>
                </div>
              ))}

              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
                <button onClick={c.onResolve} style={{ cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 600, padding: "6px 12px", borderRadius: 9999, border: `1px solid ${c.resolveBorder}`, background: c.resolveBg, color: c.resolveFg, display: "flex", alignItems: "center", gap: 6 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {c.resolveLabel}
                </button>
              </div>
            </div>
          ))}
          <div style={{ height: 4 }} />
        </div>

        {/* comment composer */}
        {v.showPending && (
          <div style={{ flex: "none", borderTop: "1px solid #E0D9CF", padding: "14px 16px", background: "#FBF9F7", animation: "biaFade 200ms ease both" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 22, height: 22, borderRadius: "50% 50% 50% 2px", background: "#FF5B10", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{v.nextNum}</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>New comment</div>
              <button onClick={v.cancelPin} style={{ marginLeft: "auto", cursor: "pointer", background: "transparent", border: "none", color: "#A5A3A4", fontFamily: "inherit", fontSize: 13 }}>Cancel</button>
            </div>
            <textarea
              value={v.cDraft}
              onChange={v.onCDraftInput}
              placeholder="Leave a note, or tell Bia what to change…"
              style={{ width: "100%", minHeight: 64, resize: "none", border: "1px solid #E0D9CF", borderRadius: 10, padding: "10px 12px", fontFamily: "inherit", fontSize: 14, letterSpacing: "-0.02em", outline: "none", background: "#fff" }}
            />
            <div onClick={v.quickFill} style={{ cursor: "pointer", marginTop: 8, fontSize: 12, color: "#FF7A3D", fontWeight: 500 }}>＋ @Bia change the background to our Lantern Orange</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
              <button onClick={v.toggleTag} style={{ cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600, padding: "7px 13px", borderRadius: 9999, border: `1px solid ${v.tagBorder}`, background: v.tagBg, color: v.tagFg, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 16, height: 16, borderRadius: "50%", background: "#FF5B10", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  <img src={mark} style={{ width: "60%", height: "60%" }} />
                </span>
                @Bia
              </button>
              <button onClick={v.postComment} style={{ marginLeft: "auto", cursor: "pointer", fontFamily: "inherit", fontWeight: 600, fontSize: 14, padding: "9px 18px", borderRadius: 9999, border: "none", background: "#FF5B10", color: "#fff" }}>Comment</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
