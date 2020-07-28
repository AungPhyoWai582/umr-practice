import React, { useEffect, useState } from "react";
import Topbar from "../../components/Topbar/Topbar";
import Table from "../../components/Table/Table";
import { axiosConfig } from "../../Axios/Axios";
import LoadingModal from "../../modals/LoadingModal";

const tableHeader = [
  "User Code",
  "Name",
  "Phone",
  "Department",
  "Address",
  "Status",
];

function createAction(actionName, actionIcon) {
  return { actionName, actionIcon };
}

const tableAction = [
  createAction("Detail", "eye"),
  createAction("Update", "pencil-alt"),
  createAction("Delete", "trash"),
];

const UserList = ({ toggleSidebar }) => {
  const [tableDataRows, setTableDataRows] = useState([]);
  const [lastPageUrl, setLastPageUrl] = useState();
  const [firstPageUrl, setFirstPageUrl] = useState();
  const [total, setTotal] = useState();
  const [lastpage, setLastpage] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axiosConfig
      .get("/users")
      .then((response) => {
        setTimeout(() => {
          setTableDataRows(response.data.data);
          setFirstPageUrl(response.data.first_page_url);
          setLastPageUrl(response.data.last_page_url);
          setTotal(response.data.total);
          setLastpage(response.data.last_page);
          setLoading(false);
        }, 3000);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <React.Fragment>
      <Topbar toggleSidebar={toggleSidebar} pageTitle="User List" />
      {loading === true ? <LoadingModal /> : null}
      <div className="my-1 px-4 lg:p-4">
        <Table
          tableHeader={tableHeader}
          tableDataRow={tableDataRows}
          setTableDataRow={setTableDataRows}
          tableAction={tableAction}
          rowLimit={10}
          tableFilter={true}
          firstPageUrl={firstPageUrl}
          lastPageUrl={lastPageUrl}
          total={total}
          lastPage={lastpage}
        />
      </div>
    </React.Fragment>
  );
};

export default UserList;
