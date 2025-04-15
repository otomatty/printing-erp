import type React from 'react';
import DevelopmentPrinciple from '../../../_common/development-principle';
import { developmentPrinciples } from '../../_data/whyChooseUsData';

const DevelopmentPrinciplesSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-8 text-white mb-8">
      <h3 className="text-2xl font-bold mb-6 text-center">
        ニイヌマ企画印刷の開発5つの約束
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
        {developmentPrinciples.map((principle) => (
          <DevelopmentPrinciple
            key={`principle-${principle.number}`}
            data={principle}
            total={developmentPrinciples.length}
          />
        ))}
      </div>
    </div>
  );
};

export default DevelopmentPrinciplesSection;
