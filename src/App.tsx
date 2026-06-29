import { useBia } from "./bia/useBia";
import SlackSurface from "./components/slack/SlackSurface";
import WebSurface from "./components/web/WebSurface";
import Toast from "./components/Toast";

export default function App() {
  const v = useBia();
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        fontFamily: "'Poppins',sans-serif",
        letterSpacing: "-0.04em",
        color: "#000",
        fontWeight: 500,
        WebkitFontSmoothing: "antialiased",
        overflow: "hidden",
      }}
    >
      {v.isSlack && <SlackSurface v={v} />}
      {v.isWeb && <WebSurface v={v} />}
      {v.hasToast && <Toast text={v.toast || ""} />}
    </div>
  );
}
