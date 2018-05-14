import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.js';
import Footer from './Footer.js';
import JobsPage from '../jobs/JobsPage.js';
import axios from 'axios';

class Register extends React.Component {

    constructor(props) {
        super(props);

        this.submitRegisterForm = this.submitRegisterForm.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

        this.state = {
            email: "",
            password: ""
        }
    }

    submitRegisterForm(e) {
        e.preventDefault();
        console.log('register form submitted');
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
        return (
            <div>
            <Header>
                    {this.props.children}
            </Header>
            <div id='register_wrapper'>
            <form onSubmit={ this.submitRegisterForm }>
                <fieldset>
                    <label for="email_field">Email:</label>
                    <input type="email" id="email_field" onChange={ this.handleEmailChange } value={ this.state.email }/>
                </fieldset>
                <fieldset>
                    <label for="password_field">Password:</label>
                    <input type="password" id="password_field" onChange={ this.handlePasswordChange } value={ this.state.password }/>
                </fieldset>
                <fieldset>
                    <input type="submit"/>
                </fieldset>
            </form>
        </div>
            <Footer/>
        </div>
        )
    }
}

export default Register;