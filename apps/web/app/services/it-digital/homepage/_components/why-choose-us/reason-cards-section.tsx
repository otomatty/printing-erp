'use client';

import type React from 'react';
import ReasonCard from '../../../_common/reason-card';
import { reasonCards } from '../../_data/whyChooseUsData';

const ReasonCardsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reasonCards.map((card) => (
        <ReasonCard key={`reason-card-${card.title}`} data={card} />
      ))}
    </div>
  );
};

export default ReasonCardsSection;
