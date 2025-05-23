'use client';
import React, { useState, useEffect } from 'react';
import type { CalendarEvent } from '~/types/calendar';

interface DayCalendarProps {
  dayEventsMap: Map<string, CalendarEvent[]>;
  onEventClick?: (event: CalendarEvent, dateKey: string) => void;
  onCellClick?: (dateKey: string) => void;
}

export default function DayCalendar({
  dayEventsMap,
  onEventClick,
  onCellClick,
}: DayCalendarProps) {
  const HOUR_HEIGHT = 60; // px per hour
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);
  const currentDateKey = currentTime.toISOString().split('T')[0];
  const currentPosition =
    (currentTime.getHours() + currentTime.getMinutes() / 60) * HOUR_HEIGHT;
  return (
    <div className="grid grid-cols-4 divide-x h-full">
      {/* time column */}
      <div className="flex flex-col h-full">
        <div className="sticky top-0 bg-white z-20 p-2 text-center font-medium">
          時間
        </div>
        {Array.from({ length: 24 }, (_, hour) => (
          <div
            key={`${String(hour).padStart(2, '0')}:00`}
            className="first:mt-8 text-xs text-gray-500 pl-1"
            style={{ height: `${HOUR_HEIGHT}px` }}
          >
            {`${String(hour).padStart(2, '0')}:00`}
          </div>
        ))}
      </div>
      {Array.from({ length: 3 }).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        const key = date.toISOString().split('T')[0] || '';
        const weekday = date.getDay();
        const label = date.toLocaleDateString('ja-JP', {
          month: 'numeric',
          day: 'numeric',
          weekday: 'short',
        });
        const items = dayEventsMap.get(key) ?? [];
        const labelColor =
          weekday === 0 ? 'text-red-500' : weekday === 6 ? 'text-blue-500' : '';
        return (
          <div
            key={key}
            className="flex flex-col cursor-pointer h-full"
            onClick={() => onCellClick?.(key)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onCellClick?.(key);
              }
            }}
          >
            <div
              className={`sticky top-0 bg-white z-20 p-2 text-center font-medium ${labelColor}`}
            >
              {label}
            </div>
            <div
              className="relative flex-1"
              style={{ height: `${24 * HOUR_HEIGHT}px` }}
            >
              {/* Timeline grid with business/outside hour background */}
              {Array.from({ length: 24 }, (_, h) => h).map((hour) => {
                const isBusinessDay = weekday !== 0; // Sun=0
                const isBusinessHour = isBusinessDay && hour >= 9 && hour < 18;
                return (
                  <div
                    key={`grid-${hour}`}
                    className={`absolute left-0 w-full border-t border-gray-200 ${
                      isBusinessHour ? 'bg-white' : 'bg-gray-50'
                    }`}
                    style={{
                      top: `${HOUR_HEIGHT * hour}px`,
                      height: `${HOUR_HEIGHT}px`,
                    }}
                  />
                );
              })}
              {/* Events */}
              {items.map((ev) => {
                const [rawStart = '00:00', rawEnd = '00:00'] =
                  ev.time.split(' - ');
                const startParts = rawStart.split(':').map(Number);
                const endParts = rawEnd.split(':').map(Number);
                const sH = startParts[0] ?? 0;
                const sM = startParts[1] ?? 0;
                const eH = endParts[0] ?? 0;
                const eM = endParts[1] ?? 0;
                const top = (sH + sM / 60) * HOUR_HEIGHT;
                const height = (eH + eM / 60 - (sH + sM / 60)) * HOUR_HEIGHT;
                return (
                  <button
                    key={ev.id}
                    type="button"
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
              {/* 現在時刻を示す赤いライン */}
              {key === currentDateKey && (
                <div
                  className="absolute left-0 w-full h-[2px] bg-red-500 z-10"
                  style={{ top: `${currentPosition}px` }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
