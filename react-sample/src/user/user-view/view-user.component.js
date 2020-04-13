import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Layout from './../../shared/layouts/admin/admin.component'
import { UserService } from '../service/user.service'
import LoadingComponent from '../../shared/component/loading.compoent'

export default class ViewUserComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: '',
            loading: true,
            first_name: '',
            last_name: '',
            email: '',
            contact: '',
            role: '',
            team: '',
            expertise: '',
        }
    }

    componentDidMount() {
        UserService.get(this.props.match.params.id)
            .then((response) => {
                this.setState({
                    _id: response.data._id,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    email: response.data.email,
                    contact: response.data.contact,
                    role: response.data.role.title,
                    team: response.data.team,
                    expertise: response.data.expertise
                })
            })
            .finally(() => {
                this.setState({ loading: false })
            });
    }

    render() {
        return (
            <Layout>
                <div>
                    <div className="app-title">
                        <div className="div">
                            <h1><i className="fa fa-th-list"></i> Users Management</h1>
                            <p>All types of users listed here.</p>
                        </div>

                        <ul className="app-breadcrumb breadcrumb">
                            <li className="breadcrumb-item">
                                <Link className="btn btn-primary" to="/users-list">Back to user Listing</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-12">
                        <div className="tile">
                            <h3 className="tile-title">User Information</h3>
                            <div className="tile-body">
                                <table class="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <td> Name</td>
                                            <td> {this.state.first_name} {this.state.last_name}</td>
                                        </tr>
                                        <tr>
                                            <td> Email</td>
                                            <td> {this.state.email}</td>
                                        </tr>
                                        <tr>
                                            <td> Role</td>
                                            <td> {this.state.role}</td>
                                        </tr>
                                        <tr>
                                            <td> Contact Number</td>
                                            <td> {this.state.contact}</td>
                                        </tr>
                                        <tr>
                                            <td> Team</td>
                                            <td> {this.state.team}</td>
                                        </tr>
                                        <tr>
                                            <td> Expertise</td>
                                            <td> {this.state.expertise}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <LoadingComponent loading={this.state.loading}></LoadingComponent>
                        </div>

                    </div>
                </div>
            </Layout>
        )
    }
}