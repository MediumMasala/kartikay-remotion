import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { Card, CountUp, ArrowTopRight } from "../ui";
import { theme } from "../theme";
import { candidate } from "../data";

const CF = candidate.codeforces;

// chart geometry (card-inner space)
const W = 694;
const LEFT = 58;
const RIGHT = 12;
const TOP = 14;
const PLOT_H = 300;
const plotW = W - LEFT - RIGHT;
const DOMAIN_MIN = 1120;
const DOMAIN_MAX = 1980;
const SVG_H = TOP + PLOT_H + 44;

const yScale = (r: number) => TOP + (1 - (r - DOMAIN_MIN) / (DOMAIN_MAX - DOMAIN_MIN)) * PLOT_H;
const xAt = (i: number, n: number) => LEFT + (i * plotW) / (n - 1);

// Codeforces: rating count-up + line chart that draws itself in via
// strokeDashoffset, with a subtle area fill and an end-point dot.
export const Codeforces: React.FC<{ arrive: number }> = ({ arrive }) => {
  const frame = useCurrentFrame();
  const n = CF.series.length;
  const pts = CF.series.map((r, i) => [xAt(i, n), yScale(r)] as const);
  const line = "M " + pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L ");
  const area = `${line} L ${pts[n - 1][0].toFixed(1)} ${TOP + PLOT_H} L ${pts[0][0].toFixed(1)} ${TOP + PLOT_H} Z`;

  let len = 0;
  for (let i = 1; i < pts.length; i++) {
    len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  }

  const prog = interpolate(frame, [arrive + 4, arrive + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const dot = pts[n - 1];
  const dotIn = interpolate(prog, [0.9, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <Card style={{ height: "100%", display: "flex", flexDirection: "column", gap: theme.space.sm, fontFamily: theme.font.family }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: theme.font.title.size, fontWeight: theme.font.title.weight, color: theme.color.ink }}>Codeforces</span>
        <ArrowTopRight />
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: theme.space.sm }}>
        <span style={{ fontSize: theme.font.label.size, color: theme.color.inkMuted }}>{CF.label}</span>
        <CountUp
          to={CF.rating}
          arrive={arrive}
          dur={26}
          style={{ fontSize: 42, fontWeight: 700, color: theme.color.accent, fontVariantNumeric: "tabular-nums" }}
        />
      </div>

      <svg width="100%" viewBox={`0 0 ${W} ${SVG_H}`} style={{ marginTop: theme.space.xs }}>
        {CF.grid.map((g) => (
          <g key={g}>
            <line x1={LEFT} y1={yScale(g)} x2={W - RIGHT} y2={yScale(g)} stroke={theme.color.line} strokeWidth={1} />
            <text x={0} y={yScale(g) + 5} fill={theme.color.inkSubtle} fontSize={15} fontFamily={theme.font.family}>
              {g}
            </text>
          </g>
        ))}

        <path d={area} fill={theme.color.accent} opacity={0.08 * prog} />
        <path
          d={line}
          fill="none"
          stroke={theme.color.accent}
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={len}
          strokeDashoffset={len * (1 - prog)}
        />
        <circle cx={dot[0]} cy={dot[1]} r={14 * dotIn} fill={theme.color.accent} opacity={0.16 * dotIn} />
        <circle cx={dot[0]} cy={dot[1]} r={7 * dotIn} fill={theme.color.accent} />

        {CF.months.map((m, i) => (
          <text
            key={m}
            x={xAt(i, CF.months.length)}
            y={SVG_H - 10}
            fill={theme.color.inkSubtle}
            fontSize={13}
            fontFamily={theme.font.family}
            textAnchor={i === 0 ? "start" : i === CF.months.length - 1 ? "end" : "middle"}
          >
            {m}
          </text>
        ))}
      </svg>
    </Card>
  );
};
