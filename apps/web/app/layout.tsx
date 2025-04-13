import { cookies } from 'next/headers';
import type { Metadata } from 'next';

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
import { ThemeSettingsFab } from '~/components/custom/theme-settings-fab';

import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'ニイヌマ企画印刷 | 確かな技術と対応力の総合印刷',
  description:
    'ニイヌマ企画印刷は、各種印刷・製本、編集・デザインなど、印刷にかかわることなら何でもお受けします。1985年創業の印刷会社です。',
  keywords: ['印刷', '製本', '編集', 'デザイン', '印刷会社'],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language } = await createI18nServerInstance();
  const theme = await getTheme();
  const colorTheme = await getColorTheme();
  const fontFamily = await getFontFamily();
  const className = getClassName(theme, colorTheme, fontFamily);

  return (
    <html lang={language} className={className}>
      <body suppressHydrationWarning>
        <RootProviders theme={theme} lang={language} colorTheme={colorTheme}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ThemeSettingsFab />
        </RootProviders>

        <Toaster richColors={true} theme={theme} position="top-center" />
      </body>
    </html>
  );
}

function getClassName(
  theme?: string,
  colorTheme?: ColorTheme,
  fontFamily?: string
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
  let fontClass = '';
  if (fontFamily) {
    switch (fontFamily) {
      case 'noto-sans':
        fontClass = 'font-noto-sans';
        break;
      case 'zen-gothic':
        fontClass = 'font-zen-gothic';
        break;
      case 'mincho':
        fontClass = 'font-mincho';
        break;
      case 'rounded':
        fontClass = 'font-rounded';
        break;
      default:
        fontClass = '';
    }
  }

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

async function getFontFamily() {
  const cookiesStore = await cookies();
  return cookiesStore.get('font-family')?.value || 'default';
}
