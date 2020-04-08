
import React from 'react'
import Audit from "./audit.png"
import { Link, withRouter } from "react-router-dom";

export default withRouter(class Sidebar extends React.Component {
    state = {
        user: ""
    }

    userlist() {
        this.props.history.push('/users')        
    }

    userlistdynamic() {
        this.props.history.push('/dynamicusers')        
    }
    dashboard() {
        this.props.history.push('/dashboard')        
    }

    componentDidMount() {
        let session = JSON.parse(localStorage.getItem('session'));
        if(session === null) {
            this.props.history.push('/login')
        } else {
            this.state.user = JSON.parse(localStorage.getItem('session')).user
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
                        <li className="app-menu__item">
                            <i className="app-menu__icon fa fa-dashboard"></i>
                            <span className="app-menu__label" onClick={ ()=> this.dashboard() }>Dashboard </span>
                        </li>
                        <li className="app-menu__item">
                            <i className="app-menu__icon fa fa-dashboard"></i>
                            <span className="app-menu__label" onClick={ ()=> this.userlist() }>Users </span>
                        </li>
                        <li className="app-menu__item">
                            <i className="app-menu__icon fa fa-dashboard"></i>
                            <span className="app-menu__label" onClick={ ()=> this.userlistdynamic() }>Dynamic Users </span>
                        </li>
                    </ul>
                </aside>
            </React.Fragment>
        )
    }
})