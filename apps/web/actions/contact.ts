// サーバーアクション - お問い合わせフォーム送信処理
'use server';

import { getSupabaseServerAdminClient } from '@kit/supabase/server-admin-client';
import type {
  UserInfo,
  InquiryType,
  PrintServicesDetails,
  DigitalServicesDetails,
  GeneralInquiryDetails,
  MeetingReservationDetails, // ミーティング予約も考慮する場合
  PrintInquiryType, // ★ これを追加！
} from '../types/contact-form';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import AdminNotificationEmail from '../emails/admin-notification';
import CustomerConfirmationEmail from '../emails/customer-confirmation';
import type { AdminNotificationEmailProps } from '../emails/admin-notification';
import type { CustomerConfirmationEmailProps } from '../emails/customer-confirmation';

// Resend クライアントの初期化
let resend: Resend | null = null;

function getResendClient() {
  if (resend) return resend;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      'Resend APIキーが設定されていません (RESEND_API_KEY 環境変数)'
    );
    return null;
  }
  resend = new Resend(apiKey);
  return resend;
}

/**
 * @typedef {Object} ContactFormData
 * @property {UserInfo} userInfo - ユーザーの基本情報
 * @property {InquiryType} inquiryType - 問い合わせ種別
 * @property {PrintServicesDetails | DigitalServicesDetails | GeneralInquiryDetails | MeetingReservationDetails} formDetails - 問い合わせ種別に応じた詳細情報
 */
interface ContactFormData {
  userInfo: UserInfo;
  inquiryType: InquiryType;
  formDetails:
    | PrintServicesDetails
    | DigitalServicesDetails
    | GeneralInquiryDetails
    | MeetingReservationDetails; // 必要に応じて拡張
  contactId?: string; // DB保存後に追加される
}

/**
 * お問い合わせデータを新しいDBスキーマに基づいて保存する
 * @param {ContactFormData} contactData - 保存するお問い合わせデータ
 * @returns {Promise<{success: boolean, contactId?: string, error?: string}>} 保存結果
 */
async function saveContactToDatabase(
  contactData: Omit<ContactFormData, 'contactId'>
) {
  const serviceClient = getSupabaseServerAdminClient();

  try {
    // 1. 共通テーブル (inquiries) に基本情報を挿入
    const { data: inquiryData, error: inquiryError } = await serviceClient
      .from('inquiries')
      .insert({
        source: 'web', // 受付チャネル(web)
        service_type: contactData.inquiryType,
        name: contactData.userInfo.name,
        company_name: contactData.userInfo.companyName,
        email: contactData.userInfo.email,
        phone: contactData.userInfo.phone,
        preferred_contact: contactData.userInfo.preferredContact,
        address: contactData.userInfo.address,
        postal_code: contactData.userInfo.postalCode,
      })
      .select('id')
      .single();

    if (inquiryError || !inquiryData) {
      console.error('共通お問い合わせ情報保存エラー:', inquiryError);
      return {
        success: false,
        error: inquiryError?.message || '共通情報の保存に失敗しました',
      };
    }

    const inquiryId = inquiryData.id;

    // 2. 問い合わせ種別に応じてサブテーブルに詳細情報を挿入
    let subTableError: { message: string } | null | undefined = null;

    switch (contactData.inquiryType) {
      case 'print-services': {
        const details = contactData.formDetails as PrintServicesDetails;
        const { error } = await serviceClient
          .from('print_services_inquiries')
          .insert({
            id: inquiryId, // 共通テーブルのIDを使用
            printing_type: details.printingType,
            print_inquiry_type: details.printInquiryType,
            contents: details.contents,
            deadline: details.deadline,
            has_design_data: details.hasDesignData,
          });
        subTableError = error;
        break;
      }
      case 'digital-services': {
        const details = contactData.formDetails as DigitalServicesDetails;
        const { error } = await serviceClient
          .from('digital_services_inquiries')
          .insert({
            id: inquiryId,
            digital_service_type: details.digitalServiceType,
            estimate_params: details.estimateParams,
            project_description: details.projectDescription,
          });
        subTableError = error;
        break;
      }
      case 'general-inquiry': {
        const details = contactData.formDetails as GeneralInquiryDetails;
        const { error } = await serviceClient.from('general_inquiries').insert({
          id: inquiryId,
          inquiry_content: details.inquiryContent,
        });
        subTableError = error;
        break;
      }
      // meeting-reservation は contact_inquiries と meeting_reservations に保存される想定？
      // 必要であれば case 'meeting-reservation': を追加
      default:
        console.warn('未対応の問い合わせ種別:', contactData.inquiryType);
      // サブテーブルへの挿入がない場合もあるのでエラー扱いにしない
    }

    if (subTableError) {
      console.error('サブテーブル保存エラー:', subTableError);
      // ここで共通テーブルのデータを削除するなどのロールバック処理を検討すべきだが、
      // Supabaseのサーバーアクション単体では複雑になるため、一旦エラーとして返す。
      // 必要ならRPC (Stored Procedure) の利用を検討。
      return { success: false, error: subTableError.message };
    }

    return { success: true, contactId: inquiryId };
  } catch (error) {
    console.error('お問い合わせデータベース保存中の予期せぬエラー:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : '内部エラーが発生しました',
    };
  }
}

