import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { FadeIn, ScaleIn } from "../components/AnimatedText";
import { HoverTooltip } from "../components/HoverTooltip";

export const Slide03Products: React.FC = () => {
  return (
    <AbsoluteFill className="bg-white flex flex-col p-16">
      <FadeIn delay={0} duration={15}>
        <h2 className="text-4xl font-bold text-koska-navy border-b-4 border-koska-blue pb-4 mb-10">
          提供プロダクトについて
        </h2>
      </FadeIn>

      <div className="flex gap-10 flex-1">
        {/* GenKan */}
        <FadeIn delay={10} direction="left" duration={20} className="flex-1">
          <div className="bg-gray-50 rounded-2xl p-8 h-full flex flex-col border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-koska-navy rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">&#9881;</span>
              </div>
              <HoverTooltip content="IoTセンサーとカメラを活用し、製造現場の人・モノ・機械データを自動取得。原価管理を可視化するプラットフォーム。">
                <h3 className="text-2xl font-bold text-koska-navy cursor-help">GenKan</h3>
              </HoverTooltip>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              加工原価に対する必要な人・モノ・機械のデータを
              <br />作業者さんの負担をかけず自動で取得
            </p>
            <div className="flex-1 flex items-center justify-center">
              <Img
                src={staticFile("images/genkan-demo.png")}
                className="max-h-72 object-contain rounded-xl"
              />
            </div>
            <div className="mt-4 flex gap-2">
              <span className="px-2 py-1 bg-gray-200 rounded text-xs text-gray-600">IoTセンサー</span>
              <span className="px-2 py-1 bg-gray-200 rounded text-xs text-gray-600">カメラ検知</span>
              <span className="px-2 py-1 bg-gray-200 rounded text-xs text-gray-600">RFID</span>
              <span className="px-2 py-1 bg-gray-200 rounded text-xs text-gray-600">原価可視化</span>
            </div>
          </div>
        </FadeIn>

        {/* ながら記録 */}
        <FadeIn delay={20} direction="right" duration={20} className="flex-1">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 h-full flex flex-col border-2 border-koska-blue relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-koska-blue text-white text-xs px-3 py-1 rounded-full font-medium">
              NEW
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-koska-blue rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">&#127908;</span>
              </div>
              <HoverTooltip content="2025年4月リリース。Google Gemini搭載のAI音声認識で、作業中にハンズフリーで帳票入力。FOOMA JAPAN 2025最優秀賞受賞。">
                <h3 className="text-2xl font-bold text-koska-blue cursor-help">ながら記録</h3>
              </HoverTooltip>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              AI × 音声入力の帳票革命
              <br />作業の手を止めず、話すだけで帳票入力
            </p>
            <div className="flex-1 flex items-center justify-center">
              <Img
                src={staticFile("images/nagara-demo.png")}
                className="max-h-72 object-contain rounded-xl"
              />
            </div>
            <div className="mt-4 flex gap-2">
              <span className="px-2 py-1 bg-blue-100 rounded text-xs text-koska-blue">AI音声認識</span>
              <span className="px-2 py-1 bg-blue-100 rounded text-xs text-koska-blue">ハンズフリー</span>
              <span className="px-2 py-1 bg-blue-100 rounded text-xs text-koska-blue">Gemini搭載</span>
              <span className="px-2 py-1 bg-blue-100 rounded text-xs text-koska-blue">多言語対応</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </AbsoluteFill>
  );
};
