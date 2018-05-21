import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../global/Header.js';
import Footer from '../global/Footer.js';
import CompaniesSection from './companies/CompaniesSection.js';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class EmployerDashboard extends React.Component { 

    constructor(props) {
        super(props);

        this.handleLogOut = this.handleLogOut.bind(this);

        const token = localStorage.getItem('responseToken');
        const email = localStorage.getItem('responseEmail');

        const firstName = localStorage.getItem('responseEmail');
        const lastName = localStorage.getItem('responseEmail');
        this.state = {
            
            redirectToHome: false,
            firstName: null,
            lastName: null,
            email: email,
            token: token,
            returnedResponse: null
        }
    }

    componentWillMount() {

        const getUserDataEndpoint = 'http://127.0.0.1:8000/authenticate/current_user/';
        axios.defaults.headers.common['Authorization'] = this.state.token
        axios({
            method: 'get',
            url: getUserDataEndpoint , 
            data: {
                    email: this.state.email,
                    token: this.state.token,   
                },
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('responseToken')
                }, 
            responseType: 'json'
        })
        .then( response => { 
   
            if (response.status === 200) {
                this.setState({
                    returnedResponse: response,
                    firstName: response.data.first_name,
                    lastName: response.data.last_name,
                    email: response.data.email,
                    token: response.data.token
                });
           
                return true
            } else {

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
                    <div onClick={this.handleLogOut} id="logout"><button id="logout-button">Logout</button></div>
                    <section>
                        <h1>Profile:</h1>
                        <p>Firstname: {this.state.firstName}</p>
                        <p>Surname: {this.state.lastName}</p>
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