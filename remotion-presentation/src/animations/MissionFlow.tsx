import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame, Easing } from "remotion";
import missionBg from "../../public/images/gemini-mission.png";

export const MissionFlow: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: Background fades in (0-30)
  const bgOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });
  const bgScale = interpolate(frame, [0, 30], [1.05, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // Phase 2: Glowing particles flow left to right (20+)
  const particlesActive = frame > 15;

  // Phase 3: Pulsing glow on AI center area (30+)
  const glowIntensity = interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const glowPulse = Math.sin(frame * 0.06) * 0.3 + 0.7;

  // Phase 4: Dashboard highlight glow (50+)
  const dashGlow = interpolate(frame, [50, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Shimmer line across image
  const shimmerX = interpolate(frame, [20, 120], [-20, 120], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "linear-gradient(145deg, #F0F4FF 0%, #EEF2FF 50%, #F5F3FF 100%)" }}>
      {/* Background illustration */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        opacity: bgOpacity, transform: `scale(${bgScale})`,
      }}>
        <Img src={missionBg} style={{ width: "92%", height: "auto", objectFit: "contain" }} />
      </div>

      {/* Animated glow overlay on AI center */}
      <div style={{
        position: "absolute", left: "42%", top: "30%", width: 120, height: 120,
        borderRadius: "50%",
        background: `radial-gradient(circle, rgba(99,102,241,${0.15 * glowIntensity * glowPulse}) 0%, transparent 70%)`,
        transform: `scale(${1 + glowPulse * 0.3})`,
      }} />

      {/* Dashboard glow */}
      <div style={{
        position: "absolute", right: "8%", top: "20%", width: 180, height: 140,
        borderRadius: 16,
        background: `radial-gradient(circle, rgba(96,165,250,${0.12 * dashGlow}) 0%, transparent 70%)`,
        opacity: dashGlow,
      }} />

      {/* Floating particles */}
      {particlesActive && Array.from({ length: 8 }, (_, i) => {
        const speed = 0.8 + i * 0.2;
        const px = ((frame - 15) * speed + i * 30) % 100;
        const py = 45 + Math.sin(frame * 0.08 + i * 1.5) * 15;
        const pOp = interpolate(px, [0, 15, 85, 100], [0, 0.6, 0.6, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div key={i} style={{
            position: "absolute",
            left: `${15 + px * 0.7}%`,
            top: `${py}%`,
            width: 4 + (i % 3) * 2,
            height: 4 + (i % 3) * 2,
            borderRadius: "50%",
            background: i % 2 === 0 ? "#60A5FA" : "#818CF8",
            opacity: pOp * bgOpacity,
            boxShadow: `0 0 ${6 + i * 2}px ${i % 2 === 0 ? "#60A5FA" : "#818CF8"}`,
          }} />
        );
      })}

      {/* Shimmer line */}
      <div style={{
        position: "absolute",
        left: `${shimmerX}%`,
        top: 0, bottom: 0,
        width: 2,
        background: "linear-gradient(to bottom, transparent, rgba(96,165,250,0.3), transparent)",
        opacity: shimmerX > 0 && shimmerX < 100 ? 0.5 : 0,
      }} />

      {/* Labels */}
      <div style={{
        position: "absolute", bottom: 16, left: 0, right: 0,
        display: "flex", justifyContent: "space-around", padding: "0 10%",
        opacity: interpolate(frame, [40, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      }}>
        {["行動", "解析", "可視化"].map((label, i) => (
          <span key={i} style={{
            fontSize: 13, fontWeight: 600, color: "#475569",
            opacity: interpolate(frame, [40 + i * 10, 50 + i * 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>{label}</span>
        ))}
      </div>
    </AbsoluteFill>
  );
};
