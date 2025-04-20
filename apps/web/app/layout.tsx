import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import Script from 'next/script';

import { Toaster } from '@kit/ui/sonner';
import { cn } from '@kit/ui/utils';

import { RootProviders } from '~/components/root-providers';
import {
  heading,
  sans,
  noto,
  zenGothic,
  mincho,
  maruGothic,
} from '~/lib/fonts';
import { createI18nServerInstance } from '~/lib/i18n/i18n.server';
import { Header } from '../components/layout/header';
import { Footer } from '../components/layout/footer';
import type { ColorTheme } from '~/components/color-theme-provider';

import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'ニイヌマ企画印刷 | 確かな技術と対応力の総合印刷',
  description:
    'ニイヌマ企画印刷は、各種印刷・製本、編集・デザインなど、印刷にかかわることなら何でもお受けします。1985年創業の印刷会社です。',
  keywords: [
    '印刷会社',
    '岩手',
    '大船渡',
    '陸前高田',
    '住田',
    'ホームページ制作',
    'ホームページ作成',
    'ホームページ運用',
    '業務システム開発',
    '印刷',
    '製本',
    '編集',
    'デザイン',
  ],
  other: {
    'apple-mobile-web-app-title': 'ニイヌマ企画印刷',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language } = await createI18nServerInstance();
  const theme = await getTheme();
  const colorTheme = await getColorTheme();
  const className = getClassName(theme, colorTheme, 'rounded');

  return (
    <html lang={language} className={className}>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){
            w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
            j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PRZ88N9P');
          `}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            title="Google Tag Manager (noscript)"
            src="https://www.googletagmanager.com/ns.html?id=GTM-PRZ88N9P"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <RootProviders theme={theme} lang={language} colorTheme={colorTheme}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </RootProviders>

        <Toaster richColors={true} theme={theme} position="top-center" />
      </body>
    </html>
  );
}

function getClassName(
  theme?: string,
  colorTheme?: ColorTheme,
  fontFamily = 'rounded'
) {
  const dark = theme === 'dark';
  const light = !dark;

  const font = [
    sans.variable,
    heading.variable,
    noto.variable,
    zenGothic.variable,
    mincho.variable,
    maruGothic.variable,
  ].reduce<string[]>((acc, curr) => {
    if (acc.includes(curr)) return acc;

    acc.push(curr);
    return acc;
  }, []);

  // フォントクラスの取得
  const fontClass = 'font-rounded';

  // クライアントサイドでcolorThemeクラスを管理するため、
  // ここではdarkやlightなど基本的なクラスのみ適用する
  return cn(
    'bg-background min-h-screen antialiased',
    font.join(' '),
    fontClass,
    {
      dark,
      light,
    }
  );
}

async function getTheme() {
  const cookiesStore = await cookies();
  return cookiesStore.get('theme')?.value as 'light' | 'dark' | 'system';
}

async function getColorTheme() {
  const cookiesStore = await cookies();
  return (cookiesStore.get('color-theme')?.value || 'default') as ColorTheme;
}
