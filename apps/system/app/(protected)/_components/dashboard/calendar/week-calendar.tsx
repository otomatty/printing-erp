'use client';
import React from 'react';
import type { CalendarEvent } from '~/types/calendar';

interface WeekCalendarProps {
  dayEventsMap: Map<string, CalendarEvent[]>;
  onEventClick?: (event: CalendarEvent, dateKey: string) => void;
  onCellClick?: (dateKey: string) => void;
}

export default function WeekCalendar({
  dayEventsMap,
  onEventClick,
  onCellClick,
}: WeekCalendarProps) {
  const HOUR_HEIGHT = 60; // px per hour
  return (
    <div className="grid grid-cols-[4rem_repeat(7,1fr)] divide-x border overflow-x-auto">
      {/* time column */}
      <div className="flex flex-col">
        <div className="font-medium m-2 text-center">時間</div>
        {Array.from({ length: 24 }, (_, hour) => hour).map((hour) => (
          <div
            key={`time-${hour}`}
            className="border-gray-200 text-xs text-right text-gray-500 pr-2"
            style={{ height: `${HOUR_HEIGHT}px` }}
          >
            {`${String(hour).padStart(2, '0')}:00`}
          </div>
        ))}
      </div>
      {(() => {
        const today = new Date();
        const start = new Date(today);
        start.setDate(today.getDate() - today.getDay());
        return Array.from({ length: 7 }).map((_, j) => {
          const date = new Date(start);
          date.setDate(start.getDate() + j);
          const key = date.toISOString().split('T')[0] || '';
          const weekday = date.getDay();
          const label = date.toLocaleDateString('ja-JP', {
            month: 'numeric',
            day: 'numeric',
            weekday: 'short',
          });
          const items = dayEventsMap.get(key) ?? [];
          const labelColor =
            weekday === 0
              ? 'text-red-500'
              : weekday === 6
                ? 'text-blue-500'
                : '';
          return (
            <div
              key={key}
              className="flex flex-col cursor-pointer"
              onClick={() => onCellClick?.(key)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onCellClick?.(key);
                }
              }}
            >
              <div className={`font-medium m-2 text-center ${labelColor}`}>
                {label}
              </div>
              <div
                className="relative flex-1"
                style={{ height: `${24 * HOUR_HEIGHT}px` }}
              >
                {/* Timeline grid with business/outside hour background */}
                {Array.from({ length: 24 }, (_, hour) => {
                  const isBusinessDay = weekday >= 1 && weekday <= 6; // Mon=1, Sat=6
                  const isBusinessHour =
                    isBusinessDay && hour >= 9 && hour < 18;
                  return (
                    <div
                      key={`grid-${hour}`}
                      className={`absolute left-0 w-full border-t border-gray-200 ${
                        isBusinessHour ? 'bg-white' : 'bg-gray-50'
                      }`}
                      style={{
                        top: `${hour * HOUR_HEIGHT}px`,
                        height: `${HOUR_HEIGHT}px`,
                      }}
                    />
                  );
                })}
                {/* Events */}
                {items.map((ev) => {
                  const [startTime = '00:00', endTime = '00:00'] =
                    ev.time.split(' - ');
                  const [sH = 0, sM = 0] = startTime.split(':').map(Number);
                  const [eH = 0, eM = 0] = endTime.split(':').map(Number);
                  const top = (sH + sM / 60) * HOUR_HEIGHT;
                  const height = (eH + eM / 60 - (sH + sM / 60)) * HOUR_HEIGHT;
                  return (
                    <button
                      type="button"
                      key={ev.id}
                      className={`${ev.colorClass} absolute left-0 w-full p-1 text-xs border-l-4 overflow-hidden cursor-pointer`}
                      style={{ top: `${top}px`, height: `${height}px` }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick?.(ev, key);
                      }}
                    >
                      <div className="font-medium truncate">{ev.title}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        });
      })()}
    </div>
  );
}
