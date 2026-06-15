import "./index.css";
import { Composition } from "remotion";
import { HeroHelixComposition, HeroHelixFramesComposition, HeroRibbonComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HeroRibbon"
        component={HeroRibbonComposition}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="HeroHelix"
        component={HeroHelixComposition}
        durationInFrames={240}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="HeroHelixFrames"
        component={HeroHelixFramesComposition}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
