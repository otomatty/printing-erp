'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '~/components/custom/container';
import { Button } from '@kit/ui/button';

const HomepageHeroSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-indigo-50 to-white py-20 lg:py-32">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              集客に<span className="text-primary">強い</span>
              <br />
              ホームページ制作
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              お客様のビジネスを成功に導くホームページを制作します。
              デザイン性と機能性を兼ね備え、見込み客の集客から売上アップまで実現するWebサイトをご提供します。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg">
                <Link href="/estimate?service=homepage">自動見積もり</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="#features">詳細を見る</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[300px] lg:h-[450px] rounded-xl overflow-hidden">
            <Image
              src="/images/it-digital/website.webp" // 仮画像パス、実際の画像に置き換えが必要
              alt="ホームページ制作イメージ"
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

export default HomepageHeroSection;
