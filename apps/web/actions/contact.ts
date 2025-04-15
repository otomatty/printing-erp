// サーバーアクション - お問い合わせフォーム送信処理
'use server';

import { getSupabaseServerClient } from '@kit/supabase/server-client';
import type { UserInfo, InquiryType } from '~/types/contact-form';
import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import AdminNotificationEmail from '../emails/admin-notification';
import CustomerConfirmationEmail from '../emails/customer-confirmation';

// メール送信用のトランスポーター
let transporter: nodemailer.Transporter | null = null;

// トランスポーターの初期化
function getTransporter() {
  if (transporter) return transporter;

  // 環境変数からSMTP設定を取得
  const host = process.env.SMTP_HOST;
  const port = Number.parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const from = process.env.SMTP_FROM || 'nkikaku@crocus.ocn.ne.jp';

  // SMTP設定が揃っていない場合はnullを返す
  if (!host || !user || !pass) {
    console.error('SMTP設定が不完全です');
    return null;
  }

  // トランスポーターを作成
  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });

  return transporter;
}

// お問い合わせデータの型定義
interface ContactData {
  userInfo: UserInfo;
  inquiryType: InquiryType;
  formDetails: Record<string, unknown>;
  contactId?: string;
}

/**
 * お問い合わせデータをSupabaseに保存
 */
async function saveContactToDatabase(contactData: ContactData) {
  try {
    const serviceClient = await getSupabaseServerClient();

    // データの整形
    const dbRecord = {
      name: contactData.userInfo.name,
      email: contactData.userInfo.email,
      phone: contactData.userInfo.phone,
      company_name: contactData.userInfo.companyName,
      inquiry_type: contactData.inquiryType,
      form_data: contactData.formDetails,
      status: 'new', // 新規問い合わせステータス
    };

    const { data, error } = await serviceClient
      .from('contacts')
      .insert(dbRecord)
      .select('id')
      .single();

    if (error) {
      console.error('お問い合わせ保存エラー:', error);
      return { success: false, error: error.message };
    }

    return { success: true, contactId: data.id };
  } catch (error) {
    console.error('お問い合わせデータベース保存中のエラー:', error);
    return { success: false, error: '内部エラーが発生しました' };
  }
}

/**
 * 管理者宛通知メールを送信
 */
async function sendAdminNotification(contactData: ContactData) {
  const transporter = getTransporter();
  if (!transporter) {
    return { success: false, error: 'メール設定が不完全です' };
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'nkikaku@crocus.ocn.ne.jp';
  const additionalEmails = process.env.ADDITIONAL_NOTIFICATION_EMAILS;

  // 追加の通知先メールアドレスをカンマ区切りで分割
  const toEmails = additionalEmails
    ? [adminEmail, ...additionalEmails.split(',').map((email) => email.trim())]
    : [adminEmail];

  try {
    // 管理者宛メールの内容を作成
    const emailHtml = await render(AdminNotificationEmail({ contactData }));

    // メール送信
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'nkikaku@crocus.ocn.ne.jp',
      to: toEmails,
      subject: `【お問い合わせ】${contactData.userInfo.name}様`,
      html: emailHtml,
    });

    return { success: true };
  } catch (error) {
    console.error('管理者宛メール送信エラー:', error);
    return { success: false, error: 'メール送信に失敗しました' };
  }
}

/**
 * お客様宛確認メールを送信
 */
async function sendCustomerConfirmation(contactData: ContactData) {
  const transporter = getTransporter();
  if (!transporter) {
    return { success: false, error: 'メール設定が不完全です' };
  }

  try {
    // お客様宛メールの内容を作成
    const emailHtml = await render(CustomerConfirmationEmail({ contactData }));

    // メール送信
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'nkikaku@crocus.ocn.ne.jp',
      to: contactData.userInfo.email,
      subject: '【ニイヌマ企画印刷】お問い合わせありがとうございます',
      html: emailHtml,
    });

    return { success: true };
  } catch (error) {
    console.error('お客様宛確認メール送信エラー:', error);
    return { success: false, error: 'メール送信に失敗しました' };
  }
}

/**
 * お問い合わせフォーム送信処理
 */
export async function submitContactForm(formData: {
  userInfo: UserInfo;
  inquiryType: InquiryType;
  formDetails: Record<string, unknown>;
}): Promise<{
  success: boolean;
  contactId?: string;
  error?: string;
  warning?: string;
}> {
  try {
    // データベースに保存
    const dbResult = await saveContactToDatabase(formData);
    if (!dbResult.success) {
      return { success: false, error: dbResult.error };
    }

    // 管理者通知メール送信
    const adminMailResult = await sendAdminNotification({
      ...formData,
      contactId: dbResult.contactId,
    });

    // ユーザー確認メール送信
    const userMailResult = await sendCustomerConfirmation({
      ...formData,
      contactId: dbResult.contactId,
    });

    // 両方のメール送信が成功したら成功を返す
    if (adminMailResult.success && userMailResult.success) {
      return { success: true, contactId: dbResult.contactId };
    }
    // メール送信に失敗したが、データは保存されている場合
    return {
      success: true,
      contactId: dbResult.contactId,
      warning: 'お問い合わせは保存されましたが、メール送信に失敗しました',
    };
  } catch (error) {
    console.error('お問い合わせ送信処理エラー:', error);
    return { success: false, error: '内部エラーが発生しました' };
  }
}
