import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FadeIn } from "../components/AnimatedText";
import { HoverTooltip } from "../components/HoverTooltip";

const plans = [
  {
    name: "Starter",
    price: "5",
    color: "from-gray-50 to-gray-100",
    border: "border-gray-200",
    tagline: "現場で負荷が大きい帳票を\nまずは改善",
    features: ["帳票5種類まで", "ユーザー数100名まで", "1マスターあたり1000行まで"],
    recommended: false,
    tooltip: "まずは1〜2ラインの最も負荷の高い帳票からデジタル化を開始。スモールスタートに最適なプラン。",
    delay: 15,
  },
  {
    name: "Standard",
    price: "8",
    color: "from-blue-50 to-blue-100",
    border: "border-koska-blue",
    tagline: "帳票電子化に向けての\nベーシックプラン",
    features: ["帳票20種類まで", "ユーザー数無制限", "1マスターあたり1000行まで"],
    recommended: true,
    tooltip: "最も選ばれているプラン。複数ラインの帳票を一括デジタル化し、全スタッフが利用可能。コストパフォーマンスに優れる。",
    delay: 25,
  },
  {
    name: "Business",
    price: "15",
    color: "from-blue-100 to-blue-200",
    border: "border-blue-400",
    tagline: "制限を設けず、現場でフル活用\nデータ活用までご支援",
    features: ["帳票種類無制限", "ユーザー数無制限", "1マスターあたり1000行まで"],
    recommended: false,
    tooltip: "全社展開向け。帳票制限なし、ダッシュボード機能追加可能。データドリブンな改善活動を推進。",
    delay: 35,
  },
  {
    name: "Enterprise",
    price: null,
    color: "from-gray-800 to-gray-900",
    border: "border-gray-700",
    tagline: "お問い合わせ",
    features: ["個別対応", "システム連携", "オンプレ開発等"],
    recommended: false,
    tooltip: "既存基幹システムとのAPI連携、オンプレミス環境への対応、SSOなど、大企業向けのフルカスタマイズプラン。",
    delay: 45,
    dark: true,
  },
];

export const Slide11Pricing: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="bg-white flex flex-col p-12">
      <FadeIn delay={0} duration={15}>
        <h2 className="text-4xl font-bold text-koska-navy border-b-4 border-koska-blue pb-4 mb-8">
          ライセンス体系
        </h2>
      </FadeIn>

      <div className="flex gap-5 flex-1">
        {plans.map((plan, i) => {
          const scale = interpolate(frame, [plan.delay, plan.delay + 20], [0.85, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const opacity = interpolate(frame, [plan.delay, plan.delay + 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <HoverTooltip key={i} content={plan.tooltip} className="flex-1">
              <div
                className={`relative bg-gradient-to-b ${plan.color} rounded-2xl p-6 h-full flex flex-col border-2 ${plan.border} cursor-help hover:shadow-xl transition-shadow`}
                style={{ opacity, transform: `scale(${scale})` }}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-koska-blue text-white text-xs px-4 py-1 rounded-full font-bold">
                    おすすめ
                  </div>
                )}

                {/* Plan header */}
                <div className={`rounded-xl px-4 py-2 text-center mb-4 ${plan.dark ? "bg-white/10" : "bg-white/50"}`}>
                  <h3 className={`text-xl font-bold ${plan.dark ? "text-white" : "text-koska-navy"}`}>
                    {plan.name}
                  </h3>
                </div>

                {/* Tagline */}
                <p className={`text-xs text-center mb-4 whitespace-pre-line leading-relaxed ${plan.dark ? "text-gray-300" : "text-gray-600"}`}>
                  {plan.tagline}
                </p>

                {/* Price */}
                <div className="text-center mb-4">
                  {plan.price ? (
                    <>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className={`text-sm ${plan.dark ? "text-gray-300" : "text-gray-500"}`}>月額</span>
                        <span className={`text-5xl font-bold ${plan.dark ? "text-white" : "text-koska-navy"}`}>
                          {plan.price}
                        </span>
                        <span className={`text-lg ${plan.dark ? "text-gray-300" : "text-gray-600"}`}>万円</span>
                      </div>
                      <p className={`text-xs mt-1 ${plan.dark ? "text-gray-400" : "text-gray-500"}`}>
                        + 初期費用 20万円
                      </p>
                      <p className={`text-xs ${plan.dark ? "text-gray-400" : "text-gray-400"}`}>
                        税抜 / 1拠点あたり / 年間
                      </p>
                    </>
                  ) : (
                    <div className="py-4">
                      <span className="text-3xl font-bold text-white">お問い合わせ</span>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className={`h-px ${plan.dark ? "bg-white/20" : "bg-gray-200"} my-3`} />

                {/* Features */}
                <div className="space-y-3 flex-1">
                  {plan.features.map((feat, fi) => (
                    <div key={fi} className="flex items-center gap-2">
                      <span className={`text-sm ${plan.dark ? "text-green-400" : "text-koska-blue"}`}>&#10003;</span>
                      <span className={`text-sm ${plan.dark ? "text-gray-200" : "text-gray-700"}`}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </HoverTooltip>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
