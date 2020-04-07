import React from 'react';
//import logo from './logo.svg';
import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import './App.css';
import Login from "./auth/login/components/login.component"
import UserList from "./userlisting/components/userlist.component"
import Dashboard from "./dashboard/components/dashboard.component"
import ChangePassword from "./auth/change-password/component/change-password.component"
function App() {
  return (
    <div className="app-routes">
      <Router>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/users" component={UserList} />
          <Route path="/changepassword" component={ChangePassword} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
