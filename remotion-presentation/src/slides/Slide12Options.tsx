import React from "react";
import { AbsoluteFill } from "remotion";
import { FadeIn } from "../components/AnimatedText";
import { HoverTooltip } from "../components/HoverTooltip";

const allPlanOptions = [
  {
    name: "ながらダッシュボード（分析機能、タスクスケジュール機能）",
    price: "＋5万円/月額",
    tooltip: "蓄積されたデータをリアルタイムで可視化。生産性の推移、不良率の分析、作業スケジュールの管理機能を提供。データドリブンな改善活動を実現。",
    delay: 15,
  },
  {
    name: "1マスターあたり3,000行まで",
    price: "＋1万円/月額",
    tooltip: "品目数や材料マスターが多い現場向け。標準の1,000行から3,000行に拡張。",
    delay: 22,
  },
  {
    name: "1マスターあたり5,000行まで",
    price: "＋2万円/月額",
    tooltip: "大規模工場向け。5,000品目以上のマスターデータに対応。",
    delay: 29,
  },
  {
    name: "1マスターあたり10,000行まで",
    price: "＋5万円/月額",
    tooltip: "最大規模の製造現場向け。10,000品目までのマスターデータをサポート。",
    delay: 36,
  },
];

const businessOnlyOptions = [
  {
    name: "APIデータ連携機能",
    price: "＋4万円/月額",
    tooltip: "ERPや基幹システムとのリアルタイムデータ連携。REST APIで生産データを自動同期。SAP、Oracle、自社システムなどとの接続実績あり。",
    delay: 50,
  },
  {
    name: "SSO/IP制限機能",
    price: "＋4万円/月額",
    tooltip: "SAML 2.0対応のシングルサインオン、IP制限によるアクセス制御。セキュリティポリシーの厳しい大企業向け。",
    delay: 57,
  },
];

const OptionItem: React.FC<{
  name: string;
  price: string;
  tooltip: string;
  delay: number;
}> = ({ name, price, tooltip, delay }) => (
  <FadeIn delay={delay} direction="left" duration={15}>
    <HoverTooltip content={tooltip}>
      <div className="flex items-center justify-between bg-white rounded-xl px-6 py-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-koska-blue transition-all cursor-help">
        <div className="flex items-center gap-3">
          <span className="text-koska-blue">&#10003;</span>
          <span className="text-gray-800 font-medium">{name}</span>
        </div>
        <span className="bg-blue-50 text-koska-blue px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap">
          {price}
        </span>
      </div>
    </HoverTooltip>
  </FadeIn>
);

export const Slide12Options: React.FC = () => {
  return (
    <AbsoluteFill className="bg-gray-50 flex flex-col p-16">
      <FadeIn delay={0} duration={15}>
        <h2 className="text-4xl font-bold text-koska-navy border-b-4 border-koska-blue pb-4 mb-8">
          オプション機能
        </h2>
      </FadeIn>

      {/* All plans section */}
      <FadeIn delay={5} duration={15}>
        <div className="bg-koska-blue/5 rounded-xl px-6 py-3 mb-4 border border-koska-blue/20">
          <p className="text-koska-blue font-bold text-sm">
            全てのライセンス（Starter, Standard, Business）に追加可能
          </p>
        </div>
      </FadeIn>

      <div className="space-y-3 mb-8">
        {allPlanOptions.map((opt, i) => (
          <OptionItem key={i} {...opt} />
        ))}
      </div>

      {/* Business only section */}
      <FadeIn delay={43} duration={15}>
        <div className="bg-blue-600/5 rounded-xl px-6 py-3 mb-4 border border-blue-400/30">
          <p className="text-blue-700 font-bold text-sm">
            Businessライセンスにのみ追加可能
          </p>
        </div>
      </FadeIn>

      <div className="space-y-3">
        {businessOnlyOptions.map((opt, i) => (
          <OptionItem key={i} {...opt} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
