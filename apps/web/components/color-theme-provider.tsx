'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { setCookie, getCookie } from 'cookies-next';

export type ColorTheme =
  | 'default'
  | 'blue'
  | 'red'
  | 'orange'
  | 'purple'
  | 'cyan'
  | 'pink'
  | 'brown'
  | 'forest';

interface ColorThemeContextProps {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

const ColorThemeContext = createContext<ColorThemeContextProps>({
  colorTheme: 'default',
  setColorTheme: () => null,
});

export function useColorTheme() {
  return useContext(ColorThemeContext);
}

export function ColorThemeProvider({
  children,
  initialColorTheme = 'default',
}: {
  children: ReactNode;
  initialColorTheme?: ColorTheme;
}) {
  const [colorTheme, setColorTheme] = useState<ColorTheme>(initialColorTheme);
  const [mounted, setMounted] = useState(false);

  // 初回マウント時のみCookieからテーマを読み込む
  useEffect(() => {
    setMounted(true);
    const savedTheme = getCookie('color-theme') as ColorTheme | undefined;
    if (savedTheme) {
      setColorTheme(savedTheme);
    }
  }, []); // 空の依存配列で初回マウント時のみ実行

  // colorThemeが変更されたときにHTMLにクラスを適用しCookieを保存
  useEffect(() => {
    if (!mounted) return;

    // bodyにテーマクラスを適用
    document.documentElement.classList.remove(
      'theme-blue',
      'theme-red',
      'theme-orange',
      'theme-purple',
      'theme-cyan',
      'theme-pink',
      'theme-brown',
      'theme-forest'
    );
    if (colorTheme !== 'default') {
      document.documentElement.classList.add(`theme-${colorTheme}`);
    }

    // クッキーにテーマを保存
    setCookie('color-theme', colorTheme, { path: '/' });
  }, [colorTheme, mounted]);

  return (
    <ColorThemeContext.Provider
      value={{
        colorTheme,
        setColorTheme,
      }}
    >
      {children}
    </ColorThemeContext.Provider>
  );
}
