import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from './Header.js';
import Footer from './Footer.js';
import JobsPage from '../jobs/JobsPage.js';
import axios from 'axios';

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.submitLoginForm = this.submitLoginForm.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

        this.state = {
            email: "",
            password: "",
            responseData: {},
            redirectToDashboard: null
        }
    }


    submitLoginForm(e) {
        const loginEndpoint = '/token-auth/';

        e.preventDefault();

        axios({
            method: 'post',
            url: loginEndpoint, 
            data: {
                    email: this.state.email,
                    password: this.state.password
                },
            responseType: 'json'
        })
        .then( response => { 
   
            if (response.status === 200) {
               
                this.setState({
                    responseData: response.data
                });
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('email', response.data.user.email);
                console.log("response from /token-auth/ is " + this.state.responseData);

                this.setState({
                    redirectToDashboard: true
                });
            } else {

            }
        })
        .catch(error => {
            console.log("this is an error yo", error);
            this.setState({
                error: error
            });
          })
    }

    handleEmailChange(e) {
        e.preventDefault();
        this.setState({
            email: e.target.value
        });
    }

    handlePasswordChange(e) {
        e.preventDefault();
        this.setState({
            password: e.target.value
        });
    }

    render() {
        if (this.state.redirectToDashboard) {
            return <Redirect to='/dashboard'/>
        } else {
            return (         
                <div id='login-wrapper'>
                    <form onSubmit={this.submitLoginForm} id="login-form">
                        <div id="login-header">
                            <h1>Login</h1>
                        </div>
                        <div id="login-body">
                            {
                             this.state.error &&   <div id="login-error">
                                <p>Email or password incorrect. Please try again or contact marilyn@thenextstep.io if you are having trouble logging in</p>
                            </div>
                            }
                            <section>
                                <div className="login-label-container">
                                    <p>Email</p>
                                </div>
                                <div className="login-input-container">
                                    <input type="email" id="email_field" onChange={this.handleEmailChange} className="login-input"/>
                                </div>
                            </section>
                            <section>
                                <div className="login-label-container">
                                    <p>Password</p>
                                </div>
                                <div className="login-input-container">
                                    <input type="password" id="password_field" onChange={this.handlePasswordChange} className="login-input"/>
                                </div>
                            </section>
                            <div>
                                <input type="submit" id="login-submit"/>
                            </div>
                        </div>
                    </form>
                </div>
        )
        }
       
    }
}


export default Login;