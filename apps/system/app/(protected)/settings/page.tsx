import {
  Settings,
  Save,
  Layers,
  Users,
  Building2,
  Factory,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@kit/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@kit/ui/card';
import { Button } from '@kit/ui/button';

import { InquirySettings } from './_components/inquiry/inquiry-settings';
import { GeneralSettings } from './_components/general/general';
import { UserSettings } from './_components/users/user-settings';
import { CompanySettings } from './_components/company/company-settings';
import { ProductionSettings } from './_components/production/production';

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Settings className="mr-2" />
          システム設定
        </h1>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          設定を保存
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 mb-6">
          <TabsTrigger value="general" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            <span className="hidden md:inline">基本設定</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span className="hidden md:inline">ユーザー</span>
          </TabsTrigger>
          <TabsTrigger value="company" className="flex items-center gap-1">
            <Building2 className="h-4 w-4" />
            <span className="hidden md:inline">会社情報</span>
          </TabsTrigger>
          <TabsTrigger value="production" className="flex items-center gap-1">
            <Factory className="h-4 w-4" />
            <span className="hidden md:inline">製造管理</span>
          </TabsTrigger>
          <TabsTrigger value="inquiries" className="flex items-center gap-1">
            <Layers className="h-4 w-4" />
            <span className="hidden md:inline">問い合わせ</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralSettings />
        </TabsContent>

        <TabsContent value="users">
          <UserSettings />
        </TabsContent>

        <TabsContent value="company">
          <CompanySettings />
        </TabsContent>

        <TabsContent value="production">
          <ProductionSettings />
        </TabsContent>

        <TabsContent value="inquiries">
          <InquirySettings />
        </TabsContent>

        {/* 他の未実装のタブ用のプレースホルダー */}
        {['orders', 'inventory', 'billing', 'system'].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card>
              <CardHeader>
                <CardTitle>
                  {tab === 'orders' && '受注管理設定'}
                  {tab === 'inventory' && '在庫管理設定'}
                  {tab === 'billing' && '請求管理設定'}
                  {tab === 'system' && 'システム管理設定'}
                </CardTitle>
                <CardDescription>
                  この設定ページは開発中です。今後のアップデートをお待ちください。
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                  <Layers className="h-12 w-12 mb-4" />
                  <h3 className="text-lg font-medium">開発中</h3>
                  <p className="max-w-md">
                    この設定ページは現在開発中です。将来のアップデートで実装される予定です。
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
