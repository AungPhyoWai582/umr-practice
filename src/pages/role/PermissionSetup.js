import React, { useEffect, useState } from "react";
import Topbar from "../../components/Topbar/Topbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PermissionCheckBox from "./PermissionCheckBox";
import FormSection from "../../components/Form/FormWithSection/FormSection";
import FormControl from "../../components/Form/FormControl/FormControl";
import Select from "../../components/Form/Input/Select";
import FormFooter from "../../components/Form/FormFooter/FormFooter";
import Button from "../../components/Form/Button/Button";
import { axiosConfig } from "../../Axios/Axios";
import { waitForDomChange } from "@testing-library/react";

const PermissionSetup = ({ toggleSidebar }) => {
  const [role, setRole] = useState([]);
  const [module, setModule] = useState([]);
  const [roleSelect, setRoleSelect] = useState();
  const [permission, setPermission] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [successful, setSuccessful] = useState();
  const [checkId, setCheckId] = useState();

  useEffect(() => {
    axiosConfig
      .get("/roles")
      .then((response) => {
        if (response.data.data) {
          setRole(response.data.data);
        }
      })
      .catch((error) => console.log(error));
    axiosConfig
      .get("/modules")
      .then((response) => {
        if (response.data.data) {
          setModule(response.data.data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (roleSelect) {
      axiosConfig
        .get(`roles/${roleSelect}/permissions`)
        .then((response) => {
          let arr = response.data.data.map((r) => r.id);
          setCheckId(arr);
          setPermission(arr);
          setErrorMessage(null);
          setSuccessful(null);
          setSuccessful(null);
        })
        .catch((error) => console.log(error));
    }
    console.clear();
  }, [roleSelect]);

  const Create = (e) => {
    e.preventDefault();
    console.log(checkId);
    axiosConfig
      .post(`/roles/${roleSelect}/permissions`, { permissions: checkId })
      .then((response) => {
        console.log(response.data.data);
        window.scrollTo({ top: 0, behavior: "smooth" });
        setSuccessful("Successfully");
        setErrorMessage(null);
        setCheckId(null);
      })
      .catch((err) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setSuccessful(null);
        setErrorMessage("At least one check");
      });
  };

  return (
    <React.Fragment>
      <Topbar toggleSidebar={toggleSidebar} pageTitle="Permission Setup" />
      <div className="my-1 px-6 sm:px-8 py-4">
        <form className="bg-white border rounded-lg shadow-md overflow-hidden">
          {errorMessage && (
            <h3 align="center" style={{ color: "red" }}>
              {errorMessage}
            </h3>
          )}
          {successful && (
            <h3 align="center" style={{ color: "green" }}>
              {successful}
            </h3>
          )}
          <FormSection sectionTitle="Create New User Role">
            <FormControl>
              <Select
                className="w-full"
                labelText="User Role"
                name="checkType"
                preViewData="-- Choose One --"
                value={roleSelect}
                optionData={role}
                onChange={(e) => setRoleSelect(e.target.value)}
              />
            </FormControl>
            {module.map((md, index) => (
              <div
                className="flex items-center flex-wrap py-4 md:py-2 md:px-4 border-b"
                key={md.id}
              >
                <h4 className="w-full text-gray-800 text-sm flex-grow mb-2">
                  {md.name}
                </h4>
                {md.permissions.map((per, i) => (
                  <PermissionCheckBox
                    key={per.id}
                    id={per.id}
                    checkId={checkId}
                    setCheckId={setCheckId}
                    check={permission.includes(per.id)}
                    labelText={per.name}
                  />
                ))}
              </div>
            ))}
            <FormFooter>
              <Button
                nodata={checkId ? false : true}
                className={`${checkId ?"":"cursor-not-allowed"}`}
                onClick={Create}
              >
                Create
              </Button>
            </FormFooter>
          </FormSection>
        </form>
      </div>
    </React.Fragment>
  );
};

export default PermissionSetup;
