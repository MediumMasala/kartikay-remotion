import React from "react";
import { Img, staticFile } from "remotion";
import { Card } from "../ui";
import { theme } from "../theme";
import { candidate } from "../data";

const Lock: React.FC = () => (
  <svg width={30} height={30} viewBox="0 0 24 24" fill="none">
    <rect x="4" y="10" width="16" height="11" rx="3" fill={theme.color.brandInk} />
    <path d="M8 10V7a4 4 0 018 0v3" stroke={theme.color.brandInk} strokeWidth="2.3" strokeLinecap="round" />
    <circle cx="12" cy="15.4" r="1.9" fill={theme.color.accent} />
  </svg>
);

// Concierge: closing "request the résumé" beat — real résumé preview (locked).
// The fixed "Request resume" pill is the action; this card frames the ask.
export const Concierge: React.FC<{ arrive: number }> = () => (
  <Card style={{ height: "100%", display: "flex", alignItems: "center", gap: theme.space.lg, fontFamily: theme.font.family }}>
    <div style={{ position: "relative", width: 150, height: 210, flexShrink: 0, borderRadius: theme.radius.sm, overflow: "hidden", boxShadow: theme.shadow.card }}>
      <Img src={staticFile("assets/resume-doc.png")} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(3px)" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(28,28,30,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 60, height: 60, borderRadius: theme.radius.pill, background: theme.color.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Lock />
        </div>
      </div>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: theme.space.sm }}>
      <span style={{ fontSize: theme.font.h2.size, fontWeight: theme.font.h2.weight, color: theme.color.ink }}>{candidate.resume.title}</span>
      <span style={{ fontSize: theme.font.body.size, color: theme.color.inkMuted }}>{candidate.resume.cta}</span>
    </div>
  </Card>
);
