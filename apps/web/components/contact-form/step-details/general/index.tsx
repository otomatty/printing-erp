import { useAtom } from 'jotai';
import { isFormValidAtom } from '~/store/contact-form';
import { useEffect, useState } from 'react';
import { atom } from 'jotai';
import type { GeneralInquiryFormData } from '~/types/contact-form';

// 一般的な問い合わせフォームのAtom
export const generalInquiryFormAtom = atom<GeneralInquiryFormData>({
  inquiryType: 'general-inquiry',
  inquiryContent: '',
  preferredContactMethod: 'email',
  preferredContactTime: '',
});

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

      <div className="w-full">
        <label
          htmlFor="preferredContactMethod"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          希望する回答方法
        </label>
        <select
          id="preferredContactMethod"
          name="preferredContactMethod"
          value={formData.preferredContactMethod}
          onChange={handleChange}
          className="w-full max-w-[300px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary/50 focus:border-primary"
        >
          <option value="">選択してください</option>
          <option value="email">メール</option>
          <option value="phone">電話</option>
        </select>
      </div>

      {formData.preferredContactMethod === 'phone' && (
        <div className="w-full">
          <label
            htmlFor="preferredContactTime"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            ご希望の連絡時間帯
          </label>
          <input
            type="text"
            id="preferredContactTime"
            name="preferredContactTime"
            value={formData.preferredContactTime}
            onChange={handleChange}
            placeholder="例: 平日10時～17時"
            className="w-full max-w-[300px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary/50 focus:border-primary"
          />
        </div>
      )}
    </div>
  );
}
