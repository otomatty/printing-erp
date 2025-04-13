import Link from 'next/link';

// ボタンの型を定義
interface CTAButton {
  text: string;
  href: string;
}

interface CtaSectionProps {
  title?: string;
  message?: string;
  buttons?: CTAButton[]; // buttonText の代わりに buttons 配列を使う
}

export default function CtaSection({
  title = 'お問い合わせ',
  message = 'ご質問、お見積りのご依頼など、お気軽にお問い合わせください。専門スタッフが丁寧にサポートいたします。',
  // デフォルトのボタンを設定
  buttons = [{ text: 'お問い合わせはこちら', href: '/contact' }],
}: CtaSectionProps) {
  return (
    <section className="p-4 bg-primary text-white">
      <div className="mx-auto p-8 md:p-16 text-center border border-white">
        <h2 className="text-3xl font-bold mb-6">{title}</h2>
        <p className="max-w-2xl mx-auto mb-8 text-lg">{message}</p>
        {/* ボタン配列を map して Link を描画 */}
        {buttons.map((button, index) => (
          <Link
            key={button.href}
            href={button.href}
            className="inline-block bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-md transition-colors font-medium text-lg mx-2" // ボタン間のマージンを追加
          >
            {button.text}
          </Link>
        ))}
      </div>
    </section>
  );
}
