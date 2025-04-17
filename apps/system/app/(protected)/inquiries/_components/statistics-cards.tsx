import { MessageSquare } from 'lucide-react';

interface StatisticsProps {
  stats: {
    total: number;
    by_status: {
      new: number;
      in_progress: number;
    };
  };
}

export function StatisticsCards({ stats }: StatisticsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg shadow flex items-center">
        <div className="bg-blue-100 p-3 rounded-full mr-4">
          <MessageSquare className="text-primary" size={24} />
        </div>
        <div>
          <p className="text-gray-500 text-sm">全件数</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow flex items-center">
        <div className="bg-yellow-100 p-3 rounded-full mr-4">
          <MessageSquare className="text-yellow-600" size={24} />
        </div>
        <div>
          <p className="text-gray-500 text-sm">対応中</p>
          <p className="text-2xl font-bold">{stats.by_status.in_progress}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow flex items-center">
        <div className="bg-red-100 p-3 rounded-full mr-4">
          <MessageSquare className="text-red-600" size={24} />
        </div>
        <div>
          <p className="text-gray-500 text-sm">未対応</p>
          <p className="text-2xl font-bold">{stats.by_status.new}</p>
        </div>
      </div>
    </div>
  );
}
