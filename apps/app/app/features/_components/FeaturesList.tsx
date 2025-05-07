import {
  Printer,
  FileText,
  Calendar,
  Users,
  ChartBar,
  Shield,
} from 'lucide-react';

export function FeaturesList() {
  const features = [
    {
      title: '印刷発注管理',
      description:
        '印刷物の発注から納品までを一元管理。見積もり依頼、進捗確認をオンラインで完結。',
      icon: Printer,
    },
    {
      title: 'デザインアセット管理',
      description:
        '会社のロゴ、写真、テンプレートなどデザインアセットを一元管理。権限に応じたアクセス制御も可能。',
      icon: FileText,
    },
    {
      title: '納期・進行管理',
      description:
        '案件の進行状況をリアルタイムで確認。納期管理やマイルストーン設定でプロジェクトを円滑に進行。',
      icon: Calendar,
    },
    {
      title: 'チームコラボレーション',
      description:
        '印刷物に関する社内承認フローを電子化。関係者間でのコメントやフィードバックもリアルタイムに共有。',
      icon: Users,
    },
    {
      title: '印刷分析・レポート',
      description:
        '印刷発注の傾向や予算管理を可視化。データに基づいた意思決定をサポート。',
      icon: ChartBar,
    },
    {
      title: 'セキュアなデータ管理',
      description:
        '高度なセキュリティ体制で印刷データを保護。アクセス権限の細かな設定も可能。',
      icon: Shield,
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">できること</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ title, description, icon: Icon }, idx) => (
            <div
              key={title}
              className="group bg-white p-8 rounded-xl shadow-md hover:shadow-2xl transition"
            >
              <div
                className={`w-16 h-16 mb-4 flex items-center justify-center transition-transform group-hover:scale-110 ${
                  idx % 2 === 0
                    ? 'bg-gradient-to-tr from-primary to-secondary rounded-full'
                    : 'bg-gradient-to-br from-secondary to-primary rounded-md'
                }`}
              >
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3
                className={`text-xl font-semibold mb-2 transition ${
                  idx % 2 === 0
                    ? 'group-hover:text-primary'
                    : 'group-hover:text-secondary'
                }`}
              >
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
