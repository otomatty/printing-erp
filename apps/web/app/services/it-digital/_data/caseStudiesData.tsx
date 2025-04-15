import type {
  CaseStudyProps,
  CaseStudiesSectionProps,
} from '../_common/case-studies';

// ホームページ制作サービスの事例データ
export const homepageCaseStudies: CaseStudyProps[] = [
  {
    id: 'homepage-estate',
    imageUrl: '/images/portfolio/homepage-sample1.jpg',
    imageAlt: '不動産会社のAI分析型サイト',
    type: 'AI分析型',
    title: '不動産会社のパーソナライズドサイト',
    tags: {
      industry: '不動産業',
      development: '2週間で開発',
    },
    metrics: {
      primary: {
        text: '問い合わせ 2.4倍',
        isPositive: true,
      },
      secondary: {
        text: '成約率 31%向上',
        isPositive: true,
      },
    },
    description: '訪問者の行動分析AIで関心に合わせたコンテンツ自動表示',
  },
  {
    id: 'homepage-apparel',
    imageUrl: '/images/portfolio/homepage-sample2.jpg',
    imageAlt: 'アパレルECサイト',
    type: '次世代EC',
    title: 'アパレルブランドのAI駆動型ECサイト',
    tags: {
      industry: 'アパレル業',
      development: '3週間で開発',
    },
    metrics: {
      primary: {
        text: '顧客単価 22%向上',
        isPositive: true,
      },
      secondary: {
        text: '運用工数 60%削減',
        isPositive: false,
      },
    },
    description: 'AIレコメンドと在庫自動最適化で顧客体験と業務効率を向上',
  },
  {
    id: 'homepage-beauty',
    imageUrl: '/images/portfolio/homepage-sample3.jpg',
    imageAlt: '美容メディアサイト',
    type: 'AIコンテンツ',
    title: '美容クリニックのAIコンテンツメディア',
    tags: {
      industry: '医療・美容',
      development: '2.5週間で開発',
    },
    metrics: {
      primary: {
        text: '有機流入 40%増加',
        isPositive: true,
      },
      secondary: {
        text: '予約数 1.7倍に増加',
        isPositive: true,
      },
    },
    description: 'AI記事生成と訪問者に合わせたパーソナライズド表示で集客力強化',
  },
];

// ホームページ制作サービスの事例セクションデータ
export const homepageCaseStudiesData: CaseStudiesSectionProps = {
  title: '導入事例',
  description:
    'AI技術を活用して、実際のビジネス成果を向上させた事例をご紹介します',
  caseStudies: homepageCaseStudies,
  viewMoreLink: '/services/it-digital/works',
  viewMoreText: '事例をもっと見る',
};

// 他のサービス向けに事例データを拡張可能
// 例：ECサイト構築サービスの事例データ
export const ecCaseStudies: CaseStudyProps[] = [
  // ここにECサイト構築の事例データを追加
];

export const ecCaseStudiesData: CaseStudiesSectionProps = {
  title: 'ECサイト導入事例',
  description: '売上向上と運用効率化を実現したECサイト構築の事例をご紹介します',
  caseStudies: ecCaseStudies,
  viewMoreLink: '/services/it-digital/works/ec',
  viewMoreText: 'EC事例をもっと見る',
};
