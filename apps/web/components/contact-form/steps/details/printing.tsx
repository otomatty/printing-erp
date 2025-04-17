'use client';

import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { printServicesFormAtom, isFormValidAtom } from '~/store/contact-form';
import { Label } from '@kit/ui/label';
import { Input } from '@kit/ui/input';
import { Textarea } from '@kit/ui/textarea';
import { Checkbox } from '@kit/ui/checkbox';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@kit/ui/alert-dialog';
import { useSearchParams } from 'next/navigation';

// 印刷物の種類
const printingTypes = [
  { value: 'meishi-card', label: '名刺・ハガキ・カード類', icon: '📇' },
  { value: 'envelope', label: '封筒印刷', icon: '✉️' },
  { value: 'denpyo', label: '伝票印刷', icon: '🧾' },
  { value: 'flyer-poster', label: 'チラシ・ポスター', icon: '🖼️' },
  { value: 'bookbinding', label: 'ページ物・製本', icon: '📚' },
  { value: 'other', label: 'その他', icon: '🔖' },
];

// 印刷物の種類ごとのヒント
const printingTypeHints: Record<string, string> = {
  'meishi-card': `【名刺・ハガキ・カード類】
・数量（例: 100枚、200枚など）：
・サイズ（例: 名刺サイズ、ハガキサイズなど）：
・用紙の種類（例: マットコート紙、上質紙など）：
・両面印刷の有無、角丸加工の有無など：
・希望納期：
・その他のご要望：`,

  envelope: `【封筒印刷】
・数量（例: 500枚、1000枚など）：
・サイズ（例: 長形3号、角形2号など）：
・用紙の種類（例: クラフト紙、白封筒など）：
・社名印刷、窓付きの有無など：
・希望納期：
・その他のご要望：`,

  denpyo: `【伝票印刷】
・数量（例: 100冊、50セットなど）：
・サイズ（例: A5、B6など）：
・用紙の種類（例: ノーカーボン紙、連続伝票用紙など）：
・複写の枚数、ミシン目の位置など：
・希望納期：
・その他のご要望：`,

  'flyer-poster': `【チラシ・ポスター】
・数量（例: 1000部、5000部など）：
・サイズ（例: A4、B2など）：
・用紙の種類（例: コート紙、マットコート紙など）：
・両面印刷の有無、折り加工の有無など：
・希望納期：
・その他のご要望：`,

  bookbinding: `【ページ物・製本】
・数量（例: 300部、500部など）：
・サイズ（例: A4、B5など）：
・用紙の種類（例: 表紙：コート紙、本文：上質紙など）：
・ページ数、製本方法（無線綴じ、中綴じなど）：
・希望納期：
・その他のご要望：`,

  other: `【その他の印刷物】
・必要な部数：
・必要なサイズ：
・必要な用紙の種類：
・詳細な仕様や特記事項：
・希望納期：
・その他のご要望：`,
};

// デフォルトのヒント
const defaultHint = `【印刷物について】
・数量：
・サイズ：
・用紙の種類：
・印刷方法：
・希望納期：
・その他のご要望：`;

// 問い合わせ種類ごとの説明
const inquiryTypeDescriptions = {
  estimate:
    '印刷物の詳細情報を入力いただくと、より正確なお見積りが可能です。下記の項目を参考にご記入ください。',
  order:
    '印刷物の詳細情報をご記入ください。詳しくご記入いただくほど、ご希望に沿った対応が可能です。',
  question: '印刷物についてのご質問・ご相談内容をご記入ください。',
};

type PrintInquiryType = 'estimate' | 'order' | 'question' | 'none';

