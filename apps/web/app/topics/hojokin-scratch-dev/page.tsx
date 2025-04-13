import Link from 'next/link';
import PageHero from '~/components/custom/page-hero';
import Container from '~/components/custom/container';
// Remove unnecessary imports like icons

// Import section components
import IntroductionSection from './_components/IntroductionSection';
import BenefitsSection from './_components/BenefitsSection';
import StrengthsSection from './_components/StrengthsSection';
import SubsidiesSection from './_components/SubsidiesSection';
import CaseStudiesSection from './_components/CaseStudiesSection';
import PrecautionsSection from './_components/PrecautionsSection';
import CtaSection from './_components/CtaSection';
import RelatedTopicLink from '@kit/ui/RelatedTopicLink';

// TODO: Set metadata (title, description)
export const metadata = {
  title: '補助金活用で実現！オーダーメイドDX | ニイヌマ企画印刷 特集',
  description:
    'スクラッチ開発のWebサイト・業務システム導入に活用できる補助金と、ニイヌマ企画印刷の低コスト開発について解説します。',
};

export default function HojokinScratchDevPage() {
  return (
    <div>
      <PageHero
        title="補助金活用で実現する、貴社だけのDX"
        subtitle="オーダーメイドのWebサイト・業務システム開発を低コストで"
      />
      <Container className="py-12">
        {/* Render section components */}
        <IntroductionSection />
        <BenefitsSection />
        <RelatedTopicLink
          title="スクラッチ開発とは？基本からメリット・デメリットまで解説"
          excerpt="「スクラッチ開発」という言葉を聞いたことはありますか？オーダーメイドでシステムやWebサイトを構築するメリットや、どんな場合に適しているのかを詳しく解説します。"
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
