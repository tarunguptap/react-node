import React, { Component} from 'react';
import { UserService } from '../../service/user.service'
import Layout from '../../../shared/layouts/admin/admin.component'
import Table from '../../../shared/component/table.component';

class UserListDynamic extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            isLoading: true,
            users: [],
            tableHeader: ["#","Email","Name","Username"],
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
              users: response.data,
              isLoading: false
             })
        })
        .catch(error => this.setState({ error, isLoading: false }));
      }
    }

    userTable() {
     let userdata =  this.state.users.map((user, i) => {
        return [i+1, user.email, user.name, user.username]
      });
      return <Table header ={this.state.tableHeader} userdata={userdata} title="User List" tableName="User List Table"/>
    }

    render() {
        return (
          <Layout>
            {this.userTable()}
          </Layout>
        );
    }
}
export default UserListDynamic;