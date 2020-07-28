import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const NonExpensionMenu = ({ data, sidebarState }) => {
  return (
    <NavLink to={data.routeTo}>
      <div className="flex items-center px-2 h-12 cursor-pointer text-sm font-bold xl:hover:bg-green-100 xl:hover:text-green-600">
        <div className="w-12 text-center flex-none">
          <FontAwesomeIcon icon={data.menuIcon} />
        </div>
        <span className={`flex-none flex-grow ${sidebarState ? "" : "hidden"}`}>
          {data.itemName}
        </span>
      </div>
    </NavLink>
  );
};

export default NonExpensionMenu;
