// TODO: 型定義を graphic-design/_components/WorkShowcase.tsx に移動し、そこからインポートする
interface WorkSampleItem {
	// 仮の型定義
	title: string;
	description: string;
	imageSrc: string;
	alt: string;
}

// import type { ShowcaseItem } from "../_components/WorkShowcase"; // 本来のインポート

// TODO: グラフィックデザインの具体的な制作実績データを追加
export const sampleItems: WorkSampleItem[] = [
	{
		title: "企業案内パンフレット",
		description:
			"事業内容や強みを分かりやすく紹介する、A4サイズのパンフレットデザイン。",
		imageSrc: "/images/samples/design-pamphlet.jpg", // TODO: 正しい画像パスに差し替え
		alt: "企業案内パンフレットのデザインサンプル",
	},
	{
		title: "イベント告知チラシ",
		description:
			"ターゲット層に響くキャッチコピーとデザインで集客を促すB5チラシ。",
		imageSrc: "/images/samples/design-flyer.jpg", // TODO: 正しい画像パスに差し替え
		alt: "イベント告知チラシのデザインサンプル",
	},
	{
		title: "飲食店メニューデザイン",
		description:
			"料理写真とテキストを効果的に配置し、注文意欲を高めるメニューブック。",
		imageSrc: "/images/samples/design-menu.jpg", // TODO: 正しい画像パスに差し替え
		alt: "飲食店メニューのデザインサンプル",
	},
	{
		title: "商品パッケージデザイン",
		description:
			"ブランドイメージと商品の魅力を伝える、オリジナルのパッケージデザイン。",
		imageSrc: "/images/samples/design-package.jpg", // TODO: 正しい画像パスに差し替え
		alt: "商品パッケージのデザインサンプル",
	},
	// TODO: 他のサンプルを追加 (例: ポスター, 名刺デザイン, ロゴデザインなど)
];

export const sectionTitle = "制作実績";
export const note =
	"上記は制作実績の一例です。様々な業種・媒体のデザインに対応可能です。お気軽にご相談ください。";
