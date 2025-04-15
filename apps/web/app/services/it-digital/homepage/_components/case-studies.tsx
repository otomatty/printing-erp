'use client';

import type React from 'react';
import { useState } from 'react';
import Container from '~/components/custom/container';
import Image from 'next/image';
import {
  Globe,
  Target,
  BarChart,
  MessageSquare,
  Sparkles,
  ChevronRight, // Used in Mobile view
} from 'lucide-react'; // アイコン例

// Import BentoGrid components
import { BentoGrid, BentoCard } from '@kit/ui/bento-grid';
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
    tabName: 'A社: 小売業',
    companyInfo: '小売業 A社様',
    problem: {
      title: '悩み: 問い合わせが増えない',
      description:
        '10年前に作ったホームページが古く、スマートフォンでの閲覧ができないため、新規顧客からの問い合わせが減少していました。',
      icon: Target,
    },
    solution: {
      title: '解決策: レスポンシブサイト構築',
      description:
        'スマホ・タブレット・PCに対応したレスポンシブデザインの新サイトを制作。商品検索機能とお問い合わせフォームを強化しました。',
      icon: Globe,
    },
    result: {
      title: '変化: 問い合わせ数が3倍に',
      description:
        '新サイト公開後、月間問い合わせ数が3倍に増加。特にスマホからのアクセスが全体の65%を占めるようになりました。',
      highlight: '問合せ数 300%増',
      icon: BarChart,
    },
    testimonial: {
      quote:
        'スマホ対応のおかげで若い世代からの問い合わせが増え、新規顧客の獲得につながっています。デザインも評判が良いです。',
      customer: 'マーケティング部長 B様',
      icon: MessageSquare,
    },
    imageUrl:
      'https://via.placeholder.com/600x400/e0e7ff/3730a3?text=Responsive+Website', // インディゴ系のプレースホルダー
  },
  {
    id: 'case2',
    tabName: 'B社: サービス業',
    companyInfo: 'サービス業 B社様',
    problem: {
      title: '悩み: 運用負担が大きい',
      description:
        'ホームページの更新に専門業者への依頼が必要で、コストと時間がかかっていました。情報が古いままになることも多くありました。',
      icon: Target,
    },
    solution: {
      title: '解決策: CMS導入でラクラク更新',
      description:
        '直感的な管理画面を持つCMSを導入し、社内スタッフでも簡単に更新できるサイトを構築。ブログ機能で情報発信も強化しました。',
      icon: Globe,
    },
    result: {
      title: '変化: 更新頻度が大幅に向上',
      description:
        '更新回数が月1回から週2回に増加。常に最新情報が掲載されるようになり、SEO効果も向上しています。',
      highlight: '更新頻度 8倍に',
      icon: BarChart,
    },
    testimonial: {
      quote:
        '思いついたときにすぐ更新できるようになって便利です。外注コストも削減でき、最新情報を発信できるようになりました。',
      customer: '広報担当 C様',
      icon: MessageSquare,
    },
    imageUrl:
      'https://via.placeholder.com/600x400/ede9fe/5b21b6?text=CMS+Website', // 紫系のプレースホルダー
  },
  {
    id: 'case3',
    tabName: 'C社: 製造業',
    companyInfo: '製造業 C社様',
    problem: {
      title: '悩み: ブランドイメージが古い',
      description:
        '会社の成長に合わせたブランディングができておらず、Webサイトが企業イメージと合っていないという課題がありました。',
      icon: Target,
    },
    solution: {
      title: '解決策: ブランド再構築とデザイン',
      description:
        '企業理念や強みを明確に伝えるデザインと構成で、ブランド価値を高めるコーポレートサイトを新規構築しました。',
      icon: Globe,
    },
    result: {
      title: '変化: 企業イメージが向上',
      description:
        'サイト滞在時間が2倍に増加し、採用応募数も50%増加。取引先からの信頼度も向上しました。',
      highlight: '滞在時間 100%増',
      icon: BarChart,
    },
    testimonial: {
      quote:
        '社員も誇りを持てるサイトになり、お客様や取引先からの印象も大きく変わりました。採用面でも効果を感じています。',
      customer: '代表取締役 D様',
      icon: MessageSquare,
    },
    imageUrl:
      'https://via.placeholder.com/600x400/dbeafe/1e40af?text=Corporate+Site', // 青系のプレースホルダー
  },
];

