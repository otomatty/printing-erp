import { Hero } from '~/components/Hero';
import { PricingTable, type Plan } from './_components/PricingTable';
import { RegionalDiscount } from './_components/RegionalDiscount';
import { FAQAccordion, type FAQItem } from './_components/FAQAccordion';
import { PricingCTA } from './_components/PricingCTA';

export default function PricingPage() {
  const plans: Plan[] = [
    {
      name: '無料',
      price: '¥0/月',
      users: '最大3ユーザー',
      support: 'オンラインサポート',
      popular: false,
    },
    {
      name: 'ビジネス',
      price: '¥5,000/月',
      users: '無制限ユーザー',
      support: '優先サポート',
      popular: true,
    },
    {
      name: 'エンタープライズ',
      price: '要お問い合わせ',
      users: 'カスタム',
      support: '専任サポート',
      popular: false,
    },
  ];
  const faqItems: FAQItem[] = [
    {
      q: '無料プランで使える機能は？',
      a: '基本機能すべてをご利用いただけますが、ユーザー数とサポートに制限があります。',
    },
    {
      q: '急ぎ納品は追加料金がかかりますか？',
      a: '地域密着型の直送体制のため、追加料金なしで即日対応可能です。',
    },
    {
      q: '契約の途中解約はできますか？',
      a: 'いつでも解約可能で、解約月の残日で日割り清算いたします。',
    },
  ];

  return (
    <main className="flex flex-col min-h-screen">
      <Hero
        title="料金プラン"
        subtitle="地域特典でさらにお得に。用途や人数に合わせて選べるプラン。"
      />
      <PricingTable plans={plans} />
      <RegionalDiscount />
      <FAQAccordion items={faqItems} />
      <PricingCTA />
    </main>
  );
}
