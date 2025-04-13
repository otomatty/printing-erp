import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/error/index.ts', 'src/auth/index.ts'],
  format: ['esm', 'cjs'],
  dts: {
    entry: {
      index: 'src/index.ts',
      error: 'src/error/index.ts',
      auth: 'src/auth/index.ts',
    },
  },
  clean: true,
  treeshake: true,
  sourcemap: true,
});
