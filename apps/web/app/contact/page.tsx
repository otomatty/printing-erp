'use client';

import PageHero from '~/components/custom/page-hero';
import FAQSection from '~/components/custom/faq/faq-section';
import { contactFAQs } from '~/components/custom/faq/faq-data';
import ContactForm from './contact-form';

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="お問い合わせ"
        subtitle="ご質問やお見積りのご依頼などはこちらからお気軽にお問い合わせください。"
      />
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* 新しいContactFormコンポーネントを使用 */}
            <ContactForm />

            {/* FAQセクションを追加 */}
            <div className="mt-16">
              <FAQSection
                title="お問い合わせに関するよくある質問"
                faqs={contactFAQs}
                withQAStyle={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
