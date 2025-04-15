'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// 画像を静的インポート
import work1Image from '@/public/placeholders/work-1.jpg';
import work2Image from '@/public/placeholders/work-2.jpg';
import work3Image from '@/public/placeholders/work-3.jpg';
import work4Image from '@/public/placeholders/work-4.jpg';
import work5Image from '@/public/placeholders/work-5.jpg';
import work6Image from '@/public/placeholders/work-6.jpg';

// 制作事例データ
const works = [
  {
    id: 'work-1',
    title: '飲食店メニュー・ブランディング',
    category: 'グラフィックデザイン',
    description:
      '地元の洋食レストランのメニューとブランディングツールを一新。高級感と親しみやすさを両立させたデザインで来店客増加に貢献しました。',
    client: 'レストランMORIMOTO様',
    image: work1Image,
    tags: ['メニューデザイン', 'ロゴデザイン', 'ブランディング'],
  },
  {
    id: 'work-2',
    title: '企業パンフレット制作',
    category: '印刷物デザイン',
    description:
      '建設会社の会社案内パンフレット制作。企業の強みが伝わるよう、写真とレイアウトにこだわり、信頼感のあるデザインに仕上げました。',
    client: '山田建設株式会社様',
    image: work2Image,
    tags: ['パンフレット', '企業案内', '写真撮影'],
  },
  {
    id: 'work-3',
    title: 'イベント告知ポスター',
    category: 'ポスターデザイン',
    description:
      '地域の文化祭イベントのポスターデザイン。目を引くビジュアルと必要情報を見やすく配置し、多くの参加者を集めることに成功しました。',
    client: '市民文化祭実行委員会様',
    image: work3Image,
    tags: ['ポスター', 'イベント告知', 'グラフィックデザイン'],
  },
  {
    id: 'work-4',
    title: 'オリジナル名刺デザイン',
    category: '名刺デザイン',
    description:
      'フリーランスのプロカメラマン様の名刺デザイン。高級感のある紙材と特殊印刷を使用し、写真家の個性と品質の高さを表現しました。',
    client: '鈴木写真事務所様',
    image: work4Image,
    tags: ['名刺', '特殊印刷', 'ブランディング'],
  },
  {
    id: 'work-5',
    title: '季節限定商品パッケージ',
    category: 'パッケージデザイン',
    description:
      '洋菓子店の季節限定商品パッケージデザイン。春をテーマにした華やかなデザインで、ギフト需要を大幅に増加させました。',
    client: 'パティスリーYUKI様',
    image: work5Image,
    tags: ['パッケージ', '季節限定', 'ギフト商品'],
  },
  {
    id: 'work-6',
    title: '会社案内リーフレット',
    category: '印刷物デザイン',
    description:
      'ITサービス企業の会社案内リーフレット。最新技術を扱う企業イメージに合わせて、モダンでクリーンなデザインを採用しました。',
    client: 'テックソリューション株式会社様',
    image: work6Image,
    tags: ['リーフレット', '企業案内', 'デジタル印刷'],
  },
];

export default function WorksList() {
  // アニメーション設定
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const imageHover = {
    scale: 1.05,
    transition: { duration: 0.3 },
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {works.map((work) => (
            <Link href={`/works/${work.id}`} key={work.id} className="block">
              <motion.div
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-all hover:shadow-lg h-full"
                variants={item}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <div className="relative h-60 overflow-hidden">
                  <motion.div className="h-full w-full" whileHover={imageHover}>
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      placeholder="blur"
                    />
                  </motion.div>
                </div>
                <div className="p-6">
                  <div className="mb-2">
                    <motion.span
                      className="inline-block bg-primary/5 text-primary text-xs font-medium px-2 py-1 rounded"
                      whileHover={{ scale: 1.05 }}
                    >
                      {work.category}
                    </motion.span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    {work.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                    {work.description}
                  </p>
                  <div className="text-xs text-gray-500">
                    クライアント: {work.client}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
