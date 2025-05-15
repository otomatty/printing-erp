import type React from 'react';

const StrengthsSection: React.FC = () => {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        印刷会社の「低コスト・スクラッチ開発」
      </h2>
      <div className="space-y-4">
        <p className="text-lg text-gray-600">
          「スクラッチ開発は高価だ」と思っていませんか？
        </p>
        <p className="text-lg text-gray-600">
          印刷会社
          <strong className="text-gray-800">
            経験豊富な外部エンジニアとの効率的な連携体制
          </strong>
          を構築。 プロジェクトごとに最適なチームを編成し、
          <strong className="text-gray-800">無駄なコストを徹底的に削減</strong>
          することで、
          <strong className="text-gray-800">高品質なオーダーメイド開発</strong>
          を驚きの<strong className="text-gray-800">低コスト</strong>
          でご提供します。
        </p>
        <p className="text-lg text-gray-600">
          私たちは単に開発を行うだけではありません。
          <strong className="text-gray-800">
            企画・設計の段階からお客様に深く寄り添い
          </strong>
          、丁寧なヒアリングを通じて真の課題を発見します。
        </p>
        <p className="text-lg text-gray-600">
          長年の
          <strong className="text-gray-800">
            印刷業で培ってきた「顧客理解力」「課題発見力」
          </strong>
          、そして<strong className="text-gray-800">「デザイン力」</strong>
          を活かし、見た目の美しさだけでなく、
          <strong className="text-gray-800">使いやすさと成果に直結する</strong>
          最適なシステム・ホームページを、お客様と
          <strong className="text-gray-800">共に創り上げます</strong>。
        </p>
      </div>
    </section>
  );
};

export default StrengthsSection;
