import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import Layout from './../../shared/layouts/admin/admin.component'
import UserForm from '../common/user-form.component'
import {UserService} from '../service/user.service'

 export default class UserUpdateComponent extends React.Component {
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
                    role: response.data.role.type,
                    team: response.data.team,
                    expertise: response.data.expertise,
                    loading: false
                })
            })
    }

    submit = (event) => {
        event.preventDefault();
        let { _id, first_name, last_name, contact, team, expertise } = this.state
        this.setState({ loading: true })
        UserService.update(_id, { first_name: first_name, last_name: last_name, contact: contact, team: team, expertise: expertise })
            .then((response) => {
                this.setState({ loading: false })
                toast.success("User information updated successfully.");
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            })
            .finally(() => {
                this.setState({ loading: false })
            });
    }

    bindToInput = (e) => {
        let { name, value } = e.target
        this.setState({ [name]: value })
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
                        <UserForm title={'Update User'} fields={this.state} stateUdateHandler={this.bindToInput} submitHandler={this.submit} ></UserForm>
                    </div>

                </div>
            </Layout>

        )
    }
}