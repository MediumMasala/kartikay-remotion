import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";
import { theme } from "../theme";
import { candidate } from "../data";

const Bolt: React.FC = () => (
  <svg width={32} height={32} viewBox="0 0 24 24" fill={theme.color.brandInk}>
    <path d="M13 2L4.5 13.5H11l-1 8.5L19.5 10H13l0-8z" />
  </svg>
);

// Spike: the AI-insight moment. Card scales in from 0.92 with a spring
// overshoot as it arrives — give it a beat.
export const Spike: React.FC<{ arrive: number }> = ({ arrive }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - arrive, fps, config: { damping: 11, mass: 0.7 } });
  const scale = 0.92 + s * 0.08;

  return (
    <div
      style={{
        height: "100%",
        background: theme.color.warnBg,
        borderRadius: theme.radius.xl,
        boxShadow: theme.shadow.card,
        padding: theme.space.lg,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: theme.space.md,
        fontFamily: theme.font.family,
        scale,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: theme.space.sm }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: theme.radius.md,
            background: theme.raw.orange50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Bolt />
        </div>
        <span style={{ fontSize: theme.font.h2.size, fontWeight: theme.font.h2.weight, color: theme.color.ink }}>
          {candidate.spike.title}
        </span>
      </div>
      <p style={{ margin: 0, fontSize: theme.font.body.size + 2, lineHeight: theme.font.body.line, color: theme.color.inkMuted }}>
        {candidate.spike.body}
      </p>
    </div>
  );
};
