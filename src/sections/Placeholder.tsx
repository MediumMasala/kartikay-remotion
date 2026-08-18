import React from "react";
import { Card, Skeleton } from "../ui";
import { theme } from "../theme";
import type { SectionId } from "../data";

const LABEL: Record<SectionId, string> = {
  hero: "Hero",
  stats: "Stats",
  experience: "Experience",
  codeforces: "Codeforces",
  spike: "Tal saw a Spike!",
  share: "Share",
  github: "GitHub",
  visual: "Check out",
  aiStack: "AI Stack",
  talScore: "Tal Score",
  concierge: "Request résumé",
};

// Clean stand-in for a not-yet-built section, so the full scroll runs and reads
// like a loading profile. Replaced one section at a time.
export const Placeholder: React.FC<{ id: SectionId }> = ({ id }) => (
  <Card
    style={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      gap: theme.space.md,
    }}
  >
    <div
      style={{
        fontSize: theme.font.title.size,
        fontWeight: theme.font.title.weight,
        color: theme.color.ink,
      }}
    >
      {LABEL[id]}
    </div>
    <Skeleton w="72%" h={16} />
    <Skeleton w="92%" h={16} />
    <Skeleton w="54%" h={16} />
    <div
      style={{
        marginTop: "auto",
        fontSize: theme.font.label.size,
        color: theme.color.inkSubtle,
      }}
    >
      section coming in this build
    </div>
  </Card>
);
