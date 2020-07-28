import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { axiosConfig } from "../../Axios/Axios";
import TableAuthApi from "./TableAuthApi";

function convertObj(name,email,password,phone,gender,is_active,role_id,department_id,township_id) {
  return {name,email,password,phone,gender,is_active,role_id,department_id,township_id}
}

const TableAction = ({
  tableDataRow,
  setTableDataRow,
  currentPage,
}) => {
  const auth = useContext(TableAuthApi);
  const [updateData, setUpdateData] = useState();
  const [id, setId] = useState();
  const [change, setChange] = useState(false);
  useEffect(() => {
    if(change===true){
      if (currentPage) {
        axiosConfig
          .get(`/users?page=${currentPage}`)
          .then((response) => {
            if (response.data.data) {
              setTableDataRow(response.data.data);
              setChange(false);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      if(!currentPage) {
        axiosConfig
          .get(`/users-search/${auth.select}/${auth.inputSearch}`)
          .then((response) => {
            setTableDataRow(response.data.data);
            setChange(false);
          })
          .catch((error) => console.log(error));
      }
    }
  }, [change===true]);

  const ActiveControl = (e) => {
    e.preventDefault();
    axiosConfig
      .put(`/users/${id}`, updateData)
      .then((response) => {
        if (response.data.data) {
          setChange(true);
          auth.setTableToggle(false);
        }
      })
      .catch((error) => console.log(error));
  };

  const toggleClick = (e, index, toggleIndex, setToggleIndex) => {
    
    e.preventDefault();
    if (toggleIndex === index) {
      auth.setTableToggle(!auth.tableToggle);
    } else {
      auth.setTableToggle(true);
    }
    setToggleIndex(index);
    let userCode = tableDataRow[index].user_code;
    axiosConfig
      .get(`/users-search/user_code/${userCode}`)
      .then((response) => {
        setId(response.data.data.map((d) => d.id));
        response.data.data.map((d) => {
          const updata = convertObj(
            d.name,
            d.email,
            d.password,
            d.phone,
            d.gender,
            d.is_active === "true" ? "false" : "true",
            d.role_id,
            d.department_id,
            d.township_id
          );
          setUpdateData(updata);
        });
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="inline-flex flex-nowrap justify-between items-center">
      <div className="align-middle block md:inline-block p-2 absolute md:static top-0 right-0 mt-4 md:mt-0 mr-4 md:mr-0">
        <div className="relative">
          <div
            className="toggle-table-action"
            onClick={(e) =>
              toggleClick(e, auth.index, auth.toggleIndex, auth.setToggleIndex)
            }
          >
            <FontAwesomeIcon
              className="text-xs text-gray-600 cursor-pointer hover:text-gray-900"
              icon="ellipsis-v"
            />
          </div>
          <div
            className={`bg-white shadow-lg rounded-lg absolute mt-4 top-0 right-0 py-4 text-sm font-bold text-gray-600 z-10 table-action 
            ${
              !(auth.tableToggle && auth.toggleIndex === auth.index) && "hidden"
            }`}
            style={{ width: "250px" }}
          >
            <div className="py-2 pl-4 pr-6 flex items-center cursor-pointer text-sm font-bold hover:bg-green-100 hover:text-green-600">
              <div className="text-center flex-none mr-4 w-6">
                <FontAwesomeIcon className="text-md" icon="pencil-alt" />
              </div>
              <span className="flex-none">Edit</span>
            </div>
            <div
              className="py-2 pl-4 pr-6 flex items-center cursor-pointer text-sm font-bold hover:bg-green-100 hover:text-green-600"
              onClick={(e) => ActiveControl(e)}
            >
              <div className="text-center flex-none mr-4 w-6">
                <FontAwesomeIcon className="text-md" icon="trash" />
              </div>
              <span className="flex-none">
                {tableDataRow[auth.index].is_active === "true"
                  ? "Deactive"
                  : "Active"}
              </span>
            </div>
            <div className="py-2 pl-4 pr-6 flex items-center cursor-pointer text-sm font-bold hover:bg-green-100 hover:text-green-600">
              <div className="text-center flex-none mr-4 w-6">
                <FontAwesomeIcon className="text-md" icon="key" />
              </div>
              <span className="flex-none">Reset</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableAction;
