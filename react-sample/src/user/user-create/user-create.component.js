
import React from 'react'
import { Link } from 'react-router-dom'
import Layout from './../../shared/layouts/admin/admin.component'
import UserForm from '../common/user-form.component'
import { UserService } from '../service/user.service'
/**
 * ../ means come out of current folder and look for different folder
 * ./ means src
 */
export class UserCreateComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            _id:'',
            first_name: '',
            last_name: '',
            email: '',
            contact: '',
            role: '',
            team: '',
            expertise: '',
        }
    }

    resetState() {
        this.setState({
            loading: false,
            first_name: '',
            last_name: '',
            email: '',
            contact: '',
            role: '',
            team: '',
            expertise: '',
        })
    }

    submit = (event) => {
        event.preventDefault();
        let { first_name, last_name, email, contact, role, team, expertise } = this.state
        this.setState({ loading: true })
        UserService.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            contact: contact,
            role: role,
            team: team,
            expertise: expertise
        })
            .then((response) => {
                this.resetState()
                this.props.history.push('/dynamicusers')
            })
            .catch((error) => {

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
                <div className="app-title">
                    <div className="div">
                        <h1><i className="fa fa-th-list"></i> Users Management</h1>
                        <p>All types of users listed here.</p>
                    </div>

                    <ul className="app-breadcrumb breadcrumb">
                        <li className="breadcrumb-item">
                            <Link className="btn btn-primary" to="/dynamicusers">Back to user Listing</Link>
                        </li>
                    </ul>
                </div>

                <div className="col-md-12">
                    <UserForm title={ 'Create User' } fields={this.state} stateUdateHandler={this.bindToInput} submitHandler={this.submit} ></UserForm>
                </div>
            </Layout>

        )
    }
}

export default UserCreateComponent;