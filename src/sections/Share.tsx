import React from "react";
import { Card } from "../ui";
import { theme } from "../theme";

const Btn: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div
    style={{
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: theme.space.sm,
      height: 68,
      borderRadius: theme.radius.md,
      background: theme.color.chip,
      color: theme.color.ink,
      fontSize: theme.font.label.size + 1,
      fontWeight: 600,
    }}
  >
    {children}
    {label}
  </div>
);

// Share: utility card — Share Link / Share PDF.
export const Share: React.FC<{ arrive: number }> = () => (
  <Card style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", gap: theme.space.md }}>
    <div style={{ fontSize: theme.font.title.size, fontWeight: theme.font.title.weight, color: theme.color.ink }}>
      Share this profile
    </div>
    <div style={{ display: "flex", gap: theme.space.md }}>
      <Btn label="Share Link">
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <path d="M9 15l6-6M10 6l1-1a4 4 0 016 6l-1 1M14 18l-1 1a4 4 0 01-6-6l1-1" stroke={theme.color.accent} strokeWidth="2" strokeLinecap="round" />
        </svg>
      </Btn>
      <Btn label="Share PDF">
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <path d="M7 3h7l4 4v14H7z M14 3v4h4" stroke={theme.color.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Btn>
    </div>
  </Card>
);
