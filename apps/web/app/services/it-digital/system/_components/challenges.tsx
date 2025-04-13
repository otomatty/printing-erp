'use client';

import type React from 'react';
import Container from '~/components/custom/container';
import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import {
  Briefcase,
  Users,
  BarChart3,
  Wrench,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
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
    category: '日々の業務の悩み',
    icon: Clock,
    examples: [
      '**エクセルでの手作業**が多く、同じ入力を何度も繰り返して時間がかかる',
      '**伝票や注文書**の処理に追われ、ミスが発生することがある',
      '**電話やメール**でのやり取りが多すぎて、大事な連絡を見逃してしまう',
    ],
  },
  {
    category: '社内での情報共有',
    icon: Users,
    examples: [
      '**必要な資料**を探すのに時間がかかり、「どこにあるかわからない」とよく言われる',
      '**他の部署の進捗**がわからず、「聞かないとわからない」状態になっている',
      '**社員によって持っている情報**に差があり、お客様対応にバラつきが出てしまう',
    ],
  },
  {
    category: '売上や顧客の管理',
    icon: FileText,
    examples: [
      '**どの商品が売れているか**、数字はあるけれど傾向がパッと見てわからない',
      '**お客様の情報**が複数の場所に散らばっていて、まとめて見られない',
      '**月末の集計作業**に時間がかかり、翌月の計画に活かせていない',
    ],
  },
  {
    category: '古いやり方や道具の限界',
    icon: Wrench,
    examples: [
      '**昔からのやり方**を変えられず、若手社員から「非効率」と言われている',
      '**数年前に導入したソフト**が今の業務に合っておらず、使いづらい',
      '**紙での管理**が多く、保管場所や検索に困っている',
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

const SystemChallengesSection = () => {
  return (
    <section id="challenges" className="py-16 lg:py-32 bg-gray-50">
      <Container>
        {/* セクションヘッダー */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            こんな<span className="text-blue-600">困りごと</span>
            、ありませんか？
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            多くの中小企業様が日々感じている、業務の中での「あるある」な悩みをご紹介します。
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
                  <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                    <challenge.icon className="h-7 w-7 text-blue-600" />
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
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <CheckCircle className="h-16 w-16 text-white opacity-90" />
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                  その悩み、
                  <span className="underline decoration-yellow-400 decoration-4 underline-offset-4">
                    御社だけの業務システム
                  </span>
                  で解決できます！
                </h3>
                <p className="text-lg opacity-95">
                  市販ソフトでは対応しきれない、お客様の会社ならではの仕事の流れや困りごとに合わせたシステムをお作りします。
                  面倒な手作業を減らし、情報共有をスムーズにして、大切なデータを見やすくまとめることで、日々の業務がラクになり、会社の成長を後押しします。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
};

export default SystemChallengesSection;
