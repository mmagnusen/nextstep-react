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
            tempJobs: [
                {id: 1, jobTitle: "Fullstack Developer", jobHours: "Full-time", jobArea: "Front-End", jobCompany: "Monzo"},
                {id: 2, jobTitle: "Junior Designer", jobHours: "Part-time", jobArea: "Full-stack", jobCompany: "Facebook"},
                {id: 3, jobTitle: "Experienced CTO", jobHours: "Full-time", jobArea: "Designer", jobCompany: "Google"},
                {id: 4, jobTitle: "Front-end Lead", jobHours: "Part-time", jobArea: "Back-end", jobCompany: "Deliveroo"},
                {id: 5, jobTitle: "QA Tester", jobHours: "Full-time", jobArea: "Front-End", jobCompany: "Instagram"},
                {id: 6, jobTitle: "Fullstack Developer", jobHours: "Part-time", jobArea: "Back-end", jobCompany: "Twitter"},
                {id: 7, jobTitle: "Junior Designer", jobHours: "Full-time", jobArea: "Full-stack", jobCompany: "Apple"},
                {id: 8, jobTitle: "Experienced CTO", jobHours: "Part-time", jobArea: "Back-end", jobCompany: "Apple"},
                {id: 9, jobTitle: "Junior Designer", jobHours: "Full-time", jobArea: "Front-End", jobCompany: "Monzo"},
                {id: 10, jobTitle: "Front-end Lead", jobHours: "Part-time", jobArea: "Back-end", jobCompany: "Instagram"},
                {id: 11, jobTitle: "Fullstack Developer", jobHours: "Full-time", jobArea: "", jobCompany: "Deliveroo"},
                {id: 12, jobTitle: "Experienced CTO", jobHours: "Part-time", jobArea: "Designer", jobCompany: "Twitter"},
                {id: 13, jobTitle: "Front-end Lead", jobHours: "Full-time", jobArea: "Front-End", jobCompany: "Instagram"},
                {id: 14, jobTitle: "QA Tester", jobHours: "Part-time", jobArea: "", jobCompany: "Apple"},
                {id: 15, jobTitle: "Junior Designer", jobHours: "Full-time", jobArea: "Back-end", jobCompany: "Monzo"},
                {id: 16, jobTitle: "QA Tester", jobHours: "Part-time", jobArea: "Back-end", jobCompany: "Deliveroo"},
                {id: 17, jobTitle: "Fullstack Developer", jobHours: "Full-time", jobArea: "", jobCompany: "Instagram"},
                {id: 18, jobTitle: "Experienced CTO", jobHours: "Part-time", jobArea: "Front-End", jobCompany: "Google"},
                {id: 19, jobTitle: "Junior Designer", jobHours: "Full-time", jobArea: "Designer", jobCompany: "Apple"},
                {id: 20, jobTitle: "Front-end Lead", jobHours: "Part-time", jobArea: "Back-end", jobCompany: "Deliveroo"},
                {id: 21, jobTitle: "Fullstack Developer", jobHours: "Full-time", jobArea: "Back-end", jobCompany: "Monzo"},
                {id: 22, jobTitle: "Experienced CTO", jobHours: "Part-time", jobArea: "Front-End", jobCompany: "Twitter"},
                {id: 23, jobTitle: "Front-end Lead", jobHours: "Full-time", jobArea: "Designer", jobCompany: "Instagram"},
                {id: 24, jobTitle: "Junior Designer", jobHours: "Full-time", jobArea: "Back-end", jobCompany: "Google"},
                {id: 25, jobTitle: "Front-end Lead", jobHours: "Full-time", jobArea: "Back-end", jobCompany: "Google"},
                {id: 26, jobTitle: "Front-end Lead", jobHours: "Full-time", jobArea: "Designer", jobCompany: "Twitter"}

            ],

            
        }
    }

    componentDidMount() {
        const jobsEndPoint = 'http://127.0.0.1:8000/job/api/jobs/';

    axios.get(jobsEndPoint)
    .then( (response) => {



      if (response.data.length === 0) {
        console.log("there are no users that match your search");
      }
      this.setState({
        jobs: response.data
      });
      console.log(this.state.jobs);
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
                                                            jobCompany={job.posted_by_company}/></Link>)
                }
            </div>
        </div>
    );}
}

export default JobsPage;