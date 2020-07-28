import React,{useState} from "react";
import Topbar from "../../components/Topbar/Topbar";
import Input from "../../components/Form/Input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RoleList = ({ toggleSidebar }) => {
  const [data,setData] = useState(['Doctor','Student','hadflk']);
  const [input,setInput] = useState();
  const [show,setShow] = useState(false);

  const handleAdd = e => {
    e.preventDefault();
    setData(input);
  }
  console.log(data);
  return (
    <React.Fragment>
      <Topbar toggleSidebar={toggleSidebar} pageTitle="Role List" />
      <div className="my-1 px-6 sm:px-8 py-4">
        <div className="bg-white rounded-lg shadow-lg text-sm mb-4 p-2">
          <form action="" className="flex flex-wrap items-center">
            <div className="w-full md:w-auto flex-grow px-1">
              <Input className="w-full" type="text" placeholder="Search Role" onChange={(e)=>setInput(e.target.value)} />
            </div>
          </form>
        </div>
        {data.map(d=><div className="flex flex-wrap -mx-2">
          <div className="w-full sm:w-1/2 lg:w-1/4 px-2">
            <div className="rounded-lg bg-white shadow-lg text-sm mb-4 p-4 flex items-center justify-between">
              <div className="flex align-middle">
                <div className="w-3 h-3 rounded-full bg-green-500 mt-2"></div>
                <div className="text-lg font-bold ml-2">{d}</div>
              </div>
              <div className="relative">
                <div className="toggle-table-action" onClick={()=>setShow(!show)}>
                  <FontAwesomeIcon
                    icon="ellipsis-v"
                    className="text-gray-600 cursor-pointer hover:text-gray-900"
                  />
                </div>

                <div className={`bg-white shadow-lg rounded-lg absolute mt-4 top-0 right-0 py-4 text-sm font-bold text-gray-600 z-10 table-action ${!show && "hidden"}`}>
                  <div className="py-2 pl-4 pr-6 flex items-center cursor-pointer text-sm font-bold hover:bg-green-200 hover:text-green-600">
                    <div className="text-center flex-none mr-4 w-6">
                      <FontAwesomeIcon className="text-md" icon="pencil-alt" />
                    </div>
                    <span className="flex-none">Update</span>
                  </div>
                  <div className="py-2 pl-4 pr-6 flex items-center cursor-pointer text-sm font-bold hover:bg-red-100 hover:text-red-600">
                    <div className="text-center flex-none mr-4 w-6">
                      <FontAwesomeIcon className="text-md" icon="trash-alt" />
                    </div>
                    <span className="flex-none">Deactive</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>)}
      </div>
      <div className="toggle-modal w-12 h-12 bg-green-500 text-white rounded-full shadow-lg fixed bottom-0 right-0 mb-4  mr-4 flex items-center justify-center cursor-pointer hover:bg-green-700" onClick={(e)=>handleAdd(e)}>
        <FontAwesomeIcon className="text-sm" icon="plus" />
      </div>
    </React.Fragment>
  );
};

export default RoleList;
