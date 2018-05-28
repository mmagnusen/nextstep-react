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

        const getSingleJobEndpoint = `http://localhost:8000/job/job/${this.state.id}/`;
        axios.defaults.baseURL = 'https://api.example.com';
        axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('responseToken')
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  
        axios({
            method: 'get',
            url: getSingleJobEndpoint, 
            headers: {
                'Authorization': 'JWT '+localStorage.getItem('responseToken'),
                Accept: 'application/json'
                }, 
            responseType: 'json'
        })
        .then( response => { 
   
           this.setState({
               jobInfo: response.data
           })
           console.log(response.data);

           const givenContent = response.data.description;
           const parsedContent = JSON.parse(givenContent);
           const immutableContent = convertFromRaw(parsedContent);
           
           const jobHtml = stateToHTML(immutableContent);
            const jobOutputHtml = {__html: jobHtml}
            this.setState({
                jobHtml: jobHtml,
                jobOutputHtml: jobOutputHtml
            })
            console.log('complete state:', this.state);
        })
        .catch(error => {
            console.log("this is an error yo", error);
          })
    }

    componentDidMount() {
        const getSingleJobEndpoint = `http://localhost:8000/job/job/${this.state.id}/`;
        axios.defaults.baseURL = 'https://api.example.com';
        axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('responseToken')
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        const singleCompanyEndpoint = `http://127.0.0.1:8000/company/company/${30}/`;
        axios({
            method: 'get',
            url: singleCompanyEndpoint, 
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('responseToken'),
                 Accept: 'application/json'
                }, 
            responseType: 'json'
        })
        .then( response => { 
   
            if (response.status === 200) {

                this.setState({
                    companyInfo: response.data
                });
                console.log('response from company', response.data);

                const givenCompanyContent = response.data.description;
                const parsedCompanyContent = JSON.parse(givenCompanyContent);
                const immutableCompanyContent = convertFromRaw(parsedCompanyContent);
                
                const companyHtml = stateToHTML(immutableCompanyContent);
                 const companyOutputHtml = {__html: companyHtml}
                 this.setState({
                     companyHtml: companyHtml,
                     companyOutputHtml: companyOutputHtml,
                     companyName: response.data.name
                 })
       


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
                    <Header/>
                    {this.state.jobInfo &&
                        <div id="job-wrapper-outer">
                            <div id="job-wrapper">
                                <div id="job-wrapper-title">
                                    <h1>Company: {this.state.companyName && <p>{this.state.companyName}</p>}</h1>
                                    <h2>Title: {this.state.jobInfo.title}</h2>
                                    <h2>Slug: {this.state.jobInfo.slug}</h2>
                                    <p>Area: {this.state.jobInfo.area}</p>
                                    <p>Hours: {this.state.jobInfo.hours}</p>
                                    <p>Location: {this.state.jobInfo.location}</p>
                                    <p>Salary: {this.state.jobInfo.salary}</p>
                                </div>
                                <p>Job number{this.props.match.params.id}</p>
                                <div>
                                    <h3>Job Description:</h3>
                                    <div dangerouslySetInnerHTML={this.state.jobOutputHtml}></div>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        this.state.companyInfo && 
                        <div>
                            <h1>Company Name:{this.state.companyInfo.name}</h1>
                            <p>Company Description:</p>
                            <div dangerouslySetInnerHTML={this.state.companyOutputHtml}></div>
                        </div>
                    }
                    <Footer/>
                </div>
    )
}
}

export default JobPost;