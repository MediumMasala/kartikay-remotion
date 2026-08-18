import React from "react";
import { useCurrentFrame, interpolate, Easing, Img, staticFile } from "remotion";
import { Card } from "../ui";
import { theme } from "../theme";
import { candidate } from "../data";

// Experience: heading + work-history rows with the real company logos.
export const Experience: React.FC<{ arrive: number }> = ({ arrive }) => {
  const frame = useCurrentFrame();
  return (
    <Card style={{ height: "100%", display: "flex", flexDirection: "column", gap: theme.space.md, fontFamily: theme.font.family }}>
      <div style={{ fontSize: theme.font.title.size, fontWeight: theme.font.title.weight, color: theme.color.ink }}>Experience</div>
      <div style={{ display: "flex", flexDirection: "column", gap: theme.space.lg, marginTop: theme.space.xs }}>
        {candidate.experience.map((e, i) => {
          const p = interpolate(frame, [arrive + i * 6, arrive + i * 6 + 14], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });
          return (
            <div
              key={e.company}
              style={{ display: "flex", alignItems: "center", gap: theme.space.md, opacity: p, translate: `${(1 - p) * 20}px 0px` }}
            >
              <Img
                src={staticFile(`assets/${e.logo}`)}
                style={{ width: 64, height: 64, borderRadius: theme.radius.md, objectFit: "cover", flexShrink: 0 }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
                <span style={{ fontSize: theme.font.body.size + 2, fontWeight: 600, color: theme.color.ink }}>{e.role}</span>
                <span style={{ fontSize: theme.font.label.size, color: theme.color.inkMuted }}>{e.company}</span>
              </div>
              <span style={{ fontSize: theme.font.label.size, color: theme.color.inkSubtle }}>{e.period}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
