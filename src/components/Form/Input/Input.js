import React,{useState} from "react";

const Input = ({
  labelText,
  required,
  className,
  type,
  placeholder,
  value,
  name,
  onChange,
  onFocus,
  min,
  max,
  id,
  click
}) => {
  const error = "This field is required";
  return (
    <React.Fragment>
      {labelText ? (
        <div className="p-1">
          <label className="text-xs text-gray-700">{labelText}</label>
          {required === true && <span className="text-red-500 ml-1">*</span>}
          {(click===true && !value) && <span className="text-red-500 ml-1 text-xs">{error}</span>}
        </div>
      ) : null}
      <input
        className={`block focus:outline-none h-10 px-4 bg-gray-100 rounded-lg focus:shadow-inner focus:bg-white border border-gray-400 ${
          className ? className : null
        }`}
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        onFocus={onFocus}
        required={required}
        min={min}
        max={max}
        id={id}
      />
    </React.Fragment>
  );
};

export default Input;
