'use client';

import { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSwappingStrategy,
} from '@dnd-kit/sortable';
import { Button } from '@kit/ui/button';
import {
  updateQuickAccessOrder,
  removeQuickAccessItem,
  addQuickAccessItem,
  getUserQuickAccess,
  getUserAvailableQuickAccessItems,
} from '~/actions/quick-access';
import { toast } from 'sonner';
import {
  SortableQuickAccessItem,
  type QuickAccessItem,
  type AvailableQuickAccessItem,
} from './sortable-quick-access-item';
import { DroppableSection } from './droppable-section';

// ユーティリティ関数をインポート
import {
  type DragItemData,
  type PendingUpdateData,
  extractItemId,
  getIconComponent,
  getCategoryColor,
  getSectionFromId,
  convertToAvailableItem,
  updateItemDisplayOrders,
} from './utils';

interface QuickAccessEditProps {
  items: QuickAccessItem[];
  onComplete: (items: QuickAccessItem[]) => void;
}

export function QuickAccessEdit({ items, onComplete }: QuickAccessEditProps) {
  const [userItems, setUserItems] = useState<QuickAccessItem[]>(items);
  const [availableItems, setAvailableItems] = useState<
    AvailableQuickAccessItem[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingUpdate, setPendingUpdate] = useState<PendingUpdateData | null>(
    null
  );
  // ドラッグ中のアイテムを追跡するための状態を追加
  const [activeItem, setActiveItem] = useState<{
    item: QuickAccessItem | AvailableQuickAccessItem | null;
    section: 'user-items' | 'available-items' | null;
  }>({ item: null, section: null });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      // ドラッグ開始の距離を短くして反応を良くする
      activationConstraint: {
        distance: 5, // 5ピクセル動いたらドラッグ開始
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // 利用可能なアイテムを取得
  useEffect(() => {
    const fetchAvailableItems = async () => {
      setIsLoading(true);
      const response = await getUserAvailableQuickAccessItems();
      if (response.success) {
        setAvailableItems(response.items);
      } else {
        toast.error(response.error || '利用可能なアイテムの取得に失敗しました');
      }
      setIsLoading(false);
    };

    fetchAvailableItems();
  }, []);

  // 保留中の更新を処理
  useEffect(() => {
    if (!pendingUpdate) return;

    const processPendingUpdate = async () => {
      try {
        switch (pendingUpdate.type) {
          case 'add': {
            await addQuickAccessItem(pendingUpdate.data);
            const addResponse = await getUserQuickAccess();
            if (addResponse.success) {
              setUserItems(addResponse.items);

              // 追加したアイテムを「追加可能なアイテム」から削除
              setAvailableItems((prev) =>
                prev.filter((item) => item.id !== pendingUpdate.data)
              );
            }
            break;
          }
          case 'remove': {
            const removeResult = await removeQuickAccessItem(
              pendingUpdate.data
            );
            // ユーザーアイテムからIDに一致するものを削除
            setUserItems((prev) => {
              const removedItem = prev.find(
                (item) => item.id === pendingUpdate.data
              );
              const newItems = prev.filter(
                (item) => item.id !== pendingUpdate.data
              );

              // 削除したアイテムが存在し、削除操作が成功した場合
              if (removedItem && removeResult.success) {
                // 削除したアイテムを「追加可能なアイテム」リストに戻す
                setAvailableItems((prevAvailable) => {
                  // itemIdを使ってAvailableQuickAccessItemを作成
                  const itemToAdd = convertToAvailableItem(removedItem);

                  // 既に存在していない場合のみ追加
                  const exists = prevAvailable.some(
                    (item) => item.id === itemToAdd.id
                  );
                  if (!exists) {
                    return [...prevAvailable, itemToAdd];
                  }
                  return prevAvailable;
                });
              }

              return newItems;
            });
            break;
          }
          case 'reorder': {
            await updateQuickAccessOrder(pendingUpdate.data);
            break;
          }
        }
      } catch (error) {
        console.error('更新処理エラー:', error);
        toast.error('操作に失敗しました');
      } finally {
        setPendingUpdate(null);
      }
    };

    processPendingUpdate();
  }, [pendingUpdate]);

  // ドラッグ開始時の処理を追加
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    if (!active || !active.data.current) return;

    const activeData = active.data.current as DragItemData;
    setActiveItem({
      item: activeData.item,
      section: activeData.section,
    });
  };

  // ドラッグ終了時の処理
  const handleDragEnd = (event: DragEndEvent) => {
    // ドラッグ終了時にactiveItemをリセット
    setActiveItem({ item: null, section: null });

    const { active, over } = event;
    if (!over) {
      return;
    }

    const activeData = active.data.current as DragItemData;

    // ドラッグされたアイテムとドロップ先のセクションを特定
    const activeSection = activeData.section;

    // ドロップ先のセクションを取得
    const overSection = getSectionFromId(over.id.toString());

    // 1. 同じセクション内での並べ替え（user-items内）
    if (activeSection === 'user-items' && overSection === 'user-items') {
      const activeId = extractItemId(active.id.toString());
      const overId = extractItemId(over.id.toString());

      if (activeId !== overId) {
        setUserItems((prev) => {
          const oldIndex = prev.findIndex((item) => `${item.id}` === activeId);
          const newIndex = prev.findIndex((item) => `${item.id}` === overId);

          if (oldIndex !== -1 && newIndex !== -1) {
            // 配列内での位置を入れ替え
            const newItems = [...prev];
            const [movedItem] = newItems.splice(oldIndex, 1);
            newItems.splice(newIndex, 0, movedItem as QuickAccessItem);

            // 表示順序を更新
            const updatedOrders = updateItemDisplayOrders(newItems);

            // 非同期で順序を更新
            setPendingUpdate({
              type: 'reorder',
              data: updatedOrders,
            });

            return newItems;
          }
          return prev;
        });
      }
    }
    // 2. available-itemsからuser-itemsへの移動（追加）
    else if (
      activeSection === 'available-items' &&
      overSection === 'user-items'
    ) {
      const activeId = extractItemId(active.id.toString());
      const activeItem = availableItems.find(
        (item) => `${item.id}` === activeId
      );

      if (activeItem) {
        setPendingUpdate({
          type: 'add',
          data: activeItem.id,
        });
      }
    }
    // 3. user-itemsからavailable-itemsへの移動（削除）
    else if (
      activeSection === 'user-items' &&
      overSection === 'available-items'
    ) {
      const activeId = extractItemId(active.id.toString());
      const activeItem = userItems.find((item) => `${item.id}` === activeId);

      if (activeItem) {
        setPendingUpdate({
          type: 'remove',
          data: activeItem.id,
        });
      }
    }
  };

  // 変更を保存して編集モードを終了
  const handleSave = () => {
    onComplete(userItems);
  };

  // 視覚的なドラッグオーバーレイのコンテンツ
  const renderDragOverlay = () => {
    if (!activeItem.item) return null;

    const { title, icon, description, categoryId } = activeItem.item;
    const isUserItem = activeItem.section === 'user-items';

    return (
      <div
        className={`bg-white p-2 rounded-lg shadow-xl border-2 ${isUserItem ? 'border-blue-400' : 'border-green-400'} max-w-[200px] transform scale-105 rotate-1`}
      >
        <div className="flex items-center">
          <div
            className={`p-2 rounded-full ${getCategoryColor(categoryId)} mr-2`}
          >
            {getIconComponent(icon, 20)}
          </div>
          <div className="overflow-hidden">
            <div className="font-medium text-sm truncate">{title}</div>
            <div className="text-xs text-gray-500 truncate">{description}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <DroppableSection
          id="user-items"
          title="あなたのクイックアクセス"
          description="ドラッグ&ドロップで並べ替えまたは削除できます"
        >
          {userItems.length > 0 ? (
            <SortableContext
              items={userItems.map((item) => `user-items-${item.id}`)}
              strategy={rectSwappingStrategy}
            >
              {userItems.map((item) => (
                <SortableQuickAccessItem
                  key={`user-items-${item.id}`}
                  item={item}
                  section="user-items"
                />
              ))}
            </SortableContext>
          ) : (
            <div className="col-span-6 text-center py-8 text-gray-400">
              アイテムを下のセクションから追加してください
            </div>
          )}
        </DroppableSection>

        <DroppableSection
          id="available-items"
          title="追加可能なアイテム"
          description="ドラッグして上のセクションに追加できます"
          className="border-t pt-6"
        >
          {isLoading ? (
            <div className="col-span-6 text-center py-8 text-gray-400">
              読み込み中...
            </div>
          ) : availableItems.length > 0 ? (
            <SortableContext
              items={availableItems.map((item) => `available-items-${item.id}`)}
              strategy={rectSwappingStrategy}
            >
              {availableItems.map((item) => (
                <SortableQuickAccessItem
                  key={`available-items-${item.id}`}
                  item={item}
                  section="available-items"
                />
              ))}
            </SortableContext>
          ) : (
            <div className="col-span-6 text-center py-8 text-gray-400">
              追加可能なアイテムはありません
            </div>
          )}
        </DroppableSection>

        {/* ドラッグ中のアイテムのオーバーレイ表示 */}
        <DragOverlay>{activeItem.item && renderDragOverlay()}</DragOverlay>
      </DndContext>

      <div className="flex justify-end mt-8 pt-4 border-t">
        <Button
          variant="outline"
          onClick={() => onComplete(items)}
          className="mr-2"
        >
          キャンセル
        </Button>
        <Button onClick={handleSave}>保存</Button>
      </div>
    </div>
  );
}
