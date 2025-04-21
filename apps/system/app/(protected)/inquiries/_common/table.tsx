import { MoreHorizontal } from 'lucide-react';
import { Button } from '@kit/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@kit/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@kit/ui/table';
import { Badge } from '@kit/ui/badge';
import type { Inquiry } from '../../../../types/inquiries';
import { getStatusColor, getTypeColor, getPriorityColor } from '../_data/utils';
import Link from 'next/link';

interface InquiryTableProps {
  inquiries: Inquiry[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onSort: (column: keyof Inquiry) => void;
  sortColumn?: keyof Inquiry;
  sortDirection?: 'asc' | 'desc';
}

export function InquiryTable({
  inquiries,
  currentPage,
  itemsPerPage,
  onPageChange,
  onSort,
  sortColumn,
  sortDirection,
}: InquiryTableProps) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedInquiries = inquiries.slice(startIndex, endIndex);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderSortIcon = (column: keyof Inquiry) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="w-[100px] cursor-pointer"
              onClick={() => onSort('id')}
            >
              ID {renderSortIcon('id')}
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => onSort('subject')}
            >
              タイトル {renderSortIcon('subject')}
            </TableHead>
            <TableHead
              className="w-[100px] cursor-pointer"
              onClick={() => onSort('status')}
            >
              ステータス {renderSortIcon('status')}
            </TableHead>
            <TableHead
              className="w-[100px] cursor-pointer"
              onClick={() => onSort('type')}
            >
              種別 {renderSortIcon('type')}
            </TableHead>
            <TableHead
              className="w-[100px] cursor-pointer"
              onClick={() => onSort('priority')}
            >
              優先度 {renderSortIcon('priority')}
            </TableHead>
            <TableHead
              className="w-[180px] cursor-pointer"
              onClick={() => onSort('created_at')}
            >
              受付日時 {renderSortIcon('created_at')}
            </TableHead>
            <TableHead
              className="w-[180px] cursor-pointer"
              onClick={() => onSort('updated_at')}
            >
              更新日時 {renderSortIcon('updated_at')}
            </TableHead>
            <TableHead className="w-[100px]">アクション</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedInquiries.map((inquiry) => (
            <TableRow key={inquiry.id}>
              <TableCell>{inquiry.id}</TableCell>
              <TableCell>{inquiry.subject}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={getStatusColor(inquiry.status)}
                >
                  {inquiry.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getTypeColor(inquiry.type)}>
                  {inquiry.type}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={getPriorityColor(inquiry.priority)}
                >
                  {inquiry.priority}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(inquiry.created_at)}</TableCell>
              <TableCell>{formatDate(inquiry.updated_at)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">メニューを開く</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>アクション</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link href={`/inquiries/${inquiry.id}`}>詳細を表示</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/inquiries/${inquiry.id}/edit`}>編集</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      削除
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
