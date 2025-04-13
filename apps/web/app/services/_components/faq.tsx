'use client';

import FAQSection from '~/components/custom/faq/faq-section';
import { motion } from 'framer-motion';

// よくある質問データ
const faqs = [
  {
    id: 'faq-1',
    question: '納期はどれくらいかかりますか？',
    answer:
      'ご注文内容や数量、印刷方法によって異なります。標準的な納期は、デザイン制作から印刷・納品まで2〜3週間程度です。お急ぎの場合は、ご相談ください。短納期対応も可能な場合があります。',
  },
  {
    id: 'faq-2',
    question: '少量でも印刷できますか？',
    answer:
      'はい、少量からの印刷にも対応しています。デジタル印刷を活用することで、小ロットでも高品質な印刷物を提供しています。数量に関わらず、お気軽にご相談ください。',
  },
  {
    id: 'faq-3',
    question: 'デザインから依頼できますか？',
    answer:
      'もちろん可能です。当社では、デザインから印刷まで一貫して対応しています。お客様のご要望をヒアリングし、目的に合ったデザインをご提案します。既存のデータをお持ちの場合は、そのデータを活用した印刷も可能です。',
  },
  {
    id: 'faq-4',
    question: 'どのような支払い方法がありますか？',
    answer:
      '直接支払い、銀行振込に対応しています。詳細はお見積り時にご案内いたします。継続的なお取引の場合は、請求書払いも可能です。',
  },
  {
    id: 'faq-5',
    question: '修正は何回までできますか？',
    answer:
      '基本的に修正回数に制限は設けておりません。お客様にご満足いただけるまで修正対応いたします。ただし、大幅なデザイン変更や方向性の変更の場合は、別途料金が発生する場合がございます。',
  },
];

export default function Faq() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <FAQSection
            title="よくある質問"
            faqs={faqs}
            withBackground={false}
            withQAStyle={true}
          />
        </motion.div>
      </div>
    </section>
  );
}
