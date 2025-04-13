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
      '創業以来、地域の皆様と共に歩んできた私たちは、一点一点に心を込めたサービスを提供しています。お客様との対話を大切にし、ご要望に真摯に向き合うことで、期待を超える品質と満足をお届けします。地域に根差した印刷のプロとして、これからもお客様の想いを形にするお手伝いを続けてまいります。',
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
  // デザインは現在非表示
  // {
  // 	id: "design",
  // 	title: "デザイン制作",
  // 	badge: "目的達成デザイン",
  // 	themeColor: "emerald",
  // 	fullDescription:
  // 		"経験豊富なデザイナーが、お客様の目的や要望をヒアリングし、効果的なデザインを制作します。印刷物のデザインだけでなく、ロゴやブランディングデザインも承っています。デザインのコンセプト設計から実制作まで一貫して対応いたします。",
  // 	features: [
  // 		{ id: "design-feat-1", text: "目的に合わせたデザイン提案" },
  // 		{ id: "design-feat-2", text: "ブランドイメージに沿ったデザイン" },
  // 		{ id: "design-feat-3", text: "修正回数無制限のデザイン制作" }, // ※これはサービスの売りに依存
  // 		{ id: "design-feat-4", text: "印刷に最適化されたデータ作成" },
  // 		{ id: "design-feat-5", text: "写真撮影・イラスト制作" },
  // 	],
  // 	image: "/images/design.webp",
  // 	items: [
  // 		{
  // 			id: "design-item-1",
  // 			name: "グラフィックデザイン",
  // 			description: [
  // 				"チラシ・ポスター・パンフレット等",
  // 				"情報を効果的に伝えるデザイン",
  // 				"企画からデータ作成までサポート",
  // 			],
  // 			shortDescription:
  // 				"チラシ、ポスター、パンフレットなど、印刷媒体のグラフィックデザインを制作します。",
  // 			href: "/services/design/graphic-design",
  // 			icon: Palette,
  // 		},
  // 		{
  // 			id: "design-item-2",
  // 			name: "ロゴデザイン",
  // 			description: [
  // 				"企業・ブランド・商品の顔を作成",
  // 				"独自性とメッセージ性を重視",
  // 				"様々な媒体での使用を想定",
  // 			],
  // 			shortDescription:
  // 				"企業やブランド、商品の「顔」となるオリジナルロゴをデザインします。",
  // 			href: "/services/design/logo-design",
  // 			icon: PenTool,
  // 		},
  // 		{
  // 			id: "design-item-3",
  // 			name: "パッケージデザイン",
  // 			description: [
  // 				"商品の魅力を引き出すデザイン",
  // 				"箱・ラベル・袋など多様な形態",
  // 				"素材選定からデータ作成まで",
  // 			],
  // 			shortDescription:
  // 				"商品の魅力を引き出し、消費者の購買意欲を高めるパッケージをデザインします。",
  // 			href: "/services/design/package-design",
  // 			icon: Package,
  // 		},
  // 		{
  // 			id: "design-item-4",
  // 			name: "イラスト制作",
  // 			description: [
  // 				"親しみやすさ・分かりやすさを演出",
  // 				"Web・印刷物・キャラクター等",
  // 				"多様なタッチ・テイストに対応",
  // 			],
  // 			shortDescription:
  // 				"Webサイト、印刷物、キャラクターなど、様々な用途のイラストを制作します。",
  // 			href: "/services/design/illustration",
  // 			icon: Paintbrush,
  // 		},
  // 		{
  // 			id: "design-item-5",
  // 			name: "写真撮影・レタッチ",
  // 			description: [
  // 				"商品・イメージ・人物等の撮影",
  // 				"色調補正・切り抜き・合成等",
  // 				"写真の魅力を最大限に引き出す",
  // 			],
  // 			shortDescription:
  // 				"商品、人物、イメージ写真などの撮影と、色調補正や合成などのレタッチを行います。",
  // 			href: "/services/design/photo-retouch",
  // 			icon: Camera,
  // 		},
  // 	],
  // },
  {
    id: 'it-digital',
    title: 'IT・デジタル',
    badge: 'AI・DXエンジニア担当',
    themeColor: 'fuchsia',
    fullDescription:
      'ホームページ制作から業務システムの開発、IT戦略のコンサルティングまで、お客様のビジネスをデジタル面からサポートします。最新技術と豊富な経験に基づき、最適なソリューションを提供します。',
    features: [
      { id: 'it-feat-1', text: '戦略的なWebサイト構築' },
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
          '集客・ブランディングに繋がる戦略的制作', // "戦略的" を追加
          'オーダーメイドデザイン・CMS導入',
          'SEO対策・公開後の運用保守も対応', // "公開後" を明記
        ],
        shortDescription:
          '集客やブランディングに繋がる、戦略的で使いやすいWebサイトを制作・運用します。', // 運用も含むように修正
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
