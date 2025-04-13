'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '~/components/custom/container';
import { Button } from '@kit/ui/button';

const SystemHeroSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white py-20 lg:py-32">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              業務を<span className="text-blue-600">効率化する</span>
              <br />
              システム開発サービス
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              お客様のビジネスに最適な業務システムを開発・導入し、業務効率化を実現します。
              独自のノウハウと豊富な実績をもとに、コスト削減から生産性向上まで、お客様の課題を解決するシステムをご提供します。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg">
                <Link href="/estimate?service=system">自動見積もり</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="#features">詳細を見る</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[300px] lg:h-[450px] rounded-xl overflow-hidden">
            <Image
              src="/images/system-hero.jpg" // 仮画像パス、実際の画像に置き換えが必要
              alt="業務システム開発イメージ"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SystemHeroSection;
