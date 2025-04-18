import React from 'react';
import { useAtom } from 'jotai';
import { inquiryTypeAtom, currentFormDataAtom } from '~/store/contact-form';
import type {
  PrintServicesFormData,
  DigitalServicesFormData,
  GeneralInquiryFormData,
  UserInfo,
  InquiryType,
} from '~/types/contact-form';
import ConfirmationItem from '../confirmation-item';

type StepConfirmationProps = {
  userInfo: UserInfo;
  onChangeStep: (step: 'inquiry-type' | 'user-info' | 'details') => void;
};

/**
 * 確認画面コンポーネント
 * ユーザーが入力した内容を確認し、編集できるようにする
 */
export default function StepConfirmation({
  userInfo,
  onChangeStep,
}: StepConfirmationProps) {
  const [inquiryType] = useAtom(inquiryTypeAtom);
  const [currentFormData] = useAtom(currentFormDataAtom);

  // 問い合わせ種別によって表示内容を変える
  const renderDetailsByType = () => {
    switch (inquiryType) {
      case 'print-services': {
        const data = currentFormData as PrintServicesFormData;
        return (
          <>
            {data.printInquiryType && data.printInquiryType !== 'none' && (
              <ConfirmationItem
                label="ご依頼種別"
                onClick={() => onChangeStep('details')}
              >
                <p className="mt-1">
                  {data.printInquiryType === 'estimate' && '見積もり依頼'}
                  {data.printInquiryType === 'order' && '注文・発注'}
                  {data.printInquiryType === 'question' && '相談・質問'}
                </p>
              </ConfirmationItem>
            )}

            <ConfirmationItem
              label="印刷物の種類"
              onClick={() => onChangeStep('details')}
            >
              <p className="mt-1">
                {printingTypeLabels[data.printingType] || data.printingType}
              </p>
            </ConfirmationItem>

            <ConfirmationItem
              label="ご依頼内容"
              onClick={() => onChangeStep('details')}
            >
              <p className="mt-1 whitespace-pre-line">{data.contents}</p>
            </ConfirmationItem>

            {data.deadline && (
              <ConfirmationItem
                label="希望納期"
                onClick={() => onChangeStep('details')}
              >
                <p className="mt-1">{data.deadline}</p>
              </ConfirmationItem>
            )}

            <ConfirmationItem
              label="デザインデータ"
              onClick={() => onChangeStep('details')}
            >
              <p className="mt-1">{data.hasDesignData ? 'あり' : 'なし'}</p>
            </ConfirmationItem>
          </>
        );
      }

      case 'digital-services': {
        const data = currentFormData as DigitalServicesFormData;
        if (data.digitalServiceType === 'standard') {
          return (
            <>
              <ConfirmationItem
                label="ご要望内容"
                onClick={() => onChangeStep('details')}
              >
                <p className="mt-1 whitespace-pre-line">
                  {data.projectDescription}
                </p>
              </ConfirmationItem>
            </>
          );
        }
        if (data.digitalServiceType === 'meeting') {
          return (
            <>
              <ConfirmationItem
                label="ミーティング日時"
                onClick={() => onChangeStep('details')}
              >
                <p className="mt-1">{data.meetingDatetime}</p>
              </ConfirmationItem>
              <ConfirmationItem
                label="ミーティング方法"
                onClick={() => onChangeStep('details')}
              >
                <p className="mt-1">{data.meetingMethod}</p>
              </ConfirmationItem>
              {data.notes && (
                <ConfirmationItem
                  label="備考"
                  onClick={() => onChangeStep('details')}
                >
                  <p className="mt-1 whitespace-pre-line">{data.notes}</p>
                </ConfirmationItem>
              )}
            </>
          );
        }
        return null;
      }

      case 'general-inquiry': {
        const data = currentFormData as GeneralInquiryFormData;
        return (
          <>
            <ConfirmationItem
              label="お問い合わせ内容"
              onClick={() => onChangeStep('details')}
            >
              <p className="mt-1 whitespace-pre-line">{data.inquiryContent}</p>
            </ConfirmationItem>

            {data.preferredContactMethod && (
              <ConfirmationItem
                label="希望する回答方法"
                onClick={() => onChangeStep('details')}
              >
                <p className="mt-1">
                  {data.preferredContactMethod === 'email'
                    ? 'メール'
                    : data.preferredContactMethod === 'phone'
                      ? '電話'
                      : 'どちらでも'}
                </p>
              </ConfirmationItem>
            )}

            {data.preferredContactMethod === 'phone' &&
              data.preferredContactTime && (
                <ConfirmationItem
                  label="ご希望の連絡時間帯"
                  onClick={() => onChangeStep('details')}
                >
                  <p className="mt-1">{data.preferredContactTime}</p>
                </ConfirmationItem>
              )}
          </>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">入力内容のご確認</h2>
      <div className="space-y-4">
        <ConfirmationItem
          label="お問い合わせ種別"
          onClick={() => onChangeStep('inquiry-type')}
        >
          <p className="mt-1">
            {inquiryType === 'print-services' && '印刷サービス'}
            {inquiryType === 'digital-services' && 'IT・デジタルサービス'}
            {inquiryType === 'general-inquiry' &&
              'その他のお問い合わせ・ご質問'}
          </p>
        </ConfirmationItem>

        <ConfirmationItem
          label="お名前"
          onClick={() => onChangeStep('user-info')}
        >
          <p className="mt-1">{userInfo.name}</p>
        </ConfirmationItem>

        {userInfo.companyName && (
          <ConfirmationItem
            label="会社名・団体名"
            onClick={() => onChangeStep('user-info')}
          >
            <p className="mt-1">{userInfo.companyName}</p>
          </ConfirmationItem>
        )}

        <ConfirmationItem
          label="メールアドレス"
          onClick={() => onChangeStep('user-info')}
        >
          <p className="mt-1">{userInfo.email}</p>
        </ConfirmationItem>

        {userInfo.phone && (
          <ConfirmationItem
            label="電話番号"
            onClick={() => onChangeStep('user-info')}
          >
            <p className="mt-1">{userInfo.phone}</p>
          </ConfirmationItem>
        )}

        {userInfo.postalCode && (
          <ConfirmationItem
            label="郵便番号"
            onClick={() => onChangeStep('user-info')}
          >
            <p className="mt-1">{userInfo.postalCode}</p>
          </ConfirmationItem>
        )}

        {userInfo.address && (
          <ConfirmationItem
            label="住所"
            onClick={() => onChangeStep('user-info')}
          >
            <p className="mt-1">{userInfo.address}</p>
          </ConfirmationItem>
        )}

        <ConfirmationItem
          label="ご希望の連絡方法"
          onClick={() => onChangeStep('user-info')}
        >
          <p className="mt-1">
            {userInfo.preferredContact === 'email'
              ? 'メール'
              : userInfo.preferredContact === 'phone'
                ? '電話'
                : 'どちらでも'}
          </p>
        </ConfirmationItem>

        {/* 問い合わせ種別ごとの詳細項目 */}
        {renderDetailsByType()}

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">
            上記の内容でよろしければ「送信する」ボタンをクリックしてください。
            内容を修正する場合は項目にマウスを合わせて表示される「変更する」をクリックして該当の項目を編集してください。
          </p>
        </div>
      </div>
    </div>
  );
}

// 印刷物の種類ラベル
const printingTypeLabels: Record<string, string> = {
  'meishi-card': '名刺・ハガキ・カード類',
  envelope: '封筒印刷',
  denpyo: '伝票印刷',
  'flyer-poster': 'チラシ・ポスター',
  bookbinding: 'ページ物・製本',
  other: 'その他',
};
