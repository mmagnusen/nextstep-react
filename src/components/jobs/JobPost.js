import React from 'react';
import ReactDOM from 'react-dom';
import SingleJob from './SingleJob.js';
import Header from '../global/Header.js';
import Footer from '../global/Footer.js';
import axios from 'axios';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

class JobPost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id
        }
    }

    componentWillMount() {

        const getSingleJobEndpoint = `/job/api/${this.state.id}/`;
        axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token')
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  
        axios({
            method: 'get',
            url: getSingleJobEndpoint, 
            headers: {
                'Authorization': 'JWT '+localStorage.getItem('token'),
                Accept: 'application/json'
                }, 
            responseType: 'json'
        })
        .then( response => { 
   
           this.setState({
               jobInfo: response.data
           })

           const givenContent = response.data.description;
           const parsedContent = JSON.parse(givenContent);
           const immutableContent = convertFromRaw(parsedContent);
           
           const jobHtml = stateToHTML(immutableContent);
            const jobOutputHtml = {__html: jobHtml}
            this.setState({
                jobHtml: jobHtml,
                jobOutputHtml: jobOutputHtml
            })
        })
        .then( () => {
            axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token')
            axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
            const existingCompanyEndPoint = `/company/api/${this.state.jobInfo.posted_by_company}/`;

            axios({
                method: 'get',
                url: existingCompanyEndPoint, 
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token'),
                     Accept: 'application/json'
                    }, 
                responseType: 'json'
            })
            .then( response => { 
       
                if (response.status === 200) {
    
                    this.setState({
                        companyInfo: response.data
                    });
    
                    const givenCompanyContent = response.data.description;
                    const parsedCompanyContent = JSON.parse(givenCompanyContent);
                    const immutableCompanyContent = convertFromRaw(parsedCompanyContent);
                    
                    const companyHtml = stateToHTML(immutableCompanyContent);
                     const companyOutputHtml = {__html: companyHtml}
                     this.setState({
                         companyHtml: companyHtml,
                         companyOutputHtml: companyOutputHtml,
                         companyName: response.data.name,
                     })
                }
            })
            .catch(error => {
                console.log("this is an error yo", error);
              });
        })
        .catch(error => {
            console.log("this is an error yo", error);
          })
    }

    render() {
            return (
                <div>
                    <Header/>
                    <div id="job-wrapper-outer">
                        {
                            this.state.companyInfo && 
                            <div id="company-details-on-job">
                                <section id="individual-company-logo-container">
                                    <img src={ this.state.companyInfo.large_logo } alt="company logo"/>
                                </section>
                                <section id="individual-company-details-container">
                                    <h1>{this.state.companyInfo.name}</h1>
                                    <div dangerouslySetInnerHTML={this.state.companyOutputHtml}></div>
                                </section>
                            </div>
                        }
                        {this.state.jobInfo &&
                        
                                <div id="job-wrapper">
                                    
                                        <section id="job-wrapper-header">
                                            <div id="job-wrapper-title">
                                                <h2>{this.state.jobInfo.title}</h2>
                                            </div>
                                            <div id="job-wrapper-slug">
                                                <h3>{this.state.jobInfo.slug}</h3>
                                            </div>
                                        </section>
                                        
                                        <section id="individual-job-details">
                                            <div>
                                                <p>Posted on:</p>
                                                <p>{this.state.jobInfo.created_date}</p>
                                            </div>
                                            <div>
                                                <p>Area:</p>
                                                <p>{this.state.jobInfo.area}</p>
                                            </div>
                                            <div>
                                                <p>Hours:</p>
                                                <p>{this.state.jobInfo.hours}</p>
                                            </div>
                                            <div>
                                                <p>Location:</p>
                                                <p>{this.state.jobInfo.location}</p>
                                            </div>
                                            <div>
                                                <p>Salary:</p>
                                                <p>{this.state.jobInfo.salary}</p>
                                            </div>
                                           
                                        </section>
                                        <div id="individual-job-title">
                                            <h3>Job Description:</h3>
                                        </div>
                                        <div dangerouslySetInnerHTML={this.state.jobOutputHtml}></div>
                        
                                </div> 
                        }
                       
                    </div>
                    <Footer/>
                </div>
    )
}
}

export default JobPost;