import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { helixFrames } from "./generatedHelixFrames";

const frames = [
  { src: staticFile("frame-1.png"), shiftX: -54, shiftY: -20, scale: 1.08 },
  { src: staticFile("frame-2.png"), shiftX: 32, shiftY: -18, scale: 1.06 },
  { src: staticFile("frame-3.png"), shiftX: -24, shiftY: 16, scale: 1.07 },
  { src: staticFile("frame-4.png"), shiftX: 44, shiftY: 12, scale: 1.05 },
];

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export const HeroRibbonComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const cycle = (frame / durationInFrames) * frames.length;

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 58% 44%, rgba(255,255,255,0.08) 0%, rgba(18,18,20,0.02) 28%, rgba(5,5,6,0.96) 100%)",
      }}
    >
      {frames.map((item, index) => {
        const phaseDistance = Math.min(
          Math.abs(cycle - index),
          Math.abs(cycle - (index + frames.length)),
          Math.abs(cycle - (index - frames.length))
        );
        const weight = clamp(1 - phaseDistance, 0, 1);
        const opacity = interpolate(weight, [0, 1], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const drift = Math.sin((frame / durationInFrames) * Math.PI * 2 + index * 0.9);
        const scale = item.scale + weight * 0.015 + drift * 0.006;
        const translateX = item.shiftX + drift * 28;
        const translateY = item.shiftY + Math.cos((frame / durationInFrames) * Math.PI * 2 + index * 0.7) * 12;

        return (
          <AbsoluteFill
            key={item.src}
            style={{
              opacity,
              mixBlendMode: "screen",
            }}
          >
            <Img
              src={item.src}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.86) contrast(1.08)",
                transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
              }}
            />
          </AbsoluteFill>
        );
      })}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 20%, rgba(5,5,6,0.24) 62%, rgba(5,5,6,0.68) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

const helixSlices = Array.from({ length: 34 }, (_, index) => index);

const Slab: React.FC<{
  width: number;
  faceHeight: number;
  sideHeight: number;
  darkness: number;
  ghost: boolean;
}> = ({ width, faceHeight, sideHeight, darkness, ghost }) => {
  const sideAlpha = ghost ? 0.15 : 0.48 + darkness * 0.36;
  const shadowAlpha = ghost ? 0.06 : 0.26 + darkness * 0.34;

  return (
    <div
      style={{
        position: "relative",
        width,
        height: faceHeight + sideHeight,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: `0 0 ${sideHeight - 2}px 0`,
          borderRadius: 8,
          background:
            "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(247,248,248,0.98) 42%, rgba(204,210,214,0.92) 100%)",
          boxShadow: [
            "inset 0 1px 0 rgba(255,255,255,1)",
            "inset 0 -9px 11px rgba(80,88,94,0.2)",
            `0 ${10 + darkness * 14}px ${12 + darkness * 20}px rgba(0,0,0,${shadowAlpha})`,
          ].join(", "),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 6,
          right: 14,
          top: faceHeight - 3,
          height: sideHeight,
          borderRadius: "0 0 8px 8px",
          background: `linear-gradient(180deg, rgba(202,208,211,${0.58 + darkness * 0.2}) 0%, rgba(20,21,22,${sideAlpha}) 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 18,
          right: 20,
          top: faceHeight - 2,
          height: 2,
          borderRadius: 999,
          background: ghost ? "rgba(255,255,255,0.36)" : "rgba(255,255,255,0.72)",
        }}
      />
    </div>
  );
};

const HelixShape: React.FC<{
  frame: number;
  durationInFrames: number;
  scale?: number;
  x?: number;
  y?: number;
  opacity?: number;
  ghost?: boolean;
}> = ({ frame, durationInFrames, scale = 1, x = 0, y = 0, opacity = 1, ghost = false }) => {
  const progress = frame / durationInFrames;
  const spin = progress * Math.PI * 2;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: 980,
        height: 1080,
        opacity,
        transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) scale(${scale})`,
        transformStyle: "preserve-3d",
        filter: ghost ? "blur(0.4px)" : "drop-shadow(0 58px 60px rgba(0,0,0,0.18))",
      }}
    >
      {helixSlices.map((index) => {
        const t = index / (helixSlices.length - 1);
        const phase = t * Math.PI * 1.72 + spin * 0.1 + (ghost ? 0.9 : 0);
        const depth = (Math.cos(phase) + 1) / 2;
        const opening = Math.sin(t * Math.PI);
        const curve = Math.sin((t - 0.12) * Math.PI * 1.26 + spin * 0.06);
        const width = 270 + opening * 170 + depth * 70;
        const faceHeight = 17 + depth * 6 + opening * 3;
        const sideHeight = 12 + depth * 11;
        const left = ghost ? 430 + curve * 126 + t * 22 : 390 + curve * 116 + t * 130 + depth * 18;
        const top = ghost ? -60 + t * 860 : 126 + t * 802;
        const rotate = ghost ? -24 + t * 68 + Math.sin(phase) * 8 : -24 + t * 54 + Math.sin(phase) * 7;
        const scaleX = 0.96 + depth * 0.1;
        const scaleY = 0.78 + depth * 0.12;
        const alpha = ghost ? (0.16 + depth * 0.24) * (1 - t * 0.18) : 0.78 + depth * 0.22;

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left,
              top,
              width,
              height: faceHeight + sideHeight,
              opacity: alpha,
              transform: `translate3d(-50%, -50%, 0) rotate(${rotate}deg) skewX(${Math.sin(phase) * 3.2}deg) scale(${scaleX}, ${scaleY})`,
              transformOrigin: "50% 50%",
              zIndex: Math.round(depth * 100 + index),
            }}
          >
            <Slab width={width} faceHeight={faceHeight} sideHeight={sideHeight} darkness={1 - depth} ghost={ghost} />
          </div>
        );
      })}
    </div>
  );
};

