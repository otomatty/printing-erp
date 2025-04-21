import Image from 'next/image';

// Removed unused icons: only Google inline SVG is supported

const DEFAULT_IMAGE_SIZE = 18;

/**
 * @name OauthProviderLogoImage
 * @description
 * 認証プロバイダー（Google、GitHub、Facebookなど）のロゴ画像を表示するコンポーネント。
 * プロバイダーIDに基づいて適切なロゴを表示する。
 *
 * @features
 * - 各種OAuthプロバイダーのロゴ表示
 * - カスタムサイズ設定
 * - 画像最適化（Next.js Image使用）
 * - フォールバックアイコン（パスワード、電話番号用）
 *
 * @dependencies
 * - next/image: Next.jsの最適化画像コンポーネント
 * - lucide-react: アイコンライブラリ
 *
 * @param {Object} props
 * @param {string} props.providerId - 認証プロバイダーのID（例: 'google', 'github'）
 * @param {number} [props.width] - ロゴの幅（ピクセル）
 * @param {number} [props.height] - ロゴの高さ（ピクセル）
 *
 * @example
 * ```tsx
 * <OauthProviderLogoImage
 *   providerId="google"
 *   width={24}
 *   height={24}
 * />
 * ```
 */
export function OauthProviderLogoImage({
  providerId,
  width,
  height,
}: {
  providerId: string;
  width?: number;
  height?: number;
}) {
  const image = getOAuthProviderLogos()[providerId];

  if (typeof image === 'string') {
    return (
      <Image
        decoding={'async'}
        loading={'lazy'}
        src={image}
        alt={`${providerId} logo`}
        width={width ?? DEFAULT_IMAGE_SIZE}
        height={height ?? DEFAULT_IMAGE_SIZE}
      />
    );
  }

  return <>{image}</>;
}

function getOAuthProviderLogos(): Record<string, React.ReactNode> {
  // Currently only Google is supported - use inline SVG
  return {
    google: (
      <svg
        width={DEFAULT_IMAGE_SIZE}
        height={DEFAULT_IMAGE_SIZE}
        viewBox="-3 0 262 262"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid"
        role="img"
        aria-label="Google logo"
      >
        <path
          d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
          fill="#4285F4"
        />
        <path
          d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
          fill="#34A853"
        />
        <path
          d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
          fill="#FBBC05"
        />
        <path
          d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
          fill="#EB4335"
        />
      </svg>
    ),
  };
}
