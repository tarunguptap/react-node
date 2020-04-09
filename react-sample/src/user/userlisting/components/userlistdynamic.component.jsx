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
            currentPage: 1,
            totalRecords: 0,
            itemsPerPage: 3,
            error: null
        };
    }

    pageChanged = (pager) => {
      this.fetchUsers(pager.page)
  }

    componentDidMount() {
      let { currentPage } = this.state
      this.fetchUsers(currentPage);
    };

    fetchUsers(currentPage=1) {
      let session = JSON.parse(localStorage.getItem('session'));
      if(session === null) {
          this.props.history.push('/login')
      } else {
        UserService.getusers({ pagenumber: currentPage })
        .then((response) => {
            this.setState({               
              users: response.data.records,
              isLoading: false,
              totalRecords: response.data.total,
              tableData: response.data.records.map((user, i) => ([i+1, user.email, user.name, user.username]))
             })
        })
        .catch(error => this.setState({ error, isLoading: false }));
      }
    }
    render() {
        return (
          <Layout>
            <Table pageChanged={this.pageChanged} currentPage = {this.state.currentPage} totalItems={this.state.totalRecords} itemsPerPage={this.state.itemsPerPage} tableHeader ={this.state.tableHeader} tableData={this.state.tableData} title="User List" tableName="User List Table"/>
          </Layout>
        );
    }
}
export default UserListDynamic;