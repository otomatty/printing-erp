import { Card } from '@kit/ui/card';
import {
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  Printer,
} from 'lucide-react';
import type { ProductionJob, Equipment } from '../_data';

type StatCardsProps = {
  scheduledJobs: ProductionJob[];
  inProgressJobs: ProductionJob[];
  completedJobs: ProductionJob[];
  delayedJobs: ProductionJob[];
  operatingEquipments: Equipment[];
  equipments: Equipment[];
};

export function StatCards({
  scheduledJobs,
  inProgressJobs,
  completedJobs,
  delayedJobs,
  operatingEquipments,
  equipments,
}: StatCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
      <Card className="p-4 flex items-center">
        <div className="bg-blue-100 p-3 rounded-full mr-4">
          <Calendar className="text-primary" size={24} />
        </div>
        <div>
          <p className="text-gray-500 text-sm">予定</p>
          <p className="text-2xl font-bold">{scheduledJobs.length}</p>
        </div>
      </Card>

      <Card className="p-4 flex items-center">
        <div className="bg-green-100 p-3 rounded-full mr-4">
          <Clock className="text-green-600" size={24} />
        </div>
        <div>
          <p className="text-gray-500 text-sm">進行中</p>
          <p className="text-2xl font-bold">{inProgressJobs.length}</p>
        </div>
      </Card>

      <Card className="p-4 flex items-center">
        <div className="bg-red-100 p-3 rounded-full mr-4">
          <AlertTriangle className="text-red-600" size={24} />
        </div>
        <div>
          <p className="text-gray-500 text-sm">遅延</p>
          <p className="text-2xl font-bold">{delayedJobs.length}</p>
        </div>
      </Card>

      <Card className="p-4 flex items-center">
        <div className="bg-gray-100 p-3 rounded-full mr-4">
          <CheckCircle className="text-gray-600" size={24} />
        </div>
        <div>
          <p className="text-gray-500 text-sm">完了</p>
          <p className="text-2xl font-bold">{completedJobs.length}</p>
        </div>
      </Card>

      <Card className="p-4 flex items-center">
        <div className="bg-indigo-100 p-3 rounded-full mr-4">
          <Printer className="text-indigo-600" size={24} />
        </div>
        <div>
          <p className="text-gray-500 text-sm">設備稼働率</p>
          <p className="text-2xl font-bold">
            {Math.round((operatingEquipments.length / equipments.length) * 100)}
            %
          </p>
        </div>
      </Card>
    </div>
  );
}
