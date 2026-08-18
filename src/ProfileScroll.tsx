import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import "./fonts";
import { CANVAS, SCREEN, SCREEN_ORIGIN, TAB_BAR_H } from "./layout";
import { theme } from "./theme";
import {
  FULL_STOPS,
  SHORT_STOPS,
  FULL_ARRIVE,
  SHORT_ARRIVE,
  scrollYAt,
} from "./timeline";
import { StatusBar } from "./chrome/StatusBar";
import { TabBar } from "./chrome/TabBar";
import { ActionPills } from "./chrome/ActionPills";
import { DeviceFrame } from "./DeviceFrame";
import { SectionColumn } from "./sections/SectionColumn";

export type ProfileScrollProps = {
  showDeviceFrame: boolean;
  variant: "full" | "short";
};

export const ProfileScroll: React.FC<ProfileScrollProps> = ({
  showDeviceFrame,
  variant,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const stops = variant === "short" ? SHORT_STOPS : FULL_STOPS;
  const arrive = variant === "short" ? SHORT_ARRIVE : FULL_ARRIVE;
  const scrollY = scrollYAt(frame, stops);

  // Dissolve to the neutral background at the very start and end so the GIF
  // loops seamlessly (bg→bg wrap) instead of a hard bottom→top cut.
  const wrapFade = Math.max(
    interpolate(frame, [0, 12], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    interpolate(frame, [durationInFrames - 10, durationInFrames - 1], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  const screen = (
    <div
      style={{
        position: "absolute",
        left: showDeviceFrame ? SCREEN_ORIGIN.x : (CANVAS.w - SCREEN.w) / 2,
        top: showDeviceFrame ? SCREEN_ORIGIN.y : (CANVAS.h - SCREEN.h) / 2,
        width: SCREEN.w,
        height: SCREEN.h,
        overflow: "hidden",
        borderRadius: showDeviceFrame ? 56 : 0,
        background: theme.color.screenBg,
      }}
    >
      {/* Scroll layer — GPU-composited translate only. */}
      <AbsoluteFill>
        <div style={{ translate: `0px ${-scrollY}px`, willChange: "translate" }}>
          <SectionColumn arrive={arrive} />
        </div>
      </AbsoluteFill>

      {/* Fixed chrome — above the scroll layer. */}
      <StatusBar />
      <ActionPills bottomOffset={TAB_BAR_H} />
      <TabBar />
    </div>
  );

  return (
    <AbsoluteFill style={{ background: theme.color.surface }}>
      {showDeviceFrame ? <DeviceFrame>{screen}</DeviceFrame> : screen}
      {/* Loop dissolve — seamless bg→bg wrap. zIndex clears the chrome (z20–25),
          which render in the root stacking context since the screen div doesn't
          establish its own. */}
      <AbsoluteFill style={{ background: theme.color.surface, opacity: wrapFade, pointerEvents: "none", zIndex: 999 }} />
    </AbsoluteFill>
  );
};
