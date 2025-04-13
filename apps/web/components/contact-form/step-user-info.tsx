import type React from 'react';
import { useAtom } from 'jotai';
import { userInfoAtom } from '~/store/contact-form';

export default function StepUserInfo() {
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">お客様情報</h2>
      <p className="text-gray-600 mb-6">
        お問い合わせに対する回答をお送りするために、以下の情報をご入力ください。
      </p>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            お名前 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={userInfo.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label
            htmlFor="companyName"
            className="block text-sm font-medium mb-1"
          >
            会社名・団体名
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={userInfo.companyName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            メールアドレス <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={userInfo.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            電話番号
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={userInfo.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <p className="block text-sm font-medium mb-2">ご希望の連絡方法</p>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="preferredContact"
                value="email"
                checked={userInfo.preferredContact === 'email'}
                onChange={() => handleRadioChange('preferredContact', 'email')}
                className="form-radio text-primary"
              />
              <span className="ml-2">メール</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="preferredContact"
                value="phone"
                checked={userInfo.preferredContact === 'phone'}
                onChange={() => handleRadioChange('preferredContact', 'phone')}
                className="form-radio text-primary"
              />
              <span className="ml-2">電話</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
