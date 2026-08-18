import React from "react";
import { Img, staticFile } from "remotion";
import { ExtG } from "../Ext";
import { Txt, VLine } from "../ui";
import { SF, c } from "../tokens";

const Chip: React.FC<{ label: string }> = ({ label }) => (
  <span
    style={{
      background: c("#F5F5F8"), borderRadius: 6, padding: "3px 8px",
      fontFamily: SF, fontSize: 13, fontWeight: 500, color: c("#48484A"), letterSpacing: -0.1,
    }}
  >
    {label}
  </span>
);

const Dates: React.FC<{ y: number; start: string; span: string }> = ({ y, start, span }) => (
  <div
    style={{
      position: "absolute", left: 72, top: y, height: 24,
      display: "flex", alignItems: "center", gap: 8,
      fontFamily: SF, fontSize: 13, color: c("#48484A"), letterSpacing: -0.1,
    }}
  >
    <span>{start}</span>
    <Chip label={span} />
    <span>Now</span>
  </div>
);

// "5+ years of work experience" — two visible roles + show-more row.
export const Experience: React.FC = () => (
  <>
    <Txt x={16} y={625} size={22} weight={700} color="#2C2C2E" lh={28} ls={-0.4}>
      5+ years of work experience
    </Txt>

    {/* Item 1 — Tal dog logo (image3) */}
    <Img
      src={staticFile("assets/sheet/image3.png")}
      style={{ position: "absolute", left: 16, top: 658, width: 40, height: 40, borderRadius: 12 }}
    />
    <Txt x={72} y={655} size={17} weight={600} color="#2C2C2E" lh={22}>
      Lead - Strategy &amp; Growth
    </Txt>
    <Txt x={72} y={679} size={15} weight={500} color="#2C2C2E" lh={20}>
      Tal by Grapevine
    </Txt>
    <Dates y={703} start="Sep 2025" span="← 9 mo →" />
    <VLine x={36.5} y0={706} y1={746} />

    {/* Item 2 — Grapevine "g." tile (extracted: orange tile + glyphs) */}
    <ExtG name="gLogo" />
    <Txt x={72} y={743} size={17} weight={600} color="#2C2C2E" lh={22}>
      Tal by Grapevine
    </Txt>
    <Txt x={72} y={767} size={15} weight={500} color="#2C2C2E" lh={20}>
      Grapevine
    </Txt>
    <Dates y={791} start="May 2023" span="← 3y 1 mo →" />
    <VLine x={36.5} y0={794} y1={838} />

    <ExtG name="chevMore" />
    <Txt x={66} y={848} size={17} weight={500} color="#2C2C2E" lh={22}>
      Show 2 more experiences
    </Txt>
  </>
);
