import React from "react";
import { useCurrentFrame, useVideoConfig, spring, Img, staticFile } from "remotion";
import { theme } from "../theme";
import { candidate } from "../data";

// Visual: the "Check out Kabir" block — real candidate photo, scrim, play pop.
export const Visual: React.FC<{ arrive: number }> = ({ arrive }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - arrive - 4, fps, config: { damping: 12, mass: 0.6 } });

  return (
    <div
      style={{
        height: "100%",
        borderRadius: theme.radius.xl,
        overflow: "hidden",
        position: "relative",
        boxShadow: theme.shadow.card,
        fontFamily: theme.font.family,
      }}
    >
      <Img
        src={staticFile("assets/photo-candidate.png")}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(16,16,20,0) 42%, rgba(16,16,20,0.78))" }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: theme.space.xl, display: "flex", flexDirection: "column", alignItems: "center", gap: theme.space.md }}>
        <div
          style={{
            width: 92,
            height: 92,
            borderRadius: theme.radius.pill,
            background: theme.color.cardBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            scale: 0.7 + pop * 0.3,
            boxShadow: theme.shadow.pill,
          }}
        >
          <svg width={40} height={40} viewBox="0 0 24 24" fill={theme.color.ink}>
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <span style={{ fontSize: theme.font.h2.size, fontWeight: theme.font.h2.weight, color: theme.color.brandInk }}>
          Check out {candidate.name.split(" ")[0]}
        </span>
      </div>
    </div>
  );
};
