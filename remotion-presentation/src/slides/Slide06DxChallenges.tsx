import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FadeIn } from "../components/AnimatedText";
import { HoverTooltip } from "../components/HoverTooltip";

const surveyData = [
  { label: "ITに関わる人材が不足している", value: 28.1, color: "#2B7DE9" },
  { label: "DX推進に関わる人材が不足している", value: 24.7, color: "#4B93ED" },
  { label: "具体的な効果や成果が見えない", value: 22.7, color: "#6BA9F1" },
  { label: "何から始めてよいかわからない", value: 19.9, color: "#8BBFF5" },
  { label: "予算の確保が難しい", value: 19.5, color: "#ABD5F9" },
  { label: "DXに取組もうとする企業文化がない", value: 16.3, color: "#C0DFFA" },
  { label: "経営者の意識・理解不足", value: 10.6, color: "#D5E9FC" },
];

export const Slide06DxChallenges: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="bg-white flex flex-col p-16">
      <FadeIn delay={0} duration={15}>
        <h2 className="text-4xl font-bold text-koska-navy border-b-4 border-koska-blue pb-4 mb-4">
          デジタル化に向けての課題
        </h2>
      </FadeIn>

      <FadeIn delay={8} duration={15}>
        <p className="text-gray-500 text-sm mb-8">
          取り組むべき内容は見えているが、下記の課題が大きく進まない
        </p>
      </FadeIn>

      <div className="flex gap-12 flex-1">
        {/* Left: Bar chart */}
        <div className="flex-[3] flex flex-col justify-center">
          <div className="space-y-4">
            {surveyData.map((item, i) => {
              const barDelay = 15 + i * 8;
              const barWidth = interpolate(
                frame,
                [barDelay, barDelay + 20],
                [0, item.value],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              const itemOpacity = interpolate(
                frame,
                [barDelay, barDelay + 10],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );

              return (
                <div key={i} style={{ opacity: itemOpacity }}>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-700 w-64 text-right shrink-0">
                      {item.label}
                    </span>
                    <div className="flex-1 relative h-7">
                      <div
                        className="h-full rounded-r-lg flex items-center justify-end pr-2"
                        style={{
                          width: `${(barWidth / 35) * 100}%`,
                          backgroundColor: item.color,
                          transition: "width 0.3s ease",
                        }}
                      >
                        <span className="text-white text-xs font-bold">
                          {barWidth > 5 ? `${item.value}%` : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-400 mt-6">
            ※ 独立行政法人 中小企業基盤整備機構『中小企業のDX推進に関する調査（2024）』より引用
          </p>
        </div>

        {/* Right: Key insight */}
        <FadeIn delay={70} duration={20} direction="right" className="flex-[2] flex items-center">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 text-center">
            <div className="space-y-6">
              <HoverTooltip content="中小企業基盤整備機構の調査によると、DXに取り組むにあたっての課題として「人材」と「予算」が全体の7割以上を占める。">
                <div className="cursor-help">
                  <div className="bg-koska-blue text-white rounded-xl px-6 py-3 text-xl font-bold mb-3">
                    人材
                  </div>
                  <div className="bg-koska-blue text-white rounded-xl px-6 py-3 text-xl font-bold">
                    予算
                  </div>
                </div>
              </HoverTooltip>
              <p className="text-2xl font-bold text-koska-navy leading-relaxed">
                全体の7割以上を占める<br />大きな課題
              </p>
            </div>

            <div className="mt-6 space-y-2 text-left">
              <HoverTooltip content="経済産業省「DXレポート」で指摘された、既存ITシステムの老朽化により2025年以降年間最大12兆円の経済損失が生じるという警告。">
                <p className="text-sm text-gray-600 cursor-help">
                  &#9432; 89.2%が「2025年の崖」を認識
                </p>
              </HoverTooltip>
              <HoverTooltip content="実際にDXを達成した中小企業はわずか9.6%。多くは基本的なデジタル化の段階にとどまっている。">
                <p className="text-sm text-gray-600 cursor-help">
                  &#9432; DX達成はわずか9.6%
                </p>
              </HoverTooltip>
              <HoverTooltip content="約70%の製造現場が今なお紙やExcelでの記録を続けている。デジタル化の必要性は理解しつつも、移行が進んでいない。">
                <p className="text-sm text-gray-600 cursor-help">
                  &#9432; 70%の現場が紙/Excelを使用
                </p>
              </HoverTooltip>
            </div>
          </div>
        </FadeIn>
      </div>
    </AbsoluteFill>
  );
};
