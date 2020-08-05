import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PermissionCheckBox = ({
  name,
  value,
  id,
  labelText,
  required,
  check,
  checkId,
  setCheckId,
  key,
}) => {
  const [checked, setChecked] = useState();

  useEffect(() => {
    setChecked(check);
    console.clear();
  }, [check]);

  const handleClick = (id) => {
    setChecked(!checked);
    if (!checked) {
      if (checkId) {
        setCheckId([...checkId, id]);
      } else {
        setCheckId(id);
      }
    } else {
      let copyCheckId = [...checkId];
      let index = copyCheckId.indexOf(id);
      copyCheckId.splice(index, 1);
      setCheckId(copyCheckId);
    }
    if (checkId.includes(id)) {
      let copyCheckId = [...checkId];
      let index = copyCheckId.indexOf(id);
      copyCheckId.splice(index, 1);
      setCheckId(copyCheckId);
    }
  };

  return (
    <React.Fragment>
      <div className="flex flex-nowrap items-center mx-2">
        <div className="w-5 h-5 relative overflow-hidden cursor-pointer">
          <input
            key={key}
            type="checkbox"
            className="w-full h-full appearance-none focus:outline-none"
            defaultChecked={checked}
            onClick={() => handleClick(id)}
            name={name}
            value={value}
          />
          <div
            className={`pointer-events-none w-full h-full border absolute top-0 left-0 flex items-center justify-center text-xs text-white rounded shadow-inner 
            ${
              checked
                ? "bg-green-500 border-green-500"
                : "bg-gray-200 border-gray-400"
            }`}
          >
            {checked ? <FontAwesomeIcon icon="check" /> : null}
          </div>
        </div>
        {labelText ? (
          <div className="ml-2">
            <label className="text-xs font-bold text-gray-700">
              {labelText}
            </label>
            {required === true && <span className="text-red-500 ml-1">*</span>}
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
};
export default PermissionCheckBox;
