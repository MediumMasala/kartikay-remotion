import React from "react";
import { Img, staticFile } from "remotion";
import { theme } from "../theme";
import { candidate } from "../data";
import { CountUp } from "../ui";

// Counts up the leading number inside a stat like "₹35 LPA" / "4 years";
// renders static if there's no number (e.g. "BLR").
const StatValue: React.FC<{ value: string; arrive: number; i: number }> = ({ value, arrive, i }) => {
  const m = value.match(/^(\D*)(\d+)(.*)$/);
  if (!m) return <>{value}</>;
  return <CountUp to={Number(m[2])} arrive={arrive + i * 3} dur={20} prefix={m[1]} suffix={m[3]} />;
};

// Hero: name + role on the left, real company logo on the right (no avatar —
// matches the Figma design), divider, then the real stat row.
export const Hero: React.FC<{ arrive: number }> = ({ arrive }) => (
  <div
    style={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: theme.space.lg,
      fontFamily: theme.font.family,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: theme.space.md }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontSize: theme.font.hero.size, fontWeight: theme.font.hero.weight, color: theme.color.ink, lineHeight: theme.font.hero.line }}>
          {candidate.name}
        </span>
        <span style={{ fontSize: theme.font.title.size, fontWeight: 500, color: theme.color.inkMuted }}>{candidate.role}</span>
      </div>
      <Img
        src={staticFile(`assets/${candidate.companyLogo}`)}
        style={{ width: 118, height: 118, borderRadius: theme.radius.pill, objectFit: "cover", flexShrink: 0 }}
      />
    </div>

    <div style={{ height: 1, background: theme.color.line }} />

    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      {candidate.stats.map((s, i) => (
        <React.Fragment key={s.label}>
          {i > 0 && <div style={{ width: 1, height: 54, background: theme.color.line }} />}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 34, fontWeight: 700, color: theme.color.ink, fontVariantNumeric: "tabular-nums" }}>
              <StatValue value={s.value} arrive={arrive} i={i} />
            </span>
            <span style={{ fontSize: theme.font.label.size, color: theme.color.inkMuted }}>{s.label}</span>
          </div>
        </React.Fragment>
      ))}
    </div>
  </div>
);
