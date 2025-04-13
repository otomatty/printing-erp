'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@kit/ui/table';

import CategoryDialog from './category-dialog';
import DeleteCategoryButton from './delete-category-button';
import { updateCategoryOrder } from '~/actions/news';
import type { Category } from '~/types/news';

/**
 * ドラッグ可能なテーブル行コンポーネント
 */
function SortableTableRow({
  category,
  isDragOverlay = false,
}: {
  category: Category;
  isDragOverlay?: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
    position: 'relative' as const,
    backgroundColor: isDragging ? 'rgba(0, 0, 0, 0.03)' : undefined,
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell className="w-[50px]">
        <div
          className="flex items-center justify-center cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
      </TableCell>
      <TableCell className="font-medium">{category.name}</TableCell>
      <TableCell className="font-mono text-sm">{category.slug}</TableCell>
      <TableCell className="max-w-xs truncate">
        {category.description || '-'}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-1">
          <CategoryDialog category={category} />
          <DeleteCategoryButton
            categoryId={category.id}
            categoryName={category.name}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}

interface SortableCategoriesListProps {
  categories: Category[];
}

/**
 * ソート可能なカテゴリ一覧コンポーネント
 */
export default function SortableCategoriesList({
  categories: initialCategories,
}: SortableCategoriesListProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // エラー発生時にルーターをリフレッシュするeffect
  useEffect(() => {
    if (error) {
      // エラーがあれば一度だけルーターをリフレッシュ
      router.refresh();
      // エラー状態をリセット
      setError(null);
    }
  }, [error, router]);

  // カテゴリの初期化
  useEffect(() => {
    // 表示順でソート
    const sortedCategories = [...initialCategories].sort(
      (a, b) => (a.display_order || 0) - (b.display_order || 0)
    );
    setCategories(sortedCategories);
  }, [initialCategories]);

  // ドラッグ&ドロップのセンサー設定
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px動かさないとドラッグ開始しない
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // ドラッグ終了時の処理
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setIsSaving(true);

      // 元の配列内での位置を見つける
      const oldIndex = categories.findIndex((item) => item.id === active.id);
      const newIndex = categories.findIndex((item) => item.id === over.id);

      // 配列内の位置を更新
      const newItems = arrayMove(categories, oldIndex, newIndex);

      // 表示順を更新（0から始まる連番にする）
      const updatedItems = newItems.map((item, index) => ({
        ...item,
        display_order: index,
      }));

      // 状態を更新
      setCategories(updatedItems);

      // 更新した順序をサーバーに保存
      await updateOrder(updatedItems);
    }
  };

  // 順序の更新処理
  const updateOrder = async (updatedCategories: Category[]) => {
    try {
      const categoryOrders = updatedCategories.map((cat) => ({
        id: cat.id,
        display_order: cat.display_order || 0,
      }));

      const result = await updateCategoryOrder(categoryOrders);

      if (result.success) {
        toast.success('カテゴリの表示順を更新しました');
      } else {
        toast.error(`更新エラー: ${result.error}`);
        // エラー状態をセット（useEffectでリフレッシュされる）
        setError(result.error || '更新エラーが発生しました');
      }
    } catch (error) {
      console.error('Update order error:', error);
      toast.error('表示順の更新中にエラーが発生しました');
      // エラー状態をセット（useEffectでリフレッシュされる）
      setError('表示順の更新中にエラーが発生しました');
    } finally {
      setIsSaving(false);
    }
  };

  if (categories.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        カテゴリはまだありません。「カテゴリを追加」ボタンをクリックして作成してください。
      </div>
    );
  }

  return (
    <div className="border rounded-md relative">
      {isSaving && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
          <p className="text-sm text-muted-foreground">保存中...</p>
        </div>
      )}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={categories.map((cat) => cat.id)}
          strategy={verticalListSortingStrategy}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]" />
                <TableHead>名前</TableHead>
                <TableHead>スラッグ</TableHead>
                <TableHead>説明</TableHead>
                <TableHead className="w-[120px] text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <SortableTableRow key={category.id} category={category} />
              ))}
            </TableBody>
          </Table>
        </SortableContext>
      </DndContext>
    </div>
  );
}
