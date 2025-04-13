'use client';

import type React from 'react';
import Container from '~/components/custom/container';
import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import {
  Globe,
  Search,
  Smartphone,
  Users,
  PieChart,
  AlertTriangle,
  CheckCircle,
  Clock,
} from 'lucide-react';

// 課題データの型定義
interface Challenge {
  category: string;
  icon: React.ElementType;
  examples: string[];
}

// 課題データ本体 (強調キーワードを ** で囲む)
const challengesData: Challenge[] = [
  {
    category: '集客・見込み客獲得',
    icon: Users,
    examples: [
      'ホームページはあるけど、**見込み客からの問い合わせ**がほとんどない',
      '**SNSやGoogle広告**を使っているが、サイトの成約率が低い',
      '自社の**強みや特徴**をうまくアピールできていない',
    ],
  },
  {
    category: 'デザインと使いやすさ',
    icon: Globe,
    examples: [
      '**デザインが古く**なり、企業イメージと合わなくなってきている',
      '**更新が難しい**システムで、情報が最新ではない',
      '**必要な情報**を見つけるのが難しいとお客様から言われる',
    ],
  },
  {
    category: 'モバイル対応',
    icon: Smartphone,
    examples: [
      '**スマホで見たとき**に崩れたり、見にくかったりする',
      '**表示が遅い**ため、訪問者がすぐに離脱してしまう',
      '**スマホからの問い合わせ**がしづらく、機会損失が発生している',
    ],
  },
  {
    category: '検索エンジン対策',
    icon: Search,
    examples: [
      '**Googleでの検索順位**が低く、競合他社に負けている',
      '**アクセス解析**をしておらず、訪問者の行動が把握できていない',
      '**集客できるコンテンツ**が少なく、サイトの滞在時間が短い',
    ],
  },
];

// 強調テキストをレンダリングするヘルパー関数
const renderHighlightedText = (text: string, parentKey: string) => {
  const parts = text.split(/(\*{2}[^\*]+\*{2})/g).filter((part) => part); // 空文字列を除去
  return parts.map((part, index) => {
    const key = `${parentKey}-part-${index}`; // 親keyとindexで一意性を高める
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <span key={key} className="font-semibold">
          {part.slice(2, -2)} {/* アスタリスクを除去 */}
        </span>
      );
    }
    return <span key={key}>{part}</span>;
  });
};

const HomepageChallengesSection = () => {
  return (
    <section id="challenges" className="py-16 lg:py-32 bg-gray-50">
      <Container>
        {/* セクションヘッダー */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            こんな<span className="text-indigo-600">困りごと</span>
            、ありませんか？
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            多くの中小企業様が抱えている、Webサイトやホームページに関する「あるある」な悩みをご紹介します。
          </p>
        </div>

        {/* 課題カードのグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-4 mb-8">
          {challengesData.map((challenge) => (
            <Card
              key={challenge.category}
              className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-indigo-100 p-3 rounded-full flex-shrink-0">
                    <challenge.icon className="h-7 w-7 text-indigo-600" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    {challenge.category}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700">
                  {challenge.examples.map((example) => (
                    <li key={example} className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="flex-1">
                        {renderHighlightedText(example, example)}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 解決策提示カード */}
        <Card className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-xl overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <CheckCircle className="h-16 w-16 text-white opacity-90" />
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                  その悩み、
                  <span className="underline decoration-yellow-400 decoration-4 underline-offset-4">
                    集客に強いホームページ
                  </span>
                  で解決できます！
                </h3>
                <p className="text-lg opacity-95">
                  テンプレートではなく、お客様のビジネスに最適化したオリジナルデザインのホームページを制作します。
                  SEO対策やスマホ対応はもちろん、訪問者を顧客に変える導線設計で、問い合わせ数や売上のアップを実現します。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
};

export default HomepageChallengesSection;
