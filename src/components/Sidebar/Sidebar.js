import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ExpensionMenu from "./ExpensionMenu";
import NonExpensionMenu from "./NonExpensionMenu";

const style = {
  backdropBlur: {
    backdropFilter: "blur(3px)",
    WebkitBackdropFilter: "blur(3px)",
    background: "rgba(255, 255, 255, 0.925)",
  },
};

const Sidebar = ({ sidebarState, toggleSidebar, menuItems }) => {
  const [largeSidebarState, setLargeSidebarState] = useState(true);

  const smallSidebar = () => {
    setLargeSidebarState(!largeSidebarState);
  };
  return (
    <div
      className={`transition-all duration-75 flex-none relative ${
        largeSidebarState ? "xl:w-64" : "xl:w-16"
      }`}
    >
      <div
        className={`fixed flex top-0 w-screen h-screen z-30 xl:block xl:sticky xl:w-full xl:h-auto xl:z-0 transform xl:translate-x-0 transition-all duration-150 xl:transition-none xl:duration-0 ${
          sidebarState ? "left-0" : "-translate-x-full"
        }`}
      >
        <div
          style={style.backdropBlur}
          className="overflow-x-hidden overflow-y-auto mx-w-full w-64 xl:w-auto h-screen xl:shadow-md border-r flex-none flex-grow"
        >
          <div className="p-4 h-20 border-b flex items-center justify-between">
            <div
              className={`flex items-center flex-none ${
                largeSidebarState ? "" : "hidden"
              }`}
            >
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/51hKyr0it6L.png"
                alt=""
                className="object-center w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-gray-200 mr-2 md:mr-4"
              />
              <h1 className="text-lg md:text-xl font-bold">picoHOS</h1>
            </div>
            <div
              className="hidden w-8 h-8 bg-gray-200 text-gray-600 rounded-full xl:flex flex-none hover:text-gray-800 transition-color duration-150 cursor-pointer"
              onClick={smallSidebar}
            >
              <FontAwesomeIcon
                icon={largeSidebarState ? "arrow-left" : "arrow-right"}
                className="m-auto"
              />
            </div>
            <div
              className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex xl:hidden hover:text-gray-800 transition-color duration-150 cursor-pointer"
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon icon="arrow-left" className="m-auto" />
            </div>
          </div>
          {menuItems.map((key, index) => (
            <React.Fragment key={index}>
              {key.routeTo === null && (
                <ExpensionMenu data={key} sidebarState={largeSidebarState} />
              )}
              {key.routeTo !== null && (
                <NonExpensionMenu data={key} sidebarState={largeSidebarState} />
              )}
            </React.Fragment>
          ))}
        </div>
        <div
          className={`w-full h-screen bg-gray-900 xl:hidden ${
            sidebarState
              ? "opacity-25 transition-all duration-1000"
              : "opacity-0"
          }`}
          onClick={toggleSidebar}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
