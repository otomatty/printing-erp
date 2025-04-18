interface PaginationProps {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}

export function Pagination({
  totalItems,
  currentPage,
  itemsPerPage,
}: PaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = endItem >= totalItems;

  return (
    <div className="flex justify-between items-center mt-4 px-4">
      <p className="text-sm text-gray-500">
        全{totalItems}件中 {startItem}-{endItem}件を表示
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          className="px-3 py-1 border rounded-md bg-gray-50 text-gray-400"
          disabled={isPrevDisabled}
        >
          前へ
        </button>
        <button type="button" className="px-3 py-1 border rounded-md bg-white">
          {currentPage}
        </button>
        <button
          type="button"
          className="px-3 py-1 border rounded-md bg-gray-50 text-gray-400"
          disabled={isNextDisabled}
        >
          次へ
        </button>
      </div>
    </div>
  );
}
