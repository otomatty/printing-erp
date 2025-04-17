import type React from 'react';

interface SectionHeaderProps {
  title: string;
  highlightedText: string;
  description: string;
}

/**
 * セクションヘッダーコンポーネント
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  highlightedText,
  description,
}) => {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        {title}
        <span className="text-indigo-600">{highlightedText}</span>
        、ありませんか？
      </h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">{description}</p>
    </div>
  );
};

export default SectionHeader;
