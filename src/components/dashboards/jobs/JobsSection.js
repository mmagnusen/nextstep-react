import React from 'react';
import axios from 'axios';
import SingleDashboardJob from './SingleDashboardJob.js';

class CompaniesSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allUserJobs: [],

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
                    allUserJobs: response.data,
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
            <div>
                <h1>All User's Jobs</h1> 
                {
                    this.state.allUserJobs ? this.state.allUserJobs.map((job) => <SingleDashboardJob 
                    id={job.id}
                    area={job.area} 
                    created_date={job.created_date} 
                    description={job.description} 
                    experience={job.experience} 
                    hours={job.hours}
                    location={job.location}
                    posted_by_company={job.posted_by_company}
                    salary={job.salary}
                    slug={job.slug}
                    title={job.title} 
                    />) : <p>no</p>
                }
            </div>
        )    
    }
}

export default CompaniesSection;
