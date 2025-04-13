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
  useDraggable,
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
import { Plus, type LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface QuickAccessEditProps {
  items: QuickAccessItem[];
  onComplete: (items: QuickAccessItem[]) => void;
}

// ドラッグ＆ドロップで操作する際のデータ型
type DragItemData = {
  item: QuickAccessItem | AvailableQuickAccessItem;
  section: 'user-items' | 'available-items';
};

// 非同期更新用のデータ型
type PendingUpdateData =
  | { type: 'add'; data: string }
  | { type: 'remove'; data: string }
  | { type: 'reorder'; data: { id: string; displayOrder: number }[] };

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

    console.log('🔄 保留中の更新を処理:', pendingUpdate);

    const processPendingUpdate = async () => {
      try {
        switch (pendingUpdate.type) {
          case 'add': {
            console.log('✅ アイテム追加処理開始:', pendingUpdate.data);
            await addQuickAccessItem(pendingUpdate.data);
            const addResponse = await getUserQuickAccess();
            console.log('🔍 ユーザーアイテム取得結果:', addResponse);
            if (addResponse.success) {
              setUserItems(addResponse.items);
              console.log('✅ ユーザーアイテム更新完了');

              // 追加したアイテムを「追加可能なアイテム」から削除
              setAvailableItems((prev) =>
                prev.filter((item) => item.id !== pendingUpdate.data)
              );
              console.log('✅ 追加可能なアイテムから削除:', pendingUpdate.data);
            } else {
              console.log('❌ ユーザーアイテム取得失敗:', addResponse.error);
            }
            break;
          }
          case 'remove': {
            console.log('✅ アイテム削除処理開始:', pendingUpdate.data);
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
              console.log('✅ 削除後のアイテム:', newItems);

              // 削除したアイテムが存在し、削除操作が成功した場合
              if (removedItem && removeResult.success) {
                // 削除したアイテムを「追加可能なアイテム」リストに戻す
                setAvailableItems((prevAvailable) => {
                  // itemIdを使ってAvailableQuickAccessItemを作成
                  const itemToAdd: AvailableQuickAccessItem = {
                    id: removedItem.itemId,
                    title: removedItem.title,
                    description: removedItem.description,
                    icon: removedItem.icon,
                    href: removedItem.href,
                    categoryId: removedItem.categoryId,
                    isDefault: false,
                    isEnabled: true,
                    systemDisplayOrder: 0,
                    userSettingId: null,
                    isVisible: null,
                    userDisplayOrder: null,
                  };

                  // 既に存在していない場合のみ追加
                  const exists = prevAvailable.some(
                    (item) => item.id === itemToAdd.id
                  );
                  if (!exists) {
                    console.log(
                      '✅ 追加可能なアイテムに戻しました:',
                      itemToAdd
                    );
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
            console.log('✅ 順序更新処理開始:', pendingUpdate.data);
            const result = await updateQuickAccessOrder(pendingUpdate.data);
            console.log('🔍 順序更新結果:', result);
            break;
          }
        }
      } catch (error) {
        console.error('❌ 更新処理エラー:', error);
        toast.error('操作に失敗しました');
      } finally {
        setPendingUpdate(null);
        console.log('✅ 処理完了: pendingUpdateをクリア');
      }
    };

    processPendingUpdate();
  }, [pendingUpdate]);

  // ドラッグ開始時の処理を追加
  const handleDragStart = (event: any) => {
    console.log('🔍 handleDragStart イベント発生:', event);
    const { active } = event;

    if (!active || !active.data.current) return;

    const activeData = active.data.current as DragItemData;
    setActiveItem({
      item: activeData.item,
      section: activeData.section,
    });

    console.log('🔍 ドラッグ開始:', activeData);
  };

  // ドラッグ終了時の処理
  const handleDragEnd = (event: DragEndEvent) => {
    console.log('🔍 handleDragEnd イベント発生:', event);
    // ドラッグ終了時にactiveItemをリセット
    setActiveItem({ item: null, section: null });

    const { active, over } = event;
    if (!over) {
      console.log('❌ ドロップ先が見つかりません');
      return;
    }

    // アクティブアイテムのデータを取得
    console.log('🔍 アクティブアイテム ID:', active.id);
    console.log('🔍 アクティブアイテム データ:', active.data.current);
    console.log('🔍 ドロップ先 ID:', over.id);
    console.log('🔍 ドロップ先 データ:', over.data.current);

    const activeData = active.data.current as DragItemData;

    // ドラッグされたアイテムとドロップ先のセクションを特定
    const activeSection = activeData.section;

    // セクション識別子の取得方法を修正
    const overIdStr = over.id.toString();
    const overSection = overIdStr.startsWith('user-items')
      ? 'user-items'
      : overIdStr.startsWith('available-items')
        ? 'available-items'
        : overIdStr;

    console.log('🔍 アクティブセクション:', activeSection);
    console.log('🔍 ドロップ先セクション:', overSection);

    // IDプレフィックスを正確に削除する関数
    const extractItemId = (fullId: string): string => {
      // 既知のプレフィックスパターン
      const prefixes = ['user-items-', 'available-items-'];

      // いずれかのプレフィックスで始まる場合は削除
      for (const prefix of prefixes) {
        if (fullId.startsWith(prefix)) {
          return fullId.substring(prefix.length);
        }
      }

      // プレフィックスがない場合はそのまま返す
      return fullId;
    };

    // 1. 同じセクション内での並べ替え（user-items内）
    if (activeSection === 'user-items' && overSection === 'user-items') {
      console.log('✅ 同じセクション内での並べ替え処理を開始');
      // IDの抽出方法を修正
      const activeId = extractItemId(active.id.toString());
      const overId = extractItemId(over.id.toString());

      console.log('🔍 抽出したアクティブID:', activeId);
      console.log('🔍 抽出したドロップ先ID:', overId);

      if (activeId !== overId) {
        setUserItems((prev) => {
          console.log('🔍 現在のuserItems:', prev);
          const oldIndex = prev.findIndex((item) => `${item.id}` === activeId);
          const newIndex = prev.findIndex((item) => `${item.id}` === overId);
          console.log('🔍 移動元インデックス:', oldIndex);
          console.log('🔍 移動先インデックス:', newIndex);

          if (oldIndex !== -1 && newIndex !== -1) {
            // 配列内での位置を入れ替え
            const newItems = [...prev];
            const [movedItem] = newItems.splice(oldIndex, 1);
            console.log('🔍 移動するアイテム:', movedItem);
            newItems.splice(newIndex, 0, movedItem as QuickAccessItem);
            console.log('🔍 並べ替え後のアイテム:', newItems);

            // 表示順序を更新
            const updatedOrders = newItems.map((item, index) => ({
              id: item.id,
              displayOrder: index + 1,
            }));
            console.log('🔍 更新する表示順序:', updatedOrders);

            // 非同期で順序を更新
            setPendingUpdate({
              type: 'reorder',
              data: updatedOrders,
            });
            console.log('✅ 並べ替え更新をキュー:', {
              type: 'reorder',
              data: updatedOrders,
            });

            return newItems;
          }
          console.log('❌ インデックスが見つかりません');
          return prev;
        });
      } else {
        console.log('❌ 同じアイテムへのドロップ - 操作なし');
      }
    }
    // 2. available-itemsからuser-itemsへの移動（追加）
    else if (
      activeSection === 'available-items' &&
      overSection === 'user-items'
    ) {
      console.log('✅ 利用可能アイテムからユーザーアイテムへの追加処理');
      // IDの抽出方法を修正
      const activeId = extractItemId(active.id.toString());

      console.log('🔍 追加するアイテムID:', activeId);
      console.log('🔍 利用可能なアイテム一覧:', availableItems);
      const activeItem = availableItems.find(
        (item) => `${item.id}` === activeId
      );
      console.log('🔍 追加するアイテム:', activeItem);

      if (activeItem) {
        console.log('✅ アイテム追加をキュー:', {
          type: 'add',
          data: activeItem.id,
        });
        setPendingUpdate({
          type: 'add',
          data: activeItem.id,
        });
      } else {
        console.log('❌ 追加するアイテムが見つかりません');
      }
    }
    // 3. user-itemsからavailable-itemsへの移動（削除）
    else if (
      activeSection === 'user-items' &&
      overSection === 'available-items'
    ) {
      console.log('✅ ユーザーアイテムから削除処理');
      // IDの抽出方法を修正
      const activeId = extractItemId(active.id.toString());

      console.log('🔍 削除するアイテムID:', activeId);
      console.log('🔍 現在のユーザーアイテム:', userItems);
      const activeItem = userItems.find((item) => `${item.id}` === activeId);
      console.log('🔍 削除するアイテム:', activeItem);

      if (activeItem) {
        console.log('✅ アイテム削除をキュー:', {
          type: 'remove',
          data: activeItem.id,
        });
        setPendingUpdate({
          type: 'remove',
          data: activeItem.id,
        });
      } else {
        console.log('❌ 削除するアイテムが見つかりません');
      }
    } else {
      console.log('❌ 未対応の操作パターン:', { activeSection, overSection });
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

    // アイコン名から実際のコンポーネントを取得
    const getIconComponent = (iconName: string): React.ReactNode => {
      const IconType = iconName as keyof typeof LucideIcons;
      const Icon = LucideIcons[IconType] as LucideIcon;
      return Icon ? <Icon size={20} /> : <Plus size={20} />;
    };

    // カテゴリIDに基づいた色クラスを取得
    const getCategoryColor = (categoryId: string): string => {
      const colorMap: Record<string, string> = {
        sales: 'bg-blue-100 text-blue-600',
        design: 'bg-purple-100 text-purple-600',
        production: 'bg-green-100 text-green-600',
        shipping: 'bg-amber-100 text-amber-600',
        admin: 'bg-gray-200 text-gray-700',
      };

      return colorMap[categoryId] || 'bg-gray-100 text-gray-600';
    };

    return (
      <div
        className={`bg-white p-2 rounded-lg shadow-xl border-2 ${isUserItem ? 'border-blue-400' : 'border-green-400'} max-w-[200px] transform scale-105 rotate-1`}
      >
        <div className="flex items-center">
          <div
            className={`p-2 rounded-full ${getCategoryColor(categoryId)} mr-2`}
          >
            {getIconComponent(icon)}
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
