import React from "react";
import { SCREEN, STATUS_BAR_H } from "../layout";
import { theme } from "../theme";

// Fixed iOS status bar pinned to the top of the screen. SVG glyph geometry
// ported from the boss-swipe Chrome, re-coloured from theme tokens.
export const StatusBar: React.FC = () => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: SCREEN.w,
      height: STATUS_BAR_H,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: `0 ${theme.space.lg}px`,
      zIndex: 20,
      fontFamily: theme.font.family,
      color: theme.color.ink,
    }}
  >
    <span style={{ fontSize: 30, fontWeight: 600, letterSpacing: 0.2 }}>
      9:41
    </span>
    <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <svg width="30" height="20" viewBox="0 0 18 12" fill={theme.color.ink}>
        <rect x="0" y="8" width="3" height="4" rx="1" />
        <rect x="5" y="5" width="3" height="7" rx="1" />
        <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
        <rect x="15" y="0" width="3" height="12" rx="1" />
      </svg>
      <svg width="28" height="20" viewBox="0 0 17 12" fill="none">
        <path
          d="M8.5 11.2 1 4.2A10.6 10.6 0 0 1 16 4.2L8.5 11.2Z"
          fill={theme.color.ink}
        />
      </svg>
      <svg width="42" height="20" viewBox="0 0 26 13" fill="none">
        <rect
          x="0.5"
          y="0.5"
          width="22"
          height="12"
          rx="3.5"
          stroke={theme.color.ink}
          opacity="0.4"
        />
        <rect x="2" y="2" width="18" height="9" rx="2" fill={theme.color.ink} />
        <rect
          x="24"
          y="4"
          width="2"
          height="5"
          rx="1"
          fill={theme.color.ink}
          opacity="0.4"
        />
      </svg>
    </span>
  </div>
);
