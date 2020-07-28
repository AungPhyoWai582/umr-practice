import React from "react";

const TextArea = ({
  labelText,
  required,
  className,
  name,
  id,
  cols,
  row,
  placeholder,
  value,
  onChange,
  onFocus,
}) => {
  return (
    <React.Fragment>
      {labelText ? (
        <div className="p-1">
          <label className="text-xs text-gray-700">{labelText}</label>
          {required === true && <span className="text-red-500 ml-1">*</span>}
        </div>
      ) : null}
      <textarea
        className={`block resize-none focus:outline-none h-32 p-4 bg-gray-100 rounded-lg focus:shadow-inner focus:bg-white border border-gray-400 ${
          className ? className : null
        }`}
        name={name}
        id={id}
        cols={cols}
        rows={row}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        required={required}
      ></textarea>
    </React.Fragment>
  );
};

export default TextArea;
