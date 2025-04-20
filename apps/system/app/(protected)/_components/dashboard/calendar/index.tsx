'use client';
/**
 * ダッシュボード - スケジュールカレンダーコンポーネント
 * 週間カレンダーを表示
 */
import React, { useState } from 'react';
import type { RawEvent, CalendarEvent } from '~/types/calendar';

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

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">スケジュールカレンダー</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        {/* カレンダー切り替えと同期 */}
        <div className="flex mb-4 items-center justify-between">
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setView('company')}
              className={`px-4 py-2 rounded-md text-sm ${view === 'company' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              会社カレンダー
            </button>
            <button
              type="button"
              onClick={() => setView('personal')}
              className={`px-4 py-2 rounded-md text-sm ${view === 'personal' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              自分のカレンダー
            </button>
          </div>
          {isLinked ? (
            <button
              type="button"
              disabled
              className="px-4 py-2 rounded-md text-sm text-gray-500 bg-gray-100 cursor-not-allowed"
            >
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
        {/* カレンダーモード切替 */}
        <div className="flex mb-4 space-x-2">
          <button
            type="button"
            onClick={() => setCalendarMode('day')}
            className={`px-4 py-2 rounded-md text-sm ${calendarMode === 'day' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            日
          </button>
          <button
            type="button"
            onClick={() => setCalendarMode('week')}
            className={`px-4 py-2 rounded-md text-sm ${calendarMode === 'week' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            週
          </button>
          <button
            type="button"
            onClick={() => setCalendarMode('month')}
            className={`px-4 py-2 rounded-md text-sm ${calendarMode === 'month' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            月
          </button>
        </div>

        {/* カレンダー表示エリア */}
        {calendarMode === 'day' && (
          <div>
            {Array.from({ length: 3 }).map((_, i) => {
              const date = new Date();
              date.setDate(date.getDate() + i);
              const key = date.toISOString().split('T')[0];
              const label = date.toLocaleDateString('ja-JP', {
                month: 'numeric',
                day: 'numeric',
                weekday: 'short',
              });
              const items = dayEventsMap.get(key as string) ?? [];
              return (
                <div key={key} className="mb-4">
                  <div className="font-medium mb-2">{label}</div>
                  {items.length > 0 ? (
                    items.map((ev: CalendarEvent) => (
                      <div
                        key={ev.id}
                        className={`${ev.colorClass} p-2 rounded mb-2 text-xs border-l-4`}
                      >
                        <div className="font-medium">{ev.title}</div>
                        <div className="text-gray-500">{ev.time}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 text-xs">イベントなし</div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        {calendarMode === 'week' && (
          <div className="flex flex-col space-y-4">
            {(() => {
              const today = new Date();
              const start = new Date(today);
              start.setDate(today.getDate() - today.getDay());
              return Array.from({ length: 7 }).map((_, j) => {
                const date = new Date(start);
                date.setDate(start.getDate() + j);
                const key = date.toISOString().split('T')[0];
                const label = date.toLocaleDateString('ja-JP', {
                  month: 'numeric',
                  day: 'numeric',
                  weekday: 'short',
                });
                const items = dayEventsMap.get(key as string) ?? [];
                return (
                  <div key={key}>
                    <div className="font-medium mb-1">{label}</div>
                    {items.length > 0 ? (
                      items.map((ev: CalendarEvent) => (
                        <div
                          key={ev.id}
                          className={`${ev.colorClass} p-2 rounded mb-2 text-xs border-l-4`}
                        >
                          <div className="font-medium">{ev.title}</div>
                          <div className="text-gray-500">{ev.time}</div>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500 text-xs">イベントなし</div>
                    )}
                  </div>
                );
              });
            })()}
          </div>
        )}
        {calendarMode === 'month' && (
          <div className="w-full overflow-x-auto">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['日', '月', '火', '水', '木', '金', '土'].map((d) => (
                <div key={d} className="text-center p-2 font-medium">
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-sm">
              {(() => {
                const now = new Date();
                const y = now.getFullYear();
                const m = now.getMonth();
                const first = new Date(y, m, 1);
                const last = new Date(y, m + 1, 0);
                const days = last.getDate();
                const offset = first.getDay();
                const total = Math.ceil((offset + days) / 7) * 7;
                return Array.from({ length: total }).map((_, k) => {
                  const dayNo = k - offset + 1;
                  if (k < offset || dayNo > days) {
                    const blankDate = new Date(y, m, k - offset + 1);
                    const blankKey: string = blankDate
                      .toISOString()
                      .substring(0, 10);
                    return (
                      <div key={blankKey} className="h-24 border bg-gray-50" />
                    );
                  }
                  const date = new Date(y, m, dayNo);
                  const key = date.toISOString().split('T')[0];
                  const items = dayEventsMap.get(key as string) ?? [];
                  return (
                    <div
                      key={key}
                      className="h-24 border p-1 overflow-y-auto bg-gray-50"
                    >
                      <div className="text-xs font-medium mb-1">{dayNo}</div>
                      {items.slice(0, 3).map((ev: CalendarEvent) => (
                        <div
                          key={ev.id}
                          className={`${ev.colorClass} p-1 rounded mb-1 text-xs border-l-4`}
                        >
                          <div className="font-medium">{ev.title}</div>
                        </div>
                      ))}
                      {items.length > 3 && (
                        <div className="text-gray-500 text-xs">
                          ...他{items.length - 3}件
                        </div>
                      )}
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        )}

        <div className="flex justify-end mt-4">
          <a href="/schedules" className="text-sm text-primary hover:underline">
            詳細スケジュールを見る →
          </a>
        </div>
      </div>
    </div>
  );
}
