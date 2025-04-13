'use client';

import { useState } from 'react';
import { Card, CardContent } from '@kit/ui/card';
import { addDays, subDays } from 'date-fns';
import { ScheduleHeader } from './_components/schedule-header';
import { ProcessFilter } from './_components/process-filter';
import { ScheduleTable } from './_components/schedule-table';
import { useEffect } from 'react';
import type { ProductionJob, Equipment } from '../_data';

// 型定義
interface ProductionFilter {
  status?: string;
  process?: string[];
  equipments?: string[];
  showDelayed?: boolean;
  showAvailableOnly?: boolean;
}

export default function SchedulePage() {
  // 現在の表示日付
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  // データステート
  const [productionJobs, setProductionJobs] = useState<ProductionJob[]>([]);
  const [equipments, setEquipments] = useState<Equipment[]>([]);

  // 前日に移動
  const handlePrevDay = () => {
    setCurrentDate((prev) => subDays(prev, 1));
  };

  // 翌日に移動
  const handleNextDay = () => {
    setCurrentDate((prev) => addDays(prev, 1));
  };

  // 本日に移動
  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // フィルター変更
  const handleFilterChange = (filters: ProductionFilter) => {
    console.log('フィルターが変更されました:', filters);
    // TODO: フィルターに基づいてデータを再取得
  };

  // データの初期ロード
  useEffect(() => {
    // APIからデータを取得する代わりに、モックデータのフェッチを行う
    const fetchData = async () => {
      try {
        // APIモジュールからデータを取得
        const fetchProductionJobsModule = await import('../_data');
        const fetchEquipmentsModule = await import('../_data');

        const jobs = await fetchProductionJobsModule.fetchProductionJobs();
        const equipment = await fetchEquipmentsModule.fetchEquipments();

        setProductionJobs(jobs);
        setEquipments(equipment);
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
      }
    };

    fetchData();
  }, []); // データの初期ロードは1回だけ行う

  // 日付変更時のデータ更新
  useEffect(() => {
    const updateDataForDate = async () => {
      try {
        const fetchProductionJobsByDateModule = await import('../_data');
        const jobs =
          await fetchProductionJobsByDateModule.fetchProductionJobsByDate(
            currentDate
          );
        setProductionJobs(jobs);
      } catch (error) {
        console.error('日付に基づくデータの取得に失敗しました:', error);
      }
    };

    updateDataForDate();
  }, [currentDate]); // 日付が変わったら再取得

  return (
    <div className="p-6 space-y-4">
      {/* ヘッダー */}
      <ScheduleHeader
        currentDate={currentDate}
        onPrevDay={handlePrevDay}
        onNextDay={handleNextDay}
        onToday={handleToday}
      />

      {/* フィルター */}
      <ProcessFilter onFilterChange={handleFilterChange} />

      {/* スケジュールテーブル */}
      <Card>
        <CardContent className="p-0">
          {productionJobs.length > 0 && equipments.length > 0 ? (
            <ScheduleTable
              date={currentDate}
              productionJobs={productionJobs}
              equipments={equipments}
            />
          ) : (
            <div className="p-8 text-center">
              <p>データを読み込み中...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
