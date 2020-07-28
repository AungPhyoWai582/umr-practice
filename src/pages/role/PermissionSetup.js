import React from "react";
import Topbar from "../../components/Topbar/Topbar";
import Input from "../../components/Form/Input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormWithSection from "../../components/Form/FormWithSection/FormWithSection";
import FormSection from "../../components/Form/FormWithSection/FormSection";
import FormControl from "../../components/Form/FormControl/FormControl";
import Select from "../../components/Form/Input/Select";
import CheckBox from "../../components/Form/Input/Checkbox";
import FormFooter from "../../components/Form/FormFooter/FormFooter";
import Button from "../../components/Form/Button/Button";

const PermissionSetup = ({ toggleSidebar }) => {
  return (
    <React.Fragment>
      <Topbar toggleSidebar={toggleSidebar} pageTitle="Permission Setup" />
      <div className="my-1 px-6 sm:px-8 py-4">
        <form className="bg-white border rounded-lg shadow-md overflow-hidden">
          <FormSection sectionTitle="Create New User Role">
            <FormControl>
              <Select
                className="w-full"
                labelText="User Role"
                name="checkType"
                preViewData="-- Choose One --"
                optionData={[
                  { optionValue: "admin", optionText: "Admin" },
                  { optionValue: "user", optionText: "User" },
                ]}
              />
            </FormControl>
            <div className="flex items-center flex-wrap py-4 md:py-2 md:px-4 border-b">
              <h4 className="w-full text-gray-800 text-sm flex-grow mb-2">
                User
              </h4>
              <CheckBox labelText="view" />
              <CheckBox labelText="create" />
              <CheckBox labelText="update" />
              <CheckBox labelText="delete" />
              <CheckBox labelText="print" />
            </div>
            <div className="flex items-center flex-wrap py-4 md:py-2 md:px-4 border-b">
              <h4 className="w-full text-gray-800 text-sm flex-grow mb-2">
                Type
              </h4>
              <CheckBox labelText="view" />
              <CheckBox labelText="create" />
              <CheckBox labelText="update" />
              <CheckBox labelText="delete" />
              <CheckBox labelText="print" />
            </div>
            <div className="flex items-center flex-wrap py-4 md:py-2 md:px-4 border-b">
              <h4 className="w-full text-gray-800 text-sm flex-grow mb-2">
                Role
              </h4>
              <CheckBox labelText="view" />
              <CheckBox labelText="create" />
              <CheckBox labelText="update" />
              <CheckBox labelText="delete" />
              <CheckBox labelText="print" />
            </div>
            <FormFooter>
              <Button>Create</Button>
            </FormFooter>
          </FormSection>
        </form>
      </div>
    </React.Fragment>
  );
};

export default PermissionSetup;
