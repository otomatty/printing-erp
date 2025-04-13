'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Container from '~/components/custom/container';
import { Button } from '@kit/ui/button';
import Link from 'next/link';
import { categories, allSites, type SiteItem } from '../_data';
import { ChevronDown } from 'lucide-react';

export function HomepageServicesSection() {
  const [activeCategory, setActiveCategory] = useState('corporate');
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
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="text-indigo-600">お客様のビジネスに合った</span>
            ホームページ制作
          </h2>
          <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-600">
            集客や問い合わせにつながるホームページを制作します。
            お客様のビジネスに最適なデザインと機能で、目的達成をサポートします。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/images/homepage-development.jpg" // 実際の画像パスに置き換えが必要
              alt="ホームページ制作のイメージ"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h3 className="text-2xl lg:text-3xl font-bold mb-6">
              <span className="text-indigo-600">
                デザインと機能性を両立した
              </span>
              <br />
              Webサイト制作
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              「見た目が良いだけ」「機能だけが充実」ではなく、両方のバランスが取れたWebサイトをご提供します。
              訪問者の行動を促す設計で、成果につながるサイトを実現します。
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <title>モバイル対応アイコン</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">
                    完全レスポンシブ対応
                  </h4>
                  <p className="text-gray-600">
                    スマホ・タブレット・PCなど、どの端末からでも見やすいデザインを実現。訪問者を取りこぼしません。
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <title>SEO対策アイコン</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">
                    SEO内部対策標準装備
                  </h4>
                  <p className="text-gray-600">
                    検索エンジンからの流入を最大化する内部対策を全サイトに実施。自然検索からの集客力を高めます。
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <title>更新システムアイコン</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">
                    簡単更新システム
                  </h4>
                  <p className="text-gray-600">
                    専門知識がなくても更新できるCMS導入。最新情報の発信やコンテンツの追加が簡単に行えます。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl lg:text-3xl font-bold mb-8 text-center">
            こんな<span className="text-indigo-600">Webサイト</span>
            を作れます
          </h3>

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
                    className={`w-full text-left px-4 py-3 hover:bg-gray-100 ${activeCategory === category.id ? 'text-indigo-600 font-medium' : 'text-gray-700'}`}
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
                      ? 'text-indigo-600 border-indigo-600'
                      : 'text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300'
                  } relative`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                  {activeCategory === category.id && (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* サイトタイプのグリッド表示 - レスポンシブ対応 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
            {allSites[activeCategory as keyof typeof allSites].map(
              (site: SiteItem) => (
                <div
                  key={`${activeCategory}-${site.title}`}
                  className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200"
                >
                  {/* モバイル用の横並びレイアウト */}
                  <div className="flex items-center sm:flex-col sm:items-center">
                    <div className="mr-4 sm:mr-0 sm:mb-2">{site.icon}</div>
                    <h3 className="font-medium text-gray-800 sm:text-center">
                      {site.title}
                    </h3>
                  </div>
                </div>
              )
            )}
          </div>

          {/* カスタムサイト構築のボックス */}
          <div className="mt-12 bg-indigo-50 border-2 border-indigo-200 p-8 rounded-xl shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <title>カスタム開発アイコン</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  上記にないサイトもご相談ください！
                </h3>
                <p className="text-gray-700 mb-4">
                  お客様のビジネスに最適な機能を備えたオリジナルWebサイトを開発いたします。
                  一般的なテンプレートでは実現できない独自の機能やデザインも可能です。
                </p>
                <Button asChild size="lg">
                  <Link href="/estimate?service=homepage">無料でお見積り</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
