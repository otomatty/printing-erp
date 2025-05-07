/**
 * アプリのトップページコンポーネント
 * 今後実装予定の機能概要を紹介するページ
 */
import { HomeHero } from './_components/HomeHero';
import { HomeFeatures } from './_components/HomeFeatures';
import { HomeContact } from './_components/HomeContact';

export default function AppHomePage() {
  return (
    <main className="flex flex-col bg-gray-50">
      {/* ヒーローセクション */}
      <HomeHero />
      {/* 機能紹介セクション */}
      <div className="-mt-20 pt-20">
        <HomeFeatures />
      </div>
      {/* お問い合わせセクション */}
      <HomeContact />
    </main>
  );
}
