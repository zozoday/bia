import type { Vals } from "../../bia/useBia";
import Sidebar from "./Sidebar";
import Library from "./Library";
import Review from "./Review";
import BrandKit from "./BrandKit";
import BrandVoice from "./BrandVoice";
import Team from "./Team";
import ShareModal from "./ShareModal";

export default function WebSurface({ v }: { v: Vals }) {
  return (
    <div style={{ display: "flex", height: "100%", width: "100%", background: "#F6F2EF" }}>
      <Sidebar v={v} />
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", position: "relative" }}>
        {v.atLibrary && <Library v={v} />}
        {v.atReview && <Review v={v} />}
        {v.atBrandkit && <BrandKit v={v} />}
        {v.atBrandvoice && <BrandVoice />}
        {v.atTeam && <Team v={v} />}
        {v.showShare && <ShareModal v={v} />}
      </div>
    </div>
  );
}
