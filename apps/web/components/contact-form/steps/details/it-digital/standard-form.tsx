import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { isFormValidAtom, digitalStandardFormAtom } from '~/store/contact-form';
import { Button } from '@kit/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { currentStepAtom } from '~/store/contact-form';

interface DigitalStandardFormProps {
  onBackToSelection?: () => void;
}

export default function DigitalStandardForm({
  onBackToSelection,
}: DigitalStandardFormProps) {
  const [formData, setFormData] = useAtom(digitalStandardFormAtom);
  const [isFormValid, setIsFormValid] = useAtom(isFormValidAtom);
  const [showValidation, setShowValidation] = useState(false);
  const [, setCurrentStep] = useAtom(currentStepAtom);

  // フォームのバリデーション - プロジェクト内容が入力されていればOK
  useEffect(() => {
    const isValid = !!formData.projectDescription;
    setIsFormValid(isValid);
  }, [formData, setIsFormValid]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setShowValidation(true); // 入力があった場合のみバリデーションを表示
  };

  // 次へボタンの処理 - 次のステップ（ユーザー情報）に進む
  const handleNext = () => {
    setCurrentStep('user-info');
  };

  return (
    <div className="space-y-5">
      <div className="w-full">
        <label
          htmlFor="projectDescription"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          ご要望内容 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="projectDescription"
          name="projectDescription"
          rows={8}
          value={formData.projectDescription}
          onChange={handleChange}
          placeholder="Webサイト制作やアプリ開発など、ご検討中のプロジェクトについて詳しくお聞かせください。予算や納期などの希望があればあわせてご記入ください。"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary/50 focus:border-primary"
          required
        />
        {!formData.projectDescription && showValidation && (
          <p className="text-xs text-red-500 mt-1">ご要望内容は必須項目です</p>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBackToSelection}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          戻る
        </Button>
        <Button onClick={handleNext} disabled={!isFormValid}>
          次へ
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
