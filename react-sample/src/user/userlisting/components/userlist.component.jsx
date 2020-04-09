import React, { Component} from 'react';
import { UserService } from '../../service/user.service'
import Layout from './../../../shared/layouts/admin/admin.component'
import DataTable from './../../dataTable';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            isLoading: true,
            users: [],
            error: null
        };
    }

    componentDidMount() {
        this.fetchUsers();
    };

    fetchUsers() {
      let session = JSON.parse(localStorage.getItem('session'));
      if(session === null) {
          this.props.history.push('/login')
      } else {
        UserService.getusers({ })
        .then((response) => {
            this.setState({ 
                users: response.data.records,
                isLoading: false
             })
        })
        .catch(error => this.setState({ error, isLoading: false }));
      }
    }

    dataTable() {
      return this.state.users.map((data, i) => {
        return <DataTable userdata={data} key={i}/>
      });
    }

    render() {
        const { isLoading, users, error } = this.state;
        return (
          <Layout>
            <main className="app-content">
              <div className="row">
                <div className="col-md-6">
                  <div className="tile">
                    <h3 className="tile-title">User Listing</h3>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Username</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!isLoading ? (this.dataTable() 
                          // If there is a delay in data, let's let the user know it's loading
                          ) : (
                          <h3>Loading...</h3>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </main>
          </Layout>
        );
    }
}
export default UserList;