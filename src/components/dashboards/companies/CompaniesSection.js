import React from 'react';
import Company from './Company.js';
import axios from 'axios';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

class CompaniesSection extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            companies: [],
        }
    }

    componentWillMount() {
        const allUserCompaniesEndPoint = 'http://www.thenextstep.io/company/company/';
        axios({
            method: 'get',
            url: allUserCompaniesEndPoint, 
            data: {         
                },
            headers: {
                'Authorization': 'JWT '+localStorage.getItem('token')
                }, 
            responseType: 'json'
        })
        .then( response => { 
   
            if (response.status === 200) {

                this.setState({
                    companies: response.data
                });
           
                
            } else {

            }
        })
        .catch(error => {
            console.log("this is an error yo", error);
          })
    }

    render() {
        return (
            <section id="companies-section">
                <div id="companies-section-inner">
                    
                    <div id="create-new-company-container">
                        <div id="create-new-company-title">
                            <h1>Your Companies</h1>
                        </div>
                        <div id="create-new-company-link-container">
                            <Link to="/new_company"><button id="create-new-company-button">Create a New Company</button></Link>
                        </div>
                    </div>
                    
                    {this.state.companies ? this.state.companies.map((company) => <Company 
                                                                                    companyName={company.name} 
                                                                                    companyId={company.id} 
                                                                                    companyDescription={company.description} 
                                                                                    companyInfo={company} 
                                                                                    userCompanies={this.state.companies}/>) : <p></p>}
                    
                </div>
            </section>
        )
    }
}

export default CompaniesSection;