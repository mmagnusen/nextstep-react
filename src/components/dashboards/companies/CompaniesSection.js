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
        const allUserCompaniesEndPoint = 'http://127.0.0.1:8000/company/company/';
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
            <section>
                <h1>Companies</h1>
                <div id="create-new-company-container">
                <Link to={{ pathname: "/new_job", state: {companiesFromLink: this.state.companies} }} id=""><button>New Job Page</button></Link>
                <Link to="/new_company" id="create-new-company-button"><button>New Company Page</button></Link>
                </div>
                
                {this.state.companies ? this.state.companies.map((company) => <Company 
                                                                                companyName={company.name} 
                                                                                companyId={company.id} 
                                                                                companyDescription={company.description} 
                                                                                companyInfo={company} 
                                                                                userCompanies={this.state.companies}/>) : <p></p>}
                
                
            </section>
        )
    }
}

export default CompaniesSection;