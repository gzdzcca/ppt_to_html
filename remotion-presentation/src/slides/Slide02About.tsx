import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { FadeIn } from "../components/AnimatedText";
import { HoverTooltip } from "../components/HoverTooltip";

const InfoRow: React.FC<{
  label: string;
  value: string;
  delay: number;
  tooltip?: string;
}> = ({ label, value, delay, tooltip }) => {
  const content = (
    <div className="flex items-center gap-6 py-3 border-b border-gray-100">
      <span className="text-gray-500 font-medium w-28 text-right text-sm">{label}</span>
      <span className="text-gray-800 font-medium">{value}</span>
      {tooltip && (
        <span className="text-xs text-koska-blue cursor-help ml-1">&#9432;</span>
      )}
    </div>
  );

  return (
    <FadeIn delay={delay} direction="left" duration={15}>
      {tooltip ? (
        <HoverTooltip content={tooltip}>{content}</HoverTooltip>
      ) : (
        content
      )}
    </FadeIn>
  );
};

export const Slide02About: React.FC = () => {
  return (
    <AbsoluteFill className="bg-white flex flex-col p-16">
      {/* Header */}
      <FadeIn delay={0} duration={15}>
        <h2 className="text-4xl font-bold text-koska-navy border-b-4 border-koska-blue pb-4 mb-10">
          株式会社KOSKAについて
        </h2>
      </FadeIn>

      <div className="flex gap-16 flex-1">
        {/* Left: Company Info */}
        <div className="flex-1 flex flex-col">
          <FadeIn delay={10} duration={15}>
            <Img
              src={staticFile("images/koska-logo.png")}
              className="h-14 object-contain object-left mb-8"
            />
          </FadeIn>

          <div className="space-y-1">
            <InfoRow label="代表者" value="曽根健一朗" delay={15}
              tooltip="一橋大学管理会計博士課程出身。シリコンバレーのスタートアップでソフトウェアエンジニアとして勤務後、2年間の製造現場IoT実験を経て創業。" />
            <InfoRow label="創業" value="2018年10月" delay={22} />
            <InfoRow label="本社" value="東京都千代田区神田須田町1-32-4" delay={29} />
            <InfoRow label="資本金" value="1億2500万円" delay={36}
              tooltip="シード: 500 Startups Japanより3,000万円（2019年）。シリーズA: Global Brain、Coral Capital、DEEPCOREより約2.5億円（2020年）。" />
          </div>

          {/* Investors */}
          <FadeIn delay={43} duration={15}>
            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-3">主要株主</p>
              <div className="flex items-center gap-6">
                <HoverTooltip content="日本最大級のVCファンド。AI・SaaS領域に強み。">
                  <div className="px-3 py-2 bg-gray-50 rounded-lg text-sm font-bold text-gray-700 cursor-help">
                    Global Brain
                  </div>
                </HoverTooltip>
                <HoverTooltip content="500 Startups Japan後継。シード・アーリー特化のVC。">
                  <div className="px-3 py-2 bg-gray-50 rounded-lg text-sm font-bold text-gray-700 cursor-help">
                    Coral Capital
                  </div>
                </HoverTooltip>
                <HoverTooltip content="ソフトバンクグループのAI特化型VC。ディープテック投資に注力。">
                  <div className="px-3 py-2 bg-gray-50 rounded-lg text-sm font-bold text-gray-700 cursor-help">
                    DEEPCORE
                  </div>
                </HoverTooltip>
              </div>
            </div>
          </FadeIn>

          {/* Awards */}
          <FadeIn delay={50} duration={15}>
            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-3">アワード</p>
              <div className="flex flex-wrap gap-3">
                <HoverTooltip content="FOOMA JAPAN 2025（国際食品工業展）で食品製造業のDX推進ソリューションとして最優秀賞を受賞。">
                  <span className="px-3 py-1.5 bg-blue-50 text-koska-blue rounded-full text-xs font-medium cursor-help">
                    FOOMA JAPAN 2025 スタートアップグランプリ
                  </span>
                </HoverTooltip>
                <HoverTooltip content="Forbes Asiaが選ぶアジアを代表する30歳未満の30人に、CEO曽根健一朗が選出（2021年）。">
                  <span className="px-3 py-1.5 bg-blue-50 text-koska-blue rounded-full text-xs font-medium cursor-help">
                    Forbes 30 Under 30 Asia
                  </span>
                </HoverTooltip>
                <span className="px-3 py-1.5 bg-blue-50 text-koska-blue rounded-full text-xs font-medium">
                  週刊東洋経済 すごいベンチャー100
                </span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right: Mission */}
        <FadeIn delay={20} duration={20} direction="right" className="flex-1 flex items-center justify-center">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-10 shadow-lg flex flex-col items-center">
            <span className="text-koska-blue font-bold text-sm tracking-widest mb-4">Mission</span>
            <p className="text-2xl font-bold text-koska-navy text-center leading-relaxed">
              「行動の価値を、<br />誰でも認識できるように」
            </p>
            <Img
              src={staticFile("images/mission.png")}
              className="mt-6 h-52 object-contain"
            />
          </div>
        </FadeIn>
      </div>
    </AbsoluteFill>
  );
};