export const HeroHelixComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = frame / durationInFrames;
  const breathe = Math.sin(progress * Math.PI * 2);

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 46% 38%, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 38%, rgba(244,245,246,1) 78%, rgba(255,255,255,1) 100%)",
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 42% 74%, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0.045) 25%, rgba(255,255,255,0) 58%)",
          transform: `translateY(${breathe * 7}px)`,
        }}
      />
      <HelixShape frame={frame + 64} durationInFrames={durationInFrames} scale={0.62} x={-408} y={-336} opacity={0.74} ghost />
      <HelixShape frame={frame} durationInFrames={durationInFrames} scale={0.96 + breathe * 0.005} x={-34} y={16 + breathe * 4} opacity={1} />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.42), rgba(255,255,255,0) 18%, rgba(255,255,255,0) 76%, rgba(255,255,255,0.72)), linear-gradient(180deg, rgba(255,255,255,0.32), rgba(255,255,255,0) 38%, rgba(255,255,255,0.52))",
        }}
      />
    </AbsoluteFill>
  );
};

const smoothstep = (value: number) => {
  const x = clamp(value, 0, 1);
  return x * x * (3 - 2 * x);
};

export const HeroHelixFramesComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  if (helixFrames.length < 2) {
    return (
      <AbsoluteFill
        style={{
          alignItems: "center",
          background: "#fff",
          color: "#111",
          display: "flex",
          fontFamily: "Inter, Arial, sans-serif",
          fontSize: 28,
          justifyContent: "center",
        }}
      >
        Missing helix frame sequence
      </AbsoluteFill>
    );
  }

  const playbackFrames =
    helixFrames.length > 2 ? [...helixFrames, ...helixFrames.slice(1, -1).reverse()] : [...helixFrames];
  const cycle = ((frame % durationInFrames) / durationInFrames) * playbackFrames.length;
  const baseIndex = Math.floor(cycle) % playbackFrames.length;
  const nextIndex = (baseIndex + 1) % playbackFrames.length;
  const localProgress = cycle - Math.floor(cycle);
  const blend = smoothstep((localProgress - 0.18) / 0.64);

  return (
    <AbsoluteFill style={{ background: "#fff", overflow: "hidden" }}>
      <AbsoluteFill>
        <Img
          src={staticFile(playbackFrames[baseIndex])}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: blend }}>
        <Img
          src={staticFile(playbackFrames[nextIndex])}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
