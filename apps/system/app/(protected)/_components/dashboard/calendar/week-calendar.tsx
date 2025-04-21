'use client';
import React, { useState, useEffect } from 'react';
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
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);
  const currentDateKey = currentTime.toISOString().split('T')[0];
  const currentPosition =
    (currentTime.getHours() + currentTime.getMinutes() / 60) * HOUR_HEIGHT;
  return (
    <div className="grid grid-cols-[4rem_repeat(7,1fr)] divide-x h-full">
      {/* time column */}
      <div className="flex flex-col h-full">
        {Array.from({ length: 24 }, (_, hour) => {
          const timeLabel = `${String(hour).padStart(2, '0')}:00`;
          return (
            <div
              key={timeLabel}
              className="first:mt-8 text-xs text-right text-gray-500 pr-2"
              style={{ height: `${HOUR_HEIGHT}px` }}
            >
              {timeLabel}
            </div>
          );
        })}
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
                {Array.from({ length: 24 }, (_, hour) => {
                  const isBusinessDay = weekday >= 1 && weekday <= 6; // Mon=1, Sat=6
                  const isBusinessHour =
                    isBusinessDay && hour >= 9 && hour < 18;
                  return (
                    <div
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
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
                {/* 現在時刻を示す赤線 */}
                {key === currentDateKey && (
                  <div
                    className="absolute left-0 w-full h-[2px] bg-red-500 z-10"
                    style={{ top: `${currentPosition}px` }}
                  />
                )}
              </div>
            </div>
          );
        });
      })()}
    </div>
  );
}
