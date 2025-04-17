import type React from 'react';
import { Card, CardContent } from '@kit/ui/card';
import { CheckCircle } from 'lucide-react';

/**
 * 解決策を提示するカードコンポーネント
 */
const SolutionCard: React.FC = () => {
  return (
    <Card className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-xl overflow-hidden">
      <CardContent className="p-8 md:p-12">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <CheckCircle className="h-16 w-16 text-white opacity-90" />
          </div>
          <div className="text-center lg:text-left">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              その悩み、
              <span className="underline decoration-yellow-400 decoration-4 underline-offset-4">
                集客に強いホームページ
              </span>
              で解決できます！
            </h3>
            <p className="text-lg opacity-95">
              テンプレートではなく、お客様のビジネスに最適化したオリジナルデザインのホームページを制作します。
              SEO対策やスマホ対応はもちろん、訪問者を顧客に変える導線設計で、問い合わせ数や売上のアップを実現します。
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SolutionCard;
