import { Button } from '@kit/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // ページ番号の配列を生成
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // 表示するページ番号の最大数

    if (totalPages <= maxVisiblePages) {
      // 全ページ数が表示最大数以下の場合は全て表示
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 現在のページの前後2ページずつを表示
      let start = Math.max(currentPage - 2, 1);
      const end = Math.min(start + maxVisiblePages - 1, totalPages);

      // 末尾に近い場合は、開始位置を調整
      if (end === totalPages) {
        start = Math.max(end - maxVisiblePages + 1, 1);
      }

      // 先頭のページ
      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push(-1); // 省略記号
      }

      // ページ番号
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // 末尾のページ
      if (end < totalPages) {
        if (end < totalPages - 1) pages.push(-1); // 省略記号
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers(); // Get the array once

  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="text-sm text-muted-foreground">
        {totalItems > 0
          ? `${startItem}～${endItem}件を表示 / 全${totalItems}件`
          : '該当する問い合わせはありません'}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {pageNumbers.map((pageNum, index) => {
          if (pageNum === -1) {
            // Generate a more stable key for ellipsis
            const key = `ellipsis-${index === 1 ? 'start' : 'end'}`;
            return (
              <span key={key} className="px-2">
                ...
              </span>
            );
          }
          return (
            <Button
              key={pageNum} // Use pageNum as key
              variant={currentPage === pageNum ? 'default' : 'outline'}
              size="icon"
              onClick={() => onPageChange(pageNum)}
              className="w-8"
            >
              {pageNum}
            </Button>
          );
        })}
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0} // Added check for totalPages === 0
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
