import React from 'react';
import Company from './Company.js';
import NewCompanyModal from './NewCompanyModal.js';
import axios from 'axios';

class CompaniesSection extends React.Component {
    constructor(props) {
        super(props);
        
        this.createNewCompany = this.createNewCompany.bind(this);
        this.closeNewCompanyModal = this.closeNewCompanyModal.bind(this);

        this.state = {
            companies: [],
            newCompanyModalIsOpen: false,
        }
    }

    createNewCompany() {
        this.setState({
            newCompanyModalIsOpen: true
        })
        console.log('open company modal');
    }

    closeNewCompanyModal() {
        this.setState({
            newCompanyModalIsOpen: false
        })
    }

    componentWillMount() {
        const allUserCompaniesEndPoint = 'http://127.0.0.1:8000/company/user_view';
        axios({
            method: 'get',
            url: allUserCompaniesEndPoint, 
            data: {         
                },
            responseType: 'json'
        })
        .then( response => { 
   
            if (response.status === 200) {

                this.setState({
                    companies: response.data
                });
           
                return <Redirect to='/employer_dashboard'/>
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
                <div id="create-new-company-container"><button id="create-new-company-button" onClick={this.createNewCompany}>Create new company</button></div>
                {this.state.companies.map((company) => <Company title={company.name}/>)}
                <NewCompanyModal newCompanyModalIsOpen={this.state.newCompanyModalIsOpen} closeNewCompanyModal={this.closeNewCompanyModal}/>
            </section>
        )
    }
}

export default CompaniesSection;