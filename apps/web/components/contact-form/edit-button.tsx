import React from "react";
import { Pencil } from "lucide-react";

type EditButtonProps = {
	onClick: () => void;
	label?: string;
};

/**
 * 編集ボタンコンポーネント
 * 親要素のhover時にのみ表示される
 */
export default function EditButton({
	onClick,
	label = "変更する",
}: EditButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="edit-button text-primary text-xs flex items-center opacity-0 group-hover:opacity-100 transition-opacity hover:underline cursor-pointer"
		>
			<Pencil size={12} className="mr-1" />
			{label}
		</button>
	);
}

// 親コンポーネントで以下のようなCSSを使用してください
// <div className="relative group">
//   {/* コンテンツ */}
//   <EditButton onClick={() => handleEdit()} />
// </div>
