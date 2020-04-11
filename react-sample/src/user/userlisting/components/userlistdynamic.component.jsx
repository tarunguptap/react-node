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
            searchText: '',
            currentPage: 1,
            totalRecords: 0,
            itemsPerPage: 3,
            error: null
        };
    }

    onSearch = (str) => {
      let { currentPage } = this.state
      this.fetchUsers(str.target.value, currentPage)
    }

    pageChanged = (pager) => {
      let { searchText } = this.state
      this.setState({
        currentPage: pager.page
      })
      this.fetchUsers(searchText, pager.page)
    };

    componentDidMount() {
      let { searchText, currentPage } = this.state
      this.fetchUsers(searchText, currentPage);
    };

    fetchUsers(searchText='', currentPage=1) {
      let session = JSON.parse(localStorage.getItem('session'));
      if(session === null) {
          this.props.history.push('/login')
      } else {
        UserService.getusers({ searchText: searchText, pagenumber: currentPage })
        .then((response) => {
            this.setState({               
              users: response.data.records,
              isLoading: false,
              totalRecords: response.data.total,
              tableData: response.data.records.map((user, i) => ([i+(((this.state.currentPage-1)*this.state.itemsPerPage)+1), user.email, user.name, user.username]))
             })
        })
        .catch(error => this.setState({ error, isLoading: false }));
      }
    }
    render() {
        return (
          <Layout>
            <Table search={this.onSearch} pageChanged={this.pageChanged} 
            currentPage = {this.state.currentPage} 
            totalItems={this.state.totalRecords} itemsPerPage={this.state.itemsPerPage} 
            tableHeader ={this.state.tableHeader} tableData={this.state.tableData} 
            title="User List" tableName="User List Table" isLoading={this.state.isLoading}
            showBreadcrumb="true" breadcrumbTitle="Create New User" breadcrumbLink="/user-create"/>
          </Layout>
        );
    }
}
export default UserListDynamic;