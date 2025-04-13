'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@kit/ui/tabs';
import { Settings2, Monitor, Workflow } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@kit/ui/card';
import { ProcessSettings } from './ProcessSettings';
import { EquipmentSettings } from './EquipmentSettings';

export function ProductionSettings() {
  return (
    <div className="space-y-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>製造管理設定</CardTitle>
          <CardDescription>
            製造プロセスや設備に関する設定を管理します。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="process" className="w-full">
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="process">
                <Workflow className="h-4 w-4 mr-2" />
                工程マスタ設定
              </TabsTrigger>
              <TabsTrigger value="equipment">
                <Monitor className="h-4 w-4 mr-2" />
                設備マスタ設定
              </TabsTrigger>
            </TabsList>

            <TabsContent value="process">
              <ProcessSettings />
            </TabsContent>

            <TabsContent value="equipment">
              <EquipmentSettings />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
