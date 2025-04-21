'use server';

import { cookies } from 'next/headers';
import { google, type calendar_v3 } from 'googleapis';
import type { JWTInput, Credentials } from 'google-auth-library';
import { getSupabaseServerAdminClient } from '@kit/supabase/server-admin-client';

// Calendar ID from environment variable
const calendarId = process.env.COMPANY_CALENDAR_ID;

/**
 * Initialize Google Calendar client using service account credentials.
 * @returns Google Calendar v3 client
 */
async function getCalendarClient(): Promise<calendar_v3.Calendar> {
  // Load service account credentials from environment variable
  const credentialsEnv = process.env.GOOGLE_CREDENTIALS_JSON;
  if (!credentialsEnv) {
    throw new Error('Environment variable GOOGLE_CREDENTIALS_JSON is not set');
  }
  // Decode Base64 encoded JSON credentials
  let saCredentials: JWTInput & { project_id: string };
  try {
    const decoded = Buffer.from(credentialsEnv, 'base64').toString('utf-8');
    saCredentials = JSON.parse(decoded) as JWTInput & { project_id: string };
  } catch {
    throw new Error(
      'Decoded GOOGLE_CREDENTIALS_JSON is not valid Base64-encoded JSON'
    );
  }
  const auth = new google.auth.GoogleAuth({
    credentials: saCredentials,
    projectId: saCredentials.project_id,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });
  return google.calendar({ version: 'v3', auth });
}

/**
 * Fetch upcoming events from the company calendar.
 * @returns Array of Calendar events
 */
export async function listCompanyEvents(): Promise<calendar_v3.Schema$Event[]> {
  const client = await getCalendarClient();
  const { data } = await client.events.list({
    calendarId,
    timeMin: new Date().toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
  });
  return data.items || [];
}

/**
 * Create a new event in the company calendar.
 * @param summary Title of the event
 * @param startDateTime Event start time in ISO string
 * @param endDateTime Event end time in ISO string
 * @param metadata Optional metadata stored in extendedProperties.private
 * @returns The created Calendar event
 */
export async function createCompanyEvent(
  summary: string,
  startDateTime: string,
  endDateTime: string,
  metadata?: Record<string, string>
): Promise<calendar_v3.Schema$Event> {
  const client = await getCalendarClient();
  const data = await client.events
    .insert({
      calendarId,
      requestBody: {
        summary,
        start: { dateTime: startDateTime },
        end: { dateTime: endDateTime },
        extendedProperties: metadata ? { private: metadata } : undefined,
      },
    })
    .then((res) => res.data);
  if (!data?.id) {
    throw new Error('Failed to create calendar event');
  }
  return data;
}

/**
 * Update an existing event in the company calendar.
 * @param eventId ID of the event to update
 * @param updates Partial updates for the event
 * @returns The updated Calendar event
 */
export async function updateCompanyEvent(
  eventId: string,
  updates: {
    summary?: string;
    startDateTime?: string;
    endDateTime?: string;
    metadata?: Record<string, string>;
  }
): Promise<calendar_v3.Schema$Event> {
  const client = await getCalendarClient();
  const requestBody: Partial<calendar_v3.Schema$Event> = {};
  if (updates.summary) requestBody.summary = updates.summary;
  if (updates.startDateTime)
    requestBody.start = { dateTime: updates.startDateTime };
  if (updates.endDateTime) requestBody.end = { dateTime: updates.endDateTime };
  if (updates.metadata) {
    requestBody.extendedProperties = { private: updates.metadata };
  }
  const data = await client.events
    .update({
      calendarId,
      eventId,
      requestBody,
    })
    .then((res) => res.data);
  if (!data) {
    throw new Error('Failed to update calendar event');
  }
  return data;
}

/**
 * Delete an event from the company calendar.
 * @param eventId ID of the event to delete
 */
export async function deleteCompanyEvent(eventId: string): Promise<void> {
  const client = await getCalendarClient();
  await client.events.delete({ calendarId, eventId });
}

/**
 * Fetch upcoming events from the personal user calendar using NextAuth session.
 * Throws if the user is not authenticated.
 */
