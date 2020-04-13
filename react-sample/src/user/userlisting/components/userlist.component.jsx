import React, { Component} from 'react';
import { Link } from 'react-router-dom'
import { UserService } from '../../service/user.service'
import Layout from '../../../shared/layouts/admin/admin.component'
import Table from '../../../user/common/table.component';
import Paginator from '../../../shared/component/paginator.component'

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            isLoading: true,
            users: [],
            error: null,
            currentPage: 1,
            skip: 0,
            limit: 3,
            total: 0,
            searchText: ''
        };
    }

    componentDidMount() {
      let { type, skip, limit, currentPage, searchText } = this.state
      this.fetchUsers(type, skip, limit, currentPage, searchText);
    };

    onSearch = (str) => {
      let { type, skip, limit, currentPage, searchText } = this.state
      this.fetchUsers(type, skip, limit, currentPage, str.target.value)
    }

    pageChanged = (pager) => {
      let { type, skip, limit, searchText } = this.state
      this.setState({
        currentPage: pager.page
      })
      this.fetchUsers(type, skip, limit, pager.page, searchText)
    };

    fetchUsers(type = 'admin', skip = 0, limit = 10, currentPage = 1, searchText='') {
      let session = JSON.parse(localStorage.getItem('session'));
      if(session === null) {
          this.props.history.push('/login')
      } else {
        UserService.getusers({ pagenumber: currentPage})
        .then((response) => {
            this.setState({ 
                users: response.data.records,
                isLoading: false,
                total: response.data.total,
             })
        })
        .catch(error => this.setState({ error, isLoading: false }));
      }
    }

    render() {
        const { isLoading, users, error } = this.state;
        return (
          <Layout>
            <div className="app-title">
              <div>
                <h1><i className="fa fa-th-list"></i> User List</h1>
                <p>Table to display User data effectively</p>
              </div>
              <ul className="app-breadcrumb breadcrumb">
                <li className="breadcrumb-item">
                    <Link className="btn btn-primary" to="/user-create">Create User</Link>
                </li>
            </ul>
            </div>
              <div className="col-md-12">
                <div className="tile">
                <Table itemsPerPage={this.state.limit} currentPage={this.state.currentPage} search={this.onSearch} list={this.state.users} total={this.state.total}></Table>
                <Paginator
                  totalItems={this.state.total}
                  currentPage={this.state.currentPage}
                  maxPaginationLinkSize={3}
                  pageChanged={this.pageChanged}
                  itemsPerPage={this.state.limit}>
              </Paginator>
                </div>
              </div>
          </Layout>
        );
    }
}
export default UserList;