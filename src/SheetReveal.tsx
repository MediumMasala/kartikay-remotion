import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { theme } from "./theme";

// ─────────────────────────────────────────────────────────────────────────
// SheetReveal — 720×900. TalBoss wordmark fades out, then the REAL Figma
// profile (public/assets/profile-sheet.svg — the exact export, text outlined,
// photos embedded) rises from below at 75% canvas width, centred, and scrolls
// to the end in one continuous easy glide, growing past full-bleed so its
// rounded side borders leave the frame. No device chrome. Every value is a
// pure function of useCurrentFrame().
// ─────────────────────────────────────────────────────────────────────────

export const SHEET_CANVAS = { w: 720, h: 900 } as const;

// The SVG's natural geometry (393×5880). We lay it out at 2× natural width so
// Chrome rasterises the vector large and every displayed size is a downscale
// (max scale ≈ 0.96) — always crisp, never soft.
const SVG = { w: 393, h: 5880 } as const;
const IMG_W = SVG.w * 2;

// Coverage: fraction of canvas width the sheet occupies.
const COVER_START = 0.75; // floats as a centred card at entry
const COVER_END = 1.05; // past full-bleed → side borders/corners exit the frame
const COVER_DONE = 0.7; // reaches full-bleed by 70% of the scroll
const END_OVERSHOOT = 28; // rest 28px past the bottom so the sheet's bottom corners exit too

// Timing (30fps). Total = SCROLL_START + SCROLL_DUR + end hold + loop fade.
const LOGO_IN: readonly [number, number] = [0, 12];
const LOGO_OUT: readonly [number, number] = [46, 62];
const SCROLL_START = 56; // sheet starts rising as the logo clears
const SCROLL_DUR = 540; // 18s glide through the whole profile
const RAMP = 90; // ease ramp at each end (velocity-continuous)
const END_FADE = 20; // dissolve to bg → seamless loop back to the logo
export const SHEET_DURATION = 660; // 22s

// Quad-in → linear cruise → quad-out, with matched velocity at the joints
// (no stutter): v = 1/(D−R); ramps each cover v·R/2 of the progress.
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

  // ── Sheet transform ────────────────────────────────────────────────────
  const p = scrollP(frame);
  const cover = interpolate(p, [0, COVER_DONE], [COVER_START, COVER_END], clamp);
  const coverW = SHEET_CANVAS.w * cover;
  const scale = coverW / IMG_W;
  const endH = (SVG.h / SVG.w) * SHEET_CANVAS.w * COVER_END;
  const left = (SHEET_CANVAS.w - coverW) / 2;
  // p=0 → top of sheet at canvas bottom (fully below); p=1 → its bottom edge
  // rests just past the canvas bottom (chrome in view, corners hidden).
  const top = SHEET_CANVAS.h - p * (endH + END_OVERSHOOT);

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
    [SHEET_DURATION - END_FADE, SHEET_DURATION - 1],
    [0, 1],
    clamp,
  );

  return (
    <AbsoluteFill style={{ background: theme.color.canvasBg }}>
      {/* The exact Figma sheet — rendered from the SVG export itself. */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: IMG_W,
          transformOrigin: "0 0",
          translate: `${left}px ${top}px`,
          scale: `${scale}`,
          willChange: "translate",
        }}
      >
        <Img
          src={staticFile("assets/profile-sheet.svg")}
          style={{
            width: IMG_W,
            height: "auto",
            display: "block",
            filter: `drop-shadow(0 ${18 / scale}px ${52 / scale}px rgba(16,16,20,0.16))`,
          }}
        />
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
