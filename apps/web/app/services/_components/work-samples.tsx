import type React from 'react';
import Image from 'next/image'; // 画像表示用
import Container from '~/components/custom/container';

export interface SampleItem {
  title: string;
  description: string;
  imageSrc: string; // 画像パス (プレースホルダー)
  alt: string;
}

interface WorkSamplesProps {
  sectionTitle: string;
  sampleItems: SampleItem[];
  note: string;
}

const WorkSamples: React.FC<WorkSamplesProps> = ({
  sectionTitle,
  sampleItems,
  note,
}) => {
  return (
    <section className="py-16 lg:py-32 bg-white">
      <Container>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          {sectionTitle}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sampleItems.map((item) => (
            <div
              key={item.title}
              className="bg-gray-50 rounded-lg shadow-md overflow-hidden group border border-gray-200" // 背景と枠線調整
            >
              <div className="relative w-full h-48 bg-gray-200">
                {/* 画像コンテナ */}
                {/* TODO: Imageコンポーネントで実際の画像を表示 */}
                {/* <Image src={item.imageSrc} alt={item.alt} layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform duration-300" /> */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                  画像プレースホルダー
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-8">{note}</p>
      </Container>
    </section>
  );
};

export default WorkSamples;
