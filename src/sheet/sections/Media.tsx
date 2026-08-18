import React from "react";
import { Img, staticFile } from "remotion";
import { Txt, ReplyPill } from "../ui";
import { SF, c } from "../tokens";

// "Check out Sanchit" photo carousel + "I work best when..." block.
export const Media: React.FC = () => (
  <>
    <Txt x={16} y={2773} size={22} weight={700} color="#2C2C2E" lh={28} ls={-0.4}>
      Check out Sanchit
    </Txt>

    {/* Card 1 (image bleeds left inside the crop, as exported) */}
    <div style={{ position: "absolute", left: 16, top: 2819, width: 331, height: 500, borderRadius: 16, overflow: "hidden" }}>
      <Img
        src={staticFile("assets/sheet/image5.png")}
        style={{ position: "absolute", left: -28, top: 0, width: 393, height: 500 }}
      />
      <div
        style={{
          position: "absolute", left: 217, top: 433, width: 106, height: 50,
          background: "#ffffff", borderRadius: 25,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: SF, fontSize: 15, fontWeight: 500, color: c("#1C1C1E"), letterSpacing: -0.1,
        }}
      >
        Reply
      </div>
    </div>
    {/* Card 2 peeking at the right edge */}
    <div style={{ position: "absolute", left: 363, top: 2819, width: 40, height: 500, borderRadius: 16, overflow: "hidden" }}>
      <Img
        src={staticFile("assets/sheet/image5.png")}
        style={{ position: "absolute", left: -26, top: 0, width: 393, height: 500 }}
      />
    </div>

    {/* I work best when... (divider above at 3344.5) */}
    <Img
      src={staticFile("assets/sheet/image6.png")}
      style={{ position: "absolute", left: 16, top: 3371, width: 43.5, height: 36.2 }}
    />
    <Txt x={16} y={3416} size={22} weight={600} color="#6C6C70" lh={28} ls={-0.4}>
      I work best when...
    </Txt>
    <div style={{ position: "absolute", left: 16, top: 3451, width: 361, height: 361, borderRadius: 24, overflow: "hidden" }}>
      <Img
        src={staticFile("assets/sheet/image7.png")}
        style={{ position: "absolute", left: -15, top: -14, width: 392, height: 391 }}
      />
    </div>
    <Txt x={16} w={347} y={3841} size={22} color="#2C2C2E" lh={30.5} ls={0}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna sit aliqua.
    </Txt>
    <Txt x={16} w={347} y={4016} size={22} color="#2C2C2E" lh={30.5} ls={0}>
      Ut enim ad minim ven (150)
    </Txt>
    <ReplyPill x={16} y={4080} w={361} />
  </>
);
