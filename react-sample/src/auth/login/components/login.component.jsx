import React, {Component} from 'react';
import SimpleReactValidator from 'simple-react-validator';
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Layout from '../../../shared/layouts/auth/auth.component'
import { Auth } from '../../service/auth.service'
import { toast } from 'react-toastify';

class Login extends Component {
    constructor(props) {
      super(props);
      this.validator = new SimpleReactValidator({
        validators: {
            email: {  
              message: 'Enter valid email.',
              rule: (val, params, validator) => {
                return validator.helpers.testRegex(val,/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i) && params.indexOf(val) === -1
              }
            }
      }});
      this.state = {
        email: "",
        password: "",
        error: ""
      };
    }
  
    bindToInput(e) {
      this.setState({error : ""});
      let { name, value } = e.target
      this.setState({ [name]: value })
  }
  
  submit(event) {
    event.preventDefault();
    let { email, password } = this.state
    this.setState({ loading: true })
    if (this.validator.allValid()) {
      localStorage.removeItem('session')
      Auth.login({ email: email, password: password })
          .then((response) => {
              console.log(response)
              console.log(response.data.token)
              localStorage.setItem("session", JSON.stringify({
                user: response.data,
                token: response.data.token
            }));
            toast.success("Login Successfully.");
            this.props.history.push("/dashboard")
          })
          .finally(() => {
              this.setState({ loading: false })
          }).catch(err =>{
            toast.error("Invalid Credentails");
        });
      } else {
        this.validator.showMessages();
        this.forceUpdate();
      }
}
    
    render() {
      return (
        <Layout>
          <section className="material-half-bg">
            <div className="cover"></div>
          </section>
          <section className="login-content">
            <div className="logo">
              <h1>Tarun's React POC</h1>
            </div>
            <div className="login-box">
              <form className="login-form" onSubmit={(event) => this.submit(event)}>
                <h3>Sign In</h3>
                {this.state.error.length > 0 && <div className="form-group">
                    <label className="alert alert-danger" >{this.state.error}</label></div>}
                <div className="form-group">
                    <label className="control-label">Email address</label>
                    <input className="form-control" name ="email" type="email" placeholder="Enter email" value={this.state.email} onChange={(event) => this.bindToInput(event)} />
                </div>

                <div className="form-group">
                    <label className="control-label">Password</label>
                    <input className="form-control" name = "password" type="password" placeholder="Enter password" value={this.state.password} onChange={(event) => this.bindToInput(event)}/>
                </div>

                <div className="form-group">
                    <div className="utility">
                        <div className="animated-checkbox">

                        </div>
                        <p className="semibold-text mb-2"><a href="#" data-toggle="flip">Forgot Password ?</a></p>
                    </div>
                </div>
                <div className="form-group btn-container">
                  <Button className="btn btn-primary btn-block" type="submit" style={{ display: this.state.loading === true ? 'none' : 'block' }}>
                      <i className="fa fa-sign-in fa-lg fa-fw">
                      </i>SIGN IN
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
              </form>
              </div>
            </section>
          </Layout>
      )
    }
  }
  
  export default Login;