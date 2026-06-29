import { res } from "../../bia/assets";
import type { Vals } from "../../bia/useBia";

const mark = res("markWhite");

export default function Sidebar({ v }: { v: Vals }) {
  return (
    <div
      style={{
        width: 244,
        flex: "none",
        background: "#FFFFFF",
        borderRight: "1px solid #E0D9CF",
        display: "flex",
        flexDirection: "column",
        padding: "18px 14px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 8px 18px" }}>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#FF5B10", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
          <img src={mark} style={{ width: "54%", height: "54%" }} />
        </div>
        <div style={{ lineHeight: 1.05 }}>
          <div style={{ fontWeight: 600, fontSize: 17 }}>Bia</div>
          <div style={{ fontSize: 11, color: "#969496" }}>by magic lantern</div>
        </div>
      </div>

      <button
        onClick={v.goSlack}
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer", background: "#FF5B10", color: "#fff", border: "none", fontFamily: "inherit", fontWeight: 600, fontSize: 14, padding: 11, borderRadius: 9999, marginBottom: 18 }}
      >
        + New with Bia
      </button>

      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#A5A3A4", padding: "6px 10px" }}>Library</div>
      <div onClick={v.goLibrary} style={{ padding: "9px 10px", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 500, color: v.libColor, background: v.libBg }}>
        All assets
      </div>

      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#A5A3A4", padding: "14px 10px 6px" }}>Workspace</div>
      {v.navWorkspace.map((n) => (
        <div key={n.label} onClick={n.onClick} style={{ padding: "9px 10px", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 500, color: n.color, background: n.bg }}>
          {n.label}
        </div>
      ))}

      {/* surface switcher (light) */}
      <div style={{ marginTop: "auto", display: "flex", gap: 3, background: "#F3EEEB", padding: 3, borderRadius: 9999, marginBottom: 8 }}>
        <button onClick={v.goSlack} style={{ flex: 1, cursor: "pointer", border: "none", fontFamily: "inherit", fontSize: 12, fontWeight: 600, letterSpacing: "-0.02em", padding: "7px 0", borderRadius: 9999, background: v.wSlackBg, color: v.wSlackFg }}>
          Slack
        </button>
        <button onClick={v.goWeb} style={{ flex: 1, cursor: "pointer", border: "none", fontFamily: "inherit", fontSize: 12, fontWeight: 600, letterSpacing: "-0.02em", padding: "7px 0", borderRadius: 9999, background: v.wWebBg, color: v.wWebFg }}>
          Bia web app
        </button>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 10, borderTop: "1px solid #E0D9CF" }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#0019FF", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600 }}>SO</div>
        <div style={{ lineHeight: 1.1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Sana Okafor</div>
          <div style={{ fontSize: 11, color: "#969496" }}>Admin</div>
        </div>
        <div onClick={v.goSlack} title="Open in Slack" style={{ marginLeft: "auto", cursor: "pointer", color: "#969496" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M7 17L17 7M17 7H9M17 7v8" />
          </svg>
        </div>
      </div>
    </div>
  );
}
