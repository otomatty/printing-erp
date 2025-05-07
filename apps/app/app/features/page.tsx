import { Hero, type HeroButton } from '~/components/Hero';
import Link from 'next/link';
import { FeaturesList } from './_components/FeaturesList';
import { OrderSteps } from './_components/OrderSteps';
import { RegionStrength } from './_components/RegionStrength';
import { Testimonials } from './_components/Testimonials';

export default function FeaturesPage() {
  const buttons: HeroButton[] = [
    { text: '今すぐ無料登録', href: '/auth/login', variant: 'primary' },
  ];
  return (
    <main className="flex flex-col bg-gray-50">
      <Hero
        title="地域の印刷、今すぐオンラインで。最短即日納品。"
        subtitle="近くの工場から直送。中間コストなし・安定品質で地域密着型の迅速対応。"
        buttons={buttons}
      />
      <div className="-mt-16 pt-16 z-10 relative">
        <FeaturesList />
      </div>
      <OrderSteps />
      <RegionStrength />
      <Testimonials />
      <section className="py-16 bg-primary text-white text-center">
        <h2 className="text-3xl font-bold mb-4">今すぐ始めよう</h2>
        <Link
          href="/auth/login"
          className="bg-white text-primary font-medium py-3 px-6 rounded-md hover:bg-gray-100 transition-colors"
        >
          無料で始める
        </Link>
      </section>
    </main>
  );
}
