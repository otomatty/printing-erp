'use client';

import type React from 'react';
import { useState } from 'react';
import Container from '~/components/custom/container';
import Image from 'next/image';
import {
  Briefcase,
  Target,
  BarChart,
  MessageSquare,
  Sparkles,
  ChevronRight, // Used in Mobile view
} from 'lucide-react'; // アイコン例

// Import BentoGrid components
import { BentoGrid, BentoCard } from '~/components/custom/bento-grid';
// Import ResponsiveDialog
import { ResponsiveDialog } from '@kit/ui/responsive-dialog';

// ケーススタディのデータ型定義
interface CaseStudy {
  id: string;
  tabName: string; // タブに表示する名前 (例: "A社: 製造業")
  companyInfo: string; // 会社情報（例: "製造業 A社様"）
  problem: {
    title: string;
    description: string;
    icon: React.ElementType;
  };
  solution: {
    title: string;
    description: string;
    icon: React.ElementType;
  };
  result: {
    title: string;
    description: string;
    highlight: string; // 強調したい成果 (例: "コスト30%削減")
    icon: React.ElementType;
  };
  testimonial: {
    quote: string;
    customer: string; // 顧客情報 (例: "代表取締役 B様")
    icon: React.ElementType;
  };
  imageUrl: string; // 画像URL (プレースホルダー)
}

// データ (最低3件用意)
const caseStudiesData: CaseStudy[] = [
  {
    id: 'case1',
    tabName: 'A社: 製造業',
    companyInfo: '製造業 A社様',
    problem: {
      title: '悩み: 在庫管理が大変',
      description:
        '手作業での在庫確認で時間がかかり、数え間違いや在庫切れが頻繁に発生していました。',
      icon: Target,
    },
    solution: {
      title: '解決策: 在庫システム導入',
      description:
        'リアルタイムで在庫確認ができ、不足時に自動通知するバーコード対応の専用システムを開発しました。',
      icon: Briefcase,
    },
    result: {
      title: '変化: 棚卸しが大幅に効率化',
      description:
        '棚卸し時間が1/5に短縮。在庫切れ防止と発注ミス減少で業務効率が向上しました。',
      highlight: '棚卸時間 80%削減',
      icon: BarChart,
    },
    testimonial: {
      quote:
        '月末の棚卸しが楽になり、在庫切れの心配もなくなって顧客からの信頼も上がりました。',
      customer: '生産管理部 部長 C様',
      icon: MessageSquare,
    },
    imageUrl:
      'https://via.placeholder.com/600x400/e0f2fe/0c4a6e?text=Inventory+System', // 青系のプレースホルダー
  },
  {
    id: 'case2',
    tabName: 'B社: サービス業',
    companyInfo: 'サービス業 B社様',
    problem: {
      title: '悩み: 予約管理のミス',
      description:
        '電話予約が中心で重複や連絡ミスが発生。顧客情報管理も散在していました。',
      icon: Target,
    },
    solution: {
      title: '解決策: 予約・顧客管理システム',
      description:
        '24時間ネット予約と自動リマインダー機能を実装。顧客情報も一元管理できるシステムを構築しました。',
      icon: Briefcase,
    },
    result: {
      title: '変化: 予約業務の自動化',
      description:
        '予約受付の手間が7割減少し、ミスもなくなりました。顧客対応も向上しています。',
      highlight: '予約作業 70%削減',
      icon: BarChart,
    },
    testimonial: {
      quote:
        'スタッフがサービス提供に集中でき、お客様からも「予約が簡単になった」と好評です。',
      customer: '店長 D様',
      icon: MessageSquare,
    },
    imageUrl:
      'https://via.placeholder.com/600x400/fef3c7/9a3412?text=CRM+%26+Booking', // 黄色系のプレースホルダー
  },
  {
    id: 'case3',
    tabName: 'C社: 小売業',
    companyInfo: '小売業 C社様',
    problem: {
      title: '悩み: レジと売上管理',
      description:
        'バーコードなしの商品が多く会計に時間がかかり、売上データ集計も手作業で残業の原因に。',
      icon: Target,
    },
    solution: {
      title: '解決策: タッチ式レジと分析',
      description:
        '商品写真タップ式の簡単レジと自動売上分析システムを導入。スマホでもデータ確認可能に。',
      icon: Briefcase,
    },
    result: {
      title: '変化: 会計・分析の効率化',
      description:
        '会計時間半減でお客様の待ち時間も短縮。売上データをグラフ化し、人気商品が一目でわかるように。',
      highlight: '会計時間 50%短縮',
      icon: BarChart,
    },
    testimonial: {
      quote:
        '夜間の売上集計作業がなくなり、人気商品の把握や仕入れ判断も容易になりました。',
      customer: 'オーナー E様',
      icon: MessageSquare,
    },
    imageUrl:
      'https://via.placeholder.com/600x400/dcfce7/14532d?text=POS+System', // 緑系のプレースホルダー
  },
];

