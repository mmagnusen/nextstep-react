import React from 'react';
import ReactDOM from 'react-dom';
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
            password: ""
        }
    }

    submitLoginFormOne(e) {
        const loginEndpoint = 'http://127.0.0.1:8000/authenticate/api_users/';
        const loginEndpointTwo = 'http://127.0.0.1:8000/job/api/jobs/';

        e.preventDefault();

        axios({
            method: 'post',
            url: loginEndpoint, 
            data: {
                    email: "marilyn@thenextstep.io",
                    name: "saymyname"
                },
            responseType: 'json'
        })
        .then( (response) => { 
     
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
          })
    }

    submitLoginFormTwo(e) {
        const loginEndpoint = 'http://127.0.0.1:8000/authenticate/api_users/';
        const loginEndpointTwo = 'http://127.0.0.1:8000/job/api/jobs/';

        e.preventDefault();

        axios({
            method: 'post',
            url: loginEndpoint, 
            data: {
                    email: "marilyn@thenextstep.io",
                    name: "saymyname"
                },
            responseType: 'json'
        })
        .then( (response) => { 
     
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
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
        return (
            <div>
                <Header>
                        {this.props.children}
                </Header>
                <div id='login-wrapper'>
                    <form onSubmit={this.submitLoginFormOne} id="login-form">
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
                <Footer/>
            </div>
        )
    }
}


export default Login;