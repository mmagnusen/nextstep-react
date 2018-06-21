import React from 'react';
import ReactDOM from 'react-dom';
import ResumeOnDashboard from './ResumeOnDashboard';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';

class ResumesSection extends React.Component {
    constructor(props) {
        super(props);

        this.createNewResume = this.createNewResume.bind(this);

        this.state = {
            allResumes: null,
            redirectToEdit: false,
        }
    }

    componentWillMount() {
        const allUserResumesEndPoint = '/resume/resume/';
        axios({
            method: 'get',
            url: allUserResumesEndPoint, 
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
                    allResumes: response.data
                });
           
                
            } else {

            }
        })
        .catch(error => {
            console.log("this is an error yo", error);
          })
    }

    

    createNewResume(e) {
        e.preventDefault();

        const newResumeEndPoint = '/resume/resume/';
        axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token')
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        const newEditorState = EditorState.createEmpty();
        const content =  JSON.stringify(convertToRaw(newEditorState.getCurrentContent()));

        axios({
            method: 'post',
            url: newResumeEndPoint, 
            data: {   
                name: "Type to edit resume name...",
                content: content,  
                },
            headers: {
                'Authorization': 'JWT '+localStorage.getItem('token')
                }, 
            responseType: 'json'
        })
        .then( response => { 
   
            if (response.status === 201) {

                this.setState({
                    newResumeShareUrl: response.data.share_url,
                    redirectToEdit: true,
                });
            
            } else {

            }
        })
        .catch(error => {
            console.log("this is an error yo", error);
          })

    }

    render() {
        if (this.state.redirectToEdit) {
            return <Redirect to={`/edit_resume/${this.state.newResumeShareUrl}`}/>
        } else {

        return (
            <section id="resumes-section-container">
                <section id="resumes-section-inner">
                    <section id="create-new-resume-container">
                        <div id="create-new-resume-title">
                            <h1>Resumes</h1>
                        </div>
                        <div>
                            <button id="create-new-resume-button" onClick={this.createNewResume}>Create a new resume</button>
                        </div>
                    </section>
                    <section id="all-resumes-container">
                        {
                            this.state.allResumes ? this.state.allResumes.map((resume) => 
                                <ResumeOnDashboard 
                                name={resume.name}
                                share_url={resume.share_url}
                                pk={resume.pk}
                                />) : <p></p>
                            
                        }
                    </section>
                </section>
            </section>
        )}
    }
}

export default ResumesSection;