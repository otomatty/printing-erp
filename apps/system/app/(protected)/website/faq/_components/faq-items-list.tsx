'use client';

import { useState, useEffect, useTransition } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import { GripVertical, Edit, MoreVertical, Trash } from 'lucide-react';
import type { FaqItem } from '~/types/faq';
import { updateFaqItem, deleteFaqItem } from '~/actions/faq';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@kit/ui/dropdown-menu';
import { Button } from '@kit/ui/button';
import { ResponsiveDialog } from '@kit/ui/responsive-dialog';
import FaqForm from './faq-form';
import { FaqItemDeleteDialog } from './faq-item-delete-dialog';
import JSXParser from 'react-jsx-parser';

interface FaqItemsListProps {
  faqItems: FaqItem[];
}

interface SortableItemProps {
  item: FaqItem;
}

function SortableItem({ item }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="mb-4 relative">
        {/* drag handle inside card, centered vertically */}
        <div
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 cursor-grab text-muted-foreground"
        >
          <GripVertical className="h-5 w-5" />
          <span className="sr-only">並べ替え</span>
        </div>
        {/* existing CardHeader, dropdown, and CardContent */}
        <CardHeader className="pr-10 pl-10">
          <CardTitle>{item.question}</CardTitle>
          {/* dropdown menu */}
          <div className="absolute top-2 right-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">メニューを開く</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <ResponsiveDialog
                    trigger={
                      <button
                        className="flex items-center w-full"
                        type="button"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        編集
                      </button>
                    }
                    title="FAQ項目編集"
                    description="FAQ項目を編集します"
                  >
                    <FaqForm pageId={item.page_id} defaultValues={item} />
                  </ResponsiveDialog>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <FaqItemDeleteDialog itemId={item.id}>
                    <button
                      className="flex items-center w-full text-destructive"
                      type="button"
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      削除
                    </button>
                  </FaqItemDeleteDialog>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="prose max-w-none pl-10">
          <JSXParser
            jsx={item.answer}
            components={{}}
            renderInWrapper={false}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default function FaqItemsList({ faqItems }: FaqItemsListProps) {
  const [items, setItems] = useState<string[]>([]);
  const [data, setData] = useState<FaqItem[]>([]);
  const [isPending, startTransition] = useTransition();

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    setItems(faqItems.map((i) => i.id));
    setData(faqItems);
  }, [faqItems]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.indexOf(active.id as string);
      const newIndex = items.indexOf(over?.id as string);
      const newItems = arrayMove(items, oldIndex, newIndex);
      const newData = newItems.map((id) => {
        const item = data.find((i) => i.id === id);
        if (!item) {
          throw new Error(`FAQ item not found for id ${id}`);
        }
        return item;
      });
      setItems(newItems);
      setData(newData);

      startTransition(async () => {
        try {
          await Promise.all(
            newData.map((i, idx) =>
              updateFaqItem(i.id, {
                page_id: i.page_id,
                question: i.question,
                answer: i.answer,
                sort_order: idx,
                is_active: i.is_active,
              })
            )
          );
          toast.success('並び替えを保存しました');
        } catch (error) {
          console.error('Error reordering FAQ items:', error);
          toast.error('並び替えの保存に失敗しました');
        }
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {data.map((item) => (
          <SortableItem key={item.id} item={item} />
        ))}
      </SortableContext>
    </DndContext>
  );
}
