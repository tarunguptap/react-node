
import React from 'react'
import Audit from "./audit.png"
import { Link, withRouter } from "react-router-dom";

export default withRouter(class Sidebar extends React.Component {
    state = {
        user: JSON.parse(localStorage.getItem('session')).user
    }

    userlist() {
        this.props.history.push('/users')        
    }
    dashboard() {
        this.props.history.push('/dashboard')        
    }

    componentDidMount() {
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
                        <li className="app-menu__item">
                            <i className="app-menu__icon fa fa-dashboard"></i>
                            <span className="app-menu__label" onClick={ ()=> this.dashboard() }>Dashboard </span>
                        </li>
                        <li className="app-menu__item">
                            <i className="app-menu__icon fa fa-dashboard"></i>
                            <span className="app-menu__label" onClick={ ()=> this.userlist() }>Users </span>
                        </li>
                    </ul>
                </aside>
            </React.Fragment>
        )
    }
})