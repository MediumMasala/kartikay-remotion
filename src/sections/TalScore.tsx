import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { Card } from "../ui";
import { theme } from "../theme";
import { candidate } from "../data";

const R = 112;
const CX = 140;
const CY = 140;
const CIRC = 2 * Math.PI * R;

const CRITERIA: { ok: boolean; text: string }[] = [
  { ok: true, text: "Identity & profile verified" },
  { ok: true, text: "Top 1% coding percentile" },
  { ok: false, text: "References in progress" },
];

const Check: React.FC = () => (
  <svg width={28} height={28} viewBox="0 0 24 24" fill={theme.color.good}>
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
    <path d="M7.5 12.2l3 3 6-6.4" stroke={theme.color.brandInk} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Question: React.FC = () => (
  <svg width={28} height={28} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill={theme.color.chip} />
    <path d="M9.5 9.2a2.6 2.6 0 015 .8c0 1.7-2.5 2-2.5 3.6M12 17.2h.01" stroke={theme.color.inkSubtle} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Tal Score: the 92 counts up 0→92 while the ring fills in sync; holds. Then
// verification criteria stagger in.
export const TalScore: React.FC<{ arrive: number }> = ({ arrive }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [arrive + 1, arrive + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const score = Math.round(candidate.talScore * p);
  const frac = (candidate.talScore / 100) * p;

  return (
    <Card style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: theme.space.lg, fontFamily: theme.font.family }}>
      <div style={{ position: "relative", width: 280, height: 280 }}>
        <svg width={280} height={280} viewBox="0 0 280 280">
          <circle cx={CX} cy={CY} r={R} fill="none" stroke={theme.color.line} strokeWidth={20} />
          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke={theme.color.good}
            strokeWidth={20}
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC * (1 - frac)}
            transform={`rotate(-90 ${CX} ${CY})`}
          />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 100, fontWeight: 800, color: theme.color.ink, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{score}</span>
          <span style={{ fontSize: theme.font.label.size, fontWeight: 700, color: theme.color.inkMuted, letterSpacing: 2 }}>TAL SCORE</span>
        </div>
      </div>

      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: theme.space.sm }}>
        {CRITERIA.map((c, i) => {
          const cp = interpolate(frame, [arrive + 20 + i * 6, arrive + 32 + i * 6], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });
          return (
            <div key={c.text} style={{ display: "flex", alignItems: "center", gap: theme.space.md, opacity: cp, translate: `0px ${(1 - cp) * 14}px` }}>
              {c.ok ? <Check /> : <Question />}
              <span style={{ fontSize: theme.font.body.size, color: c.ok ? theme.color.ink : theme.color.inkMuted }}>{c.text}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
