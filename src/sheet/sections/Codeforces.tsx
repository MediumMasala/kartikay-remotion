import React from "react";
import { ExtG } from "../Ext";
import { Txt, ReplyPill } from "../ui";
import { SF, c } from "../tokens";

const Y_LABELS: Array<[string, number]> = [["1900", 1015], ["1600", 1045], ["1400", 1072], ["1200", 1099]];
const X_LABELS: Array<[string, number]> = [["Sep 2025", 48], ["Nov 2025", 132], ["Jan 2026", 215], ["Mar 2026", 299]];

// Codeforces card: icon + handle, rating line, glowing rating chart (extracted
// verbatim: gridline dash paths + gradient stroke + Figma glow filter).
export const Codeforces: React.FC = () => (
  <>
    <ExtG name="cfIcon" />
    <Txt x={57} y={908} size={20} weight={700} color="#2C2C2E" lh={25} ls={-0.4}>
      Codeforces
    </Txt>
    <div
      style={{
        position: "absolute", right: 41, top: 911, height: 20,
        display: "flex", alignItems: "center",
        fontFamily: SF, fontSize: 15, color: c("#6C6C70"), letterSpacing: -0.1,
      }}
    >
      @anubhavbagri01
    </div>
    <ExtG name="extArrowCF" />

    <div
      style={{
        position: "absolute", left: 16, top: 949, display: "flex", alignItems: "baseline", gap: 5,
        fontFamily: SF, letterSpacing: -0.1,
      }}
    >
      <span style={{ fontSize: 15, color: c("#6C6C70") }}>Latest Contest Rating:</span>
      <span style={{ fontSize: 17, fontWeight: 700, color: c("#2C2C2E") }}>1,259</span>
      <span style={{ fontSize: 15, color: c("#6C6C70"), marginLeft: 12 }}>Max</span>
      <span style={{ fontSize: 17, fontWeight: 700, color: c("#2C2C2E") }}>pupil, 1259</span>
    </div>

    {/* Chart plot — clipped to the visible plot area like the design */}
    <ExtG name="chart" view={[0, 975, 345, 1310]} clip />
    {Y_LABELS.map(([t, y]) => (
      <Txt key={t} right={16} y={y + 7} size={13} color="#8E8E93" lh={18} align="right">
        {t}
      </Txt>
    ))}
    {X_LABELS.map(([t, x]) => (
      <Txt key={t} x={x - 40} w={80} align="center" y={1258} size={13} color="#8E8E93" lh={18}>
        {t}
      </Txt>
    ))}

    <div
      style={{
        position: "absolute", left: 16, top: 1311, display: "flex", alignItems: "baseline", gap: 5,
        fontFamily: SF, letterSpacing: -0.1,
      }}
    >
      <span style={{ fontSize: 17, fontWeight: 700, color: c("#2C2C2E") }}>386</span>
      <span style={{ fontSize: 15, color: c("#6C6C70") }}>problems solved for all time</span>
    </div>
    <Txt x={16} y={1341} size={13} color="#8E8E93" lh={18}>
      Auto updated 2d ago
    </Txt>
    <ReplyPill x={253} y={1311} w={124} h={52} />
  </>
);
