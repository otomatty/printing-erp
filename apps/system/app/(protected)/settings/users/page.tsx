// apps/system/app/(protected)/settings/users/page.tsx
import { Users, Save } from 'lucide-react';
import { Button } from '@kit/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@kit/ui/tabs';

// 同じディレクトリにあるコンポーネントをインポートするわよ！
// 例によって、エクスポート名がファイル名から推測できる名前だと仮定するわ
import { UserManagement } from './user-management'; // 仮に UserManagement
import { UserSettings } from './user-settings'; // 仮に UserSettings
import { PermissionSettings } from './permission-settings'; // 仮に PermissionSettings

export default function UserSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <Users className="mr-2" />
          ユーザー設定
        </h1>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          設定を保存
        </Button>
      </div>

      {/* ユーザー設定もタブで分けるわよ */}
      <Tabs defaultValue="management">
        <TabsList>
          <TabsTrigger value="management">ユーザー管理</TabsTrigger>
          <TabsTrigger value="permissions">権限設定</TabsTrigger>
          <TabsTrigger value="settings">アカウント設定</TabsTrigger>
        </TabsList>
        <TabsContent value="management" className="mt-4">
          <UserManagement />
        </TabsContent>
        <TabsContent value="permissions" className="mt-4">
          <PermissionSettings />
        </TabsContent>
        <TabsContent value="settings" className="mt-4">
          <UserSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
