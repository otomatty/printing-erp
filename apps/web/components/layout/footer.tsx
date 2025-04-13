import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';

/**
 * フッターコンポーネント
 * サイト全体で使用するフッター情報を表示します
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  // アプリのURL設定 - 環境変数から取得
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:2021';

  // サービスカテゴリデータ
  const serviceCategories = [
    { label: 'サービストップ', href: '/services' },
    { label: '印刷', href: '/services#printing' },
    { label: 'IT・デジタル', href: '/services#it-digital' },
  ];

  // その他の主要ページデータ
  const sitePages = [
    { label: 'トップ', href: '/' },
    { label: '会社概要', href: '/company' },
    { label: 'お問い合わせ', href: '/contact' },
    { label: '特集', href: '/topics' },
  ];

  return (
    <footer className="bg-background">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 会社情報 */}
          <div>
            <h3 className="text-xl font-bold mb-4">ニイヌマ企画印刷</h3>
            <div className="space-y-2">
              <p className="flex items-start">
                <MapPin size={18} className="mr-2 flex-shrink-0 mt-1" />
                <a
                  href="https://maps.google.com/?q=岩手県大船渡市盛町字みどり町4-12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground/50 transition-colors"
                >
                  〒022-0003 岩手県大船渡市盛町字みどり町4-12
                </a>
              </p>
              <p className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <a
                  href="tel:0192262160"
                  className="hover:text-foreground/50 transition-colors"
                >
                  0192-26-2160
                </a>
              </p>
              <p className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <a
                  href="mailto:nkikaku@crocus.ocn.ne.jp"
                  className="hover:text-foreground/50 transition-colors"
                >
                  nkikaku@crocus.ocn.ne.jp
                </a>
              </p>
              <p className="flex items-center">
                <Clock size={18} className="mr-2 flex-shrink-0" />
                <span>
                  営業時間: 9:00〜18:00
                  <br />
                  定休日: 日曜日・祝日
                </span>
              </p>
            </div>
          </div>

          {/* サービス */}
          <div>
            <h3 className="text-xl font-bold mb-4">サービス</h3>
            <ul className="space-y-2">
              {serviceCategories.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-foreground/50 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 会社情報・その他 */}
          <div>
            <h3 className="text-xl font-bold mb-4">会社情報・その他</h3>
            <ul className="space-y-2">
              {sitePages.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-foreground/50 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* お問い合わせ */}
          <div>
            <h3 className="text-xl font-bold mb-4">お問い合わせ</h3>
            <p className="mb-4">お見積り・ご相談はこちらから</p>
            <Link
              href="/contact"
              className="inline-block bg-primary hover:bg-primary/80 text-primary-foreground px-5 py-2 rounded-md transition-colors"
            >
              お問い合わせフォーム
            </Link>
            <div className="mt-4">
              <a
                href={appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground/50 transition-colors flex items-center"
              >
                公式アプリ
                <ExternalLink size={16} className="ml-1" />
              </a>
            </div>
          </div>
        </div>

        {/* コピーライト */}
        <div className="border-t border-background-foreground mt-8 pt-8 text-center">
          <p>© {currentYear} ニイヌマ企画印刷 All Rights Reserved.</p>
          <div className="mt-4 space-x-4">
            <Link
              href="/privacy-policy"
              className="text-sm hover:text-foreground/50 transition-colors"
            >
              プライバシーポリシー
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
