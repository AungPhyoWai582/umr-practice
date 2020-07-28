import React from "react";

const FormWithSection = ({ action, onSubmit, method, children }) => {
  return (
    <div className="bg-white border rounded-lg shadow-md overflow-hidden">
      <div className="w-full h-2 bg-green-500"></div>
      <form action={action} onSubmit={onSubmit} method={method}>
        {children}
      </form>
    </div>
  );
};

export default FormWithSection;
