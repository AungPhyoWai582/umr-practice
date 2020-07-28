import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TablePagination = ({
  minRow,
  maxRow,
  rowCount,
  loadFistData,
  loadPrevData,
  loadLastData,
  loadNextData,
  tableFilter,
  isTableFilterOpen,
  toggleTableFilter,
  total,
  currentPage,
  showMinRow,
  showMaxRow
}) => {
  //console.log(Math.floor(total / 10)+1)
  //console.log(currentPage)
  return (
    <div className="flex items-center justify-between md:justify-end">
      <div
        className={`w-6 md:w-8 h-6 md:h-8 flex mx-1 md:mx-2 items-center justify-center hover:bg-gray-200 rounded-lg cursor-pointer
        ${currentPage === 1 || rowCount>maxRow ? "opacity-25" : "opacity-100"}`}
        onClick={loadFistData}
      >
        <span className="border-r-2 border-gray-900 h-3"></span>
        <FontAwesomeIcon icon="chevron-left" />
      </div>
      <div
        className={`w-6 md:w-8 h-6 md:h-8 flex mx-1 md:mx-2 hover:bg-gray-200 rounded-lg cursor-pointer
        ${
          currentPage === 1 || rowCount>maxRow? "opacity-25" : "opacity-100"
        }`}
        onClick={loadPrevData}
      >
        <FontAwesomeIcon className="m-auto" icon="chevron-left" />
      </div>
      <div className="hidden md:block mx-2 text-xs md:text-sm">
        <span className="font-bold text-gray-600">
          {showMinRow + 1}-{showMaxRow < total ? showMaxRow : total} page {" "}
          {currentPage} of {total}
        </span>
      </div>
      {tableFilter && (
        <div
          className={`md:hidden w-12 h-6 rounded-full flex text-white mx-1 ${
            isTableFilterOpen ? "bg-gray-600" : "bg-green-500"
          }`}
          onClick={toggleTableFilter}
        >
          <FontAwesomeIcon
            className="m-auto"
            icon={isTableFilterOpen ? "chevron-down" : "search"}
          />
        </div>
      )}
      <div
        className={`w-6 md:w-8 h-6 md:h-8 flex mx-1 md:mx-2 hover:bg-gray-200 rounded-lg cursor-pointer
        ${
          currentPage === Math.ceil(total/10) || rowCount<maxRow ? "opacity-25" : "opacity-100"
        }`}
        onClick={loadNextData}
      >
        <FontAwesomeIcon className="m-auto" icon="chevron-right" />
      </div>
      <div
        className={`w-6 md:w-8 h-6 md:h-8 flex mx-1 md:mx-2 items-center justify-center hover:bg-gray-200 rounded-lg cursor-pointer
        ${
          currentPage === Math.ceil(total/10) || rowCount<maxRow ? "opacity-25" : "opacity-100"
        }`}
        onClick={loadLastData}
      >
        <FontAwesomeIcon icon="chevron-right" />
        <span className="border-r-2 border-gray-900 h-3"></span>
      </div>
    </div>
  );
};

export default TablePagination;
