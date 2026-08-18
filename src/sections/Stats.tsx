import React from "react";
import { Img, staticFile } from "remotion";
import { theme } from "../theme";
import { candidate } from "../data";

// "Top 1%" highlight — real trophy asset + the badge line.
export const Stats: React.FC<{ arrive: number }> = () => (
  <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: theme.space.md,
        background: theme.color.warnBg,
        borderRadius: theme.radius.lg,
        padding: `${theme.space.md}px ${theme.space.lg}px`,
        width: "100%",
        fontFamily: theme.font.family,
      }}
    >
      <Img src={staticFile("assets/trophy.png")} style={{ width: 46, height: 46, objectFit: "contain" }} />
      <span style={{ fontSize: theme.font.title.size, fontWeight: 600, color: theme.color.ink }}>{candidate.topBadge}</span>
    </div>
  </div>
);
