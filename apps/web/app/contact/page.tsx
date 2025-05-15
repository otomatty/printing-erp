import PageHero from '~/components/custom/page-hero';
import FAQSection from '~/components/custom/faq/faq-section';
import { getFaqItemsByPageSlug } from '~/actions/faq';
import Container from '~/components/custom/container';
import ContactForm from './contact-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お問い合わせ | 印刷会社',
  description:
    'ご質問やお見積りのご依頼などはこちらからお気軽にお問い合わせください。',
  keywords: ['お問い合わせ', '印刷会社
};

export default async function ContactPage() {
  const { faqs, error } = await getFaqItemsByPageSlug('/contact');
  if (error) console.error('Error fetching FAQs:', error);
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
        <FAQSection title="よくあるご質問" faqs={faqs} withQAStyle={true} />
      </div>
    </>
  );
}
