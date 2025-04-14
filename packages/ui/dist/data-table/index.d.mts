import * as React$1 from 'react';
import { Column, Table, ColumnDef } from '@tanstack/react-table';

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>;
    title: string;
}
declare function DataTableColumnHeader<TData, TValue>({ column, title, className, }: DataTableColumnHeaderProps<TData, TValue>): React$1.JSX.Element;

interface DataTableRowActionsProps<TData> {
    row: TData;
    onEdit?: (row: TData) => Promise<void>;
    onDelete?: (row: TData) => Promise<void>;
    editForm?: React.ReactNode;
    editTitle?: string;
}
/**
 * データテーブルの行アクションコンポーネント
 *
 * @description
 * このコンポーネントは各行に対する操作メニューを提供します：
 * - 編集アクション（設定されている場合）：編集フォームをダイアログで表示
 * - 削除アクション（設定されている場合）：削除確認ダイアログを表示
 *
 * メニューはドロップダウン形式で表示され、モバイル対応のUIを提供します。
 * エラーハンドリングとローディング状態の管理も行います。
 *
 * @example
 * ```tsx
 * <DataTableRowActions
 *   row={row}
 *   onEdit={async (row) => {
 *     // 編集処理
 *   }}
 *   onDelete={async (row) => {
 *     // 削除処理
 *   }}
 *   editForm={<EditForm row={row} onSubmit={handleSubmit} />}
 *   editTitle="アイテムの編集"
 * />
 * ```
 */
declare function DataTableRowActions<TData>({ row, onEdit, onDelete, editForm, editTitle, }: DataTableRowActionsProps<TData>): React$1.JSX.Element;

interface DataTablePaginationProps<TData> {
    table: Table<TData>;
}
/**
 * データテーブルのページネーションコンポーネント
 *
 * @description
 * このコンポーネントは以下の機能を提供します：
 * - ページサイズの変更（10, 20, 30, 40, 50行）
 * - ページ移動（最初、前、次、最後）
 * - 現在のページ位置の表示
 * - 選択行数の表示
 *
 * レスポンシブ対応：
 * - モバイル: 前後のページ移動のみ
 * - デスクトップ: 最初/最後のページへの移動を追加
 *
 * @example
 * ```tsx
 * <DataTablePagination table={table} />
 * ```
 */
declare function DataTablePagination<TData>({ table, }: DataTablePaginationProps<TData>): React$1.JSX.Element;

interface DataTableToolbarProps<TData> {
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
declare function DataTableToolbar<TData>({ table, searchableColumns, create, }: DataTableToolbarProps<TData>): React$1.JSX.Element;

/**
 * データテーブルのプロパティの型定義
 * @template TData テーブルのデータ型
 * @template TValue セルの値の型
 */
interface DataTableProps<TData, TValue> {
    /** テーブルのカラム定義 */
    columns: ColumnDef<TData, TValue>[];
    /** テーブルのデータ配列 */
    data: TData[];
    /** フィルター可能なカラムの設定
     * @example
     * ```tsx
     * filterableColumns={[
     *   {
     *     id: "status",
     *     title: "ステータス",
     *     options: [
     *       { label: "有効", value: "active" },
     *       { label: "無効", value: "inactive" }
     *     ]
     *   }
     * ]}
     * ```
     */
    filterableColumns?: {
        id: string;
        title: string;
        options: {
            label: string;
            value: string;
        }[];
    }[];
    /** 検索可能なカラムの設定
     * @example
     * ```tsx
     * searchableColumns={[
     *   {
     *     id: "name",
     *     title: "名前"
     *   }
     * ]}
     * ```
     */
    searchableColumns?: {
        id: string;
        title: string;
    }[];
    /** 行の削除処理
     * @param row 削除する行のデータ
     */
    deleteRow?: (row: TData) => Promise<void>;
    /** 行の編集処理
     * @param row 編集する行のデータ
     */
    editRow?: (row: TData) => Promise<void>;
    /** 新規作成ボタンの設定
     * @param onClick ボタンがクリックされたときに呼び出される関数
     * @param label ボタンのラベル
     */
    create?: {
        content: React$1.ReactNode;
    };
}
/**
 * 再利用可能なデータテーブルコンポーネント
 *
 * @description
 * このコンポーネントは以下の機能を提供します：
 * - ソート機能
 * - フィルタリング機能
 * - 検索機能
 * - ページネーション
 * - 行の選択
 * - カラムの表示/非表示
 * - 行の編集/削除
 *
 * @example
 * ```tsx
 * import { DataTable } from "@kit/ui/data-table";
 * import { columns } from "./columns";
 *
 * export default function Page() {
 *   const data = [
 *     {
 *       id: 1,
 *       name: "Example",
 *       status: "active"
 *     }
 *   ];
 *
 *   return (
 *     <DataTable
 *       columns={columns}
 *       data={data}
 *       searchableColumns={[
 *         {
 *           id: "name",
 *           title: "名前"
 *         }
 *       ]}
 *       filterableColumns={[
 *         {
 *           id: "status",
 *           title: "ステータス",
 *           options: [
 *             { label: "有効", value: "active" },
 *             { label: "無効", value: "inactive" }
 *           ]
 *         }
 *       ]}
 *       onEdit={async (row) => {
 *         // 編集処理
 *       }}
 *       onDelete={async (row) => {
 *         // 削除処理
 *       }}
 *     />
 *   );
 * }
 * ```
 */
declare function DataTable<TData, TValue>({ columns, data, filterableColumns, searchableColumns, deleteRow, editRow, create, }: DataTableProps<TData, TValue>): React$1.JSX.Element;

export { DataTable, DataTableColumnHeader, DataTablePagination, DataTableRowActions, DataTableToolbar };
