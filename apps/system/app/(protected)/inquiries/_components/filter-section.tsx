import { Search, Filter, ChevronDown } from 'lucide-react';

export function FilterSection() {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <div className="relative flex-1 min-w-[200px]">
        <input
          type="text"
          placeholder="問い合わせ番号、名前、メールで検索..."
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          className="border px-4 py-2 rounded-md flex items-center hover:bg-gray-50"
        >
          <Filter size={16} className="mr-1 text-gray-500" />
          絞り込み
        </button>

        <select className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="">すべてのステータス</option>
          <option value="new">新規</option>
          <option value="in_progress">対応中</option>
          <option value="waiting">回答待ち</option>
          <option value="resolved">解決済み</option>
          <option value="closed">完了</option>
        </select>

        <select className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="">すべての優先度</option>
          <option value="urgent">緊急</option>
          <option value="high">高</option>
          <option value="medium">中</option>
          <option value="low">低</option>
        </select>

        <button
          type="button"
          className="border px-4 py-2 rounded-md flex items-center hover:bg-gray-50"
        >
          <span>日付順</span>
          <ChevronDown size={16} className="ml-1 text-gray-500" />
        </button>
      </div>
    </div>
  );
}
