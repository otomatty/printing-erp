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
    formDetails: Record<string, unknown>;
    contactId?: string;
  };
}

/**
 * お客様宛お問い合わせ確認メールテンプレート
 */
export default function CustomerConfirmationEmail({ contactData }: EmailProps) {
  const { userInfo, inquiryType, contactId } = contactData;

  // 問い合わせタイプに応じたラベル
  const inquiryTypeLabel =
    {
      'print-services': '印刷サービス',
      'digital-services': 'デジタルサービス',
      'general-inquiry': 'その他のお問い合わせ',
    }[inquiryType] || 'お問い合わせ';

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
    content: {
      lineHeight: '1.6',
      margin: '20px 0',
    },
    highlight: {
      backgroundColor: '#f7f7f7',
      padding: '15px',
      borderRadius: '5px',
      margin: '15px 0',
    },
    footer: {
      marginTop: '30px',
      fontSize: '14px',
      color: '#666',
      borderTop: '1px solid #eaeaea',
      padding: '20px 0',
    },
    contactInfo: {
      margin: '20px 0',
      padding: '15px',
      borderLeft: '4px solid #0070f3',
      backgroundColor: '#f5f7fa',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.logo}>ニイヌマ企画印刷</div>
      </div>

      <div style={styles.title}>お問い合わせありがとうございます</div>

      <div style={styles.content}>
        <p>{userInfo.name} 様</p>

        <p>
          この度は、ニイヌマ企画印刷に{inquiryTypeLabel}
          に関するお問い合わせをいただき、 誠にありがとうございます。
          {contactId && <span>（お問い合わせID: {contactId}）</span>}
        </p>

        <p>
          お問い合わせを受け付けました。内容を確認の上、担当者より折り返しご連絡いたします。
        </p>

        <div style={styles.highlight}>
          <p>
            <strong>お問い合わせ種別:</strong> {inquiryTypeLabel}
          </p>
        </div>

        <p>
          ご入力いただいた内容についてご不明な点がある場合や、
          追加のご質問がある場合は、このメールにご返信いただくか、
          下記の連絡先までお問い合わせください。
        </p>

        <div style={styles.contactInfo}>
          <p>
            <strong>ニイヌマ企画印刷</strong>
            <br />
            〒022-0003 岩手県大船渡市盛町字みどり町4-12
            <br />
            電話: 0192-26-2160（受付時間: 平日 9:00-18:00）
            <br />
            メール: nkikaku@crocus.ocn.ne.jp
          </p>
        </div>

        <p>今後ともニイヌマ企画印刷をよろしくお願いいたします。</p>
      </div>

      <div style={styles.footer}>
        <p>
          このメールは自動送信されています。
          <br />
          お問い合わせに関するご質問は、上記の連絡先までお願いいたします。
        </p>
      </div>
    </div>
  );
}
