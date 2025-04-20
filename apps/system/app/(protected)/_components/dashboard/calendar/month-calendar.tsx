'use client';
import React from 'react';
import type { CalendarEvent } from '~/types/calendar';

interface MonthCalendarProps {
  dayEventsMap: Map<string, CalendarEvent[]>;
  onEventClick?: (event: CalendarEvent, dateKey: string) => void;
  onCellClick?: (dateKey: string) => void;
}

export default function MonthCalendar({
  dayEventsMap,
  onEventClick,
  onCellClick,
}: MonthCalendarProps) {
  return (
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
              const blankKey = blankDate.toISOString().substring(0, 10);
              return <div key={blankKey} className="h-24 border bg-gray-50" />;
            }
            const date = new Date(y, m, dayNo);
            const key = date.toISOString().slice(0, 10);
            const items = dayEventsMap.get(key) ?? [];
            return (
              <div
                key={key}
                className="h-24 border p-1 overflow-y-auto bg-gray-50 cursor-pointer"
                onClick={() => onCellClick?.(key)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onCellClick?.(key);
                  }
                }}
              >
                <div className="text-xs font-medium mb-1">{dayNo}</div>
                {items.slice(0, 3).map((ev) => (
                  <button
                    type="button"
                    key={ev.id}
                    className={`${ev.colorClass} p-1 rounded mb-1 text-xs border-l-4 cursor-pointer`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick?.(ev, key);
                    }}
                  >
                    <div className="font-medium">{ev.title}</div>
                  </button>
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
  );
}
