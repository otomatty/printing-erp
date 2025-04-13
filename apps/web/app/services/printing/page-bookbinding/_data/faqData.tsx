import type { FAQItem } from '~/components/custom/faq/faq-section'; // FAQItem 型をインポート
import React from 'react';

// このページ固有のFAQデータ
export const pageMonoFaqData: FAQItem[] = [
  {
    id: 'pagemono-faq-1',
    question: 'WordやPowerPointのデータから冊子を作れますか？',
    answer: (
      <>
        <p>はい、可能です。Microsoft Office系のデータも対応しております。</p>
        <p className="mt-2">
          ただし、印刷に適した形式に変換する際にレイアウトが崩れる可能性があるため、PDFでのご入稿を推奨しております。
        </p>
        <p className="mt-2">
          データ変換や調整が必要な場合は、別途料金が発生する場合がございます。
        </p>
      </>
    ),
  },
  {
    id: 'pagemono-faq-2',
    question: 'デザインや編集もお願いできますか？',
    answer: (
      <>
        <p>はい、承っております。</p>
        <p className="mt-2">
          企画・構成、デザイン、DTP編集、文字入力、図版作成など、冊子制作に関わる作業を幅広くサポートいたします。
        </p>
        <p className="mt-2">
          お気軽に
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
          にてご相談ください。
        </p>
      </>
    ),
  },
  {
    id: 'pagemono-faq-3',
    question: '写真の色味をきれいに印刷できますか？',
    answer: (
      <>
        <p>はい、写真集や作品集などの実績もございます。</p>
        <p className="mt-2">
          ご希望の色味に近づけるよう、色校正（有料オプション）を行うことも可能です。
        </p>
        <p className="mt-2">
          用紙の種類によっても色の再現性が異なりますので、最適な組み合わせをご提案します。
        </p>
      </>
    ),
  },
  {
    id: 'pagemono-faq-4',
    question: '少ない部数でも注文できますか？',
    answer: (
      <>
        <p>はい、1冊からの少部数印刷・製本に対応しております。</p>
        <p className="mt-2">
          オンデマンド印刷により、必要な時に必要な部数だけ作成することが可能です。
        </p>
      </>
    ),
  },
  {
    id: 'pagemono-faq-5',
    question: '自分でプリントした原稿を持ち込んで製本だけお願いできますか？',
    answer: (
      <>
        <p>
          はい、可能です。設計図、会議資料、文集など、お客様がご用意された原稿の製本のみも承っております。
        </p>
        <p className="mt-2">
          原稿の状態（用紙サイズ、厚さ、ホチキス留めの有無など）をお知らせください。
        </p>
      </>
    ),
  },
  {
    id: 'pagemono-faq-6',
    question: '納期はどれくらいかかりますか？',
    answer: (
      <>
        <p>
          ページ数、部数、仕様（印刷色、用紙、製本方法、加工）によって大きく変動しますが、目安としてはデータ確定後3〜5営業日となります。
        </p>
        <p className="mt-2">編集作業を含む場合は、別途期間が必要です。</p>
        <p className="mt-2">
          詳しくは
          <a href="tel:0192262160" className="text-primary hover:underline">
            お電話
          </a>
          または
          <a href="/contact" className="text-primary hover:underline">
            お問い合わせフォーム
          </a>
          からご連絡ください。
        </p>
      </>
    ),
  },
  // TODO: ページ物・製本固有の質問を追加 (例: 対応可能な最大ページ数は？ データ入稿の注意点は？など)
];

export const faqTitle = 'ページ物・冊子印刷・製本のよくあるご質問';
