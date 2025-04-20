'use server';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import type { ServiceError } from '@grpc/grpc-js';

/**
 * サーバーアクション: GA4 Data API からレポートを取得する
 * @returns GA4 の RunReportResponse
 */
export async function getAnalyticsData() {
  const keyFilename = process.env.GA4_SERVICE_KEY;
  if (!keyFilename) {
    throw new Error('GA4_SERVICE_KEY is not defined');
  }
  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!propertyId) {
    throw new Error('GA4_PROPERTY_ID is not defined');
  }
  const client = new BetaAnalyticsDataClient({ keyFilename });

  // Debug environment values
  console.debug('[getAnalyticsData] Debug - GA4_SERVICE_KEY:', keyFilename);
  console.debug('[getAnalyticsData] Debug - GA4_PROPERTY_ID:', propertyId);

  // Prepare and log the report request payload
  const reportRequest = {
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
    metrics: [{ name: 'activeUsers' }], // テスト用に最小構成
    dimensions: [{ name: 'date' }], // テスト用に最小構成
  };
  console.debug(
    '[getAnalyticsData] Debug - runReport request:',
    JSON.stringify(reportRequest)
  );

  try {
    const [response] = await client.runReport(reportRequest);
    // プロトコルバッファメッセージから必要なフィールドを抽出してプレーンオブジェクトに変換
    const dimensionHeaders =
      response.dimensionHeaders?.map((h) => ({ name: h.name })) ?? [];
    const metricHeaders =
      response.metricHeaders?.map((m) => ({ name: m.name })) ?? [];
    const rows = (response.rows ?? []).map((r) => ({
      dimensionValues:
        r.dimensionValues?.map((dv) => ({ value: dv.value })) ?? [],
      metricValues: r.metricValues?.map((mv) => ({ value: mv.value })) ?? [],
    }));
    return { dimensionHeaders, metricHeaders, rows };
  } catch (error) {
    // Enhanced error handling with detailed debug logs
    console.error('[getAnalyticsData] Analytics fetch error:', error);
    if (error instanceof Error) {
      console.error('[getAnalyticsData] Error name:', error.name);
      console.error('[getAnalyticsData] Error message:', error.message);
      console.error('[getAnalyticsData] Stack trace:', error.stack);
      const grpcError = error as ServiceError;
      console.error('[getAnalyticsData] gRPC code:', grpcError.code);
      console.error('[getAnalyticsData] gRPC details:', grpcError.details);
      if (grpcError.metadata) {
        console.error(
          '[getAnalyticsData] gRPC metadata:',
          JSON.stringify(grpcError.metadata)
        );
      }
      // Wrap original message for user-friendly output
      throw new Error(`Analytics fetch failed: ${error.message}`);
    }
    console.error('[getAnalyticsData] Unknown error type:', typeof error);
    throw new Error('Analytics fetch failed with unknown error');
  }
}

/**
 * サーバーアクション: GA4 Data API のリアルタイムレポートを取得する
 * @returns GA4 の RunRealtimeReportResponse
 */
export async function getRealtimeAnalyticsData() {
  const keyFilename = process.env.GA4_SERVICE_KEY;
  if (!keyFilename) {
    throw new Error('GA4_SERVICE_KEY is not defined');
  }
  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!propertyId) {
    throw new Error('GA4_PROPERTY_ID is not defined');
  }
  const client = new BetaAnalyticsDataClient({ keyFilename });

  console.debug(
    '[getRealtimeAnalyticsData] Debug - GA4_SERVICE_KEY:',
    keyFilename
  );
  console.debug(
    '[getRealtimeAnalyticsData] Debug - GA4_PROPERTY_ID:',
    propertyId
  );

  const realtimeRequest = {
    property: `properties/${propertyId}`,
    metrics: [{ name: 'activeUsers' }],
    // 必要に応じて dimensions を追加可能
  };
  console.debug(
    '[getRealtimeAnalyticsData] Debug - runRealtimeReport request:',
    JSON.stringify(realtimeRequest)
  );

  try {
    const [response] = await client.runRealtimeReport(realtimeRequest);
    // Debug the realtime response payload
    console.debug(
      '[getRealtimeAnalyticsData] Debug - response:',
      JSON.stringify(response)
    );
    return response;
  } catch (error) {
    console.error(
      '[getRealtimeAnalyticsData] Analytics realtime fetch error:',
      error
    );
    if (error instanceof Error) {
      const grpcError = error as ServiceError;
      console.error('[getRealtimeAnalyticsData] gRPC code:', grpcError.code);
      console.error(
        '[getRealtimeAnalyticsData] gRPC details:',
        grpcError.details
      );
      throw new Error(`Realtime analytics fetch failed: ${error.message}`);
    }
    throw new Error('Realtime analytics fetch failed with unknown error');
  }
}
