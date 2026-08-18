// theme.ts — THE single source of design tokens, pulled from Figma
// (get_variable_defs on node 3221:32062, the Tal candidate profile).
// No hex literal may appear anywhere else in src/. `raw` mirrors the Figma
// token scale exactly; `color` exposes semantic aliases components read from.

const raw = {
  surface00: "#f5f5f8",
  surface10: "#ffffff",
  surface20: "#f5f5f8",
  surface25: "#efeff4",
  surface30: "#e5e5ea",
  surface50: "#8e8e93",
  surface60: "#6c6c70",
  surface70: "#48484a",
  surface80: "#2c2c2e",
  surface90: "#1c1c1e",
  grey60: "#48484a",
  grey80: "#1c1c1e",
  blue50: "#3078bf",
  red50: "#b23a2d",
  yellow50: "#bf9c26",
  orange50: "#bf5f0a",
  green10: "#daf2e6",
  green20: "#95e5bd",
  green40: "#13bf69",
  green50: "#238c58",
  green60: "#1f593c",
  creme: "#fcf9df",
} as const;

export const theme = {
  raw,
  color: {
    // surfaces
    pageBg: raw.surface00,
    cardBg: raw.surface10,
    chip: raw.surface25,
    chipBg: raw.surface25,
    screenBg: raw.surface00,
    surface: raw.surface00,
    // text
    ink: raw.grey80,
    inkMuted: raw.surface60,
    inkSubtle: raw.surface50,
    // lines
    line: raw.surface30,
    // accents
    brand: raw.blue50,
    accent: raw.blue50,
    good: raw.green40,
    warnBg: raw.creme,
    brandInk: raw.surface10,
    // GitHub contribution heatmap ramp (empty → hottest)
    heat: [raw.surface25, raw.green10, raw.green20, raw.green40, raw.green50] as const,
    // device
    bezel: "#0a0a0c",
  },
  shadow: {
    card: "0 1px 2px rgba(16,16,20,0.05), 0 10px 30px rgba(16,16,20,0.06)",
    device: "0 40px 120px rgba(0,0,0,0.28)",
    pill: "0 10px 28px rgba(0,0,0,0.14)",
  },
  radius: { s: 8, sm: 12, md: 16, lg: 22, xl: 28, pill: 999 },
  space: { xs: 6, sm: 10, md: 16, lg: 24, xl: 32 },
  stroke: { xs: 1, s: 1.25 },
  font: {
    // Design is iOS/SF Pro; Inter is the web stand-in (loaded via @remotion/google-fonts).
    family: "Inter",
    hero: { size: 46, weight: 700, line: 1.06 },
    h2: { size: 34, weight: 700, line: 1.14 },
    title: { size: 27, weight: 600, line: 1.2 },
    body: { size: 20, weight: 400, line: 1.42 },
    label: { size: 17, weight: 500, line: 1.3 },
    mono: { size: 22, weight: 600, line: 1.2 },
    stat: { size: 40, weight: 700, line: 1.0 },
  },
} as const;
