import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { theme } from "./theme";

// Shared visual primitives. Every color/spacing value comes from theme.

export const Card: React.FC<{
  children: React.ReactNode;
  pad?: number;
  style?: React.CSSProperties;
}> = ({ children, pad = theme.space.lg, style }) => (
  <div
    style={{
      background: theme.color.cardBg,
      borderRadius: theme.radius.xl,
      boxShadow: theme.shadow.card,
      padding: pad,
      boxSizing: "border-box",
      fontFamily: theme.font.family,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Skeleton: React.FC<{
  w: number | string;
  h: number;
  r?: number;
  style?: React.CSSProperties;
}> = ({ w, h, r = theme.radius.s, style }) => (
  <div
    style={{ width: w, height: h, borderRadius: r, background: theme.color.line, ...style }}
  />
);

export const Verified: React.FC<{ size?: number }> = ({ size = 34 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 1.6l2.6 1.9 3.2-.1 1 3 2.6 1.8-1 3 1 3-2.6 1.8-1 3-3.2-.1L12 22.4l-2.6-1.9-3.2.1-1-3L2.6 15.8l1-3-1-3 2.6-1.8 1-3 3.2.1L12 1.6z"
      fill={theme.color.accent}
    />
    <path
      d="M8 12l2.6 2.6L16 9.2"
      stroke={theme.color.brandInk}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowTopRight: React.FC<{ size?: number; color?: string }> = ({
  size = 26,
  color = theme.color.inkSubtle,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M7 17L17 7M17 7H9M17 7V15"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Deterministic thousands separator (no locale dependence).
export const withCommas = (n: number): string =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// Integer that counts up from 0 → `to` over `dur` frames starting at `arrive`.
export const CountUp: React.FC<{
  to: number;
  arrive: number;
  dur?: number;
  prefix?: string;
  suffix?: string;
  style?: React.CSSProperties;
}> = ({ to, arrive, dur = 20, prefix = "", suffix = "", style }) => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [arrive, arrive + dur], [0, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return (
    <span style={style}>
      {prefix}
      {withCommas(v)}
      {suffix}
    </span>
  );
};
