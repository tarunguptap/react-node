import React, { Component } from 'react';
import Layout from './../../shared/layouts/admin/admin.component'
class Table extends Component {
    header() {
        return this.props.header.map((data, i) => {
          return <th>{data }</th>
        });
      }
      data() {
        return this.props.userdata.map((data) => {
          return <tr>{data.map(user => {return <td>{user}</td>} ) }</tr>
        });
      }

    render() { 
        return (  
            <div>
              <div className="app-title">
                <div>
                  <h1><i className="fa fa-th-list"></i> {this.props.tableName}</h1>
                  <p>Table to display {this.props.title} data effectively</p>
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
                                {this.header()}
                              </tr>
                          </thead>
                          <tbody>
                              {this.data()}
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
}
 
export default Table;