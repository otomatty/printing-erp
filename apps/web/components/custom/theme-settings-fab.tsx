'use client';

import { useState, useEffect } from 'react';
import { Settings, Check, X, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  useColorTheme,
  type ColorTheme,
} from '~/components/color-theme-provider';
import { cn } from '@kit/ui/utils';
import { Button } from '@kit/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@kit/ui/dropdown-menu';

// フォントオプション
type FontOption = {
  value: string;
  label: string;
  className: string;
  description?: string;
};

const fontOptions: FontOption[] = [
  {
    value: 'default',
    label: 'デフォルト',
    className: 'font-sans',
    description: 'シンプルで読みやすいフォント',
  },
  {
    value: 'noto-sans',
    label: 'Noto Sans JP',
    className: 'font-noto-sans',
    description: 'バランスの良い日本語ゴシック体',
  },
  {
    value: 'zen-gothic',
    label: 'Zen Kaku Gothic',
    className: 'font-zen-gothic',
    description: 'モダンな印象のゴシック体',
  },
  {
    value: 'mincho',
    label: '明朝体',
    className: 'font-mincho',
    description: '上品で伝統的な印象',
  },
  {
    value: 'rounded',
    label: '丸ゴシック',
    className: 'font-rounded',
    description: '親しみやすい印象の丸ゴシック',
  },
];

// テーマオプション
type ThemeOption = {
  value: ColorTheme;
  label: string;
  description?: string;
  color: string;
  darkColor?: string;
  category: 'color' | 'image';
};

const themeOptions: ThemeOption[] = [
  // 同系色テーマ (カラー名として表示)
  {
    value: 'default',
    label: 'デフォルト',
    color: 'bg-primary',
    darkColor: 'bg-primary',
    category: 'color',
  },
  {
    value: 'blue',
    label: 'ブルー',
    color: 'bg-[hsl(217_91%_60%)]',
    darkColor: 'bg-[hsl(217_91%_65%)]',
    category: 'color',
  },
  {
    value: 'red',
    label: 'レッド',
    color: 'bg-[hsl(0_84%_60%)]',
    darkColor: 'bg-[hsl(0_84%_65%)]',
    category: 'color',
  },
  {
    value: 'orange',
    label: 'オレンジ',
    color: 'bg-[hsl(28_92%_53%)]',
    darkColor: 'bg-[hsl(28_92%_58%)]',
    category: 'color',
  },
  // イメージカラーテーマ
  {
    value: 'purple',
    label: 'エレガント',
    description: 'パープル系の洗練された雰囲気',
    color: 'bg-[hsl(270_76%_50%)]',
    darkColor: 'bg-[hsl(270_76%_60%)]',
    category: 'image',
  },
  {
    value: 'cyan',
    label: 'クール',
    description: 'シアン系のクールでモダンな印象',
    color: 'bg-[hsl(180_100%_35%)]',
    darkColor: 'bg-[hsl(180_100%_45%)]',
    category: 'image',
  },
  {
    value: 'pink',
    label: '華やか',
    description: 'ピンク系の明るく華やかな雰囲気',
    color: 'bg-[hsl(330_90%_55%)]',
    darkColor: 'bg-[hsl(330_90%_60%)]',
    category: 'image',
  },
  {
    value: 'brown',
    label: 'アンティーク',
    description: 'ブラウン系の落ち着いた風合い',
    color: 'bg-[hsl(30_60%_40%)]',
    darkColor: 'bg-[hsl(30_60%_50%)]',
    category: 'image',
  },
  {
    value: 'forest',
    label: '自然',
    description: 'フォレスト系の深みのある緑',
    color: 'bg-[hsl(150_50%_30%)]',
    darkColor: 'bg-[hsl(150_50%_45%)]',
    category: 'image',
  },
];

// ダークモードオプション
type ModeOption = {
  value: string;
  label: string;
  icon: React.ElementType;
};

const modeOptions: ModeOption[] = [
  {
    value: 'light',
    label: 'ライト',
    icon: ({ className }: { className?: string }) => (
      <Sun className={cn('h-4 w-4 text-yellow-500', className)} />
    ),
  },
  {
    value: 'dark',
    label: 'ダーク',
    icon: ({ className }: { className?: string }) => (
      <Moon className={cn('h-4 w-4 text-blue-300', className)} />
    ),
  },
  {
    value: 'system',
    label: 'システム',
    icon: ({ className }: { className?: string }) => (
      <Monitor className={cn('h-4 w-4', className)} />
    ),
  },
];

