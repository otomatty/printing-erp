import React, { type ReactNode } from 'react';
import EditButton from './edit-button';

type ConfirmationItemProps = {
  label: string;
  children: ReactNode;
  onClick: () => void;
  className?: string;
};

/**
 * 確認画面の項目表示用コンポーネント
 *
 * @param label 項目のラベル
 * @param children 表示する値（ReactNode）
 * @param onClick 編集ボタンクリック時のコールバック
 * @param className 追加のスタイル（オプション）
 */
export default function ConfirmationItem({
  label,
  children,
  onClick,
  className = '',
}: ConfirmationItemProps) {
  return (
    <div
      className={`flex justify-between items-center border-b pb-3 group relative ${className}`}
    >
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-500">{label}</h3>
        {children}
      </div>
      <EditButton onClick={onClick} />
    </div>
  );
}
