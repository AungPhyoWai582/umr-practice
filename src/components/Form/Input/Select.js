import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Select = ({
  labelText,
  required,
  className,
  name,
  id,
  onChange,
  onFocus,
  preViewData,
  optionData,
  value,
  click,
}) => {
  const error = "This field is required";
  
  return (
    <React.Fragment>
      {labelText ? (
        <div className="p-1">
          <label className="text-xs text-gray-700">{labelText}</label>
          {required === true && <span className="text-red-500 ml-1">*</span>}
          {click === true && !value ? (
            <span className="text-red-500 ml-1 text-xs">{error}</span>
          ) : null}
        </div>
      ) : null}
      <div className={`inline-block relative ${className ? className : null}`}>
        <select
          className="block appearance-none w-full focus:outline-none h-10 pl-4 pr-10 bg-gray-100 rounded-lg focus:shadow-inner focus:bg-white border border-gray-400"
          name={name}
          value={value}
          id={id}
          onChange={onChange}
          onFocus={onFocus}
        >
          {!value && <option value="">{preViewData}</option>}
          {
            optionData.map((opt, index) => (
              <React.Fragment key={index}>
                <option value={opt.id}> {opt.name} </option>
              </React.Fragment>
            ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-xs">
          <FontAwesomeIcon icon="chevron-down" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Select;
