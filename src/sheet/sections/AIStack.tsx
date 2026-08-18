import React from "react";
import { Img, staticFile } from "remotion";
import { ExtG } from "../Ext";
import { Txt, ReplyPill } from "../ui";

// "Sanchit's AI Stack" — serif title, two rows of app tiles (tile chrome
// extracted verbatim; icon images placed at their exported rects), labels.
type IconSpec = { img: string; x: number; y: number; s: number };
const ROW1: IconSpec[] = [
  { img: "image8", x: 77.5, y: 4245.2, s: 68 },
  { img: "image9", x: 162.9, y: 4245.2, s: 68 },
  { img: "image10", x: 236.7, y: 4233.5, s: 90.5 },
];
const ROW2: IconSpec[] = [
  { img: "image10", x: 65.7, y: 4339, s: 90.5 },
  { img: "image10", x: 151.2, y: 4339, s: 90.5 },
  { img: "image9", x: 248.4, y: 4350.7, s: 68 },
];
const CENTERS = [111, 196.5, 282];
const LABELS1 = ["Claude Code", "Codex", "Cursor"];
const LABELS2 = ["Cursor", "Cursor", "Codex"];

export const AIStack: React.FC = () => (
  <>
    <Txt x={0} w={393} align="center" y={4186} size={24} serif weight={400} color="#2C2C2E" lh={31} ls={0}>
      Sanchit&rsquo;s AI Stack
    </Txt>
    <ExtG name="aiTiles1" />
    <ExtG name="aiTiles2" />
    {[...ROW1, ...ROW2].map((ic, i) => (
      <Img
        key={i}
        src={staticFile(`assets/sheet/${ic.img}.png`)}
        style={{ position: "absolute", left: ic.x, top: ic.y, width: ic.s, height: ic.s }}
      />
    ))}
    {[4245.2, 4350.7].map((ty) =>
      [77.5, 163, 248.5].map((tx) => (
        <div
          key={`${tx}-${ty}`}
          style={{
            position: "absolute", left: tx + 1.7, top: ty + 1.7, width: 63.7, height: 63.7,
            border: "1.7px solid #ffffff", borderRadius: 18.44,
          }}
        />
      )),
    )}
    {LABELS1.map((t, i) => (
      <Txt key={`a${i}`} x={CENTERS[i] - 50} w={100} align="center" y={4322} size={13} color="#8E8E93" lh={18}>
        {t}
      </Txt>
    ))}
    {LABELS2.map((t, i) => (
      <Txt key={`b${i}`} x={CENTERS[i] - 50} w={100} align="center" y={4427} size={13} color="#8E8E93" lh={18}>
        {t}
      </Txt>
    ))}
    <Txt x={26} w={341} align="center" y={4458} size={17} color="#2C2C2E" lh={26}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </Txt>
    <ReplyPill x={16} y={4567} w={361} />
  </>
);
