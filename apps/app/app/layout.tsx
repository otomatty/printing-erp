import { cookies } from 'next/headers';
import type { Metadata } from 'next';

import { Toaster } from '@kit/ui/sonner';
import { cn } from '@kit/ui/utils';

import { RootProviders } from '~/components/root-providers';
import { heading, sans } from '~/lib/fonts';
import { createI18nServerInstance } from '~/lib/i18n/i18n.server';

import '../styles/globals.css';
import { Header } from '../components/layout/header';

export const metadata: Metadata = {
  title: 'ニイヌマ企画印刷 | オンライン印刷アプリ',
  description:
    '印刷業務をスマートに管理するニイヌマ企画印刷のオンラインシステム',
  keywords: ['印刷'],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language } = await createI18nServerInstance();
  const theme = await getTheme();
  const className = getClassName(theme);

  return (
    <html lang={language} className={className}>
      <body suppressHydrationWarning>
        <div className="flex flex-col min-h-screen">
          <RootProviders theme={theme} lang={language}>
            <Header />
            <main className="flex-1">{children}</main>
          </RootProviders>
          <footer className="bg-gray-100 py-4 text-center text-gray-600 text-sm">
            <div className="container mx-auto px-4">
              © {new Date().getFullYear()} ニイヌマ企画印刷 All Rights Reserved.
            </div>
          </footer>
        </div>
        <Toaster richColors={true} theme={theme} position="top-center" />
      </body>
    </html>
  );
}

function getClassName(theme?: string) {
  const dark = theme === 'dark';
  const light = !dark;

  const font = [sans.variable, heading.variable].reduce<string[]>(
    (acc, curr) => {
      if (acc.includes(curr)) return acc;

      acc.push(curr);
      return acc;
    },
    []
  );

  return cn('bg-background min-h-screen antialiased', font.join(' '), {
    dark,
    light,
  });
}

async function getTheme() {
  const cookiesStore = await cookies();
  return cookiesStore.get('theme')?.value as 'light' | 'dark' | 'system';
}

// generateRootMetadataを使用する代わりに、直接メタデータを定義しました
