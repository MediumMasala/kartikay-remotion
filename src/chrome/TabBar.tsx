import React from "react";
import { SCREEN, TAB_BAR_H } from "../layout";
import { theme } from "../theme";

const TABS = ["Find talent", "Reachouts", "Chat", "Agent", "You"] as const;

// Fixed bottom tab bar. Placeholder square glyphs — swap for the real Figma
// tab-bar icons (icon-tab-*.svg) in Phase 1.
export const TabBar: React.FC = () => (
  <div
    style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      width: SCREEN.w,
      height: TAB_BAR_H,
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-around",
      paddingTop: theme.space.md,
      background: theme.color.screenBg,
      borderTop: `1px solid ${theme.color.line}`,
      zIndex: 20,
      fontFamily: theme.font.family,
    }}
  >
    {TABS.map((t, i) => (
      <div
        key={t}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          color: i === 0 ? theme.color.brand : theme.color.inkMuted,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: "currentColor",
            opacity: i === 0 ? 1 : 0.5,
          }}
        />
        <span style={{ fontSize: 20, fontWeight: 500 }}>{t}</span>
      </div>
    ))}
  </div>
);
