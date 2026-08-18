import { SCREEN } from "./layout";

// ─────────────────────────────────────────────────────────────────────────
// Section geometry. Order + relative sizing mirror Figma node 3221:32062;
// heights are in rendered px (786-wide space), chosen to read well and give a
// calm, deliberate scroll. Offsets are derived so the timeline can centre each.
// ─────────────────────────────────────────────────────────────────────────

export type SectionId =
  | "hero"
  | "stats"
  | "experience"
  | "codeforces"
  | "spike"
  | "share"
  | "github"
  | "visual"
  | "aiStack"
  | "talScore"
  | "concierge";

export const SECTION_ORDER: readonly SectionId[] = [
  "hero",
  "stats",
  "experience",
  "codeforces",
  "spike",
  "share",
  "github",
  "visual",
  "aiStack",
  "talScore",
  "concierge",
] as const;

export const SECTION_H: Record<SectionId, number> = {
  hero: 470,
  stats: 190,
  experience: 430,
  codeforces: 720,
  spike: 470,
  share: 220,
  github: 780,
  visual: 520,
  aiStack: 520,
  talScore: 620,
  concierge: 380,
};

export const GAP = 28; // vertical gap between sections
export const PAD_TOP = 96; // clearance below the status bar at the very top
export const PAD_BOTTOM = 300; // clearance so the last section clears the tab bar + pills

// Cumulative top offset of each section, and total content height.
const _offsets = (() => {
  const map = {} as Record<SectionId, { top: number; h: number }>;
  let top = PAD_TOP;
  for (const id of SECTION_ORDER) {
    map[id] = { top, h: SECTION_H[id] };
    top += SECTION_H[id] + GAP;
  }
  return { map, total: top - GAP + PAD_BOTTOM };
})();

export const OFFSETS = _offsets.map;
export const CONTENT_H = _offsets.total;
export const MAX_SCROLL = Math.max(0, CONTENT_H - SCREEN.h);

// scrollY that centres a section in the viewport (clamped to content bounds).
export const centerScroll = (id: SectionId): number => {
  const { top, h } = OFFSETS[id];
  const target = top - (SCREEN.h - h) / 2;
  return Math.max(0, Math.min(target, MAX_SCROLL));
};

// ─────────────────────────────────────────────────────────────────────────
// Candidate content. Pulled from the Figma layer text where present; values
// marked ⚠ are assumed (Figma used generic "Content" layers we can't read, or
// filled from the brief) — confirm/replace.
// ─────────────────────────────────────────────────────────────────────────

export const candidate = {
  name: "Kabir Arora",
  role: "SDE I, Porter",
  companyLogo: "logo-porter.png", // hero shows the company logo (no avatar)
  verified: true,
  topBadge: "Top 1% of all candidates for you",
  // real values from the Figma export
  stats: [
    { value: "₹35 LPA", label: "CTC" },
    { value: "4 years", label: "Work Experience" },
    { value: "BLR", label: "Location" },
  ],
  experience: [
    { company: "Porter", role: "SDE I", period: "2024 — Now", logo: "logo-porter.png" },
    { company: "Swiggy", role: "SDE Intern", period: "2023 — 2024", logo: "logo-swiggy.png" }, // ⚠ role/period assumed
  ],
  codeforces: {
    label: "Latest Contest Rating",
    rating: 1259,
    months: ["Sep 24", "Nov 24", "Jan 25", "Mar 25", "May 25", "Jul 25", "Sep 25", "Nov 25", "Jan 26"],
    grid: [1200, 1400, 1600, 1900],
    // rating path (y in rating units) — ⚠ shape approximated for the draw
    series: [1180, 1150, 1240, 1210, 1330, 1300, 1440, 1400, 1259],
  },
  spike: {
    title: "Tal saw a Spike!",
    body: "Training all day for a decade and a champion's mindset get carried into how Kabir ships code.", // ⚠ truncated in Figma
  },
  github: {
    contributions: 545, // ⚠
    languages: [
      { name: "JavaScript", pct: 41 },
      { name: "Python", pct: 20 },
      { name: "TypeScript", pct: 11 },
      { name: "HTML", pct: 11 },
      { name: "C", pct: 7 },
    ],
    repos: [
      { name: "Ribbit", lang: "HTML" },
      { name: "linkedin-ad-redirect-tester", lang: "JavaScript" },
      { name: "Ribbit1", lang: "HTML" },
    ],
  },
  aiStack: [
    { name: "Claude Code", logo: "logo-claude-code.png" },
    { name: "Codex", logo: "logo-codex.png" },
    { name: "Cursor", logo: "logo-cursor.png" },
  ],
  talScore: 92,
  resume: {
    title: "Kabir's resume",
    cta: "Send a request to see his resume",
  },
} as const;
