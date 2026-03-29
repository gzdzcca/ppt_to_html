import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";

const data = [
  { label: "ITに関わる人材が不足", value: 28.1, color: "#3B82F6" },
  { label: "DX推進人材が不足", value: 24.7, color: "#6366F1" },
  { label: "効果や成果が見えない", value: 22.7, color: "#8B5CF6" },
  { label: "何から始めるかわからない", value: 19.9, color: "#A78BFA" },
  { label: "予算の確保が難しい", value: 19.5, color: "#C4B5FD" },
];

export const BarChart: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent", padding: 32, fontFamily: '"Noto Sans JP", sans-serif' }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, height: "100%", justifyContent: "center" }}>
        {data.map((item, i) => {
          const barDelay = 10 + i * 12;
          const barWidth = interpolate(
            frame,
            [barDelay, barDelay + 25],
            [0, item.value],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }
          );
          const labelOpacity = interpolate(
            frame,
            [barDelay - 5, barDelay + 5],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const valueOpacity = interpolate(
            frame,
            [barDelay + 15, barDelay + 25],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span
                style={{
                  width: 200,
                  textAlign: "right",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.7)",
                  opacity: labelOpacity,
                  flexShrink: 0,
                }}
              >
                {item.label}
              </span>
              <div style={{ flex: 1, position: "relative", height: 32 }}>
                <div
                  style={{
                    height: "100%",
                    width: `${(barWidth / 35) * 100}%`,
                    background: `linear-gradient(90deg, ${item.color}, ${item.color}88)`,
                    borderRadius: "0 8px 8px 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingRight: 12,
                    boxShadow: `0 2px 12px ${item.color}44`,
                  }}
                >
                  <span
                    style={{
                      color: "white",
                      fontSize: 13,
                      fontWeight: 700,
                      opacity: valueOpacity,
                    }}
                  >
                    {item.value}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
