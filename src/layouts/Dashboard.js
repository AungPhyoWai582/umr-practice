import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import UserList from "../pages/user/UserList";
import UserSetup from "../pages/user/UserSetup";
import Sidebar from "../components/Sidebar/Sidebar";
import RoleList from '../pages/role/RoleList';
import PermissionSetup from '../pages/role/PermissionSetup';
import TypeList from '../pages/type/TypeList';
import DepartmentList from '../pages/department/DepartmentList';
import EducationList from '../pages/education/EducationList';
import DesignationList from '../pages/desigination/DesignationList';
import SpecialitiesList from '../pages/specialities/SpecialitiesList';

function createMenuItem(itemName, menuIcon, routeTo, subItems) {
  return { itemName, menuIcon, routeTo, subItems };
}
function createSubMenuItem(subItemName, subMenuIcon, subRouteTo) {
  return { subItemName, subMenuIcon, subRouteTo };
}
const menuItems = [
  createMenuItem("Users", "users", null, [
    createSubMenuItem("User List", "list", "/"),
    createSubMenuItem("User Setup", "plus", "/patientSetup"),
  ]),
  createMenuItem("Role", "id-card", null, [
    createSubMenuItem("Role List", "list", "/role-list"),
    createSubMenuItem("Role Setup", "plus", "/role-setup"),
  ]),
  createMenuItem("Types", "tag", "/type-list"),
  createMenuItem("Department", "clinic-medical", "/department-list"),
  createMenuItem("Education", "book-open", "/education-list"),
  createMenuItem("Designation", "users-cog", "/desigination-list"),
  createMenuItem("Specialities", "stethoscope", "/specialities-list"),
];

const DashboardLayout = () => {
  const [sidebarState, setSidebarState] = useState(false);
  const toggleSidebar = () => {
    setSidebarState(!sidebarState);
  };
  return (
    <div className="xl:flex min-h-screen bg-gray-300 text-gray-900">
      <Sidebar
        sidebarState={sidebarState}
        toggleSidebar={toggleSidebar}
        menuItems={menuItems}
      />
      <div className="flex-grow">
        <Switch>
          <Route exact path="/">
            <UserList toggleSidebar={toggleSidebar} />
          </Route>
          <Route exact path="/patientSetup">
            <UserSetup toggleSidebar={toggleSidebar} />
          </Route>
          <Route exact path="/role-list">
            <RoleList toggleSidebar={toggleSidebar} />
          </Route>
          <Route exact path="/role-setup">
            <PermissionSetup toggleSidebar={toggleSidebar} />
          </Route>
          <Route exact path="/type-list">
            <TypeList toggleSidebar={toggleSidebar} />
          </Route>
          <Route exact path="/department-list">
            <DepartmentList toggleSidebar={toggleSidebar} />
          </Route>
          <Route exact path="/education-list">
            <EducationList toggleSidebar={toggleSidebar} />
          </Route>
          <Route exact path="/desigination-list">
            <DesignationList toggleSidebar={toggleSidebar} />
          </Route>
          <Route exact path="/specialities-list">
            <SpecialitiesList toggleSidebar={toggleSidebar} />
          </Route>
        </Switch>
      </div>
    </div>
  );
};
export default DashboardLayout;