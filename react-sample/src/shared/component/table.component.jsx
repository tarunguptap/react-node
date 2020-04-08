import React from 'react';
let table = (props) => {

  let headerList = props.tableHeader.map((header, i) => {
    return <th key = {i+1}>{header }</th>
  });
    
  let dataList = props.tableData.map((data, i) => {
    return <tr key = {i}>{data.map((row, i) => {return <td key = {i} >{row}</td>} ) }</tr>
  });

  return (  
    <div>
      <div className="app-title">
        <div>
          <h1><i className="fa fa-th-list"></i> {props.tableName}</h1>
          <p>Table to display {props.title} data effectively</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div className="tile-body">
              <div className="table-responsive">
                <table className="table table-hover table-bordered">
                  <thead>
                    <tr>
                      {headerList}
                    </tr>
                  </thead>
                  <tbody>
                    { dataList.length !== 0 ? dataList : (<div>No Records!</div>) }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
export default table;