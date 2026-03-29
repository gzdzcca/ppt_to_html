import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { FadeIn } from "../components/AnimatedText";
import { HoverTooltip } from "../components/HoverTooltip";

const clients = [
  "ファーストフーズ名古屋", "トオカツフーズ", "九州エヌエスフーズ",
  "Noritake", "秋田エプソン", "TOYODA GOSEI KYUSHU", "NITTO KOHKI",
  "山口製作所", "METICS", "苫良", "Townard",
];

export const Slide04TrackRecord: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="bg-white flex flex-col p-16">
      <FadeIn delay={0} duration={15}>
        <h2 className="text-4xl font-bold text-koska-navy border-b-4 border-koska-blue pb-4 mb-4">
          支援範囲と実績
        </h2>
      </FadeIn>

      <FadeIn delay={10} duration={15}>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          データをもとに改善につながる仕組み化を支援。
          <br />
          業界・規模を問わず、さまざまな企業にご利用いただいています。
        </p>
      </FadeIn>

      {/* Client logos grid */}
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-4 gap-6 max-w-4xl w-full">
          {clients.map((name, i) => {
            const delay = 20 + i * 5;
            const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const scale = interpolate(frame, [delay, delay + 15], [0.8, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={i}
                className="bg-gray-50 rounded-xl p-5 flex items-center justify-center border border-gray-100 hover:shadow-md transition-shadow"
                style={{ opacity, transform: `scale(${scale})` }}
              >
                <span className="text-gray-700 font-medium text-sm text-center">{name}</span>
              </div>
            );
          })}
          <div
            className="bg-koska-blue rounded-xl p-5 flex items-center justify-center"
            style={{
              opacity: interpolate(frame, [75, 90], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <HoverTooltip content="食品製造、自動車部品、電子機器、建設など、幅広い業界でご導入いただいています。">
              <span className="text-white font-bold text-sm cursor-help">他20社以上</span>
            </HoverTooltip>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
