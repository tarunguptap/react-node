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
            tableData: [],
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
              isLoading: false,
              tableData: response.data.map((user, i) => ([i+1, user.email, user.name, user.username]))
             })
        })
        .catch(error => this.setState({ error, isLoading: false }));
      }
    }
    render() {
        return (
          <Layout>
            <Table tableHeader ={this.state.tableHeader} tableData={this.state.tableData} title="User List" tableName="User List Table"/>
          </Layout>
        );
    }
}
export default UserListDynamic;