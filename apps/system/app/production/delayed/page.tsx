'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@kit/ui/card';
import type { ProductionJob } from '../_data';
import { DelayedJobsHeader } from './_components/DelayedJobsHeader';
import { DelayedJobsFilter } from './_components/DelayedJobsFilter';
import { DelayedJobsTable } from './_components/DelayedJobsTable';

export default function DelayedJobsPage() {
  // 遅延ジョブのステート
  const [delayedJobs, setDelayedJobs] = useState<ProductionJob[]>([]);
  // 検索フィルター
  const [searchFilter, setSearchFilter] = useState('');
  // 選択されたジョブ
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);

  // 遅延ジョブのフェッチ
  useEffect(() => {
    const fetchDelayedJobs = async () => {
      try {
        const fetchModule = await import('../_data');
        const result = await fetchModule.filterProductionJobs({
          isDelayed: true,
        });
        setDelayedJobs(result);
      } catch (error) {
        console.error('遅延ジョブの取得に失敗しました:', error);
      }
    };

    fetchDelayedJobs();
  }, []);

  // 検索フィルターの適用
  const filteredJobs = delayedJobs.filter((job) => {
    if (!searchFilter) return true;
    const searchLower = searchFilter.toLowerCase();
    return (
      job.title.toLowerCase().includes(searchLower) ||
      job.orderId.toLowerCase().includes(searchLower) ||
      job.customerName.toLowerCase().includes(searchLower)
    );
  });

  // ジョブの選択を切り替え
  const toggleJobSelection = (jobId: string) => {
    setSelectedJobs((prev) => {
      if (prev.includes(jobId)) {
        return prev.filter((id) => id !== jobId);
      }
      return [...prev, jobId];
    });
  };

  // 緊急対応ボタンのハンドラー
  const handleUrgentAction = () => {
    if (selectedJobs.length === 0) {
      alert('緊急対応するジョブを選択してください');
      return;
    }
    console.log('緊急対応するジョブ:', selectedJobs);
    // TODO: 緊急対応APIの呼び出し
  };

  return (
    <div className="p-6 space-y-4">
      {/* ヘッダー */}
      <DelayedJobsHeader
        count={delayedJobs.length}
        selectedCount={selectedJobs.length}
        onUrgentAction={handleUrgentAction}
      />

      {/* フィルター */}
      <DelayedJobsFilter
        searchValue={searchFilter}
        onSearchChange={setSearchFilter}
      />

      {/* 遅延ジョブテーブル */}
      <Card>
        <CardContent className="p-0">
          {delayedJobs.length > 0 ? (
            <DelayedJobsTable
              jobs={filteredJobs}
              selectedJobs={selectedJobs}
              onToggleSelection={toggleJobSelection}
            />
          ) : (
            <div className="p-8 text-center">
              <p>遅延中のジョブはありません</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