/**
 * 管理者宛通知メールを送信 (Resend + DB参照に修正)
 */
async function sendAdminNotification(contactData: ContactFormData) {
  const resend = getResendClient();
  if (!resend) {
    return { success: false, error: 'メール設定(Resend)が不完全です' };
  }

  const serviceClient = getSupabaseServerAdminClient();
  const { data: settings, error: dbError } = await serviceClient
    .schema('system') // スキーマ指定
    .from('contact_notification_settings')
    .select('email')
    .eq('is_active', true)
    .or(`inquiry_type.eq.${contactData.inquiryType},inquiry_type.is.null`); // 特定種別 or 全種別共通

  if (dbError) {
    console.error('通知先メールアドレス取得エラー:', dbError);
    // DBエラーがあっても処理は続行するが、警告を返す
    return {
      success: false,
      error: '通知先メールアドレスの取得に失敗しました',
    };
  }

  const toEmails = settings?.map((setting) => setting.email) || [];

  if (toEmails.length === 0) {
    console.warn(
      `通知先メールアドレスが見つかりません (inquiryType: ${contactData.inquiryType})`
    );
    // 送信先がない場合は成功として扱う (エラーではない)
    return { success: true };
  }

  if (!contactData.contactId) {
    console.error('sendAdminNotification: contactId が見つかりません');
    return { success: false, error: '内部エラー: contactId 不足' };
  }

  try {
    // メールコンポーネントに渡す Props を動的に構築
    let emailProps: AdminNotificationEmailProps;

    // UserInfo と contactId は共通
    const baseProps = {
      ...contactData.userInfo,
      contactId: contactData.contactId,
    };

    switch (contactData.inquiryType) {
      case 'print-services': {
        const printDetails = contactData.formDetails as PrintServicesDetails;
        // printInquiryType が PrintInquiryType または undefined であることを確認し、デフォルト値を設定
        const resolvedPrintInquiryType =
          printDetails.printInquiryType &&
          ['estimate', 'order', 'question', 'none'].includes(
            printDetails.printInquiryType
          )
            ? (printDetails.printInquiryType as PrintInquiryType) // 型アサーションで PrintInquiryType にする
            : 'none';

        emailProps = {
          ...baseProps, // userInfo と contactId
          inquiryType: 'print-services',
          // Details から必須プロパティを個別に設定 (デフォルト値付き)
          printingType: printDetails.printingType ?? '未指定',
          printInquiryType: resolvedPrintInquiryType, // 修正した値を代入
          contents: printDetails.contents ?? '',
          deadline: printDetails.deadline ?? '指定なし',
          hasDesignData: printDetails.hasDesignData ?? false,
        };
        break;
      }
      case 'digital-services': {
        const digitalDetails =
          contactData.formDetails as DigitalServicesDetails;
        const digitalBaseProps = { ...baseProps };

        if (digitalDetails.digitalServiceType === 'standard-form') {
          emailProps = {
            ...digitalBaseProps,
            inquiryType: 'digital-services',
            digitalServiceType: 'standard',
            projectDescription: digitalDetails.projectDescription ?? '',
          };
        } else if (digitalDetails.digitalServiceType === 'meeting') {
          emailProps = {
            ...digitalBaseProps,
            inquiryType: 'digital-services',
            digitalServiceType: 'meeting',
            meetingDatetime: '日時未定',
            meetingMethod: '未定',
          };
        } else {
          console.error(
            `未対応の digitalServiceType: ${digitalDetails.digitalServiceType}`
          );
          return {
            success: false,
            error: '内部エラー: 未対応のデジタルサービス種別',
          };
        }
        break;
      }
      case 'general-inquiry': {
        const generalDetails = contactData.formDetails as GeneralInquiryDetails;
        // ★ GeneralInquiryFormData で必須の preferredContactMethod, preferredContactTime が
        //    GeneralInquiryDetails に存在しないため、デフォルト値を設定する必要がある
        emailProps = {
          ...baseProps,
          inquiryType: 'general-inquiry',
          inquiryContent: generalDetails.inquiryContent, // これは Details でも必須のはず
          preferredContactMethod: 'either', // デフォルト値 (フォームから取得すべき)
          preferredContactTime: '指定なし', // デフォルト値 (フォームから取得すべき)
        };
        break;
      }
      // case 'meeting-reservation': ...
      default: {
        console.error(
          `未対応の問い合わせ種別 (メールProps構築): ${contactData.inquiryType}`
        );
        return { success: false, error: '内部エラー: 未対応の問い合わせ種別' };
      }
    }

    // 組み立てた props を渡す
    const emailHtml = await render(AdminNotificationEmail(emailProps));
    const fromAddress =
      process.env.RESEND_FROM_EMAIL || 'noreply@niinuma-kikaku.com';

    // inquiryType を日本語に変換
    const inquiryTypeLabel =
      {
        'print-services': '印刷サービス',
        'digital-services': 'デジタルサービス',
        'general-inquiry': 'その他のお問い合わせ',
        'meeting-reservation': 'ミーティング予約', // meeting-reservationも対応
      }[contactData.inquiryType] || 'お問い合わせ'; // デフォルト値も設定

    // メール送信 (Resend)
    const { error: sendError } = await resend.emails.send({
      from: fromAddress,
      to: toEmails,
      subject: `【お問い合わせ】${contactData.userInfo.name}様 (種類: ${inquiryTypeLabel})`,
      html: emailHtml,
      replyTo: contactData.userInfo.email,
    });

    if (sendError) {
      console.error('Resend 管理者宛メール送信エラー:', sendError);
      return { success: false, error: 'メール送信に失敗しました' };
    }

    return { success: true };
  } catch (error) {
    console.error('管理者宛メール送信処理中の予期せぬエラー:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'メール送信に失敗しました',
    };
  }
}

