import { defineConfig } from 'tsup';

/**
 * tsupの設定
 * @description パッケージのビルド設定を定義します
 * - メインエントリーポイントとアクション、ルートのビルドを行います
 * - ESMとCJSの両方のフォーマットでビルドします
 * - 型定義ファイルを生成します
 */
export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'actions/index': 'src/actions/index.ts',
    'actions/enhance-action': 'src/actions/enhance-action.ts',
    'actions/auth/index': 'src/actions/auth/index.ts',
    'routes/index': 'src/routes/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  external: [
    'react',
    'next',
    'zod',
    '@kit/auth',
    '@kit/supabase',
    '@kit/types',
  ],
  treeshake: true,
  sourcemap: true,
  // Vercelビルド用の設定
  noExternal: [],
  skipNodeModulesBundle: false, // falseに変更してモジュール解決を改善
  splitting: false, // コード分割を無効化して相対インポートの問題を回避
  minify: false,
  legacyOutput: false,
  target: 'es2020',
  outDir: 'dist',
  // tsupのパフォーマンスを向上
  ignoreWatch: ['node_modules', 'dist'],
  onSuccess: 'echo "Build completed successfully!"',
});
