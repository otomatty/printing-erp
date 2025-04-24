import { NextResponse } from 'next/server';
import { getAnalyticsBySourceMedium } from '~/_actions/analytics';

export async function GET() {
  try {
    const data = await getAnalyticsBySourceMedium();
    return NextResponse.json(data);
  } catch (error) {
    console.error(
      '[api/analytics/source-medium] Error fetching analytics by source medium:',
      error
    );
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