export async function listUserEvents(): Promise<calendar_v3.Schema$Event[]> {
  // クッキーから Google トークンを取得
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('google_tokens');
  if (!tokenCookie) {
    throw new Error('User is not authenticated');
  }
  let tokens: Credentials;
  try {
    tokens = JSON.parse(tokenCookie.value) as Credentials;
  } catch {
    throw new Error('Invalid authentication token');
  }

  // OAuth2 クライアントをトークンで初期化
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_SCHEDULE_CLIENT_ID,
    process.env.GOOGLE_SCHEDULE_CLIENT_SECRET,
    process.env.GOOGLE_SCHEDULE_REDIRECT_URI
  );
  oauth2Client.setCredentials(tokens);

  // ユーザー情報取得（メール取得）
  const oauth2Service = google.oauth2({ version: 'v2', auth: oauth2Client });
  const { data: userInfo } = await oauth2Service.userinfo.get();
  const userEmail = userInfo.email;
  if (!userEmail) {
    throw new Error('User email is not available');
  }

  // access_token をリフレッシュ（5分前を目安）
  const now = Date.now();
  if (!tokens.expiry_date || tokens.expiry_date - now < 5 * 60 * 1000) {
    if (!tokens.refresh_token) {
      throw new Error('No refresh token available');
    }
    const { credentials } = await oauth2Client.refreshAccessToken();
    tokens.access_token = credentials.access_token;
    tokens.expiry_date = credentials.expiry_date;
    tokens.refresh_token = credentials.refresh_token ?? tokens.refresh_token;
    // Ensure refreshed tokens are present
    if (!tokens.access_token || !tokens.expiry_date) {
      throw new Error('Failed to refresh Google tokens');
    }
    // Supabase と Cookie に書き戻し
    const supabase = getSupabaseServerAdminClient();
    await supabase
      .schema('system')
      .from('user_google_tokens')
      .upsert<{
        user_email: string;
        access_token: string;
        refresh_token: string;
        expiry_date: number;
      }>(
        [
          {
            user_email: userEmail,
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expiry_date: tokens.expiry_date,
          },
        ],
        { onConflict: 'user_email' }
      );
    // Cookie 更新
    const maxAge = Math.floor((tokens.expiry_date - now) / 1000);
    cookieStore.set('google_tokens', JSON.stringify(tokens), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge,
    });
  }

  // カレンダーイベント取得
  const client = google.calendar({ version: 'v3', auth: oauth2Client });
  const { data } = await client.events.list({
    calendarId: userEmail,
    timeMin: new Date().toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
  });

  return data.items || [];
}

/**
 * ページロード時に会社・個人のカレンダー情報を取得する
 * @returns 会社カレンダー、個人カレンダー、および同期状態フラグ
 */
export async function fetchInitialCalendarData(): Promise<{
  companyEvents: calendar_v3.Schema$Event[];
  personalEvents: calendar_v3.Schema$Event[];
  isLinked: boolean;
}> {
  const companyEvents = await listCompanyEvents();
  let personalEvents: calendar_v3.Schema$Event[] = [];
  let isLinked = true;
  try {
    personalEvents = await listUserEvents();
  } catch {
    isLinked = false;
  }
  return { companyEvents, personalEvents, isLinked };
}

// Add CRUD operations for personal user calendar
/**
 * Create a new event in the personal user calendar using OAuth2 tokens.
 */
export async function createUserEvent(
  summary: string,
  startDateTime: string,
  endDateTime: string,
  metadata?: Record<string, string>
): Promise<calendar_v3.Schema$Event> {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('google_tokens');
  if (!tokenCookie) {
    throw new Error('User is not authenticated');
  }
  let tokens: Credentials;
  try {
    tokens = JSON.parse(tokenCookie.value) as Credentials;
  } catch {
    throw new Error('Invalid authentication token');
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_SCHEDULE_CLIENT_ID,
    process.env.GOOGLE_SCHEDULE_CLIENT_SECRET,
    process.env.GOOGLE_SCHEDULE_REDIRECT_URI
  );
  oauth2Client.setCredentials(tokens);

  // Refresh access token if about to expire
  const now = Date.now();
  if (!tokens.expiry_date || tokens.expiry_date - now < 5 * 60 * 1000) {
    if (!tokens.refresh_token) {
      throw new Error('No refresh token available');
    }
    const { credentials } = await oauth2Client.refreshAccessToken();
    tokens.access_token = credentials.access_token;
    tokens.expiry_date = credentials.expiry_date;
    tokens.refresh_token = credentials.refresh_token ?? tokens.refresh_token;
    if (!tokens.access_token || !tokens.expiry_date) {
      throw new Error('Failed to refresh Google tokens');
    }
    // Persist refreshed tokens
    const supabase = getSupabaseServerAdminClient();
    const oauth2Service = google.oauth2({ version: 'v2', auth: oauth2Client });
    const { data: userInfo } = await oauth2Service.userinfo.get();
    const userEmail = userInfo.email;
    if (!userEmail) {
      throw new Error('User email is not available');
    }
    await supabase
      .schema('system')
      .from('user_google_tokens')
      .upsert<{
        user_email: string;
        access_token: string;
        refresh_token: string;
        expiry_date: number;
      }>(
        [
          {
            user_email: userEmail,
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expiry_date: tokens.expiry_date,
          },
        ],
        { onConflict: 'user_email' }
      );
    const maxAge = Math.floor((tokens.expiry_date - now) / 1000);
    cookieStore.set('google_tokens', JSON.stringify(tokens), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge,
    });
  }

  // Fetch user email
  const oauth2Service = google.oauth2({ version: 'v2', auth: oauth2Client });
  const { data: userInfo } = await oauth2Service.userinfo.get();
  const userEmail = userInfo.email;
  if (!userEmail) {
    throw new Error('User email is not available');
  }

  // Insert event
  const { data } = await google
    .calendar({ version: 'v3', auth: oauth2Client })
    .events.insert({
      calendarId: userEmail,
      requestBody: {
        summary,
        start: { dateTime: startDateTime },
        end: { dateTime: endDateTime },
        extendedProperties: metadata ? { private: metadata } : undefined,
      },
    });
  if (!data?.id) {
    throw new Error('Failed to create calendar event');
  }
  return data;
}

