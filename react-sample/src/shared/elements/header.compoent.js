
import React from 'react'
import { withRouter, Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown'

export default withRouter(class Header extends React.Component {

    constructor(props){
        super(props)
     }

     componentDidMount() {
        let session = JSON.parse(localStorage.getItem('session'));
        if(session === null) {
            this.props.history.push('/login')
        }
    };

     logout() {
         localStorage.removeItem('session')
         // Need to see how can we get the access to history here
         this.props.history.push('/login')
     }

     changePassword() {
        this.props.history.push('/changepassword')
     }

    render() {
        return (
            <header className="app-header">
                <Link className="app-header__logo" to="/">Auditor</Link>
                <Link className="app-sidebar__toggle" to="#"></Link>
                <ul className="app-nav">
                    <li className="dropdown">
                        <Dropdown>
                            <Dropdown.Toggle className="app-nav__item">
                                <i className="fa fa-user fa-lg"></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="dropdown-menu settings-menu dropdown-menu-right">
                                <Dropdown.Item as="button" onClick={ ()=> this.logout() }><i className="fa fa-sign-out fa-lg"></i> Logout</Dropdown.Item>
                                <Dropdown.Item as="button" onClick={ ()=> this.changePassword() }><i className="fa fa-eye fa-lg"></i> Change Password</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>
            </header>
        )
    }
})