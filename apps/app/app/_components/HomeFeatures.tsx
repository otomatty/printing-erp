import {
  Printer,
  FileText,
  Calendar,
  Users,
  ChartBar,
  Shield,
} from 'lucide-react';

export function HomeFeatures() {
  const features = [
    {
      title: '印刷発注管理',
      description:
        '発注から納品までをオンラインで一元管理。リアルタイム進捗確認。',
      icon: Printer,
    },
    {
      title: 'デザインアセット管理',
      description: 'ロゴ、写真、テンプレートなどを権限管理しつつ一元管理。',
      icon: FileText,
    },
    {
      title: '納期・進行管理',
      description:
        'マイルストーン設定とリアルタイム追跡でスケジュールを最適化。',
      icon: Calendar,
    },
    {
      title: 'チームコラボレーション',
      description: '承認フローとフィードバックをリアルタイムで共有。',
      icon: Users,
    },
    {
      title: '印刷分析・レポート',
      description: 'データ分析とレポートでコスト削減と意思決定を支援。',
      icon: ChartBar,
    },
    {
      title: 'セキュアなデータ管理',
      description: '高セキュリティと細かなアクセス権限でデータを保護。',
      icon: Shield,
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">主な機能</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="group bg-white p-8 rounded-xl shadow-md hover:shadow-2xl transition"
            >
              <div className="w-16 h-16 mb-4 flex items-center justify-center bg-gradient-to-tr from-primary to-secondary rounded-full transition-transform group-hover:scale-110">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition">
                {title}
              </h3>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
