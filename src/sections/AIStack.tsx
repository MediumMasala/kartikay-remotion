import React from "react";
import { useCurrentFrame, interpolate, Easing, Img, staticFile } from "remotion";
import { Card } from "../ui";
import { theme } from "../theme";
import { candidate } from "../data";

// AI Stack: the tools the candidate ships with — real logos, rows stagger in.
export const AIStack: React.FC<{ arrive: number }> = ({ arrive }) => {
  const frame = useCurrentFrame();
  return (
    <Card style={{ height: "100%", display: "flex", flexDirection: "column", gap: theme.space.md, fontFamily: theme.font.family }}>
      <div style={{ fontSize: theme.font.title.size, fontWeight: theme.font.title.weight, color: theme.color.ink }}>
        {candidate.name.split(" ")[0]}'s AI Stack
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: theme.space.md, marginTop: theme.space.xs }}>
        {candidate.aiStack.map((tool, i) => {
          const p = interpolate(frame, [arrive + i * 6, arrive + i * 6 + 14], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });
          return (
            <div
              key={tool.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: theme.space.md,
                background: theme.color.chip,
                borderRadius: theme.radius.md,
                padding: theme.space.md,
                opacity: p,
                translate: `${(1 - p) * 22}px 0px`,
              }}
            >
              <Img
                src={staticFile(`assets/${tool.logo}`)}
                style={{ width: 60, height: 60, borderRadius: theme.radius.sm, objectFit: "cover", flexShrink: 0 }}
              />
              <span style={{ fontSize: theme.font.body.size + 3, fontWeight: 600, color: theme.color.ink }}>{tool.name}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
