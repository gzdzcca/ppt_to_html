import React from "react";
import { AbsoluteFill } from "remotion";
import { FadeIn } from "../components/AnimatedText";
import { HoverTooltip } from "../components/HoverTooltip";

const ProblemItem: React.FC<{
  icon: string;
  text: string;
  delay: number;
  tooltip?: string;
}> = ({ icon, text, delay, tooltip }) => {
  const content = (
    <div className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <span className="text-2xl">{icon}</span>
      <span className="text-gray-700 text-sm leading-relaxed">{text}</span>
      {tooltip && <span className="text-koska-blue text-xs ml-auto">&#9432;</span>}
    </div>
  );

  return (
    <FadeIn delay={delay} duration={15} direction="up">
      {tooltip ? (
        <HoverTooltip content={tooltip}>{content}</HoverTooltip>
      ) : (
        content
      )}
    </FadeIn>
  );
};

export const Slide07PaperVsDigital: React.FC = () => {
  return (
    <AbsoluteFill className="bg-gray-50 flex flex-col p-16">
      <FadeIn delay={0} duration={15}>
        <h2 className="text-4xl font-bold text-koska-navy border-b-4 border-koska-blue pb-4 mb-3">
          帳票記録におけるよくお聞きする課題
        </h2>
      </FadeIn>

      <FadeIn delay={5} duration={15}>
        <p className="text-gray-600 mb-8">
          記入に手間がかかるため、現場に負担をかけるだけではなく、デジタル化もなかなか進みにくい
        </p>
      </FadeIn>

      <div className="flex gap-8 flex-1">
        {/* Paper column */}
        <div className="flex-1">
          <FadeIn delay={10} duration={15}>
            <div className="bg-orange-50 rounded-xl px-6 py-3 text-center mb-6 border border-orange-200">
              <span className="text-orange-700 font-bold text-lg flex items-center justify-center gap-2">
                <span className="text-2xl">&#128196;</span> 紙
              </span>
            </div>
          </FadeIn>

          <div className="space-y-4">
            <ProblemItem
              icon="&#128221;"
              text="システムに転記する手間がかかる・・"
              delay={15}
              tooltip="紙に記録した後、同じデータをExcelや基幹システムに手入力する二重作業が発生。1日30分〜1時間のロス。"
            />
            <ProblemItem
              icon="&#10060;"
              text="抜け漏れが発生する・・"
              delay={25}
              tooltip="記入忘れや転記ミスが頻発。品質管理上の問題につながるリスクも。"
            />
            <ProblemItem
              icon="&#128451;"
              text="管理が大変・・"
              delay={35}
              tooltip="紙帳票の保管・検索・集計に膨大な時間がかかる。過去データの活用も困難。"
            />
          </div>

          {/* Illustration */}
          <FadeIn delay={45} duration={15} className="mt-6 flex justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2">&#128209;&#10145;&#128187;</div>
              <p className="text-xs text-gray-400">手書き → 転記の二重作業</p>
            </div>
          </FadeIn>
        </div>

        {/* Arrow */}
        <FadeIn delay={40} duration={20} className="flex items-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-px h-20 bg-gray-300" />
            <span className="text-gray-400 text-xs">VS</span>
            <div className="w-px h-20 bg-gray-300" />
          </div>
        </FadeIn>

        {/* Digital column */}
        <div className="flex-1">
          <FadeIn delay={10} duration={15}>
            <div className="bg-blue-50 rounded-xl px-6 py-3 text-center mb-6 border border-blue-200">
              <span className="text-koska-blue font-bold text-lg flex items-center justify-center gap-2">
                <span className="text-2xl">&#128241;</span> 電子帳票（タッチ式）
              </span>
            </div>
          </FadeIn>

          <div className="space-y-4">
            <ProblemItem
              icon="&#9881;"
              text="システムを導入したが設定が難しい・・ 展開出来ず、数帳票で止まっている・・"
              delay={20}
              tooltip="電子帳票システムは設定の専門知識が必要。IT人材不足の現場では展開が停滞し、「DX疲れ」に陥るケースも。"
            />
            <ProblemItem
              icon="&#128542;"
              text="タブレットを都度タッチするため、現場は入力効率が悪くなって大変・・"
              delay={30}
              tooltip="手袋着用や手が汚れる環境ではタッチ操作が困難。作業を中断する必要があり、生産性低下の原因に。"
            />
          </div>

          {/* DX Fatigue callout */}
          <FadeIn delay={55} duration={15} className="mt-8">
            <HoverTooltip content="デジタル化に失敗した企業が「やはり紙の方が楽」とアナログに戻る現象。導入時のUXが悪いと、せっかくの投資が無駄に。ながら記録はこの課題を音声入力で根本解決。">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 cursor-help">
                <p className="text-red-600 font-bold text-sm flex items-center gap-2">
                  <span className="text-lg">&#9888;</span> 「DX疲れ」の発生
                </p>
                <p className="text-red-500 text-xs mt-1">
                  一部の企業ではデジタル化に疲弊し、アナログに回帰する現象も…
                </p>
              </div>
            </HoverTooltip>
          </FadeIn>
        </div>
      </div>
    </AbsoluteFill>
  );
};
