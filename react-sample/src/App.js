import React from 'react';
//import logo from './logo.svg';
import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import './App.css';
import Login from "./auth/login/components/login.component"
import UserList from "./user/userlisting/components/userlist.component"
import Dashboard from "./dashboard/components/dashboard.component"
import ChangePassword from "./user/change-password/component/change-password.component"
import DynamicUserList from "./user/userlisting/components/userlistdynamic.component"
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
          <Route path="/dynamicusers" component={DynamicUserList} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
