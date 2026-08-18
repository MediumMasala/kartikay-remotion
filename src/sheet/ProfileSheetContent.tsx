import React from "react";
import { SheetDefs } from "./Ext";
import { Divider } from "./ui";
import { SF, c, SHEET_PT } from "./tokens";
import { Hero } from "./sections/Hero";
import { Experience } from "./sections/Experience";
import { Codeforces } from "./sections/Codeforces";
import { Spike } from "./sections/Spike";
import { Github } from "./sections/Github";
import { Media } from "./sections/Media";
import { AIStack } from "./sections/AIStack";
import { TalScore } from "./sections/TalScore";
import { Footer } from "./sections/Footer";

// Every full-width hairline divider in the export (y positions from <line> els).
const DIVIDERS = [427.5, 509.5, 591.5, 883.5, 1381.5, 1779.5, 2019.5, 2752.5, 3344.5, 4157.75, 4643.27];

// The full candidate profile, rebuilt in code at the export's native 393×5880.
// Scale externally; everything inside is laid out at design coordinates.
export const ProfileSheetContent: React.FC = () => (
  <div
    style={{
      position: "relative",
      width: SHEET_PT.w,
      height: SHEET_PT.h,
      borderRadius: 24,
      overflow: "hidden",
      background: "#ffffff",
      fontFamily: SF,
      WebkitFontSmoothing: "antialiased",
    }}
  >
    <SheetDefs />

    {/* cream band behind the sheet's rounded white bottom + Next steps region */}
    <div style={{ position: "absolute", left: 0, top: 4890, width: 393, height: 5379.3 - 4890, background: c("#F4F2EC") }} />
    {/* white content area ends at 4971.3 with rounded bottom corners over cream */}
    <div
      style={{
        position: "absolute", left: 0, top: 4653.8, width: 393, height: 317.5,
        background: "#ffffff", borderRadius: "0 0 24px 24px",
      }}
    />

    <Hero />
    <Experience />
    <Codeforces />
    <Spike />
    <Github />
    <Media />
    <AIStack />
    <TalScore />
    <Footer />

    {DIVIDERS.map((y) => (
      <Divider key={y} y={y} />
    ))}
  </div>
);
