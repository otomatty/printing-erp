'use client';

import { Check } from 'lucide-react';
import {
  useColorTheme,
  type ColorTheme,
} from '~/components/color-theme-provider';
import { useCallback, useMemo, useState, useEffect } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@kit/ui/dropdown-menu';
import { Button } from '@kit/ui/button';
import { cn } from '@kit/ui/utils';

type ThemeOption = {
  value: ColorTheme;
  label: string;
  color: string;
  darkColor?: string;
};

// テーマオプションをコンポーネント外に配置してメモリ効率を向上
const themes: ThemeOption[] = [
  {
    value: 'default',
    label: 'デフォルト (緑)',
    color: 'bg-[hsl(136_31%_12%)]',
    darkColor: 'bg-[hsl(68_50%_97%)]',
  },
  {
    value: 'blue',
    label: '青',
    color: 'bg-[hsl(217_91%_60%)]',
    darkColor: 'bg-[hsl(217_91%_65%)]',
  },
  {
    value: 'red',
    label: '赤',
    color: 'bg-[hsl(0_84%_60%)]',
    darkColor: 'bg-[hsl(0_84%_65%)]',
  },
  {
    value: 'orange',
    label: 'オレンジ',
    color: 'bg-[hsl(28_92%_53%)]',
    darkColor: 'bg-[hsl(28_92%_58%)]',
  },
];

export function ColorThemeToggle() {
  const { colorTheme, setColorTheme } = useColorTheme();
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // マウント時にダークモード判定
  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains('dark'));

    // ダークモード変更を監視
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // 現在のテーマを取得するロジックをメモ化
  const currentTheme = useMemo(
    () => themes.find((theme) => theme.value === colorTheme) || themes[0],
    [colorTheme]
  );

  // カラーテーマの切り替え処理をメモ化
  const handleThemeChange = useCallback(
    (theme: ColorTheme) => {
      setColorTheme(theme);
    },
    [setColorTheme]
  );

  // マウント前は何も表示しない
  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="rounded-full w-8 h-8 overflow-hidden border-2 relative"
        disabled
      >
        <div className="w-full h-full bg-gray-200" />
        <span className="sr-only">カラーテーマを変更</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full w-8 h-8 overflow-hidden border-2 relative"
          title="カラーテーマを変更"
        >
          <div
            className={cn(
              'w-full h-full',
              isDark
                ? currentTheme?.darkColor || currentTheme?.color
                : currentTheme?.color
            )}
            aria-hidden="true"
          />
          <span className="sr-only">カラーテーマを変更</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => handleThemeChange(theme.value)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'w-4 h-4 rounded-full',
                  isDark ? theme.darkColor || theme.color : theme.color
                )}
                aria-hidden="true"
              />
              <span>{theme.label}</span>
            </div>
            {colorTheme === theme.value && (
              <Check className="h-4 w-4 ml-2" aria-hidden="true" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
