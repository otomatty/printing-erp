'use server';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import type { ServiceError } from '@grpc/grpc-js';

// ★追加: サービスアカウントの認証情報に必要な型を定義
interface ServiceAccountCredentials {
  client_email: string;
  private_key: string;
  // 他にも必要なキーがあれば追加する
}

/**
 * 環境変数から GA4 の認証情報を取得し、パースする関数
 * @returns パースされた認証情報オブジェクト
 * @throws 環境変数が設定されていない、またはパースに失敗した場合にエラー
 */
function getGa4Credentials(): ServiceAccountCredentials {
  const encodedKey = process.env.GA4_SERVICE_KEY_BASE64;
  if (!encodedKey) {
    throw new Error(
      '環境変数 GA4_SERVICE_KEY_BASE64 が設定されていません。Base64エンコードしたキーを設定しましたか？'
    );
  }
  try {
    const decodedString = Buffer.from(encodedKey, 'base64').toString('utf-8');
    const credentials = JSON.parse(decodedString);
    if (!credentials.client_email || !credentials.private_key) {
      throw new Error('パースされた認証情報に必要なキーが含まれていません。');
    }
    return credentials;
  } catch (error) {
    console.error('GA4認証情報のデコードまたはパースに失敗:', error);
    throw new Error(
      'GA4認証情報の読み込みに失敗しました。環境変数の値を確認してください。'
    );
  }
}

/**
 * サーバーアクション: GA4 Data API からレポートを取得する
 * @returns GA4 の RunReportResponse
 */
export async function getAnalyticsData() {
  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!propertyId) {
    throw new Error('GA4_PROPERTY_ID is not defined');
  }

  let client: BetaAnalyticsDataClient;
  let credentials: ServiceAccountCredentials;
  try {
    credentials = getGa4Credentials();
    client = new BetaAnalyticsDataClient({ credentials });
  } catch (error) {
    console.error('Failed to initialize Analytics client:', error);
    throw error;
  }

  console.debug('[getAnalyticsData] Debug - GA4_PROPERTY_ID:', propertyId);
  console.debug(
    '[getAnalyticsData] Debug - Using client_email:',
    credentials.client_email
  );

  const reportRequest = {
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
    metrics: [
      { name: 'activeUsers' },
      { name: 'newUsers' },
      { name: 'sessions' },
      { name: 'screenPageViews' },
      { name: 'averageSessionDuration' },
      { name: 'bounceRate' },
    ],
    dimensions: [
      { name: 'date' },
      { name: 'country' },
      { name: 'deviceCategory' },
      { name: 'pagePath' },
      { name: 'userGender' },
      { name: 'userAgeBracket' },
    ],
  };
  console.debug(
    '[getAnalyticsData] Debug - runReport request:',
    JSON.stringify(reportRequest)
  );

  try {
    const [response] = await client.runReport(reportRequest);
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
  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!propertyId) {
    throw new Error('GA4_PROPERTY_ID is not defined');
  }

  let client: BetaAnalyticsDataClient;
  let credentials: ServiceAccountCredentials;
  try {
    credentials = getGa4Credentials();
    client = new BetaAnalyticsDataClient({ credentials });
  } catch (error) {
    console.error('Failed to initialize Analytics client for realtime:', error);
    throw error;
  }

  console.debug(
    '[getRealtimeAnalyticsData] Debug - GA4_PROPERTY_ID:',
    propertyId
  );
  console.debug(
    '[getRealtimeAnalyticsData] Debug - Using client_email:',
    credentials.client_email
  );

  const realtimeRequest = {
    property: `properties/${propertyId}`,
    metrics: [{ name: 'activeUsers' }],
  };
  console.debug(
    '[getRealtimeAnalyticsData] Debug - runRealtimeReport request:',
    JSON.stringify(realtimeRequest)
  );

  try {
    const [response] = await client.runRealtimeReport(realtimeRequest);
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

// 新たに流入元別レポート取得用サーバーアクションを追加
export async function getAnalyticsBySourceMedium() {
  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!propertyId) {
    throw new Error('GA4_PROPERTY_ID is not defined');
  }

  let client: BetaAnalyticsDataClient;
  let credentials: ServiceAccountCredentials;
  try {
    credentials = getGa4Credentials();
    client = new BetaAnalyticsDataClient({ credentials });
  } catch (error) {
    console.error(
      'Failed to initialize Analytics client for source/medium:',
      error
    );
    throw error;
  }

  console.debug(
    '[getAnalyticsBySourceMedium] Debug - GA4_PROPERTY_ID:',
    propertyId
  );
  console.debug(
    '[getAnalyticsBySourceMedium] Debug - Using client_email:',
    credentials.client_email
  );

  const reportRequest = {
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
    metrics: [{ name: 'sessions' }],
    dimensions: [{ name: 'sessionSourceMedium' }],
  };
  console.debug(
    '[getAnalyticsBySourceMedium] Debug - runReport request:',
    JSON.stringify(reportRequest)
  );

  try {
    const [response] = await client.runReport(reportRequest);
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
    console.error('[getAnalyticsBySourceMedium] Analytics fetch error:', error);
    if (error instanceof Error) {
      throw new Error(
        `Analytics by SourceMedium fetch failed: ${error.message}`
      );
    }
    throw new Error(
      'Analytics by SourceMedium fetch failed with unknown error'
    );
  }
}
