import React from 'react';
import axios from 'axios';
import SingleDashboardJob from '../jobs/SingleDashboardJob.js';
import ViewCompanyModal from './ViewCompanyModal.js';
import { filter } from 'rxjs/operator/filter';

class Company extends React.Component {
    constructor(props) {
        super(props);
        this.viewExistingCompany = this.viewExistingCompany.bind(this);
        this.closeViewCompanyModal = this.closeViewCompanyModal.bind(this);
        this.filterJobs = this.filterJobs.bind(this);

        this.state = {
            viewCompanyModalIsOpen: false,
            companyName: this.props.companyName,
            companyDescription: this.props.companyDescription,
            companyId: this.props.companyId,
            allJobs: [],
            filteredJobs: [],
            }

           
        
    }

    componentWillMount() {
        const getJobsEndpoint = 'http://127.0.0.1:8000/job/job/';

        axios({
            method: 'get',
            url: getJobsEndpoint, 
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('responseToken')
                }, 
            responseType: 'json'
        })
        .then( response => { 
            if (response.status === 200) {
                this.setState({
                    allJobs: response.data,
                });
           
            } else {

            }

            this.filterJobs();
        })
        .catch(error => {
            console.log("this is an error yo", error);
          })
    }

    viewExistingCompany() {
        this.setState({
            viewCompanyModalIsOpen: true
        })
        console.log('open company modal');
    }

    closeViewCompanyModal() {
        this.setState({
            viewCompanyModalIsOpen: false
        })
    }

    filterJobs(e) {
        e.preventDefault();
        const filteredJobs = this.state.allJobs.filter((job) => job.posted_by_company == this.state.companyId );
        console.log('filtered jobs:', filteredJobs);
        this.setState({
            filteredJobs: filteredJobs
        });
    }





    render() {
        return (
            <div className="single-company">
                <div className="company-header">
                    <h2>{this.state.companyName}, {this.state.companyId}</h2>
                    <div className="button-container"><button className="delete-company-button" onClick={this.viewExistingCompany}>View Company</button></div><button onClick={this.filterJobs}>Filter Jobs</button>
                </div>
                
                <section>
                    <div className="company-postings-title">
                        <h1>Job Postings for company: {this.state.companyName}</h1>
                    </div>
                    {this.state.filteredJobs ? this.state.filteredJobs.map((job) => <SingleDashboardJob 
                        title={job.title} 
                        posted_by_company={job.posted_by_company}
                        area={job.area}
                        created_date={job.created_date}
                        description={job.description}
                        experience={job.experience}
                        hours={job.hours}
                        location={job.location}
                        posted_by_company={job.posted_by_company}
                        salary={job.salary}
                        slug={job.slug}
                        id={job.id}
                        />) : <p>no</p>}
                </section>   
                <ViewCompanyModal viewCompanyModalIsOpen={this.state.viewCompanyModalIsOpen} closeViewCompanyModal={this.closeViewCompanyModal} companyName={this.state.companyName} companyDescription={this.state.companyDescription} companyId={this.state.companyId}/> 
            </div>
        )
    }
}

export default Company;