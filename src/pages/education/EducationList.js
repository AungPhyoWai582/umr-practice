import React, { useState, useEffect } from "react";
import Topbar from "../../components/Topbar/Topbar";
import Input from "../../components/Form/Input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { axiosConfig } from "../../Axios/Axios";
import EducationSetupModal from "../../modals/EducationSetupModal";

const EducationList = ({ toggleSidebar }) => {
  const [educationData, setEducationData] = useState([]);
  const [toggleIndex, setToggleIndex] = useState();
  const [show, setShow] = useState(false);
  const [eduInput, setEduInput] = useState();
  const [temIsActive, setTemIsActive] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [edit, setEdit] = useState(false);
  const [tempId, setTempId] = useState();
  const [search, setSearch] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    axiosConfig
      .get("/educations")
      .then((response) => {
        if (response.data.data) {
          setEducationData(response.data.data);
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
    let index = id - 1;
    let obj = {
      id: educationData[index].id,
      name: educationData[index].name,
      is_active: educationData[index].is_active === "true" ? "false" : "true",
    };
    axiosConfig
      .put(`educations/${id}`, obj)
      .then((response) => {
        if (response.data.data) {
          setRefresh(true);
          setShow(false);
        }
      })
      .catch((error) => console.log(error));
  };

  const Create = (e) => {
    e.preventDefault();
    let obj = {
      name: eduInput,
      is_active: "true",
    };
    axiosConfig
      .post("/educations", obj)
      .then((response) => {
        if (response.data.data) {
          setRefresh(true);
          setOpenModal(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      })
      .catch((error) => console.log(error));
  };

  const Edit = (e, id) => {
    e.preventDefault();

    setTempId(id);
    setEduInput(educationData[id - 1].name);
    setTemIsActive(educationData[id - 1].is_active);
    setOpenModal(true);
    setEdit(true);
  };

  const Update = (e) => {
    e.preventDefault();
    let obj = {
      name: eduInput,
      is_active: temIsActive,
    };
    axiosConfig
      .put(`educations/${tempId}`, obj)
      .then((response) => {
        if (response.data.data) {
          setRefresh(true);
          setOpenModal(false);
          setEduInput(null);
          setTemIsActive(null);
          setEdit(false);
          setShow(false);
          setErrorMessage(null);
        }
      })
      .catch((err) => setErrorMessage(err.response.data.error));
  };
  const Search = (e) => {
    setSearch(e.target.value.toLowerCase());
    setShow(false);
  };
  let showOutput = search
    ? educationData.filter((td) => td.name.toLowerCase().includes(search))
    : educationData;

  return (
    <React.Fragment>
      <Topbar toggleSidebar={toggleSidebar} pageTitle="Education List" />
      <div className="my-1 px-6 sm:px-8 py-4">
        <div className="bg-white rounded-lg shadow-lg text-sm mb-4 p-2">
          <form action="" className="flex flex-wrap items-center">
            <div className="w-full md:w-auto flex-grow px-1">
              <Input
                className="w-full"
                type="text"
                placeholder="Search Type"
                onChange={(e) => Search(e)}
              />
            </div>
          </form>
        </div>
        <div className="flex flex-wrap -mx-2">
          {showOutput.map((sh, index) => (
            <div className="w-full sm:w-1/2 lg:w-1/4 px-2" key={sh.id}>
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
                  {/************************************** */}
                  <div
                    className={`bg-white shadow-lg rounded-lg absolute mt-4 top-0 right-0 py-4 text-sm font-bold text-gray-600 z-10 table-action ${
                      !(show && toggleIndex === index) && "hidden"
                    }`}
                  >
                    <div
                      className="py-2 pl-4 pr-6 flex items-center cursor-pointer text-sm font-bold hover:bg-green-200 hover:text-green-600"
                      onClick={(e) => Edit(e, sh.id)}
                    >
                      <div className="text-center flex-none mr-4 w-6">
                        <FontAwesomeIcon
                          className="text-md"
                          icon="pencil-alt"
                        />
                      </div>
                      <span className="flex-none">Update</span>
                    </div>
                    <div
                      className="py-2 pl-4 pr-6 flex items-center cursor-pointer text-sm font-bold hover:bg-red-100 hover:text-red-600"
                      onClick={(e) => ActiveControl(e, sh.id)}
                    >
                      {sh.is_active === "true" ? (
                        <>
                          <div className="text-center flex-none mr-4 w-6">
                            <FontAwesomeIcon
                              className="text-md"
                              icon="trash-alt"
                            />
                          </div>
                          <span className="flex-none">Deactive</span>
                        </>
                      ) : (
                        <>
                          <div className="text-center flex-none mr-4 w-6">
                            <FontAwesomeIcon
                              className="text-md"
                              icon="recycle"
                            />
                          </div>
                          <span className="flex-none">Active</span>
                        </>
                      )}
                    </div>
                  </div>
                  {/************************************** */}
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
        <EducationSetupModal
          setOpenModal={setOpenModal}
          eduInput={eduInput}
          setEduInput={setEduInput}
          Create={Create}
          Update={Update}
          edit={edit}
          setEdit={setEdit}
          setTemIsActive={setTemIsActive}
          setShow={setShow}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </React.Fragment>
  );
};

export default EducationList;
