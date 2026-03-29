import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FadeIn } from "../components/AnimatedText";
import { HoverTooltip } from "../components/HoverTooltip";

const steps = [
  {
    num: "01",
    title: "初回提案",
    icon: "&#128188;",
    desc: "ヒアリング・デモ",
    tooltip: "現場の課題をヒアリングし、ながら記録のデモンストレーションを実施。導入効果のシミュレーションもご提示。",
  },
  {
    num: "02",
    title: "1day 現場テスト",
    icon: "&#128241;",
    desc: "実環境で体験",
    tooltip: "実際の製造現場で1日間のトライアルを実施。騒音環境での認識精度や操作感を現場スタッフが直接確認。",
  },
  {
    num: "03",
    title: "詳細のすり合わせ\nお申し込み",
    icon: "&#128203;",
    desc: "帳票設計・契約",
    tooltip: "テスト結果を踏まえて、デジタル化する帳票の設計・カスタマイズを検討。既存の紙帳票を写真撮影するだけでAIがテンプレートを自動生成。",
  },
  {
    num: "04",
    title: "初期導入支援\n設定支援",
    icon: "&#129309;",
    desc: "セットアップ・研修",
    tooltip: "アカウント設定、帳票テンプレート作成、マスターデータ登録を支援。現場スタッフへの操作研修も実施。",
  },
  {
    num: "05",
    title: "継続的な活用支援",
    icon: "&#128200;",
    desc: "運用・分析サポート",
    tooltip: "導入後もカスタマーサクセスチームが定期的に活用状況をモニタリング。帳票の追加・変更、データ活用の提案まで一気通貫でサポート。",
  },
];

export const Slide10Flow: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="bg-white flex flex-col p-16">
      <FadeIn delay={0} duration={15}>
        <h2 className="text-4xl font-bold text-koska-navy border-b-4 border-koska-blue pb-4 mb-4">
          提案 → 導入 → 支援 までの流れ
        </h2>
      </FadeIn>

      <FadeIn delay={5} duration={15}>
        <p className="text-gray-600 mb-12">
          ご導入前テストで使用感を確かめた上での検討・導入が可能です。効果創出まで一気通貫でご支援いたします。
        </p>
      </FadeIn>

      <div className="flex-1 flex items-center">
        <div className="flex items-start gap-2 w-full">
          {steps.map((step, i) => {
            const stepDelay = 15 + i * 15;
            const opacity = interpolate(frame, [stepDelay, stepDelay + 15], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const translateY = interpolate(frame, [stepDelay, stepDelay + 15], [30, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <React.Fragment key={i}>
                <HoverTooltip content={step.tooltip}>
                  <div
                    className="flex-1 flex flex-col items-center cursor-help group"
                    style={{ opacity, transform: `translateY(${translateY}px)` }}
                  >
                    {/* Circle number */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-koska-blue to-blue-600 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                      <span className="text-white text-2xl font-bold">{step.num}</span>
                    </div>

                    {/* Icon */}
                    <span
                      className="text-4xl mb-3"
                      dangerouslySetInnerHTML={{ __html: step.icon }}
                    />

                    {/* Title */}
                    <h3 className="text-sm font-bold text-koska-navy text-center whitespace-pre-line leading-tight mb-2">
                      {step.title}
                    </h3>

                    {/* Desc */}
                    <p className="text-xs text-gray-500 text-center">{step.desc}</p>
                  </div>
                </HoverTooltip>

                {/* Arrow between steps */}
                {i < steps.length - 1 && (
                  <div
                    className="flex items-center pt-8"
                    style={{
                      opacity: interpolate(frame, [stepDelay + 10, stepDelay + 20], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      }),
                    }}
                  >
                    <div className="w-8 h-0.5 bg-koska-blue" />
                    <div className="w-0 h-0 border-t-4 border-b-4 border-l-8 border-transparent border-l-koska-blue" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Bottom note */}
      <FadeIn delay={90} duration={15}>
        <div className="bg-blue-50 rounded-xl p-4 mt-8 text-center">
          <p className="text-sm text-koska-blue font-medium">
            &#10003; 導入前の1day現場テストは無料で実施 &#12288;&#10003; 最短2週間で本格稼働
          </p>
        </div>
      </FadeIn>
    </AbsoluteFill>
  );
};
