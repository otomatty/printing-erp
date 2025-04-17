import type React from 'react';
import type { BenefitCardProps } from './types';

/**
 * ホームページ制作のメリットを表示するカードコンポーネント
 */
const BenefitCard: React.FC<BenefitCardProps> = ({
  icon: Icon,
  title,
  description,
  example,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md transform transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center mb-4">
        <div className="bg-primary/5 rounded-full p-3 mr-4">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600 mb-3">{description}</p>
      <div className="bg-gray-50 p-3 rounded-md text-sm">
        <span className="font-medium text-primary">実際の例：</span> {example}
      </div>
    </div>
  );
};

export default BenefitCard;
