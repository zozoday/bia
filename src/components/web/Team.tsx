import type { Vals } from "../../bia/useBia";

function Toggle() {
  return (
    <span style={{ width: 40, height: 23, borderRadius: 9999, background: "#FF5B10", position: "relative", flex: "none" }}>
      <span style={{ position: "absolute", top: 2.5, right: 2.5, width: 18, height: 18, borderRadius: "50%", background: "#fff" }} />
    </span>
  );
}

export default function Team({ v }: { v: Vals }) {
  const cols = "2.2fr 1.3fr 1fr 0.9fr";
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "34px 40px 60px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 40, fontWeight: 600, letterSpacing: "-0.04em" }}>Team &amp; access</h1>
          <div style={{ color: "#6D6B6B", fontSize: 15, marginTop: 6 }}>Control who can invoke Bia, and what each person can do with assets.</div>
        </div>
        <button style={{ cursor: "pointer", background: "#1D1D1D", border: "none", color: "#fff", fontFamily: "inherit", fontWeight: 600, fontSize: 14, padding: "11px 18px", borderRadius: 9999 }}>Invite people</button>
      </div>

      <div style={{ marginTop: 26, background: "#fff", border: "1px solid #E0D9CF", borderRadius: 18, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: cols, padding: "14px 22px", borderBottom: "1px solid #E0D9CF", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "#A5A3A4" }}>
          <div>Member</div>
          <div>Role</div>
          <div>Bia access</div>
          <div>Last active</div>
        </div>
        {v.team.map((t) => (
          <div key={t.email} style={{ display: "grid", gridTemplateColumns: cols, alignItems: "center", padding: "14px 22px", borderBottom: "1px solid #F3EEEB" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: t.bg, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, flex: "none" }}>{t.initials}</div>
              <div style={{ lineHeight: 1.15, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: "#969496" }}>{t.email}</div>
              </div>
            </div>
            <div>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#1D1D1D", border: "1px solid #E0D9CF", borderRadius: 9999, padding: "6px 13px", display: "inline-flex", alignItems: "center", gap: 6 }}>
                {t.role} <span style={{ color: "#A5A3A4", fontSize: 10 }}>▾</span>
              </span>
            </div>
            <div>
              <span style={{ fontSize: 12, fontWeight: 600, padding: "5px 11px", borderRadius: 9999, background: t.biaBg, color: t.biaFg }}>{t.bia}</span>
            </div>
            <div style={{ fontSize: 13, color: "#969496" }}>{t.active}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <div style={{ background: "#fff", border: "1px solid #E0D9CF", borderRadius: 16, padding: "22px 24px" }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Bia permissions</div>
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 14 }}>
            {["Listens in #design, #marketing", "Anyone can invoke Bia", "Brand-lock — block off-brand exports"].map((label) => (
              <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 14 }}>{label}</span>
                <Toggle />
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #E0D9CF", borderRadius: 16, padding: "22px 24px" }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Roles</div>
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 11, fontSize: 14, color: "#565657" }}>
            <div><b style={{ color: "#1D1D1D" }}>Admin</b> — manage brand kit, voice, and people.</div>
            <div><b style={{ color: "#1D1D1D" }}>Editor</b> — create with Bia, edit and approve assets.</div>
            <div><b style={{ color: "#1D1D1D" }}>Reviewer</b> — comment and request Bia edits.</div>
            <div><b style={{ color: "#1D1D1D" }}>Viewer</b> — view and download approved assets.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
