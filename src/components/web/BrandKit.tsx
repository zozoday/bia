import { res } from "../../bia/assets";
import type { Vals } from "../../bia/useBia";

const mark = res("markWhite");

export default function BrandKit({ v }: { v: Vals }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "34px 40px 60px", position: "relative" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 40, fontWeight: 600, letterSpacing: "-0.04em" }}>Brand kit</h1>
          <div style={{ color: "#6D6B6B", fontSize: 15, marginTop: 6, maxWidth: 520 }}>Bia pulls from this kit on every asset it makes — so everything ships on-brand, automatically.</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 9px 7px 16px", borderRadius: 9999, background: v.kitChipBg, border: `1px solid ${v.kitChipBorder}` }}>
          <span style={{ width: 9, height: 9, borderRadius: "50%", background: v.accent }} />
          <span style={{ fontSize: 13, fontWeight: 600 }}>{v.brandName}</span>
          {v.isThemed && <span style={{ fontSize: 12, color: "#969496" }}>· from {v.sourceUrl}</span>}
        </div>
      </div>

      {/* EXTRACT FROM URL */}
      <div style={{ marginTop: 24, background: "#fff", border: "1px solid #E0D9CF", borderRadius: 18, padding: "20px 22px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF5B10" strokeWidth="1.8">
            <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
            <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
          </svg>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Extract a brand kit from a URL</div>
        </div>
        <div style={{ fontSize: 14, color: "#6D6B6B", marginTop: 6, maxWidth: 620 }}>Paste any website. Bia reads its logo, palette, and type — then re-skins your kit and every asset in the library to match. Revert anytime.</div>
        <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 260, display: "flex", alignItems: "center", gap: 10, background: "#F6F2EF", border: `1px solid ${v.urlBorder}`, borderRadius: 9999, padding: "11px 18px" }}>
            <span style={{ color: "#969496", fontSize: 14 }}>https://</span>
            <input value={v.urlInput} onChange={v.onUrlInput} onKeyDown={v.onUrlKey} placeholder="stripe.com" style={{ flex: 1, minWidth: 0, background: "transparent", border: "none", outline: "none", fontFamily: "inherit", fontSize: 14, letterSpacing: "-0.02em", color: "#1D1D1D" }} />
          </div>
          <button onClick={v.extractBrand} style={{ cursor: "pointer", border: "none", background: "#FF5B10", color: "#fff", fontFamily: "inherit", fontWeight: 600, fontSize: 14, padding: "11px 22px", borderRadius: 9999, display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>{" "}
            Extract
          </button>
          {v.isThemed && (
            <button onClick={v.revertBrand} style={{ cursor: "pointer", background: "#fff", border: "1px solid #E0D9CF", color: "#1D1D1D", fontFamily: "inherit", fontWeight: 600, fontSize: 14, padding: "11px 20px", borderRadius: 9999, display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5" />
              </svg>{" "}
              Revert to Magic Lantern
            </button>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, color: "#A5A3A4" }}>Try:</span>
          {v.urlSuggestions.map((u) => (
            <button key={u.label} onClick={u.onClick} style={{ cursor: "pointer", background: "#F6F2EF", border: "1px solid #E0D9CF", color: "#565657", fontFamily: "inherit", fontSize: 13, fontWeight: 500, padding: "6px 13px", borderRadius: 9999 }}>
              {u.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 10 }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Logos</h3>
        <span style={{ fontSize: 13, color: "#A5A3A4" }}>{v.logoCaption}</span>
      </div>
      <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 16 }}>
        {v.logoTiles.map((g, i) => (
          <div key={i} style={g.tileStyle}>
            {g.isMark && <img src={g.src} alt="" style={{ width: "42%" }} />}
            {g.isInitial && <span style={g.initialStyle}>{g.initial}</span>}
          </div>
        ))}
        <div style={{ background: "#fff", border: "1.5px dashed #C1BFC3", borderRadius: 16, aspectRatio: "1", display: "flex", flexDirection: "column", gap: 6, alignItems: "center", justifyContent: "center", color: "#A5A3A4", fontSize: 13, cursor: "pointer" }}>
          <span style={{ fontSize: 24, fontWeight: 300 }}>+</span>Upload
        </div>
      </div>

      <div style={{ marginTop: 36, display: "flex", alignItems: "center", gap: 10 }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Colors</h3>
        <span style={{ fontSize: 13, color: "#A5A3A4" }}>{v.colorCaption}</span>
      </div>
      <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(170px,1fr))", gap: 16 }}>
        {v.swatches.map((sw, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E0D9CF", borderRadius: 14, overflow: "hidden" }}>
            <div style={{ height: 78, background: sw.hex, borderBottom: "1px solid rgba(0,0,0,0.06)" }} />
            <div style={{ padding: "11px 13px" }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{sw.name}</div>
              <div style={{ fontSize: 12, color: "#969496", fontFamily: "'Poppins'", marginTop: 2 }}>{sw.hex}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 36 }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Typography</h3>
      </div>
      <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: "#fff", border: "1px solid #E0D9CF", borderRadius: 16, padding: "22px 24px" }}>
          <div style={{ fontSize: 12, color: "#A5A3A4", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Display · UI · Body</div>
          <div style={{ fontSize: 46, fontWeight: 600, letterSpacing: "-0.04em", marginTop: 8 }}>{v.fontName}</div>
          <div style={{ fontSize: 14, color: "#6D6B6B", marginTop: 8 }}>{v.fontNote}</div>
        </div>
        <div style={{ background: "#1D1D1D", color: "#fff", border: "1px solid #1D1D1D", borderRadius: 16, padding: "22px 24px" }}>
          <div style={{ fontSize: 12, color: "#9A9DA1", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Wordmark</div>
          {v.showWordmark && <div style={{ fontFamily: "'iBrands Ligature',serif", fontSize: 46, letterSpacing: "-0.08em", marginTop: 8 }}>magic lantern</div>}
          {v.showBrandWord && <div style={{ fontSize: 46, fontWeight: 700, letterSpacing: "-0.05em", marginTop: 8, color: v.accent }}>{v.brandName}</div>}
          <div style={{ fontSize: 14, color: "#B5B8BC", marginTop: 8 }}>{v.wordmarkNote}</div>
        </div>
      </div>

      {/* EXTRACTION OVERLAY */}
      {v.extracting && (
        <div style={{ position: "absolute", inset: 0, zIndex: 30, background: "rgba(246,242,239,0.78)", backdropFilter: "blur(3px)", display: "flex", alignItems: "center", justifyContent: "center", animation: "biaFade 200ms ease both" }}>
          <div style={{ width: 420, maxWidth: "88%", background: "#fff", border: "1px solid #E0D9CF", borderRadius: 22, boxShadow: "0 30px 80px rgba(0,0,0,0.18)", padding: "28px 30px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#FF5B10", display: "flex", alignItems: "center", justifyContent: "center", flex: "none", animation: "biaPulse 1.4s infinite" }}>
                <img src={mark} style={{ width: "54%", height: "54%" }} />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>Reading {v.extractHost}</div>
                <div style={{ fontSize: 13, color: "#969496" }}>Bia is extracting the brand kit…</div>
              </div>
            </div>
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
              {v.extractSteps.map((es, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: es.color }}>
                  <span style={es.dotStyle} />
                  {es.label}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 18, height: 8, borderRadius: 6, overflow: "hidden", background: "#F3EEEB" }}>
              <div style={v.extractBarStyle} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
