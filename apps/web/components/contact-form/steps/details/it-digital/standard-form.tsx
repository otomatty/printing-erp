import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { isFormValidAtom, digitalServicesFormAtom } from '~/store/contact-form';
import { Label } from '@kit/ui/label';
import { Textarea } from '@kit/ui/textarea';
import FieldBadge from '~/components/custom/field-badge';

export default function DigitalStandardForm() {
  const [formData, setFormData] = useAtom(digitalServicesFormAtom);
  const [isFormValid, setIsFormValid] = useAtom(isFormValidAtom);
  const [showValidation, setShowValidation] = useState(false);

  // digitalServiceTypeが'standard'のときだけprojectDescriptionを扱う
  if (formData.digitalServiceType !== 'standard') {
    return null;
  }

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

  return (
    <div className="space-y-5">
      <div className="w-full">
        <Label
          htmlFor="projectDescription"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          ご要望内容
          <FieldBadge variant="required" className="ml-2" />
        </Label>
        <Textarea
          id="projectDescription"
          name="projectDescription"
          rows={8}
          value={formData.projectDescription}
          onChange={handleChange}
          placeholder="ホームページ制作やアプリ開発など、ご検討中のプロジェクトについて詳しくお聞かせください。予算や納期などの希望があればあわせてご記入ください。"
          className="bg-white w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary/50 focus:border-primary"
          required
        />
        {!formData.projectDescription && showValidation && (
          <p className="text-xs text-red-500 mt-1">ご要望内容は必須項目です</p>
        )}
      </div>
    </div>
  );
}
