import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const ExpensionMenu = ({ data, sidebarState }) => {
  const [detailsMarkerState, setDetailsMarkerState] = useState(true);
  const myRef = useRef();
  const changeDetailsMarkerState = () => {
    setDetailsMarkerState(myRef.current.open);
  };
  return (
    <details className="text-sm font-bold" ref={myRef} open={data.itemName === 'Users'?true:false}>
      <summary
        className="outline-none relative w-full h-12 invisible"
        onClick={changeDetailsMarkerState}
      >
        <div className="flex items-center px-2 h-12 cursor-pointer absolute top-0 left-0 w-full visible xl:hover:bg-green-100 xl:hover:text-green-600">
          <div className="w-12 text-center flex-none">
            <FontAwesomeIcon icon={data.menuIcon} />
          </div>
          <span
            className={`flex-none flex-grow ${sidebarState ? "" : "hidden"}`}
          >
            {data.itemName}
          </span>
          <div
            className={`flex-none w-5 text-center ${
              sidebarState ? "" : "hidden"
            }`}
          >
            <FontAwesomeIcon
              className="text-xs collapsed"
              icon={`${detailsMarkerState ? "chevron-down" : "chevron-up"}`}
            />
          </div>
        </div>
      </summary>
      <div className="px-2 text-xs text-gray-600 border-b pb-3">
        {data.subItems.map((k, index) => (
          <React.Fragment key={index}>
            <NavLink to={k.subRouteTo}>
              <div
                className={`flex items-center cursor-pointer hover:text-gray-800 h-12 ${
                  sidebarState ? "ml-2" : ""
                }`}
              >
                <div className="w-12 text-center flex-none">
                  <FontAwesomeIcon icon={k.subMenuIcon} />
                </div>
                <span
                  className={`flex-none flex-grow ${
                    sidebarState ? "" : "hidden"
                  }`}
                >
                  {k.subItemName}
                </span>
              </div>
            </NavLink>
          </React.Fragment>
        ))}
      </div>
    </details>
  );
};

export default ExpensionMenu;
