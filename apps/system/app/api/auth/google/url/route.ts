import { type NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// GET /api/auth/google/url: Google OAuth2 認証URLを返します
export async function GET(request: NextRequest) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_SCHEDULE_CLIENT_ID,
    process.env.GOOGLE_SCHEDULE_CLIENT_SECRET,
    process.env.GOOGLE_SCHEDULE_REDIRECT_URI
  );
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/userinfo.email',
      'openid',
    ],
  });
  return NextResponse.json({ url });
}
