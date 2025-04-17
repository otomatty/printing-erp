'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import { Card } from '@kit/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts';

// 従来との比較データ
const comparisonData = [
  {
    item: '初期費用',
    traditional: 100,
    traditionalLabel: '150〜500万円',
    ninuma: 45,
    ninumaLabel: '35〜150万円',
    trendText: '初期費用55%削減',
    description:
      '必要な機能だけに絞り、テンプレートをベースにした効率的な開発で大幅にコストダウン',
    saving: '55%削減',
  },
  {
    item: '制作期間',
    traditional: 100,
    traditionalLabel: '3〜6ヶ月',
    ninuma: 30,
    ninumaLabel: '1〜2ヶ月',
    trendText: '制作期間70%短縮',
    description:
      '最新のツールと効率的な制作フローにより、従来より短期間での納品が可能',
    saving: '70%短縮',
  },
  {
    item: '運用コスト',
    traditional: 100,
    traditionalLabel: '月5〜15万円',
    ninuma: 40,
    ninumaLabel: '月2〜6万円',
    trendText: '運用コスト60%削減',
    description:
      '更新・管理しやすいCMSの導入と保守費用の最適化により運用負担を大幅に軽減',
    saving: '60%削減',
  },
];

const ComparisonSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  // 画面幅を監視してモバイルかどうかを判定
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // md ブレークポイント
    };

    // 初期チェック
    checkIfMobile();

    // リサイズイベントでのチェック
    window.addEventListener('resize', checkIfMobile);

    // クリーンアップ
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <div className="bg-gray-50 p-6 lg:p-10 rounded-xl shadow-md">
      <h3 className="text-2xl font-bold mb-6 text-center">
        一般的な制作会社との<span className="text-primary">比較</span>
      </h3>

      <div className="mb-8">
        <ResponsiveContainer width="100%" height={isMobile ? 350 : 300}>
          <BarChart
            data={comparisonData}
            layout={isMobile ? 'vertical' : 'horizontal'}
            margin={{
              top: 5,
              right: 30,
              left: isMobile ? 100 : 20,
              bottom: isMobile ? 5 : 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            {isMobile ? (
              <XAxis type="number" domain={[0, 100]} />
            ) : (
              <XAxis dataKey="item" />
            )}
            {isMobile ? (
              <YAxis dataKey="item" type="category" tick={{ fontSize: 14 }} />
            ) : (
              <YAxis domain={[0, 100]} />
            )}
            <Tooltip
              formatter={(value, name) => {
                if (name === 'traditional') {
                  const item = comparisonData.find(
                    (d) => d.traditional === value
                  );
                  return [item?.traditionalLabel || value, '一般的な制作会社'];
                }
                if (name === 'ninuma') {
                  const item = comparisonData.find((d) => d.ninuma === value);
                  return [item?.ninumaLabel || value, '当社'];
                }
                return [value, name];
              }}
            />
            <Legend
              payload={[
                {
                  value: '一般的な制作会社',
                  type: 'square',
                  color: '#CBD5E1', // text-slate-300
                },
                {
                  value: '当社',
                  type: 'square',
                  color: '#6366F1', // text-indigo-500
                },
              ]}
            />
            <Bar
              dataKey="traditional"
              fill="#CBD5E1"
              name="一般的な制作会社"
              radius={[4, 4, 4, 4]}
            >
              <LabelList
                dataKey="traditionalLabel"
                position={isMobile ? 'right' : 'top'}
                style={{ fontSize: '12px', fill: '#64748B' }}
              />
            </Bar>
            <Bar
              dataKey="ninuma"
              fill="#6366F1"
              name="当社"
              radius={[4, 4, 4, 4]}
            >
              <LabelList
                dataKey="ninumaLabel"
                position={isMobile ? 'right' : 'top'}
                style={{ fontSize: '12px', fill: '#4F46E5' }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {comparisonData.map((item) => (
          <div
            key={item.item}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
          >
            <div className="flex items-center mb-2">
              <h4 className="text-lg font-semibold mr-2">{item.item}</h4>
              <span className="bg-primary/10 text-primary text-sm px-2 py-1 rounded-full">
                {item.saving}
              </span>
            </div>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparisonSection;
