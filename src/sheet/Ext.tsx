import React from "react";
import { DEFS_RAW, EXT } from "./extracted";

// Injects the export's gradient/filter/clipPath defs once; url(#id) references
// resolve document-wide in Chrome, so every ExtG fragment can use them.
export const SheetDefs: React.FC = () => (
  <svg width={0} height={0} style={{ position: "absolute" }} aria-hidden>
    <defs dangerouslySetInnerHTML={{ __html: DEFS_RAW }} />
  </svg>
);

// Renders one extracted vector group verbatim at its original coordinates.
// `view` overrides the viewport (e.g. to clip the chart like the design does);
// `clip` false lets glows/shadows spill naturally.
export const ExtG: React.FC<{
  name: keyof typeof EXT & string;
  view?: [number, number, number, number];
  clip?: boolean;
}> = ({ name, view, clip = false }) => {
  const g = EXT[name];
  const [x0, y0, x1, y1] = view ?? g.bbox;
  const w = x1 - x0;
  const h = y1 - y0;
  return (
    <svg
      style={{ position: "absolute", left: x0, top: y0, overflow: clip ? "hidden" : "visible" }}
      width={w}
      height={h}
      viewBox={`${x0} ${y0} ${w} ${h}`}
      fill="none" // the export's root <svg fill="none"> — stroke icons inherit this
      dangerouslySetInnerHTML={{ __html: g.raw }}
    />
  );
};
