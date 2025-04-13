'use client';

import { useDroppable } from '@dnd-kit/core';

interface DroppableSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  description?: string;
}

export function DroppableSection({
  id,
  title,
  children,
  className = '',
  description,
}: DroppableSectionProps) {
  const { setNodeRef, isOver, active } = useDroppable({
    id,
    data: {
      type: 'section',
      accepts:
        id === 'user-items'
          ? ['available-items', 'user-items']
          : ['user-items'],
    },
  });

  // ドロップ領域のスタイル: ドラッグアイテムがホバーしているときに強調表示
  const getHighlightStyle = () => {
    if (!active) return '';

    // ドロップ可能な時はハイライト
    if (isOver) {
      return 'ring-2 ring-blue-400 bg-blue-50/40';
    }

    // アクティブだがホバーしていない
    return 'ring-1 ring-gray-200';
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-base">{title}</h3>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>

      <div
        ref={setNodeRef}
        className={`rounded-lg p-4 transition-all duration-200 bg-gray-50/70 min-h-[150px] ${getHighlightStyle()} ${className}`}
        data-droppable-id={id}
      >
        {children ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {children}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400 text-sm">
            アイテムがありません
          </div>
        )}
      </div>
    </div>
  );
}
