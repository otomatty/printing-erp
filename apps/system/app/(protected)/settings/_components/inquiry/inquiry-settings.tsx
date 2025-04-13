'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@kit/ui/tabs';
import { InquiryDashboard } from './inquiry-dashboard';
import { InquiryAutomation } from './inquiry-automation';
import { InquiryCategories } from './inquiry-categories';
import { ResponseTemplates } from './response-templates';
import { ResponseTimeSettings } from './response-time-settings';
import { InquiryAnalytics } from './inquiry-analytics';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@kit/ui/card';
import {
  MessageSquare,
  Zap,
  Gauge,
  Clock,
  FileText,
  BarChart4,
} from 'lucide-react';

export function InquirySettings() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-6">
          <TabsTrigger value="categories" className="flex items-center">
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>種別設定</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            <span>テンプレート</span>
          </TabsTrigger>
          <TabsTrigger value="sla" className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            <span>SLA設定</span>
          </TabsTrigger>
          <TabsTrigger value="automation" className="flex items-center">
            <Zap className="mr-2 h-4 w-4" />
            <span>自動化</span>
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="flex items-center">
            <Gauge className="mr-2 h-4 w-4" />
            <span>ダッシュボード</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center">
            <BarChart4 className="mr-2 h-4 w-4" />
            <span>分析</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          <InquiryCategories />
        </TabsContent>

        <TabsContent value="templates">
          <ResponseTemplates />
        </TabsContent>

        <TabsContent value="sla">
          <ResponseTimeSettings />
        </TabsContent>

        <TabsContent value="automation">
          <InquiryAutomation />
        </TabsContent>

        <TabsContent value="dashboard">
          <InquiryDashboard />
        </TabsContent>

        <TabsContent value="analytics">
          <InquiryAnalytics />
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>問い合わせ管理ヘルプ</CardTitle>
          <CardDescription>
            問い合わせ管理機能の使い方についてのヘルプです。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-md border p-4">
              <h3 className="font-medium mb-2">効率的な問い合わせ管理のコツ</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>
                  問い合わせ種別は、組織の主な問い合わせ内容に合わせて設定しましょう
                </li>
                <li>
                  優先度に応じた対応時間を設定し、重要な問い合わせを見逃さないようにしましょう
                </li>
                <li>
                  よく使う文面はテンプレートとして登録し、効率的に対応しましょう
                </li>
                <li>
                  自動化ルールを活用して、問い合わせの振り分けを効率化しましょう
                </li>
              </ul>
            </div>

            <div className="rounded-md border p-4">
              <h3 className="font-medium mb-2">SLA設定について</h3>
              <p className="text-sm text-muted-foreground mb-2">
                SLA（Service Level
                Agreement）は、問い合わせ対応に関する目標時間を設定するものです。
                優先度ごとに適切な応答時間を設定することで、重要な問い合わせから順に対応できます。
              </p>
              <p className="text-sm text-muted-foreground">
                自動化ルールと組み合わせることで、高優先度の問い合わせを特定の担当者に自動割り当てすることも可能です。
              </p>
            </div>
          </div>

          <div className="rounded-md border p-4">
            <h3 className="font-medium mb-2">関連ドキュメント</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium">問い合わせ管理マニュアル</p>
                <p className="text-muted-foreground">
                  問い合わせ対応の基本的な流れを説明しています
                </p>
              </div>
              <div>
                <p className="font-medium">テンプレート作成ガイド</p>
                <p className="text-muted-foreground">
                  効果的な返信テンプレートの作り方を紹介しています
                </p>
              </div>
              <div>
                <p className="font-medium">自動化ルール設定ガイド</p>
                <p className="text-muted-foreground">
                  効率的な自動化ルールの設計方法を解説しています
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
