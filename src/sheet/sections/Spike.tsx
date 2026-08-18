import React from "react";
import { Img, staticFile } from "remotion";
import { ExtG } from "../Ext";
import { Txt, ReplyPill } from "../ui";

// "Tal saw a Spike!" (serif) + the Share-this-profile cards below it.
export const Spike: React.FC = () => (
  <>
    <Img
      src={staticFile("assets/sheet/image4.png")}
      style={{ position: "absolute", left: 148.5, top: 1408, width: 97, height: 100 }}
    />
    <ExtG name="spikeShare" />
    <Txt x={0} w={393} align="center" y={1530} size={28} serif weight={400} color="#2C2C2E" lh={36} ls={0}>
      Tal saw a Spike!
    </Txt>
    <Txt x={26} w={341} align="center" y={1580} size={17} color="#2C2C2E" lh={26}>
      Co-founded CoachEd, an edtech mentorship startup, which they ran for 3 years and scaled to
      serve over 2,500 students across multiple Indian states
    </Txt>
    <ReplyPill x={16} y={1702} w={361} />

    {/* Share this profile (divider above at 1779.5) */}
    <Txt x={0} w={393} align="center" y={1794} size={20} weight={700} color="#2C2C2E" lh={25} ls={-0.4}>
      Share this profile
    </Txt>
    <ExtG name="shareCards" />
    <ExtG name="shareLink" />
    <Txt x={72} y={1870} size={17} weight={500} color="#48484A" lh={22}>
      Share Link
    </Txt>
    <ExtG name="shareArrow1" />
    <ExtG name="sharePdf" />
    <Txt x={72} y={1946} size={17} weight={500} color="#48484A" lh={22}>
      Share PDF
    </Txt>
    <ExtG name="shareArrow2" />
  </>
);
