import { Resend } from 'resend';
import { getLogger } from '@kit/shared/logger';
import type { Database } from '@kit/supabase/database'; // Role 型のために必要かも

if (!process.env.NEXT_PUBLIC_SYSTEM_URL) {
  throw new Error('NEXT_PUBLIC_SYSTEM_URL environment variable is not set.');
}
if (!process.env.RESEND_FROM_EMAIL) {
  console.warn(
    'RESEND_FROM_EMAIL environment variable is not set. Using default.'
  );
}

const resend = new Resend(process.env.RESEND_API_KEY);

const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@niinuma-kikaku.com';
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || '印刷会社 業務アプリ';

interface SendAdminInvitationEmailParams {
  email: string;
  token: string;
  invitedRole: Database['public']['Enums']['admin_role']; // 役割も渡すようにするわ
  expiresAt: Date; // Date オブジェクトで受け取る方が扱いやすいでしょ
}

/**
 * 管理者招待メールを Resend を使用して送信します。
 *
 * @param {SendAdminInvitationEmailParams} params - メール送信に必要なパラメータ
 * @param {string} params.email - 送信先メールアドレス
 * @param {string} params.token - 招待トークン
 * @param {Database['public']['Enums']['admin_role']} params.invitedRole - 招待された役割
 * @param {Date} params.expiresAt - 招待の有効期限
 * @returns {Promise<{ success: boolean; error?: string }>} - 送信結果
 */
export async function sendAdminInvitationEmail({
  email,
  token,
  invitedRole,
  expiresAt,
}: SendAdminInvitationEmailParams): Promise<{
  success: boolean;
  error?: string;
}> {
  const logger = await getLogger();
  const invitationLink = `${process.env.NEXT_PUBLIC_SYSTEM_URL}/auth/accept-invitation?token=${token}`;
  const formattedExpiresAt = expiresAt.toLocaleString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const roleText = invitedRole === 'admin' ? '管理者' : 'スタッフ'; // 役割に応じたテキスト

  try {
    logger.info({ email, role: invitedRole }, 'Sending invitation email...');

    const { data, error } = await resend.emails.send({
      from: `${siteName} <${fromEmail}>`, // 送信元名を指定
      to: [email],
      subject: `${siteName}へのご招待`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>${siteName}へのご招待</h2>
          <p>こんにちは。</p>
          <p>${siteName}の${roleText}として招待されました。</p>
          <p>以下のリンクをクリックして、アカウントの登録を完了してください。</p>
          <p style="margin: 20px 0;">
            <a href="${invitationLink}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
              招待を承認して登録する
            </a>
          </p>
          <p>この招待リンクは <strong>${formattedExpiresAt}</strong> まで有効です。</p>
          <p>もしこの招待に心当たりがない場合は、このメールを無視してください。</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 0.8em; color: #777;">${siteName}</p>
        </div>
      `,
      // text: `... プレーンテキスト版も用意すると親切よ ...`
    });

    if (error) {
      logger.error({ error, email }, 'Failed to send invitation email');
      return { success: false, error: '招待メールの送信に失敗しました。' };
    }

    logger.info(
      { email, messageId: data?.id },
      'Invitation email sent successfully.'
    );
    return { success: true };
  } catch (e) {
    logger.error(e, `Unexpected error sending invitation email to ${email}`);
    const errorMessage =
      e instanceof Error ? e.message : '予期せぬエラーが発生しました。';
    return { success: false, error: errorMessage };
  }
}

// ★ resendInvitationAction で再送する時にもこの関数を使うように修正する必要があるわよ！
// ★ その場合、引数に `invitationId` は不要で `token` を渡すようにするの。
