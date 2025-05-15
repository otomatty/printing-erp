import type { Metadata } from 'next';
import Container from '~/components/custom/container';
import EngineerSection from './_common/engineer';
import CtaSection from '~/components/custom/cta-section';
import { Laptop, Database, Settings, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'IT・デジタルサービス | 印刷会社',
  description:
    '印刷技術とITの融合による、ビジネスプロセスの効率化と新しい顧客体験の創出',
};

const itServices = [
  {
    title: 'ホームページ制作',
    description: 'ブランディングを強化するホームページの制作',
    icon: Laptop,
    link: '/services/it-digital/homepage',
  },
  {
    title: '業務システム開発',
    description:
      '印刷業界の知見を活かした、業務効率化のためのカスタムシステム開発',
    icon: Database,
    link: '/services/it-digital/system',
  },
  {
    title: 'ITコンサルティング',
    description: '印刷業界の知見を活かした、ITコンサルティング',
    icon: Settings,
    link: '/services/it-digital/consulting',
  },
];

export default function ITDigitalServicesPage() {
  return (
    <main>
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              印刷の知見を活かした
              <br />
              デジタルソリューション
            </h1>
            <p className="text-xl mb-8">
              長年培った印刷技術とITの融合により、お客様のビジネスプロセスを効率化し、
              新しい顧客体験を創出します。デジタル化の波に乗り遅れることなく、
              伝統的な価値を保ちながら進化するためのパートナーとして、
              印刷会社のIT・デジタルサービスがお手伝いします。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-blue-800 hover:bg-gray-100 px-8 py-3 rounded-md transition-colors font-medium"
              >
                無料相談を予約する
              </a>
              <a
                href="#services"
                className="bg-transparent border border-white text-white hover:bg-white/10 px-8 py-3 rounded-md transition-colors font-medium"
              >
                サービス詳細を見る
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* サービス一覧 */}
      <section id="services" className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">IT・デジタルサービス</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              印刷業界ならではの視点で、ビジネスプロセスの効率化と
              顧客体験の向上を実現するITソリューションを提供します。
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {itServices.map((service) => (
              <div
                key={service.title}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 text-primary rounded-full flex items-center justify-center mb-4">
                  {service.icon && <service.icon size={24} />}
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <a
                  href={service.link}
                  className="text-primary hover:text-blue-800 font-medium inline-flex items-center"
                >
                  詳細を見る
                  <ChevronRight size={16} className="ml-1" />
                </a>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* なぜ印刷会社がIT事業を行うのか */}
      <section className="py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              なぜ印刷会社がIT事業を展開するのか
            </h2>
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-blue-800">
                  1. デジタルとアナログの融合による新たな価値創造
                </h3>
                <p className="text-gray-700">
                  印刷物とデジタル技術は相反するものではなく、互いに補完し合うものです。
                  長年培った印刷のノウハウとデジタル技術を組み合わせることで、
                  印刷物の価値を高め、同時にデジタルの利便性を取り入れた
                  新しいコミュニケーション手段を提供します。
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-blue-800">
                  2. お客様のDXをトータルサポート
                </h3>
                <p className="text-gray-700">
                  多くのお客様が「デジタル化したいけれど何から始めればいいかわからない」という課題を抱えています。
                  印刷物制作で培った「お客様の想いを形にする」というコミュニケーション能力と、
                  IT技術を組み合わせることで、お客様のデジタルトランスフォーメーションを
                  一歩一歩サポートします。
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-blue-800">
                  3. 印刷業界特有の課題解決
                </h3>
                <p className="text-gray-700">
                  印刷会社は印刷業界の課題を熟知しています。その知見を活かし、
                  業界特有の課題を解決するシステムを提供することで、
                  印刷会社だからこそできる効率化と価値創造を実現します。
                  印刷業の未来を見据え、従来の印刷サービスとデジタルサービスを
                  シームレスに連携させた新しいビジネスモデルを構築します。
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* エンジニア紹介 */}
      <EngineerSection />

      {/* 問い合わせCTA */}
      <CtaSection
        title="デジタル変革の第一歩を踏み出しましょう"
        message="お客様のビジネス課題や目標に合わせた最適なIT・デジタルソリューションをご提案します。まずは無料相談で、貴社の課題をお聞かせください。"
        buttons={[{ text: '無料相談を予約する', href: '/contact' }]}
      />
    </main>
  );
}