// -------------------------------------
// ダイアログコンテンツ
// -------------------------------------
const ProblemDialogContent: React.FC<{ problem: CaseStudy['problem'] }> = ({
  problem,
}) => (
  <div className="py-4">
    <div className="flex items-center mb-4 text-indigo-600">
      <problem.icon className="w-6 h-6 mr-3" />
      <h3 className="text-xl font-semibold">{problem.title}</h3>
    </div>
    <p className="text-gray-700 mb-4">{problem.description}</p>
    <div className="bg-indigo-50 p-4 rounded-md">
      <h4 className="font-medium mb-2">主な課題:</h4>
      <ul className="list-disc list-inside space-y-1 text-gray-700">
        <li>古いデザインで企業イメージと合わない</li>
        <li>スマートフォン対応ができていない</li>
        <li>更新が難しく情報が古くなりがち</li>
        <li>検索エンジンでの表示順位が低い</li>
      </ul>
    </div>
  </div>
);

const SolutionDialogContent: React.FC<{ solution: CaseStudy['solution'] }> = ({
  solution,
}) => (
  <div className="py-4">
    <div className="flex items-center mb-4 text-indigo-600">
      <solution.icon className="w-6 h-6 mr-3" />
      <h3 className="text-xl font-semibold">{solution.title}</h3>
    </div>
    <p className="text-gray-700 mb-4">{solution.description}</p>
    <div className="bg-indigo-50 p-4 rounded-md">
      <h4 className="font-medium mb-2">ホームページの主な特徴:</h4>
      <ul className="list-disc list-inside space-y-1 text-gray-700">
        <li>スマホ・タブレット・PC対応のレスポンシブデザイン</li>
        <li>SEO対策済みで検索エンジンからの集客を強化</li>
        <li>簡単に更新できる管理画面を搭載</li>
        <li>問い合わせや資料請求フォームの設置</li>
        <li>Google Analyticsによるアクセス解析</li>
      </ul>
    </div>
  </div>
);

const ResultDialogContent: React.FC<{ result: CaseStudy['result'] }> = ({
  result,
}) => (
  <div className="py-4">
    <div className="flex items-center mb-4 text-indigo-600">
      <result.icon className="w-6 h-6 mr-3" />
      <h3 className="text-xl font-semibold">{result.title}</h3>
    </div>
    <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-5 rounded-lg text-white text-center mb-6">
      <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-80" />
      <p className="text-3xl font-bold mb-1">{result.highlight}</p>
      <p className="opacity-90">達成！</p>
    </div>
    <p className="text-gray-700 mb-4">{result.description}</p>
    <div className="bg-indigo-50 p-4 rounded-md">
      <h4 className="font-medium mb-2">主な改善点:</h4>
      <ul className="list-disc list-inside space-y-1 text-gray-700">
        <li>問い合わせ数の増加</li>
        <li>サイト滞在時間の延長</li>
        <li>情報更新の頻度向上</li>
        <li>スマホからのアクセス増加</li>
        <li>企業ブランドイメージの向上</li>
      </ul>
    </div>
  </div>
);

const TestimonialDialogContent: React.FC<{
  testimonial: CaseStudy['testimonial'];
}> = ({ testimonial }) => (
  <div className="py-4">
    <div className="bg-indigo-50 p-6 rounded-xl mb-6">
      <div className="mb-4 text-indigo-600">
        <testimonial.icon className="w-10 h-10 mx-auto" />
      </div>
      <p className="text-gray-700 italic text-center text-lg mb-6">
        "{testimonial.quote}"
      </p>
      <p className="text-right font-medium text-gray-900">
        {testimonial.customer}
      </p>
    </div>
    <div className="bg-gray-50 p-4 rounded-md">
      <h4 className="font-medium mb-2">お客様の声のポイント:</h4>
      <ul className="list-disc list-inside space-y-1 text-gray-700">
        <li>以前より使いやすくなったという評価</li>
        <li>問い合わせ増加による売上向上</li>
        <li>スタッフの負担軽減</li>
        <li>会社のイメージアップ</li>
      </ul>
    </div>
  </div>
);

