import React, { Component } from 'react';
import Layout from '../../../shared/layouts/admin/admin.component'
import { UserService } from '../../service/user.service'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { toast } from 'react-toastify';

class ChangePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {  
            loading: false,
            currentpassword:"",
            newpassword:"",
            confirmpassword:"",
            error: ""
        }
    }

    bindToInput(e) {
        this.setState({error : ""});
        let { name, value } = e.target
        this.setState({ [name]: value })
    }

    submit(event) {
        event.preventDefault();
        let { currentpassword, newpassword, confirmpassword } = this.state
        if(newpassword === "" || confirmpassword === "" || currentpassword === "") {
            this.setState({error : "All fields are mandatory"});
        } else if (newpassword !== confirmpassword) {
            this.setState({error : "New Password and Confirm Password doesnot match"});
        } else {
            UserService.changepassword({ currentpassword: currentpassword, newpassword: newpassword })
          .then((response) => {
              console.log(response)
              this.props.history.push("/dashboard")
              toast.success("Password changed successfully.") // Need to add toast code
          }).catch(err =>{
            this.setState({error : "Invalid Credentails"});
        }).finally(() => {
              this.setState({ loading: false })
          });
        }
    }

    render() { 
        return (  
            <Layout>
                <main class="app-content">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="tile">
                                <h3 class="tile-title">Change Password</h3>
                                <div class="tile-body">
                                    <form className="login-form" onSubmit={(event) => this.submit(event)}>
                                    {this.state.error.length > 0 && <div className="form-group">
                                        <label className="alert alert-danger" >{this.state.error}</label></div>}
                                        <div className="form-group">
                                            <label className="control-label">Current Password</label>
                                            <input className="form-control" name="currentpassword" type="password" placeholder="Enter Current Password" value={this.state.password} onChange={(event) => this.bindToInput(event)}></input>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">New Password</label>
                                            <input className="form-control" name="newpassword" type="password" placeholder="Enter New Password" value={this.state.password} onChange={(event) => this.bindToInput(event)}></input>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">Re-enter Password</label>
                                            <input className="form-control" name="confirmpassword" type="password" placeholder="Re-enter Password" value={this.state.password} onChange={(event) => this.bindToInput(event)}></input>
                                        </div>
                                        <div className="tile-footer">
                                            <div className="form-group btn-container">
                                                <Button className="btn btn-primary btn-block" type="submit" style={{ display: this.state.loading === true ? 'none' : 'block' }}>
                                                    <i className="fa fa-sign-in fa-lg fa-fw">
                                                    </i>Submit
                                                </Button>
                                                <Button type="submit" className="btn btn-primary btn-block" disabled style={{ display: this.state.loading === true ? 'block' : 'none' }}>
                                                    <Spinner
                                                        as="span"
                                                        animation="grow"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                    />
                                                    Loading...
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </Layout>
        );
    }
}
 
export default ChangePassword;