import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { TypeWriter } from "../components/AnimatedText";

export const Slide01Title: React.FC = () => {
  const frame = useCurrentFrame();

  const logoOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const logoScale = interpolate(frame, [0, 30], [0.5, 1], {
    extrapolateRight: "clamp",
  });

  // Floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    x: (i * 137.5) % 100,
    y: ((i * 73.7) % 100),
    size: 3 + (i % 5) * 2,
    speed: 0.5 + (i % 3) * 0.3,
    opacity: 0.1 + (i % 4) * 0.05,
  }));

  return (
    <AbsoluteFill className="bg-gradient-to-br from-koska-navy via-[#0f2555] to-[#1a3a7a] flex items-center justify-center">
      {/* Animated particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-koska-accent"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity * logoOpacity,
            transform: `translateY(${Math.sin((frame * p.speed * 0.05) + i) * 20}px)`,
          }}
        />
      ))}

      <div className="flex flex-col items-center gap-12">
        {/* Logo */}
        <div style={{ opacity: logoOpacity, transform: `scale(${logoScale})` }}>
          <Img
            src={staticFile("images/koska-logo.png")}
            className="h-20 object-contain"
          />
        </div>

        {/* Main title */}
        <div className="text-center">
          <h1 className="text-7xl font-bold text-white tracking-wider">
            <TypeWriter text="ながら記録" delay={30} speed={4} />
          </h1>
          <div className="mt-6">
            <h2 className="text-3xl text-koska-accent font-light tracking-widest">
              <TypeWriter text="のご提案" delay={55} speed={3} />
            </h2>
          </div>
        </div>

        {/* Subtitle line */}
        <div
          className="h-0.5 bg-gradient-to-r from-transparent via-koska-accent to-transparent"
          style={{
            width: interpolate(frame, [70, 100], [0, 400], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            opacity: interpolate(frame, [70, 90], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />

        <p
          className="text-lg text-blue-200 tracking-wider"
          style={{
            opacity: interpolate(frame, [90, 110], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          AI × 音声入力で、作業しながら帳票記録
        </p>
      </div>
    </AbsoluteFill>
  );
};
