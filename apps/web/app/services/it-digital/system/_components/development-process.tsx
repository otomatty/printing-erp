'use client';

import type React from 'react';
import Container from '~/components/custom/container';

type ProcessStep = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

type SprintCycle = {
  number: number;
  title: string;
  description: string;
  achievement: string;
  color: string;
  duration: string;
};

const ProcessSteps: ProcessStep[] = [
  {
    title: '計画',
    description: '今回のゴールを決定',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <title>計画</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
  },
  {
    title: '開発',
    description: '機能の実装',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <title>開発</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
  },
  {
    title: '確認',
    description: '実際に使ってみる',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <title>確認</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: '改善',
    description: 'フィードバックを反映',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <title>改善</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
  },
];

const SprintCycles: SprintCycle[] = [
  {
    number: 1,
    title: '基本機能の実装',
    description: 'まずは最低限必要な機能から',
    achievement: 'システム稼働開始！',
    color: 'blue',
    duration: '2〜4週間',
  },
  {
    number: 2,
    title: '業務効率化機能',
    description: '日常業務を楽にする機能を追加',
    achievement: '作業時間30%削減！',
    color: 'green',
    duration: '2〜3週間',
  },
  {
    number: 3,
    title: 'データ分析機能',
    description: '業務データを活用できる機能',
    achievement: '経営判断が迅速に',
    color: 'purple',
    duration: '2〜3週間',
  },
  {
    number: 4,
    title: 'ユーザー体験向上',
    description: 'より使いやすくする改善',
    achievement: '社員の満足度UP',
    color: 'orange',
    duration: '1〜2週間',
  },
];

const SystemDevelopmentProcess: React.FC = () => {
  return (
    <section className="py-16 lg:py-32 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-3">
            システム開発の<span className="text-blue-600">進め方</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            短期間でシステムを利用開始し、段階的に改善していく開発手法を採用しています
          </p>
        </div>

        {/* スマホ表示用 (円環が縦に並ぶ) */}
        <div className="md:hidden">
          {SprintCycles.map((cycle, index) => (
            <div
              key={`mobile-cycle-${cycle.number}`}
              className={`mb-8 p-6 rounded-lg shadow-md bg-white border-t-4 border-${cycle.color}-500`}
            >
              <div className="flex items-center mb-3">
                <div
                  className={`bg-${cycle.color}-100 text-${cycle.color}-700 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-2`}
                >
                  {cycle.number}
                </div>
                <h3 className="text-xl font-semibold">{cycle.title}</h3>
                <div className="ml-auto text-sm text-gray-500">
                  {cycle.duration}
                </div>
              </div>

              <p className="text-gray-600 mb-4">{cycle.description}</p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                {ProcessSteps.map((step, stepIndex) => (
                  <div
                    key={`mobile-step-${cycle.number}-${stepIndex}`}
                    className="flex flex-col items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div className={`text-${cycle.color}-500 mb-1`}>
                      {step.icon}
                    </div>
                    <div className="text-sm font-medium">{step.title}</div>
                  </div>
                ))}
              </div>

              <div
                className={`bg-${cycle.color}-50 p-3 rounded-lg text-${cycle.color}-700 text-center font-medium`}
              >
                成果: {cycle.achievement}
              </div>

              {index < SprintCycles.length - 1 && (
                <div className="flex justify-center my-4">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <title>下矢印</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* デスクトップ表示用 (円環が横に並ぶ) */}
        <div className="hidden md:block relative">
          <div className="flex justify-between items-center mb-8">
            <div className="text-gray-500">プロジェクト開始</div>
            <div className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-medium">
              最短1ヶ月でシステム運用開始
            </div>
            <div className="text-gray-500">継続的改善</div>
          </div>

          <div className="flex justify-between relative mb-16">
            {/* 連結線 */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0" />

            {SprintCycles.map((cycle, index) => (
              <div
                key={`desktop-cycle-${cycle.number}`}
                className="relative z-10 flex-1 mx-2 first:ml-0 last:mr-0"
              >
                {/* 円環コンテナ */}
                <div
                  className={`
                  bg-white rounded-xl shadow-lg overflow-hidden border-2 border-${cycle.color}-400
                  transition-all duration-300 hover:shadow-xl hover:scale-105
                `}
                >
                  {/* ヘッダー */}
                  <div
                    className={`bg-${cycle.color}-500 text-white p-3 text-center`}
                  >
                    <h3 className="font-bold">
                      サイクル {cycle.number}: {cycle.title}
                    </h3>
                    <div className="text-sm opacity-90">{cycle.duration}</div>
                  </div>

                  {/* 内容 */}
                  <div className="p-4">
                    <p className="text-gray-600 text-sm mb-3 text-center">
                      {cycle.description}
                    </p>

                    {/* 円環プロセス */}
                    <div className="relative h-48 w-48 mx-auto mb-4">
                      <div className="absolute inset-0 rounded-full border-4 border-dashed border-gray-200" />

                      {ProcessSteps.map((step, stepIndex) => {
                        // 円周上の位置を計算
                        const angle =
                          (stepIndex / ProcessSteps.length) * Math.PI * 2 -
                          Math.PI / 2;
                        const radius = 70; // 円の半径
                        const x = radius * Math.cos(angle);
                        const y = radius * Math.sin(angle);

                        return (
                          <div
                            key={`process-${cycle.number}-${stepIndex}`}
                            className={`absolute bg-${cycle.color}-100 rounded-full p-2 shadow-sm
                              transform -translate-x-1/2 -translate-y-1/2
                              hover:bg-${cycle.color}-200 transition-colors duration-200
                            `}
                            style={{
                              left: `calc(50% + ${x}px)`,
                              top: `calc(50% + ${y}px)`,
                            }}
                          >
                            <div className={`text-${cycle.color}-600`}>
                              {step.icon}
                            </div>
                            <div className="absolute whitespace-nowrap text-xs font-medium top-full left-1/2 transform -translate-x-1/2 mt-1">
                              {step.title}
                            </div>
                          </div>
                        );
                      })}

                      {/* 中央のアイコン */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div
                          className={`bg-${cycle.color}-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold`}
                        >
                          {cycle.number}
                        </div>
                      </div>
                    </div>

                    {/* 成果 */}
                    <div
                      className={`bg-${cycle.color}-50 p-2 rounded text-${cycle.color}-700 text-center text-sm font-medium`}
                    >
                      成果: {cycle.achievement}
                    </div>
                  </div>
                </div>

                {/* 矢印（最後以外） */}
                {index < SprintCycles.length - 1 && (
                  <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <title>右矢印</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto bg-blue-50 rounded-lg p-6 shadow-md border border-blue-100">
            <h4 className="font-bold text-lg mb-2 text-blue-800">
              アジャイル開発のメリット
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <title>チェックマーク</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  <strong>早期に運用開始：</strong>
                  最短1ヶ月で基本機能の利用が可能になり、投資効果を早く実感できます
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <title>チェックマーク</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  <strong>無駄のない開発：</strong>
                  実際に使ってみて必要性が低いと判断された機能は開発せず、本当に必要な機能に集中します
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <title>チェックマーク</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  <strong>リスク低減：</strong>
                  大きな投資をする前に、小さな成功を重ねながら段階的に開発するため、失敗リスクが大幅に減少します
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SystemDevelopmentProcess;
