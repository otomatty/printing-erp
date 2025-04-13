import PageHero from '~/components/custom/page-hero';
import CtaSection from '~/components/custom/cta-section';
import WorkDetail from '../_components/WorkDetail';
import RelatedWorks from '../_components/RelatedWorks';
import { notFound } from 'next/navigation';
import { works } from '../_data/works';

export async function generateMetadata({
  params,
}: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const work = works.find((work) => work.id === resolvedParams.id);

  if (!work) {
    return {
      title: '作品が見つかりません | ニイヌマ企画印刷',
      description: 'お探しの制作事例は見つかりませんでした。',
    };
  }

  return {
    title: `${work.title} | 制作事例 | ニイヌマ企画印刷`,
    description: work.description,
  };
}

export default async function WorkDetailPage({
  params,
}: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const work = works.find((work) => work.id === resolvedParams.id);

  if (!work) {
    notFound();
  }

  // 同じカテゴリーの他の作品（最大3件）を取得
  const relatedWorks = works
    .filter((w) => w.category === work.category && w.id !== work.id)
    .slice(0, 3);

  return (
    <>
      <PageHero title={work.title} subtitle={work.client} />
      <WorkDetail work={work} />
      {relatedWorks.length > 0 && <RelatedWorks works={relatedWorks} />}
      <CtaSection
        title="プロジェクトのご相談はこちら"
        message="印刷物やデザインについてのご相談は、お気軽にお問い合わせください。お客様のニーズに合わせた最適なソリューションをご提案いたします。"
      />
    </>
  );
}
