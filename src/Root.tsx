import React from "react";
import { Composition } from "remotion";
import { ProfileScroll } from "./ProfileScroll";
import { CANVAS } from "./layout";

const FPS = 30;

export const RemotionRoot: React.FC = () => (
  <>
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
