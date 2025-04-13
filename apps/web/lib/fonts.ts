import {
  Inter,
  Noto_Sans_JP,
  Zen_Kaku_Gothic_New,
  Shippori_Mincho_B1,
  M_PLUS_Rounded_1c,
} from 'next/font/google';

/**
 * @sans
 * @description Define here the sans font.
 * By default, it uses the Inter font from Google Fonts.
 */
const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  fallback: ['system-ui', 'Helvetica Neue', 'Helvetica', 'Arial'],
  preload: true,
  weight: ['400', '500', '700'],
  display: 'swap',
});

/**
 * @noto
 * @description Japanese font using Noto Sans JP from Google Fonts.
 */
const noto = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto',
  preload: true,
  weight: ['400', '500', '700'],
  display: 'swap',
});

/**
 * @zenGothic
 * @description Japanese font using Zen Kaku Gothic New from Google Fonts.
 */
const zenGothic = Zen_Kaku_Gothic_New({
  subsets: ['latin'],
  variable: '--font-zen-gothic',
  preload: true,
  weight: ['400', '700'],
  display: 'swap',
});

/**
 * @mincho
 * @description Japanese mincho font using Shippori Mincho B1 from Google Fonts.
 */
const mincho = Shippori_Mincho_B1({
  subsets: ['latin'],
  variable: '--font-mincho',
  preload: true,
  weight: ['400', '500', '700'],
  display: 'swap',
});

/**
 * @maruGothic
 * @description Japanese rounded gothic font using M PLUS Rounded 1c from Google Fonts.
 */
const maruGothic = M_PLUS_Rounded_1c({
  subsets: ['latin'],
  variable: '--font-maru-gothic',
  preload: true,
  weight: ['400', '500', '700'],
  display: 'swap',
});

/**
 * @heading
 * @description Define here the heading font.
 */
const heading = sans;

// we export these fonts into the root layout
export { sans, heading, noto, zenGothic, mincho, maruGothic };
