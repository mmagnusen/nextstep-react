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
                    redirectToDashboard: true
                });
                this.setState({
                    responseData: response.data
                });
                localStorage.setItem('responseToken', response.data.token);
                localStorage.setItem('responseEmail', response.data.user.email);
                console.log(this.state.responseData);
           
                return <Redirect to='/employer_dashboard'/>;
            } else {

            }
        })
        .catch(error => {
            console.log("this is an error yo", error);
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
        }
        return (         
                <div id='login-wrapper'>
                    <form onSubmit={this.submitLoginForm} id="login-form">
                        <div id="login-header">
                            <h1>Login</h1>
                        </div>
                        <div id="login-body">
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


export default Login;