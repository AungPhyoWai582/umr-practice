import React from "react";
const Text = (props) => {
  const data = [props.row];
 console.log(data);
  return (
    <div
      className={`relative p-4 mb-4 border bg-white rounded-lg shadow md:p-0 md:mb-0 md:bg-transparent md:rounded-none md:shadow-none md:border-none md:table-row ${
        props.rowCount % 2 === 0 ? "md:bg-gray-100" : ""
      }`}
    >
      <div className="hidden lg:table-cell md:px-2 md:py-3 lg:p-3 md:border-t">
        <input type="checkbox" />
      </div>
      <div className="hidden lg:table-cell md:px-2 md:py-3 lg:p-3 md:border-t">
        {props.rowCount}
      </div>
      {data.map((th, index) => {
        return (
          <React.Fragment key={index}>
            <div className="block md:table-cell text-xs mb-1 md:text-sm md:px-2 md:py-3 lg:p-3 md:border-t">{th.user_code}</div>
            <div className="block md:table-cell text-xs mb-1 md:text-sm md:px-2 md:py-3 lg:p-3 md:border-t">{th.name}</div>
            <div className="block md:table-cell text-xs mb-1 md:text-sm md:px-2 md:py-3 lg:p-3 md:border-t">{th.phone}</div>
            <div className="block md:table-cell text-xs mb-1 md:text-sm md:px-2 md:py-3 lg:p-3 md:border-t">{th.department.name}</div>
            <div className="block md:table-cell text-xs mb-1 md:text-sm md:px-2 md:py-3 lg:p-3 md:border-t">{th.township.name}</div>
            <div className="block md:table-cell text-xs mb-1 md:text-sm md:px-2 md:py-3 lg:p-3 md:border-t">{"Active"}</div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
export default Text;
