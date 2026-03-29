import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";

const SPEECH_TEXT = "パスタAを220個作って3つが不良、2時間30分前から作り始めて、今終わりました。";

const formFields = [
  { label: "食材・材料名", value: "パスタA", fillAt: 60 },
  { label: "生産数量", value: "220", fillAt: 80 },
  { label: "不良数量", value: "3", fillAt: 100 },
  { label: "開始時間", value: "09:03:38", fillAt: 120 },
  { label: "終了時間", value: "11:33:38", fillAt: 140 },
];

export const VoiceDemo: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: Person appears (0-20)
  const personOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Phase 2: Speech bubble appears (20-40)
  const bubbleOpacity = interpolate(frame, [20, 35], [0, 1], { extrapolateRight: "clamp" });
  const bubbleScale = interpolate(frame, [20, 35], [0.8, 1], { extrapolateRight: "clamp" });
  const charsToShow = Math.max(0, Math.floor((frame - 25) * 0.8));
  const speechDisplay = SPEECH_TEXT.slice(0, Math.min(charsToShow, SPEECH_TEXT.length));

  // Phase 3: Sound waves (20-160)
  const wavesActive = frame > 20 && frame < 160;

  // Phase 4: AI processing indicator (50-60)
  const aiOpacity = interpolate(frame, [45, 55], [0, 1], { extrapolateRight: "clamp" });

  // Phase 5: Form fills in (60-160)

  // Phase 6: Checkmark (160-180)
  const checkOpacity = interpolate(frame, [155, 170], [0, 1], { extrapolateRight: "clamp" });
  const checkScale = interpolate(frame, [155, 175], [0, 1.2], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0B1628", padding: 40, fontFamily: '"Noto Sans JP", sans-serif' }}>
      <div style={{ display: "flex", height: "100%", gap: 40 }}>
        {/* Left side: Person + Speech */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          {/* Person icon */}
          <div style={{ opacity: personOpacity, marginBottom: 24 }}>
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle cx="50" cy="30" r="20" fill="#3B82F6" opacity="0.2" />
              <circle cx="50" cy="30" r="16" fill="#3B82F6" opacity="0.3" />
              <circle cx="50" cy="28" r="12" fill="#60A5FA" />
              {/* Hard hat */}
              <path d="M35 26 Q50 10 65 26" fill="#FCD34D" stroke="#F59E0B" strokeWidth="2" />
              <rect x="33" y="24" width="34" height="4" rx="2" fill="#FCD34D" />
              {/* Body */}
              <path d="M30 90 Q50 60 70 90" fill="#3B82F6" opacity="0.3" />
              <rect x="38" y="50" width="24" height="30" rx="4" fill="#60A5FA" />
            </svg>
          </div>

          {/* Sound waves */}
          {wavesActive && (
            <div style={{ display: "flex", alignItems: "center", gap: 2, height: 40, marginBottom: 16 }}>
              {Array.from({ length: 24 }, (_, i) => {
                const h = 6 + Math.abs(Math.sin((frame * 0.15) + i * 0.5)) * 28;
                return (
                  <div
                    key={i}
                    style={{
                      width: 3,
                      height: h,
                      borderRadius: 2,
                      backgroundColor: `rgba(96, 165, 250, ${0.4 + Math.sin((frame * 0.1) + i * 0.3) * 0.4})`,
                    }}
                  />
                );
              })}
            </div>
          )}

          {/* Speech bubble */}
          <div
            style={{
              opacity: bubbleOpacity,
              transform: `scale(${bubbleScale})`,
              backgroundColor: "rgba(255,255,255,0.95)",
              borderRadius: 16,
              padding: "16px 20px",
              maxWidth: 320,
              position: "relative",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -8,
                left: "50%",
                marginLeft: -8,
                width: 0,
                height: 0,
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderBottom: "8px solid rgba(255,255,255,0.95)",
              }}
            />
            <p style={{ fontSize: 14, color: "#1E293B", lineHeight: 1.6, margin: 0 }}>
              「{speechDisplay}
              {charsToShow < SPEECH_TEXT.length && (
                <span style={{ opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0 }}>|</span>
              )}
              」
            </p>
          </div>
        </div>

        {/* Center: AI brain */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 80, opacity: aiOpacity }}>
          {/* Connection lines */}
          <div style={{ flex: 1, width: 2, background: "linear-gradient(to bottom, transparent, #3B82F6, transparent)" }} />

          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #2563EB, #7C3AED)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 ${20 + Math.sin(frame * 0.1) * 10}px rgba(99, 102, 241, 0.5)`,
            }}
          >
            <span style={{ color: "white", fontWeight: 700, fontSize: 18 }}>AI</span>
          </div>

          {/* Animated dots flowing down */}
          {[0, 1, 2].map((i) => {
            const dotY = ((frame * 2 + i * 30) % 100);
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#60A5FA",
                  top: `${30 + dotY * 0.4}%`,
                  opacity: dotY < 80 ? 0.6 : 0,
                }}
              />
            );
          })}

          <div style={{ flex: 1, width: 2, background: "linear-gradient(to bottom, transparent, #3B82F6, transparent)" }} />
        </div>

        {/* Right side: Form */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
              padding: 24,
              backdropFilter: "blur(10px)",
            }}
          >
            {/* Form header */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#10B981" }} />
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>ながら記録 Vscribe</span>
            </div>

            {/* Form fields */}
            {formFields.map((field, i) => {
              const fieldOpacity = interpolate(frame, [field.fillAt, field.fillAt + 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const fieldChars = Math.max(0, Math.floor((frame - field.fillAt) * 0.5));
              const displayValue = field.value.slice(0, Math.min(fieldChars, field.value.length));
              const filled = fieldChars >= field.value.length;

              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{field.label}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: filled ? "#60A5FA" : "rgba(255,255,255,0.8)",
                        opacity: fieldOpacity,
                      }}
                    >
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
          <div
            style={{
              opacity: checkOpacity,
              transform: `scale(${checkScale})`,
              textAlign: "center",
              marginTop: 20,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: "rgba(16, 185, 129, 0.15)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                borderRadius: 24,
                padding: "8px 20px",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <circle cx="9" cy="9" r="8" fill="#10B981" />
                <path d="M5 9 L8 12 L13 6" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span style={{ color: "#10B981", fontSize: 13, fontWeight: 600 }}>入力完了</span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
