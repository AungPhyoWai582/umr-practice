import React from "react";

const Button = ({ nodata, type, name, onClick, children, className }) => {
  return (
    <button
      disabled={nodata}
      className={`px-4 h-10 bg-green-500 text-white rounded-lg text-xs font-bold uppercase hover:bg-green-600 focus:outline-none ${
        className ? className : null
      }`}
      type={type}
      name={name}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
