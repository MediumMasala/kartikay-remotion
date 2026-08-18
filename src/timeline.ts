import { interpolate, Easing } from "remotion";
import { centerScroll, SECTION_ORDER, type SectionId } from "./data";

// ─────────────────────────────────────────────────────────────────────────
// timeline.ts — THE single knob for scroll timing. Each stop names a section;
// its scrollY is derived from the real section offset via centerScroll(), so
// pauses always land the card centred. Repeat a section to hold (pause).
// ─────────────────────────────────────────────────────────────────────────

export type Beat =
  | "hero"
  | "stats"
  | "experience"
  | "codeforces"
  | "spike"
  | "github"
  | "aiStack"
  | "talScore"
  | "concierge";

type StopSpec = { f: number; id: SectionId; beat?: Beat };
export type Stop = { frame: number; y: number; beat?: Beat };

const build = (specs: readonly StopSpec[]): Stop[] =>
  specs.map((s) => ({ frame: s.f, y: centerScroll(s.id), beat: s.beat }));

// Full 14s walkthrough (420f @30). Longest holds on Codeforces + Tal Score.
export const FULL_STOPS: Stop[] = build([
  { f: 0, id: "hero", beat: "hero" },
  { f: 28, id: "hero" },
  { f: 52, id: "stats", beat: "stats" },
  { f: 68, id: "stats" },
  { f: 92, id: "experience", beat: "experience" },
  { f: 106, id: "experience" },
  { f: 138, id: "codeforces", beat: "codeforces" },
  { f: 176, id: "codeforces" }, // long hold — chart draws
  { f: 200, id: "spike", beat: "spike" },
  { f: 218, id: "spike" },
  { f: 248, id: "github", beat: "github" },
  { f: 284, id: "github" }, // heatmap fills
  { f: 308, id: "aiStack", beat: "aiStack" },
  { f: 324, id: "aiStack" },
  { f: 352, id: "talScore", beat: "talScore" },
  { f: 388, id: "talScore" }, // 92 lands (~f367) + holds ~21f
  { f: 402, id: "concierge", beat: "concierge" },
  { f: 420, id: "concierge" }, // concierge clear ~402–410, then dissolve
]);

// ~10s landing cut (300f @30): hero → Codeforces → Tal Score.
export const SHORT_STOPS: Stop[] = build([
  { f: 0, id: "hero", beat: "hero" },
  { f: 40, id: "hero" },
  { f: 110, id: "codeforces", beat: "codeforces" },
  { f: 165, id: "codeforces" },
  { f: 235, id: "talScore", beat: "talScore" },
  { f: 300, id: "talScore" },
]);

// Flick-then-settle between stops (per-segment easing when >2 points).
const EASE = Easing.bezier(0.32, 0, 0.16, 1);

export const scrollYAt = (frame: number, stops: Stop[]): number =>
  interpolate(
    frame,
    stops.map((s) => s.frame),
    stops.map((s) => s.y),
    { easing: EASE, extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

// The frame at which each section first reaches its centred scroll position —
// used by sections to time their entrance + signature animations. scrollY is
// non-decreasing across a walkthrough, so a forward scan is exact.
export const computeArrive = (
  stops: Stop[],
  duration: number,
): Record<SectionId, number> => {
  const out = {} as Record<SectionId, number>;
  for (const id of SECTION_ORDER) {
    const target = centerScroll(id);
    let hit = duration;
    for (let f = 0; f <= duration; f++) {
      if (scrollYAt(f, stops) >= target - 1) {
        hit = f;
        break;
      }
    }
    out[id] = hit;
  }
  return out;
};

// Precomputed once — stops + durations are static per variant.
export const FULL_ARRIVE = computeArrive(FULL_STOPS, 420);
export const SHORT_ARRIVE = computeArrive(SHORT_STOPS, 300);
