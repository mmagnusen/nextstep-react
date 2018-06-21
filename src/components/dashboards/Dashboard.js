import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../global/Header.js';
import Footer from '../global/Footer.js';
import CompaniesSection from './companies/CompaniesSection.js';
import ResumesSection from './resumes/ResumesSection.js';
import JobsSection from './jobs/JobsSection.js';
import DashboardProfile from './DashboardProfile.js';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Dashboard extends React.Component { 

    constructor(props) {
        super(props);

        this.handleLogOut = this.handleLogOut.bind(this);

        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        
        this.state = {
            redirectToHome: false,
            email: email,
            token: token,
            returnedResponse: null,
            saveChanges: false,
            pk: null,
        }
    }

    componentWillMount() {

        const getUserDataEndpoint = '/authenticate/current_user/';
        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';
        const token = localStorage.getItem('token');
        axios({
            method: 'get',
            url: getUserDataEndpoint,
            headers: {
                'Authorization': 'JWT '+ token
                }, 
            responseType: 'json'
        })
        .then( response => { 
            console.log(' componentWillMount, authenticate/current_user response:', response.data)

            if (response.status === 200) {
                this.setState({
                    returnedResponse: response.data,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    user_type: response.data.user_type,
                    token: response.data.token,
                    pk: response.data.pk,
                });
                localStorage.setItem('first_name', response.data.first_name);
                localStorage.setItem('last_name', response.data.last_name);
                localStorage.setItem('user_type', response.data.user_type);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('pk', response.data.pk);
                localStorage.setItem('tokenIsValid', true);

            } else {
                
            }
        })
        .catch(error => {
            console.log("this is an error yo", error);

            localStorage.clear();
                this.setState({
                    redirectToHome: true
                })

          })
    }

    handleLogOut() {
        localStorage.clear();
        this.setState({
            redirectToHome: true
        })
    }

    render() {
        if (this.state.redirectToHome) {
            return <Redirect to='/'/>
        } else {
            return (
                <div>
                    <Header/>
                    <div id="employer-wrapper">
                        <div id="employer-inner-wrapper">
                            <div id="logout"><button id="logout-button" onClick={this.handleLogOut}>Logout</button></div>
                            <DashboardProfile/>

                            { 
                                this.state.user_type == 'employer' ? <CompaniesSection/> : <ResumesSection/>
                            }
                            
                        </div>
                    </div>
                    <Footer/>
                </div>
            )

        }
        
    }
}



export default Dashboard;