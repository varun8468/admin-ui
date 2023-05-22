import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  goToPage,
  goToFirstPage,
  goToLastPage,
  goToPreviousPage,
  goToNextPage,
}) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center my-4">
      <button
        onClick={goToFirstPage}
        disabled={currentPage === 1}
        className="px-3 py-1 border border-gray-300 rounded-l-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
      >
        First
      </button>
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className="px-3 py-1 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
      >
        Previous
      </button>
      {getPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => goToPage(pageNumber)}
          disabled={currentPage === pageNumber}
          className={`px-3 py-1 border ${
            currentPage === pageNumber
              ? "border-blue-500 bg-blue-500 text-white"
              : "border-gray-300 bg-white text-gray-500"
          } text-sm font-medium hover:bg-gray-50`}
        >
          {pageNumber}
        </button>
      ))}
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
      >
        Next
      </button>
      <button
        onClick={goToLastPage}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border border-gray-300 rounded-r-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;