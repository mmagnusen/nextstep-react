import React from 'react';
import ReactDOM from 'react-dom';
import SingleJob from './SingleJob.js';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import axios from 'axios';

class JobsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
        }
    }

    componentDidMount() {
        const jobsEndPoint = '/job/api/jobs/';

    axios.get(jobsEndPoint)
    .then( (response) => {



      if (response.data.length === 0) {
        console.log("there are no users that match your search");
      }
      this.setState({
        jobs: response.data
      });
  
    }
    ).catch((error) => {
      console.log(error);
    })
    }

        


    render() {
    return (
        <div id="jobs-page">
            <div id="jobs-page-title"><h1>TECH JOBS</h1></div>
            <div id="all-jobs">
                {
                    this.state.jobs.map((job) => <Link to={"/job_post/" + job.id} key={job.title}><SingleJob 
                                                          
                                                            jobTitle={job.title} 
                                                            jobHours={job.hours} 
                                                            jobArea={job.area} 
                                                            jobSlug={job.slug} 
                                                            jobLocation={job.location}
                                                            jobSalary={job.salary}
                                                            jobCompany={job.posted_by_company}
                                                            jobId={job.id}
                                                            jobExperience={job.experience}
                                                            /></Link>)
                }
            </div>
        </div>
    );}
}

export default JobsPage;