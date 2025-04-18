import React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
  Link,
  Img,
} from '@react-email/components';

// 型定義をインポート (フラットな型に変更)
import type { ContactFormData, InquiryType } from '../types/contact-form';

// Propsの型定義をフラットな形に変更 (export を追加)
export type CustomerConfirmationEmailProps = ContactFormData & {
  contactId: string;
};

/**
 * お客様宛お問い合わせ確認メールテンプレート
 */
export default function CustomerConfirmationEmail(
  props: CustomerConfirmationEmailProps
) {
  // Propsを直接分割代入 (contactData は不要に)
  const { name, inquiryType, contactId } = props;

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
      backgroundColor: '#ffffff',
    },
    header: {
      borderBottom: '1px solid #eaeaea',
      padding: '10px 0',
      marginBottom: '20px',
      textAlign: 'center' as const,
    },
    logo: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#0070f3',
      display: 'inline-block',
    },
    title: {
      fontSize: '22px',
      fontWeight: 'bold',
      margin: '20px 0',
      textAlign: 'center' as const,
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
      borderLeft: '4px solid #0070f3',
    },
    footer: {
      marginTop: '30px',
      fontSize: '12px',
      color: '#666',
      borderTop: '1px solid #eaeaea',
      paddingTop: '20px',
      textAlign: 'center' as const,
    },
    contactInfo: {
      margin: '20px 0',
      padding: '15px',
      borderLeft: '4px solid #cccccc',
      backgroundColor: '#f9f9f9',
      fontSize: '14px',
      lineHeight: '1.5',
    },
    contactLink: {
      color: '#0070f3',
      textDecoration: 'none',
    },
  };

  // --- React Email コンポーネントを使用するように変更 ---
  return (
    <Html>
      <Head />
      <Preview>【ニイヌマ企画印刷】お問い合わせありがとうございます</Preview>
      <Body style={styles.container}>
        <Container>
          <Section style={styles.header}>
            <Img
              src="https://niinuma-kikaku.com/images/logo/site-logo.png"
              alt="ニイヌマ企画印刷 ロゴ"
              width="180"
              style={{ margin: 'auto' }}
            />
          </Section>

          <Heading style={styles.title}>
            お問い合わせありがとうございます
          </Heading>

          <Section style={styles.content}>
            <Text>
              {/* name を直接参照 */}
              <strong>{name} 様</strong>
            </Text>

            <Text>
              この度は、ニイヌマ企画印刷に{inquiryTypeLabel}
              に関するお問い合わせをいただき、誠にありがとうございます。
              {contactId && (
                <Text style={{ fontSize: '12px', color: '#555' }}>
                  （お問い合わせID: {contactId}）
                </Text>
              )}
            </Text>

            <Text>
              お問い合わせを受け付けました。内容を確認の上、担当者より折り返しご連絡いたします。
              通常1〜2営業日以内にご返信いたしますので、今しばらくお待ちくださいませ。
            </Text>

            <Section style={styles.highlight}>
              <Text>
                <strong>お問い合わせの種類:</strong> {inquiryTypeLabel}
              </Text>
              {/* 必要であれば、確認用に最低限の情報を表示する
              <Text><strong>お名前:</strong> {name}</Text>
              <Text><strong>メールアドレス:</strong> {props.email}</Text>
              */}
            </Section>

            <Text>
              万が一、数日経っても返信がない場合は、お手数ですが再度ご連絡いただくか、
              下記の連絡先までお問い合わせいただけますと幸いです。
            </Text>

            <Section style={styles.contactInfo}>
              <Text>
                <strong>ニイヌマ企画印刷</strong>
                <br />
                〒022-0003 岩手県大船渡市盛町字みどり町4-12
                <br />
                電話:{' '}
                <Link href="tel:0192-26-2160" style={styles.contactLink}>
                  0192-26-2160
                </Link>
                （受付時間: 平日 9:00-18:00）
                <br />
                メール:{' '}
                <Link
                  href="mailto:nkikaku@crocus.ocn.ne.jp"
                  style={styles.contactLink}
                >
                  nkikaku@crocus.ocn.ne.jp
                </Link>
              </Text>
            </Section>

            <Text>今後ともニイヌマ企画印刷をよろしくお願いいたします。</Text>
          </Section>

          <Section style={styles.footer}>
            <Text>
              このメールは自動送信されています。
              <br />
              本メールに心当たりのない場合は、お手数ですが破棄していただきますようお願いいたします。
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
