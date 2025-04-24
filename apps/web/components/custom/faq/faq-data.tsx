import type { FAQItem } from '~/types/faq';
import React from 'react';

// 印刷サービスに関するFAQ
export const printingServiceFAQs: FAQItem[] = [
  {
    question: 'シミュレーターに表示されない仕様の印刷物は対応していませんか？',
    answer: (
      <>
        <p>
          シミュレーターに表示されていない特殊な仕様や大量印刷なども対応可能です。
        </p>
        <p className="mt-2">詳細はお問い合わせください。</p>
      </>
    ),
  },
  {
    question: 'デザインの作成も依頼できますか？',
    answer: (
      <>
        <p>
          はい、チラシやポスター、パンフレットなどのデザイン作成も承っております。
        </p>
        <p className="mt-2">
          お客様のご要望をヒアリングした上で、目的に合ったデザインをご提案いたします。
        </p>
      </>
    ),
  },
  {
    question: 'データ入稿の場合の注意点はありますか？',
    answer: (
      <>
        <p>
          Adobe
          IllustratorやPhotoshopなどのデータをご入稿いただけます。画像は350dpi以上、フォントはアウトライン化、塗り足しは3mm以上設定していただくことをおすすめします。
        </p>
        <p className="mt-2">詳しくは「入稿ガイド」をご覧ください。</p>
      </>
    ),
  },
  {
    question: '納期はどのくらいかかりますか？',
    answer: (
      <>
        <p>
          標準的な印刷物の場合、データ確定後1営業日〜3営業日でお届けいたします。
        </p>
        <p className="mt-2">
          急ぎの場合は最短3営業日での対応も可能ですので、お問い合わせ時にご相談ください。
        </p>
      </>
    ),
  },
  {
    question: '小ロットの印刷は可能ですか？',
    answer: (
      <>
        <p>はい、小ロットの印刷も承っております。</p>
        <p className="mt-2">
          デジタル印刷機を活用し、少部数からの印刷も高品質かつリーズナブルな価格でご提供しています。
        </p>
      </>
    ),
  },
];

// お問い合わせに関するFAQ
export const contactFAQs: FAQItem[] = [
  {
    question: '見積りは無料ですか？',
    answer: (
      <>
        <p>はい、お見積りは無料です。お気軽にお問い合わせください。</p>
      </>
    ),
  },
  {
    question: '電話での問い合わせも可能ですか？',
    answer: (
      <>
        <p>
          はい、電話でのお問い合わせも承っております。営業時間内（平日9:00〜18:00）にお電話ください。
        </p>
        <p className="mt-2">
          電話番号:{' '}
          <a href="tel:0192262160" className="text-primary hover:underline">
            0192-26-2160
          </a>
        </p>
        <p className="mt-2">
          住所:{' '}
          <a
            href="https://maps.google.com/?q=岩手県大船渡市盛町字みどり町4-12"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            〒022-0003 岩手県大船渡市盛町字みどり町4-12
          </a>
        </p>
      </>
    ),
  },
  {
    question: 'メールでの問い合わせの場合、回答までどのくらいかかりますか？',
    answer: (
      <>
        <p>通常、営業日内に回答させていただいております。</p>
        <p className="mt-2">
          お急ぎの場合は、お電話でのお問い合わせをおすすめします。
        </p>
        <p className="mt-2">
          メールアドレス:{' '}
          <a
            href="mailto:nkikaku@crocus.ocn.ne.jp"
            className="text-primary hover:underline"
          >
            nkikaku@crocus.ocn.ne.jp
          </a>
        </p>
      </>
    ),
  },
  {
    question: '来店して相談することはできますか？',
    answer: (
      <>
        <p>
          はい、店舗へのご来店も歓迎しております。事前にご連絡いただけますと、スムーズにご案内できます。
        </p>
        <p className="mt-2">
          住所:{' '}
          <a
            href="https://maps.google.com/?q=岩手県大船渡市盛町字みどり町4-12"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            〒022-0003 岩手県大船渡市盛町字みどり町4-12
          </a>
        </p>
        <p className="mt-2">
          営業時間: 平日 9:00〜18:00（定休日: 日曜日・祝日）
        </p>
      </>
    ),
  },
];

