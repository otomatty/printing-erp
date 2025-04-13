import type React from "react";
import type { ReasonCardData } from "../system/_data/whyChooseUsData";

interface ReasonCardProps {
	data: ReasonCardData;
}

// 強調テキストを処理する関数
const renderHighlightedText = (text: string, highlights?: string[]) => {
	if (!highlights || highlights.length === 0)
		return <p className="text-gray-600">{text}</p>;

	// テキストを分割してハイライトを適用
	const parts: React.ReactNode[] = [];
	let lastIndex = 0;

	// 各ハイライトキーワードでテキストを処理
	for (const highlight of highlights) {
		const regex = new RegExp(`(${highlight})`, "g");

		// matchAllを使ってマッチを見つける
		const matches = Array.from(text.matchAll(regex));

		for (const match of matches) {
			if (match.index === undefined) continue;

			// マッチの前のテキストを追加
			if (match.index > lastIndex) {
				parts.push(
					<span key={`text-${lastIndex}`}>
						{text.substring(lastIndex, match.index)}
					</span>,
				);
			}

			// ハイライトされたテキストを追加
			parts.push(
				<span
					key={`highlight-${match.index}`}
					className="font-semibold text-blue-600 border-b border-blue-300 pb-0.5"
				>
					{match[0]}
				</span>,
			);

			lastIndex = match.index + match[0].length;
		}
	}

	// 残りのテキストを追加
	if (lastIndex < text.length) {
		parts.push(
			<span key={`text-${lastIndex}`}>{text.substring(lastIndex)}</span>,
		);
	}

	return <p className="text-gray-600">{parts}</p>;
};

const ReasonCard: React.FC<ReasonCardProps> = ({ data }) => {
	const { icon: Icon, title, description, highlights } = data;

	return (
		<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
			<div className="text-center mb-5">
				<div className="bg-blue-100 p-4 rounded-full inline-block">
					<Icon className="h-8 w-8 text-blue-600" />
				</div>
				<h3 className="text-xl font-semibold mt-4">{title}</h3>
			</div>
			{renderHighlightedText(description, highlights)}
		</div>
	);
};

export default ReasonCard;
