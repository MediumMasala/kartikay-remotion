import React from "react";
import { Composition } from "remotion";
import { ProfileScroll } from "./ProfileScroll";
import { SheetReveal, SHEET_CANVAS, SHEET_DURATION, SHEET_FPS } from "./SheetReveal";
import { SheetCrop, CROP } from "./SheetCrop";
import { CodeCrop } from "./CodeCrop";
import { CANVAS } from "./layout";

const FPS = 30;

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="SheetCrop"
      component={SheetCrop}
      durationInFrames={1}
      fps={FPS}
      width={CROP.w}
      height={CROP.h}
      defaultProps={{ y: 0 }}
    />
    <Composition
      id="CodeCrop"
      component={CodeCrop}
      durationInFrames={1}
      fps={FPS}
      width={CROP.w}
      height={CROP.h}
      defaultProps={{ y: 0 }}
    />
    <Composition
      id="ProfileSheet"
      component={SheetReveal}
      durationInFrames={SHEET_DURATION} // 26s @60
      fps={SHEET_FPS}
      width={SHEET_CANVAS.w}
      height={SHEET_CANVAS.h}
    />
    <Composition
      id="ProfileScroll"
      component={ProfileScroll}
      durationInFrames={420} // 14s @30
      fps={FPS}
      width={CANVAS.w}
      height={CANVAS.h}
      defaultProps={{ showDeviceFrame: true, variant: "full" as const }}
    />
    <Composition
      id="ProfileScrollShort"
      component={ProfileScroll}
      durationInFrames={300} // ~10s @30
      fps={FPS}
      width={CANVAS.w}
      height={CANVAS.h}
      defaultProps={{ showDeviceFrame: true, variant: "short" as const }}
    />
  </>
);
