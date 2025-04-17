'use client';

import { useAtom } from 'jotai';
import { formDataAtom } from '~/store/estimate';
import { useState } from 'react';
import { Label } from '@kit/ui/label';
import { Input } from '@kit/ui/input';
import { RadioGroup, RadioGroupItem } from '@kit/ui/radio-group';

export function UserInfoStep() {
  const [formData, setFormData] = useAtom(formDataAtom);
  const [showValidation, setShowValidation] = useState(false);

  // 電話番号が必須かどうかを判定
  const isPhoneRequired =
    formData.preferredContact === 'phone' ||
    formData.preferredContact === 'either';

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setShowValidation(true);
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredContact: value as 'email' | 'phone' | 'either',
    }));
    setShowValidation(true);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          見積書の作成と連絡先情報として使用します。正確な情報をご入力ください。
        </p>
      </div>

      <div>
        <Label
          htmlFor="customerName"
          className="block text-sm font-medium mb-1"
        >
          お名前 <span className="text-destructive">*</span>
        </Label>
        <Input
          type="text"
          id="customerName"
          name="customerName"
          required
          value={formData.customerName || ''}
          onChange={handleInputChange}
          className="w-full"
        />
        {!formData.customerName && showValidation && (
          <p className="text-xs text-destructive mt-1">お名前は必須項目です</p>
        )}
      </div>

      <div>
        <Label htmlFor="companyName" className="block text-sm font-medium mb-1">
          会社名・団体名
        </Label>
        <Input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName || ''}
          onChange={handleInputChange}
          className="w-full"
        />
      </div>

      <div>
        <Label htmlFor="postalCode" className="block text-sm font-medium mb-1">
          郵便番号
        </Label>
        <Input
          type="text"
          id="postalCode"
          name="postalCode"
          value={formData.postalCode || ''}
          onChange={handleInputChange}
          placeholder="1234567（ハイフンなし）"
          className="w-full"
        />
      </div>

      <div>
        <Label htmlFor="address" className="block text-sm font-medium mb-1">
          住所
        </Label>
        <Input
          type="text"
          id="address"
          name="address"
          value={formData.address || ''}
          onChange={handleInputChange}
          className="w-full"
        />
      </div>

      <div>
        <Label htmlFor="email" className="block text-sm font-medium mb-1">
          メールアドレス <span className="text-destructive">*</span>
        </Label>
        <Input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email || ''}
          onChange={handleInputChange}
          className="w-full"
        />
        {!formData.email && showValidation && (
          <p className="text-xs text-destructive mt-1">
            メールアドレスは必須項目です
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="phone" className="block text-sm font-medium mb-1">
          電話番号{' '}
          {isPhoneRequired && <span className="text-destructive">*</span>}
        </Label>
        <Input
          type="tel"
          id="phone"
          name="phone"
          required={isPhoneRequired}
          value={formData.phone || ''}
          onChange={handleInputChange}
          placeholder="09012345678（ハイフンなし）"
          className="w-full"
        />
        {isPhoneRequired && !formData.phone && showValidation && (
          <p className="text-xs text-destructive mt-1">
            電話での連絡を希望される場合は電話番号の入力が必要です
          </p>
        )}
      </div>

      <div>
        <Label className="block text-sm font-medium mb-2">
          ご希望の連絡方法
        </Label>
        <RadioGroup
          value={formData.preferredContact || 'email'}
          onValueChange={handleRadioChange}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="email" id="contact-email" />
            <Label htmlFor="contact-email" className="cursor-pointer">
              メール
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="phone" id="contact-phone" />
            <Label htmlFor="contact-phone" className="cursor-pointer">
              電話
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="either" id="contact-either" />
            <Label htmlFor="contact-either" className="cursor-pointer">
              どちらでも
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
