/*
 * QRコード生成ツールページ (サーバーコンポーネント)
 */
import QrCodePageClient from './qr-code-page-client';

export const dynamic = 'force-dynamic';

export default function QrCodePage() {
  return <QrCodePageClient />;
}
