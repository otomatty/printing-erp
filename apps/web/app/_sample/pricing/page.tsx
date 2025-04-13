import PricingCalculator from '@/components/Calculator/PricingCalculator';
import FAQSection from '~/components/custom/faq/faq-section';
import { printingServiceFAQs, pricingFAQs } from '@kit/ui/faq/faq-data';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import PageHero from '~/components/custom/page-hero';

export const metadata = {
  title: '料金シミュレーター | ニイヌマ企画印刷',
  description:
    '印刷物の種類・サイズ・部数などから概算の料金をシミュレーションできます。チラシ、ポスター、パンフレット、名刺、封筒などの印刷料金の目安をご確認いただけます。',
};

export default function PricingPage() {
  // 料金シミュレーター用FAQとお支払い関連FAQを結合
  const combinedFAQs = [...printingServiceFAQs, ...pricingFAQs.slice(0, 2)];

  return (
    <>
      <PageHero
        title="料金シミュレーター"
        subtitle="印刷物の種類・サイズ・部数などから概算の料金をシミュレーションできます。正確なお見積りはお問い合わせください。"
      />
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <PricingCalculator />

            <div className="mt-12">
              <FAQSection
                title="よくあるご質問"
                faqs={combinedFAQs}
                withQAStyle={true}
              />
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                その他ご不明な点がございましたら、お気軽にお問い合わせください。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md transition-colors font-medium inline-flex items-center justify-center"
                >
                  お問い合わせ <ChevronRight className="ml-2" size={20} />
                </Link>
                <Link
                  href="/services"
                  className="bg-white border border-gray-300 text-gray-800 hover:bg-gray-100 px-6 py-3 rounded-md transition-colors font-medium inline-flex items-center justify-center"
                >
                  サービス一覧 <ChevronRight className="ml-2" size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
