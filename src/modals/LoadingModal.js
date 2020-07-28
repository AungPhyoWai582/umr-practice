import React from "react";
import Spinner from "../share/spinner/Spinner";

const LoadingModal = () => {
  return (
    <div className={`modal fixed w-full  h-full top-0 left-0 z-50 `}>
      <div className="overlay flex w-full h-full items-center justify-center">
        <Spinner />
      </div>
    </div>
  );
};

export default LoadingModal;
