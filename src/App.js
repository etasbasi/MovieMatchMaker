import React, {useEffect, useState, Component} from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./App.css";

function getColor(value, max){
  // * Set the maximum value here
  value = value/max
  //value from 0 to 10
  let hue=((1-value)*120).toString(10);
  return ["hsl(",hue,",80%,50%)"].join("");
}

function processData(allText) {
  var allTextLines = allText.split(/\r\n|\n/);
  var headers = allTextLines[0].split(',');
  var lines = [];
  for (var i=1; i<allTextLines.length; i++) {
      var data = allTextLines[i].split(',');
      if (data.length === headers.length) {

          var tarr = {};
          for (var j=0; j<headers.length; j++) {
            let header = headers[j];
              tarr = {[header]: data[j], ...tarr};
          }
          lines.push(tarr);
      }
  }
  return {lines, headers};

}

class App extends Component {
  state = {
    data: [], columns: [], text: "", max: 10
  }

  contructor(props) {

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.process = this.process.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    fetch('/data').then(res => res.text()).then(res => {
      this.process(res);
    });
  }

  handleTextChange(e) {
    this.setState({text: e.target.value})
  }
  handleInputChange(e) {
    this.setState({max: e.target.value})
  }

  onClick() {
   this.process(this.state.text);
  }

  process(txt) {
    let processedData = processData(txt);
    this.setState({data: processedData.lines});

    let newColumns = processedData.headers.map((genre) => {
      return { Header: genre, accessor: genre, getProps: (state, rowInfo, column) => {
          return {
            style: {
                background:  rowInfo ? getColor(rowInfo.row[genre], this.state.max) : "",
            },
        };
    }, };
    });
    this.setState({columns: newColumns});
  }

  render() {
    console.log("Component re rendered")
    return (
      <div>
      <h1>Movie Matchmaker</h1>
      <ReactTable className="table" data={this.state.data} columns={this.state.columns} />
      <div className="text-area">
      <textarea onChange={(e) => this.handleTextChange(e)} placeHolder="Enter new data..."></textarea>
      <div className="max">
        <input type="text" placeholder="Enter the maximum possible cell number" onChange={(e) => this.handleInputChange(e)} />
      </div>
      <button onClick={() => this.onClick()}>Update</button>
      </div>
      </div>
    )
  }
}

export default App;
