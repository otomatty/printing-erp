/**
 * アプリのトップページコンポーネント
 * 今後実装予定の機能概要を紹介するページ
 */
import {
  ArrowRight,
  Printer,
  FileText,
  Calendar,
  Users,
  ChartBar,
  Shield,
} from 'lucide-react';
import Link from 'next/link';

export default function AppHomePage() {
  // 機能一覧
  const features = [
    {
      title: '印刷発注管理',
      description:
        '印刷物の発注から納品までを一元管理。見積もり依頼、仕様確認、進捗確認をオンラインで完結。',
      icon: <Printer className="h-10 w-10 text-primary" />,
    },
    {
      title: 'デザインアセット管理',
      description:
        '会社のロゴ、写真、テンプレートなどデザインアセットを一元管理。権限に応じたアクセス制御も可能。',
      icon: <FileText className="h-10 w-10 text-primary" />,
    },
    {
      title: '納期・進行管理',
      description:
        '案件の進行状況をリアルタイムで確認。納期管理やマイルストーン設定でプロジェクトを円滑に進行。',
      icon: <Calendar className="h-10 w-10 text-primary" />,
    },
    {
      title: 'チームコラボレーション',
      description:
        '印刷物に関する社内承認フローを電子化。関係者間でのコメントやフィードバックもリアルタイムに共有。',
      icon: <Users className="h-10 w-10 text-primary" />,
    },
    {
      title: '印刷分析・レポート',
      description:
        '印刷発注の傾向や予算管理を可視化。データに基づいた意思決定をサポート。',
      icon: <ChartBar className="h-10 w-10 text-primary" />,
    },
    {
      title: 'セキュアなデータ管理',
      description:
        '高度なセキュリティ体制で印刷データを保護。アクセス権限の細かな設定も可能。',
      icon: <Shield className="h-10 w-10 text-primary" />,
    },
  ];

  return (
    <main className="flex flex-col min-h-screen">
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-r from-primary to-primary-foreground py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              印刷業務をもっとスマートに
            </h1>
            <p className="text-xl mb-8">
              ニイヌマ企画印刷のオンライン発注・管理システムで、印刷業務の効率化を実現します。
              デザインから発注、納品までをシームレスに管理できます。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                className="bg-white text-primary font-medium py-3 px-6 rounded-md hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                近日公開予定 <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <Link
                href="/"
                className="bg-transparent border border-white text-white font-medium py-3 px-6 rounded-md hover:bg-white/10 transition-colors"
              >
                ホームページに戻る
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 機能紹介セクション */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">主な機能</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* お問い合わせセクション */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            もっと詳しく知りたいですか？
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            ニイヌマ企画印刷のオンラインシステムについて、詳しい情報をお求めの方はお気軽にお問い合わせください。
          </p>
          <Link
            href="/contact"
            className="bg-primary text-white font-medium py-3 px-8 rounded-md hover:bg-primary/90 transition-colors inline-flex items-center"
          >
            お問い合わせ <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
