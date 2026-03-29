import { Composition } from "remotion";
import { Presentation } from "./Presentation";
import "./styles/global.css";

const SLIDE_COUNT = 12;
const SLIDE_DURATION = 150;
const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="NagaraKirokuPresentation"
        component={Presentation}
        durationInFrames={SLIDE_COUNT * SLIDE_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
