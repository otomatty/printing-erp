'use client';
import React, { useState, useTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { CalendarEvent } from '~/types/calendar';
import { Label } from '@kit/ui/label';
import { Input } from '@kit/ui/input';
import { Button } from '@kit/ui/button';
import { ResponsiveDialog } from '@kit/ui/responsive-dialog';
import {
  createCompanyEvent,
  updateCompanyEvent,
  deleteCompanyEvent,
  createUserEvent,
  updateUserEvent,
  deleteUserEvent,
} from '~/_actions/schedules';

interface EventEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: CalendarEvent;
  dateKey?: string;
  calendarType: 'company' | 'personal';
  mode: 'create' | 'edit';
}

export default function EventEditorModal({
  isOpen,
  onClose,
  event,
  dateKey,
  calendarType,
  mode,
}: EventEditorModalProps) {
  const router = useRouter();
  const [title, setTitle] = useState(event?.title || '');
  const [date, setDate] = useState<string>(
    dateKey || new Date().toISOString().split('T')[0] || ''
  );
  const [startTime, setStartTime] = useState(event?.time.split(' - ')[0] || '');
  const [endTime, setEndTime] = useState(event?.time.split(' - ')[1] || '');
  const [isPending, startTransition] = useTransition();

  // Reset form when modal opens/closes or selection changes
  useEffect(() => {
    setTitle(event?.title || '');
    setDate(dateKey || new Date().toISOString().split('T')[0] || '');
    setStartTime(event?.time.split(' - ')[0] || '');
    setEndTime(event?.time.split(' - ')[1] || '');
  }, [event, dateKey]);

  const handleSave = () => {
    if (!title || !date || !startTime || !endTime) return;
    const startDateTime = `${date}T${startTime}:00`;
    const endDateTime = `${date}T${endTime}:00`;
    startTransition(async () => {
      try {
        if (calendarType === 'company') {
          if (mode === 'edit' && event?.id) {
            await updateCompanyEvent(event.id, {
              summary: title,
              startDateTime,
              endDateTime,
            });
          } else {
            await createCompanyEvent(title, startDateTime, endDateTime);
          }
        } else {
          if (mode === 'edit' && event?.id) {
            await updateUserEvent(event.id, {
              summary: title,
              startDateTime,
              endDateTime,
            });
          } else {
            await createUserEvent(title, startDateTime, endDateTime);
          }
        }
        router.refresh();
        onClose();
      } catch (err) {
        console.error(err);
        alert('イベントの保存に失敗しました');
      }
    });
  };

  const handleDelete = () => {
    if (mode === 'edit' && event?.id) {
      startTransition(async () => {
        try {
          if (calendarType === 'company') {
            await deleteCompanyEvent(event.id);
          } else {
            await deleteUserEvent(event.id);
          }
          router.refresh();
          onClose();
        } catch (err) {
          console.error(err);
          alert('イベントの削除に失敗しました');
        }
      });
    }
  };

  // Use ResponsiveDialog controlled via isOpen/onClose
  return (
    <ResponsiveDialog
      trigger={null}
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      title={mode === 'edit' ? 'イベント編集' : '新規イベント作成'}
      contentClassName="p-6 w-96"
    >
      <div className="space-y-3">
        <div>
          <Label className="block text-sm font-medium">タイトル</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <Label className="block text-sm font-medium">日付</Label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full border rounded px-2 py-1"
          />
        </div>
        <div className="flex space-x-2">
          <div className="flex-1">
            <Label className="block text-sm font-medium">開始時間</Label>
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="mt-1 w-full border rounded px-2 py-1"
            />
          </div>
          <div className="flex-1">
            <Label className="block text-sm font-medium">終了時間</Label>
            <Input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="mt-1 w-full border rounded px-2 py-1"
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-2">
        {mode === 'edit' && (
          <Button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            disabled={isPending}
          >
            削除
          </Button>
        )}
        <Button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded hover:bg-gray-100"
          disabled={isPending}
        >
          キャンセル
        </Button>
        <Button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          disabled={isPending}
        >
          保存
        </Button>
      </div>
    </ResponsiveDialog>
  );
}
