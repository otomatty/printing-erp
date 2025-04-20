'use client';
import React, { useState, useEffect } from 'react';
import {
  getAnalyticsData,
  getRealtimeAnalyticsData,
} from '~/actions/analytics';

// 型定義: getAnalyticsData の返り値を利用
type AnalyticsReport = Awaited<ReturnType<typeof getAnalyticsData>>;
// 型定義: getRealtimeAnalyticsData の返り値を利用
type RealtimeReport = Awaited<ReturnType<typeof getRealtimeAnalyticsData>>;

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [realtime, setRealtime] = useState<RealtimeReport | null>(null);

  useEffect(() => {
    getAnalyticsData()
      .then(setData)
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
    // リアルタイムデータの取得
    getRealtimeAnalyticsData()
      .then(setRealtime)
      .catch((err) => console.error('[getRealtimeAnalyticsData]', err));
  }, []);

  if (loading) return <p>ロード中…</p>;
  if (error) return <p className="text-red-500">エラー: {error}</p>;

  if (!data) return <p>データがありません</p>;

  const { dimensionHeaders = [], metricHeaders = [], rows = [] } = data;

  // リアルタイム アクティブユーザー
  const activeUsersRealtime = realtime?.rows?.[0]?.metricValues?.[0]?.value;

  return (
    <div className="p-6 overflow-auto">
      <h1 className="text-2xl font-semibold mb-4">Analytics Dashboard</h1>
      <p className="text-lg mb-4">
        リアルタイム アクティブユーザー: {activeUsersRealtime ?? '—'}
      </p>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            {dimensionHeaders.map((h) => {
              const name = h.name ?? '';
              return (
                <th key={name} className="border px-2 py-1">
                  {name}
                </th>
              );
            })}
            {metricHeaders.map((h) => {
              const name = h.name ?? '';
              return (
                <th key={name} className="border px-2 py-1">
                  {name}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.dimensionValues.map((dv, dvIdx) => (
                <td key={`${rowIdx}-${dvIdx}`} className="border px-2 py-1">
                  {dv.value ?? ''}
                </td>
              ))}
              {row.metricValues.map((mv, mvIdx) => (
                <td key={`${rowIdx}-${mvIdx}`} className="border px-2 py-1">
                  {mv.value ?? ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
