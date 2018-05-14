import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../global/Header.js';
import Footer from '../global/Footer.js';
import JobEditModal from './JobEditModal.js';
import axios from 'axios';


class EmployerDashboard extends React.Component { 

    constructor(props) {
        super(props);
        this.openJobModal = this.openJobModal.bind(this);
        this.closeJobModal = this.closeJobModal.bind(this);
        this.state = {
            
            firstName: "Marilyn",
            lastName: "Magnusen",
            email: "m-mags@hotmail.co.uk",
            isOpen: false
        }
    }

    openJobModal() {
        this.setState({
            isOpen: true
        })
    }

    closeJobModal() {
        this.setState({
            isOpen: false
        })
    }

    render() {
        return (
            <div>
                <Header/>
                <div id="employer-wrapper">
                    
                    <h1>Employer Dashboard</h1>
                    <section>
                        <h1>Profile:</h1>
                        <p>Firstname: {this.state.firstName}</p>
                        <p>Surname: {this.state.lastName}</p>
                        <p>Email: {this.state.email}</p>

                    </section>
                    <section>
                        <h1>Companies</h1>
                        <button>Create new company</button>
                    </section>
                    <section>
                        <h1>Job Postings</h1>
                        <JobEditModal isOpen={this.state.isOpen} closeJobModal={this.closeJobModal}/>
                        <button onClick={this.openJobModal}>Edit Job</button>
                    </section>     
                </div>
                <Footer/>
            </div>
        )
    }
}



export default EmployerDashboard;