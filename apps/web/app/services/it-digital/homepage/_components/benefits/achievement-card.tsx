import type React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import type { AchievementCardProps } from './types';

/**
 * ホームページ制作の成果を表示するカードコンポーネント
 */
const AchievementCard: React.FC<AchievementCardProps> = ({
  percentage,
  description,
}) => {
  // percentageから数値を抽出（例："80%"から80を取得）
  const percentValue = Number.parseInt(percentage.replace('%', ''), 10);

  // PieChartのデータ作成
  const data = [
    { value: percentValue, name: 'Completed' },
    { value: 100 - percentValue, name: 'Remaining' },
  ];

  // カラー設定 - CSS変数のprimaryを使用
  const COLORS = ['var(--primary)', '#EEEEEE'];

  return (
    <div className="bg-white p-5 rounded-lg shadow-md text-center">
      <div className="h-48 mb-2 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={70}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              cornerRadius={5}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={entry.name === 'Completed' ? COLORS[0] : COLORS[1]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {percentage}
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-600 font-bold">{description}</p>
    </div>
  );
};

export default AchievementCard;
