import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../global/Header.js';
import Footer from '../global/Footer.js';
import JobsPage from '../jobs/JobsPage.js';
import axios from 'axios';


class EmployeeDashboard extends React.Component { 

    constructor(props) {
        super(props);

        const token = localStorage.getItem('responseToken');
        const email = localStorage.getItem('responseEmail');
        this.state = {
            
            firstName: this.props.first_name,
            lastName: this.props.last_name,
            email: email,
            token: token,

        }
    }

 

    render() {
        return (
            <div>
                <Header/>
                <div id="employer-wrapper">
                    
                    <h1>Employee Dashboard</h1>
                    <section>
                        <h1>Profile:</h1>
                        <p>Firstname: {this.state.firstName}</p>
                        <p>Surname: {this.state.lastName}</p>
                        <p>Email: {this.state.email}</p>
                        <p>Token: {this.state.token} </p>

                    </section>
                        
                </div>
                <Footer/>
            </div>
        )
    }
}

export default EmployeeDashboard;