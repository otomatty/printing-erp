'use client';
/**
 * ダッシュボード - スケジュールカレンダーコンポーネント
 * 週間カレンダーを表示
 */
import React, { useState } from 'react';
import type { RawEvent, CalendarEvent } from '~/types/calendar';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@kit/ui/select';
import DayCalendar from './day-calendar';
import WeekCalendar from './week-calendar';
import MonthCalendar from './month-calendar';
import EventEditorModal from './event-editor-modal';
import { CheckIcon } from 'lucide-react';

// カレンダーのデイセルを一意に識別するID生成のためのヘルパー関数
const generateDayCellId = (dayIndex: number) => `day-cell-${dayIndex}`;

interface DashboardCalendarProps {
  companyData: RawEvent[];
  personalData: RawEvent[];
  isLinked: boolean;
}

export default function DashboardCalendar({
  companyData,
  personalData,
  isLinked,
}: DashboardCalendarProps) {
  const [view, setView] = useState<'company' | 'personal'>('company');
  const [calendarMode, setCalendarMode] = useState<'day' | 'week' | 'month'>(
    'week'
  );
  const calendarData = view === 'company' ? companyData : personalData;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | undefined>(
    undefined
  );
  const [selectedDateKey, setSelectedDateKey] = useState<string | undefined>(
    undefined
  );

  // Mapでイベントを日付キー(YYYY-MM-DD)ごとにグループ化
  const dayEventsMap = new Map<string, CalendarEvent[]>();
  for (const ev of calendarData) {
    const startDate = ev.start?.dateTime;
    if (typeof startDate !== 'string') continue;
    const dateKey: string = startDate.substring(0, 10);
    const startTime: string = startDate.slice(11, 16);
    const endDate = ev.end?.dateTime;
    const endTime: string =
      typeof endDate === 'string' ? endDate.slice(11, 16) : '';
    const item: CalendarEvent = {
      id: ev.id ?? '',
      title: ev.summary ?? '',
      time: `${startTime} - ${endTime}`,
      colorClass: 'bg-blue-100 border-blue-500',
    };
    const existing = dayEventsMap.get(dateKey);
    if (existing) {
      existing.push(item);
    } else {
      dayEventsMap.set(dateKey, [item]);
    }
  }

  // Google OAuth2 認証 URL を取得してリダイレクト
  const handleGoogleAuth = async () => {
    try {
      const res = await fetch('/api/auth/google/url');
      if (!res.ok) throw new Error('認証URL取得失敗');
      const { url } = await res.json();
      window.location.href = url;
    } catch (error) {
      console.error(error);
      alert('Google同期の設定に失敗しました');
    }
  };

  // イベントクリック時
  const handleEventClick = (ev: CalendarEvent, dateKey: string) => {
    setSelectedEvent(ev);
    setSelectedDateKey(dateKey);
    setModalMode('edit');
    setModalOpen(true);
  };

  // 日セルクリック時（新規作成）
  const handleCellClick = (dateKey: string) => {
    setSelectedEvent(undefined);
    setSelectedDateKey(dateKey);
    setModalMode('create');
    setModalOpen(true);
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">スケジュールカレンダー</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        {/* カレンダー切り替えと同期 */}
        <div className="flex mb-4 items-center justify-between">
          <div className="flex space-x-2">
            <Select
              value={view}
              onValueChange={(value) =>
                setView(value as 'company' | 'personal')
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="カレンダー" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="company">会社カレンダー</SelectItem>
                <SelectItem value="personal">自分のカレンダー</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex space-x-2">
            <div>
              {/* カレンダーモード切替 */}
              <Select
                value={calendarMode}
                onValueChange={(value) =>
                  setCalendarMode(value as 'day' | 'week' | 'month')
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="カレンダーモード" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">日</SelectItem>
                  <SelectItem value="week">週</SelectItem>
                  <SelectItem value="month">月</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {isLinked ? (
              <button
                type="button"
                disabled
                className="px-4 py-1 rounded-md text-sm bg-green-500 text-white cursor-not-allowed flex items-center"
              >
                <CheckIcon className="mr-1" />
                同期済み
              </button>
            ) : (
              <button
                type="button"
                onClick={handleGoogleAuth}
                className="px-4 py-2 rounded-md text-sm text-gray-500 hover:bg-gray-100"
              >
                Google同期
              </button>
            )}
          </div>
        </div>

        {/* カレンダー表示エリア */}
        {calendarMode === 'day' && (
          <DayCalendar
            dayEventsMap={dayEventsMap}
            onEventClick={handleEventClick}
            onCellClick={handleCellClick}
          />
        )}
        {calendarMode === 'week' && (
          <WeekCalendar
            dayEventsMap={dayEventsMap}
            onEventClick={handleEventClick}
            onCellClick={handleCellClick}
          />
        )}
        {calendarMode === 'month' && (
          <MonthCalendar
            dayEventsMap={dayEventsMap}
            onEventClick={handleEventClick}
            onCellClick={handleCellClick}
          />
        )}

        <EventEditorModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          event={selectedEvent}
          dateKey={selectedDateKey}
          calendarType={view}
          mode={modalMode}
        />

        <div className="flex justify-end mt-4">
          <a href="/schedules" className="text-sm text-primary hover:underline">
            詳細スケジュールを見る →
          </a>
        </div>
      </div>
    </div>
  );
}
