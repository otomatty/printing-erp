/**
 * ダッシュボード - 今日の予定コンポーネント
 * 当日のスケジュールや予定タスクを表示
 */
'use client';

import { Printer, FileText } from 'lucide-react';

interface ScheduledTask {
  id: string;
  title: string;
  type: 'print' | 'document';
  timeSlot: string;
  isUrgent: boolean;
}

export default function DashboardScheduledTasks() {
  // モックデータ - 今日の予定
  const scheduledTasks: ScheduledTask[] = [
    {
      id: 'task-2023-001',
      title: 'パンフレット印刷',
      type: 'print',
      timeSlot: '13:00 - 15:00',
      isUrgent: true,
    },
    {
      id: 'task-2023-002',
      title: '納品書作成',
      type: 'document',
      timeSlot: '15:30 - 16:00',
      isUrgent: false,
    },
    {
      id: 'task-2023-003',
      title: 'パンフレット印刷',
      type: 'print',
      timeSlot: '13:00 - 15:00',
      isUrgent: false,
    },
    {
      id: 'task-2023-004',
      title: '納品書作成',
      type: 'document',
      timeSlot: '15:30 - 16:00',
      isUrgent: false,
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">今日の予定</h2>
      <div className="space-y-3">
        {scheduledTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between border-b pb-3 last:border-0"
          >
            <div className="flex items-center">
              <div className="bg-gray-100 p-2 rounded mr-3">
                {task.type === 'print' ? (
                  <Printer size={20} />
                ) : (
                  <FileText size={20} />
                )}
              </div>
              <div>
                <p className="font-medium">{task.title}</p>
                <p className="text-sm text-gray-500">{task.timeSlot}</p>
              </div>
            </div>
            <span
              className={`inline-block px-2 py-1 text-xs rounded ${
                task.isUrgent
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {task.isUrgent ? '今すぐ' : '予定'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
