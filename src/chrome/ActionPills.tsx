import React from "react";
import { SCREEN } from "../layout";
import { theme } from "../theme";

// Floating action pills over the bottom edge: ✕ / Request resume / Reply.
// Sits above the tab bar (bottomOffset = tab bar height).
export const ActionPills: React.FC<{ bottomOffset: number }> = ({
  bottomOffset,
}) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      width: SCREEN.w,
      bottom: bottomOffset + theme.space.lg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: theme.space.md,
      zIndex: 25,
    }}
  >
    <Pill label="✕" circle />
    <Pill label="Request resume" primary />
    <Pill label="Reply" />
  </div>
);

const Pill: React.FC<{ label: string; primary?: boolean; circle?: boolean }> = ({
  label,
  primary,
  circle,
}) => (
  <div
    style={{
      height: 92,
      minWidth: circle ? 92 : undefined,
      padding: circle ? 0 : `0 ${theme.space.xl}px`,
      borderRadius: theme.radius.pill,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: primary ? theme.color.brand : theme.color.chip,
      color: primary ? theme.color.brandInk : theme.color.ink,
      fontFamily: theme.font.family,
      fontSize: 26,
      fontWeight: 600,
      boxShadow: theme.shadow.pill,
    }}
  >
    {label}
  </div>
);
