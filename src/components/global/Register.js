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

        this.handleRegisterForm = this.handleRegisterForm.bind(this);
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
            redirectToDashboard: null,

            first_name_error: null,
            first_name_error_state: null,

            last_name_error: null,
            last_name_error_state: null,

            email_error: null,
            email_error_state: null,

            password_error: null,
            password_error_state: null,

            type_error: null,
            type_error_state: null,

            any_input_error: null,

        }
    }

    handleRegisterForm(e) {
        e.preventDefault();
       
        console.log('handling register form')

        if ( !this.state.first_name ) {

            this.setState({
                any_input_error: "error",
                first_name_error: "error",
            })

        } else if ( !this.state.last_name) {

            this.setState({
                any_input_error: "error",
                last_name_error: "error",
            })

        } else if ( !this.state.email ) {

            this.setState({
                any_input_error: "error",
                email_error: "error",
            })

        } else if (!this.state.password) {
        
            this.setState({
                any_input_error: "error",
                password_error: "error",
            })

        } else if ( !this.state.user_type ) {

            this.setState({
                any_input_error: "error",
                type_error: "error",
            })

        } else  {

          this.submitRegisterForm();

        }

        
    }

    submitRegisterForm(e) {

        console.log('submitting register form');

        const createUserEndpoint = "/authenticate/users/";

        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';

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
                console.log("201, user created");
                
                this.setState({
                    responseData: response.data
                });
           
                localStorage.setItem('first_name', response.data.first_name);
                localStorage.setItem('last_name', response.data.last_name);
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('token', response.data.token);
           
                
            } else {
                
            }
        })
        .then( () => {
            this.setState({
                redirectToDashboard: true,
            });
        })
        .catch(error => {
            console.log("this is an error yo", error);
          })
    }

    handleFirstNameChange(e) {
  
            this.setState({
                first_name: e.target.value,
                first_name_error: null,
                any_input_error: null
            })
    }

    handleLastNameChange(e) {
 
            this.setState({
                last_name: e.target.value,
                last_name_error: null,
                any_input_error: null
            })
    }

    handleEmailChange(e) {

            this.setState({
                email: e.target.value,
                email_error: null,
                any_input_error: null
            })
        
    }

    handlePasswordChange(e) {

            this.setState({
                password: e.target.value,
                password_error: null,
                any_input_error: null,
            })
        
    }

    handleUserTypeEmployee(e) {
        this.setState({
            user_type: "employee",
            any_input_error: null,
        })
    }

    handleUserTypeEmployer(e) {
        this.setState({
            user_type: "emmployer",
            any_input_error: null,
        })
    }


    render() {
        if (this.state.redirectToDashboard) {
            return <Redirect to='/dashboard'/>
        }
        return (
            <div id='register-wrapper'>
                <form onSubmit={ this.handleRegisterForm } id="register-form">
                    <div id="register-header">
                        <h1>Register</h1>
                    </div>
                    <div id="register-body">
                        <section className="register-fieldset">
                                <div className="register-label-container">
                                    <p>First Name</p>
                                </div>
                                <div className="register-input-container">
                                    <input type="text" name="first_name" id="id_first_name" className={ "register-input " + this.state.first_name_error_state } maxlength="32" onChange={this.handleFirstNameChange} value={this.state.first_name} />
                                </div>
                        </section>
                        <section className="register-fieldset">
                                <div className="register-label-container">
                                    <p>Last Name</p>
                                </div>
                                <div className="register-input-container">
                                    <input type="text" name="last_name" id="id_last_name" className={ "register-input " + this.state.last_name_error_state } onChange={this.handleLastNameChange} value={this.state.last_name} maxlength="32"/>
                                </div>
                        </section>
                        <section className="register-fieldset">
                                <div className="register-label-container">
                                    <p>Email:</p>
                                </div>
                                <div className="register-input-container">
                                    <input type="email" id="email_field" className={"register-input " + this.state.email_error_state } onChange={ this.handleEmailChange } value={ this.state.email }/>
                                </div>    
                        </section>
                        <section className="register-fieldset">
                                <div className="register-label-container">
                                    <p>Password:</p>
                                </div>
                                <div className="register-input-container">  
                                    <input type="password" id="password_field" className={"register-input " + this.state.password_error_state } onChange={ this.handlePasswordChange } value={ this.state.password }/>
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
                        { this.state.any_input_error && 

                            <div id="register-errors-container">
                                { 
                                    this.state.first_name_error &&
                                        <p>Please enter your first name</p>
                                }
        
                                {  
                                    this.state.last_name_error &&
                                        <p>Please enter your last name</p>
                                }
        
                                { 
                                    this.state.email_error &&
                                        <p>Please enter your email address</p>
                                }
        
                                { 
                                    this.state.password_error &&
                                        <p>Please enter a password</p>
                                }
        
                                { 
                                    this.state.type_error &&
                                        <p>Please select whether you're an employee or employer</p>
                                }
                            </div>

                        }
                  
                    </div>
                </form>
            </div>
        )
    }
}

export default Register;