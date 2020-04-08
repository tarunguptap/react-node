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
            <main className="app-content">
              <div className="row">
                <div className="col-md-6">
                  <div className="tile">
                    <h3 className="tile-title">User Listing</h3>
                    <table className="table">
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
            </main>
        );
    }
}
 
export default Table;