const TAGS = ["Warm", "Confident", "Plainspoken", "Cinematic"];

const SLIDERS = [
  { left: "Formal", right: "Casual", pos: "62%" },
  { left: "Plain", right: "Poetic", pos: "54%" },
  { left: "Reserved", right: "Bold", pos: "70%" },
];

export default function BrandVoice() {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "34px 40px 60px" }}>
      <h1 style={{ margin: 0, fontSize: 40, fontWeight: 600, letterSpacing: "-0.04em" }}>Brand voice</h1>
      <div style={{ color: "#6D6B6B", fontSize: 15, marginTop: 6, maxWidth: 560 }}>Bia writes captions, alt text, and replies in this voice. Confident, warm, a little cinematic — never breathless AI-hype.</div>

      <div style={{ marginTop: 28, display: "flex", gap: 10, flexWrap: "wrap" }}>
        {TAGS.map((t) => (
          <span key={t} style={{ background: "#FFE9DF", color: "#FF5B10", fontSize: 14, fontWeight: 600, padding: "9px 16px", borderRadius: 9999 }}>{t}</span>
        ))}
      </div>

      <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <div style={{ background: "#fff", border: "1px solid #E0D9CF", borderRadius: 16, padding: "22px 24px" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#2BAC76", textTransform: "uppercase", letterSpacing: "0.06em" }}>Do</div>
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 12, fontSize: 15, color: "#1D1D1D", lineHeight: 1.4 }}>
            <div>"Direct the shot. Light the scene. Render it."</div>
            <div>"35mm grain, scanned at 4K."</div>
            <div>Lead with the verb. One idea per line.</div>
          </div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #E0D9CF", borderRadius: 16, padding: "22px 24px" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#C1452F", textTransform: "uppercase", letterSpacing: "0.06em" }}>Don't</div>
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 12, fontSize: 15, color: "#969496", lineHeight: 1.4 }}>
            <div style={{ textDecoration: "line-through" }}>"Unleash the power of AI filmmaking."</div>
            <div style={{ textDecoration: "line-through" }}>"Premium cinematic quality at scale."</div>
            <div style={{ textDecoration: "line-through" }}>Exclamation points. Ever.</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 30, background: "#1D1D1D", color: "#fff", borderRadius: 20, padding: "34px 38px" }}>
        <div style={{ fontSize: 12, color: "#9A9DA1", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Signature phrase</div>
        <div style={{ fontSize: 27, fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1.35, marginTop: 14, maxWidth: 760 }}>Let's embrace the realness of creation — the grain, the bloom, the imperfect edges of a scene.</div>
      </div>

      <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18 }}>
        {SLIDERS.map((sl) => (
          <div key={sl.left} style={{ background: "#fff", border: "1px solid #E0D9CF", borderRadius: 16, padding: "20px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#969496" }}>
              <span>{sl.left}</span>
              <span>{sl.right}</span>
            </div>
            <div style={{ height: 6, background: "#F3EEEB", borderRadius: 9999, marginTop: 10, position: "relative" }}>
              <div style={{ position: "absolute", left: sl.pos, top: "50%", transform: "translate(-50%,-50%)", width: 18, height: 18, borderRadius: "50%", background: "#FF5B10" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
