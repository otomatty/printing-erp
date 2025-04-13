import { Button } from '@kit/ui/button';

type PaginationProps = {
  totalItems: number;
  currentPage?: number;
  itemsPerPage?: number;
};

export function Pagination({
  totalItems,
  currentPage = 1,
  itemsPerPage = 10,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-500">
        全{totalItems}件中 {startItem}-{endItem}件を表示
      </p>
      <div className="flex gap-1">
        <Button variant="outline" size="sm" disabled={currentPage <= 1}>
          前へ
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages}
        >
          次へ
        </Button>
      </div>
    </div>
  );
}