// 商品・サービスに関するFAQ
export const productFAQs: FAQItem[] = [
  {
    question: 'どのような印刷物に対応していますか？',
    answer: (
      <>
        <p>以下のような幅広い印刷物に対応しています：</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>チラシ・ポスター</li>
          <li>パンフレット・会社案内</li>
          <li>名刺・封筒・伝票</li>
          <li>シール・ステッカー</li>
          <li>カレンダー・タペストリー</li>
          <li>看板</li>
        </ul>
        <p className="mt-2">記載のないものでもお気軽にご相談ください。</p>
      </>
    ),
  },
  {
    question: 'オリジナルのデザイン制作はできますか？',
    answer: (
      <>
        <p>
          はい、経験豊富なデザイナーがお客様のご要望に合わせてオリジナルデザインを制作いたします。
        </p>
        <p className="mt-2">
          ロゴ作成からチラシデザインまで幅広く対応しています。
        </p>
      </>
    ),
  },
  {
    question: '大判ポスターやバナーの印刷はできますか？',
    answer: (
      <>
        <p>
          はい、A1サイズやB2サイズなどの大判ポスターや、屋内外で使用するバナーの印刷も承っております。
        </p>
        <p className="mt-2">
          耐候性や設置環境に合わせた素材もご提案いたします。
        </p>
      </>
    ),
  },
  {
    question: '印刷物のサンプルを見ることはできますか？',
    answer: (
      <>
        <p>
          はい、店舗には様々な印刷サンプルを取り揃えております。紙質や加工方法などを実際に手に取ってご確認いただけます。
        </p>
        <p className="mt-2">
          また、ご希望の方には過去の制作事例をご紹介することも可能です。
        </p>
        <p className="mt-2">
          お気軽に
          <a href="tel:0192262160" className="text-primary hover:underline">
            お電話
          </a>
          または
          <a
            href="https://maps.google.com/?q=岩手県大船渡市盛町字みどり町4-12"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            店舗
          </a>
          にてご相談ください。
        </p>
      </>
    ),
  },
];

// 配送・納品に関するFAQ
export const deliveryFAQs: FAQItem[] = [
  {
    question: '納品方法は選べますか？',
    answer: (
      <>
        <p>以下の3つの方法からお選びいただけます：</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>店舗での受け取り</li>
          <li>配送サービスでの配送</li>
          <li>当社スタッフによる直接納品</li>
        </ul>
        <p className="mt-2">
          地域や納品物の量によって最適な方法をご提案いたします。
        </p>
      </>
    ),
  },
  {
    question: '配送料はかかりますか？',
    answer: (
      <>
        <p>
          配送料は配送先の地域や荷物のサイズ・重量によって異なります。お見積り時に詳細をご案内いたします。
        </p>
        <p className="mt-2">
          なお、一定金額以上のご注文の場合、配送料サービスとなる場合もございます。
        </p>
      </>
    ),
  },
  {
    question: '急ぎの納品に対応してもらえますか？',
    answer: (
      <>
        <p>はい、可能な限り緊急の納期にも対応いたします。</p>
        <p className="mt-2">
          特急料金が発生する場合もございますので、事前にご相談ください。
        </p>
        <p className="mt-2">
          お急ぎの場合は
          <a href="tel:0192262160" className="text-primary hover:underline">
            お電話
          </a>
          にてご連絡ください。
        </p>
      </>
    ),
  },
];

// 料金に関するFAQ
export const pricingFAQs: FAQItem[] = [
  {
    question: '支払い方法は何がありますか？',
    answer: (
      <>
        <p>以下のお支払い方法に対応しております：</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>現金</li>
          <li>銀行振込</li>
          <li>法人のお客様：請求書払い（月末締め翌月末払い）</li>
        </ul>
      </>
    ),
  },
  {
    question: '大量注文の場合は割引がありますか？',
    answer: (
      <>
        <p>はい、ご注文数量に応じた割引制度をご用意しております。</p>
        <p className="mt-2">詳細はお見積り時にご案内いたします。</p>
      </>
    ),
  },
  {
    question: '定期的な印刷物の発注は契約できますか？',
    answer: (
      <>
        <p>
          はい、定期的な印刷物のご発注については、年間契約や継続契約などの特別プランもご用意しております。
        </p>
        <p className="mt-2">
          安定した品質と納品スケジュールでご対応いたします。
        </p>
        <p className="mt-2">
          詳しくは
          <a href="tel:0192262160" className="text-primary hover:underline">
            お電話
          </a>
          または
          <a
            href="mailto:nkikaku@crocus.ocn.ne.jp"
            className="text-primary hover:underline"
          >
            メール
          </a>
          にてお問い合わせください。
        </p>
      </>
    ),
  },
];
