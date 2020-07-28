import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CSVSetup = (props) => {
  //submit handler
  return (
    <div className="bg-white rounded-lg shadow-lg mb-4">
      <form>
        <div className="p-4 border-b flex items-center justify-between">
          <h1 className="text-lg">Excel Import</h1>
          <button type="submit" className="outline-none">
            <span className="fas fa-paper-plane text-green-500 outline-none"></span>
          </button>
        </div>
        <div className="p-6">
          <div className="outline-none">
            <input
              id="csvImport"
              accept=".xlsx"
              type="file"
              className="hidden"
            />
            <label
              htmlFor="csvImport"
              className="w-48 h-48 bg-green-500 text-white cursor-pointer rounded-lg block mx-auto flex items-center hover:bg-green-300 hover:text-white"
            >
              <span className="text-center w-full">
                <FontAwesomeIcon icon="file-csv" />
                <br />
                Choose Excel File
                <div>
                  <strong></strong>
                </div>
              </span>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};
export default React.memo(CSVSetup);
