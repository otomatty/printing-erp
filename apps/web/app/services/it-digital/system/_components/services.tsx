'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Container from '~/components/custom/container';
import { categories, allSystems } from '../_data';
import { ChevronDown } from 'lucide-react';
import SectionTitle from '../../_common/section-title';

export function SystemServicesSection() {
  const [activeCategory, setActiveCategory] = useState('business');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // アクティブなカテゴリの名前を取得
  const getActiveCategoryName = () => {
    const category = categories.find((cat) => cat.id === activeCategory);
    return category ? category.name : '';
  };

  // ドロップダウンを切り替える
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // カテゴリ選択時の処理
  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
    setIsDropdownOpen(false);
  };

  return (
    <section className="py-16 lg:py-32 bg-gray-50">
      <Container>
        <SectionTitle
          title="お客様の会社に"
          highlightedText="ぴったりの"
          afterHighlightedText="業務システム"
          description="面倒な作業を減らし、仕事をスムーズにする業務システムをお作りします。お客様の普段の仕事の進め方に合わせて、使いやすいシステムに仕上げます。"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
            <Image
              src="/images/it-digital/table-discussion.webp" // 実際の画像パスに置き換えが必要
              alt="業務システム開発のプロセスイメージ"
              fill
              className="object-contain"
            />
          </div>

          <div>
            <h3 className="text-2xl lg:text-3xl font-bold mb-6">
              <span className="text-primary">使いやすさにこだわった</span>
              <br />
              システムづくり
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              「難しそう」「使いこなせるか心配」という声にお応えして、シンプルで直感的に使えるシステムを目指します。
              毎日の仕事がラクになり、本来の業務に集中できる環境をお届けします。
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <title>便利なツールアイコン</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">
                    便利な最新ツール活用
                  </h4>
                  <p className="text-gray-600">
                    複雑な計算や繰り返しの作業は便利なツールにお任せ。手作業で何時間もかかっていた作業が数分で完了します。
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <title>現場ヒアリングアイコン</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">
                    現場の声をしっかり聞く
                  </h4>
                  <p className="text-gray-600">
                    実際に使う方々の「こうだったら便利」という声を大切に。押し付けのシステムではなく、本当に役立つ機能を実現します。
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <title>専門知識アイコン</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">
                    経験豊富な専門家
                  </h4>
                  <p className="text-gray-600">
                    「見た目が使いやすい」「操作がシンプル」なシステム作りのプロが、わかりやすく安心して使えるシステムを提供します。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <SectionTitle
            title="こんな"
            highlightedText="お役立ちシステム"
            afterHighlightedText="を作れます"
            className="mb-8"
          />

          {/* モバイル用ドロップダウン (md未満で表示) */}
          <div className="md:hidden mb-8">
            <button
              type="button"
              onClick={toggleDropdown}
              className="w-full py-3 px-4 bg-white border border-gray-300 rounded-lg flex justify-between items-center shadow-sm"
              aria-expanded={isDropdownOpen}
            >
              <span className="font-medium text-gray-700">
                {getActiveCategoryName()}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="mt-2 py-2 bg-white border border-gray-300 rounded-lg shadow-lg absolute z-10 left-4 right-4">
                {categories.map((category) => (
                  <button
                    type="button"
                    key={category.id}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-100 ${activeCategory === category.id ? 'text-primary font-medium' : 'text-gray-700'}`}
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* タブレット・デスクトップ用タブ (md以上で表示) */}
          <div className="hidden md:block mb-8 border-b border-gray-200">
            <div className="flex flex-wrap -mb-px justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`inline-block py-4 px-6 text-sm font-medium text-center rounded-t-lg border-b-2 ${
                    activeCategory === category.id
                      ? 'text-primary border-primary'
                      : 'text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300'
                  } relative`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                  {activeCategory === category.id && (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* システムタイプのグリッド表示 - レスポンシブ対応 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
            {allSystems[activeCategory as keyof typeof allSystems].map(
              (system) => (
                <div
                  key={`${activeCategory}-${system.title}`}
                  className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200"
                >
                  {/* モバイル用の横並びレイアウト */}
                  <div className="flex items-center sm:flex-col sm:items-center">
                    <div className="mr-4 sm:mr-0 sm:mb-2">{system.icon}</div>
                    <h3 className="font-medium text-gray-800 sm:text-center">
                      {system.title}
                    </h3>
                  </div>
                </div>
              )
            )}
          </div>

          {/* カスタムシステム構築のボックス */}
          <div className="mt-12 bg-primary/5 border border-primary/30 p-8 rounded-lg">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <title>カスタム開発アイコン</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">
                  <span className="text-primary">「これが欲しかった！」</span>
                  と言われるシステムを
                </h3>
                <p className="text-lg text-gray-700">
                  上に挙げたのはほんの一例です。印刷業、製造業、小売業など、どんな業種でも、あなたの会社の「困った」を解決するシステムをお作りします。
                  いまあるシステムの改良から、まったく新しいシステムまで、日々の業務を楽にする仕組みをご提案します。
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
