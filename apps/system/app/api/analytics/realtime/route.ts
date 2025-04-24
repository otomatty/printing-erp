import { NextResponse } from 'next/server';
import { getRealtimeAnalyticsData } from '~/_actions/analytics';

export async function GET(request: Request) {
  try {
    const data = await getRealtimeAnalyticsData();
    return NextResponse.json(data);
  } catch (error) {
    console.error(
      '[api/analytics/realtime] Error fetching realtime analytics:',
      error
    );
    return NextResponse.json(
      { error: 'Realtime analytics fetch failed.' },
      { status: 500 }
    );
  }
}
