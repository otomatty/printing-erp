import React from 'react';
import { Body, Head, Html, Text, Img } from '@react-email/components';

// 型定義をインポート (必要な型だけ)
import type {
  ContactFormData, // フラットな型をインポート
  InquiryType, // 問い合わせタイプは個別にも使う
  PrintInquiryType, // ★ マッピングキー用に追加
  PrintServicesFormData,
  DigitalServicesFormData,
  GeneralInquiryFormData,
  UserInfo,
} from '../types/contact-form';

// Propsの型定義をフラットな形に変更 (export を追加)
export type AdminNotificationEmailProps = ContactFormData & {
  contactId: string;
};

// ★★★ マッピング用オブジェクト定義 ★★★
const printInquiryTypeMap: Record<PrintInquiryType | 'none', string> = {
  estimate: '見積もり依頼',
  order: '注文・発注',
  question: '相談・質問',
  none: '指定なし',
};

const digitalServiceTypeMap: Record<string, string> = {
  standard: '通常フォーム',
  meeting: 'ミーティング予約',
  'ai-estimate': 'AI自動見積もり',
};

const meetingMethodMap: Record<string, string> = {
  online: 'オンライン',
  offline: '対面',
};

const preferredContactMap: Record<string, string> = {
  email: 'メール',
  phone: '電話',
  either: 'どちらでも可',
};

// ★ 新しいマッピングを追加
const printingTypeMap: Record<string, string> = {
  'meishi-card': '名刺・ハガキ・カード類',
  envelope: '封筒印刷',
  denpyo: '伝票印刷',
  'flyer-poster': 'チラシ・ポスター',
  bookbinding: 'ページ物・製本',
  other: 'その他',
};

// Helper function to render form details (引数をフラットなPropsに変更)
function renderFormDetails(props: AdminNotificationEmailProps) {
  switch (props.inquiryType) {
    case 'print-services': {
      const printProps = props as UserInfo & PrintServicesFormData; // 型アサーション
      return (
        <>
          <Text>
            <strong>印刷物の種類:</strong>{' '}
            {printingTypeMap[printProps.printingType || ''] ||
              printProps.printingType ||
              '未指定'}
          </Text>
          <Text>
            <strong>お問い合わせの種類:</strong> {/* ★ マッピングを使用 */}
            {printInquiryTypeMap[printProps.printInquiryType || 'none'] ||
              printProps.printInquiryType ||
              '未指定'}
          </Text>
          <Text>
            <strong>詳細・要望:</strong> {printProps.contents || 'なし'}
          </Text>
          <Text>
            <strong>希望納期:</strong> {printProps.deadline || '未指定'}
          </Text>
          <Text>
            <strong>デザインデータ:</strong>{' '}
            {printProps.hasDesignData ? 'あり' : 'なし'}
          </Text>
        </>
      );
    }
    case 'digital-services': {
      const digitalProps = props as UserInfo & DigitalServicesFormData; // 型アサーション
      if (digitalProps.digitalServiceType === 'standard') {
        return (
          <>
            <Text>
              <strong>サービス種別:</strong> Standard Form
            </Text>
            <Text>
              <strong>プロジェクト概要:</strong>{' '}
              {digitalProps.projectDescription || 'なし'}
            </Text>
          </>
        );
      }
      if (digitalProps.digitalServiceType === 'meeting') {
        return (
          <>
            <Text>
              <strong>サービス種別:</strong> Meeting Request
            </Text>
            <Text>
              <strong>希望日時:</strong>{' '}
              {digitalProps.meetingDatetime || '未指定'}
            </Text>
            <Text>
              <strong>希望方法:</strong> {/* ★ マッピングを使用 */}
              {meetingMethodMap[digitalProps.meetingMethod || ''] ||
                digitalProps.meetingMethod ||
                '未指定'}
            </Text>
            <Text>
              <strong>備考:</strong> {digitalProps.notes || 'なし'}
            </Text>
          </>
        );
      }
      return <Text>デジタルサービス詳細不明</Text>; // フォールバック
    }
    case 'general-inquiry': {
      const generalProps = props as UserInfo & GeneralInquiryFormData; // 型アサーション
      return (
        <>
          <Text>
            <strong>お問い合わせ内容:</strong> {generalProps.inquiryContent}
          </Text>
          <Text>
            <strong>希望連絡方法:</strong> {/* ★ マッピングを使用 */}
            {preferredContactMap[generalProps.preferredContactMethod || ''] ||
              generalProps.preferredContactMethod ||
              '未指定'}
          </Text>
          <Text>
            <strong>希望連絡時間帯:</strong>{' '}
            {generalProps.preferredContactTime || '未指定'}
          </Text>
        </>
      );
    }
    // meeting-reservation は現状の ContactFormData には直接含まれていないため、
    // 必要であれば型定義とここのロジックを拡張する必要がある
    default:
      return <Text>詳細情報タイプ不明</Text>;
  }
}

