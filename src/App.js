import React, {useEffect, useState, Component} from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./App.css";

function getColor(value){
  // * Set the maximum value here
  value = value/10
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

// function App() {
//   const [data, setData] = useState([]);
//   const [columns, setColumns] = useState([]);
  

// useEffect(() => {
//   fetch('/data').then(res => res.text()).then(res => {
//   let processedData = processData(res);
//     setData(processedData.lines);

//     let newColumns = processedData.headers.map((genre) => {
//       return { Header: genre, accessor: genre, getProps: (state, rowInfo, column) => {
//           return {
//             style: {
//                 background:  rowInfo ? getColor(rowInfo.row[genre]) : "",
//             },
//         };
//     }, };
//     });
//     setColumns(newColumns);

// });
// }, [data, columns])

//   console.log('App rendered');
//   return (
    
//   <div>
//     <h1>Movie Matchmaker</h1>
//     <ReactTable className="table" data={data} columns={columns} />
//     </div>);
// }

class App extends Component {
  state = {
    data: [], columns: []
  }

  componentWillMount() {
    fetch('/data').then(res => res.text()).then(res => {
      let processedData = processData(res);
        this.setState({data: processedData.lines});
    
        let newColumns = processedData.headers.map((genre) => {
          return { Header: genre, accessor: genre, getProps: (state, rowInfo, column) => {
              return {
                style: {
                    background:  rowInfo ? getColor(rowInfo.row[genre]) : "",
                },
            };
        }, };
        });
        this.setState({columns: newColumns});
    });
  }

  render() {
    console.log("Component re rendered")
    return (
      <div>
      <h1>Movie Matchmaker</h1>
      <ReactTable className="table" data={this.state.data} columns={this.state.columns} />
      </div>
    )
  }
}

export default App;