/**
 * お客様宛確認メールを送信 (Resend に修正)
 */
async function sendCustomerConfirmation(contactData: ContactFormData) {
  const resend = getResendClient();
  if (!resend) {
    return { success: false, error: 'メール設定(Resend)が不完全です' };
  }

  // contactId が存在するかチェック
  if (!contactData.contactId) {
    console.error('sendCustomerConfirmation: contactId が見つかりません');
    return { success: false, error: '内部エラー: contactId 不足' };
  }

  try {
    // メールコンポーネントに渡す Props を動的に構築
    let emailProps: CustomerConfirmationEmailProps;

    // UserInfo と contactId は共通
    const baseProps = {
      ...contactData.userInfo,
      contactId: contactData.contactId,
    };

    switch (contactData.inquiryType) {
      case 'print-services': {
        const printDetails = contactData.formDetails as PrintServicesDetails;
        const resolvedPrintInquiryType =
          printDetails.printInquiryType &&
          ['estimate', 'order', 'question', 'none'].includes(
            printDetails.printInquiryType
          )
            ? (printDetails.printInquiryType as PrintInquiryType)
            : 'none';
        emailProps = {
          ...baseProps,
          inquiryType: 'print-services',
          printingType: printDetails.printingType ?? '未指定',
          printInquiryType: resolvedPrintInquiryType,
          contents: printDetails.contents ?? '',
          deadline: printDetails.deadline ?? '指定なし',
          hasDesignData: printDetails.hasDesignData ?? false,
        };
        break;
      }
      case 'digital-services': {
        const digitalDetails =
          contactData.formDetails as DigitalServicesDetails;
        const digitalBaseProps = { ...baseProps };

        if (digitalDetails.digitalServiceType === 'standard-form') {
          emailProps = {
            ...digitalBaseProps,
            inquiryType: 'digital-services',
            digitalServiceType: 'standard',
            projectDescription: digitalDetails.projectDescription ?? '',
          };
        } else if (digitalDetails.digitalServiceType === 'meeting') {
          emailProps = {
            ...digitalBaseProps,
            inquiryType: 'digital-services',
            digitalServiceType: 'meeting',
            meetingDatetime: '日時未定',
            meetingMethod: '未定',
          };
        } else {
          console.error(
            `未対応の digitalServiceType: ${digitalDetails.digitalServiceType}`
          );
          return {
            success: false,
            error: '内部エラー: 未対応のデジタルサービス種別',
          };
        }
        break;
      }
      case 'general-inquiry': {
        const generalDetails = contactData.formDetails as GeneralInquiryDetails;
        emailProps = {
          ...baseProps,
          inquiryType: 'general-inquiry',
          inquiryContent: generalDetails.inquiryContent,
          preferredContactMethod: 'either',
          preferredContactTime: '指定なし',
        };
        break;
      }
      // case 'meeting-reservation': ...
      default: {
        console.error(
          `未対応の問い合わせ種別 (メールProps構築): ${contactData.inquiryType}`
        );
        return { success: false, error: '内部エラー: 未対応の問い合わせ種別' };
      }
    }

    // 組み立てた props を渡す
    const emailHtml = await render(CustomerConfirmationEmail(emailProps));
    const fromAddress =
      process.env.RESEND_FROM_EMAIL || 'noreply@niinuma-kikaku.com';

    // メール送信 (Resend)
    const { error: sendError } = await resend.emails.send({
      from: fromAddress,
      to: contactData.userInfo.email,
      subject: '【ニイヌマ企画印刷】お問い合わせありがとうございます',
      html: emailHtml,
    });

    if (sendError) {
      console.error('Resend お客様宛確認メール送信エラー:', sendError);
      return { success: false, error: 'メール送信に失敗しました' };
    }

    return { success: true };
  } catch (error) {
    console.error('お客様宛確認メール送信処理中の予期せぬエラー:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'メール送信に失敗しました',
    };
  }
}

