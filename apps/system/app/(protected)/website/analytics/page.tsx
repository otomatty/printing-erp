'use client';
import React, { useState, useEffect } from 'react';
import { getAnalyticsData } from '~/actions/analytics';
// import type of server action return for typing
import type { getRealtimeAnalyticsData } from '~/actions/analytics';

// 型定義: getAnalyticsData の返り値を利用
type AnalyticsReport = Awaited<ReturnType<typeof getAnalyticsData>>;
// 型定義: getRealtimeAnalyticsData の返り値を利用
type RealtimeReport = Awaited<ReturnType<typeof getRealtimeAnalyticsData>>;

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsReport | null>(null);
  const [realtime, setRealtime] = useState<RealtimeReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 日次データ取得
    getAnalyticsData()
      .then(setData)
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
    // リアルタイムデータ取得 via API Route
    fetch('/api/analytics/realtime')
      .then(
        (res) =>
          res.json() as Promise<
            Awaited<ReturnType<typeof getRealtimeAnalyticsData>>
          >
      )
      .then(setRealtime)
      .catch((err) => console.error('[fetch realtime]', err));
  }, []);

  // 日次データがロードされるまで表示
  if (loading) return <p>ロード中…</p>;
  if (error) return <p className="text-red-500">エラー: {error}</p>;

  // 安全にデータを扱うため optional chaining + nullish coalescing を使用
  const dimensionHeaders = data?.dimensionHeaders ?? [];
  const metricHeaders = data?.metricHeaders ?? [];
  const rows = data?.rows ?? [];

  // リアルタイム アクティブユーザー
  const activeUsersRealtime =
    realtime?.rows?.[0]?.metricValues?.[0]?.value ?? '—';
  // 日次 新規ユーザー数を末尾の行から取得
  const newUsersDaily = rows[rows.length - 1]?.metricValues?.[1]?.value ?? '—';
  // 日次 セッション数を末尾の行から取得
  const sessionsDaily = rows[rows.length - 1]?.metricValues?.[2]?.value ?? '—';
  // 日次 ページビュー数を末尾の行から取得
  const pageviewsDaily = rows[rows.length - 1]?.metricValues?.[3]?.value ?? '—';
  // 日次 平均セッション時間を末尾の行から取得
  const avgSessionDurationDaily =
    rows[rows.length - 1]?.metricValues?.[4]?.value ?? '—';
  // 日次 バウンス率を末尾の行から取得
  const bounceRateDaily =
    rows[rows.length - 1]?.metricValues?.[5]?.value ?? '—';

  // Debug client-side state
  console.debug('[AnalyticsPage] daily dimensionHeaders:', dimensionHeaders);
  console.debug('[AnalyticsPage] daily metricHeaders:', metricHeaders);
  console.debug('[AnalyticsPage] daily rows:', rows);
  console.debug('[AnalyticsPage] realtime state:', realtime);
  console.debug('[AnalyticsPage] activeUsersRealtime:', activeUsersRealtime);

  return (
    <div className="p-6 overflow-auto">
      <h1 className="text-2xl font-semibold mb-4">Analytics Dashboard</h1>
      <p className="text-lg mb-4">
        リアルタイム アクティブユーザー: {activeUsersRealtime}
      </p>
      <p className="text-lg mb-4">日次 新規ユーザー数: {newUsersDaily}</p>
      <p className="text-lg mb-4">日次 セッション数: {sessionsDaily}</p>
      <p className="text-lg mb-4">日次 ページビュー数: {pageviewsDaily}</p>
      <p className="text-lg mb-4">
        日次 平均セッション時間: {avgSessionDurationDaily}
      </p>
      <p className="text-lg mb-4">日次 バウンス率: {bounceRateDaily}</p>
      {rows.length === 0 ? (
        <p className="text-center text-gray-500">
          日次データがまだ利用できません。リアルタイム アクティブユーザー:{' '}
          {activeUsersRealtime}
        </p>
      ) : (
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              {dimensionHeaders.map((h) => (
                <th key={h.name} className="border px-2 py-1">
                  {h.name}
                </th>
              ))}
              {metricHeaders.map((h) => (
                <th key={h.name} className="border px-2 py-1">
                  {h.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const rowKey = [
                ...row.dimensionValues.map((dv) => dv.value),
                ...row.metricValues.map((mv) => mv.value),
              ].join('-');
              return (
                <tr key={rowKey}>
                  {row.dimensionValues.map((dv) => (
                    <td key={dv.value || 'empty'} className="border px-2 py-1">
                      {dv.value ?? ''}
                    </td>
                  ))}
                  {row.metricValues.map((mv) => (
                    <td key={mv.value || 'empty'} className="border px-2 py-1">
                      {mv.value ?? ''}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