/**
 * 管理者宛お問い合わせ通知メールテンプレート
 */
export default function AdminNotificationEmail(
  props: AdminNotificationEmailProps
) {
  // Propsを直接分割代入 (contactData.userInfo や contactData.formDetails は不要に)
  const {
    name,
    companyName,
    email,
    phone,
    preferredContact,
    inquiryType,
    contactId,
  } = props;

  // 問い合わせタイプに応じたラベル
  const inquiryTypeLabel =
    {
      'print-services': '印刷サービス',
      'digital-services': 'デジタルサービス',
      'general-inquiry': 'その他のお問い合わせ',
      'meeting-reservation': 'ミーティング予約', // meeting-reservationも対応
    }[inquiryType] || 'お問い合わせ';

  // インラインスタイル (変更なし)
  const styles = {
    container: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px',
      maxWidth: '600px',
      margin: '0 auto',
      color: '#333',
    },
    header: {
      borderBottom: '1px solid #eaeaea',
      padding: '10px 0',
      marginBottom: '20px',
    },
    logo: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#0070f3',
    },
    title: {
      fontSize: '22px',
      fontWeight: 'bold',
      margin: '20px 0',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse' as const,
    },
    labelCell: {
      padding: '10px',
      borderBottom: '1px solid #eaeaea',
      width: '30%',
      textAlign: 'left' as const,
      verticalAlign: 'top' as const,
      fontWeight: 'bold',
    },
    valueCell: {
      padding: '10px',
      borderBottom: '1px solid #eaeaea',
      textAlign: 'left' as const,
    },
    footer: {
      marginTop: '30px',
      fontSize: '14px',
      color: '#666',
      borderTop: '1px solid #eaeaea',
      padding: '20px 0',
    },
  };

  return (
    <Html>
      <Head />
      <Body style={styles.container}>
        <div style={styles.header}>
          <Img
            src="https://niinuma-kikaku.com/images/logo/site-logo.png"
            alt="ニイヌマ企画印刷 ロゴ"
            width="180"
            style={{ margin: 'auto' }}
          />
        </div>

        <div style={styles.title}>
          新しい{inquiryTypeLabel}のお問い合わせがありました
        </div>

        <p>
          以下のお客様より{inquiryTypeLabel}に関するお問い合わせが届きました。
        </p>
        <p>（問い合わせID: {contactId}）</p>
        <p>
          業務システムからお問い合わせを確認するには、以下のリンクをクリックしてください。
        </p>
        <p>
          <a href={`https://system.niinuma-kikaku.com/inquiry/${contactId}`}>
            業務システムのお問い合わせ管理画面
          </a>
        </p>

        <h3>お客様情報</h3>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.labelCell}>お名前:</td>
              <td style={styles.valueCell}>{name}</td> {/* 直接参照 */}
            </tr>
            {companyName && (
              <tr>
                <td style={styles.labelCell}>会社名:</td>
                <td style={styles.valueCell}>{companyName}</td> {/* 直接参照 */}
              </tr>
            )}
            <tr>
              <td style={styles.labelCell}>メールアドレス:</td>
              <td style={styles.valueCell}>{email}</td> {/* 直接参照 */}
            </tr>
            {phone && (
              <tr>
                <td style={styles.labelCell}>電話番号:</td>
                <td style={styles.valueCell}>{phone}</td> {/* 直接参照 */}
              </tr>
            )}
            {preferredContact && (
              <tr>
                <td style={styles.labelCell}>希望連絡方法:</td>
                {/* ★ マッピングを使用 */}
                <td style={styles.valueCell}>
                  {preferredContactMap[preferredContact || ''] ||
                    preferredContact ||
                    '未指定'}
                </td>
              </tr>
            )}
            {/* UserInfo に address, postalCode があれば表示 (必要に応じて追加) */}
            {props.address && (
              <tr>
                <td style={styles.labelCell}>住所:</td>
                <td style={styles.valueCell}>{props.address}</td>
              </tr>
            )}
            {props.postalCode && (
              <tr>
                <td style={styles.labelCell}>郵便番号:</td>
                <td style={styles.valueCell}>{props.postalCode}</td>
              </tr>
            )}
          </tbody>
        </table>

        <h3>お問い合わせ内容</h3>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.labelCell}>サービスの種類:</td>
              <td style={styles.valueCell}>{inquiryTypeLabel}</td>
            </tr>
            {/* renderFormDetails に props を渡す */}
            {renderFormDetails(props)}
          </tbody>
        </table>

        <div style={styles.footer}>
          <p>
            このメールは自動送信されています。返信は受け付けておりません。
            <br />
            管理画面からお客様情報を確認のうえ、対応をお願いいたします。
          </p>
        </div>

        {contactId && (
          <Text style={{ marginTop: '20px', fontSize: '12px', color: '#555' }}>
            管理用ID: {contactId}
          </Text>
        )}
      </Body>
    </Html>
  );
}
