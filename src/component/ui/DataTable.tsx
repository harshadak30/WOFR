import { ChevronLeft, ChevronRight } from "lucide-react";

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  pagination?: {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
  };
  onRowClick?: (row: T) => void;
}

export function DataTable<T>({
  columns,
  data,
  pagination,
  onRowClick,
}: DataTableProps<T>) {
  const totalPages = pagination
    ? Math.ceil(pagination.totalItems / pagination.itemsPerPage)
    : 1;

  const renderCell = (column: Column<T>, row: T) => {
    if (typeof column.accessor === "function") {
      return column.accessor(row);
    }
    return row[column.accessor] as React.ReactNode;
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`table-header px-6 py-3 text-left ${
                    column.className || ""
                  }`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 h-96">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={onRowClick ? "cursor-pointer hover:bg-gray-50" : ""}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`table-cell ${column.className || ""}`}
                  >
                    {renderCell(column, row)}
                  </td>
                ))}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-10 text-center text-sm text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(pagination.currentPage - 1) * pagination.itemsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(
                pagination.currentPage * pagination.itemsPerPage,
                pagination.totalItems
              )}
            </span>{" "}
            of <span className="font-medium">{pagination.totalItems}</span>{" "}
            results
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() =>
                pagination.onPageChange(pagination.currentPage - 1)
              }
              disabled={pagination.currentPage === 1}
              className={`relative inline-flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                pagination.currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              const pageNumber =
                pagination.currentPage <= 3
                  ? i + 1
                  : pagination.currentPage + i - 2;

              if (pageNumber > totalPages || pageNumber < 1) return null;

              return (
                <button
                  key={i}
                  onClick={() => pagination.onPageChange(pageNumber)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    pagination.currentPage === pageNumber
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            <button
              onClick={() =>
                pagination.onPageChange(pagination.currentPage + 1)
              }
              disabled={pagination.currentPage === totalPages}
              className={`relative inline-flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                pagination.currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
