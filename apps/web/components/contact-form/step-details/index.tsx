import { useAtom } from 'jotai';
import { inquiryTypeAtom, isFormValidAtom } from '~/store/contact-form';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';

// PrintServicesFormをインポート
import PrintServicesForm from './printing';
// IT・デジタルサービス用の新コンポーネントをインポート
import DigitalServiceOptions from './it-digital';
// generalInquiryFormAtomとGeneralInquiryFormコンポーネントは別ファイルから
import GeneralInquiryForm from './general';

// onAIEstimateSelectプロップの型定義を追加
interface StepDetailsProps {
  onAIEstimateSelect?: () => void;
}

export default function StepDetails({ onAIEstimateSelect }: StepDetailsProps) {
  const [inquiryType] = useAtom(inquiryTypeAtom);
  const setIsFormValid = useSetAtom(isFormValidAtom);

  // 問い合わせタイプが選択されていない場合はフォームを無効にする
  useEffect(() => {
    if (!inquiryType) {
      setIsFormValid(false);
    }
  }, [inquiryType, setIsFormValid]);

  // 問い合わせタイプに応じたヘッダーテキストを取得
  const getHeaderText = () => {
    switch (inquiryType) {
      case 'print-services':
        return '印刷サービスに関するお問い合わせ';
      case 'digital-services':
        return 'IT・デジタルサービスに関するお問い合わせ';
      case 'general-inquiry':
        return 'その他のお問い合わせ・ご質問';
      default:
        return 'お問い合わせ内容';
    }
  };

  // 問い合わせタイプに応じたフォームを表示
  const renderForm = () => {
    switch (inquiryType) {
      case 'print-services':
        return <PrintServicesForm />;
      case 'digital-services':
        return (
          <DigitalServiceOptions onAIEstimateSelect={onAIEstimateSelect} />
        );
      case 'general-inquiry':
        return <GeneralInquiryForm />;
      default:
        setIsFormValid(false);
        return (
          <div className="text-center py-8 text-gray-500">
            お問い合わせの種類を選択してください
          </div>
        );
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">{getHeaderText()}</h2>
      {renderForm()}
    </div>
  );
}
