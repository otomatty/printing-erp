import type React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@kit/ui/card';
import { AlertTriangle } from 'lucide-react';
import { renderHighlightedText } from './highlight-text';
import type { Challenge } from './types';

interface ChallengeCardProps {
  challenge: Challenge;
}

/**
 * ホームページ課題のカードコンポーネント
 * 課題とその例を表示する
 */
const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="bg-indigo-100 p-3 rounded-full flex-shrink-0">
            <challenge.icon className="h-7 w-7 text-indigo-600" />
          </div>
          <CardTitle className="text-xl font-semibold text-gray-800">
            {challenge.category}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 text-gray-700">
          {challenge.examples.map((example) => (
            <li key={example} className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="flex-1">
                {renderHighlightedText(example, example)}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ChallengeCard;
