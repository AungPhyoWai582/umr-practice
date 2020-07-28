import React, { useState, useEffect } from "react";
import TableFilter from "./TableFilter";
import TableHeader from "./TableHeader";
import TableDataRow from "./TableDataRow";
import { axiosConfig } from "../../Axios/Axios";
import TablePagination from "./TablePagination";
import TableAuthApi from "./TableAuthApi";

const style = {
  backdropBlur: {
    backdropFilter: "blur(3px)",
    WebkitBackdropFilter: "blur(3px)",
    background: "rgba(255, 255, 255, 0.95)",
  },
};

const Table = ({
  rowLimit,
  tableDataRow,
  setTableDataRow,
  tableFilter,
  tableHeader,
  tableAction,
  firstPageUrl,
  lastPageUrl,
  total,
  lastPage,
}) => {
  const [currentMinRow, setCurrentMinRow] = useState(0);
  const [currentMaxRow, setCurrentMaxRow] = useState(rowLimit);
  const [isTableFilterOpen, setIsTableFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPaginate, setShowPaginate] = useState(true);
  const [inputSearch, setInputSearch] = useState();
  const [select, setSelect] = useState();
  const [toggleIndex,setToggleIndex] = useState();
  const [tableToggle,setTableToggle] = useState(false);
  const [headerCheck,setHeaderCheck] = useState(false);

  const toggleTableFilter = () => {
    setIsTableFilterOpen(!isTableFilterOpen);
  };

  const loadNextData = (e) => {
    e.preventDefault();
    if (currentMaxRow < tableDataRow.length) {
      setCurrentMinRow(currentMaxRow);
      setCurrentMaxRow(currentMaxRow + rowLimit);
    }
    if (currentPage < lastPage) {
      axiosConfig
        .get(`https://api.picoehr.com/api/v1/users?page=${currentPage + 1}`)
        .then((response) => {
          setTableDataRow(response.data.data);
          setCurrentPage(response.data.current_page);
          setTableToggle(false);
          setHeaderCheck(false);
        })
        .catch((error) => console.log(error));
    }
  };
  const loadPrevData = (e) => {
    e.preventDefault();
    if (currentMinRow > 0) {
      setCurrentMinRow(currentMinRow - rowLimit);
      setCurrentMaxRow(currentMinRow);
    }
    if (currentPage > 0) {
      axiosConfig
        .get(`https://api.picoehr.com/api/v1/users?page=${currentPage - 1}`)
        .then((response) => {
          setTableDataRow(response.data.data);
          setCurrentPage(response.data.current_page);
          setTableToggle(false);
          setHeaderCheck(false);
        })
        .catch((error) => console.log(error));
    }
  };
  const loadFistData = (e) => {
    e.preventDefault();
    if (currentMinRow > 0) {
      setCurrentMinRow(0);
      setCurrentMaxRow(rowLimit);
    }
    axiosConfig
      .get(firstPageUrl)
      .then((response) => {
        setTableDataRow(response.data.data);
        setCurrentPage(response.data.current_page);
        setTableToggle(false);
        setHeaderCheck(false);
      })
      .catch((error) => console.log(error));
  };
  const loadLastData = (e) => {
    e.preventDefault();
    if (currentMaxRow < tableDataRow.length) {
      setCurrentMinRow(tableDataRow.length - (tableDataRow.length % rowLimit));
      setCurrentMaxRow(tableDataRow.length);
    }
    axiosConfig
      .get(lastPageUrl)
      .then((response) => {
        setTableDataRow(response.data.data);
        setCurrentPage(response.data.current_page);
        setTableToggle(false);
        setHeaderCheck(false);
      })
      .catch((error) => console.log(error));
  };

  const filteredData = (e, name, value) => {
    e.preventDefault();
    if (value) {
      axiosConfig
        .get(`/users-search/${name}/${value}`)
        .then((response) => {
          setTableDataRow(response.data.data);
          setShowPaginate(false);
          setCurrentPage(response.data.current_page);
          setTableToggle(false);
          setHeaderCheck(false);
        })
        .catch((error) => console.log(error));
    } else{
      axiosConfig
        .get(`/users`)
        .then((response) => {
          setTableDataRow(response.data.data);
          setShowPaginate(true);
          setCurrentPage(response.data.current_page);
          setTableToggle(false);
          setHeaderCheck(false);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="overflow-auto pb-10 text-sm md:border md:bg-white md:rounded-lg md:shadow-md md:overflow-visible md:pb-0">
      <div
        style={style.backdropBlur}
        className="fixed bottom-0 left-0 p-4 w-full border-t text-center lg:flex md:items-center md:p-1 md:justify-between md:static md:w-auto md:border-none z-20"
      >
        {tableFilter && (
          <div
            className={`-mt-2 mb-3 md:mb-0 md:mt-0 ${
              isTableFilterOpen ? null : "hidden md:block"
            }`}
          >
            <TableFilter
              filteredData={filteredData}
              select={select}
              setSelect={setSelect}
              inputSearch={inputSearch}
              setInputSearch={setInputSearch}
            />
          </div>
        )}
        {showPaginate && (
          <TablePagination
            tableFilter={tableFilter}
            toggleTableFilter={toggleTableFilter}
            isTableFilterOpen={isTableFilterOpen}
            loadNextData={loadNextData}
            loadPrevData={loadPrevData}
            loadFistData={loadFistData}
            loadLastData={loadLastData}
            rowCount={tableDataRow.length}
            minRow={currentMinRow}
            maxRow={currentMaxRow}
            showMinRow={(currentPage*10)-10}
            showMaxRow={currentPage*10}
            total={total}
            currentPage={currentPage}
          />
        )}
      </div>
      <div className="block md:table w-full">
        <TableHeader tableHeader={tableHeader} tableAction={tableAction} headerCheck={headerCheck} setHeaderCheck={setHeaderCheck} />
        {tableDataRow.map((row, index) => {
          const arr = [
            row.user_code,
            row.name,
            row.phone,
            row.department.name,
            row.township.name,
            row.is_active,
          ];
          return (
            <React.Fragment key={index}>
              {/* <Text row={row} rowCount={index + currentMinRow }  tableHeader={tableHeader}/> */}
              <TableAuthApi.Provider value={{ select, inputSearch,index,toggleIndex,setToggleIndex,tableToggle,setTableToggle}}>
                <TableDataRow
                  rowCount={index + currentMinRow + 1}
                  tableDataColumn={arr}
                  tableHeader={tableHeader}
                  tableAction={tableAction}
                  tableDataRow={tableDataRow}
                  setTableDataRow={setTableDataRow}
                  currentPage={currentPage}
                  filteredData={filteredData}
                  headerCheck={headerCheck}
                  setHeaderCheck={setHeaderCheck}
                />
              </TableAuthApi.Provider>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
export default Table;