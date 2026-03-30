import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame, Easing } from "remotion";
import voiceBg from "../../public/images/gemini-voicedemo.png";

const SPEECH_TEXT = "パスタAを220個作って3つが不良、2時間30分前から作り始めて、今終わりました。";

const formFields = [
  { label: "食材・材料名", value: "パスタA", fillAt: 60 },
  { label: "生産数量", value: "220", fillAt: 75 },
  { label: "不良数量", value: "3", fillAt: 90 },
  { label: "開始時間", value: "09:03:38", fillAt: 105 },
  { label: "終了時間", value: "11:33:38", fillAt: 120 },
];

export const VoiceDemo: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: Background appears (0-20)
  const bgOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const bgScale = interpolate(frame, [0, 25], [1.08, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // Phase 2: Sound waves active (20-160)
  const wavesActive = frame > 15 && frame < 170;

  // Phase 3: Speech text typing (25+)
  const charsToShow = Math.max(0, Math.floor((frame - 25) * 0.7));
  const speechDisplay = SPEECH_TEXT.slice(0, Math.min(charsToShow, SPEECH_TEXT.length));
  const speechOpacity = interpolate(frame, [20, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Phase 4: Form fields fill (60-140)

  // Phase 5: Checkmark (145-170)
  const checkOpacity = interpolate(frame, [145, 160], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const checkScale = interpolate(frame, [145, 165], [0, 1.1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0B1628", fontFamily: '"Noto Sans JP", sans-serif' }}>
      {/* Background illustration */}
      <div style={{
        position: "absolute", inset: 0,
        opacity: bgOpacity * 0.4, transform: `scale(${bgScale})`,
      }}>
        <Img src={voiceBg} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      <div style={{ display: "flex", height: "100%", gap: 32, padding: 32, position: "relative", zIndex: 1 }}>
        {/* Left side: Worker + Speech */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          {/* Sound waves visualization */}
          {wavesActive && (
            <div style={{ display: "flex", alignItems: "center", gap: 2, height: 50, marginBottom: 20 }}>
              {Array.from({ length: 28 }, (_, i) => {
                const h = 8 + Math.abs(Math.sin((frame * 0.12) + i * 0.5)) * 34;
                return (
                  <div key={i} style={{
                    width: 3, height: h, borderRadius: 2,
                    backgroundColor: `rgba(96, 165, 250, ${0.3 + Math.sin((frame * 0.08) + i * 0.3) * 0.4})`,
                    boxShadow: `0 0 ${4 + Math.sin((frame * 0.1) + i) * 3}px rgba(96,165,250,0.3)`,
                  }} />
                );
              })}
            </div>
          )}

          {/* Speech bubble */}
          <div style={{
            opacity: speechOpacity,
            backgroundColor: "rgba(255,255,255,0.95)",
            borderRadius: 16, padding: "14px 18px", maxWidth: 340,
            boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 0 20px rgba(96,165,250,0.1)",
          }}>
            <p style={{ fontSize: 13, color: "#1E293B", lineHeight: 1.6, margin: 0 }}>
              「{speechDisplay}
              {charsToShow < SPEECH_TEXT.length && (
                <span style={{ color: "#2563EB", opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0 }}>|</span>
              )}」
            </p>
          </div>
        </div>

        {/* Center: AI processing */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 70,
          opacity: interpolate(frame, [40, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}>
          <div style={{ flex: 1, width: 2, background: "linear-gradient(to bottom, transparent, #3B82F6, transparent)" }} />
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "linear-gradient(135deg, #2563EB, #7C3AED)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 0 ${16 + Math.sin(frame * 0.08) * 8}px rgba(99, 102, 241, 0.5)`,
          }}>
            <span style={{ color: "white", fontWeight: 700, fontSize: 16 }}>AI</span>
          </div>
          {/* Animated dots */}
          {[0, 1, 2].map((i) => {
            const dotY = ((frame * 1.5 + i * 30) % 80);
            return (
              <div key={i} style={{
                position: "absolute", width: 5, height: 5, borderRadius: "50%",
                backgroundColor: "#60A5FA",
                top: `${35 + dotY * 0.4}%`,
                opacity: dotY < 70 ? 0.5 : 0,
                boxShadow: "0 0 6px #60A5FA",
              }} />
            );
          })}
          <div style={{ flex: 1, width: 2, background: "linear-gradient(to bottom, transparent, #3B82F6, transparent)" }} />
        </div>

        {/* Right side: Form */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{
            backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 16, padding: 20, backdropFilter: "blur(10px)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#10B981" }} />
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: 600 }}>ながら記録 Vscribe</span>
            </div>

            {formFields.map((field, i) => {
              const fieldOpacity = interpolate(frame, [field.fillAt, field.fillAt + 12], [0, 1], {
                extrapolateLeft: "clamp", extrapolateRight: "clamp",
              });
              const fieldChars = Math.max(0, Math.floor((frame - field.fillAt) * 0.5));
              const displayValue = field.value.slice(0, Math.min(fieldChars, field.value.length));
              const filled = fieldChars >= field.value.length;

              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{field.label}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{
                      fontSize: 13, fontWeight: 600,
                      color: filled ? "#60A5FA" : "rgba(255,255,255,0.8)",
                      opacity: fieldOpacity,
                    }}>
                      {displayValue}
                      {fieldOpacity > 0 && !filled && (
                        <span style={{ color: "#60A5FA", opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0 }}>|</span>
                      )}
                    </span>
                    {filled && (
                      <svg width="14" height="14" viewBox="0 0 14 14" style={{ opacity: fieldOpacity }}>
                        <circle cx="7" cy="7" r="6" fill="none" stroke="#10B981" strokeWidth="1.5" />
                        <path d="M4 7 L6 9 L10 5" fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Completion badge */}
          <div style={{
            opacity: checkOpacity, transform: `scale(${checkScale})`,
            textAlign: "center", marginTop: 16,
          }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              backgroundColor: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)",
              borderRadius: 24, padding: "6px 18px",
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="7" fill="#10B981" />
                <path d="M5 8 L7 10 L11 6" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span style={{ color: "#10B981", fontSize: 12, fontWeight: 600 }}>入力完了</span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
