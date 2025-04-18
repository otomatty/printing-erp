// apps/system/app/api/auth/accept-invitation/route.ts (修正版)
import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@kit/supabase/database'; // types のパスを修正
import pathsConfig from '~/config/paths.config';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const redirectUrlBase =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:2122';
// 招待検証後にリダイレクトするサインインページのパス
const signInPath = pathsConfig.auth.login;
const invalidInvitePath = pathsConfig.auth.invalidInvitation;
const errorPath = pathsConfig.auth.error;

export async function GET(request: NextRequest) {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error('Supabase URL or Service Role Key is not configured.');
    return NextResponse.redirect(
      `${redirectUrlBase}${errorPath}?message=Configuration error`
    );
  }

  const supabaseAdmin = createClient<Database>(
    supabaseUrl,
    supabaseServiceRoleKey,
    {
      auth: { autoRefreshToken: false, persistSession: false },
    }
  );

  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    console.warn('Accept invitation attempt without token.');
    return NextResponse.redirect(
      `${redirectUrlBase}${invalidInvitePath}?reason=notoken`
    );
  }

  try {
    // --- 1. 招待情報をトークンで検索 ---
    const { data: invitation, error: fetchError } = await supabaseAdmin
      .schema('invitations')
      .from('invitations')
      .select('id, email, status, expires_at') // 必要なカラムだけ取得
      .eq('token', token)
      .single();

    if (fetchError || !invitation) {
      console.warn(
        `Invitation not found or fetch error for token: ${token}`,
        fetchError
      );
      return NextResponse.redirect(
        `${redirectUrlBase}${invalidInvitePath}?reason=notfound`
      );
    }

    // --- 2. 招待の有効性を検証 ---
    if (invitation.status !== 'pending') {
      console.warn(
        `Invitation not pending: ${token}, status: ${invitation.status}`
      );
      const reason =
        invitation.status === 'accepted'
          ? 'already_accepted'
          : invitation.status === 'verified'
            ? 'already_verified' // 'verified' ステータスも追加
            : 'invalid_status';
      // すでに verified でも、サインインページに誘導して良いかも？今回はエラー扱いにするわ。
      return NextResponse.redirect(
        `${redirectUrlBase}${invalidInvitePath}?reason=${reason}`
      );
    }

    if (new Date(invitation.expires_at) < new Date()) {
      console.warn(`Invitation expired: ${token}`);
      // TODO: 期限切れの場合、ステータスを 'expired' に更新する処理
      // await supabaseAdmin.schema('invitations').from('invitations').update({ status: 'expired' }).eq('id', invitation.id);
      return NextResponse.redirect(
        `${redirectUrlBase}${invalidInvitePath}?reason=expired`
      );
    }

    // --- 3. 招待ステータスを 'verified' に更新 ---
    // これで、後続のサインイン処理でトリガーがこの招待を認識できるようになるわ
    const { error: updateError } = await supabaseAdmin
      .schema('invitations')
      .from('invitations')
      .update({ status: 'verified', updated_at: new Date().toISOString() }) // status を 'verified' に！
      .eq('id', invitation.id);

    if (updateError) {
      console.error(
        'Failed to update invitation status to verified:',
        updateError
      );
      return NextResponse.redirect(
        `${redirectUrlBase}${errorPath}?message=Invitation verification failed`
      );
    }

    // --- 4. サインインページにリダイレクト ---
    // ユーザーに通常のサインイン (Magic Link / Google) を促す
    // リダイレクト先にメールアドレスを渡して、サインインフォームに自動入力させると親切かもね
    console.log(
      `Invitation verified for ${invitation.email}. Redirecting to sign in.`
    );
    return NextResponse.redirect(
      `${redirectUrlBase}${signInPath}?email=${encodeURIComponent(invitation.email)}&invited=true`
    ); // invited=true みたいなフラグも追加
  } catch (error) {
    console.error('Unexpected error during invitation verification:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.redirect(
      `${redirectUrlBase}${errorPath}?message=${encodeURIComponent(message)}`
    );
  }
}

// 注意: ENUM 型 'invitation_status' に 'verified' を追加するのを忘れないで！
// ALTER TYPE public.invitation_status ADD VALUE 'verified';
