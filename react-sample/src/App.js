import React from 'react';
//import logo from './logo.svg';
import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import './App.css';
import Login from "./auth/login/components/login.component"
import UserList from "./user/userlisting/components/userlist.component"
import Dashboard from "./dashboard/components/dashboard.component"
import ChangePassword from "./user/change-password/component/change-password.component"
import DynamicUserList from "./user/userlisting/components/userlistdynamic.component"
import StaticUserList from "./user/userlisting/components/userlist-static.component"
import UserCreateComponent from "./user/user-create/user-create.component"
import UserUpdateComponent from "./user/user-update/update-user.component"
import PrivateRoute from "./shared/elements/PrivateRoute.component"
import PageNotFound from "./shared/elements/PageNotFound.component"
function App() {
  return (
    <div className="app-routes">
      <React.Fragment>  
        <ToastContainer></ToastContainer>    
        <Router>
          <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/users" component={UserList} />
            <PrivateRoute path="/changepassword" component={ChangePassword} />
            <PrivateRoute path="/dynamicusers" component={DynamicUserList} />
            <PrivateRoute path="/user-create" component={UserCreateComponent} />
            <PrivateRoute path="/staticusers" component={StaticUserList} />
            <PrivateRoute path="/users-update/:id" component={UserUpdateComponent} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Router>
      </React.Fragment>
    </div>
  );
}

export default App;
