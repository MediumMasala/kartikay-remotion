import React from "react";
import { useCurrentFrame, interpolate, Easing, random, Img, staticFile } from "remotion";
import { Card, CountUp, ArrowTopRight } from "../ui";
import { theme } from "../theme";
import { candidate } from "../data";

const GH = candidate.github;

const WEEKS = 52;
const DAYS = 7;
const CELL = 9;
const CGAP = 3;
const GUTTER = 30;
const TOP = 22;
const HEAT_W = GUTTER + WEEKS * (CELL + CGAP);
const HEAT_H = TOP + DAYS * (CELL + CGAP);

const LANG_COLORS: Record<string, string> = {
  JavaScript: theme.raw.yellow50,
  Python: theme.raw.blue50,
  TypeScript: "#4f7fd0", // ⚠ lighter blue — not a Figma token
  HTML: theme.raw.orange50,
  C: theme.raw.surface60,
};

// deterministic contribution intensity 0..4 (skewed toward low)
const level = (w: number, d: number): number =>
  Math.floor(Math.pow(random(`gh-${w}-${d}`), 1.7) * 5);

// GitHub: contributions count-up, heatmap that fills L→R in a wave, growing
// language bar, popular repos.
export const Github: React.FC<{ arrive: number }> = ({ arrive }) => {
  const frame = useCurrentFrame();
  const heatStart = arrive + 2;
  const langStart = arrive + 16;

  return (
    <Card style={{ height: "100%", display: "flex", flexDirection: "column", gap: theme.space.md, fontFamily: theme.font.family }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: theme.space.sm }}>
          <Img src={staticFile("assets/logo-github.svg")} style={{ width: 34, height: 34 }} />
          <span style={{ fontSize: theme.font.title.size, fontWeight: theme.font.title.weight, color: theme.color.ink }}>GitHub</span>
        </div>
        <ArrowTopRight />
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: theme.space.sm }}>
        <CountUp
          to={GH.contributions}
          arrive={arrive}
          dur={24}
          style={{ fontSize: 38, fontWeight: 700, color: theme.color.good, fontVariantNumeric: "tabular-nums" }}
        />
        <span style={{ fontSize: theme.font.label.size, color: theme.color.inkMuted }}>contributions this year</span>
      </div>

      <svg width="100%" viewBox={`0 0 ${HEAT_W} ${HEAT_H}`}>
        {["Mon", "Wed", "Fri"].map((d, idx) => (
          <text key={d} x={0} y={TOP + (idx * 2 + 1) * (CELL + CGAP) + CELL} fill={theme.color.inkSubtle} fontSize={11} fontFamily={theme.font.family}>
            {d}
          </text>
        ))}
        {Array.from({ length: WEEKS }).map((_, w) => {
          const colTime = heatStart + w * 0.45;
          const cp = interpolate(frame, [colTime, colTime + 5], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });
          return Array.from({ length: DAYS }).map((__, d) => (
            <rect
              key={`${w}-${d}`}
              x={GUTTER + w * (CELL + CGAP)}
              y={TOP + d * (CELL + CGAP)}
              width={CELL}
              height={CELL}
              rx={2}
              fill={theme.color.heat[level(w, d)]}
              opacity={cp}
            />
          ));
        })}
      </svg>

      <div style={{ display: "flex", flexDirection: "column", gap: theme.space.sm }}>
        <div style={{ display: "flex", height: 14, borderRadius: 7, overflow: "hidden", background: theme.color.line }}>
          {GH.languages.map((l) => {
            const lp = interpolate(frame, [langStart, langStart + 18], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            });
            return <div key={l.name} style={{ width: `${l.pct * lp}%`, background: LANG_COLORS[l.name] ?? theme.color.inkSubtle }} />;
          })}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: theme.space.md }}>
          {GH.languages.map((l) => (
            <div key={l.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: 6, background: LANG_COLORS[l.name] ?? theme.color.inkSubtle }} />
              <span style={{ fontSize: theme.font.label.size - 1, color: theme.color.inkMuted }}>
                {l.name} {l.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: theme.space.sm, marginTop: theme.space.xs }}>
        <span style={{ fontSize: theme.font.label.size, fontWeight: 600, color: theme.color.inkMuted }}>Popular repositories</span>
        {GH.repos.slice(0, 2).map((r) => (
          <div
            key={r.name}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: `1px solid ${theme.color.line}`,
              borderRadius: theme.radius.md,
              padding: `${theme.space.sm}px ${theme.space.md}px`,
            }}
          >
            <span style={{ fontSize: theme.font.label.size + 1, fontWeight: 600, color: theme.color.accent }}>{r.name}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: theme.font.label.size - 1, color: theme.color.inkMuted }}>
              <span style={{ width: 10, height: 10, borderRadius: 5, background: LANG_COLORS[r.lang] ?? theme.color.inkSubtle }} />
              {r.lang}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};
