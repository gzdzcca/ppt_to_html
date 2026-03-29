import { Composition } from "remotion";
import { VoiceDemo } from "./animations/VoiceDemo";
import { BarChart } from "./animations/BarChart";
import "./styles/global.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="VoiceDemo"
        component={VoiceDemo}
        durationInFrames={210}
        fps={30}
        width={800}
        height={400}
      />
      <Composition
        id="BarChart"
        component={BarChart}
        durationInFrames={120}
        fps={30}
        width={700}
        height={300}
      />
    </>
  );
};