// -------------------------------------
// ダイアログコンテンツ (変更なし)
// -------------------------------------
const ProblemDialogContent: React.FC<{ problem: CaseStudy['problem'] }> = ({
  problem,
}) => (
  <div className="py-4">
    <div className="flex items-center mb-4 text-blue-600">
      <problem.icon className="w-6 h-6 mr-3" />
      <h3 className="text-xl font-semibold">{problem.title}</h3>
    </div>
    <p className="text-gray-700 mb-4">{problem.description}</p>
    <div className="bg-blue-50 p-4 rounded-md">
      <h4 className="font-medium mb-2">主な課題:</h4>
      <ul className="list-disc list-inside space-y-1 text-gray-700">
        <li>手作業での管理に時間がかかる</li>
        <li>リアルタイム情報が把握できない</li>
        <li>ミスや漏れが発生しやすい</li>
        <li>業務効率が悪く残業の原因に</li>
      </ul>
    </div>
  </div>
);

const SolutionDialogContent: React.FC<{ solution: CaseStudy['solution'] }> = ({
  solution,
}) => (
  <div className="py-4">
    <div className="flex items-center mb-4 text-blue-600">
      <solution.icon className="w-6 h-6 mr-3" />
      <h3 className="text-xl font-semibold">{solution.title}</h3>
    </div>
    <p className="text-gray-700 mb-4">{solution.description}</p>
    <div className="bg-blue-50 p-4 rounded-md">
      <h4 className="font-medium mb-2">システムの主な機能:</h4>
      <ul className="list-disc list-inside space-y-1 text-gray-700">
        <li>簡単操作で誰でも使える画面</li>
        <li>データをリアルタイムで確認可能</li>
        <li>自動通知機能で漏れを防止</li>
        <li>履歴管理で過去データも確認可能</li>
        <li>複数拠点のデータを一元管理</li>
      </ul>
    </div>
  </div>
);

const ResultDialogContent: React.FC<{ result: CaseStudy['result'] }> = ({
  result,
}) => (
  <div className="py-4">
    <div className="flex items-center mb-4 text-blue-600">
      <result.icon className="w-6 h-6 mr-3" />
      <h3 className="text-xl font-semibold">{result.title}</h3>
    </div>
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-5 rounded-lg text-white text-center mb-6">
      <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-80" />
      <p className="text-3xl font-bold mb-1">{result.highlight}</p>
      <p className="opacity-90">達成！</p>
    </div>
    <p className="text-gray-700 mb-4">{result.description}</p>
    <div className="bg-blue-50 p-4 rounded-md">
      <h4 className="font-medium mb-2">主な改善点:</h4>
      <ul className="list-disc list-inside space-y-1 text-gray-700">
        <li>作業時間の大幅短縮</li>
        <li>ミスがほぼゼロに</li>
        <li>在庫切れや過剰在庫の減少</li>
        <li>担当者の負担軽減</li>
        <li>データに基づく意思決定が可能に</li>
      </ul>
    </div>
  </div>
);

const TestimonialDialogContent: React.FC<{
  testimonial: CaseStudy['testimonial'];
}> = ({ testimonial }) => (
  <div className="py-4">
    <div className="flex items-center mb-4 text-blue-600">
      <testimonial.icon className="w-6 h-6 mr-3" />
      <h3 className="text-xl font-semibold">
        お客様の声: {testimonial.customer}
      </h3>
    </div>
    <div className="bg-blue-50 p-6 rounded-lg mb-6">
      <p className="text-gray-700 text-lg italic mb-4">"{testimonial.quote}"</p>
      <p className="text-right font-medium text-blue-700">
        - {testimonial.customer}
      </p>
    </div>
    <div className="space-y-4">
      <h4 className="font-medium">主な変化:</h4>
      <p className="text-gray-700">
        導入前は手作業での管理に多くの時間を費やしていましたが、システム導入後は業務が効率化され、本来の仕事に集中できるようになりました。
      </p>
      <p className="text-gray-700">
        データがいつでも確認できるようになり、迅速な判断や計画立案も容易になりました。お客様対応の質も向上しています。
      </p>
    </div>
  </div>
);

