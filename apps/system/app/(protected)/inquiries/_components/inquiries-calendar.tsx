'use client';

import React, { useMemo } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay,
} from 'date-fns';
import type { Inquiry } from '~/types/inquiries';
import { getStatusDetails } from '../_data';

// 型安全な日付キー定義（yyyy-MM-dd形式）
type DateKey = `${number}-${number}-${number}`;

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

  // 月初とカレンダーデータをメモ化してパフォーマンス向上
  const { calendar, monthStart } = useMemo(() => {
    const mStart = startOfMonth(currentMonth);
    const mEnd = endOfMonth(mStart);
    const sDate = startOfWeek(mStart);
    const eDate = endOfWeek(mEnd);
    const cal: Date[][] = [];
    let dt = sDate;
    while (dt <= eDate) {
      const week: Date[] = [];
      for (let i = 0; i < 7; i++) {
        week.push(dt);
        dt = addDays(dt, 1);
      }
      cal.push(week);
    }
    return { calendar: cal, monthStart: mStart };
  }, [currentMonth]);

  // 問い合わせを日付でグループ化（メモ化）
  const enquiriesByDate = useMemo<Record<DateKey, Inquiry[]>>(() => {
    return inquiries.reduce(
      (acc, inq) => {
        const key = format(new Date(inq.created_at), 'yyyy-MM-dd') as DateKey;
        if (!acc[key]) acc[key] = [];
        acc[key].push(inq);
        return acc;
      },
      {} as Record<DateKey, Inquiry[]>
    );
  }, [inquiries]);

  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];

  return (
    <div>
      <div className="flex items-center justify-center mb-2 space-x-2">
        <button type="button" onClick={prevMonth} className="px-2">
          ◀
        </button>
        <button
          type="button"
          onClick={() => setCurrentMonth(new Date())}
          className="px-2"
        >
          今日
        </button>
        <h3 className="text-lg font-bold">
          {format(currentMonth, 'yyyy年MM月')}
        </h3>
        <button type="button" onClick={nextMonth} className="px-2">
          ▶
        </button>
      </div>
      <table
        className="w-full table-fixed border-collapse"
        aria-label="お問い合わせカレンダー"
      >
        <caption className="sr-only">お問い合わせカレンダー</caption>
        <thead>
          <tr>
            {weekdays.map((day) => (
              <th
                key={day}
                className={`border p-1 text-center text-sm ${
                  day === '日'
                    ? 'text-red-500'
                    : day === '土'
                      ? 'text-blue-500'
                      : ''
                }`}
              >
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
                  const items = enquiriesByDate[key as DateKey] || [];
                  return (
                    <td
                      key={key}
                      aria-label={`${format(day, 'M/d')}日: ${items.length}件のお問い合わせ`}
                      className={`border align-top p-1 h-24 ${
                        !isSameMonth(day, monthStart)
                          ? 'bg-gray-200 text-gray-400'
                          : isSameDay(day, new Date())
                            ? 'bg-white ring ring-inset ring-primary'
                            : day.getDay() === 0
                              ? 'bg-red-50'
                              : day.getDay() === 6
                                ? 'bg-blue-50'
                                : 'bg-white'
                      }`}
                    >
                      <div className="text-xs mb-1 text-right">
                        {format(day, 'd')}
                      </div>
                      <div className="space-y-1 overflow-y-auto h-16 text-xs">
                        {items.map((inq) => {
                          const dispName =
                            inq.company_name || inq.customer_name;
                          const { color: statusColor } = getStatusDetails(
                            inq.status
                          );
                          return (
                            <div
                              key={inq.id}
                              className={`w-full ${statusColor} p-1 rounded shadow-sm hover:shadow-md transition cursor-pointer truncate`}
                              title={dispName}
                            >
                              <span className="text-xs">
                                {dispName.length > 30
                                  ? `${dispName.slice(0, 30)}…`
                                  : dispName}
                              </span>
                            </div>
                          );
                        })}
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
