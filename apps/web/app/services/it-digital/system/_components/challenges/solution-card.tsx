import type React from 'react';
import { Card, CardContent } from '@kit/ui/card';
import { CheckCircle } from 'lucide-react';

/**
 * 解決策を提示するカードコンポーネント
 */
const SolutionCard: React.FC = () => {
  return (
    <Card className="bg-gradient-to-r from-primary to-secondary text-white shadow-xl overflow-hidden mt-24">
      <CardContent className="p-8 md:p-12">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <CheckCircle className="h-16 w-16 text-white opacity-90" />
          </div>
          <div className="text-center lg:text-left">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              その悩み、
              <span className="underline decoration-yellow-400 decoration-4 underline-offset-4">
                ニイヌマ企画印刷
              </span>
              が解決いたします！
            </h3>
            <p className="text-lg opacity-95">
              大手向けの高額システムや難しい市販ソフトではなく、お客様の実際の業務に合わせた使いやすいシステムをお作りします。
              最小限の投資で最大の効果を実感できる、地域企業のための業務システムで、日々の業務負担を減らし、経営の見える化を実現します。
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SolutionCard;
