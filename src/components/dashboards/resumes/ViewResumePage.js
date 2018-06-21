import React from 'react';
import Header from '../../global/Header.js';
import Footer from '../../global/Footer.js';
import { Redirect } from 'react-router-dom';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import axios from 'axios';

class ViewResumePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pk: null,
            share_url: this.props.match.params.share_url,
            redirectToDashboard: false,
        }
    }


    componentWillMount() {
        
        const existingResumeEndPoint = `/resume/get_detail/${this.state.share_url}/`;
        axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token')
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        axios({
            method: 'get',
            url: existingResumeEndPoint, 
            headers: {
                'Authorization': 'JWT '+localStorage.getItem('token'),
                Accept: 'application/json'
                },  
            responseType: 'json'
        })
        .then( response => { 

            this.setState({
                resumeInfo: response.data
            });
       
            if (response.status === 200) {

                const givenContent = response.data.content;
                const parsedContent = JSON.parse(givenContent);
                const immutableContent = convertFromRaw(parsedContent);

                const resumeHtml = stateToHTML(immutableContent);
                const resumeOutputHtml = {__html: resumeHtml}
                this.setState({
                    resumeHtml: resumeHtml,
                    resumeOutputHtml: resumeOutputHtml
                })

                console.log('response from resume', response.data);
            } 
        })
        .catch(error => {
            console.log("this is an error yo", error);
          });

    }



    render() {

        if (this.state.redirectToDashboard) {
            return <Redirect to='/employer_dashboard'/>
        } else { 

        return (
            <section>
                <section id="view-resume-outer-wrapper">
                    <section id="view-resume-inner-wrapper">
                    <div id="resume-public-download-container">
                        <i class="fas fa-file-pdf"></i>
                    </div>
                        <section id="view-resume-container">
                            <div dangerouslySetInnerHTML={this.state.resumeOutputHtml} id="external-resume"></div>
                        </section>
                    </section>
                </section>
            </section>
        )}
    }
}

export default ViewResumePage;