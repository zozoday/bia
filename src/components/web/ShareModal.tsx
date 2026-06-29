import { res } from "../../bia/assets";
import type { Vals } from "../../bia/useBia";

const mark = res("markWhite");

export default function ShareModal({ v }: { v: Vals }) {
  return (
    <div onClick={v.closeShare} style={{ position: "absolute", inset: 0, background: "rgba(20,20,20,0.45)", zIndex: 40, display: "flex", alignItems: "center", justifyContent: "center", animation: "biaFade 160ms ease both" }}>
      <div onClick={v.stop} style={{ width: 520, maxWidth: "92%", background: "#fff", borderRadius: 22, boxShadow: "0 30px 80px rgba(0,0,0,0.3)", overflow: "hidden" }}>
        <div style={{ padding: "24px 26px 0" }}>
          <div style={{ fontSize: 20, fontWeight: 600 }}>Share “Welcome — Maya Chen”</div>
          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            <div style={{ flex: 1, border: "1px solid #E0D9CF", borderRadius: 9999, padding: "11px 16px", color: "#A5A3A4", fontSize: 14 }}>Add people or teams…</div>
            <span style={{ border: "1px solid #E0D9CF", borderRadius: 9999, padding: "11px 14px", fontSize: 13, fontWeight: 500, color: "#565657" }}>Can comment ▾</span>
            <button style={{ cursor: "pointer", background: "#FF5B10", border: "none", color: "#fff", fontFamily: "inherit", fontWeight: 600, fontSize: 14, padding: "11px 18px", borderRadius: 9999 }}>Invite</button>
          </div>
        </div>
        <div style={{ padding: "18px 26px 8px", display: "flex", flexDirection: "column", gap: 4 }}>
          {v.shareList.map((p) => (
            <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0" }}>
              {p.isBia && (
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#FF5B10", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                  <img src={mark} style={{ width: "54%", height: "54%" }} />
                </div>
              )}
              {p.isPerson && (
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: p.bg, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, flex: "none" }}>{p.initials}</div>
              )}
              <div style={{ lineHeight: 1.15, minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: "#969496" }}>{p.sub}</div>
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#565657" }}>{p.role}</span>
            </div>
          ))}
        </div>
        <div style={{ margin: "8px 26px 0", padding: "16px 0", borderTop: "1px solid #F3EEEB", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#F3EEEB", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#565657" strokeWidth="1.7">
              <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
              <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
            </svg>
          </div>
          <div style={{ lineHeight: 1.15, flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Anyone with the link</div>
            <div style={{ fontSize: 12, color: "#969496" }}>Can comment · expires in 30 days</div>
          </div>
          <button onClick={v.copyLink} style={{ cursor: "pointer", background: "#1D1D1D", border: "none", color: "#fff", fontFamily: "inherit", fontWeight: 600, fontSize: 13, padding: "9px 16px", borderRadius: 9999 }}>Copy link</button>
        </div>
        <div style={{ padding: "8px 26px 24px", display: "flex", justifyContent: "flex-end" }}>
          <button onClick={v.closeShare} style={{ cursor: "pointer", background: "transparent", border: "1px solid #E0D9CF", color: "#1D1D1D", fontFamily: "inherit", fontWeight: 600, fontSize: 14, padding: "10px 22px", borderRadius: 9999 }}>Done</button>
        </div>
      </div>
    </div>
  );
}
