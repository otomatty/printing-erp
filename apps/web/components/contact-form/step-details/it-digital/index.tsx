import { useState } from 'react';
import { useAtom } from 'jotai';
import { isFormValidAtom } from '~/store/contact-form';

// 各フォームコンポーネントをインポート
import DigitalStandardForm from './standard-form';
// 新しい見積もりフォームコンポーネントをインポート
import { EstimateForm } from './estimate/estimate-form';

// 表示モードの型定義
type DisplayMode = 'selection' | 'ai-estimate' | 'standard-form';

// プロップスの型定義
interface DigitalServiceOptionsProps {
  onAIEstimateSelect?: () => void;
}

// オプションの定義
const digitalServiceOptions = [
  {
    id: 'ai-estimate',
    title: 'AI自動見積もり',
    description:
      'プロジェクトの詳細を入力して、AIによる即時見積もりを取得します。',
    icon: '💡',
  },
  {
    id: 'standard-form',
    title: '通常の問い合わせフォーム',
    description: '従来の方法で、詳細なお問い合わせフォームに記入します。',
    icon: '📝',
  },
];

export default function DigitalServiceOptions({
  onAIEstimateSelect,
}: DigitalServiceOptionsProps) {
  // 表示モードの状態 - 初期値は選択画面
  const [displayMode, setDisplayMode] = useState<DisplayMode>('selection');
  const setIsFormValid = useAtom(isFormValidAtom)[1];

  // オプションが選択されたときの処理
  const handleOptionSelect = (mode: 'ai-estimate' | 'standard-form') => {
    setDisplayMode(mode);

    // AI自動見積もりが選択された場合、親コンポーネントに通知
    if (mode === 'ai-estimate' && onAIEstimateSelect) {
      onAIEstimateSelect();
    }

    // 選択モードでは常にバリデーションを無効にしておく
    setIsFormValid(false);
  };

  // 選択画面に戻る処理
  const handleBackToSelection = () => {
    setDisplayMode('selection');
    setIsFormValid(false);
  };

  // 選択画面の表示
  if (displayMode === 'selection') {
    return (
      <div className="space-y-6">
        <div className="text-sm text-gray-600 mb-4">
          ご希望のお問い合わせ方法を選択してください
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {digitalServiceOptions.map((option) => (
            <button
              type="button"
              key={option.id}
              className="border rounded-lg p-4 cursor-pointer transition-all hover:border-primary/30 hover:bg-gray-50"
              onClick={() =>
                handleOptionSelect(option.id as 'ai-estimate' | 'standard-form')
              }
            >
              <div className="flex flex-col h-full">
                <div className="text-3xl mb-3">{option.icon}</div>
                <h3 className="font-medium text-gray-900 mb-2">
                  {option.title}
                </h3>
                <p className="text-sm text-gray-500 flex-grow">
                  {option.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 戻るボタン付きのラッパー
  const FormWrapper = ({ children }: { children: React.ReactNode }) => (
    <div>
      <button
        type="button"
        onClick={handleBackToSelection}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-4 text-sm"
      >
        ← 選択画面に戻る
      </button>
      {children}
    </div>
  );

  // 選択に応じたフォームを表示
  if (displayMode === 'ai-estimate') {
    return (
      <FormWrapper>
        <EstimateForm />
      </FormWrapper>
    );
  }

  if (displayMode === 'standard-form') {
    return (
      <FormWrapper>
        <DigitalStandardForm />
      </FormWrapper>
    );
  }

  // 念のため
  return null;
}
