/**
 * ダッシュボード - スケジュールカレンダーコンポーネント
 * 週間カレンダーを表示
 */
'use client';

// カレンダーのデイセルを一意に識別するID生成のためのヘルパー関数
const generateDayCellId = (dayIndex: number) => `day-cell-${dayIndex}`;

// カレンダーイベントのタイプ
interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  colorClass: string;
  isUrgent?: boolean;
}

export default function DashboardCalendar() {
  // 各曜日のサンプルイベント
  const events: Record<number, CalendarEvent[]> = {
    0: [
      {
        id: 'event-1',
        title: 'パンフレット印刷',
        time: '13:00 - 15:00',
        colorClass: 'bg-blue-100 border-blue-500',
      },
    ],
    1: [
      {
        id: 'event-2',
        title: 'ABC商事様訪問',
        time: '10:00 - 12:00',
        colorClass: 'bg-green-100 border-green-500',
      },
      {
        id: 'event-3',
        title: '納品確認',
        time: '15:30 - 16:30',
        colorClass: 'bg-purple-100 border-purple-500',
      },
    ],
    2: [
      {
        id: 'event-4',
        title: '緊急: デザイン修正',
        time: '14:00 - 16:00',
        colorClass: 'bg-red-100 border-red-500',
        isUrgent: true,
      },
    ],
    3: [
      {
        id: 'event-5',
        title: '資材発注',
        time: '午前中',
        colorClass: 'bg-yellow-100 border-yellow-500',
      },
    ],
    4: [
      {
        id: 'event-6',
        title: 'チラシ納品期限',
        time: '17:00まで',
        colorClass: 'bg-orange-100 border-orange-500',
      },
    ],
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">スケジュールカレンダー</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex mb-4 space-x-2">
          <button
            type="button"
            className="bg-primary text-white px-4 py-2 rounded-md text-sm"
          >
            今週
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-md text-sm text-gray-500 hover:bg-gray-100"
          >
            来週
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-md text-sm text-gray-500 hover:bg-gray-100"
          >
            月表示
          </button>
        </div>

        {/* ウィークリーカレンダー */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[800px]">
            {/* 曜日ヘッダー */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['月', '火', '水', '木', '金', '土', '日'].map((day, index) => (
                <div
                  key={day}
                  className={`text-center p-2 font-medium ${
                    index >= 5 ? 'text-red-500' : ''
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* 日付行 */}
            <div className="grid grid-cols-7 gap-1 mb-2 text-sm">
              {[8, 9, 10, 11, 12, 13, 14].map((date, index) => (
                <div
                  key={`date-${date}`}
                  className={`text-center ${
                    date === 10
                      ? 'bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto'
                      : ''
                  } ${index >= 5 ? 'text-red-500' : ''}`}
                >
                  {date}
                </div>
              ))}
            </div>

            {/* カレンダーグリッド */}
            <div className="grid grid-cols-7 gap-1 h-[400px]">
              {Array.from({ length: 7 }).map((_, dayIndex) => (
                <div
                  key={generateDayCellId(dayIndex)}
                  className="border rounded-md p-2 h-full overflow-y-auto bg-gray-50"
                >
                  {/* イベント表示 */}
                  {events[dayIndex]?.map((event) => (
                    <div
                      key={event.id}
                      className={`${event.colorClass} p-2 rounded mb-2 text-xs border-l-4`}
                    >
                      <div
                        className={`font-medium ${
                          event.isUrgent ? 'text-red-700' : ''
                        }`}
                      >
                        {event.title}
                      </div>
                      <div className="text-gray-500">{event.time}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <a
            href="/system/calendar"
            className="text-sm text-primary hover:underline"
          >
            詳細スケジュールを見る →
          </a>
        </div>
      </div>
    </div>
  );
}
