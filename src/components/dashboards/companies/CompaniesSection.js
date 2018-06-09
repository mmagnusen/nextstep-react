import React from 'react';
import Company from './Company.js';
import NewCompanyModal from './NewCompanyModal.js';
import NewJobModal from '../jobs/NewJobModal.js';
import axios from 'axios';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

class CompaniesSection extends React.Component {
    constructor(props) {
        super(props);
        
        this.createNewCompany = this.createNewCompany.bind(this);
        this.createNewJob = this.createNewJob.bind(this);

        this.closeNewCompanyModal = this.closeNewCompanyModal.bind(this);
        this.closeNewJobModal = this.closeNewJobModal.bind(this);

        this.state = {
            companies: [],
            newCompanyModalIsOpen: false,
            newJobModalIsOpen: false,
        }
    }

    createNewCompany() {
        this.setState({
            newCompanyModalIsOpen: true
        })
    }

    createNewJob() {
        this.setState({
            newJobModalIsOpen: true
        })
    }

    closeNewCompanyModal() {
        this.setState({
            newCompanyModalIsOpen: false
        })
    }

    closeNewJobModal() {
        this.setState({
            newJobModalIsOpen: false
        })
    }

    componentWillMount() {
        const allUserCompaniesEndPoint = 'http://127.0.0.1:8000/company/company/';
        axios({
            method: 'get',
            url: allUserCompaniesEndPoint, 
            data: {         
                },
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('responseToken')
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
                <Link to="/new_job" id=""><button>New Job Page</button></Link>
                <Link to="/new_company" id="create-new-company-button"><button>New Company Page</button></Link>
                </div>
                
                {this.state.companies ? this.state.companies.map((company) => <Company companyName={company.name} companyId={company.id} companyDescription={company.description} companyInfo={company}/>) : <p></p>}
                <NewCompanyModal newCompanyModalIsOpen={this.state.newCompanyModalIsOpen} closeNewCompanyModal={this.closeNewCompanyModal}/>
                <NewJobModal newJobModalIsOpen={this.state.newJobModalIsOpen} closeNewJobModal={this.closeNewJobModal} />
            </section>
        )
    }
}

export default CompaniesSection;