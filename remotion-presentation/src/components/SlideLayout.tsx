import React from "react";
import { AbsoluteFill } from "remotion";

export const SlideLayout: React.FC<{
  children: React.ReactNode;
  className?: string;
  background?: string;
}> = ({ children, className = "", background = "bg-white" }) => {
  return (
    <AbsoluteFill
      className={`${background} flex flex-col font-sans ${className}`}
      style={{ fontFamily: '"Noto Sans JP", sans-serif' }}
    >
      {children}
    </AbsoluteFill>
  );
};
