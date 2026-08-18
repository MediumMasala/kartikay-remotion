import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "./theme";
import { ProfileSheetContent } from "./sheet/ProfileSheetContent";
import { SHEET_PT } from "./sheet/tokens";

// ─────────────────────────────────────────────────────────────────────────
// SheetReveal — 720×900 @60fps. TalBoss wordmark fades out, then the profile
// (now rebuilt in CODE from the Figma export — src/sheet/*) rises from below
// at 75% canvas width, centred, and glides to the end in one continuous easy
// move, growing past full-bleed so its rounded side borders leave the frame.
// Every value is a pure function of useCurrentFrame(). Timing is authored in
// SECONDS so the fps can change without retiming.
// ─────────────────────────────────────────────────────────────────────────

export const SHEET_CANVAS = { w: 720, h: 900 } as const;
export const SHEET_FPS = 60;

// Coverage: fraction of canvas width the sheet occupies.
const COVER_START = 0.75; // floats as a centred card at entry
const COVER_END = 1.05; // past full-bleed → side borders/corners exit the frame
const COVER_DONE = 0.7; // reaches full-bleed by 70% of the scroll
const END_OVERSHOOT = 28; // rest past the bottom so the sheet's bottom corners exit too

// Timing (seconds → frames at SHEET_FPS)
const sec = (s: number) => Math.round(s * SHEET_FPS);
const LOGO_IN: readonly [number, number] = [sec(0), sec(0.4)];
const LOGO_OUT: readonly [number, number] = [sec(1.53), sec(2.07)];
const SCROLL_START = sec(1.87); // sheet starts rising as the logo clears
const SCROLL_DUR = sec(22); // 22s glide through the whole profile
const RAMP = sec(3); // ease ramp at each end (velocity-continuous)
const END_FADE = sec(0.67); // dissolve to bg → seamless loop back to the logo
export const SHEET_DURATION = sec(26); // 26s

// Quad-in → linear cruise → quad-out, with matched velocity at the joints.
const scrollP = (frame: number): number => {
  const x = Math.min(Math.max(frame - SCROLL_START, 0), SCROLL_DUR);
  const v = 1 / (SCROLL_DUR - RAMP);
  if (x < RAMP) return (v * x * x) / (2 * RAMP);
  if (x <= SCROLL_DUR - RAMP) return v * (RAMP / 2 + (x - RAMP));
  const y = SCROLL_DUR - x;
  return 1 - (v * y * y) / (2 * RAMP);
};

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const SheetReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // ── Sheet transform ────────────────────────────────────────────────────
  const p = scrollP(frame);
  const cover = interpolate(p, [0, COVER_DONE], [COVER_START, COVER_END], clamp);
  const coverW = SHEET_CANVAS.w * cover;
  const scale = coverW / SHEET_PT.w;
  const endH = (SHEET_PT.h / SHEET_PT.w) * SHEET_CANVAS.w * COVER_END;
  const left = (SHEET_CANVAS.w - coverW) / 2;
  // p=0 → top of sheet at canvas bottom (fully below); p=1 → its bottom edge
  // rests just BELOW the canvas bottom (chrome in view, corners hidden).
  const top = SHEET_CANVAS.h - p * (endH - END_OVERSHOOT);

  // ── Logo ───────────────────────────────────────────────────────────────
  const logoOpacity =
    interpolate(frame, LOGO_IN, [0, 1], clamp) *
    interpolate(frame, LOGO_OUT, [1, 0], clamp);
  const logoScale = interpolate(frame, [LOGO_IN[0], LOGO_OUT[1]], [0.96, 1.04], {
    ...clamp,
    easing: (t) => 1 - (1 - t) * (1 - t),
  });

  // ── Seamless loop: end dissolves to the bare bg the logo fades in from ──
  const wrapFade = interpolate(
    frame,
    [durationInFrames - END_FADE, durationInFrames - 1],
    [0, 1],
    clamp,
  );

  return (
    <AbsoluteFill style={{ background: theme.color.canvasBg }}>
      {/* The profile sheet — code rebuild of the Figma export. */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: SHEET_PT.w,
          transformOrigin: "0 0",
          translate: `${left}px ${top}px`,
          scale: `${scale}`,
          willChange: "translate",
        }}
      >
        <div style={{ filter: "drop-shadow(0 10px 30px rgba(16,16,20,0.16))" }}>
          <ProfileSheetContent />
        </div>
      </div>

      {/* TalBoss wordmark intro */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <Img
          src={staticFile("assets/tal-boss-wordmark-dark.png")}
          style={{
            width: 236,
            opacity: logoOpacity,
            scale: `${logoScale}`,
          }}
        />
      </AbsoluteFill>

      {/* Loop dissolve */}
      <AbsoluteFill
        style={{ background: theme.color.canvasBg, opacity: wrapFade, pointerEvents: "none" }}
      />
    </AbsoluteFill>
  );
};
