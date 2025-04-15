import * as React from 'react';

interface EmailProps {
  contactData: {
    userInfo: {
      name: string;
      companyName?: string;
      email: string;
      phone?: string;
      preferredContact?: string;
    };
    inquiryType: string;
    formDetails?: Record<string, unknown> | null;
    contactId?: string;
  };
}

/**
 * 管理者宛お問い合わせ通知メールテンプレート
 */
export default function AdminNotificationEmail({ contactData }: EmailProps) {
  const { userInfo, inquiryType, formDetails = {}, contactId } = contactData;

  // 問い合わせタイプに応じたラベル
  const inquiryTypeLabel =
    {
      'print-services': '印刷サービス',
      'digital-services': 'デジタルサービス',
      'general-inquiry': 'その他のお問い合わせ',
    }[inquiryType] || 'お問い合わせ';

  // 型安全に値を取得するヘルパー関数
  const getValue = (key: string): string => {
    if (!formDetails) return '-';
    const value = formDetails[key];
    if (value === undefined || value === null) return '-';
    return String(value);
  };

  // 型安全にboolean値を取得するヘルパー関数
  const getBoolValue = (key: string): boolean => {
    if (!formDetails) return false;
    return Boolean(formDetails[key]);
  };

  // 問い合わせ内容の詳細表示用
  const renderFormDetails = () => {
    if (inquiryType === 'print-services') {
      return (
        <>
          <tr>
            <td style={styles.labelCell}>印刷種類:</td>
            <td style={styles.valueCell}>{getValue('printingType')}</td>
          </tr>
          <tr>
            <td style={styles.labelCell}>お問い合わせ内容:</td>
            <td style={styles.valueCell}>
              {getValue('printInquiryType') === 'estimate'
                ? '見積もり依頼'
                : getValue('printInquiryType') === 'order'
                  ? '注文・発注'
                  : getValue('printInquiryType') === 'question'
                    ? '相談・質問'
                    : '-'}
            </td>
          </tr>
          <tr>
            <td style={styles.labelCell}>詳細:</td>
            <td style={styles.valueCell}>{getValue('contents')}</td>
          </tr>
          <tr>
            <td style={styles.labelCell}>希望納期:</td>
            <td style={styles.valueCell}>{getValue('deadline')}</td>
          </tr>
          <tr>
            <td style={styles.labelCell}>デザインデータ:</td>
            <td style={styles.valueCell}>
              {getBoolValue('hasDesignData') ? 'あり' : 'なし'}
            </td>
          </tr>
        </>
      );
    }
    if (inquiryType === 'digital-services') {
      return (
        <>
          <tr>
            <td style={styles.labelCell}>サービス種類:</td>
            <td style={styles.valueCell}>{getValue('serviceType')}</td>
          </tr>
          <tr>
            <td style={styles.labelCell}>プロジェクト概要:</td>
            <td style={styles.valueCell}>{getValue('projectDescription')}</td>
          </tr>
          <tr>
            <td style={styles.labelCell}>希望納期:</td>
            <td style={styles.valueCell}>{getValue('deadline')}</td>
          </tr>
          <tr>
            <td style={styles.labelCell}>予算:</td>
            <td style={styles.valueCell}>{getValue('budget')}</td>
          </tr>
          <tr>
            <td style={styles.labelCell}>その他要望:</td>
            <td style={styles.valueCell}>{getValue('otherRequests')}</td>
          </tr>
        </>
      );
    }
    // general-inquiry
    return (
      <>
        <tr>
          <td style={styles.labelCell}>お問い合わせ内容:</td>
          <td style={styles.valueCell}>{getValue('inquiryContent')}</td>
        </tr>
        <tr>
          <td style={styles.labelCell}>連絡方法:</td>
          <td style={styles.valueCell}>
            {getValue('preferredContactMethod') === 'phone'
              ? '電話'
              : getValue('preferredContactMethod') === 'email'
                ? 'メール'
                : 'どちらでも可'}
          </td>
        </tr>
        <tr>
          <td style={styles.labelCell}>希望連絡時間帯:</td>
          <td style={styles.valueCell}>{getValue('preferredContactTime')}</td>
        </tr>
      </>
    );
  };

  // インラインスタイル
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
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.logo}>ニイヌマ企画印刷</div>
      </div>

      <div style={styles.title}>
        新しい{inquiryTypeLabel}のお問い合わせがありました
      </div>

      <p>
        以下のお客様より{inquiryTypeLabel}に関するお問い合わせが届きました。
        {contactId && <span>（問い合わせID: {contactId}）</span>}
      </p>

      <h3>お客様情報</h3>
      <table style={styles.table}>
        <tbody>
          <tr>
            <td style={styles.labelCell}>お名前:</td>
            <td style={styles.valueCell}>{userInfo.name}</td>
          </tr>
          {userInfo.companyName && (
            <tr>
              <td style={styles.labelCell}>会社名:</td>
              <td style={styles.valueCell}>{userInfo.companyName}</td>
            </tr>
          )}
          <tr>
            <td style={styles.labelCell}>メールアドレス:</td>
            <td style={styles.valueCell}>{userInfo.email}</td>
          </tr>
          {userInfo.phone && (
            <tr>
              <td style={styles.labelCell}>電話番号:</td>
              <td style={styles.valueCell}>{userInfo.phone}</td>
            </tr>
          )}
          {userInfo.preferredContact && (
            <tr>
              <td style={styles.labelCell}>希望連絡方法:</td>
              <td style={styles.valueCell}>{userInfo.preferredContact}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>お問い合わせ内容</h3>
      <table style={styles.table}>
        <tbody>
          <tr>
            <td style={styles.labelCell}>お問い合わせ種別:</td>
            <td style={styles.valueCell}>{inquiryTypeLabel}</td>
          </tr>
          {renderFormDetails()}
        </tbody>
      </table>

      <div style={styles.footer}>
        <p>
          このメールは自動送信されています。返信は受け付けておりません。
          <br />
          管理画面からお客様情報を確認のうえ、対応をお願いいたします。
        </p>
      </div>
    </div>
  );
}