const ImageDialogContent: React.FC<{ caseStudy: CaseStudy }> = ({
  caseStudy,
}) => (
  <div className="py-4">
    <div className="relative h-64 sm:h-80 md:h-96 mb-6 rounded-lg overflow-hidden">
      <Image
        src={caseStudy.imageUrl}
        alt={`${caseStudy.tabName} website image`}
        fill
        className="object-cover"
      />
    </div>
    <div className="bg-indigo-50 p-4 rounded-md">
      <h4 className="font-medium mb-2">ホームページの主な特徴:</h4>
      <ul className="list-disc list-inside space-y-1 text-gray-700">
        <li>ユーザーの目的を考慮した導線設計</li>
        <li>ブランドカラーを活かしたデザイン</li>
        <li>読みやすいフォントサイズとコントラスト</li>
        <li>必要な情報へのアクセスが簡単</li>
        <li>レスポンシブデザインでどの端末でも見やすい</li>
      </ul>
    </div>
  </div>
);

const HighlightDialogContent: React.FC<{ result: CaseStudy['result'] }> = ({
  result,
}) => (
  <div className="py-4">
    <div className="flex items-center mb-4 text-indigo-600">
      <Sparkles className="w-6 h-6 mr-3" />
      <h3 className="text-xl font-semibold">重要な成果</h3>
    </div>
    <div className="bg-indigo-600 p-6 rounded-lg text-white text-center mb-6">
      <p className="text-4xl font-bold mb-2">{result.highlight}</p>
      <p className="text-lg">{result.title}</p>
    </div>
    <p className="text-gray-700 mb-4">{result.description}</p>
    <div className="bg-indigo-50 p-4 rounded-md">
      <h4 className="font-medium mb-2">成果のポイント:</h4>
      <ul className="list-disc list-inside space-y-1 text-gray-700">
        <li>投資対効果（ROI）が明確</li>
        <li>短期間で目に見える成果</li>
        <li>継続的な改善によるさらなる効果</li>
        <li>定量的に測定可能な効果</li>
      </ul>
    </div>
  </div>
);

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
              <div className="bg-indigo-100 rounded-full p-2 mr-3">
                <Icon className="w-5 h-5 text-indigo-600" />
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
    <div>
      {/* 画像表示 */}
      <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
        <Image
          src={caseStudy.imageUrl}
          alt={`${caseStudy.tabName} website image`}
          fill
          className="object-cover"
        />
      </div>

      {/* 課題 */}
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

      {/* 成果 */}
      <MobileDialogTrigger
        icon={caseStudy.result.icon}
        title={caseStudy.result.title}
        description={caseStudy.result.description}
        dialogTitle={`${caseStudy.companyInfo} - ${caseStudy.result.title}`}
      >
        <ResultDialogContent result={caseStudy.result} />
      </MobileDialogTrigger>

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
const HomepageCaseStudiesSection: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>(caseStudiesData[0].id); // 初期表示は最初のタブ

  const activeCaseStudy = caseStudiesData.find((cs) => cs.id === activeTabId);

  return (
    <section className="py-16 lg:py-32 bg-white">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-12">
          実績とお客様の声
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
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
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
              {activeCaseStudy.companyInfo} の制作事例
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
                          alt={`${activeCaseStudy.tabName} website image`}
                          fill
                          className="object-cover absolute inset-0 transition-transform duration-300 ease-in-out group-hover:scale-105"
                        />
                      }
                      Icon={() => null}
                      description="ホームページ画面例"
                      cta="拡大して見る"
                    />
                  }
                  title={`${activeCaseStudy.companyInfo} - ホームページ画面`}
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
                        <div className="absolute inset-0 bg-indigo-50/80 dark:bg-indigo-900/50 opacity-90" />
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

export default HomepageCaseStudiesSection;
