import React from 'react';
import { useAtom } from 'jotai';
import { inquiryTypeAtom, currentFormDataAtom } from '~/store/contact-form';
import type {
  EstimateFormData,
  OrderFormData,
  QuestionFormData,
  OtherFormData,
  UserInfoData,
} from '~/types/contact-form';
import ConfirmationItem from './confirmation-item';

type StepConfirmationProps = {
  userInfo: UserInfoData;
  onChangeStep: (step: 'inquiry-type' | 'user-info' | 'details') => void;
};

export default function StepConfirmation({
  userInfo,
  onChangeStep,
}: StepConfirmationProps) {
  const [inquiryType] = useAtom(inquiryTypeAtom);
  const [currentFormData] = useAtom(currentFormDataAtom);

  // 問い合わせ種別によって表示内容を変える
  const renderDetailsByType = () => {
    switch (inquiryType) {
      case 'estimate': {
        const data = currentFormData as EstimateFormData;
        return (
          <>
            <ConfirmationItem
              label="製品/サービス"
              onClick={() => onChangeStep('details')}
            >
              <p className="mt-1">{data.product}</p>
            </ConfirmationItem>

            {data.size && (
              <ConfirmationItem
                label="サイズ"
                onClick={() => onChangeStep('details')}
              >
                <p className="mt-1">{data.size}</p>
              </ConfirmationItem>
            )}

            <ConfirmationItem
              label="部数"
              onClick={() => onChangeStep('details')}
            >
              <p className="mt-1">{data.quantity}</p>
            </ConfirmationItem>

            {data.paper && (
              <ConfirmationItem
                label="用紙"
                onClick={() => onChangeStep('details')}
              >
                <p className="mt-1">{data.paper}</p>
              </ConfirmationItem>
            )}

            {data.deadline && (
              <ConfirmationItem
                label="納期"
                onClick={() => onChangeStep('details')}
              >
                <p className="mt-1">{data.deadline}</p>
              </ConfirmationItem>
            )}

            {data.otherRequests && (
              <ConfirmationItem
                label="その他のご要望"
                onClick={() => onChangeStep('details')}
              >
                <p className="mt-1 whitespace-pre-line">{data.otherRequests}</p>
              </ConfirmationItem>
            )}
          </>
        );
      }

      case 'order': {
        const data = currentFormData as OrderFormData;
        return (
          <>
            <ConfirmationItem
              label="発注内容"
              onClick={() => onChangeStep('details')}
            >
              <p className="mt-1 whitespace-pre-line">{data.orderContent}</p>
            </ConfirmationItem>

            {data.size && (
              <ConfirmationItem
                label="サイズ"
                onClick={() => onChangeStep('details')}
              >
                <p className="mt-1">{data.size}</p>
              </ConfirmationItem>
            )}

            <ConfirmationItem
              label="部数"
              onClick={() => onChangeStep('details')}
            >
              <p className="mt-1">{data.quantity}</p>
            </ConfirmationItem>

            {data.paper && (
              <ConfirmationItem
                label="用紙"
                onClick={() => onChangeStep('details')}
              >
                <p className="mt-1">{data.paper}</p>
              </ConfirmationItem>
            )}

            {data.deadline && (
              <ConfirmationItem
                label="納期(希望)"
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

            {data.otherRequests && (
              <ConfirmationItem
                label="その他のご要望"
                onClick={() => onChangeStep('details')}
              >
                <p className="mt-1 whitespace-pre-line">{data.otherRequests}</p>
              </ConfirmationItem>
            )}
          </>
        );
      }

      case 'question': {
        const data = currentFormData as QuestionFormData;
        return (
          <>
            <ConfirmationItem
              label="ご質問内容"
              onClick={() => onChangeStep('details')}
            >
              <p className="mt-1 whitespace-pre-line">{data.questionContent}</p>
            </ConfirmationItem>

            {data.preferredContactMethod && (
              <ConfirmationItem
                label="希望する回答方法"
                onClick={() => onChangeStep('details')}
              >
                <p className="mt-1">
                  {data.preferredContactMethod === 'email' ? 'メール' : '電話'}
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

      case 'other': {
        const data = currentFormData as OtherFormData;
        return (
          <ConfirmationItem
            label="お問い合わせ内容"
            onClick={() => onChangeStep('details')}
          >
            <p className="mt-1 whitespace-pre-line">{data.content}</p>
          </ConfirmationItem>
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
            {inquiryType === 'estimate' && 'お見積り依頼'}
            {inquiryType === 'order' && 'ご注文・制作依頼'}
            {inquiryType === 'question' && 'サービスに関するご質問'}
            {inquiryType === 'other' && 'その他のお問い合わせ'}
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

        <ConfirmationItem
          label="ご希望の連絡方法"
          onClick={() => onChangeStep('user-info')}
        >
          <p className="mt-1">
            {userInfo.preferredContact === 'email' ? 'メール' : '電話'}
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
