'use client';

import type React from 'react';
import { Card, CardContent } from '@kit/ui/card';

// 投資対効果のデータ
const roiData = [
  {
    period: '1年目',
    traditional: {
      cost: 350, // 万円
      benefit: 150,
      roi: -57, // (150-350)/350 * 100
    },
    ninuma: {
      cost: 150, // 万円
      benefit: 150,
      roi: 0, // (150-150)/150 * 100
    },
    description:
      '初年度は投資回収フェーズ。当社なら初年度でコスト回収できることも。',
  },
  {
    period: '2年目',
    traditional: {
      cost: 470, // 初期 + 運用
      benefit: 350,
      roi: -26, // (350-470)/470 * 100
    },
    ninuma: {
      cost: 198, // 初期 + 運用
      benefit: 350,
      roi: 77, // (350-198)/198 * 100
    },
    description: '2年目以降は運用コストのみ。当社なら大きなプラスに転じます。',
  },
  {
    period: '3年目',
    traditional: {
      cost: 590, // 初期 + 運用2年
      benefit: 550,
      roi: -7, // (550-590)/590 * 100
    },
    ninuma: {
      cost: 246, // 初期 + 運用2年
      benefit: 550,
      roi: 124, // (550-246)/246 * 100
    },
    description:
      '3年目になると差がさらに大きくなり、当社の優位性が明確になります。',
  },
];

const RoiSection: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold mb-4 text-center">
        投資対効果（ROI）の<span className="text-primary">比較</span>
      </h3>
      <p className="text-center mb-8 text-gray-600">
        ホームページ制作への投資とその効果を年数ごとに比較しました。
        <br />
        当社の方法では早期に投資を回収し、長期的により大きなリターンを得られます。
      </p>

      <div className="space-y-6">
        {roiData.map((data) => (
          <Card key={data.period} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h4 className="text-xl font-semibold">{data.period}</h4>
                <p className="text-sm text-gray-600">{data.description}</p>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h5 className="font-semibold text-lg mb-3">
                    一般的な制作会社
                  </h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>累計コスト</span>
                      <span className="font-semibold">
                        {data.traditional.cost}万円
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>累計効果</span>
                      <span className="font-semibold">
                        {data.traditional.benefit}万円
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span>ROI</span>
                      <span
                        className={`font-bold ${data.traditional.roi < 0 ? 'text-red-500' : 'text-green-500'}`}
                      >
                        {data.traditional.roi}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <h5 className="font-semibold text-lg mb-3 text-primary">
                    当社
                  </h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>累計コスト</span>
                      <span className="font-semibold">
                        {data.ninuma.cost}万円
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>累計効果</span>
                      <span className="font-semibold">
                        {data.ninuma.benefit}万円
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span>ROI</span>
                      <span
                        className={`font-bold ${data.ninuma.roi < 0 ? 'text-red-500' : 'text-primary'}`}
                      >
                        {data.ninuma.roi}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">計算の前提</h4>
        <ul className="text-sm text-yellow-700 space-y-1 list-disc pl-5">
          <li>初期費用：一般的な制作会社 350万円 / 当社 150万円と仮定</li>
          <li>運用コスト：一般的な制作会社 月10万円 / 当社 月4万円と仮定</li>
          <li>
            ホームページからの集客効果や問い合わせ増加などによる売上貢献を効果として算出
          </li>
          <li>実際の数値はビジネスの規模や業種により異なります</li>
        </ul>
      </div>
    </div>
  );
};

export default RoiSection;
