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
  const [realtime, setRealtime] = useState<RealtimeReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // 両方のデータが揃うまでロード中表示
  if (loading || realtime === null) return <p>ロード中…</p>;
  if (error) return <p className="text-red-500">エラー: {error}</p>;

  // 安全にデータを扱うためのフォールバック
  const fallbackReport: AnalyticsReport = {
    dimensionHeaders: [],
    metricHeaders: [],
    rows: [],
  };
  const { dimensionHeaders, metricHeaders, rows } = data ?? fallbackReport;

  // リアルタイム アクティブユーザー
  const activeUsersRealtime = realtime.rows?.[0]?.metricValues?.[0]?.value;

  return (
    <div className="p-6 overflow-auto">
      <h1 className="text-2xl font-semibold mb-4">Analytics Dashboard</h1>
      <p className="text-lg mb-4">
        リアルタイム アクティブユーザー: {activeUsersRealtime ?? '—'}
      </p>
      {rows.length === 0 ? (
        <p className="text-center text-gray-500">
          日次データがまだ利用できません。リアルタイム アクティブユーザー:{' '}
          {activeUsersRealtime ?? '—'}
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
