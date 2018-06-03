import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../global/Header.js';
import Footer from '../global/Footer.js';
import CompaniesSection from './companies/CompaniesSection.js';
import JobsSection from './jobs/JobsSection.js';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class EmployerDashboard extends React.Component { 

    constructor(props) {
        super(props);

        this.handleLogOut = this.handleLogOut.bind(this);

        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');

        const first_name = localStorage.getItem('first_name');
        const last_name = localStorage.getItem('last_name');
        
        this.state = {
            
            redirectToHome: false,
            first_name: first_name,
            last_name: last_name,
            email: email,
            token: token,
            returnedResponse: null
        }
    }

    componentWillMount() {

        const getUserDataEndpoint = 'http://127.0.0.1:8000/authenticate/current_user/';
        //axios.defaults.headers.common['Authorization'] = this.state.token
        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';
        axios({
            method: 'get',
            url: getUserDataEndpoint,
            headers: {
                'Authorization': 'JWT '+localStorage.getItem('token')
                }, 
            responseType: 'json'
        })
        .then( response => { 
            this.setState({
                returnedResponse: response
            });

            if (response.status === 200) {
                this.setState({
                    returnedResponse: response,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                });
                localStorage.setItem('first_name', response.data.first_name)
                localStorage.setItem('last_name', response.data.last_name);
            } else {
                localStorage.clear();
                this.setState({
                    redirectToHome: true
                })
            }
        })
        .catch(error => {
            console.log("this is an error yo", error);
          })
    }

    handleLogOut() {
        localStorage.clear();
        console.log('logging out...');
        this.setState({
            redirectToHome: true
        })
    }

    render() {
        if (this.state.redirectToHome) {
            return <Redirect to='/'/>
        }
        return (
            <div>
                <Header/>
                <div id="employer-wrapper">
                    
                    <h1>Employer Dashboard</h1>
                    <div id="logout"><button id="logout-button" onClick={this.handleLogOut}>Logout</button></div>
                    <section>
                        <h1>Profile:</h1>
                        <p>Firstname: {this.state.first_name}</p>
                        <p>Surname: {this.state.last_name}</p>
                        <p>Email: {this.state.email}</p>
                        <p>Token: {this.state.token} </p>
                    </section>
                    
                   <CompaniesSection/>

                </div>
                <Footer/>
            </div>
        )
    }
}



export default EmployerDashboard;