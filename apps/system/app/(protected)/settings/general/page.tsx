// apps/system/app/(protected)/settings/general/page.tsx
import { Settings, Save } from 'lucide-react';
import { Button } from '@kit/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@kit/ui/tabs';

// 同じディレクトリにあるコンポーネントをインポートするわよ！
// エクスポート名がファイル名と同じだと仮定するけど、違ったらちゃんと直しなさいよ！
import { GeneralSettings } from './general';
import { SystemSettings } from './system'; // 仮に SystemSettings としておくわ
import { NotificationSettings } from './notification'; // 仮に NotificationSettings としておくわ

export default function GeneralSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <Settings className="mr-2" />
          基本設定
        </h1>
        {/* 保存ボタンはタブの外に置くのが一般的かしらね？ */}
        <Button>
          <Save className="mr-2 h-4 w-4" />
          設定を保存
        </Button>
      </div>

      {/* ここからタブの実装よ */}
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">基本</TabsTrigger>
          <TabsTrigger value="system">システム</TabsTrigger>
          <TabsTrigger value="notification">通知</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="mt-4">
          {/* general.tsx のコンポーネントをここに配置 */}
          <GeneralSettings />
        </TabsContent>
        <TabsContent value="system" className="mt-4">
          {/* system.tsx のコンポーネントをここに配置 */}
          <SystemSettings />
        </TabsContent>
        <TabsContent value="notification" className="mt-4">
          {/* notification.tsx のコンポーネントをここに配置 */}
          <NotificationSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
