import React, { useState} from "react";
import Input from "../Form/Input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "../Form/Input/Select";
import Button from "../Form/Button/Button";
import FormControl from "../Form/FormControl/FormControl";

const TableFilter = ({ filteredData,select, setSelect, inputSearch,setInputSearch}) => {
  const handleOnChange = (e) => {
    setInputSearch(e.target.value);
    if(e.target.value === ''){
      filteredData(e,select,e.target.value);
    }
  };

  return (
    <React.Fragment>
      <form className="md:flex md:justify-start">
        <div className="flex flex-wrap">
          <FormControl>
            <Button type="button">
              <FontAwesomeIcon
                icon="filter"
                className="md:mr-2"
              ></FontAwesomeIcon>
              <span className="inline">Action</span>
            </Button>
          </FormControl>
          <FormControl>
            <Button type="button">
              <FontAwesomeIcon
                icon="filter"
                className="md:mr-2"
              ></FontAwesomeIcon>
              <span className="inline">Filter</span>
            </Button>
          </FormControl>
        </div>
        <div className="flex">
          <FormControl className="w-auto">
            <Select
              className="w-32 sm:w-auto"
              optionData={[
                {name:"user_code",id:"user_code"},
                {name:"name",id:"name"},
                {name:"phone",id:"phone"}
              ]}
              value={select}
              onChange={(e)=>setSelect(e.target.value)}
              preViewData="Choice"
              name="type"
            />
          </FormControl>
          <FormControl className="flex w-auto">
            <Input className="w-full" type="text" name="value" value={inputSearch} onChange={(e)=>handleOnChange(e)} />
            <Button type="submit" className="ml-2" onClick={(e)=>filteredData(e,select,inputSearch)}>
              <FontAwesomeIcon icon="search" />
            </Button>
          </FormControl>
        </div>
      </form>
    </React.Fragment>
  );
};

export default TableFilter;
