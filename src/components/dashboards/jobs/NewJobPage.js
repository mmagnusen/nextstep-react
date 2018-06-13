import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import { Redirect } from 'react-router-dom';
import Header from '../../global/Header.js';
import Footer from '../../global/Footer.js';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class NewJobPage extends React.Component {

    constructor(props) {
        super(props);
        const token = localStorage.getItem('token')

        this.updateJobArea = this.updateJobArea.bind(this);
        this.updateJobExperience =  this.updateJobExperience.bind(this);
        this.updateJobHours = this.updateJobHours.bind(this);
        this.updateJobLocation = this.updateJobLocation.bind(this);
        this.updateJobSalary = this.updateJobSalary.bind(this);
        this.updateJobSlug = this.updateJobSlug.bind(this);
        this.updateJobTitle = this.updateJobTitle.bind(this);
        this.updatePostedByCompany = this.updatePostedByCompany.bind(this);

        this.submitNewJob = this.submitNewJob.bind(this);

        this.onChange = this.onChange.bind(this);
        this.handleKeyCommand = this.handleKeyCommand.bind(this);

        this.onUnderlineClick = this.onUnderlineClick.bind(this);
        this.onBoldClick = this.onBoldClick.bind(this);
        this.onItalicClick = this.onItalicClick.bind(this);

        this.onMediumClick = this.onMediumClick.bind(this);
        this.onLargeClick = this.onLargeClick.bind(this);

        this.onLeftAlignClick = this.onLeftAlignClick.bind(this);
        this.onRightAlignClick = this.onRightAlignClick.bind(this);
        this.onJustifyClick = this.onJustifyClick.bind(this);

        this.onOrderedListClick = this.onOrderedListClick.bind(this);
        this.onUnorderedListClick = this.onOrderedListClick.bind(this);

        const linksInfo = this.props.location.state.companiesFromLink;
        const posted_by_company = this.props.location.state.posted_by_company;
        
        this.state = {
            jobArea: "",
            jobExperience: "",
            jobHours: "",
            jobLocation: "",
            jobSalary: "",
            jobSlug: "",
            jobTitle: "",
            token: token,
            editorState: EditorState.createEmpty(),
            availableCompanies: linksInfo,
            posted_by_company: linksInfo[0].id,
            redirectToDashboard: false,
            formError: ""
        }
    }

    updateJobArea(e) {
        this.setState({
            jobArea: e.target.value
        });
    }

    updateJobExperience(e) {
        this.setState({
            jobExperience: e.target.value
        });
    }

    updateJobHours(e) {
        this.setState({
            jobHours: e.target.value
        });
    }

    updateJobLocation(e) {
        this.setState({
            jobLocation: e.target.value
        });
    }

    updateJobSalary(e) {
        this.setState({
            jobSalary: e.target.value
        });
    }

    updateJobSlug(e) {
        this.setState({
            jobSlug: e.target.value
        });
    }

    updateJobTitle(e) {
        this.setState({
            jobTitle: e.target.value
        });
    }

    updatePostedByCompany(e) {
        this.setState({
            posted_by_company: e.target.value
        })
    }

    onChange(editorState) {
        this.setState({
            editorState: editorState,
            stringifiedContent: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
            parsedContent: JSON.parse(JSON.stringify(convertToRaw( editorState.getCurrentContent() )))

        });
      }
    
      handleKeyCommand(command) {
          const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    
          if ( newState ) {
            this.onChange(newState);
            return 'handled';
          }
          return 'not-handled';
      }
    
      onUnderlineClick() {
          this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
      }
    
      onBoldClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD')); 
      }
    
      onItalicClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC')); 
      }
    
      onMediumClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
      }
    
      onLargeClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
      }
    
      onLeftAlignClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
      }
    
      onRightAlignClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
      }
    
      onJustifyClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
      }
    
      onOrderedListClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
      }
    
      onUnorderedListClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
      }

    submitNewJob(e) {
        e.preventDefault();

        const newJobEndPoint = '/job/job/';
        axios.defaults.headers.common['Authorization'] = 'JWT '+localStorage.getItem('token')
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        axios({
            method: 'post',
            url: newJobEndPoint, 
            data: {  
                area: this.state.jobArea,
                description: this.state.stringifiedContent,
                experience: this.state.jobExperience,
                hours: this.state.jobHours,
                location: this.state.jobLocation,
                salary: this.state.jobSalary,
                slug: this.state.jobSlug,
                title: this.state.jobTitle,
                posted_by_company: parseInt(this.state.posted_by_company)
            },
            headers: {
                'Authorization': 'JWT '+localStorage.getItem('token'),
                }, 
            responseType: 'json'
        })
        .then( response => { 
   
            if (response.status === 201) {
                this.setState({
                    redirectToDashboard: true
                });
            } else {

            }
        })
        .catch(error => {
            console.log("this is an error yo", error);
            this.setState({
                formError: error
                });
          })
        
    }

    render() {

        if (this.state.redirectToDashboard) {
            return <Redirect to='/employer_dashboard'/>
        } else { 
  
    return (
        <div>
            <Header/>
                <div id="new-job-wrapper">
                    <form onSubmit={this.submitNewJob}>
                        <div id="post-new-job-title">
                            <h2>Create a new job</h2>
                        </div>
                        <section className="new-job-section">
                            <div className="new-job-label">
                                <p>Choose company to list job for:</p>
                            </div>
                            <div className="new-job-input">
                                <select id="company-select" value={this.state.posted_by_company} onChange={this.updatePostedByCompany}>
                                    { this.state.availableCompanies.map((company) => <option value={company.id}>{company.name} </option>) }
                                    
                                </select>
                            </div>
                        </section>
                        <section className="new-job-section">
                            <div className="new-job-label">
                                <p>Job Area:</p>
                            </div>
                            <div className="new-job-input">
                                <input type="text" className="job-text-input" value={this.state.jobArea} onChange={this.updateJobArea}/>
                            </div>
                        </section>
                        <section className="new-job-section">
                            <div className="new-job-label">
                                <p>Experience:</p>
                            </div>
                            <div className="new-job-input">
                                <input type="text" className="job-text-input" value={this.state.jobExperience} onChange={this.updateJobExperience}/>
                            </div>
                        </section>
                        <section className="new-job-section">
                            <div className="new-job-label">
                                <p>Hours:</p>
                            </div>
                            <div className="new-job-input">
                                <input type="text" className="job-text-input" value={this.state.jobHours} onChange={this.updateJobHours}/>
                            </div>
                        </section>
                        <section className="new-job-section">
                            <div className="new-job-label">
                                <p>Location:</p>
                            </div>
                            <div className="new-job-input">
                                <input type="text" className="job-text-input" value={this.state.jobLocation} onChange={this.updateJobLocation}/>
                            </div>
                        </section>
                        <section className="new-job-section">
                            <div className="new-job-label">
                                <p>Salary:</p>
                            </div>
                            <div className="new-job-input">
                                <input type="text" className="job-text-input" value={this.state.jobSalary} onChange={this.updateJobSalary}/>
                            </div>
                        </section>
                        <section className="new-job-section">
                            <div className="new-job-label">
                                <p>Slug:</p>
                            </div>
                            <div className="new-job-input">
                                <input type="text" className="job-text-input" value={this.state.jobSlug} onChange={this.updateJobSlug}/>
                            </div>
                        </section>
                        <section className="new-job-section">
                            <div className="new-job-label">
                                <p>Job Title:</p>
                            </div>
                            <div className="new-job-input">
                                <input type="text" className="job-text-input" value={this.state.jobTitle} onChange={this.updateJobTitle}/>
                            </div>
                        </section>
                        <section id="new-job-description">
                                <section id="job-description-title">
                                    <p>Job Description:</p>
                                </section>
                                <section id="editor-buttons">
                                    <button onClick={this.onUnderlineClick} type="button" className="editor-button"><i class="fas fa-underline"></i></button>
                                    <button onClick={this.onBoldClick} type="button" className="editor-button"><i class="fas fa-bold"></i></button>
                                    <button onClick={this.onItalicClick} type="button" className="editor-button"><i class="fas fa-italic"></i></button>
                                </section>
                                <div id="new-job-editor">
                                    <Editor 
                                    editorState={this.state.editorState} 
                                    handleKeyCommand={this.handleKeyCommand}
                                    onChange={this.onChange} />
                                </div>
                        </section>
                        <section id="new-job-submit-container">
                            <input type="submit"/>
                        </section>
                    </form>
                    {
                        this.state.formError &&
                        <div id="form-error">
                            <p>Something went wrong, your new job was not created.</p>
                            <p>Please try again or contact marilyn@thenextsep.io for help</p>
                        </div>
                    }
                </div>
            <Footer/>
        </div>
     
    )}
    }   
  
}

export default NewJobPage;