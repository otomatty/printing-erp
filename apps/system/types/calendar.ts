import type { calendar_v3 } from 'googleapis';

/** Raw event type from Google Calendar API */
export type RawEvent = calendar_v3.Schema$Event;

/** UI event type for calendar component */
export interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  colorClass: string;
  isUrgent?: boolean;
}
