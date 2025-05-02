import React from "react";

interface PaginationDesignProps {
  currentPage?: number;
  totalPages?: number;
  itemsPerPage?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
}

const PaginationDesign: React.FC<PaginationDesignProps> = ({
  currentPage = 1,
  totalPages = 2,
  itemsPerPage = 10,
  totalItems = 20,
  onPageChange, //
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-wrap justify-between items-center w-full py-4 bg-[#fcfcfc] mt-6 p-6 rounded-xl cursor-pointer">
      <div className="text-sm text-gray-500 mb-2 sm:mb-0">
        Showing {startItem} to {endItem} of {totalItems} results
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange?.(page)}
            className={`w-8 h-8 flex items-center justify-center text-sm rounded-md ${
              page === currentPage
                ? "bg-[#3B82F6] text-white"
                : "border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationDesign;
