import React, { useState } from "react";
import FormFooter from "../components/Form/FormFooter/FormFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormControl from "../components/Form/FormControl/FormControl";
import Input from "../components/Form/Input/Input";
import Button from "../components/Form/Button/Button";

const TypeSetupModal = ({
  setOpenModal,
  typeInput,
  setTypeInput,
  Create,
  Update,
  edit,
  setEdit,
  setTemIsActive,
  setShow,
  errorMessage,
  setErrorMessage
}) => {
  const cancel = (e) => {
    e.preventDefault();
    setEdit(false);
    setOpenModal(false);
    setShow(false);
    setTypeInput(null);
    setTemIsActive(null);
    setErrorMessage(null);
  };
  return (
    <React.Fragment>
      <div
        className={`modal overflow-scroll fixed w-full h-full top-0 left-0 z-50 `}
      >
        <div
          className="overlay min-h-full min-w-full flex items-center justify-center"
          style={{ backgroundColor: "#00000066" }}
        >
          <div className="bg-white rounded-lg shadow-lg w-3/4 xs:2/3 sm:w-1/2 md:w-1/3 lg:w-1/4">
            <div className="p-4 border-b flex justify-between">
              {edit ? (
                <h1 className="text-lg">Update Role</h1>
              ) : (
                <h1 className="text-lg">Create New Type</h1>
              )}
              <div
                className="text-center px-2 inline-block cursor-pointer text-red-600 hover:text-red-900"
                onClick={(e) => cancel(e)}
              >
                <FontAwesomeIcon className="text-sm" icon="times" />
              </div>
            </div>
            {errorMessage && <h1 align="center" className="text-sm text-red-500">{errorMessage}</h1>}
            <form action="" className="px-4">
              <FormControl>
                <Input
                  className="w-full"
                  type="text"
                  labelText="Type Name"
                  value={typeInput}
                  onChange={(e) => setTypeInput(e.target.value)}
                />
              </FormControl>
              <FormFooter className="pb-4">
                <button
                  type="button"
                  className="w-auto h-10 px-4 py-2 leading-6 sm:leading-5 bg-white rounded-lg border border-gray-400 text-sm font-medium text-gray-700 shadow-sm hover:opacity-75 focus:outline-none mr-1"
                  onClick={(e) => cancel(e)}
                >
                  Cancel
                </button>
                {edit ? (
                  <Button
                    className={!typeInput && "cursor-not-allowed"}
                    nodata={!typeInput ? true : false}
                    onClick={(e) => Update(e)}
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    className={!typeInput && "cursor-not-allowed"}
                    nodata={!typeInput ? true : false}
                    onClick={(e) => Create(e)}
                  >
                    Create
                  </Button>
                )}
              </FormFooter>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TypeSetupModal;
