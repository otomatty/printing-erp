import type React from 'react';
import {
  Printer,
  Mail,
  FileText,
  Newspaper,
  BookOpen,
  Laptop,
  Database,
  // Settings, // 未使用なのでコメントアウト
  // Component, // 未使用なのでコメントアウト
} from 'lucide-react';
// 型定義を外部ファイルからインポート
import type { ServiceCategory } from '../types/serviceTypes';

// サービスデータ (アイコンと shortDescription を追加)
export const servicesData: ServiceCategory[] = [
  {
    id: 'printing',
    title: '印刷',
    badge: '高品質・短納期',
    themeColor: 'sky',
    fullDescription:
      '印刷機器と熟練したスタッフによる高品質な印刷サービスを提供しています。',
    features: [
      { id: 'print-feat-1', text: '高品質なオフセット印刷・デジタル印刷' },
      { id: 'print-feat-2', text: '小ロットから大ロットまで対応' },
      { id: 'print-feat-3', text: '短納期対応可能' },
      { id: 'print-feat-4', text: '環境に配慮した印刷' },
      { id: 'print-feat-5', text: '用紙・インキの選定サポート' },
    ],
    image: '/images/printing.webp',
    items: [
      {
        id: 'print-item-1',
        name: '名刺・ハガキ・カード類',
        description: [
          'ビジネスに必須の名刺を作成',
          '年賀状や挨拶状などもお任せ',
          '官製・私製はがきに対応',
        ],
        shortDescription:
          '名刺、ハガキ、ショップカードなど、ビジネスやプライベートに必須のアイテムを印刷します。',
        href: '/services/printing/meishi-hagaki-card',
        icon: Printer,
      },
      {
        id: 'print-item-2',
        name: '封筒印刷',
        description: [
          '長3・角2などの定型封筒',
          '定型外・特殊封筒も対応可能',
          'ロゴ入りでブランディング向上',
        ],
        shortDescription:
          '長3・角2などの定型封筒から特殊封筒まで。ロゴ入りでビジネスの信頼性を高めます。',
        href: '/services/printing/envelope',
        icon: Mail,
      },
      {
        id: 'print-item-3',
        name: '伝票印刷',
        description: [
          'ご要望サイズで伝票印刷',
          '複写・ナンバリング等にも対応',
          '印刷色・デザイン・製本仕様も柔軟に',
        ],
        shortDescription:
          '納品書、請求書などの各種伝票や、報告書などの製本。オリジナルデザインも可能です。',
        href: '/services/printing/denpyo',
        icon: FileText,
      },
      {
        id: 'print-item-4',
        name: 'チラシ・ポスター',
        description: [
          'デザインから印刷まで一貫対応',
          '小ロットから大ロットまでOK',
          '各種サイズ・用紙・加工に対応',
        ],
        shortDescription:
          'イベント告知や商品宣伝に。効果的なデザインと印刷で情報を届けます。',
        href: '/services/printing/flyer-poster',
        icon: Newspaper,
      },
      {
        id: 'print-item-5',
        name: 'ページ物・製本',
        description: [
          '報告書・マニュアル・文集等',
          '持ち込み原稿の製本も可能',
          '多様な製本方法に対応',
        ],
        shortDescription:
          '報告書、マニュアル、文集など、複数ページの冊子印刷・製本を承ります。',
        href: '/services/printing/page-bookbinding',
        icon: BookOpen,
      },
      // その他印刷物は href がないのでトップには表示しない想定
      // 必要であればここに追加
      // 例:
      // {
      //  id: "print-item-6",
      //  name: "その他印刷物",
      //  description: ["シール", "カレンダー", "ノベルティグッズなど"],
      //  shortDescription: "シールやカレンダー、ノベルティグッズなどの特殊印刷も承ります。",
      //  icon: Package, // 適切なアイコンに変更
      // },
    ],
  },
  //   デザインは削除
  {
    id: 'it-digital',
    title: 'IT・デジタル',
    badge: 'AI・DXエンジニア担当',
    themeColor: 'fuchsia',
    fullDescription:
      'ホームページ制作から業務システムの開発、IT戦略のコンサルティングまで、お客様のビジネスをデジタル面からサポートします。最新技術と豊富な経験に基づき、最適なソリューションを提供します。',
    features: [
      { id: 'it-feat-1', text: '戦略的なホームページ構築' },
      { id: 'it-feat-2', text: 'オーダーメイドのシステム開発' },
      { id: 'it-feat-3', text: 'ビジネス課題解決のITコンサルティング' },
      { id: 'it-feat-4', text: '最新技術の活用提案 (AI/DX)' }, // 具体例を追加
      { id: 'it-feat-5', text: '運用・保守サポート体制' }, // 体制を明記
    ],
    image: '/images/it-digital.webp',
    items: [
      {
        id: 'it-item-1',
        name: 'ホームページ制作',
        description: [
          '集客・ブランディングに繋がる', // "戦略的" を追加
          'オーダーメイドデザイン・CMS導入',
          'SEO対策・公開後の運用保守も対応', // "公開後" を明記
        ],
        shortDescription:
          '集客やブランディングに繋がる、戦略的で使いやすいホームページを制作・運用します。', // 運用も含むように修正
        href: '/services/it-digital/homepage',
        icon: Laptop,
      },
      {
        id: 'it-item-2',
        name: '業務システム開発',
        description: [
          '業務効率化・生産性向上を実現',
          '顧客管理・在庫管理・予約システム等', // "システム" を追加
          'Webベースで場所を選ばず利用可能',
        ],
        shortDescription:
          '顧客管理や在庫管理など、業務に合わせたオーダーメイドシステムを開発します。',
        href: '/services/it-digital/system-development',
        icon: Database,
      },
      // 必要であれば IT・デジタルサービス の項目を追加
      // 例:
      // {
      //   id: "it-item-3",
      //   name: "ITコンサルティング",
      //   description: [
      //     "DX推進の戦略立案サポート",
      //     "業務プロセスの可視化・改善提案",
      //     "最適なITツール選定・導入支援",
      //   ],
      //   shortDescription: "お客様のビジネス課題を解決するためのIT戦略立案やツール導入を支援します。",
      //   href: "/services/it-digital/consulting",
      //   icon: Settings,
      // },
    ],
  },
];
