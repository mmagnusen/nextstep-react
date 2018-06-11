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
            redirectToDashboard: false
        }
    }


    submitLoginForm(e) {
        const loginEndpoint = 'http://127.0.0.1:8000/token-auth/';

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
                console.log(this.state.responseData);

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
            return <Redirect to='/employer_dashboard'/>
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
                            <fieldset>
                                <label for="email_field">Email</label>
                                <input type="email" id="email_field" onChange={this.handleEmailChange} className="login-input login-input-one"/>
                            </fieldset>
                            <fieldset>
                                <label for="password_field">Password</label>
                                <input type="password" id="password_field" onChange={this.handlePasswordChange} className="login-input login-input-two"/>
                            </fieldset>
                            <fieldset>
                                <input type="submit" id="login-submit"/>
                            </fieldset>
                        </div>
                    </form>
                </div>
        )
        }
       
    }
}


export default Login;