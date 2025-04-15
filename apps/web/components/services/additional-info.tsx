'use client';

import { motion } from 'framer-motion';
import { cn } from '@kit/ui/utils';

// アニメーション設定
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

// スタイル設定のプリセット
const stylePresets = {
  'it-subsidy': {
    bg: 'bg-gradient-to-br from-green-50 to-teal-50',
    border: 'border-green-200',
    iconColor: 'text-green-600',
  },
  'print-design': {
    bg: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    border: 'border-blue-200',
    iconColor: 'text-primary',
  },
  other: {
    bg: 'bg-gradient-to-br from-gray-50 to-slate-50',
    border: 'border-gray-200',
    iconColor: 'text-gray-600',
  },
};

type InfoType = 'it-subsidy' | 'print-design' | 'other';

type AdditionalInfoProps = {
  type: InfoType; // 情報タイプ
  title?: string; // タイトルをカスタマイズ可能に
  description?: string | React.ReactNode; // 説明文をカスタマイズ可能に
  showLink?: boolean; // リンクを表示するかどうか
  linkText?: string; // リンクテキスト
  linkHref?: string; // リンクURL
  customStyle?: {
    bg?: string; // 背景色クラス
    border?: string; // ボーダー色クラス
    iconColor?: string; // アイコン色クラス
  }; // カスタムスタイル
};

export default function AdditionalInfo({
  type = 'it-subsidy',
  title,
  description,
  showLink = false,
  linkText,
  linkHref,
  customStyle,
}: AdditionalInfoProps) {
  // タイプに応じたデフォルト値を設定
  const defaultTitle =
    type === 'it-subsidy'
      ? '補助金をご利用いただけます'
      : type === 'print-design'
        ? '印刷・デザイン一括対応いたします'
        : '';

  const defaultDescription =
    type === 'it-subsidy' ? (
      <>
        当社のIT・デジタルサービス（ホームページ制作、業務システム開発）は、各種補助金の対象となる可能性があります。
        補助金を活用することで、導入費用の
        <strong className="text-primary font-semibold"> 最大2/3程度</strong>{' '}
        （補助率や上限額は申請枠・類型により異なります）の補助を受けられる場合があります。
        申請手続きのサポートも可能ですので、詳細についてはお気軽にお問い合わせください。
      </>
    ) : type === 'print-design' ? (
      <>
        当社では
        <strong className="text-primary font-semibold">
          印刷だけでなくデザイン制作も一括
        </strong>
        で承っております。
        チラシ・ポスター・パンフレットなどの印刷物はデザインから印刷・納品まで一貫して対応可能です。
        素材集めからお困りの場合も、弊社のデザイナーがお客様のご要望に合わせたデザインをご提案いたします。
        お気軽にご相談ください。
      </>
    ) : (
      ''
    );

  // デフォルトのリンク情報
  const defaultLinkText =
    type === 'it-subsidy'
      ? '補助金特設ページはこちら'
      : type === 'print-design'
        ? 'デザイン制作サービスの詳細はこちら'
        : '';

  const defaultLinkHref =
    type === 'it-subsidy'
      ? '/hojokin'
      : type === 'print-design'
        ? '/design-service'
        : '';

  // スタイル設定を取得
  const stylePreset = stylePresets[type] || stylePresets.other;
  const style = {
    bg: customStyle?.bg || stylePreset.bg,
    border: customStyle?.border || stylePreset.border,
    iconColor: customStyle?.iconColor || stylePreset.iconColor,
  };

  // 実際に表示する値
  const displayTitle = title || defaultTitle;
  const displayDescription = description || defaultDescription;
  const displayLinkText = linkText || defaultLinkText;
  const displayLinkHref = linkHref || defaultLinkHref;

  return (
    <motion.div
      className={cn(
        'mt-8 lg:mt-12 pt-8 border-t p-6 md:p-8 rounded-lg shadow-sm border',
        style.bg,
        style.border
      )}
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <h5 className="text-xl lg:text-2xl font-semibold mb-4 text-gray-800 flex items-center">
        {type === 'it-subsidy' && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={cn(
              'w-6 h-6 inline-block mr-2 flex-shrink-0',
              style.iconColor
            )}
            aria-hidden="true"
          >
            <title>補助金対象アイコン</title>
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
              clipRule="evenodd"
            />
          </svg>
        )}

        {type === 'print-design' && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={cn(
              'w-6 h-6 inline-block mr-2 flex-shrink-0',
              style.iconColor
            )}
            aria-hidden="true"
          >
            <title>デザイン・印刷アイコン</title>
            <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
            <path
              fillRule="evenodd"
              d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clipRule="evenodd"
            />
          </svg>
        )}

        {displayTitle}
      </h5>

      <div className="text-gray-700 leading-relaxed">{displayDescription}</div>

      {showLink && displayLinkHref && (
        <a
          href={displayLinkHref}
          className={cn('hover:underline mt-4 inline-block', 'text-primary')}
        >
          {displayLinkText}
        </a>
      )}
    </motion.div>
  );
}
