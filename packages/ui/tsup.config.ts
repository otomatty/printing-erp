import { defineConfig, type Format } from 'tsup';
import {
  shadcnEntries,
  makerkitEntries,
  magicuiEntries,
  customEntries,
  utilEntries,
} from './config/tsup/entries';

// エントリーポイントの種類を対応付ける
const entriesMap = {
  shadcn: shadcnEntries,
  makerkit: makerkitEntries,
  magicui: magicuiEntries,
  custom: customEntries,
  utils: utilEntries,
};

// コマンドライン引数からエントリーポイントを取得
const entryPoint = process.env.ENTRY_POINT || '';

console.log(`Building with entry point: ${entryPoint}`);

// 対応するエントリーポイント配列を取得
const selectedEntries = entriesMap[entryPoint as keyof typeof entriesMap];

if (!selectedEntries) {
  console.error(`Invalid entry point: ${entryPoint}`);
  console.error(`Valid entry points: ${Object.keys(entriesMap).join(', ')}`);
  process.exit(1);
}

const baseConfig = {
  format: ['esm', 'cjs'] as Format[],
  dts: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    'next',
    '@radix-ui/*',
    'tailwindcss',
    'clsx',
    'lucide-react',
    '@hookform/resolvers',
    'cmdk',
    'input-otp',
    'react-day-picker',
    'react-top-loading-bar',
    'recharts',
    'tailwind-merge',
    'class-variance-authority',
    'next-themes',
    'react-hook-form',
    'react-i18next',
    'sonner',
    'zod',
  ],
  treeshake: true,
  sourcemap: true,
  outDir: 'dist',
  splitting: true,
  bundle: true,
  minify: true,
  workers: 2,
};

// 単一のエントリーポイントセットでビルド
export default defineConfig({
  ...baseConfig,
  entry: selectedEntries,
});
