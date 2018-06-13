import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import Header from './Header.js';
import Footer from './Footer.js';
import JobsPage from '../jobs/JobsPage.js';
import axios from 'axios';

class Register extends React.Component {

    constructor(props) {
        super(props);

        this.submitRegisterForm = this.submitRegisterForm.bind(this);
        this.handleFirstNameChange =   this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUserTypeEmployee = this.handleUserTypeEmployee.bind(this);
        this.handleUserTypeEmployer = this.handleUserTypeEmployer.bind(this);

        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            user_type: "",
            redirectToDashboard: false

        }
    }

    submitRegisterForm(e) {
        e.preventDefault();
        const createUserEndpoint = "http://127.0.0.1:8000/authenticate/users/";

        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';


        if ( !this.state.email ) {
            console.log("email cannot be empty");
        } else if (!this.state.password) {
            console.log("");
        } else {
            console.log("");
        }

        axios({
            method: 'post',
            url: createUserEndpoint, 
            data: {
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    email: this.state.email,
                    password: this.state.password,
                    user_type: this.state.user_type
                   
                },
            responseType: 'json'
        })
        .then( response => { 
   
            if (response.status === 201) {
                console.log("good email and password");
                
                this.setState({
                    responseData: response.data
                });
           
                localStorage.setItem('first_name', response.data.first_name);
                localStorage.setItem('last_name', response.data.last_name);
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('token', response.data.token);
           
                this.setState({
                    redirectToDashboard: true
                });

            } else {

            }
        })
        .catch(error => {
            console.log("this is an error yo", error);
          })
    }

    handleFirstNameChange(e) {
        this.setState({
            first_name: e.target.value
        })
    }

    handleLastNameChange(e) {
        this.setState({
            last_name: e.target.value
        })
    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        })
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    handleUserTypeEmployee(e) {
        this.setState({
            user_type: "employee"
        })
    }

    handleUserTypeEmployer(e) {
        this.setState({
            user_type: "emmployer"
        })
    }


    render() {
        if (this.state.redirectToDashboard) {
            return <Redirect to='/employer_dashboard'/>
        }
        return (
            <div id='register-wrapper'>
                <form onSubmit={ this.submitRegisterForm } id="register-form">
                    <div id="register-header">
                        <h1>Register</h1>
                    </div>
                    <div id="register-body">
                        <section className="register-fieldset">
                                <div className="register-label-container">
                                    <p>First Name</p>
                                </div>
                                <div className="register-input-container">
                                    <input type="text" name="first_name" id="id_first_name" className="register-input" maxlength="32" onChange={this.handleFirstNameChange} value={this.state.first_name} />
                                </div>
                        </section>
                        <section className="register-fieldset">
                                <div className="register-label-container">
                                    <p>Last Name</p>
                                </div>
                                <div className="register-input-container">
                                    <input type="text" name="last_name" id="id_last_name" className="register-input" onChange={this.handleLastNameChange} value={this.state.last_name} maxlength="32"/>
                                </div>
                        </section>
                        <section className="register-fieldset">
                                <div className="register-label-container">
                                    <p>Email:</p>
                                </div>
                                <div className="register-input-container">
                                    <input type="email" id="email_field" onChange={ this.handleEmailChange } value={ this.state.email } className="register-input"/>
                                </div>    
                        </section>
                        <section className="register-fieldset">
                                <div className="register-label-container">
                                    <p>Password:</p>
                                </div>
                                <div className="register-input-container">  
                                    <input type="password" id="password_field" onChange={ this.handlePasswordChange } value={ this.state.password } className="register-input"/>
                                </div>
                        </section>
                        <fieldset>
                            <p>Are you an:</p>
                            <div id="employee-employer-container">
                                <div className="employee-employer-choice">
                                    <p>Employee</p>
                                    <input type="radio" name="user_type" value="employee" id="typeEmployee" onChange={ this.handleUserTypeEmployee }/>
                                </div>
                                <div className="employee-employer-choice">
                                    <p>Employer</p>
                                    <input type="radio" name="user_type" value="employer" id="typeEmployer" onChange={ this.handleUserTypeEmployer }/>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <input type="submit" id="register-submit"/>
                        </fieldset>
                    </div>
                </form>
            </div>
        )
    }
}

export default Register;