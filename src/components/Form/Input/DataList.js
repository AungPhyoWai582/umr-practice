import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button/Button";

class DataList extends React.Component {
  constructor(props) {
    super(props);
    this.myDataList = React.createRef();
    this.myTextArea = React.createRef();
    this.state = { selectedData: "" };
    this.addSelectedData = this.addSelectedData.bind(this);
    this.updateSelectedData = this.updateSelectedData.bind(this);
  }
  addSelectedData() {
    if (this.state.selectedData === "") {
      this.setState({
        selectedData: this.myDataList.current.value,
      });
      this.myDataList.current.value = "";
    } else {
      this.setState({
        selectedData:
          this.state.selectedData + ", " + this.myDataList.current.value,
      });
      this.myDataList.current.value = "";
    }
  }
  updateSelectedData(e) {
    this.setState({
      selectedData: this.myTextArea.current.value,
    });
  }
  render() {
    return (
      <React.Fragment>
        {this.props.labelText ? (
          <div className="p-1">
            <label className="text-xs text-gray-700">
              {this.props.labelText}
            </label>
            {this.props.required === true && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </div>
        ) : null}
        <textarea
          ref={this.myTextArea}
          placeholder="All data you selected will show here..."
          className="block w-full focus:outline-none h-32 resize-none p-4 mb-2 bg-gray-100 rounded-lg focus:shadow-inner focus:bg-white border border-gray-400"
          name={this.props.name}
          onChange={this.updateSelectedData}
          onFocus={this.props.onFocus}
          required={this.props.required}
          id={this.props.id}
          value={this.state.selectedData}
        ></textarea>
        <div className="flex flex-nowrap items-center">
          <div className="flex-grow">
            <input
              ref={this.myDataList}
              className="block w-full focus:outline-none h-10 px-4 bg-gray-100 rounded-lg focus:shadow-inner focus:bg-white border border-gray-400"
              list="dataList"
              placeholder={this.props.placeholder}
            />
            <datalist id="dataList">
              {this.props.dataList.map((dl, index) => (
                <React.Fragment key={index}>
                  <option value={dl} />
                </React.Fragment>
              ))}
            </datalist>
          </div>
          <Button className="ml-4" type="button" onClick={this.addSelectedData}>
            <FontAwesomeIcon icon="plus" />
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default DataList;
