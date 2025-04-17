import type React from 'react';

interface SectionHeaderProps {
  title: string;
  highlightedText: string;
  description: string;
}

/**
 * ベネフィットセクションのヘッダーコンポーネント
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  highlightedText,
  description,
}) => {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold mb-4">
        {title}
        <span className="text-primary">{highlightedText}</span>
      </h2>
      <div className="max-w-3xl mx-auto">
        <p className="text-lg text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default SectionHeader;
