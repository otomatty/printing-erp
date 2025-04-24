import PageHero from '~/components/custom/page-hero';
import FAQSection from '~/components/custom/faq/faq-section';
import { contactFAQs } from '~/components/custom/faq/faq-data';
import Container from '~/components/custom/container';
import ContactForm from './contact-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お問い合わせ | ニイヌマ企画印刷',
  description:
    'ご質問やお見積りのご依頼などはこちらからお気軽にお問い合わせください。',
  keywords: ['お問い合わせ', 'ニイヌマ企画印刷'],
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="お問い合わせ"
        subtitle="ご質問やお見積りのご依頼などはこちらからお気軽にお問い合わせください。"
      />
      <div className="py-12 bg-gray-50">
        <Container>
          <div className="max-w-3xl mx-auto mb-12">
            {/* 新しいContactFormコンポーネントを使用 */}
            <ContactForm />
          </div>
        </Container>
        <FAQSection
          title="よくあるご質問"
          faqs={contactFAQs}
          withQAStyle={true}
        />
      </div>
    </>
  );
}
