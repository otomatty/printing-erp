import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getUser } from '../../actions/auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@kit/ui/card';
import { Button } from '@kit/ui/button';
import {
  Activity,
  FileText,
  Clock,
  AlertTriangle,
  FilePlus,
  TrendingUp,
  Calendar,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'ダッシュボード | ニイヌマ企画印刷',
  description: 'ニイヌマ企画印刷のお客様ダッシュボード',
};

export default async function DashboardPage() {
  // ユーザー認証確認
  const { user } = await getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // ダミーデータ
  const recentOrders = [
    {
      id: 'ORD-001',
      title: 'チラシ印刷 A4カラー両面 1000部',
      status: 'completed',
      date: '2023/05/10',
    },
    {
      id: 'ORD-002',
      title: 'ポスター印刷 B2サイズ 100部',
      status: 'in-progress',
      date: '2023/05/15',
    },
    {
      id: 'ORD-003',
      title: '名刺印刷 両面カラー 10セット',
      status: 'pending',
      date: '2023/05/18',
    },
  ];

  // ステータスに応じたバッジカラーを返す関数
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // ステータスの日本語表示
  const statusText = {
    completed: '完了',
    'in-progress': '進行中',
    pending: '準備中',
  };

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">ダッシュボード</h1>
        <p className="text-muted-foreground mt-2">
          {user.email}{' '}
          さん、こんにちは。最近の注文状況や進行中の作業を確認できます。
        </p>
      </header>

      {/* アクションボタン */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Button className="flex items-center gap-2">
          <FilePlus size={18} />
          <span>新規注文</span>
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <FileText size={18} />
          <span>過去の注文履歴</span>
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Calendar size={18} />
          <span>納期カレンダー</span>
        </Button>
      </div>

      {/* ステータスカードセクション */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              進行中の注文
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">2</div>
              <Activity className="h-5 w-5 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              今月の注文数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">8</div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              今後の納期
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">3件</div>
              <Clock className="h-5 w-5 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              要確認
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">1件</div>
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 最近の注文 */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>最近の注文</CardTitle>
          <CardDescription>直近の注文状況と進捗</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{order.id}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(order.status)}`}
                    >
                      {statusText[order.status as keyof typeof statusText]}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mt-1">{order.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    注文日: {order.date}
                  </p>
                </div>
                <div className="flex mt-4 sm:mt-0">
                  <Button variant="outline" size="sm" className="mr-2">
                    詳細
                  </Button>
                  {order.status === 'completed' && (
                    <Button size="sm" className="flex items-center gap-1">
                      <CheckCircle2 size={16} />
                      再注文
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            すべての注文を表示
          </Button>
        </CardFooter>
      </Card>

      {/* ヘルプセクション */}
      <Card>
        <CardHeader>
          <CardTitle>お問い合わせ</CardTitle>
          <CardDescription>ご質問やご相談はこちらから</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            印刷物のデザインや仕様についてのご質問、納期のご相談など、お気軽にお問い合わせください。
            専門スタッフが丁寧にサポートいたします。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="w-full">
              お問い合わせフォーム
            </Button>
            <Button variant="outline" className="w-full">
              電話でのお問い合わせ
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
