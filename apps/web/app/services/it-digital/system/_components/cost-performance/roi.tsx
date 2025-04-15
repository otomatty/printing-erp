import type React from 'react';
import { useState, useMemo } from 'react';
import { Button } from '@kit/ui/button';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine,
  Line,
} from 'recharts';
import {
  calculateRoiData,
  defaultRoiParams,
  type RoiPeriod,
  getRoiRecoveryData,
} from '~/utils/roi-calculation';

const RoiSection: React.FC = () => {
  const [roiPeriod, setRoiPeriod] = useState<RoiPeriod>('18m');
  const currentRoiData = useMemo(
    () => calculateRoiData(roiPeriod, defaultRoiParams),
    [roiPeriod]
  );
  const yAxisDomain = useMemo(() => {
    const allValues = currentRoiData.flatMap((d) => [d.traditional, d.ninuma]);
    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    const buffer = Math.max(Math.abs(min), Math.abs(max)) * 0.1;
    return [
      Math.floor((min - buffer) / 50) * 50,
      Math.ceil((max + buffer) / 50) * 50,
    ];
  }, [currentRoiData]);

  const getRoiConclusion = () => {
    const recoveryData = getRoiRecoveryData(currentRoiData);
    if (!recoveryData) return null;
    const {
      lastData,
      traditionalRecoveryMonthData,
      ninumaRecoveryMonthData,
      lastTraditionalBalance,
      lastNinumaBalance,
    } = recoveryData;
    return (
      <>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded-full mr-2" />
          <span>
            従来型：
            {lastTraditionalBalance < 0 ? (
              <>
                <strong>{lastData.month}後も投資回収できず</strong> (
                {Math.round(lastTraditionalBalance)}万円)
              </>
            ) : traditionalRecoveryMonthData ? (
              <>
                <strong>
                  {traditionalRecoveryMonthData.month}頃に投資回収
                </strong>{' '}
                ({lastData.month}時点: {Math.round(lastTraditionalBalance)}万円)
              </>
            ) : (
              'データが不足しています'
            )}
          </span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-600 rounded-full mr-2" />
          <span>
            ニイヌマ企画印刷：
            {lastNinumaBalance < 0 ? (
              <>
                <strong>{lastData.month}後も投資回収できず</strong> (
                {Math.round(lastNinumaBalance)}万円)
              </>
            ) : ninumaRecoveryMonthData ? (
              <>
                <strong>{ninumaRecoveryMonthData.month}頃に投資回収</strong>し、
                {lastData.month}時点では{Math.round(lastNinumaBalance)}
                万円の利益
              </>
            ) : (
              'データが不足しています'
            )}
          </span>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold mb-2">投資対効果（ROI）の比較</h3>
        <p className="text-gray-600">
          初期開発費と月額運用費を含めた投資回収シミュレーション
        </p>
      </div>
      <div className="flex justify-center gap-2 mb-4">
        <Button
          variant={roiPeriod === '18m' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setRoiPeriod('18m')}
        >
          18ヶ月
        </Button>
        <Button
          variant={roiPeriod === '3y' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setRoiPeriod('3y')}
        >
          3年
        </Button>
        <Button
          variant={roiPeriod === '5y' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setRoiPeriod('5y')}
        >
          5年
        </Button>
      </div>
      <div>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={currentRoiData}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis
                tickFormatter={(value) => `${value > 0 ? '+' : ''}${value}万円`}
                domain={yAxisDomain}
              />
              <Tooltip
                formatter={(value: number, name: string) => {
                  const formattedValue = value.toFixed(1);
                  const numericValue = Number.parseFloat(formattedValue);
                  const label =
                    name === 'traditional' ? '従来型' : 'ニイヌマ企画印刷';
                  return [
                    `${numericValue > 0 ? '+' : ''}${formattedValue}万円`,
                    label,
                  ];
                }}
                labelFormatter={(label) => `${label}`}
              />
              <Legend
                payload={[
                  {
                    value: '従来型開発',
                    type: 'line',
                    color: '#ef4444',
                  },
                  {
                    value: 'ニイヌマ企画印刷',
                    type: 'line',
                    color: '#2563eb',
                  },
                ]}
              />
              <ReferenceLine
                y={0}
                stroke="#059669"
                strokeWidth={2}
                strokeDasharray="0 0"
                label={{
                  value: '投資回収ライン',
                  position: 'insideTopRight',
                  fill: '#059669',
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="traditional"
                stroke="#ef4444"
                strokeWidth={3}
                activeDot={{ r: 8 }}
                name="traditional"
              />
              <Line
                type="monotone"
                dataKey="ninuma"
                stroke="#2563eb"
                strokeWidth={3}
                activeDot={{ r: 8 }}
                name="ninuma"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {getRoiConclusion()}
          </div>
          <div className="mt-4 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
            <p className="mb-2 font-medium">※試算条件</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                初期投資: 従来型{defaultRoiParams.traditional.initialCost}
                万円 vs ニイヌマ企画印刷
                {defaultRoiParams.ninuma.initialCost}万円（
                {Math.round(
                  (1 -
                    defaultRoiParams.ninuma.initialCost /
                      defaultRoiParams.traditional.initialCost) *
                    100
                )}
                %削減）
              </li>
              <li>
                月額運用費: 従来型{defaultRoiParams.traditional.monthlyCost}
                万円/月 vs ニイヌマ企画印刷
                {defaultRoiParams.ninuma.monthlyCost}万円/月
              </li>
              <li>月間効果（業務効率化・売上増加）:</li>
              <ul className="list-disc pl-5 mt-1">
                <li>両社とも初月から効果が発生し、徐々に増加</li>
                <li>
                  従来型: 初期{defaultRoiParams.traditional.initialEffect}
                  万円/月から最大
                  {defaultRoiParams.traditional.maxEffect}万円/月まで増加
                </li>
                <li>
                  ニイヌマ企画印刷: 初期
                  {defaultRoiParams.ninuma.initialEffect}万円/月から最大
                  {defaultRoiParams.ninuma.maxEffect}
                  万円/月まで増加（継続的改善により）
                </li>
              </ul>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoiSection;