const ImageDialogContent: React.FC<{ caseStudy: CaseStudy }> = ({
  caseStudy,
}) => (
  <div className="py-4">
    <h3 className="text-xl font-semibold mb-4">
      {caseStudy.solution.title.split(':')[0]} - 実際の画面例
    </h3>
    <div className="relative w-full h-[300px] md:h-[400px] mb-4">
      <Image
        src={caseStudy.imageUrl}
        alt={`${caseStudy.tabName} システム画面`}
        fill
        className="object-contain rounded-md"
      />
    </div>
    <p className="text-gray-700">
      {caseStudy.companyInfo}向けに作った
      {caseStudy.solution.title.split(':')[1]?.trim() ?? 'システム'}
      の実際の画面です。
      誰でも直感的に使えて、知りたい情報がすぐに見つかるように工夫しました。
    </p>
  </div>
);

const HighlightDialogContent: React.FC<{ result: CaseStudy['result'] }> = ({
  result,
}) => (
  <div className="py-4">
    <h3 className="text-xl font-semibold mb-6 text-center">
      {result.title.split(':')[0]}
    </h3>
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 rounded-lg text-white text-center mb-6">
      <Sparkles className="w-10 h-10 mx-auto mb-3 opacity-80" />
      <p className="text-4xl font-bold mb-2">{result.highlight}</p>
      <p className="text-lg opacity-90">達成！</p>
    </div>
    <p className="text-gray-700 mb-6">{result.description}</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-blue-50 p-4 rounded-md">
        <h4 className="font-medium mb-2">導入前:</h4>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>多くの時間と人手が必要</li>
          <li>ミスや二重作業が発生</li>
          <li>情報確認に手間がかかる</li>
        </ul>
      </div>
      <div className="bg-green-50 p-4 rounded-md">
        <h4 className="font-medium mb-2">導入後:</h4>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>作業時間と人員を大幅削減</li>
          <li>自動化でミスがほぼゼロに</li>
          <li>情報がすぐに確認可能に</li>
        </ul>
      </div>
    </div>
  </div>
);

// -------------------------------------
// スマホ用表示コンポーネント
// -------------------------------------
interface MobileCaseStudyViewProps {
  caseStudy: CaseStudy;
}

