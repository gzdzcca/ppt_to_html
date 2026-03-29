import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { FadeIn } from "../components/AnimatedText";
import { HoverTooltip } from "../components/HoverTooltip";

const features = [
  {
    icon: "&#129302;",
    title: "AIが入力場所を自動選択",
    desc: "手で選ぶ必要なし",
    tooltip: "Google Geminiが音声内容を解析し、どのフォームフィールドに入力すべきかを自動判定。従来のドロップダウン選択や手動フィールド指定が不要に。",
    delay: 30,
  },
  {
    icon: "&#10024;",
    title: "AIが必要な情報だけ抽出",
    desc: "言い淀みなどを自動除去",
    tooltip: "「えーと」「あの」などのフィラー語や言い直しを自動除去。騒音環境でも文脈からデータを正確に抽出。入力時間を従来の1/3以下に短縮。",
    delay: 45,
  },
  {
    icon: "&#128483;",
    title: "修正も音声だけで可能",
    desc: "手を止めずに修正できる",
    tooltip: "「さっきの数量を530に訂正」のように、音声で修正指示。画面タッチ不要で完全ハンズフリーを実現。手袋着用の環境でも問題なし。",
    delay: 60,
  },
];

export const Slide08Features: React.FC = () => {
  const frame = useCurrentFrame();

  // Voice wave animation
  const waveOffset = frame * 3;

  return (
    <AbsoluteFill className="bg-white flex flex-col p-16">
      <FadeIn delay={0} duration={15}>
        <h2 className="text-3xl font-bold text-koska-navy border-b-4 border-koska-blue pb-4 mb-2">
          シンプルかつ簡単操作にこだわった「ながら記録」
        </h2>
      </FadeIn>
      <FadeIn delay={5} duration={15}>
        <p className="text-gray-600 mb-8">
          最先端AIが今までのすべての課題をクリアし、作業しながらハンズフリーでの帳票記録を可能に。
        </p>
      </FadeIn>

      <div className="flex gap-10 flex-1">
        {/* Left: Demo visualization */}
        <FadeIn delay={10} duration={20} className="flex-1 flex flex-col items-center justify-center">
          <div className="relative bg-koska-navy rounded-3xl p-8 w-full max-w-md">
            {/* Voice wave animation */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xl">&#128100;</span>
              </div>
              <div className="flex-1 bg-white/10 rounded-xl p-3">
                <div className="flex items-center gap-1 h-6">
                  {Array.from({ length: 30 }, (_, i) => {
                    const height = 4 + Math.abs(Math.sin((waveOffset + i * 12) * 0.05)) * 20;
                    return (
                      <div
                        key={i}
                        className="bg-koska-accent rounded-full"
                        style={{
                          width: 3,
                          height,
                          opacity: 0.5 + Math.sin((waveOffset + i * 10) * 0.03) * 0.5,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Speech bubble */}
            <FadeIn delay={15} duration={15}>
              <div className="bg-white/90 rounded-xl p-4 mb-4 relative">
                <p className="text-sm text-gray-800">
                  「パスタAを220個作って3つが不良、<br />2時間30分前から作り始めて、今終わりました。」
                </p>
                <div className="absolute -left-2 top-4 w-4 h-4 bg-white/90 rotate-45" />
              </div>
            </FadeIn>

            {/* AI processing */}
            <FadeIn delay={25} duration={15}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-koska-blue rounded-full flex items-center justify-center">
                  <span className="text-sm text-white font-bold">AI</span>
                </div>
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-koska-accent rounded-full"
                      style={{
                        opacity: interpolate(
                          (frame + i * 8) % 30,
                          [0, 15, 30],
                          [0.3, 1, 0.3]
                        ),
                      }}
                    />
                  ))}
                </div>
                <span className="text-koska-accent text-xs">自動入力中...</span>
              </div>
            </FadeIn>

            {/* Form result */}
            <FadeIn delay={35} duration={20}>
              <div className="bg-white rounded-xl p-4 space-y-2 text-sm">
                {[
                  { label: "食材・材料名", value: "パスタA" },
                  { label: "生産数量", value: "220" },
                  { label: "不良数量", value: "3" },
                  { label: "開始時間", value: "09:03:38" },
                  { label: "終了時間", value: "11:33:38" },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between border-b border-gray-100 pb-1">
                    <span className="text-gray-500">{row.label}</span>
                    <span className="text-koska-navy font-medium">{row.value}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </FadeIn>

        {/* Right: Features */}
        <div className="flex-1 flex flex-col justify-center gap-6">
          {features.map((f, i) => (
            <FadeIn key={i} delay={f.delay} direction="right" duration={15}>
              <HoverTooltip content={f.tooltip}>
                <div className="bg-blue-50 rounded-2xl p-6 cursor-help hover:shadow-md transition-shadow border border-blue-100">
                  <div className="flex items-center gap-4 mb-2">
                    <span
                      className="text-3xl"
                      dangerouslySetInnerHTML={{ __html: f.icon }}
                    />
                    <h3 className="text-xl font-bold text-koska-navy">{f.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm ml-14">{f.desc}</p>
                </div>
              </HoverTooltip>
            </FadeIn>
          ))}

          {/* Additional enriched info */}
          <FadeIn delay={75} duration={15}>
            <div className="grid grid-cols-3 gap-3 mt-4">
              <HoverTooltip content="外国人労働者が母国語で音声入力しても、AIが適切なフィールドに自動振り分け。日本語が読めなくても利用可能。">
                <div className="bg-gray-50 rounded-lg p-3 text-center cursor-help">
                  <p className="text-lg font-bold text-koska-blue">&#127760;</p>
                  <p className="text-xs text-gray-600 mt-1">多言語対応</p>
                </div>
              </HoverTooltip>
              <HoverTooltip content="Google Geminiをベースにした最先端の大規模言語モデルを活用。文脈理解に優れ、騒音環境でも高精度な入力を実現。">
                <div className="bg-gray-50 rounded-lg p-3 text-center cursor-help">
                  <p className="text-lg font-bold text-koska-blue">&#129504;</p>
                  <p className="text-xs text-gray-600 mt-1">Gemini搭載</p>
                </div>
              </HoverTooltip>
              <HoverTooltip content="従来のタッチ入力や手書きと比較して、入力にかかる時間を3分の1以下に短縮。年間数百時間の工数削減効果。">
                <div className="bg-gray-50 rounded-lg p-3 text-center cursor-help">
                  <p className="text-lg font-bold text-koska-blue">&#9889;</p>
                  <p className="text-xs text-gray-600 mt-1">入力時間1/3</p>
                </div>
              </HoverTooltip>
            </div>
          </FadeIn>
        </div>
      </div>
    </AbsoluteFill>
  );
};
