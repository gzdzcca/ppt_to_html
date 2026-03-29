import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const FadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
}> = ({ children, delay = 0, duration = 20, className = "", direction = "up" }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const distance = 30;
  const translateMap = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  };

  const translateX = interpolate(
    frame,
    [delay, delay + duration],
    [translateMap[direction].x, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const translateY = interpolate(
    frame,
    [delay, delay + duration],
    [translateMap[direction].y, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      className={className}
      style={{
        opacity,
        transform: `translate(${translateX}px, ${translateY}px)`,
      }}
    >
      {children}
    </div>
  );
};

export const ScaleIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}> = ({ children, delay = 0, duration = 20, className = "" }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [delay, delay + duration], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div className={className} style={{ opacity, transform: `scale(${scale})` }}>
      {children}
    </div>
  );
};

export const TypeWriter: React.FC<{
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}> = ({ text, delay = 0, speed = 2, className = "" }) => {
  const frame = useCurrentFrame();
  const charsToShow = Math.max(
    0,
    Math.floor((frame - delay) / speed)
  );
  const displayText = text.slice(0, Math.min(charsToShow, text.length));

  return <span className={className}>{displayText}</span>;
};
