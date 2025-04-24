import type React from 'react';

import { Label } from '@kit/ui/label';
import { Input } from '@kit/ui/input';
import { RadioGroup, RadioGroupItem } from '@kit/ui/radio-group';
import FieldBadge from '~/components/custom/field-badge';

import { useAtom } from 'jotai';
import { userInfoAtom } from '~/store/contact-form';
import { useState } from 'react';

export default function StepUserInfo() {
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [showValidation, setShowValidation] = useState(false);

  // 電話番号が必須かどうかを判定
  const isPhoneRequired =
    userInfo.preferredContact === 'phone' ||
    userInfo.preferredContact === 'either';

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
    setShowValidation(true);
  };

  const handleRadioChange = (value: string) => {
    setUserInfo((prev) => ({ ...prev, preferredContact: value }));
    setShowValidation(true);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">お客様情報</h2>
      <p className="text-gray-600 mb-6">
        お問い合わせに対する回答をお送りするために、以下の情報をご入力ください。
      </p>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="block text-sm font-medium mb-1">
            お名前
            <FieldBadge variant="required" className="ml-2" />
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            required
            value={userInfo.name}
            onChange={handleInputChange}
            className="bg-white w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary"
          />
          {!userInfo.name && showValidation && (
            <p className="text-xs text-red-500 mt-1">お名前は必須項目です</p>
          )}
        </div>

        <div>
          <Label
            htmlFor="companyName"
            className="block text-sm font-medium mb-1"
          >
            会社名・団体名
            <FieldBadge variant="optional" className="ml-2" />
          </Label>
          <Input
            type="text"
            id="companyName"
            name="companyName"
            value={userInfo.companyName}
            onChange={handleInputChange}
            className="bg-white w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary"
          />
        </div>

        <div>
          <Label
            htmlFor="postalCode"
            className="block text-sm font-medium mb-1"
          >
            郵便番号
            <FieldBadge variant="optional" className="ml-2" />
          </Label>
          <Input
            type="text"
            id="postalCode"
            name="postalCode"
            value={userInfo.postalCode || ''}
            onChange={handleInputChange}
            placeholder="1234567（ハイフンなし）"
            className="bg-white w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary"
          />
        </div>

        <div>
          <Label htmlFor="address" className="block text-sm font-medium mb-1">
            住所
            <FieldBadge variant="optional" className="ml-2" />
          </Label>
          <Input
            type="text"
            id="address"
            name="address"
            value={userInfo.address || ''}
            onChange={handleInputChange}
            className="bg-white w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary"
          />
        </div>

        <div>
          <Label htmlFor="email" className="block text-sm font-medium mb-1">
            メールアドレス
            <FieldBadge variant="required" className="ml-2" />
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            required
            value={userInfo.email}
            onChange={handleInputChange}
            className="bg-white w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary"
          />
          {!userInfo.email && showValidation && (
            <p className="text-xs text-red-500 mt-1">
              メールアドレスは必須項目です
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="block text-sm font-medium mb-1">
            電話番号
            <FieldBadge
              variant={isPhoneRequired ? 'required' : 'optional'}
              className="ml-2"
            />
          </Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            required={isPhoneRequired}
            value={userInfo.phone}
            onChange={handleInputChange}
            placeholder="09012345678（ハイフンなし）"
            className="bg-white w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary"
          />
          {isPhoneRequired && !userInfo.phone && showValidation && (
            <p className="text-xs text-red-500 mt-1">
              電話での連絡を希望される場合は電話番号の入力が必要です
            </p>
          )}
        </div>

        <div>
          <Label className="block text-sm font-medium mb-2">
            ご希望の連絡方法
          </Label>
          <RadioGroup
            value={userInfo.preferredContact}
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
    </div>
  );
}