/**
 * お問い合わせフォーム送信処理 (メイン関数)
 * @param {ContactFormData} formData - フォームから送信されたデータ
 * @returns {Promise<{success: boolean, contactId?: string, error?: string, warning?: string}>} 処理結果
 */
export async function submitContactForm(
  formData: Omit<ContactFormData, 'contactId'> // DB保存前の型
): Promise<{
  success: boolean;
  contactId?: string;
  error?: string;
  warning?: string;
}> {
  try {
    // データベースに保存
    const dbResult = await saveContactToDatabase(formData);
    if (!dbResult.success || !dbResult.contactId) {
      return { success: false, error: dbResult.error || 'DB保存に失敗' };
    }

    const contactId = dbResult.contactId;
    const mailData = { ...formData, contactId }; // メール送信用に contactId を追加

    // 管理者通知メール送信とユーザー確認メール送信を並行して実行
    const [adminMailResult, userMailResult] = await Promise.all([
      sendAdminNotification(mailData),
      sendCustomerConfirmation(mailData),
    ]);

    // メール送信結果のハンドリング
    let warningMessage: string | undefined = undefined;
    if (!adminMailResult.success || !userMailResult.success) {
      warningMessage = 'お問い合わせは保存されましたが、';
      if (!adminMailResult.success && !userMailResult.success) {
        warningMessage +=
          '管理者宛およびお客様宛の確認メール送信に失敗しました。';
      } else if (!adminMailResult.success) {
        warningMessage += '管理者宛の通知メール送信に失敗しました。';
      } else {
        warningMessage += 'お客様宛の確認メール送信に失敗しました。';
      }
      console.warn('メール送信失敗:', { adminMailResult, userMailResult });
    }

    return { success: true, contactId, warning: warningMessage };
  } catch (error) {
    console.error('お問い合わせ送信処理エラー:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : '内部エラーが発生しました',
    };
  }
}
