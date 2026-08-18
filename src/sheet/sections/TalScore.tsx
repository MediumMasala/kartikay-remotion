import React from "react";
import { ExtG } from "../Ext";
import { Txt } from "../ui";
import { SF, c } from "../tokens";

const ROWS: Array<{ icon: "checkA" | "checkB" | "qMark"; x: number; y: number; text: string }> = [
  { icon: "checkA", x: 118, y: 4833, text: "Java: 6 yrs, core backend" },
  { icon: "checkB", x: 96, y: 4864, text: "Python: shipped 2 ML services" },
  { icon: "qMark", x: 72, y: 4897, text: "Ask about: team size led (max 4 eng)" },
];

// Tal Score — extracted gauge (gradient arc + fades) with live 92/Score text,
// the checklist rows, and the scored-against footnote.
export const TalScore: React.FC = () => (
  <>
    <Txt x={16} y={4663} size={20} weight={700} color="#2C2C2E" lh={25} ls={-0.4}>
      Tal Score
    </Txt>
    <ExtG name="gauge" />
    <Txt x={97} w={200} align="center" y={4727} size={40} weight={700} color="#1C1C1E" lh={46} ls={-0.8}>
      92
    </Txt>
    <Txt x={97} w={200} align="center" y={4776} size={15} color="#2C2C2E" lh={20}>
      Score
    </Txt>
    {ROWS.map((r) => (
      <React.Fragment key={r.icon}>
        <ExtG name={r.icon} />
        <Txt x={r.x} y={r.y} size={17} color="#48484A" lh={22}>
          {r.text}
        </Txt>
      </React.Fragment>
    ))}
    <div
      style={{
        position: "absolute", left: 0, top: 4941, width: 393, textAlign: "center",
        fontFamily: SF, fontSize: 13, letterSpacing: -0.1, lineHeight: "18px",
      }}
    >
      <span style={{ color: c("#8E8E93") }}>Scored against your ask: </span>
      <span style={{ color: c("#1C1C1E") }}>&quot;Java &amp; Python, some leadership&quot;</span>
    </div>
  </>
);