export default function PrintServicesForm() {
  // URLパラメータを取得
  const searchParams = useSearchParams();

  // formDataを先に取得
  const [formData, setFormData] = useAtom(printServicesFormAtom);

  // 問い合わせ種類の状態 - formDataから初期値を取得
  const [inquiryType, setInquiryType] = useState<PrintInquiryType>(
    formData.printInquiryType
  );

  const [_, setIsFormValid] = useAtom(isFormValidAtom);
  const [previousPrintingType, setPreviousPrintingType] = useState('');
  const [showValidation, setShowValidation] = useState(false);

  // 確認ダイアログの状態
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [pendingPrintingType, setPendingPrintingType] = useState('');

  // URLパラメータから印刷種類と封筒情報を設定
  useEffect(() => {
    const printingType = searchParams.get('printingType');
    const envelopeType = searchParams.get('envelopeType');
    const envelopeSize = searchParams.get('envelopeSize');

    if (printingType === 'envelope') {
      // 内容のテンプレートを取得
      let template = printingTypeHints.envelope || defaultHint;

      // 封筒情報が提供されている場合、それをテンプレートに追加
      if (envelopeType && envelopeSize) {
        template = template.replace(
          '【封筒印刷】',
          `【封筒印刷】\n封筒の種類：${envelopeType}\nサイズ：${envelopeSize}`
        );
      }

      // フォームデータを初期化
      updateFormData({
        printingType: 'envelope',
        printInquiryType: 'estimate', // デフォルトで見積もり依頼に設定
        contents: template,
      });

      // ローカルステートも更新
      setInquiryType('estimate');
      setShowValidation(true);
      setIsFormValid(true);
    }
  }, [searchParams, setIsFormValid]);

  // formDataの変更を監視してローカルステートを更新
  useEffect(() => {
    setInquiryType(formData.printInquiryType);
  }, [formData.printInquiryType]);

  // 印刷物の種類が変更されたときの処理
  const handlePrintingTypeChange = (newPrintingType: string) => {
    // すでに内容が入力されている場合は確認
    if (
      formData.contents &&
      formData.printingType &&
      formData.printingType !== newPrintingType
    ) {
      setPendingPrintingType(newPrintingType);
      setIsAlertOpen(true);
      return;
    }

    applyPrintingTypeChange(newPrintingType);
  };

  // 印刷物の種類変更を確定する
  const applyPrintingTypeChange = (newPrintingType: string) => {
    // 印刷物の種類を更新
    setPreviousPrintingType(formData.printingType);

    // フォームデータを更新
    const newContent = getContentTemplate(newPrintingType);
    updateFormData({
      printingType: newPrintingType,
      contents: newContent,
    });
  };

  // 印刷物の種類に応じたテンプレートを取得
  const getContentTemplate = (printingType: string) => {
    // 相談・質問の場合はテンプレートを使用しない
    if (inquiryType === 'question') {
      return '';
    }

    // それ以外の場合は種類に応じたテンプレートを返す
    return printingType ? printingTypeHints[printingType] || defaultHint : '';
  };

  // フォームデータの更新関数
  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData({ ...formData, ...data });
    setShowValidation(true); // 入力があった場合のみバリデーションを表示

    // バリデーション - 印刷物の種類が選択されていて、問い合わせ種類も選択されているか確認
    const updatedFormData = { ...formData, ...data };
    const isValid =
      !!updatedFormData.printingType && !!inquiryType && inquiryType !== 'none';

    // 注文/見積もりの場合はさらにcontentsが必須
    if (inquiryType === 'order' || inquiryType === 'estimate') {
      const isDetailValid = isValid && !!updatedFormData.contents;
      setIsFormValid(isDetailValid);
    } else {
      setIsFormValid(isValid);
    }
  };

  // 問い合わせ種類の選択時
  const handleInquiryTypeChange = (type: PrintInquiryType) => {
    setInquiryType(type);
    setShowValidation(true); // 選択があった場合のみバリデーションを表示

    // Jotaiアトムにも保存
    updateFormData({
      printInquiryType: type,
    });

    // 問い合わせ種類が変更された場合、印刷物種類が選択されていれば内容を更新
    if (formData.printingType && type !== inquiryType) {
      updateFormData({
        printInquiryType: type,
        contents:
          type === 'question' ? '' : getContentTemplate(formData.printingType),
      });
    }

    // 問い合わせ種類が変更されたときもバリデーションを実行
    const isValid = !!formData.printingType && type !== 'none';

    // 注文/見積もりの場合はさらにcontentsが必須
    if (type === 'order' || type === 'estimate') {
      const isDetailValid = isValid && !!formData.contents;
      setIsFormValid(isDetailValid);
    } else {
      setIsFormValid(isValid);
    }
  };

  return (
    <div className="space-y-6">
      {/* 印刷物の種類変更確認ダイアログ */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>入力内容の変更確認</AlertDialogTitle>
            <AlertDialogDescription>
              印刷物の種類を変更すると、入力内容が更新されます。よろしいですか？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>
              キャンセル
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                applyPrintingTypeChange(pendingPrintingType);
                setIsAlertOpen(false);
              }}
            >
              変更する
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 問い合わせ種類選択 */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">
          お問い合わせの内容を選択してください
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              id: 'estimate',
              title: '見積もり依頼',
              description: '印刷物の価格やスケジュールを知りたい方',
              icon: '💰',
            },
            {
              id: 'order',
              title: '注文・発注',
              description: '印刷物の発注や制作を依頼したい方',
              icon: '📝',
            },
            {
              id: 'question',
              title: '相談・質問',
              description: '印刷に関する質問や相談がある方',
              icon: '❓',
            },
          ].map((type) => (
            <button
              key={type.id}
              type="button"
              className={`border rounded-lg p-4 cursor-pointer transition-all text-left h-full ${
                formData.printInquiryType === type.id
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() =>
                handleInquiryTypeChange(type.id as PrintInquiryType)
              }
              aria-pressed={formData.printInquiryType === type.id}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-start mb-2">
                  <div className="mr-3 text-2xl">{type.icon}</div>
                  <div>
                    <h3 className="font-bold">{type.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-500">{type.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* セパレーター */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-sm text-gray-500">
            印刷物の詳細
          </span>
        </div>
      </div>

      {/* 印刷物の種類選択（カード形式） */}
      <div className="mb-6">
        <div className="w-full">
          <Label className="block text-sm font-medium text-gray-700 mb-3">
            印刷物の種類 <span className="text-red-500">*</span>
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2  gap-3">
            {printingTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                className={`border rounded-lg p-3 cursor-pointer transition-all text-left ${
                  formData.printingType === type.value
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handlePrintingTypeChange(type.value)}
                aria-pressed={formData.printingType === type.value}
              >
                <div className="flex items-center">
                  <div className="mr-3 text-xl">{type.icon}</div>
                  <div>
                    <span>{type.label}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
          {!formData.printingType && showValidation && (
            <p className="text-xs text-red-500 mt-1">
              印刷物の種類は必須項目です
            </p>
          )}
        </div>
      </div>

      {/* 選択された問い合わせ種類に応じたフォームを表示 */}
      {inquiryType !== 'none' && formData.printingType && (
        <div className="space-y-5 border-t pt-5">
          <h3 className="text-lg font-medium mb-3">
            {inquiryType === 'estimate'
              ? '見積もり依頼の詳細'
              : inquiryType === 'order'
                ? '注文・発注の詳細'
                : '相談・質問の詳細'}
          </h3>

          <p className="text-sm text-gray-600 mb-4">
            {inquiryTypeDescriptions[inquiryType]}
          </p>

          {/* 共通のテキストエリア */}
          <div className="w-full">
            <label
              htmlFor="contents"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {inquiryType === 'question' ? 'ご質問内容' : 'ご依頼内容'}{' '}
              {(inquiryType === 'order' || inquiryType === 'estimate') && (
                <span className="text-red-500">*</span>
              )}
            </label>

            <div>
              <Textarea
                id="contents"
                name="contents"
                rows={14}
                value={formData.contents}
                onChange={(e) => updateFormData({ contents: e.target.value })}
                placeholder={
                  inquiryType === 'question'
                    ? 'ご質問内容をご記入ください'
                    : 'ご依頼内容をご記入ください'
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary/50 focus:border-primary"
                required={inquiryType === 'order' || inquiryType === 'estimate'}
              />
              {(inquiryType === 'order' || inquiryType === 'estimate') &&
                !formData.contents &&
                showValidation && (
                  <p className="text-xs text-red-500 mt-1">
                    ご依頼内容は必須項目です
                  </p>
                )}
            </div>
          </div>

          {/* 希望納期入力欄 */}
          <div className="w-full">
            <label
              htmlFor="deadline"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              希望納期
            </label>
            <Input
              type="text"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={(e) => updateFormData({ deadline: e.target.value })}
              placeholder="例: 1ヶ月以内、8月末までなど"
              className="w-full max-w-[400px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary/50 focus:border-primary"
            />
          </div>

          {/* デザインデータあり（注文の場合のみ） */}
          {inquiryType === 'order' && (
            <div className="w-full">
              <div className="flex items-center">
                <Checkbox
                  id="hasDesignData"
                  name="hasDesignData"
                  checked={formData.hasDesignData}
                  onCheckedChange={(checked) =>
                    updateFormData({ hasDesignData: checked === true })
                  }
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
          )}
        </div>
      )}
    </div>
  );
}
