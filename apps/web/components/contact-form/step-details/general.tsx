import { useAtom } from 'jotai';
import { isFormValidAtom, generalInquiryFormAtom } from '~/store/contact-form';
import { useEffect, useState } from 'react';
import type { GeneralInquiryFormData } from '~/types/contact-form';

// その他のお問い合わせ・ご質問フォーム
export default function GeneralInquiryForm() {
  const [formData, setFormData] = useAtom(generalInquiryFormAtom);
  const setIsFormValid = useAtom(isFormValidAtom)[1];
  const [showValidation, setShowValidation] = useState(false);

  // フォームのバリデーション
  useEffect(() => {
    const isValid = !!formData.inquiryContent;
    setIsFormValid(isValid);
  }, [formData, setIsFormValid]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setShowValidation(true); // 入力があった場合のみバリデーションを表示
  };

  return (
    <div className="space-y-5">
      <div className="w-full">
        <label
          htmlFor="inquiryContent"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          お問い合わせ内容 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="inquiryContent"
          name="inquiryContent"
          rows={6}
          value={formData.inquiryContent}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary/50 focus:border-primary"
          required
        />
        {!formData.inquiryContent && showValidation && (
          <p className="text-xs text-red-500 mt-1">
            お問い合わせ内容は必須項目です
          </p>
        )}
      </div>
    </div>
  );
}
