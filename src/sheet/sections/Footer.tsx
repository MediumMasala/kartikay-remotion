import React from "react";
import { Img, staticFile } from "remotion";
import { ExtG } from "../Ext";
import { Txt, Divider, VLine } from "../ui";
import { SF, c } from "../tokens";

const NS = [
  { icon: "nsDoc" as const, label: "Request resume", cx: 75.1 },
  { icon: "nsLink" as const, label: "Share Link", cx: 197 },
  { icon: "nsPdf" as const, label: "Share PDF", cx: 318.4 },
];
const TABS: Array<{ label: string; cx: number; active?: boolean }> = [
  { label: "Find talent", cx: 56 }, { label: "Reachouts", cx: 123, active: true },
  { label: "Chat", cx: 203 }, { label: "Agent", cx: 272 }, { label: "You", cx: 345 },
];

// Cream "Next steps" + concierge block, floating action pills, tal tab bar.
export const Footer: React.FC = () => (
  <>
    {/* ── cream: Next steps ── */}
    <Txt x={0} w={393} align="center" y={5030} size={20} weight={700} color="#2C2C2E" lh={25} ls={-0.4}>
      Next steps
    </Txt>
    <VLine x={134.25} y0={5060} y1={5104} color="#DEDEE5" />
    <VLine x={259.75} y0={5060} y1={5104} color="#DEDEE5" />
    {NS.map((n) => (
      <React.Fragment key={n.icon}>
        <ExtG name={n.icon} />
        <Txt x={n.cx - 60} w={120} align="center" y={5112} size={15} weight={500} color="#2C2C2E" lh={20}>
          {n.label}
        </Txt>
      </React.Fragment>
    ))}
    <Divider y={5166.76} color="#DEDEE5" />

    {/* concierge */}
    <Img
      src={staticFile("assets/sheet/image0.png")}
      style={{ position: "absolute", left: -6.7, top: 5182, width: 136.7, height: 91.1 }}
    />
    <Txt x={129} y={5192} size={20} weight={700} color="#2C2C2E" lh={27} ls={-0.4}>
      Stuck somewhere?
      <br />
      Tal concierge is a tap away
    </Txt>
    <Txt x={129} y={5250} size={15} weight={500} color="#6C6C70" lh={20} underline>
      Connect with a Concierge Partner
    </Txt>

    {/* ── floating pills ── */}
    <div
      style={{
        position: "absolute", left: 16, top: 5694, width: 67, height: 67, borderRadius: 34,
        background: "#ffffff", boxShadow: "0 8px 24px rgba(16,16,20,0.10), 0 2px 6px rgba(16,16,20,0.06)",
      }}
    />
    <div
      style={{
        position: "absolute", left: 154.6, top: 5694, width: 222.4, height: 67, borderRadius: 34,
        background: "#ffffff", boxShadow: "0 8px 24px rgba(16,16,20,0.10), 0 2px 6px rgba(16,16,20,0.06)",
      }}
    />
    <ExtG name="pillX" />
    <ExtG name="pillDoc" />
    <ExtG name="pillChat" />
    <VLine x={266.5} y0={5713} y1={5741} />
    <Txt x={149} w={124} align="center" y={5737} size={15} weight={500} color="#2C2C2E" lh={20}>
      Request resume
    </Txt>
    <Txt x={269} w={106} align="center" y={5737} size={15} weight={500} color="#2C2C2E" lh={20}>
      Reply
    </Txt>

    {/* ── tab bar ── */}
    <div style={{ position: "absolute", left: 0, top: 5786.5, width: 393, height: 93.5, background: "#ffffff" }} />
    <div style={{ position: "absolute", left: 0, top: 5786.5, width: 393, height: 1, background: c("#EFEFF4") }} />
    <ExtG name="tabTal" />
    <ExtG name="tabHand" />
    <ExtG name="tabChat" />
    <ExtG name="tabDots" />
    <Img
      src={staticFile("assets/sheet/image12.png")}
      style={{ position: "absolute", left: 337.5, top: 5803.9, width: 20.2, height: 20.2, borderRadius: 10.1, objectFit: "cover" }}
    />
    {TABS.map((t) => (
      <div
        key={t.label}
        style={{
          position: "absolute", left: t.cx - 55, top: 5835, width: 110, textAlign: "center",
          fontFamily: SF, fontSize: 12, fontWeight: t.active ? 600 : 500,
          color: c(t.active ? "#1C1C1E" : "#6C6C70"), letterSpacing: -0.1, lineHeight: "16px",
        }}
      >
        {t.label}
      </div>
    ))}
  </>
);
