import React from "react";
import { ExtG } from "../Ext";
import { Txt, ReplyPill } from "../ui";
import { SF, c } from "../tokens";
import { HEAT_GRID, HEAT_P3 } from "../heatmap";

const MONTHS: Array<[string, number]> = [["May", 65], ["Jun", 132], ["Jul", 198], ["Aug", 269], ["Sep", 337]];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const LANGS: Array<[string, string, string]> = [
  ["JavaScript", "41%", "#F7DF1C"], ["Python", "20%", "#3572A5"], ["TypeScript", "11%", "#3078C6"],
  ["HTML", "11%", "#E34C26"], ["C", "7%", "#AEAEB2"],
];

// GitHub card: heatmap (exact sampled grid) + Signals + Languages.
export const Github: React.FC = () => (
  <>
    <ExtG name="octocat" />
    <div
      style={{
        position: "absolute", right: 41, top: 2050, height: 20, display: "flex", alignItems: "center",
        fontFamily: SF, fontSize: 15, color: c("#6C6C70"), letterSpacing: -0.1,
      }}
    >
      @sanchittripathi
    </div>
    <ExtG name="extArrowGH" />

    <div
      style={{
        position: "absolute", left: 16, top: 2102, display: "flex", alignItems: "baseline", gap: 5,
        fontFamily: SF, letterSpacing: -0.1,
      }}
    >
      <span style={{ fontSize: 17, fontWeight: 700, color: c("#2C2C2E") }}>545</span>
      <span style={{ fontSize: 15, color: c("#6C6C70") }}>contributions in the last year</span>
    </div>

    {MONTHS.map(([t, x]) => (
      <Txt key={t} x={x - 30} w={60} align="center" y={2130} size={13} color="#8E8E93" lh={18}>
        {t}
      </Txt>
    ))}
    {DAYS.map((d, r) => (
      <Txt key={d} x={14} y={HEAT_GRID.y0 + r * HEAT_GRID.pitchY + 1} size={13} color="#8E8E93" lh={16}>
        {d}
      </Txt>
    ))}
    {HEAT_GRID.cells.map((row, r) =>
      row.map((v, col) => (
        <div
          key={`${r}-${col}`}
          style={{
            position: "absolute",
            left: HEAT_GRID.x0 + col * HEAT_GRID.pitchX,
            top: HEAT_GRID.y0 + r * HEAT_GRID.pitchY,
            width: HEAT_GRID.cell, height: HEAT_GRID.cell,
            borderRadius: HEAT_GRID.radius, background: HEAT_P3[v],
          }}
        />
      )),
    )}

    <Txt x={16} y={2338} size={17} weight={700} color="#2C2C2E" lh={22} ls={-0.2}>
      Signals
    </Txt>
    <div
      style={{
        position: "absolute", left: 16, top: 2360, display: "flex", alignItems: "baseline", gap: 10,
        fontFamily: SF,
      }}
    >
      <span style={{ fontSize: 34, fontWeight: 700, color: c("#2C2C2E"), letterSpacing: -0.6 }}>41+</span>
      <span style={{ fontSize: 17, color: c("#6C6C70"), letterSpacing: -0.2 }}>External PRs Merged</span>
    </div>

    <Txt x={16} y={2426} size={17} weight={700} color="#2C2C2E" lh={22} ls={-0.2}>
      Languages
    </Txt>
    {([["#F7DF1C", 16, 100], ["#3572A5", 118, 81], ["#3078C6", 201, 76], ["#E34C26", 279, 62], ["#AEAEB2", 343, 34]] as const).map(
      ([col, x, w]) => (
        <div
          key={`glow-${x}`}
          style={{
            position: "absolute", left: x, top: 2457, width: w, height: 6,
            background: c(col), borderRadius: 3, filter: "blur(9px)", opacity: 0.5,
          }}
        />
      ),
    )}
    <ExtG name="langBar" />
    {LANGS.map(([name, pct, dot], i) => (
      <React.Fragment key={name}>
        <div
          style={{
            position: "absolute", left: 16, top: 2490 + 28 * i, width: 6, height: 6,
            borderRadius: 3, background: c(dot),
          }}
        />
        <Txt x={34} y={2485 + 28 * i} size={15} color="#2C2C2E" lh={20}>
          {name}
        </Txt>
        <Txt right={16} y={2485 + 28 * i} size={15} color="#8E8E93" lh={20} align="right">
          {pct}
        </Txt>
      </React.Fragment>
    ))}

    <Txt right={42} y={2643} size={17} weight={500} color="#2C2C2E" lh={22} align="right">
      Show repositories
    </Txt>
    <ExtG name="chevRepos" />
    <Txt x={16} y={2705} size={13} color="#8E8E93" lh={18}>
      Auto updated 2d ago
    </Txt>
    <ReplyPill x={253} y={2675} w={124} h={52} />
  </>
);
