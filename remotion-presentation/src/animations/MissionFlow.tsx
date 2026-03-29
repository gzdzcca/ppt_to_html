import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";

export const MissionFlow: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: Icon appears (0-20)
  const iconOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const iconScale = interpolate(frame, [0, 18], [0.7, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // Phase 2: Action waves pulse (15+, looping)
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
          <linearGradient id="mf-iconBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#DBEAFE" />
            <stop offset="100%" stopColor="#C7D2FE" />
          </linearGradient>
          <filter id="mf-glow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="mf-softShadow">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* ---- Connection lines ---- */}
        <line
          x1="115" y1="90" x2={115 + 105 * line1Progress} y2="90"
          stroke="#93C5FD" strokeWidth="2" strokeDasharray="6 4" opacity={0.6 * line1Progress}
        />
        <line
          x1="290" y1="90" x2={290 + 85 * line2Progress} y2="90"
          stroke="#93C5FD" strokeWidth="2" strokeDasharray="6 4" opacity={0.6 * line2Progress}
        />

        {/* ---- Floating data particles ---- */}
        {particlesActive && Array.from({ length: 6 }, (_, i) => {
          const speed = 1.2 + i * 0.3;
          const px = ((frame - 20) * speed + i * 40) % 165;
          const inRange = px < 155;
          const py = 85 + Math.sin(frame * 0.1 + i * 1.2) * 12;
          const pOp = inRange ? interpolate(px, [0, 20, 135, 155], [0, 0.6, 0.6, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
          return (
            <circle
              key={i}
              cx={115 + px}
              cy={py}
              r={2 + (i % 3)}
              fill={i % 2 === 0 ? "#60A5FA" : "#A78BFA"}
              opacity={pOp * aiOpacity}
            />
          );
        })}

        {/* ---- Action Icon (clean, abstract — replaces crude worker figure) ---- */}
        <g opacity={iconOpacity} transform={`translate(70, 90) scale(${iconScale})`}>
          {/* Pulsing waves */}
          {[28, 40, 52].map((r, i) => {
            const wOp = 0.18 - i * 0.05 + Math.sin(wavePhase + i * 0.8) * 0.08;
            return (
              <circle
                key={i}
                cx="0" cy="0"
                r={r + Math.sin(wavePhase + i) * 2}
                fill="none"
                stroke="#93C5FD"
                strokeWidth={1.2 - i * 0.3}
                opacity={Math.max(0, wOp)}
              />
            );
          })}
          {/* Rounded square background */}
          <rect x="-24" y="-24" width="48" height="48" rx="14" fill="url(#mf-iconBg)" filter="url(#mf-softShadow)" />
          {/* Clipboard icon */}
          <rect x="-10" y="-14" width="20" height="26" rx="3" fill="white" stroke="#3B82F6" strokeWidth="1.5" />
          <rect x="-5" y="-18" width="10" height="6" rx="2" fill="#3B82F6" />
          <line x1="-5" y1="-4" x2="5" y2="-4" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
          <line x1="-5" y1="1" x2="3" y2="1" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
          <line x1="-5" y1="6" x2="5" y2="6" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
          {/* Pen / writing indicator */}
          <g transform="translate(10, 8) rotate(-30)">
            <rect x="-2" y="-8" width="4" height="12" rx="1" fill="#2563EB" />
            <path d="M-2 4 L0 7 L2 4" fill="#2563EB" />
          </g>
        </g>

        {/* ---- AI Processing Node ---- */}
        <g opacity={aiOpacity} transform={`translate(250, 90) scale(${aiScale})`} filter="url(#mf-glow)">
          <circle cx="0" cy="0" r="30" fill="url(#mf-aiGrad)" />
          {/* Orbiting ring */}
          <ellipse
            cx="0" cy="0" rx="36" ry="13"
            fill="none" stroke="#818CF8" strokeWidth="1.5" opacity="0.4"
            transform={`rotate(${frame * 1.5})`}
          />
          <circle
            cx={36 * Math.cos(frame * 0.026)}
            cy={13 * Math.sin(frame * 0.026)}
            r="3" fill="#A78BFA" opacity="0.8"
          />
          {/* AI text */}
          <text x="0" y="2" textAnchor="middle" fill="white" fontSize="15" fontWeight="700" dominantBaseline="middle">AI</text>
          {/* Glow ring */}
          <circle cx="0" cy="0" r={30 + aiGlow * 0.3} fill="none" stroke="#6366F1" strokeWidth="1" opacity={0.12 + Math.sin(frame * 0.08) * 0.08} />
        </g>

        {/* ---- Dashboard / Chart ---- */}
        <g opacity={dashOpacity} transform={`translate(380, 50) scale(${dashScale})`} filter="url(#mf-softShadow)">
          <rect x="0" y="0" width="100" height="80" rx="10" fill="url(#mf-dashBg)" stroke="#E2E8F0" strokeWidth="1.5" />
          {/* Title bar dots */}
          <circle cx="12" cy="12" r="3" fill="#EF4444" opacity="0.6" />
          <circle cx="22" cy="12" r="3" fill="#F59E0B" opacity="0.6" />
          <circle cx="32" cy="12" r="3" fill="#10B981" opacity="0.6" />
          {/* Bar chart */}
          <rect x="16" y={70 - bar1H} width="16" height={bar1H} rx="3" fill="#93C5FD" />
          <rect x="42" y={70 - bar2H} width="16" height={bar2H} rx="3" fill="#60A5FA" />
          <rect x="68" y={70 - bar3H} width="16" height={bar3H} rx="3" fill="#3B82F6" />
        </g>

        {/* ---- Checkmark ---- */}
        <g opacity={checkOpacity} transform={`translate(458, 44) scale(${checkScale})`}>
          <circle cx="0" cy="0" r="11" fill="#10B981" />
          <path d="M-4.5 0 L-1.5 3.5 L5.5 -3.5" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
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
