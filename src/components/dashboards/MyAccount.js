import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../global/Header.js';
import Footer from '../global/Footer.js';
import JobsPage from '../jobs/JobsPage.js';
import Login from '../global/Login.js';
import Register from '../global/Register.js';
import axios from 'axios';

class MyAccount extends React.Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem('responseToken');
        this.showLogin = this.showLogin.bind(this);
        this.showRegister = this.showRegister.bind(this);

        this.state = {
            token: token,
            showTab: "login",
        }
    }

    showLogin() {
        this.setState({
                showTab: 'login',
              });
              console.log('showlogin');

    }

    showRegister() {
        this.setState({
            showTab: 'register',
          });
          console.log('showRegister');

    }

    componentWillMount() {
        if (this.state.token) {

        }
    }

    render() {
        return (
            <div>
                <Header/>
                <div id="my-account-container">
                    <div id="login-register-tabs">
                        <div onClick={ this.showLogin } className="account-tab" id="login-tab"><h2>Login</h2></div><div onClick={ this.showRegister } className="account-tab" id="register-tab"><h2>Register</h2></div>
                    </div>
                    {this.state.showTab == "login" ? <Login/> : <Register/>}
                </div>
                
                <Footer/>
            </div>
        )

    }
}

export default MyAccount;