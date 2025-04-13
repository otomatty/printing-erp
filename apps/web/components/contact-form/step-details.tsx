import { useAtom } from 'jotai';
import {
  inquiryTypeAtom,
  estimateFormAtom,
  orderFormAtom,
  questionFormAtom,
  otherFormAtom,
  isFormValidAtom,
} from '~/store/contact-form';
import { Calendar } from 'lucide-react';

// 紙のサイズ選択肢
const paperSizes = [
  { value: '', label: '選択してください' },
  { value: 'a4', label: 'A4' },
  { value: 'a3', label: 'A3' },
  { value: 'b5', label: 'B5' },
  { value: 'b4', label: 'B4' },
  { value: 'postcard', label: 'はがきサイズ' },
  { value: 'business_card', label: '名刺サイズ' },
  { value: 'custom', label: 'カスタムサイズ' },
];

// 用紙の種類選択肢
const paperTypes = [
  { value: '', label: '選択してください' },
  { value: 'normal', label: '上質紙' },
  { value: 'mat', label: 'マットコート紙' },
  { value: 'glossy', label: '光沢紙' },
  { value: 'recycled', label: '再生紙' },
  { value: 'art', label: 'アート紙' },
  { value: 'other', label: 'その他' },
];

// 見積もり依頼フォーム
function EstimateForm() {
  const [formData, setFormData] = useAtom(estimateFormAtom);
  // バリデーション状態を読み取り（不要なレンダリングを避けるため）
  const [_] = useAtom(isFormValidAtom);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="space-y-5">
      <div className="w-full">
        <label
          htmlFor="product"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          製品/サービス <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="product"
          name="product"
          value={formData.product}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          required
        />
        {!formData.product && (
          <p className="text-xs text-red-500 mt-1">
            製品/サービスは必須項目です
          </p>
        )}
      </div>

      <div className="w-full">
        <label
          htmlFor="size"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          サイズ
        </label>
        <select
          id="size"
          name="size"
          value={formData.size}
          onChange={handleChange}
          className="w-full max-w-[300px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
        >
          {paperSizes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full">
        <label
          htmlFor="quantity"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          部数 <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="1"
          className="w-full max-w-[300px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          required
        />
        {!formData.quantity && (
          <p className="text-xs text-red-500 mt-1">部数は必須項目です</p>
        )}
      </div>

      <div className="w-full">
        <label
          htmlFor="paper"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          用紙
        </label>
        <select
          id="paper"
          name="paper"
          value={formData.paper}
          onChange={handleChange}
          className="w-full max-w-[300px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
        >
          {paperTypes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full">
        <label
          htmlFor="deadline"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          納期
        </label>
        <div className="relative max-w-[300px]">
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary pr-10"
          />
          <Calendar
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
      </div>

      <div className="w-full">
        <label
          htmlFor="otherRequests"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          その他のご要望
        </label>
        <textarea
          id="otherRequests"
          name="otherRequests"
          rows={4}
          value={formData.otherRequests}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
        />
      </div>
    </div>
  );
}

// 注文・制作依頼フォーム
function OrderForm() {
  const [formData, setFormData] = useAtom(orderFormAtom);
  // バリデーション状態を読み取り（不要なレンダリングを避けるため）
  const [_] = useAtom(isFormValidAtom);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="space-y-5">
      <div className="w-full">
        <label
          htmlFor="orderContent"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          発注内容 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="orderContent"
          name="orderContent"
          rows={4}
          value={formData.orderContent}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          required
        />
        {!formData.orderContent && (
          <p className="text-xs text-red-500 mt-1">発注内容は必須項目です</p>
        )}
      </div>

      <div className="w-full">
        <label
          htmlFor="size"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          サイズ
        </label>
        <select
          id="size"
          name="size"
          value={formData.size}
          onChange={handleChange}
          className="w-full max-w-[300px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
        >
          {paperSizes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full">
        <label
          htmlFor="quantity"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          部数 <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="1"
          className="w-full max-w-[300px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          required
        />
        {!formData.quantity && (
          <p className="text-xs text-red-500 mt-1">部数は必須項目です</p>
        )}
      </div>

      <div className="w-full">
        <label
          htmlFor="paper"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          用紙
        </label>
        <select
          id="paper"
          name="paper"
          value={formData.paper}
          onChange={handleChange}
          className="w-full max-w-[300px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
        >
          {paperTypes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full">
        <label
          htmlFor="deadline"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          納期(希望)
        </label>
        <div className="relative max-w-[300px]">
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary pr-10"
          />
          <Calendar
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
      </div>

      <div className="w-full">
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="hasDesignData"
            name="hasDesignData"
            checked={formData.hasDesignData}
            onChange={handleChange}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label
            htmlFor="hasDesignData"
            className="ml-2 block text-sm text-gray-700"
          >
            デザインデータあり
          </label>
        </div>
      </div>

      <div className="w-full">
        <label
          htmlFor="otherRequests"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          その他のご要望
        </label>
        <textarea
          id="otherRequests"
          name="otherRequests"
          rows={4}
          value={formData.otherRequests}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
        />
      </div>
    </div>
  );
}

// 質問フォーム
function QuestionForm() {
  const [formData, setFormData] = useAtom(questionFormAtom);
  // バリデーション状態を読み取り（不要なレンダリングを避けるため）
  const [_] = useAtom(isFormValidAtom);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="space-y-5">
      <div className="w-full">
        <label
          htmlFor="questionContent"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          ご質問内容 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="questionContent"
          name="questionContent"
          rows={6}
          value={formData.questionContent}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          required
        />
        {!formData.questionContent && (
          <p className="text-xs text-red-500 mt-1">ご質問内容は必須項目です</p>
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
          className="w-full max-w-[300px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
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
            className="w-full max-w-[300px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
        </div>
      )}
    </div>
  );
}

// その他問い合わせフォーム
function OtherForm() {
  const [formData, setFormData] = useAtom(otherFormAtom);
  // バリデーション状態を読み取り（不要なレンダリングを避けるため）
  const [_] = useAtom(isFormValidAtom);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="space-y-5">
      <div className="w-full">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          お問い合わせ内容 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="content"
          name="content"
          rows={8}
          value={formData.content}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          required
        />
        {!formData.content && (
          <p className="text-xs text-red-500 mt-1">
            お問い合わせ内容は必須項目です
          </p>
        )}
      </div>
    </div>
  );
}

export default function StepDetails() {
  const [inquiryType] = useAtom(inquiryTypeAtom);

  // 問い合わせタイプに応じたフォームを表示
  const renderForm = () => {
    switch (inquiryType) {
      case 'estimate':
        return <EstimateForm />;
      case 'order':
        return <OrderForm />;
      case 'question':
        return <QuestionForm />;
      case 'other':
        return <OtherForm />;
      default:
        return <EstimateForm />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">お問い合わせ内容</h2>
      {renderForm()}
    </div>
  );
}
