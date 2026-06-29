import { res } from "../bia/assets";

export default function Toast({ text }: { text: string }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 80,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 60,
        background: "#1D1D1D",
        color: "#fff",
        fontSize: 14,
        fontWeight: 500,
        padding: "13px 20px",
        borderRadius: 9999,
        boxShadow: "0 14px 40px rgba(0,0,0,0.35)",
        display: "flex",
        alignItems: "center",
        gap: 10,
        animation: "biaFade 220ms ease both",
      }}
    >
      <span
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "#FF5B10",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={res("markWhite")} style={{ width: "58%", height: "58%" }} />
      </span>
      {text}
    </div>
  );
}
