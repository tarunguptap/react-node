import React from 'react';
import Paginator from './paginator.component';
import { Link } from 'react-router-dom'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
let table = (props) => {

  let headerList = props.tableHeader.map((header, i) => {
    return <th key = {i+1}>{header }</th>
  });
    
  let dataList = props.tableData.map((data, i) => {
    return <tr key = {i}>{data.map((row, i) => {return <td key = {i} >{row}</td>} ) }</tr>
  });

  return (  
    <React.Fragment>
      <div className="app-title">
        <div>
          <h1><i className="fa fa-th-list"></i> {props.tableName}</h1>
          <p>Table to display {props.title} data effectively</p>
        </div>
        {props.showBreadcrumb &&
          <ul className="app-breadcrumb breadcrumb">
              <li className="breadcrumb-item">
                  <Link className="btn btn-primary" to={props.breadcrumbLink}>{props.breadcrumbTitle}</Link>
              </li>
          </ul>
        }
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div className="tile-body">
              <div className="table-search">
                <InputGroup className="mb-3 col-sm-6">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        onChange={(event) => props.search(event)}
                        className="search-input"
                        placeholder="Search....."
                        aria-label="Search"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
              </div>
              <div className="table-responsive">
              { dataList.length === 0 ? (<div>No Records!</div>) : (
                <table className="table table-hover table-bordered">
                  <thead>
                    <tr>
                      {headerList}
                    </tr>
                  </thead>
                  <tbody>
                    { dataList}
                  </tbody>
                </table>
                ) }
              </div>
            </div>
            <Paginator
              totalItems={props.totalItems}
              currentPage={props.currentPage}
              maxPaginationLinkSize={3}
              pageChanged={props.pageChanged}
              itemsPerPage={props.itemsPerPage}>
          </Paginator>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
} 
export default table;