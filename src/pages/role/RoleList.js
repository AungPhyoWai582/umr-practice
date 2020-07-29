import React, { useState, useEffect } from "react";
import Topbar from "../../components/Topbar/Topbar";
import Input from "../../components/Form/Input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { axiosConfig } from "../../Axios/Axios";
import RoleSetupModal from "../../modals/RoleSetupModal";

const RoleList = ({ toggleSidebar }) => {
  const [roleData, setRoleData] = useState([]);
  const [toggleIndex, setToggleIndex] = useState();
  const [show, setShow] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [typeSelect, setTypeSelect] = useState();
  const [roleInput, setRoleInput] = useState();
  const [refresh, setRefresh] = useState(false);
  const [search,setSearch] = useState([]);
  const [edit,setEdit] = useState(false);
  const [temIsActive,setTemIsActive] = useState();
  const [temId,setTemId] = useState();

  useEffect(() => {
    axiosConfig
      .get("/roles")
      .then((response) => {
        if (response.data.data) {
          setRoleData(response.data.data);
          setRefresh(false);
          setShow(false);
        }
      })
      .catch((error) => console.log(error));
  }, [refresh === true]);

  const showToggle = (e, index) => {
    e.preventDefault();
    if (toggleIndex === index) {
      setShow(!show);
    } else {
      setShow(true);
    }
    setToggleIndex(index);
  };

  const ActiveControl = (e, id) => {
    e.preventDefault();
    console.log(id);
    let index = id-1;
    //let data = roleData.filter(rd=>rd.id===id);
    let obj = {
      name: roleData[index].name,
      is_active: roleData[index].is_active === "true" ? "false" : "true",
      type_id: roleData[index].type_id,
    };
    setShow(false);
    console.log(obj);
    axiosConfig
      .put(`roles/${id}`, obj)
      .then((response) => {
        if (response.data.data) {
          setRefresh(true);
          setShow(false);
        }
      })
      .catch((error) => console.log(error));
  };

  const Edit = (e,id) => {
    e.preventDefault();
    setTemId(id);
    let type = roleData[id-1].type_id;
    let name = roleData[id-1].name;
    setTemIsActive(roleData[id-1].is_active);
    setTypeSelect(type);
    setRoleInput(name);
    setOpenModal(true);
    setEdit(true);
  }

  const Update =(e)=>{
    e.preventDefault();
    let obj = {
      name: roleInput,
      is_active: temIsActive,
      type_id: typeSelect,
    };
    axiosConfig
      .put(`roles/${temId}`, obj)
      .then((response) => {
        if (response.data.data) {
          setRefresh(true);
          setShow(false);
          setEdit(false);
          setOpenModal(false);
          setTypeSelect(null);
          setRoleInput(null);
        }
      })
      .catch((error) => console.log(error));
  }
  let showOutput = search?roleData.filter(rd=>rd.name.toLowerCase().includes(search)):roleData;
  
  return (
    <React.Fragment>
      <Topbar toggleSidebar={toggleSidebar} pageTitle="Role List" />
      <div className="my-1 px-6 sm:px-8 py-4">
        <div className="bg-white rounded-lg shadow-lg text-sm mb-4 p-2">
          <form action="" className="flex flex-wrap items-center">
            <div className="w-full md:w-auto flex-grow px-1">
              <Input
                className="w-full"
                type="text"
                placeholder="Search Role"
                onChange={(e) =>setSearch(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="flex flex-wrap -mx-2">
          {showOutput.map((sh, index) => (
            <div className="w-full sm:w-1/2 lg:w-1/4 px-2">
              <div className="rounded-lg bg-white shadow-lg text-sm mb-4 p-4 flex items-center justify-between">
                <div className="flex align-middle">
                  {sh.is_active === "true" ? (
                    <div className="w-3 h-3 rounded-full bg-green-500 mt-2"></div>
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-red-500 mt-2"></div>
                  )}
                  <div className="text-lg font-bold ml-2">{sh.name}</div>
                </div>
                <div className="relative">
                  <div
                    className="toggle-table-action"
                    onClick={(e) => showToggle(e, index)}
                  >
                    <FontAwesomeIcon
                      icon="ellipsis-v"
                      className="text-gray-600 cursor-pointer hover:text-gray-900"
                    />
                  </div>
                  <div
                    className={`bg-white shadow-lg rounded-lg absolute mt-4 top-0 right-0 py-4 text-sm font-bold text-gray-600 z-10 table-action ${
                      !(show && toggleIndex === index) && "hidden"
                    }`}
                  >
                    <div className="py-2 pl-4 pr-6 flex items-center cursor-pointer text-sm font-bold hover:bg-green-200 hover:text-green-600">
                      <div className="text-center flex-none mr-4 w-6">
                        <FontAwesomeIcon
                          className="text-md"
                          icon="pencil-alt"
                        />
                      </div>
                      <span className="flex-none" onClick={(e)=>Edit(e,sh.id)}>Update</span>
                    </div>
                    <div
                      className="py-2 pl-4 pr-6 flex items-center cursor-pointer text-sm font-bold hover:bg-red-100 hover:text-red-600"
                      onClick={(e) => ActiveControl(e,sh.id)}
                    >
                    {sh.is_active==="true"?
                    <>
                      <div className="text-center flex-none mr-4 w-6">
                        <FontAwesomeIcon className="text-md" icon="trash-alt" />
                      </div>
                      <span className="flex-none">Deactive</span></>
                      : <>
                      <div className="text-center flex-none mr-4 w-6">
                        <FontAwesomeIcon className="text-md" icon="recycle" />
                      </div>
                      <span className="flex-none">Active</span>
                      </>
                    }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="toggle-modal w-12 h-12 bg-green-500 text-white rounded-full shadow-lg fixed bottom-0 right-0 mb-4  mr-4 flex items-center justify-center cursor-pointer hover:bg-green-700"
        onClick={() => setOpenModal(true)}
      >
        <FontAwesomeIcon className="text-sm" icon="plus" />
      </div>
      {openModal && (
        <RoleSetupModal setRefresh={setRefresh} setOpenModal={setOpenModal} typeSelect={typeSelect} setTypeSelect={setTypeSelect} roleInput={roleInput} setRoleInput={setRoleInput} edit={edit} setEdit={setEdit} Update={Update} setShow={setShow} />
      )}
    </React.Fragment>
  );
};

export default RoleList;
