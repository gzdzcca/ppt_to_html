import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";

export const MissionFlow: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: Worker appears (0-20)
  const workerOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const workerY = interpolate(frame, [0, 15], [20, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // Phase 2: Action waves pulse (15-90, looping)
  const wavePhase = frame * 0.06;

  // Phase 3: Data particles flow (25-80)
  const particlesActive = frame > 20;

  // Phase 4: AI node appears (30-45)
  const aiOpacity = interpolate(frame, [30, 42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const aiScale = interpolate(frame, [30, 45], [0.5, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.5)) });
  const aiGlow = 16 + Math.sin(frame * 0.08) * 8;

  // Phase 5: Dashboard appears (55-80)
  const dashOpacity = interpolate(frame, [55, 68], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const dashScale = interpolate(frame, [55, 72], [0.8, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // Phase 6: Bars animate in (70-110)
  const bar1H = interpolate(frame, [70, 90], [0, 48], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const bar2H = interpolate(frame, [78, 98], [0, 68], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const bar3H = interpolate(frame, [86, 106], [0, 88], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // Phase 7: Checkmark (105-125)
  const checkOpacity = interpolate(frame, [105, 118], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const checkScale = interpolate(frame, [105, 125], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(2)) });

  // Connection line progress
  const line1Progress = interpolate(frame, [20, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const line2Progress = interpolate(frame, [45, 65], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });

  // Labels
  const label1Op = interpolate(frame, [10, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const label2Op = interpolate(frame, [38, 48], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const label3Op = interpolate(frame, [62, 72], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "linear-gradient(145deg, #F0F4FF 0%, #EEF2FF 50%, #F5F3FF 100%)", fontFamily: '"Noto Sans JP", sans-serif' }}>
      <svg width="100%" height="100%" viewBox="0 0 500 220">
        <defs>
          <linearGradient id="mf-aiGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <linearGradient id="mf-dashBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F8FAFC" />
          </linearGradient>
          <filter id="mf-glow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="mf-softShadow">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* ---- Connection lines ---- */}
        {/* Line 1: Worker → AI */}
        <line
          x1="120" y1="95" x2={120 + 100 * line1Progress} y2="95"
          stroke="#3B82F6" strokeWidth="2" strokeDasharray="6 4" opacity={0.5 * line1Progress}
        />
        {/* Line 2: AI → Dashboard */}
        <line
          x1="295" y1="95" x2={295 + 80 * line2Progress} y2="95"
          stroke="#3B82F6" strokeWidth="2" strokeDasharray="6 4" opacity={0.5 * line2Progress}
        />

        {/* ---- Floating data particles ---- */}
        {particlesActive && Array.from({ length: 6 }, (_, i) => {
          const speed = 1.2 + i * 0.3;
          const px = ((frame - 20) * speed + i * 40) % 160;
          const inRange = px < 150;
          const py = 90 + Math.sin(frame * 0.1 + i * 1.2) * 12;
          const pOp = inRange ? interpolate(px, [0, 20, 130, 150], [0, 0.7, 0.7, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
          return (
            <circle
              key={i}
              cx={120 + px}
              cy={py}
              r={2.5 + (i % 3)}
              fill={i % 2 === 0 ? "#60A5FA" : "#818CF8"}
              opacity={pOp * aiOpacity}
            />
          );
        })}

        {/* ---- Worker figure ---- */}
        <g opacity={workerOpacity} transform={`translate(0, ${workerY})`}>
          {/* Pulsing action waves */}
          {[35, 52, 69].map((r, i) => {
            const wOp = 0.15 - i * 0.04 + Math.sin(wavePhase + i * 0.8) * 0.08;
            return (
              <circle
                key={i}
                cx="70" cy="95"
                r={r + Math.sin(wavePhase + i) * 3}
                fill="none"
                stroke="#60A5FA"
                strokeWidth={1.2 - i * 0.3}
                opacity={Math.max(0, wOp)}
              />
            );
          })}
          {/* Head */}
          <circle cx="70" cy="65" r="18" fill="#1E40AF" opacity="0.15" />
          <circle cx="70" cy="63" r="14" fill="#60A5FA" />
          {/* Hard hat */}
          <path d="M53 59 Q70 42 87 59" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1.5" />
          <rect x="51" y="57" width="38" height="4.5" rx="2" fill="#FCD34D" />
          {/* Body */}
          <rect x="56" y="82" width="28" height="34" rx="6" fill="#3B82F6" />
          {/* Arms */}
          <rect x="46" y="86" width="10" height="22" rx="5" fill="#2563EB" />
          <rect x="84" y="86" width="10" height="22" rx="5" fill="#2563EB" />
          {/* Clipboard in hand */}
          <rect x="86" y="92" width="14" height="18" rx="2" fill="white" opacity="0.9" />
          <line x1="89" y1="97" x2="97" y2="97" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="89" y1="101" x2="95" y2="101" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="89" y1="105" x2="97" y2="105" stroke="#CBD5E1" strokeWidth="1.5" />
        </g>

        {/* ---- AI Processing Node ---- */}
        <g opacity={aiOpacity} transform={`translate(250, 95) scale(${aiScale})`} filter="url(#mf-glow)">
          <circle cx="0" cy="0" r="32" fill="url(#mf-aiGrad)" />
          {/* Orbiting ring */}
          <ellipse
            cx="0" cy="0" rx="38" ry="14"
            fill="none" stroke="#818CF8" strokeWidth="1.5" opacity="0.4"
            transform={`rotate(${frame * 1.5})`}
          />
          <circle
            cx={38 * Math.cos(frame * 0.026)}
            cy={14 * Math.sin(frame * 0.026)}
            r="3" fill="#A78BFA" opacity="0.8"
          />
          {/* AI text */}
          <text x="0" y="2" textAnchor="middle" fill="white" fontSize="16" fontWeight="700" dominantBaseline="middle">AI</text>
          {/* Glow ring */}
          <circle cx="0" cy="0" r={32 + aiGlow * 0.3} fill="none" stroke="#6366F1" strokeWidth="1" opacity={0.15 + Math.sin(frame * 0.08) * 0.1} />
        </g>

        {/* ---- Dashboard / Chart ---- */}
        <g opacity={dashOpacity} transform={`translate(380, 55) scale(${dashScale})`} filter="url(#mf-softShadow)">
          <rect x="0" y="0" width="100" height="80" rx="10" fill="url(#mf-dashBg)" stroke="#E2E8F0" strokeWidth="1.5" />
          {/* Title bar dots */}
          <circle cx="12" cy="12" r="3" fill="#EF4444" opacity="0.7" />
          <circle cx="22" cy="12" r="3" fill="#F59E0B" opacity="0.7" />
          <circle cx="32" cy="12" r="3" fill="#10B981" opacity="0.7" />
          {/* Bar chart */}
          <rect x="16" y={70 - bar1H} width="16" height={bar1H} rx="3" fill="#60A5FA" />
          <rect x="42" y={70 - bar2H} width="16" height={bar2H} rx="3" fill="#3B82F6" />
          <rect x="68" y={70 - bar3H} width="16" height={bar3H} rx="3" fill="#2563EB" />
        </g>

        {/* ---- Checkmark ---- */}
        <g opacity={checkOpacity} transform={`translate(460, 48) scale(${checkScale})`}>
          <circle cx="0" cy="0" r="12" fill="#10B981" />
          <path d="M-5 0 L-1.5 4 L6 -4" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* ---- Labels ---- */}
        <text x="70" y="148" textAnchor="middle" fill="#334155" fontSize="13" fontWeight="600" opacity={label1Op}>行動</text>
        <text x="250" y="148" textAnchor="middle" fill="#334155" fontSize="13" fontWeight="600" opacity={label2Op}>解析</text>
        <text x="430" y="148" textAnchor="middle" fill="#334155" fontSize="13" fontWeight="600" opacity={label3Op}>可視化</text>

        {/* ---- Subtitle labels ---- */}
        <text x="70" y="166" textAnchor="middle" fill="#64748B" fontSize="10" opacity={label1Op}>現場の作業</text>
        <text x="250" y="166" textAnchor="middle" fill="#64748B" fontSize="10" opacity={label2Op}>AIが自動認識</text>
        <text x="430" y="166" textAnchor="middle" fill="#64748B" fontSize="10" opacity={label3Op}>価値が見える</text>
      </svg>
    </AbsoluteFill>
  );
};
