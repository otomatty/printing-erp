'use client';

import * as React from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
} from 'date-fns';
import type { Inquiry } from '~/types/inquiries';

/**
 * カレンダー形式でお問い合わせを表示するコンポーネント（プロトタイプ）
 */
export function InquiriesCalendar({
  inquiries,
}: {
  inquiries: Inquiry[];
}) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const prevMonth = () => {
    const date = new Date(currentMonth);
    date.setMonth(date.getMonth() - 1);
    setCurrentMonth(date);
  };

  const nextMonth = () => {
    const date = new Date(currentMonth);
    date.setMonth(date.getMonth() + 1);
    setCurrentMonth(date);
  };

  // カレンダーの日付データを生成
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const calendar: Date[][] = [];
  let date = startDate;
  while (date <= endDate) {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(date);
      date = addDays(date, 1);
    }
    calendar.push(week);
  }

  // 問い合わせを日付でグループ化
  const enquiriesByDate: Record<string, Inquiry[]> = {};
  for (const inq of inquiries) {
    const key = format(new Date(inq.created_at), 'yyyy-MM-dd');
    if (!enquiriesByDate[key]) enquiriesByDate[key] = [];
    enquiriesByDate[key].push(inq);
  }

  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <button type="button" onClick={prevMonth} className="px-2">
          ◀
        </button>
        <h3 className="text-lg font-bold">
          {format(currentMonth, 'yyyy年MM月')}
        </h3>
        <button type="button" onClick={nextMonth} className="px-2">
          ▶
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {weekdays.map((day) => (
              <th key={day} className="border p-1 text-center text-sm">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendar.map((week) => {
            const weekKey = format(week[0] as Date, 'yyyy-MM-dd');
            return (
              <tr key={weekKey}>
                {week.map((day) => {
                  const key = format(day, 'yyyy-MM-dd');
                  const items = enquiriesByDate[key] || [];
                  return (
                    <td
                      key={key}
                      className={`border align-top p-1 h-24 ${
                        isSameMonth(day, monthStart)
                          ? ''
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      <div className="text-xs mb-1 text-right">
                        {format(day, 'd')}
                      </div>
                      <div className="space-y-1 overflow-y-auto h-16 text-xs">
                        {items.map((inq) => (
                          <div key={inq.id} className="bg-blue-100 p-1 rounded">
                            {inq.id.slice(0, 4)}...
                          </div>
                        ))}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
