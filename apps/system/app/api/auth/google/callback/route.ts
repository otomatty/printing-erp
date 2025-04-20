import { type NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getSupabaseServerAdminClient } from '@kit/supabase/server-admin-client';

// GET /api/auth/google/callback: OAuth2 コールバックを処理します
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  if (!code) {
    return NextResponse.json(
      { error: 'Authorization code not found' },
      { status: 400 }
    );
  }
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_SCHEDULE_CLIENT_ID,
    process.env.GOOGLE_SCHEDULE_CLIENT_SECRET,
    process.env.GOOGLE_SCHEDULE_REDIRECT_URI
  );
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  // Googleユーザー情報取得
  const oauth2Service = google.oauth2({ version: 'v2', auth: oauth2Client });
  const { data: userInfo } = await oauth2Service.userinfo.get();
  const userEmail = userInfo.email;
  if (!userEmail) {
    return NextResponse.json(
      { error: 'User email is not available' },
      { status: 400 }
    );
  }

  // Supabaseクライアント初期化: server-admin-clientを使用
  const supabase = getSupabaseServerAdminClient();

  // トークン情報チェック
  const { access_token, refresh_token, expiry_date } = tokens;
  if (!access_token || !refresh_token || !expiry_date) {
    throw new Error('取得したトークン情報が不完全です');
  }
  await supabase.schema('system').from('user_google_tokens').upsert({
    user_email: userEmail,
    access_token,
    refresh_token,
    expiry_date,
  });

  // クッキーにユーザーEmailも保存
  const response = NextResponse.redirect(new URL('/', request.url));
  // トークンの有効期限を秒数で計算
  const maxAge = expiry_date
    ? Math.floor((expiry_date - Date.now()) / 1000)
    : 3600;
  response.cookies.set('google_tokens', JSON.stringify(tokens), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge,
  });
  response.cookies.set('google_user_email', userEmail, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge,
  });
  return response;
}
