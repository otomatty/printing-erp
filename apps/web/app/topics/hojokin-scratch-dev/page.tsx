import Link from 'next/link';
import PageHero from '~/components/custom/page-hero';
import Container from '~/components/custom/container';
// Remove unnecessary imports like icons

// Import section components
import IntroductionSection from './_components/introduction';
import BenefitsSection from './_components/benefits';
import StrengthsSection from './_components/strengths';
import SubsidiesSection from './_components/subsidies';
import CaseStudiesSection from './_components/case-studies';
import PrecautionsSection from './_components/precautions';
import CtaSection from './_components/cta';
import RelatedTopicLink from '~/components/custom/related-topic-link';

// TODO: Set metadata (title, description)
export const metadata = {
  title: '補助金活用で実現！オーダーメイドDX | 印刷会社 特集',
  description:
    'スクラッチ開発のホームページ・業務システム導入に活用できる補助金と、印刷会社ト開発について解説します。',
};

export default function HojokinScratchDevPage() {
  return (
    <div>
      <PageHero
        title="補助金活用で実現する、貴社だけのDX"
        subtitle="オーダーメイドのホームページ・業務システム開発を低コストで"
      />
      <Container className="py-12">
        {/* Render section components */}
        <IntroductionSection />
        <BenefitsSection />
        <RelatedTopicLink
          title="スクラッチ開発とは？基本からメリット・デメリットまで解説"
          excerpt="「スクラッチ開発」という言葉を聞いたことはありますか？オーダーメイドでシステムやホームページを構築するメリットや、どんな場合に適しているのかを詳しく解説します。"
          imageUrl="/images/topics/what-is-scratch-dev.webp"
          linkUrl="/topics/what-is-scratch-dev"
        />

        <StrengthsSection />
        <SubsidiesSection />
        <CaseStudiesSection />
        <PrecautionsSection />
        <CtaSection />
      </Container>
    </div>
  );
}