export function ThemeSettingsFab() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState('default');
  const { theme, setTheme } = useTheme();
  const { colorTheme, setColorTheme } = useColorTheme();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);

    // フォントの初期値をCookieから取得
    const savedFont =
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('font-family='))
        ?.split('=')[1] || 'default';

    setSelectedFont(savedFont);

    // 初期表示時にもフォントクラスを適用する
    if (savedFont && savedFont !== 'default') {
      // 既存のフォントクラスをクリア
      document.documentElement.classList.remove(
        'font-sans',
        'font-serif',
        'font-rounded',
        'font-noto-sans',
        'font-zen-gothic',
        'font-mincho'
      );

      // フォントクラスを追加
      const option = fontOptions.find((opt) => opt.value === savedFont);
      if (option) {
        document.documentElement.classList.add(option.className);
      }
    }

    // 現在のダークモード状態を取得
    setIsDark(document.documentElement.classList.contains('dark'));

    // ダークモードの変更を監視
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

  // フォント変更時にHTMLに適用
  useEffect(() => {
    if (!mounted) return;

    // デバッグログ
    console.log('フォント変更:', selectedFont);
    console.log('現在のクラス:', document.documentElement.className);

    // すべてのフォントクラスを一度削除する
    const fontClasses = [
      'font-sans',
      'font-serif',
      'font-rounded',
      'font-noto-sans',
      'font-zen-gothic',
      'font-mincho',
    ];

    document.documentElement.classList.remove(...fontClasses);

    // body要素にも同じクラスを適用
    for (const cls of fontClasses) {
      document.body.classList.remove(cls);
    }

    // 選択されたフォントのクラスを追加
    const option = fontOptions.find((opt) => opt.value === selectedFont);
    if (option) {
      // HTML要素にクラスを追加
      document.documentElement.classList.add(option.className);
      // body要素にも同じクラスを追加
      document.body.classList.add(option.className);

      // インラインスタイルも設定（最も優先度が高い）
      const fontFamily = getComputedStyle(
        document.documentElement
      ).getPropertyValue(`--${option.className.replace('font-', '')}`);

      if (fontFamily) {
        document.documentElement.style.setProperty('font-family', fontFamily);
        document.body.style.setProperty('font-family', fontFamily);
      } else {
        // 直接変数マッピング
        let fontVar = '';
        switch (option.value) {
          case 'noto-sans':
            fontVar = '--font-noto';
            break;
          case 'zen-gothic':
            fontVar = '--font-zen-gothic';
            break;
          case 'mincho':
            fontVar = '--font-mincho';
            break;
          case 'rounded':
            fontVar = '--font-maru-gothic';
            break;
          default:
            fontVar = '--font-sans';
        }

        // 変数値を直接取得
        const fontVarValue = getComputedStyle(
          document.documentElement
        ).getPropertyValue(fontVar);
        if (fontVarValue) {
          console.log('フォント変数値:', fontVarValue);
          document.documentElement.style.setProperty(
            'font-family',
            fontVarValue
          );
          document.body.style.setProperty('font-family', fontVarValue);
        } else {
          console.warn('フォント変数が見つかりません:', fontVar);
        }
      }

      console.log('適用したフォントクラス:', option.className);
      console.log('変更後のクラス:', document.documentElement.className);
    }

    // Cookieに保存 (SameSite=Laxを追加して確実に保存されるように)
    document.cookie = `font-family=${selectedFont}; path=/; max-age=31536000; SameSite=Lax`; // 1年間有効
  }, [selectedFont, mounted]);

  // マウント前は何も表示しない
  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-card dark:bg-card rounded-lg shadow-lg p-4 w-full max-w-xs md:max-w-md lg:max-w-lg space-y-4 border border-border">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">テーマ設定</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">閉じる</span>
            </Button>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-medium">カラーテーマ</div>
            <div className="grid grid-cols-2 gap-2">
              {themeOptions
                .filter((option) => option.category === 'color')
                .map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    className={cn(
                      'p-2 rounded-md flex items-center gap-2 transition-colors border border-transparent',
                      colorTheme === option.value
                        ? 'bg-accent text-accent-foreground border-ring'
                        : 'hover:bg-muted'
                    )}
                    onClick={() => setColorTheme(option.value)}
                    title={option.description}
                  >
                    <div
                      className={cn(
                        'w-4 h-4 rounded-full',
                        isDark ? option.darkColor || option.color : option.color
                      )}
                    />
                    <span className="text-sm">{option.label}</span>
                  </button>
                ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-medium">イメージテーマ</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {themeOptions
                .filter((option) => option.category === 'image')
                .map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    className={cn(
                      'px-3 py-2 rounded-md flex items-center gap-2 transition-colors border border-transparent',
                      colorTheme === option.value
                        ? 'bg-accent text-accent-foreground border-ring'
                        : 'hover:bg-muted'
                    )}
                    onClick={() => setColorTheme(option.value)}
                    title={option.description}
                  >
                    <div
                      className={cn(
                        'w-4 h-4 rounded-full',
                        isDark ? option.darkColor || option.color : option.color
                      )}
                    />
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium">
                        {option.label}
                      </span>
                      {option.description && (
                        <span className="text-xs text-muted-foreground">
                          {option.description}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium mb-1">表示モード</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {modeOptions.map((option) => (
                <button
                  type="button"
                  key={option.value}
                  className={cn(
                    'px-3 py-1.5 rounded-md flex items-center gap-2 transition-colors',
                    theme === option.value
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-muted'
                  )}
                  onClick={() => setTheme(option.value)}
                >
                  <option.icon />
                  <span className="text-sm">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium mb-1">フォント</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {fontOptions.map((option) => (
                <button
                  type="button"
                  key={option.value}
                  className={cn(
                    'px-3 py-2 rounded-md flex items-center gap-2 transition-colors',
                    selectedFont === option.value
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-muted',
                    option.className
                  )}
                  onClick={() => setSelectedFont(option.value)}
                >
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{option.label}</span>
                    {option.description && (
                      <span className="text-xs text-muted-foreground">
                        {option.description}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Button
          variant="default"
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg bg-primary"
          onClick={() => setIsOpen(true)}
        >
          <Settings className="h-5 w-5" />
          <span className="sr-only">テーマ設定</span>
        </Button>
      )}
    </div>
  );
}
