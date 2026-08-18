import React from "react";
import { Img, staticFile } from "remotion";
import { ExtG } from "../Ext";
import { Txt, VLine } from "../ui";
import { c } from "../tokens";

// Hero photo + status bar + action buttons + name block + stats row + Top 1%.
// All coordinates from the Figma export (see sheet-spec.json / crops).
export const Hero: React.FC = () => (
  <>
    {/* Hero photo (bleeds past the sheet edges, as exported) */}
    <div style={{ position: "absolute", left: 0, top: 0, width: 393, height: 377, overflow: "hidden" }}>
      <Img
        src={staticFile("assets/sheet/image1.png")}
        style={{ position: "absolute", left: -18, top: -23, width: 429, height: 400 }}
      />
      {/* fade into the white sheet */}
      <div
        style={{
          position: "absolute", left: 0, top: 298, width: 393, height: 79,
          background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, #ffffff 88%)",
        }}
      />
    </div>
    <ExtG name="statusBar" />
    <ExtG name="topActions" />
    <ExtG name="carouselDots" />

    {/* Name block */}
    <Txt x={0} w={393} align="center" y={362} size={28} weight={700} color="#2C2C2E" lh={34} ls={-0.6}>
      Sanchit Tripathi
    </Txt>
    <Txt x={0} w={393} align="center" y={397} size={17} weight={600} color="#48484A" lh={22}>
      Lead - Strategy &amp; Growth at Tal by Grapevine
    </Txt>

    {/* Stats row (divider above at 427.5, below at 509.5) */}
    <VLine x={131.5} y0={453.5} y1={497} color="#F5F5F8" />
    <VLine x={262.5} y0={453.5} y1={497} color="#F5F5F8" />
    <div
      style={{
        position: "absolute", left: 16, top: 449, width: 115.5, height: 22,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
      }}
    >
      <div style={{ width: 4, height: 4, borderRadius: 2, background: c("#13BF69") }} />
      <Txt x={0} y={0} size={17} weight={600} color="#2C2C2E" lh={22} style={{ position: "relative", top: 0 }}>
        Today
      </Txt>
    </div>
    <Txt x={131.5} w={131} align="center" y={452} size={17} weight={600} color="#2C2C2E" lh={22}>
      ₹15 LPA
    </Txt>
    <Txt x={262.5} w={114.5} align="center" y={452} size={17} weight={600} color="#2C2C2E" lh={22}>
      BLR
    </Txt>
    <Txt x={16} w={115.5} align="center" y={479} size={15} color="#6C6C70" lh={20}>
      Last seen
    </Txt>
    <Txt x={131.5} w={131} align="center" y={479} size={15} color="#6C6C70" lh={20}>
      CTC
    </Txt>
    <Txt x={262.5} w={114.5} align="center" y={479} size={15} color="#6C6C70" lh={20}>
      Location
    </Txt>

    {/* Top 1% (between dividers 509.5 / 591.5) */}
    <Img
      src={staticFile("assets/sheet/image2.png")}
      style={{ position: "absolute", left: 16.7, top: 533, width: 34.7, height: 36 }}
    />
    <Txt x={64} y={537} size={17} weight={600} color="#48484A" lh={22}>
      Top 1% of all candidates for you
    </Txt>
    <Txt x={64} y={561} size={15} color="#48484A" lh={20}>
      Basis your ask for this job role
    </Txt>
  </>
);
