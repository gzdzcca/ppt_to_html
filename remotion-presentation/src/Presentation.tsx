import React from "react";
import { Series } from "remotion";
import { Slide01Title } from "./slides/Slide01Title";
import { Slide02About } from "./slides/Slide02About";
import { Slide03Products } from "./slides/Slide03Products";
import { Slide04TrackRecord } from "./slides/Slide04TrackRecord";
import { Slide05Divider } from "./slides/Slide05Divider";
import { Slide06DxChallenges } from "./slides/Slide06DxChallenges";
import { Slide07PaperVsDigital } from "./slides/Slide07PaperVsDigital";
import { Slide08Features } from "./slides/Slide08Features";
import { Slide10Flow } from "./slides/Slide10Flow";
import { Slide11Pricing } from "./slides/Slide11Pricing";
import { Slide12Options } from "./slides/Slide12Options";

const SLIDE_DURATION = 150; // 5 seconds at 30fps

export const Presentation: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={SLIDE_DURATION} name="Title">
        <Slide01Title />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SLIDE_DURATION} name="About KOSKA">
        <Slide02About />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SLIDE_DURATION} name="Products">
        <Slide03Products />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SLIDE_DURATION} name="Track Record">
        <Slide04TrackRecord />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SLIDE_DURATION} name="ながら記録のご紹介">
        <Slide05Divider title="ながら記録のご紹介" />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SLIDE_DURATION} name="DX Challenges">
        <Slide06DxChallenges />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SLIDE_DURATION} name="Pain Points">
        <Slide07PaperVsDigital />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SLIDE_DURATION} name="Features">
        <Slide08Features />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SLIDE_DURATION} name="ながら記録の費用">
        <Slide05Divider title="「ながら記録」の費用" />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SLIDE_DURATION} name="Implementation Flow">
        <Slide10Flow />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SLIDE_DURATION} name="Pricing">
        <Slide11Pricing />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SLIDE_DURATION} name="Options">
        <Slide12Options />
      </Series.Sequence>
    </Series>
  );
};
