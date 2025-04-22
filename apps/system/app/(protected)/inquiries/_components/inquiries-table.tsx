'use client';

import * as React from 'react';
import Link from 'next/link';
import { Eye, Mail, Phone } from 'lucide-react';
import { DataTable } from '@kit/ui/data-table';
import type { ColumnDef } from '@tanstack/react-table';
import { getTypeDetails } from '../_data';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@kit/ui/select';
import {
  updateInquiry,
  deleteInquiry,
  fetchInquiryAssignees,
  addInquiryAssignee,
  removeInquiryAssignee,
} from '~/actions/inquiries';
import { toast } from 'sonner';
import { DataTableRowActions } from '@kit/ui/data-table';
import { Checkbox } from '@kit/ui/checkbox';
import { Avatar, AvatarFallback } from '@kit/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@kit/ui/dropdown-menu';
import { useState, useEffect } from 'react';
import type { Inquiry } from '~/types/inquiries';
import type { Database } from '@kit/supabase/database';

interface InquiryStatus {
  label: string;
  color: string;
}

interface InquiryPriority {
  label: string;
  color: string;
}

// 型定義：管理者ユーザー
type AdminUser = Database['system']['Tables']['admin_users']['Row'];

interface InquiriesTableProps {
  inquiries: Inquiry[];
  getStatusDetails: (status: string) => InquiryStatus;
  getPriorityDetails: (priority: string) => InquiryPriority;
  adminUsers: AdminUser[];
}

