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
import type { FaqItem } from '~/types/faq';
import { updateFaqItem } from '~/actions/faq';
import { toast } from 'sonner';

interface FaqItemsListProps {
  faqItems: FaqItem[];
}

interface SortableItemProps {
  item: FaqItem;
}

function SortableItem({ item }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>{item.question}</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">{item.answer}</CardContent>
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
