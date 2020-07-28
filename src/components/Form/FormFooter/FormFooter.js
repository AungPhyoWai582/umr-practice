import React from "react";

const FormFooter = ({ className, children }) => {
  return (
    <div
      className={`pt-4 flex items-center justify-end ${
        className ? className : null
      }`}
    >
      {children}
    </div>
  );
};

export default FormFooter;
