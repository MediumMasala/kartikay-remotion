import React from "react";
import { SCREEN } from "../layout";
import { CONTENT_H, SECTION_ORDER, type SectionId } from "../data";
import { Section } from "./Section";
import { Placeholder } from "./Placeholder";
import { Hero } from "./Hero";
import { Stats } from "./Stats";
import { Experience } from "./Experience";
import { Codeforces } from "./Codeforces";
import { Spike } from "./Spike";
import { Share } from "./Share";
import { Github } from "./Github";
import { Visual } from "./Visual";
import { AIStack } from "./AIStack";
import { TalScore } from "./TalScore";
import { Concierge } from "./Concierge";

// All sections are real; Placeholder remains the fallback for any unregistered id.
const REGISTRY: Partial<Record<SectionId, React.FC<{ arrive: number }>>> = {
  hero: Hero,
  stats: Stats,
  experience: Experience,
  codeforces: Codeforces,
  spike: Spike,
  share: Share,
  github: Github,
  visual: Visual,
  aiStack: AIStack,
  talScore: TalScore,
  concierge: Concierge,
};

export const SectionColumn: React.FC<{
  arrive: Record<SectionId, number>;
}> = ({ arrive }) => (
  <div style={{ position: "relative", width: SCREEN.w, height: CONTENT_H }}>
    {SECTION_ORDER.map((id) => {
      const Built = REGISTRY[id];
      return (
        <Section key={id} id={id} arrive={arrive[id]}>
          {Built ? <Built arrive={arrive[id]} /> : <Placeholder id={id} />}
        </Section>
      );
    })}
  </div>
);