const MobileCaseStudyView: React.FC<MobileCaseStudyViewProps> = ({
  caseStudy,
}) => {
  // 各セクションをダイアログで表示するためのトリガーコンポーネント
  const MobileDialogTrigger: React.FC<{
    icon: React.ElementType;
    title: string;
    description: string;
    children: React.ReactNode;
    dialogTitle: string;
  }> = ({ icon: Icon, title, description, children, dialogTitle }) => (
    <ResponsiveDialog
      trigger={
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4 cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center mb-2">
              <div className="bg-blue-100 rounded-full p-2 mr-3">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 text-base">{title}</h4>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-gray-600 text-sm pl-10">{description}</p>
        </div>
      }
      title={dialogTitle}
      className="overflow-hidden"
    >
      <div className="overflow-y-auto max-h-[70vh] touch-auto -mx-6 px-6 pb-6 -webkit-overflow-scrolling-touch">
        {children}
      </div>
    </ResponsiveDialog>
  );

  return (
    <div className="space-y-6">
      {/* 悩み */}
      <MobileDialogTrigger
        icon={caseStudy.problem.icon}
        title={caseStudy.problem.title}
        description={caseStudy.problem.description}
        dialogTitle={`${caseStudy.companyInfo} - ${caseStudy.problem.title}`}
      >
        <ProblemDialogContent problem={caseStudy.problem} />
      </MobileDialogTrigger>

      {/* 解決策 */}
      <MobileDialogTrigger
        icon={caseStudy.solution.icon}
        title={caseStudy.solution.title}
        description={caseStudy.solution.description}
        dialogTitle={`${caseStudy.companyInfo} - ${caseStudy.solution.title}`}
      >
        <SolutionDialogContent solution={caseStudy.solution} />
      </MobileDialogTrigger>

      {/* 変化 (成果) */}
      <MobileDialogTrigger
        icon={caseStudy.result.icon}
        title={caseStudy.result.title}
        description={caseStudy.result.description}
        dialogTitle={`${caseStudy.companyInfo} - ${caseStudy.result.title}`}
      >
        <ResultDialogContent result={caseStudy.result} />
      </MobileDialogTrigger>

      {/* 画像 */}
      <ResponsiveDialog
        trigger={
          <div className="relative w-full h-[200px] rounded-lg overflow-hidden shadow-sm cursor-pointer mb-4">
            <Image
              src={caseStudy.imageUrl}
              alt={`${caseStudy.tabName} システム画面`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <span className="text-white text-sm font-medium">
                拡大して見る
              </span>
            </div>
          </div>
        }
        title={`${caseStudy.companyInfo} - システム画面`}
        className="overflow-hidden"
      >
        <div className="overflow-y-auto max-h-[70vh] touch-auto -mx-6 px-6 pb-6 -webkit-overflow-scrolling-touch">
          <ImageDialogContent caseStudy={caseStudy} />
        </div>
      </ResponsiveDialog>

      {/* お客様の声 */}
      <MobileDialogTrigger
        icon={caseStudy.testimonial.icon}
        title={`お客様の声: ${caseStudy.testimonial.customer}`}
        description={`"${caseStudy.testimonial.quote}"`}
        dialogTitle={`${caseStudy.companyInfo} - お客様の声`}
      >
        <TestimonialDialogContent testimonial={caseStudy.testimonial} />
      </MobileDialogTrigger>
    </div>
  );
};

// -------------------------------------
// メインコンポーネント
// -------------------------------------
const SystemCaseStudiesSection: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>(
    caseStudiesData[0]?.id || ''
  ); // 初期表示は最初のタブ、データがない場合は空文字列

  const activeCaseStudy = caseStudiesData.find((cs) => cs.id === activeTabId);

  return (
    <section className="py-16 lg:py-32 bg-white">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-12">
          導入事例・お客様の声
        </h2>

        {/* タブ部分 */}
        <div
          className="flex justify-start md:justify-center space-x-4 mb-10 border-b border-gray-200 overflow-x-auto whitespace-nowrap pb-1 px-2"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <style jsx>{`
						div::-webkit-scrollbar {
							display: none;
						}
					`}</style>
          {caseStudiesData.map((cs) => (
            <button
              key={cs.id}
              type="button"
              onClick={() => setActiveTabId(cs.id)}
              className={`py-3 px-4 text-sm font-medium focus:outline-none inline-block flex-shrink-0 ${
                activeTabId === cs.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
              }`}
            >
              {cs.tabName}
            </button>
          ))}
        </div>

        {activeCaseStudy && (
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-semibold text-center mb-8">
              {activeCaseStudy.companyInfo} の導入事例
            </h3>

            {/* スマホ用表示 (md未満) */}
            <div className="md:hidden">
              <MobileCaseStudyView caseStudy={activeCaseStudy} />
            </div>

            {/* タブレット・PC用表示 (md以上) */}
            <div className="hidden md:block">
              {/* レスポンシブ対応: mdで6列、lgで12列 */}
              <BentoGrid className="md:grid-cols-6 lg:grid-cols-12">
                {/* 1. 課題 */}
                <ResponsiveDialog
                  trigger={
                    <BentoCard
                      name={activeCaseStudy.problem.title}
                      className="col-span-12 md:col-span-3 lg:col-span-4 cursor-pointer"
                      background={
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white to-white dark:from-neutral-900/50 dark:via-neutral-950 dark:to-neutral-950 opacity-90" />
                      }
                      Icon={activeCaseStudy.problem.icon}
                      description={activeCaseStudy.problem.description}
                      cta="詳しく見る"
                    />
                  }
                  title={`${activeCaseStudy.companyInfo} - ${activeCaseStudy.problem.title}`}
                  className="overflow-hidden"
                >
                  <div className="overflow-y-auto max-h-[70vh] touch-auto -mx-6 px-6 pb-6 -webkit-overflow-scrolling-touch">
                    <ProblemDialogContent problem={activeCaseStudy.problem} />
                  </div>
                </ResponsiveDialog>

                {/* 2. 導入システム */}
                <ResponsiveDialog
                  trigger={
                    <BentoCard
                      name={activeCaseStudy.solution.title}
                      className="col-span-12 md:col-span-3 lg:col-span-4 cursor-pointer"
                      background={
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white to-white dark:from-neutral-900/50 dark:via-neutral-950 dark:to-neutral-950 opacity-90" />
                      }
                      Icon={activeCaseStudy.solution.icon}
                      description={activeCaseStudy.solution.description}
                      cta="詳しく見る"
                    />
                  }
                  title={`${activeCaseStudy.companyInfo} - ${activeCaseStudy.solution.title}`}
                  className="overflow-hidden"
                >
                  <div className="overflow-y-auto max-h-[70vh] touch-auto -mx-6 px-6 pb-6 -webkit-overflow-scrolling-touch">
                    <SolutionDialogContent
                      solution={activeCaseStudy.solution}
                    />
                  </div>
                </ResponsiveDialog>

                {/* 3. 画像 */}
                <ResponsiveDialog
                  trigger={
                    <BentoCard
                      name=""
                      className="col-span-12 md:col-span-3 md:row-span-2 lg:col-span-4 lg:row-span-2 p-0 overflow-hidden cursor-pointer min-h-[200px]"
                      background={
                        <Image
                          src={activeCaseStudy.imageUrl}
                          alt={`${activeCaseStudy.tabName} system image`}
                          fill
                          className="object-cover absolute inset-0 transition-transform duration-300 ease-in-out group-hover:scale-105"
                        />
                      }
                      Icon={() => null}
                      description="システム画面例"
                      cta="拡大して見る"
                    />
                  }
                  title={`${activeCaseStudy.companyInfo} - システム画面`}
                  className="overflow-hidden"
                >
                  <div className="overflow-y-auto max-h-[70vh] touch-auto -mx-6 px-6 pb-6 -webkit-overflow-scrolling-touch">
                    <ImageDialogContent caseStudy={activeCaseStudy} />
                  </div>
                </ResponsiveDialog>

                {/* 4. 成果ハイライト */}
                <ResponsiveDialog
                  trigger={
                    <BentoCard
                      name={activeCaseStudy.result.highlight}
                      className="col-span-12 md:col-span-3 lg:col-span-4 cursor-pointer"
                      background={
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white to-white dark:from-neutral-900/50 dark:via-neutral-950 dark:to-neutral-950 opacity-90" />
                      }
                      Icon={Sparkles}
                      description={`${activeCaseStudy.result.highlight}を達成`}
                      cta="詳しく見る"
                    />
                  }
                  title={`${activeCaseStudy.companyInfo} - 導入による変化`}
                  className="overflow-hidden"
                >
                  <div className="overflow-y-auto max-h-[70vh] touch-auto -mx-6 px-6 pb-6 -webkit-overflow-scrolling-touch">
                    <HighlightDialogContent result={activeCaseStudy.result} />
                  </div>
                </ResponsiveDialog>

                {/* 5. 成果詳細 */}
                <ResponsiveDialog
                  trigger={
                    <BentoCard
                      name={activeCaseStudy.result.title}
                      className="col-span-12 md:col-span-3 lg:col-span-4 cursor-pointer"
                      background={
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white to-white dark:from-neutral-900/50 dark:via-neutral-950 dark:to-neutral-950 opacity-90" />
                      }
                      Icon={activeCaseStudy.result.icon}
                      description={activeCaseStudy.result.description}
                      cta="詳しく見る"
                    />
                  }
                  title={`${activeCaseStudy.companyInfo} - ${activeCaseStudy.result.title}`}
                  className="overflow-hidden"
                >
                  <div className="overflow-y-auto max-h-[70vh] touch-auto -mx-6 px-6 pb-6 -webkit-overflow-scrolling-touch">
                    <ResultDialogContent result={activeCaseStudy.result} />
                  </div>
                </ResponsiveDialog>

                {/* 6. お客様の声 */}
                <ResponsiveDialog
                  trigger={
                    <BentoCard
                      name={`お客様の声: ${activeCaseStudy.testimonial.customer}`}
                      className="col-span-12 md:col-span-6 lg:col-span-12 cursor-pointer"
                      background={
                        <div className="absolute inset-0 bg-blue-50/80 dark:bg-blue-900/50 opacity-90" />
                      }
                      Icon={activeCaseStudy.testimonial.icon}
                      description={`"${activeCaseStudy.testimonial.quote}"`}
                      cta="詳しく見る"
                    />
                  }
                  title={`${activeCaseStudy.companyInfo} - お客様の声`}
                  className="overflow-hidden"
                >
                  <div className="overflow-y-auto max-h-[70vh] touch-auto -mx-6 px-6 pb-6 -webkit-overflow-scrolling-touch">
                    <TestimonialDialogContent
                      testimonial={activeCaseStudy.testimonial}
                    />
                  </div>
                </ResponsiveDialog>
              </BentoGrid>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default SystemCaseStudiesSection;
