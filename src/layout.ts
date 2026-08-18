// Fixed composition geometry. We rebuild the profile as components in this
// "rendered" space (786-wide phone screen), guided by the Figma proportions of
// node 3221:32062 (938×11395). 786 = 2× of a 393pt iPhone screen.

export const CANVAS = { w: 1080, h: 1920 } as const; // 9:16 output

export const SCREEN = { w: 786, h: 1704 } as const; // phone viewport, centred

export const SCREEN_ORIGIN = {
  x: (CANVAS.w - SCREEN.w) / 2, // 147
  y: (CANVAS.h - SCREEN.h) / 2, // 108
} as const;

// Fixed chrome heights.
export const STATUS_BAR_H = 88;
export const TAB_BAR_H = 150;
