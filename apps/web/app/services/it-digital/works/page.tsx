import type { Metadata } from 'next';
import WorksPageClient from './_components/works-page-client';

export const metadata: Metadata = {
  title: '実績紹介 | IT・デジタルサービス | ニイヌマ企画印刷',
  description:
    'ホームページ制作、業務システム開発、ITコンサルティングの実績事例をご紹介。様々な業種・規模のお客様の課題解決をサポートしています。',
  openGraph: {
    title: '実績紹介 | IT・デジタルサービス',
    description: 'これまでに手がけたプロジェクト事例のご紹介',
    images: [
      {
        url: '/images/services/works-ogp.jpg',
        width: 1200,
        height: 630,
        alt: 'IT・デジタル支援の実績',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
};

export default function Page() {
  return <WorksPageClient />;
}
