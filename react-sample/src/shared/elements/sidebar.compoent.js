
import React from 'react'
import Audit from "./audit.png"
import { NavLink, withRouter } from "react-router-dom";

export default withRouter(class Sidebar extends React.Component {
    state = {
        user: JSON.parse(localStorage.getItem('session')).user
    }

    componentDidMount() {
        let session = JSON.parse(localStorage.getItem('session'));
        if(session === null) {
            this.props.history.push('/login')
        } 
    }
    render() {
        return (
            <React.Fragment>
                <div className="app-sidebar__overlay" data-toggle="sidebar"></div>
                <aside className="app-sidebar">
                    <div className="app-sidebar__user"><img className="app-sidebar__user-avatar" src={Audit } alt="Audit" />
                        <div>
                            <p className="app-sidebar__user-name">{this.state.user.username}</p>
                            <p className="app-sidebar__user-designation">{this.state.user.email}</p>
                        </div>
                    </div>
                    <ul className="app-menu">
                        <NavLink exact className="app-menu__item" to="/dashboard">
                            <i className="app-menu__icon fa fa-dashboard"></i>
                                <span className="app-menu__label">Dashboard</span>
                        </NavLink>
                        <NavLink exact className="app-menu__item" to="/users">
                            <i className="app-menu__icon fa fa-dashboard"></i>
                                <span className="app-menu__label">Users</span>
                        </NavLink>
                        <NavLink exact className="app-menu__item" to="/staticusers">
                            <i className="app-menu__icon fa fa-dashboard"></i>
                                <span className="app-menu__label">Static Users</span>
                        </NavLink>
                        <NavLink exact className="app-menu__item" to="/dynamicusers">
                            <i className="app-menu__icon fa fa-dashboard"></i>
                                <span className="app-menu__label">Dynamic Users</span>
                        </NavLink>
                    </ul>
                </aside>
            </React.Fragment>
        )
    }
})