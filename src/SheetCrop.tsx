import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

// Dev-only rig: renders the profile SVG at 3× natural size, shifted so a
// 735pt-tall chunk fills the 1179×2205 canvas — used to transcribe the design.
export const CROP = { w: 1179, h: 2205, scale: 3 } as const;

export const SheetCrop: React.FC<{ y: number }> = ({ y }) => (
  <AbsoluteFill style={{ background: "#ffffff" }}>
    <div style={{ translate: `0px ${-y * CROP.scale}px` }}>
      <Img
        src={staticFile("assets/profile-sheet.svg")}
        style={{ width: 393 * CROP.scale, height: "auto", display: "block" }}
      />
    </div>
  </AbsoluteFill>
);
