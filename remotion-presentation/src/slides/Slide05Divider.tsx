import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Slide05Divider: React.FC<{
  title?: string;
  subtitle?: string;
}> = ({
  title = "ながら記録のご紹介",
  subtitle,
}) => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, 30], [0.6, 1], {
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const lineWidth = interpolate(frame, [30, 60], [0, 600], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-gradient-to-br from-koska-navy to-[#1a3a7a] flex items-center justify-center">
      {/* Background circles */}
      <div
        className="absolute w-96 h-96 rounded-full border border-blue-400/10"
        style={{
          opacity: opacity * 0.3,
          transform: `scale(${1 + Math.sin(frame * 0.02) * 0.1})`,
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full border border-blue-400/5"
        style={{
          opacity: opacity * 0.2,
          transform: `scale(${1 + Math.cos(frame * 0.015) * 0.1})`,
        }}
      />

      <div className="text-center" style={{ opacity, transform: `scale(${scale})` }}>
        <h2 className="text-6xl font-bold text-white tracking-wider">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xl text-blue-200 mt-6">{subtitle}</p>
        )}
        <div
          className="h-1 bg-gradient-to-r from-transparent via-koska-accent to-transparent mx-auto mt-8"
          style={{ width: lineWidth }}
        />
      </div>
    </AbsoluteFill>
  );
};
