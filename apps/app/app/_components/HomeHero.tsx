'use client';
import React from 'react';
import Link from 'next/link';

export function HomeHero() {
  return (
    <section className="relative bg-[url('/images/hero-bg.jpg')] bg-cover bg-center py-32">
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative container mx-auto px-4 text-center text-white">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
          印刷業務をもっとスマートに
        </h1>
        <p className="text-xl mb-8 drop-shadow">
          印刷会社のオンライン入稿・管理システムで、印刷業務の効率化を実現します。デザインから入稿、納品までをシームレスに管理。
        </p>
        <div className="flex justify-center gap-4">
          <button
            type="button"
            disabled
            className="bg-primary/80 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-primary/90 transition"
          >
            近日公開予定
          </button>
          <Link
            href="/features"
            className="bg-white text-primary font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition"
          >
            機能を見る
          </Link>
        </div>
      </div>
    </section>
  );
}
