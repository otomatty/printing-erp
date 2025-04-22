'use client';

import React, { useState, useEffect } from 'react';
import {
  DndContext,
  type DragStartEvent,
  type DragEndEvent,
  type DragCancelEvent,
  DragOverlay,
  closestCenter,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  useDroppable,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useSetAtom } from 'jotai';
import { updateInquiryStatusAtom } from '~/store/inquiries';
import type { Inquiry, InquiryStatus } from '~/types/inquiries';

interface KanbanColumn {
  id: string;
  title: string;
  inquiries: Inquiry[];
}

interface InquiriesKanbanProps {
  columns: KanbanColumn[];
}

export function InquiriesKanban({ columns }: InquiriesKanbanProps) {
  // Kanban のカード順序をローカル state で管理
  const [containers, setContainers] = useState<Record<string, Inquiry[]>>(
    () => {
      const map: Record<string, Inquiry[]> = {};
      for (const col of columns) {
        map[col.id] = [...col.inquiries];
      }
      return map;
    }
  );
  // columns prop が変わったら再初期化 (optional)
  useEffect(() => {
    const map: Record<string, Inquiry[]> = {};
    for (const col of columns) {
      map[col.id] = [...col.inquiries];
    }
    setContainers(map);
  }, [columns]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    })
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const setUpdateStatus = useSetAtom(updateInquiryStatusAtom);

  // ドラッグ開始で activeId をセット
  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id as string);
  };
  // ドラッグキャンセルで activeId をクリア
  const handleDragCancel = (_: DragCancelEvent) => {
    setActiveId(null);
  };
  // ドラッグ終了でローカル順序更新＋サーバー更新＆ activeIdクリア
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      setActiveId(null);
      return;
    }
    const id = active.id as string;
    const overId = over.id as string;
    // Determine drop target: column or card
    const isColumn = containers[overId] !== undefined;
    const toStatus = isColumn
      ? (overId as InquiryStatus)
      : (Object.keys(containers).find((key) =>
          containers[key]?.some((inq) => inq.id === overId)
        ) as InquiryStatus | undefined);
    if (!toStatus) {
      setActiveId(null);
      return;
    }
    // find source status
    const fromStatus = Object.keys(containers).find((key) =>
      containers[key]?.some((inq) => inq.id === id)
    ) as InquiryStatus | undefined;
    if (!fromStatus || fromStatus === toStatus) {
      setActiveId(null);
      return;
    }
    // optimistic UI update: reorder containers
    const prev = { ...containers };
    const moving = prev[fromStatus]?.find((inq) => inq.id === id);
    if (!moving) {
      setActiveId(null);
      return;
    }
    const nextFrom = prev[fromStatus]?.filter((inq) => inq.id !== id);
    const nextTo = [moving, ...(prev[toStatus] ?? [])];
    setContainers({
      ...prev,
      [fromStatus]: nextFrom ?? [],
      [toStatus]: nextTo ?? [],
    });
    // backend status update
    setUpdateStatus({ id, newStatus: toStatus });
    setActiveId(null);
  };

  const activeInquiry =
    Object.values(containers)
      .flat()
      .find((inq) => inq.id === activeId) ?? null;
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex gap-4 overflow-auto">
        {columns.map((col) => (
          <ColumnDroppable
            key={col.id}
            id={col.id}
            title={col.title}
            inquiries={containers[col.id] || []}
          />
        ))}
      </div>
      {/* ドラッグ中にアイテムをオーバーレイ表示 */}
      <DragOverlay>
        {activeInquiry ? <SortableItem inquiry={activeInquiry} /> : null}
      </DragOverlay>
    </DndContext>
  );
}

// ドロップ領域を定義するカラムコンポーネント
function ColumnDroppable({
  id,
  title,
  inquiries,
}: {
  id: string;
  title: string;
  inquiries: Inquiry[];
}) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className="w-64 bg-gray-100 p-2 rounded">
      <h2 className="text-sm font-bold mb-2">{title}</h2>
      <SortableContext
        items={inquiries.map((inq) => inq.id)}
        strategy={verticalListSortingStrategy}
      >
        {inquiries.map((inq) => (
          <SortableItem key={inq.id} inquiry={inq} />
        ))}
      </SortableContext>
    </div>
  );
}

// ソート・ドラッグ可能なカードアイテム
function SortableItem({ inquiry }: { inquiry: Inquiry }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: inquiry.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white p-2 mb-2 rounded shadow ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <p className="text-sm font-medium">{inquiry.id.slice(0, 8)}</p>
      {inquiry.customer_name && (
        <p className="text-xs text-gray-700">{inquiry.customer_name}</p>
      )}
      <p className="text-xs text-gray-500">
        {new Date(inquiry.created_at).toLocaleDateString('ja-JP')}
      </p>
    </div>
  );
}
