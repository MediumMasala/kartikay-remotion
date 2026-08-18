import React from "react";
import { SCREEN, SCREEN_ORIGIN } from "./layout";
import { theme } from "./theme";

// Draws the phone bezel behind the screen. The screen itself is rendered by
// the caller as a sibling on top. Toggled by ProfileScroll's showDeviceFrame.
const BEZEL_PAD = 18;

export const DeviceFrame: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <>
    <div
      style={{
        position: "absolute",
        left: SCREEN_ORIGIN.x - BEZEL_PAD,
        top: SCREEN_ORIGIN.y - BEZEL_PAD,
        width: SCREEN.w + BEZEL_PAD * 2,
        height: SCREEN.h + BEZEL_PAD * 2,
        borderRadius: 74,
        background: theme.color.bezel,
        boxShadow: theme.shadow.device,
      }}
    />
    {children}
  </>
);
