import React, { Component} from 'react';
import { UserService } from '../../service/user.service'
import Layout from './../../../shared/layouts/admin/admin.component'
//import Layout from './../../shared/layouts/auth/auth.component'

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
            console.log(response)
            console.log(response.data)
            this.setState({ 
                users: response.data,
                isLoading: false
             })
        })
        .catch(error => this.setState({ error, isLoading: false }));
      }
    }

    render() {
        const { isLoading, users, error } = this.state;
        return (
          <Layout>
            <main class="app-content">
              <div class="row">
                <div class="col-md-6">
                  <div class="tile">
                    <h3 class="tile-title">User Listing</h3>
                    {error ? <p>{error.message}</p> : null}
                    <table class="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Username</th>
                        </tr>
                      </thead>
                      <tbody>
                      {!isLoading ? (
                        users.map(user => {
                        //const { username, name, email } = user;
                        return (
                          <tr key={user.username}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                            <hr />
                          </tr>
                  );
                })
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