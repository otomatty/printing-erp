import Link from 'next/link';
import { Printer, Settings } from 'lucide-react';
import { Card } from '@kit/ui/card';
import { Badge } from '@kit/ui/badge';
import { Button } from '@kit/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@kit/ui/table';
import type { Equipment } from '../_data';
import { getEquipmentStatusDetails } from '../_data';

type EquipmentTabProps = {
  equipments: Equipment[];
  idleEquipments: Equipment[];
  operatingEquipments: Equipment[];
  maintenanceEquipments: Equipment[];
};

export function EquipmentTab({
  equipments,
  idleEquipments,
  operatingEquipments,
  maintenanceEquipments,
}: EquipmentTabProps) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card className="p-4 flex items-center">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <Printer className="text-green-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">待機中</p>
            <p className="text-2xl font-bold">{idleEquipments.length}</p>
          </div>
        </Card>

        <Card className="p-4 flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Printer className="text-primary" size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">稼働中</p>
            <p className="text-2xl font-bold">{operatingEquipments.length}</p>
          </div>
        </Card>

        <Card className="p-4 flex items-center">
          <div className="bg-yellow-100 p-3 rounded-full mr-4">
            <Settings className="text-yellow-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">メンテナンス中</p>
            <p className="text-2xl font-bold">{maintenanceEquipments.length}</p>
          </div>
        </Card>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">設備ID</TableHead>
            <TableHead>設備名</TableHead>
            <TableHead>種類</TableHead>
            <TableHead>ステータス</TableHead>
            <TableHead>現在の案件</TableHead>
            <TableHead>次回利用可能時間</TableHead>
            <TableHead>オペレーター</TableHead>
            <TableHead className="w-[100px]">アクション</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipments.map((equipment) => {
            const statusDetails = getEquipmentStatusDetails(equipment.status);
            return (
              <TableRow key={equipment.id}>
                <TableCell className="font-medium">{equipment.id}</TableCell>
                <TableCell>{equipment.name}</TableCell>
                <TableCell>
                  {equipment.type === 'printer'
                    ? '印刷機'
                    : equipment.type === 'cutter'
                      ? '断裁機'
                      : equipment.type === 'binder'
                        ? '製本機'
                        : equipment.type}
                </TableCell>
                <TableCell>
                  <Badge className={statusDetails.color}>
                    {statusDetails.label}
                  </Badge>
                </TableCell>
                <TableCell>
                  {equipment.currentJob ? (
                    <Link href={`/production/${equipment.currentJob}`}>
                      <span className="text-primary hover:underline">
                        {equipment.currentJob}
                      </span>
                    </Link>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell>{equipment.nextAvailable}</TableCell>
                <TableCell>{equipment.operator || '-'}</TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Link href={`/production/equipment/${equipment.id}`}>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
