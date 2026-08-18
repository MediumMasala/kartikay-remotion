import React from "react";
import { SF, SERIF, c } from "./tokens";

// Absolutely-positioned text at design coordinates. `y` is the glyph cap-top
// from the export; we offset by the line-box leading so it lands exactly.
export const Txt: React.FC<{
  x?: number;
  y: number;
  w?: number;
  right?: number;
  size: number;
  weight?: number;
  color?: string;
  lh?: number;
  ls?: number;
  serif?: boolean;
  align?: "left" | "center" | "right";
  underline?: boolean;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ x, y, w, right, size, weight = 400, color = "#2C2C2E", lh, ls, serif, align, underline, style, children }) => {
  const lineH = lh ?? Math.round(size * 1.25);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        right,
        width: w,
        top: y - (lineH - size * 0.72) / 2,
        fontFamily: serif ? SERIF : SF,
        fontSize: size,
        fontWeight: weight,
        color: c(color),
        lineHeight: `${lineH}px`,
        letterSpacing: ls ?? (size >= 20 ? -0.4 : -0.1),
        textAlign: align,
        textDecoration: underline ? "underline" : undefined,
        whiteSpace: w ? undefined : "nowrap",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Divider: React.FC<{ y: number; color?: string; x0?: number; x1?: number }> = ({
  y, color = "#EFEFF4", x0 = 16, x1 = 377,
}) => (
  <div style={{ position: "absolute", left: x0, top: y - 0.5, width: x1 - x0, height: 1, background: c(color) }} />
);

export const VLine: React.FC<{ x: number; y0: number; y1: number; color?: string }> = ({
  x, y0, y1, color = "#EFEFF4",
}) => (
  <div style={{ position: "absolute", left: x - 0.5, top: y0, width: 1, height: y1 - y0, background: c(color) }} />
);

// The grey "Reply" pill (full-width and compact variants share this).
export const ReplyPill: React.FC<{ x: number; y: number; w: number; h?: number }> = ({ x, y, w, h = 51 }) => (
  <div
    style={{
      position: "absolute", left: x, top: y, width: w, height: h,
      background: c("#F5F5F8"), borderRadius: h / 2,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: SF, fontSize: 15, fontWeight: 500, color: c("#1C1C1E"), letterSpacing: -0.1,
    }}
  >
    Reply
  </div>
);
