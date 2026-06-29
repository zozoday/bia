import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Note: StrictMode is intentionally omitted. The prototype relies on single-pass
// timer chains (the scripted Slack flow, regeneration delays); StrictMode's
// double-invocation of effects/updaters would fire those timers twice.
createRoot(document.getElementById("root")!).render(<App />);