export function InquiriesTable({
  inquiries,
  getStatusDetails,
  getPriorityDetails,
  adminUsers,
}: InquiriesTableProps) {
  // ローカルステートにコピーして更新を反映
  const [tableData, setTableData] = React.useState(inquiries);
  React.useEffect(() => {
    setTableData(inquiries);
  }, [inquiries]);

  const columns = React.useMemo<ColumnDef<Inquiry>[]>(
    () => [
      {
        accessorKey: 'id',
        header: '問い合わせ番号',
        cell: ({ getValue }) => {
          const id = getValue<string>();
          return (
            <Link
              href={`/inquiries/${id}`}
              className="text-gray-900 hover:text-primary"
              title={id}
            >
              {`${id.slice(0, 8)}...`}
            </Link>
          );
        },
      },
      {
        accessorKey: 'source',
        header: '受付チャネル',
        cell: ({ getValue }) => getValue<string>(),
      },
      {
        accessorKey: 'type',
        header: '問い合わせ種別',
        cell: ({ getValue }) => {
          const { label } = getTypeDetails(getValue<string>());
          return label;
        },
      },
      {
        accessorKey: 'company_name',
        header: '会社名',
        cell: ({ getValue }) => getValue<string>() || '-',
      },
      {
        accessorKey: 'customer_name',
        header: 'お名前',
        cell: ({ getValue }) => getValue<string>(),
      },
      {
        id: 'contact',
        header: '連絡先',
        cell: ({ row }) => {
          const { customer_email, customer_phone } = row.original;
          return (
            <div className="flex flex-col">
              <span className="flex items-center">
                <Mail size={14} className="mr-1 text-gray-400" />
                {customer_email}
              </span>
              {customer_phone && (
                <span className="flex items-center mt-1">
                  <Phone size={14} className="mr-1 text-gray-400" />
                  {customer_phone}
                </span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: 'status',
        header: 'ステータス',
        cell: ({ row }) => {
          const current = row.original.status;
          // ステータスに応じたカラーとラベル
          const { label: statusLabel, color: statusColor } =
            getStatusDetails(current);
          return (
            <Select
              value={current}
              onValueChange={async (val) => {
                const prevVal = current;
                // string を InquiryStatus にキャスト
                const newStatus = val as typeof current;
                // optimistic update
                setTableData((prev) =>
                  prev.map((item) =>
                    item.id === row.original.id
                      ? { ...item, status: newStatus }
                      : item
                  )
                );
                try {
                  await updateInquiry(row.original.id, { status: newStatus });
                  toast.success('ステータスを更新しました');
                } catch (error) {
                  console.error('[Debug] update status error:', error);
                  // revert on error
                  setTableData((prev) =>
                    prev.map((item) =>
                      item.id === row.original.id
                        ? { ...item, status: prevVal }
                        : item
                    )
                  );
                  toast.error(
                    `ステータスの更新に失敗: ${
                      error instanceof Error ? error.message : String(error)
                    }`
                  );
                }
              }}
            >
              <SelectTrigger className={`h-8 w-32 text-sm ${statusColor}`}>
                <SelectValue>{statusLabel}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {['new', 'in_progress', 'waiting', 'resolved', 'closed'].map(
                  (v) => {
                    const { label: itemLabel, color: itemColor } =
                      getStatusDetails(v);
                    return (
                      <SelectItem key={v} value={v} className={itemColor}>
                        {itemLabel}
                      </SelectItem>
                    );
                  }
                )}
              </SelectContent>
            </Select>
          );
        },
      },
      {
        accessorKey: 'priority',
        header: '優先度',
        cell: ({ row }) => {
          const current = row.original.priority;
          // 優先度に応じたカラーとラベル
          const { label: priorityLabel, color: priorityColor } =
            getPriorityDetails(current);
          return (
            <Select
              value={current}
              onValueChange={async (val) => {
                const prevVal = current;
                // string を PriorityLevel にキャスト
                const newPriority = val as typeof current;
                setTableData((prev) =>
                  prev.map((item) =>
                    item.id === row.original.id
                      ? { ...item, priority: newPriority }
                      : item
                  )
                );
                try {
                  await updateInquiry(row.original.id, {
                    priority: newPriority,
                  });
                  toast.success('優先度を更新しました');
                } catch (error) {
                  console.error('[Debug] update priority error:', error);
                  // revert on error
                  setTableData((prev) =>
                    prev.map((item) =>
                      item.id === row.original.id
                        ? { ...item, priority: prevVal }
                        : item
                    )
                  );
                  toast.error(
                    `優先度の更新に失敗: ${
                      error instanceof Error ? error.message : String(error)
                    }`
                  );
                }
              }}
            >
              <SelectTrigger className={`h-8 w-24 text-sm ${priorityColor}`}>
                <SelectValue>{priorityLabel}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {['low', 'medium', 'high', 'urgent'].map((v) => {
                  const { label: itemLabel, color: itemColor } =
                    getPriorityDetails(v);
                  return (
                    <SelectItem key={v} value={v} className={itemColor}>
                      {itemLabel}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          );
        },
      },
      {
        accessorKey: 'created_at',
        header: '日付',
        cell: ({ getValue }) =>
          new Date(getValue<string>()).toLocaleDateString('ja-JP'),
      },
      {
        id: 'assigned_to',
        header: '担当者',
        cell: ({ row }) => (
          <AssignmentCell
            inquiry={row.original}
            setTableData={setTableData}
            adminUsers={adminUsers}
          />
        ),
      },
      {
        id: 'actions',
        header: 'アクション',
        cell: ({ row }) => (
          <DataTableRowActions
            row={row.original}
            onDelete={async (rowData) => {
              // サーバーアクションがエラーをスローするので成功時のみテーブル更新
              await deleteInquiry(rowData.id);
              setTableData((prev) =>
                prev.filter((item) => item.id !== rowData.id)
              );
            }}
          />
        ),
      },
    ],
    [getStatusDetails, getPriorityDetails, adminUsers]
  );

  // Define searchable columns for DataTable toolbar
  const searchableColumns = React.useMemo(
    () => [
      { id: 'customer_name', title: 'お名前' },
      { id: 'company_name', title: '会社名' },
      { id: 'contact', title: '連絡先' },
    ],
    []
  );

  // Define filterable columns for DataTable toolbar
  const filterableColumns = React.useMemo(
    () => [
      {
        id: 'status',
        title: 'ステータス',
        options: [
          { label: '新規', value: 'new' },
          { label: '対応中', value: 'in_progress' },
          { label: '回答待ち', value: 'waiting' },
          { label: '解決済', value: 'resolved' },
          { label: '完了', value: 'closed' },
        ],
      },
      {
        id: 'type',
        title: '問い合わせ種別',
        options: [
          { label: '見積依頼', value: 'quote_request' },
          { label: '製品相談', value: 'product_inquiry' },
          { label: '注文状況', value: 'order_status' },
          { label: '苦情・クレーム', value: 'complaint' },
          { label: 'サポート', value: 'support' },
          { label: 'その他', value: 'other' },
        ],
      },
      {
        id: 'priority',
        title: '優先度',
        options: [
          { label: '低', value: 'low' },
          { label: '中', value: 'medium' },
          { label: '高', value: 'high' },
          { label: '緊急', value: 'urgent' },
        ],
      },
    ],
    []
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <DataTable
        columns={columns}
        data={tableData}
        searchableColumns={searchableColumns}
        filterableColumns={filterableColumns}
        editRow={async (row) => {
          /* インライン更新は不要、個別セルで onStatusChange/onPriorityChange を使用 */
        }}
      />
    </div>
  );
}

// 担当者選択用セルコンポーネント
function AssignmentCell({
  inquiry,
  setTableData,
  adminUsers,
}: {
  inquiry: Inquiry;
  setTableData: React.Dispatch<React.SetStateAction<Inquiry[]>>;
  adminUsers: AdminUser[];
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const [assignedIds, setAssignedIds] = useState<string[]>([]);
  useEffect(() => {
    if (openMenu) {
      // no fetching here, adminUsers comes from props
    }
  }, [openMenu]);
  useEffect(() => {
    if (openMenu) {
      fetchInquiryAssignees(inquiry.id)
        .then((ids) => {
          setAssignedIds(ids ?? []);
        })
        .catch(() => {
          setAssignedIds([]);
        });
    }
  }, [openMenu, inquiry.id]);
  return (
    <DropdownMenu open={openMenu} onOpenChange={setOpenMenu}>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center space-x-1 cursor-pointer">
          {assignedIds.length > 0 ? (
            assignedIds.map((id) => {
              const user = adminUsers.find((u) => u.id === id);
              const displayName =
                `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim() ||
                user?.email ||
                '?';
              return (
                <Avatar key={id} className="h-6 w-6">
                  <AvatarFallback>{displayName.charAt(0)}</AvatarFallback>
                </Avatar>
              );
            })
          ) : (
            <span className="text-gray-500">未設定</span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60 p-2">
        {adminUsers.map((user: AdminUser) => {
          const checked = assignedIds.includes(user.id);
          const displayName =
            `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim() ||
            user.email ||
            '?';
          return (
            <div key={user.id} className="flex items-center px-2 py-1">
              <Checkbox
                checked={checked}
                onCheckedChange={async (isChecked) => {
                  try {
                    if (isChecked) {
                      await addInquiryAssignee(inquiry.id, user.id);
                      setAssignedIds((prev) => [...prev, user.id]);
                    } else {
                      await removeInquiryAssignee(inquiry.id, user.id);
                      setAssignedIds((prev) =>
                        prev.filter((id) => id !== user.id)
                      );
                    }
                    setTableData((prev) =>
                      prev.map((item) =>
                        item.id === inquiry.id
                          ? {
                              ...item,
                              assigned_to_name: adminUsers
                                .filter((u) =>
                                  isChecked
                                    ? [...assignedIds, user.id].includes(u.id)
                                    : assignedIds
                                        .filter((id) => id !== user.id)
                                        .includes(u.id)
                                )
                                .map(
                                  (u) =>
                                    `${u.first_name ?? ''} ${u.last_name ?? ''}`
                                )
                                .join(', '),
                            }
                          : item
                      )
                    );
                  } catch (e) {
                    console.error(e);
                    toast.error('担当者の更新に失敗しました');
                  }
                }}
              />
              <Avatar className="ml-2 h-6 w-6">
                <AvatarFallback>{displayName.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="ml-2">{displayName}</span>
            </div>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
