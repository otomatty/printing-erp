import type React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  LabelList,
} from 'recharts';

// 従来との比較データ
const comparisonData = [
  {
    item: '初期費用',
    traditional: 100,
    traditionalLabel: '300〜1,000万円',
    ninuma: 45,
    ninumaLabel: '68〜200万円',
    trendText: '初期費用55%削減',
    description:
      '必要な機能だけに絞り、無駄のない開発をすることで大幅にコストダウン',
    saving: '55%削減',
  },
  {
    item: '開発期間',
    traditional: 100,
    traditionalLabel: '6〜12ヶ月',
    ninuma: 22,
    ninumaLabel: '1〜3ヶ月',
    trendText: '開発期間78%短縮',
    description:
      '最新の開発ツールと効率的な開発手法により、従来より短期間での納品が可能',
    saving: '78%短縮',
  },
  {
    item: '投資回収期間',
    traditional: 100,
    traditionalLabel: '2〜3年',
    ninuma: 40,
    ninumaLabel: '約1年',
    trendText: '投資回収60%短縮',
    description:
      '効果の高い機能から段階的に開発し、早期から投資効果を実感できる方式を採用',
    saving: '60%短縮',
  },
];

const ComparisonSection: React.FC = () => {
  return (
    <>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">従来のシステム開発と比較</h3>
        <p className="text-gray-600 max-w-3xl mx-auto">
          一般的な業務システム開発よりも圧倒的なコスト効率を実現
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {comparisonData.map((item) => (
          <div
            key={item.item}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-5 border-b">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-semibold">{item.item}</h4>
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>上昇トレンド</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  {item.trendText}
                </div>
              </div>
            </div>
            <div className="p-1">
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[item]}
                    layout="horizontal"
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 10,
                    }}
                    barGap={12}
                    barSize={40}
                  >
                    <CartesianGrid
                      vertical={false}
                      strokeDasharray="3 3"
                      opacity={0.3}
                    />
                    <XAxis hide />
                    <YAxis hide />
                    <Bar dataKey="traditional" name="従来型" fill="#ef4444">
                      <LabelList
                        dataKey="traditionalLabel"
                        position="top"
                        style={{ fill: '#666', fontSize: 12 }}
                      />
                    </Bar>
                    <Bar
                      dataKey="ninuma"
                      name="ニイヌマ企画印刷"
                      fill="#2563eb"
                    >
                      <LabelList
                        dataKey="ninumaLabel"
                        position="top"
                        style={{
                          fill: '#2563eb',
                          fontSize: 12,
                          fontWeight: 'bold',
                        }}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="px-5 py-4 bg-gray-50">
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none text-green-600">
                  {item.saving}
                </div>
                <div className="leading-snug text-gray-600">
                  {item.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ComparisonSection;
