// Sheet-local tokens — pulled from the Figma SVG export (profile-sheet.svg).
// The export paints in display-p3; c() returns the exact p3 color Chrome
// renders for a given Figma hex, so the code rebuild matches pixel-for-pixel.

const P3: Record<string, string> = {
  "#0B0B0D": "color(display-p3 0.0431 0.0431 0.0510)",
  "#13BF69": "color(display-p3 0.0745 0.7490 0.4118)",
  "#1C1C1E": "color(display-p3 0.1098 0.1098 0.1176)",
  "#1F593C": "color(display-p3 0.1216 0.3490 0.2353)",
  "#238C58": "color(display-p3 0.1373 0.5490 0.3451)",
  "#2C2C2E": "color(display-p3 0.1725 0.1725 0.1804)",
  "#3078BF": "color(display-p3 0.1882 0.4706 0.7490)",
  "#3078C6": "color(display-p3 0.1882 0.4706 0.7765)",
  "#3572A5": "color(display-p3 0.2078 0.4471 0.6471)",
  "#48484A": "color(display-p3 0.2824 0.2824 0.2902)",
  "#6C6C70": "color(display-p3 0.4235 0.4235 0.4392)",
  "#8E8E93": "color(display-p3 0.5569 0.5569 0.5765)",
  "#95E5BD": "color(display-p3 0.5837 0.8980 0.7426)",
  "#AEAEB2": "color(display-p3 0.6824 0.6824 0.6980)",
  "#B23A2D": "color(display-p3 0.6980 0.2275 0.1765)",
  "#BF9C26": "color(display-p3 0.7490 0.6118 0.1490)",
  "#DAF2E6": "color(display-p3 0.8550 0.9500 0.9025)",
  "#DEDEE5": "color(display-p3 0.8694 0.8694 0.8969)",
  "#E34C26": "color(display-p3 0.8902 0.2980 0.1490)",
  "#EFEFF4": "color(display-p3 0.9373 0.9373 0.9569)",
  "#F4F2EC": "color(display-p3 0.9569 0.9490 0.9255)",
  "#F5F5F8": "color(display-p3 0.9608 0.9608 0.9725)",
  "#F7DF1C": "color(display-p3 0.9686 0.8745 0.1098)",
  "#FF7800": "color(display-p3 1.0000 0.4693 0.0000)",
};

export const c = (hex: string): string => P3[hex.toUpperCase()] ?? hex;

// The design is set in SF Pro (iOS system font — available to Chrome on macOS).
export const SF =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", sans-serif';
// Serif display face used for "Tal saw a Spike!" / "Sanchit's AI Stack".
export const SERIF = 'Didot, "New York", "Playfair Display", Georgia, serif';

export const SHEET_PT = { w: 393, h: 5880 } as const;
