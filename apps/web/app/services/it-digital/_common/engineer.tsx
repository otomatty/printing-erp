'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '~/components/custom/container';

// エンジニア情報
const engineer = {
  name: '菅井 瑛正',
  icon: '/images/akimasapf.webp', // 実際の画像パスに変更してください
  specialties: [
    'フロントエンド開発',
    'UI/UXデザイン',
    'バックエンド開発',
    'AI',
    'DX',
  ],
  bio: 'はじめまして、菅井瑛正と申します。ウェブ開発からデザイン、ビジネス戦略まで幅広い領域でプロジェクトに携わってまいりました。\n\n最新技術を活用したサイト制作と業務効率化に取り組み、使いやすさと表示速度を重視しています。また、顧客の課題を理解し、集客や売上向上につながる戦略的な提案も行っています。\n\nニイヌマ企画印刷様との協業を通じて、印刷技術とデジタル技術を融合した新しいサービスづくりに貢献できることを楽しみにしています。',
  website: 'https://saedgewell.net',
};

// 段落ごとにIDを付与
const bioParagraphs = engineer.bio.split('\n\n').map((paragraph, index) => ({
  id: `bio-paragraph-${index}`,
  text: paragraph,
}));

const HomepageEngineers = () => {
  return (
    <section className="py-16 lg:py-32">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end gap-8">
          <div className="flex flex-col items-center md:w-1/3">
            <p className="text-blue-900 font-medium text-center mb-4">
              提携エンジニア
            </p>
            <div className="w-40 h-40 relative mb-4">
              <Image
                src={engineer.icon}
                alt={`${engineer.name}のアイコン`}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 text-center">
              {engineer.name}
            </h3>
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {engineer.specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          <div className="md:w-2/3 space-y-4">
            {bioParagraphs.map((paragraph) => (
              <p
                key={paragraph.id}
                className="text-gray-700 mb-4 leading-relaxed"
              >
                {paragraph.text}
              </p>
            ))}

            <div className="text-right mt-4">
              <Link
                href={engineer.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:text-blue-800 transition-colors"
              >
                <span>個人サイトを見る</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <title>外部リンク</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HomepageEngineers;
