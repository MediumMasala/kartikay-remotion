import React from "react";
import { AbsoluteFill } from "remotion";
import { ProfileSheetContent } from "./sheet/ProfileSheetContent";
import { CROP } from "./SheetCrop";

// Dev-only rig: renders the CODE rebuild at 3× for side-by-side diffing
// against SheetCrop (the SVG ground truth) at the same y offset.
export const CodeCrop: React.FC<{ y: number }> = ({ y }) => (
  <AbsoluteFill style={{ background: "#ffffff" }}>
    <div
      style={{
        position: "absolute",
        transformOrigin: "0 0",
        translate: `0px ${-y * CROP.scale}px`,
        scale: `${CROP.scale}`,
      }}
    >
      <ProfileSheetContent />
    </div>
  </AbsoluteFill>
);
