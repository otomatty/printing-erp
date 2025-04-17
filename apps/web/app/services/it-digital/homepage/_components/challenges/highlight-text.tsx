import type React from 'react';

/**
 * マークダウン形式の強調テキスト（**で囲まれた部分）をHTML要素に変換する
 * @param text マークダウン形式のテキスト（**で囲まれた部分が強調される）
 * @param parentKey 親要素のキー（React要素のkeyプロパティに使用）
 * @returns React要素の配列
 */
export const renderHighlightedText = (
  text: string,
  parentKey: string
): React.ReactNode[] => {
  const parts = text.split(/(\*{2}[^\*]+\*{2})/g).filter((part) => part); // 空文字列を除去
  return parts.map((part, index) => {
    const key = `${parentKey}-part-${index}`; // 親keyとindexで一意性を高める
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <span key={key} className="font-semibold">
          {part.slice(2, -2)} {/* アスタリスクを除去 */}
        </span>
      );
    }
    return <span key={key}>{part}</span>;
  });
};
