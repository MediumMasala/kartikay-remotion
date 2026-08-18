import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";
import { OFFSETS, type SectionId } from "../data";
import { SCREEN } from "../layout";

// Positions a section absolutely at its real offset and plays the base
// entrance (opacity 0→1 + translateY 28→0) as it reaches the viewport.
// Pure function of frame; no CSS transitions.
export const Section: React.FC<{
  id: SectionId;
  arrive: number;
  children: React.ReactNode;
}> = ({ id, arrive, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { top, h } = OFFSETS[id];

  const enter = spring({
    frame: frame - (arrive - 14),
    fps,
    config: { damping: 200 },
  });

  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 0,
        width: SCREEN.w,
        height: h,
        paddingLeft: 22,
        paddingRight: 22,
        boxSizing: "border-box",
        opacity: enter,
        translate: `0px ${(1 - enter) * 28}px`,
      }}
    >
      {children}
    </div>
  );
};
