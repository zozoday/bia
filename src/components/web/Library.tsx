import type { Vals } from "../../bia/useBia";
import WelcomeCard from "../WelcomeCard";

export default function Library({ v }: { v: Vals }) {
  return (
    <div style={{ flex: 1, overflowY: "auto" }}>
      <div style={{ padding: "34px 40px 16px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 40, fontWeight: 600, letterSpacing: "-0.04em" }}>All assets</h1>
          <div style={{ color: "#6D6B6B", fontSize: 15, marginTop: 6 }}>Everything Bia and your team have made — on brand, in one place.</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid #E0D9CF", borderRadius: 9999, padding: "9px 15px", width: 230 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#969496" strokeWidth="1.8">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-3.6-3.6" />
            </svg>
            <span style={{ color: "#A5A3A4", fontSize: 14 }}>Search assets</span>
          </div>
          <button onClick={v.pickFiles} style={{ cursor: "pointer", border: "none", background: "#1D1D1D", color: "#fff", fontFamily: "inherit", fontWeight: 600, fontSize: 14, padding: "11px 18px", borderRadius: 9999, display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 17V5M7 10l5-5 5 5" />
              <path d="M5 19h14" />
            </svg>{" "}
            Upload
          </button>
          <input ref={v.fileRef} type="file" multiple accept="image/*,video/*,application/pdf" onChange={v.onFiles} style={{ display: "none" }} />
        </div>
      </div>
      <div style={{ padding: "8px 40px 14px", display: "flex", gap: 8 }}>
        <span style={{ background: "#1D1D1D", color: "#fff", fontSize: 13, fontWeight: 500, padding: "7px 14px", borderRadius: 9999 }}>All</span>
        {["Images", "Video", "Docs"].map((t) => (
          <span key={t} style={{ background: "#fff", border: "1px solid #E0D9CF", color: "#565657", fontSize: 13, fontWeight: 500, padding: "7px 14px", borderRadius: 9999 }}>
            {t}
          </span>
        ))}
      </div>

      <div onDragOver={v.onDragOver} onDragLeave={v.onDragLeave} onDrop={v.onDrop} style={v.gridStyle}>
        <div onClick={v.pickFiles} style={v.dropCardStyle}>
          <div style={{ width: 46, height: 46, borderRadius: "50%", background: v.dropIconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={v.accent} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 17V5M7 10l5-5 5 5" />
              <path d="M5 19h14" />
            </svg>
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, marginTop: 14 }}>{v.dropTitle}</div>
          <div style={{ fontSize: 13, color: "#969496", marginTop: 4, textAlign: "center", maxWidth: 200 }}>Images, video, and PDFs. Bia tags them to your brand kit on upload.</div>
        </div>

        {v.assets.map((a) => (
          <div key={a.id} className="bia-asset-card" onClick={a.onOpen} style={{ cursor: "pointer", background: "#fff", border: "1px solid #E0D9CF", borderRadius: 18, overflow: "hidden" }}>
            <div style={{ width: "100%", aspectRatio: "40/21", position: "relative", background: "#1D1D1D", overflow: "hidden" }}>
              {a.isHero && (
                <WelcomeCard version={a.version} accent={v.accent} accentText={v.accentText} surface={v.cardSurface} ink={v.cardInk} muted={v.cardMuted} brand={v.cardBrand} wordmark={v.cardWordmark} heroImage={v.heroImage} />
              )}
              {a.isImage && <div style={a.thumbStyle} />}
              {a.isVideo && (
                <>
                  <div style={a.thumbStyle} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 46, height: 46, borderRadius: "50%", background: "rgba(255,255,255,0.92)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#1D1D1D">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div style={{ position: "absolute", bottom: 10, right: 10, background: "rgba(0,0,0,0.66)", color: "#fff", fontSize: 12, fontWeight: 500, padding: "3px 8px", borderRadius: 6 }}>{a.duration}</div>
                </>
              )}
              {a.isDoc && (
                <div style={{ position: "absolute", inset: 0, background: "#F3EEEB", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ position: "relative", width: 88, height: 108 }}>
                    <div style={{ position: "absolute", inset: 0, left: 10, top: 8, background: "#E0D9CF", borderRadius: 6 }} />
                    <div style={{ position: "absolute", inset: 0, left: 5, top: 4, background: "#fff", border: "1px solid #E0D9CF", borderRadius: 6 }} />
                    <div style={{ position: "absolute", inset: 0, background: "#fff", border: "1px solid #C1BFC3", borderRadius: 6, padding: "14px 12px" }}>
                      <div style={{ height: 5, width: "60%", background: v.accent, borderRadius: 3 }} />
                      <div style={{ height: 4, width: "90%", background: "#E0D9CF", borderRadius: 3, marginTop: 9 }} />
                      <div style={{ height: 4, width: "80%", background: "#E0D9CF", borderRadius: 3, marginTop: 6 }} />
                      <div style={{ height: 4, width: "88%", background: "#E0D9CF", borderRadius: 3, marginTop: 6 }} />
                    </div>
                  </div>
                  <div style={{ position: "absolute", bottom: 10, right: 10, background: "#1D1D1D", color: "#fff", fontSize: 12, fontWeight: 500, padding: "3px 8px", borderRadius: 6 }}>{a.pages} pages</div>
                </div>
              )}
            </div>
            <div style={{ padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.03em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.name}</div>
                <span style={{ flex: "none", fontSize: 11, fontWeight: 600, padding: "4px 9px", borderRadius: 9999, background: a.statusBg, color: a.statusFg }}>{a.status}</span>
              </div>
              <div style={{ color: "#969496", fontSize: 13, marginTop: 5, display: "flex", justifyContent: "space-between" }}>
                <span>{a.typeLabel}</span>
                <span>{a.meta}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