/**
 * Update an existing event in the personal user calendar using OAuth2 tokens.
 */
export async function updateUserEvent(
  eventId: string,
  updates: {
    summary?: string;
    startDateTime?: string;
    endDateTime?: string;
    metadata?: Record<string, string>;
  }
): Promise<calendar_v3.Schema$Event> {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('google_tokens');
  if (!tokenCookie) {
    throw new Error('User is not authenticated');
  }
  let tokens: Credentials;
  try {
    tokens = JSON.parse(tokenCookie.value) as Credentials;
  } catch {
    throw new Error('Invalid authentication token');
  }
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_SCHEDULE_CLIENT_ID,
    process.env.GOOGLE_SCHEDULE_CLIENT_SECRET,
    process.env.GOOGLE_SCHEDULE_REDIRECT_URI
  );
  oauth2Client.setCredentials(tokens);

  // (Refresh logic same as createUserEvent)
  const now = Date.now();
  if (!tokens.expiry_date || tokens.expiry_date - now < 5 * 60 * 1000) {
    if (!tokens.refresh_token) {
      throw new Error('No refresh token available');
    }
    const { credentials } = await oauth2Client.refreshAccessToken();
    tokens.access_token = credentials.access_token;
    tokens.expiry_date = credentials.expiry_date;
    tokens.refresh_token = credentials.refresh_token ?? tokens.refresh_token;
    if (!tokens.access_token || !tokens.expiry_date) {
      throw new Error('Failed to refresh Google tokens');
    }
    const supabase = getSupabaseServerAdminClient();
    const oauth2Service = google.oauth2({ version: 'v2', auth: oauth2Client });
    const { data: userInfo } = await oauth2Service.userinfo.get();
    const userEmail = userInfo.email;
    if (!userEmail) {
      throw new Error('User email is not available');
    }
    await supabase
      .schema('system')
      .from('user_google_tokens')
      .upsert(
        [
          {
            user_email: userEmail,
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expiry_date: tokens.expiry_date,
          },
        ],
        { onConflict: 'user_email' }
      );
    const maxAge = Math.floor((tokens.expiry_date - now) / 1000);
    cookieStore.set('google_tokens', JSON.stringify(tokens), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge,
    });
  }

  // Fetch user email
  const oauth2Service = google.oauth2({ version: 'v2', auth: oauth2Client });
  const { data: userInfo } = await oauth2Service.userinfo.get();
  const userEmail = userInfo.email;
  if (!userEmail) {
    throw new Error('User email is not available');
  }

  const requestBody: Partial<calendar_v3.Schema$Event> = {};
  if (updates.summary) requestBody.summary = updates.summary;
  if (updates.startDateTime)
    requestBody.start = { dateTime: updates.startDateTime };
  if (updates.endDateTime) requestBody.end = { dateTime: updates.endDateTime };
  if (updates.metadata)
    requestBody.extendedProperties = { private: updates.metadata };

  const { data } = await google
    .calendar({ version: 'v3', auth: oauth2Client })
    .events.update({
      calendarId: userEmail,
      eventId,
      requestBody,
    });
  if (!data) {
    throw new Error('Failed to update calendar event');
  }
  return data;
}

/**
 * Delete an event from the personal user calendar using OAuth2 tokens.
 */
export async function deleteUserEvent(eventId: string): Promise<void> {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('google_tokens');
  if (!tokenCookie) {
    throw new Error('User is not authenticated');
  }
  let tokens: Credentials;
  try {
    tokens = JSON.parse(tokenCookie.value) as Credentials;
  } catch {
    throw new Error('Invalid authentication token');
  }
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_SCHEDULE_CLIENT_ID,
    process.env.GOOGLE_SCHEDULE_CLIENT_SECRET,
    process.env.GOOGLE_SCHEDULE_REDIRECT_URI
  );
  oauth2Client.setCredentials(tokens);

  // Refresh if needed
  const now = Date.now();
  if (!tokens.expiry_date || tokens.expiry_date - now < 5 * 60 * 1000) {
    if (!tokens.refresh_token) {
      throw new Error('No refresh token available');
    }
    const { credentials } = await oauth2Client.refreshAccessToken();
    tokens.access_token = credentials.access_token;
    tokens.expiry_date = credentials.expiry_date;
    tokens.refresh_token = credentials.refresh_token ?? tokens.refresh_token;
    if (!tokens.access_token || !tokens.expiry_date) {
      throw new Error('Failed to refresh Google tokens');
    }
  }

  const oauth2Service = google.oauth2({ version: 'v2', auth: oauth2Client });
  const { data: userInfo } = await oauth2Service.userinfo.get();
  const userEmail = userInfo.email;
  if (!userEmail) {
    throw new Error('User email is not available');
  }

  await google.calendar({ version: 'v3', auth: oauth2Client }).events.delete({
    calendarId: userEmail,
    eventId,
  });
}
