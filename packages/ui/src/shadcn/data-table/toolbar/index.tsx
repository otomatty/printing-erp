'use client';

import { X, Filter } from 'lucide-react';
import { Button } from '../../button';
import { Input } from '../../input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
} from '../../dropdown-menu';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../../select';
import { DataTableViewOptions } from '../view-options';
import type { Table } from '@tanstack/react-table';
export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterableColumns?: {
    id: string;
    title: string;
    options: {
      label: string;
      value: string;
    }[];
  }[];
  searchableColumns?: {
    id: string;
    title: string;
  }[];
  create?: {
    content: React.ReactNode;
  };
}
/**
 * データテーブルのツールバーコンポーネント
 *
 * @description
 * このコンポーネントは以下の機能を提供します：
 * - 検索フィールド（設定されている場合）
 * - フィルターのリセット
 * - カラム表示オプション
 * - 新規作成ボタンとダイアログ（設定されている場合）
 *
 * @example
 * ```tsx
 * <DataTableToolbar
 *   table={table}
 *   searchableColumns={[
 *     {
 *       id: "name",
 *       title: "名前"
 *     }
 *   ]}
 *   createButton={{
 *     label: "新規作成",
 *     dialog: {
 *       title: "新規作成",
 *       content: <CreateForm />
 *     }
 *   }}
 * />
 * ```
 */
export function DataTableToolbar<TData>({
  table,
  filterableColumns = [],
  searchableColumns = [],
  create,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {filterableColumns.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <Filter className="mr-2 h-4 w-4" />
                フィルター
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 p-4 space-y-4">
              {filterableColumns.map(({ id, title, options }) =>
                table.getColumn(id) ? (
                  <div key={id} className="flex flex-col space-y-1">
                    <DropdownMenuLabel>{title}</DropdownMenuLabel>
                    <Select
                      value={
                        (table.getColumn(id)?.getFilterValue() as string) ??
                        '__all__'
                      }
                      onValueChange={(value) =>
                        table
                          .getColumn(id)
                          ?.setFilterValue(
                            value === '__all__' ? undefined : value
                          )
                      }
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder={title} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__all__">全て{title}</SelectItem>
                        {options.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : null
              )}
              {isFiltered && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => table.resetColumnFilters()}
                  className="w-full justify-start mt-2"
                >
                  <X className="mr-2 h-4 w-4" />
                  フィルターをリセット
                </Button>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {searchableColumns.length > 0 &&
          searchableColumns.map(
            (column) =>
              table.getColumn(column.id) && (
                <Input
                  key={column.id}
                  placeholder={`${column.title}で検索...`}
                  value={
                    (table.getColumn(column.id)?.getFilterValue() as string) ??
                    ''
                  }
                  onChange={(event) =>
                    table
                      .getColumn(column.id)
                      ?.setFilterValue(event.target.value)
                  }
                  className="h-8 w-[150px] lg:w-[250px]"
                />
              )
          )}
      </div>
      <div className="flex items-center space-x-2">
        {create?.content}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
