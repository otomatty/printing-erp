'use client';

import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@kit/ui/input';
import { Button } from '@kit/ui/button';
import { Label } from '@kit/ui/label';
import { Badge } from '@kit/ui/badge';
import { Card, CardContent } from '@kit/ui/card';
import { getStatusDetails, getTypeDetails, getPriorityDetails } from '../_data';

// フィルタリングオプションの型定義
type FilterOptions = {
  status: string[];
  type: string[];
  priority: string[];
  search: string;
};

type InquiryFilterProps = {
  onFilterChange: (filters: FilterOptions) => void;
};

export function InquiryFilter({ onFilterChange }: InquiryFilterProps) {
  // 検索キーワード
  const [search, setSearch] = useState('');
  // 選択されているフィルター
  const [selectedFilters, setSelectedFilters] = useState<FilterOptions>({
    status: [],
    type: [],
    priority: [],
    search: '',
  });
  // フィルターの表示/非表示
  const [showFilters, setShowFilters] = useState(false);

  // フィルター適用
  const applyFilters = () => {
    const newFilters = {
      ...selectedFilters,
      search: search,
    };
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  // フィルターリセット
  const resetFilters = () => {
    setSearch('');
    setSelectedFilters({
      status: [],
      type: [],
      priority: [],
      search: '',
    });
    onFilterChange({
      status: [],
      type: [],
      priority: [],
      search: '',
    });
  };

  // ステータスフィルター追加/削除
  const toggleStatus = (status: string) => {
    setSelectedFilters((prev) => {
      const newStatus = prev.status.includes(status)
        ? prev.status.filter((s) => s !== status)
        : [...prev.status, status];
      return { ...prev, status: newStatus };
    });
  };

  // タイプフィルター追加/削除
  const toggleType = (type: string) => {
    setSelectedFilters((prev) => {
      const newType = prev.type.includes(type)
        ? prev.type.filter((t) => t !== type)
        : [...prev.type, type];
      return { ...prev, type: newType };
    });
  };

  // 優先度フィルター追加/削除
  const togglePriority = (priority: string) => {
    setSelectedFilters((prev) => {
      const newPriority = prev.priority.includes(priority)
        ? prev.priority.filter((p) => p !== priority)
        : [...prev.priority, priority];
      return { ...prev, priority: newPriority };
    });
  };

  // フィルターバッジを削除
  const removeFilter = (
    type: 'status' | 'type' | 'priority',
    value: string
  ) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      newFilters[type] = prev[type].filter((v) => v !== value);
      return newFilters;
    });
    // フィルター変更を親コンポーネントに通知
    onFilterChange({
      ...selectedFilters,
      [type]: selectedFilters[type].filter((v) => v !== value),
    });
  };

  return (
    <div className="space-y-4">
      {/* 検索バー */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="問い合わせを検索..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                applyFilters();
              }
            }}
          />
        </div>
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="mr-2 h-4 w-4" />
          フィルター
        </Button>
        <Button onClick={applyFilters}>検索</Button>
      </div>

      {/* 適用中のフィルター */}
      {(selectedFilters.status.length > 0 ||
        selectedFilters.type.length > 0 ||
        selectedFilters.priority.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {selectedFilters.status.map((status) => {
            const details = getStatusDetails(status);
            return (
              <Badge
                key={`status-${status}`}
                variant="outline"
                className={details.color}
              >
                {details.label}
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => removeFilter('status', status)}
                />
              </Badge>
            );
          })}
          {selectedFilters.type.map((type) => {
            const details = getTypeDetails(type);
            return (
              <Badge key={`type-${type}`} variant="outline">
                {details.label}
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => removeFilter('type', type)}
                />
              </Badge>
            );
          })}
          {selectedFilters.priority.map((priority) => {
            const details = getPriorityDetails(priority);
            return (
              <Badge
                key={`priority-${priority}`}
                variant="outline"
                className={details.color}
              >
                {details.label}
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => removeFilter('priority', priority)}
                />
              </Badge>
            );
          })}
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs"
            onClick={resetFilters}
          >
            リセット
          </Button>
        </div>
      )}

      {/* 詳細フィルター */}
      {showFilters && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* ステータスフィルター */}
              <div>
                <Label className="text-sm font-medium block mb-2">
                  ステータス
                </Label>
                <div className="flex flex-wrap gap-2">
                  {['new', 'in_progress', 'waiting', 'resolved', 'closed'].map(
                    (status) => {
                      const details = getStatusDetails(status);
                      const isSelected =
                        selectedFilters.status.includes(status);
                      return (
                        <Badge
                          key={status}
                          variant={isSelected ? 'default' : 'outline'}
                          className={
                            isSelected
                              ? ''
                              : `${details.color} hover:${details.color}`
                          }
                          onClick={() => toggleStatus(status)}
                        >
                          {details.label}
                        </Badge>
                      );
                    }
                  )}
                </div>
              </div>

              {/* タイプフィルター */}
              <div>
                <Label className="text-sm font-medium block mb-2">
                  問い合わせ種類
                </Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'quote_request',
                    'product_inquiry',
                    'order_status',
                    'complaint',
                    'support',
                    'other',
                  ].map((type) => {
                    const details = getTypeDetails(type);
                    const isSelected = selectedFilters.type.includes(type);
                    return (
                      <Badge
                        key={type}
                        variant={isSelected ? 'default' : 'outline'}
                        onClick={() => toggleType(type)}
                      >
                        {details.label}
                      </Badge>
                    );
                  })}
                </div>
              </div>

              {/* 優先度フィルター */}
              <div>
                <Label className="text-sm font-medium block mb-2">優先度</Label>
                <div className="flex flex-wrap gap-2">
                  {['low', 'medium', 'high', 'urgent'].map((priority) => {
                    const details = getPriorityDetails(priority);
                    const isSelected =
                      selectedFilters.priority.includes(priority);
                    return (
                      <Badge
                        key={priority}
                        variant={isSelected ? 'default' : 'outline'}
                        className={
                          isSelected
                            ? ''
                            : `${details.color} hover:${details.color}`
                        }
                        onClick={() => togglePriority(priority)}
                      >
                        {details.label}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4 gap-2">
              <Button variant="outline" onClick={resetFilters}>
                リセット
              </Button>
              <Button onClick={applyFilters}>フィルター適用</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
