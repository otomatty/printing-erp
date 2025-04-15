import { ReactNode } from 'react';

interface SectionTitleProps {
  title: string; // タイトルのメインテキスト
  highlightedText?: string; // 強調したいテキスト部分 (オプション)
  afterHighlightedText?: string; // 強調テキスト後のテキスト (オプション)
  description?: string; // 説明文 (オプション)
  className?: string; // 追加のクラス名 (オプション)
}

/**
 * サービスセクションで使用する共通のタイトルコンポーネント
 * タイトルと説明テキストを表示し、特定の部分を強調することができます
 */
export default function SectionTitle({
  title,
  highlightedText,
  afterHighlightedText,
  description,
  className,
}: SectionTitleProps) {
  // タイトルに強調テキストが含まれているかどうかを確認
  const titleContent = (
    <>
      {title}
      {highlightedText && (
        <span className="text-primary">{highlightedText}</span>
      )}
      {afterHighlightedText && <span>{afterHighlightedText}</span>}
    </>
  );

  return (
    <div className={`mb-16 text-center ${className || ''}`}>
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        {titleContent}
      </h2>
      {description && (
        <p className="text-lg text-left text-gray-600 max-w-3xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
