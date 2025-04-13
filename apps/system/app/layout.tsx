import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Toaster } from '@kit/ui/sonner';
import { cn } from '@kit/ui/utils';
import { RootProviders } from '~/components/root-providers';
import { heading, sans } from '~/lib/fonts';
import { createI18nServerInstance } from '~/lib/i18n/i18n.server';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: '印刷業務管理システム | ニイヌマ企画印刷',
  description: 'ニイヌマ企画印刷の業務管理システム',
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
        <RootProviders theme={theme} lang={language}>
          {children}
          <Toaster richColors={true} theme={theme} position="top-center" />
        </RootProviders>
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
