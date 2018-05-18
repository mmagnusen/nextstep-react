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

        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            occupation: "",
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
                   
                },
            responseType: 'json'
        })
        .then( response => { 
   
            if (response.status === 201) {
                console.log("good email and password");
                this.setState({
                    redirectToDashboard: true
                })
           
                return <Redirect to='/employer_dashboard'/>
            } else {

            }
        })
        .catch(error => {
            console.log("this is an error yo", error);
          })
    }

    handleFirstNameChange(e) {
        this.setState({
            firstName: e.target.value
        })
    }

    handleLastNameChange(e) {
        this.setState({
            lastName: e.target.value
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


    render() {
        if (this.state.redirectToDashboard) {
            return <Redirect to='/employer_dashboard'/>
        }
        return (
            <div>
            <Header>
                    {this.props.children}
            </Header>
            <div id='register_wrapper'>
            <form onSubmit={ this.submitRegisterForm } id="register-form">
                <div id="register-header">
                    <h1>Register</h1>
                </div>
                <div id="register-body">
                    <fieldset>
                        <label for="id_first_name">First Name</label>
                        <input type="text" name="first_name" id="id_first_name" className="register-input" maxlength="32" onChange={this.handleFirstNameChange} value={this.state.firstName} />
                    </fieldset>
                    <fieldset>
                        <label for="id_last_name">Last Name</label>
                        <input type="text" name="last_name" id="id_last_name" className="register-input" onChange={this.handleLastNameChange} value={this.state.lastName} maxlength="32"/>
                    </fieldset>
                    <fieldset>
                        <label for="email_field">Email:</label>
                        <input type="email" id="email_field" onChange={ this.handleEmailChange } value={ this.state.email } className="register-input register-input-one"/>
                    </fieldset>
                    <fieldset>
                        <label for="password_field">Password:</label>
                        <input type="password" id="password_field" onChange={ this.handlePasswordChange } value={ this.state.password } className="register-input register-input-two"/>
                    </fieldset>
                    <fieldset>
                        <p>Are you an:</p>
                        <div>
                            <label for="typeEmployee">Employee</label>
                            <input type="radio" name="user_type" value="employee" id="typeEmployee" />
                        </div>
                        <div>
                            <label for="typeEmployer">Employer</label>
                            <input type="radio" name="user_type" value="employer" id="typeEmployer" />
                        </div>
                    </fieldset>
                    <fieldset>
                        <input type="submit" id="register-submit"/>
                    </fieldset>
                </div>
            </form>
        </div>
            <Footer/>
        </div>
        )
    }
}

export default Register;