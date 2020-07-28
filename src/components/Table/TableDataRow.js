import React, { useState, useEffect, useContext } from "react";
import TableAction from "./TableAction";
import TableAuthApi from "./TableAuthApi";

//rowCount, tableDataCol, tableHeader, tableAction
const TableDataRow = ({
  rowCount,
  tableDataColumn,
  tableHeader,
  tableAction,
  index,
  tableDataRow,
  setTableDataRow,
  currentPage,
  headerCheck,
  setHeaderCheck,
}) => {
  const [check, setCheck] = useState(false);
  
  useEffect(() => {
    setCheck(headerCheck);
  }, [headerCheck]);

  const handleCheck = () => {
    setCheck(!check);
  };

  return (
    <div
      className={`relative p-4 mb-4 border bg-white rounded-lg shadow md:p-0 md:mb-0 md:bg-transparent md:rounded-none md:shadow-none md:border-none md:table-row ${
        rowCount % 2 === 0 ? "md:bg-gray-100" : ""
      }`}
    >
      <div className="hidden lg:table-cell md:px-2 md:py-3 lg:p-3 md:border-t">
        <input type="checkbox" checked={check} onClick={handleCheck} />
      </div>
      <div className="hidden lg:table-cell md:px-2 md:py-3 lg:p-3 md:border-t">
        {rowCount}
      </div>
      {tableDataColumn.map((td, i) => (
        <React.Fragment key={i}>
          {i <= 3 && (
            <div className="block md:table-cell  text-xs mb-1 md:text-sm md:px-2 md:py-3 lg:p-3 md:border-t">
              <span className="font-bold mr-3 text-gray-700 md:hidden">
                {tableHeader[i]}:
              </span>
              {td}
            </div>
          )}
          {i >= 4 && (
            <div
              className={`block md:hidden lg:table-cell text-xs mb-1 md:text-sm md:px-2 md:py-3 lg:p-3 md:border-t ${
                i === 5 && (td === "true" ? "text-green-600" : "text-red-600")
              }`}
            >
              <span className="font-bold mr-3 text-gray-700 md:hidden">
                {tableHeader[i]}:
              </span>
              {i === 4 ? (
                td
              ) : td === "true" ? (
                <span class=" text-green-600 bg-green-200   py-1 px-2 rounded-full text-xs font-bold">
                  Active
                </span>
              ) : (
                <span class=" text-orange-600 bg-orange-200   py-1 px-2 rounded-full text-xs font-bold">
                  Deactive
                </span>
              )}
            </div>
          )}
        </React.Fragment>
      ))}
      {tableAction && (
        <div className="block md:table-cell md:px-2 md:py-3 lg:p-3 text-right md:text-center md:border-t">
          <TableAction
            index={index}
            tableDataColumn={tableDataColumn}
            tableDataRow={tableDataRow}
            setTableDataRow={setTableDataRow}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
};

export default TableDataRow;
