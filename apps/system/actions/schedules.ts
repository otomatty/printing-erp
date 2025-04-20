'use server';

import { cookies } from 'next/headers';
import { google, type calendar_v3 } from 'googleapis';
import type { Credentials } from 'google-auth-library';

// Calendar ID from environment variable
const calendarId = process.env.COMPANY_CALENDAR_ID;

if (!calendarId) {
  throw new Error('COMPANY_CALENDAR_ID is not set');
}

/**
 * Initialize Google Calendar client using service account credentials.
 * @returns Google Calendar v3 client
 */
async function getCalendarClient(): Promise<calendar_v3.Calendar> {
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });
  // Pass the GoogleAuth instance directly to match overload
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

  // ユーザーのメールを UserInfo エンドポイントから取得
  const oauth2Service = google.oauth2({ version: 'v2', auth: oauth2Client });
  const { data: userInfo } = await oauth2Service.userinfo.get();
  const userEmail = userInfo.email;
  if (!userEmail) {
    throw new Error('User email is not available');
  }

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
