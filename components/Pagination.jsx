import React from "react";
import { FaAngleLeft, FaAngleRight, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

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
        className={`h-10 w-10 mr-2 rounded-full ${
          currentPage === 1
            ? "border-gray-400 bg-gray-200"
            : "border-blue-500 bg-blue-500"
        } flex items-center justify-center`}
      >
        <FaAngleDoubleLeft className={currentPage === 1 ? "text-gray-500" : "text-white"} />
      </button>
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className={`h-10 w-10 mr-2 rounded-full ${
          currentPage === 1
            ? "border-gray-400 bg-gray-200"
            : "border-blue-500 bg-blue-500"
        } flex items-center justify-center`}
      >
        <FaAngleLeft className={currentPage === 1 ? "text-gray-500" : "text-white"} />
      </button>
      {getPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => goToPage(pageNumber)}
          disabled={currentPage === pageNumber}
          className={`h-10 w-10 mr-2 rounded-full border ${
            currentPage === pageNumber
              ? "border-blue-500 bg-white"
              : "border-blue-500 bg-blue-500 text-white"
          } flex items-center justify-center`}
        >
          {pageNumber}
        </button>
      ))}
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className={`h-10 w-10 mr-2 rounded-full ${
          currentPage === totalPages
            ? "border-gray-400 bg-gray-200"
            : "border-blue-500 bg-blue-500"
        } flex items-center justify-center`}
      >
        <FaAngleRight className={currentPage === totalPages ? "text-gray-500" : "text-white"} />
      </button>
      <button
        onClick={goToLastPage}
        disabled={currentPage === totalPages}
        className={`h-10 w-10 rounded-full ${
          currentPage === totalPages
            ? "border-gray-400 bg-gray-200"
            : "border-blue-500 bg-blue-500"
        } flex items-center justify-center`}
      >
        <FaAngleDoubleRight className={currentPage === totalPages ? "text-gray-500" : "text-white"} />
      </button>
    </div>
  );
};

export default Pagination;
