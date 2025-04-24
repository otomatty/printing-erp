import { NextResponse } from 'next/server';
import { getAnalyticsData } from '~/_actions/analytics';

export async function GET() {
  try {
    const data = await getAnalyticsData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('[api/analytics] GET analytics error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
