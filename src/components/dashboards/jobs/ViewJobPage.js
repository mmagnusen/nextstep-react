import React from 'react';
import axios from 'axios';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import Header from '../../global/Header.js';
import Footer from '../../global/Footer.js';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class ViewJobPage extends React.Component {

    constructor(props) {
        super(props);

        const token = localStorage.getItem('token');

        this.enableEditMode = this.enableEditMode.bind(this);
        this.enableViewMode = this.enableViewMode.bind(this);
        this.deleteJob = this.deleteJob.bind(this);
        this.submitJobChanges = this.submitJobChanges.bind(this);

        this.updateJobArea = this.updateJobArea.bind(this);
        this.updateJobExperience =  this.updateJobExperience.bind(this);
        this.updateJobHours = this.updateJobHours.bind(this);
        this.updateJobLocation = this.updateJobLocation.bind(this);
        this.updateJobSalary = this.updateJobSalary.bind(this);
        this.updateJobSlug = this.updateJobSlug.bind(this);
        this.updateJobTitle = this.updateJobTitle.bind(this);
        this.updatePostedByCompany = this.updatePostedByCompany.bind(this);
        
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

        const userCompanies = this.props.location.state.userCompanies;
        const companyName = this.props.location.state.companyName;

        this.state = {
          id: this.props.match.params.id,
          token: token,
          viewMode: true,
          editMode: false,
          jobInfo: {},
          jobArea: "",
          jobExperience: "",
          jobHours: "",
          jobLocation: "",
          jobSalary: "",
          jobSlug: "",
          jobTitle: "",
          posted_by_company: "",
          userCompanies: userCompanies,
          companyName: companyName
        }
    }

    componentWillMount() { 
        
        const existingJobEndPoint = `/job/job/${this.state.id}/`;
        axios.defaults.headers.common['Authorization'] = 'JWT '+localStorage.getItem('token');
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        axios({
            method: 'get',
            url: existingJobEndPoint, 
            headers: {
                'Authorization': 'JWT '+localStorage.getItem('token'),
                Accept: 'application/json'
                },  
            responseType: 'json'
        })
        .then( response => { 

       
            if (response.status === 200) {
                const givenContent = response.data.description;
                const parsedContent = JSON.parse(givenContent);
                const immutableContent = convertFromRaw(parsedContent);

                this.setState({
                    jobInfo: response.data,
                    editorState: EditorState.createWithContent(immutableContent),
                    jobArea: response.data.area,
                    jobExperience: response.data.experience,
                    jobHours: response.data.hours,
                    jobLocation: response.data.location,
                    jobSalary: response.data.salary,
                    jobSlug: response.data.slug,
                    jobTitle: response.data.title,
                    posted_by_company: response.data.posted_by_company,
                });
                console.log('response from company', response.data);
            }
        })
        .then(
            () => {
                const contentState = this.state.editorState.getCurrentContent();
                const html = stateToHTML(contentState);
                const outputHtml = {__html: html}
                this.setState({
                    html: html,
                    outputHtml: outputHtml,
                
                })
            }  
        )
        .catch(error => {
            console.log("this is an error yo", error);
          });
    }

    onChange(editorState) {
    
        this.setState({
            editorState: editorState,
            stringifiedContent: JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        });
    
        const contentState = editorState.getCurrentContent();
        console.log('content state', convertToRaw(contentState));
      }

      enableEditMode() {
        this.setState(
          {
            viewMode: false,
            editMode: true
          }
        );
      }
  
      enableViewMode() {
        this.setState(
          {
            viewMode: true,
            editMode: false
          }
        );
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

    deleteJob(e) {
        e.preventDefault();
        const existingJobEndPoint = `/job/job/${this.state.id}/`;
        axios.defaults.headers.common['Authorization'] = 'JWT '+localStorage.getItem('token')
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    
        axios({
            method: 'delete',
            url: existingJobEndPoint,
            headers: {
                'Authorization': 'JWT '+localStorage.getItem('token'),
                Accept: 'application/json'
                }, 
            responseType: 'json'
        })
        .then( response => { 
    
        })
        .then ( () => {
            }
    
        )
        .catch(error => {
            console.log("this is an error yo", error);
          })
    }
    
        submitJobChanges(e) {
          e.preventDefault();
    
          const existingJobEndPoint = `/job/job/${this.state.id}/`;
          axios.defaults.headers.common['Authorization'] = 'JWT '+localStorage.getItem('token')
          console.log('Bearer '+localStorage.getItem('token'))
          axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

          const stringifiedContent = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
    
          axios({
              method: 'put',
              url: existingJobEndPoint, 
              data: {  
                  area: this.state.jobArea,
                  description: stringifiedContent,
                  experience: this.state.jobExperience,
                  hours: this.state.jobHours,
                  location: this.state.jobLocation,
                  salary: this.state.jobSalary,
                  slug: this.state.jobSlug,
                  title: this.state.jobTitle,
                  posted_by_company: parseInt(this.state.posted_by_company),

              },
              headers: {
                  'Authorization': 'JWT '+localStorage.getItem('token'),
                  Accept: 'application/json'
                  }, 
              responseType: 'json'
          })
          .then( response => { 
     
              if (response.status === 201) {
    
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
                    <div id="view-job-wrapper">
                        { this.state.viewMode && 
                            <section>
                                <section className="edit-job-section">
                                    <div className="edit-job-label">
                                        <p>Posted By Company:</p>
                                    </div>
                                    <div className="edit-job-value">
                                        <p>{this.state.companyName}</p>
                                    </div>
                                </section>
                                <section className="edit-job-section">
                                    <div className="edit-job-label">
                                        <p>Job Title:</p>
                                    </div>
                                    <div className="edit-job-value">
                                        <p>{this.state.jobTitle}</p>
                                    </div>
                                </section>
                                <section className="edit-job-section">
                                    <div className="edit-job-label">
                                        <p>Job Area:</p>
                                    </div>
                                    <div className="edit-job-value">
                                        <p>{this.state.jobArea}</p>
                                    </div>
                                </section>
                                <section className="edit-job-section">
                                    <div className="edit-job-label">
                                        <p>Job Experience:</p>
                                    </div>
                                    <div className="edit-job-value">
                                        <p>{this.state.jobExperience}</p>
                                    </div>
                                </section>
                                <section className="edit-job-section">
                                    <div className="edit-job-label">
                                        <p>Job Hours:</p>
                                    </div>
                                    <div className="edit-job-value">
                                        <p>{this.state.jobHours}</p>
                                    </div>
                                </section>
                                <section className="edit-job-section">
                                    <div className="edit-job-label">
                                        <p>Job Location:</p>
                                    </div>
                                    <div className="edit-job-value">
                                        <p>{this.state.jobLocation}</p>
                                    </div>
                                </section>
                                <section className="edit-job-section">
                                    <div className="edit-job-label">
                                        <p>Job Salary:</p>
                                    </div>
                                    <div className="edit-job-value">
                                        <p>{this.state.jobSalary}</p>
                                    </div>
                                </section>
                                <section className="edit-job-section">
                                    <div className="edit-job-label">
                                        <p>Job Slug:</p>
                                    </div>
                                    <div className="edit-job-value">
                                        <p>{this.state.jobSlug}</p>
                                    </div>
                                </section>
                                <section >
                                    <div className="job-description-title">
                                        <h3>Job Description</h3>
                                    </div>
                                    <div dangerouslySetInnerHTML={this.state.outputHtml}></div>
                                    <section id="edit-job-button-container">
                                        <button onClick={this.enableEditMode} type="button">Edit Job</button>
                                    </section>

                                    
                                </section>

                            </section>
                        }

                        {
                            this.state.editMode && 
                            <div>
                            
                            <form onSubmit={this.submitJobChanges}>
                                <section className="edit-job-section">
                                    <div className="edit-job-label">
                                        <p>Choose company to list job for:</p>
                                    </div>
                                    <div className="edit-job-input-value">
                                        <select id="company-select" value={this.state.posted_by_company} onChange={this.updatePostedByCompany}>
                                            { this.state.userCompanies.map((company) => <option value={company.id}>{company.name} </option>) }
                                            
                                        </select>
                                    </div>
                                </section>
                                <section className="edit-job-section">
                                    <div className="edit-job-label">
                                        <p>Job Area:</p>
                                    </div>
                                    <div className="edit-job-input-value">
                                        <input type="text" id="edit-job-modal-job-area" value={this.state.jobArea} onChange={this.updateJobArea}/>
                                    </div>
                                </section>
                                <section className="edit-job-section">
                                    <div className="edit-job-label">
                                        <p>Experience:</p>
                                    </div>
                                    <div className="edit-job-input-value">
                                        <input type="text" id="edit-job-modal-job-experience" value={this.state.jobExperience} onChange={this.updateJobExperience}/>
                                    </div>
                                </section>
                                <section className="edit-job-section">
                                    <div className="edit-job-label">
                                        <p>Hours:</p>
                                    </div>
                                    <div className="edit-job-input-value">
                                    <input type="text" id="edit-job-modal-job-hours" value={this.state.jobHours} onChange={this.updateJobHours}/>
                                    </div>
                                </section>
                                <section className="edit-job-section">
                                    <div className="edit-job-label">
                                        <p>Location:</p>
                                    </div>
                                    <div className="edit-job-input-value">
                                        <input type="text" id="edit-job-modal-job-location" value={this.state.jobLocation} onChange={this.updateJobLocation}/>
                                    </div>
                                </section>
                                <section className="edit-job-section">
                                    <div className="edit-job-label">
                                        <p>Salary:</p>
                                    </div>
                                    <div className="edit-job-input-value">
                                        <input type="text" id="edit-job-modal-job-salary" value={this.state.jobSalary} onChange={this.updateJobSalary}/>
                                    </div>
                                </section>
                                <section className="edit-job-section">
                                    <div className="edit-job-label">
                                        <p>Slug:</p>
                                    </div>
                                    <div className="edit-job-input-value">
                                        <input type="text" id="edit-job-modal-job-slug" value={this.state.jobSlug} onChange={this.updateJobSlug}/>
                                    </div>
                                </section>
                                <section className="edit-job-section">
                                    <div className="edit-job-label">
                                        <p>Job Title:</p>
                                    </div>
                                    <div className="edit-job-input-value">
                                        <input type="text" id="edit-job-modal-job-title" value={this.state.jobTitle} onChange={this.updateJobTitle}/>
                                    </div>
                                </section>
                                <section>
                                    <section className="job-description-title">
                                        <h1>Job Description</h1>
                                    </section>
                                
                                    <section id="editor-buttons">
                                        <button onClick={this.onUnderlineClick} type="button" className="editor-button"><i class="fas fa-underline"></i></button>
                                        <button onClick={this.onBoldClick} type="button" className="editor-button"><i class="fas fa-bold"></i></button>
                                        <button onClick={this.onItalicClick} type="button" className="editor-button"><i class="fas fa-italic"></i></button>
                                    </section>
                                    <section id="edit-job-editor">
                                        <Editor 
                                        editorState={this.state.editorState} 
                                        handleKeyCommand={this.handleKeyCommand}
                                        onChange={this.onChange} />
                                    </section>
                                </section>
                                <section id="edit-job-submit-container">
                                    <input type="submit"/>
                                </section>
                            </form>
                            <section id="edit-cancel-delete">
                                <button onClick={this.enableViewMode} id="cancel-edit-changes">Cancel Changes</button>
                                <button onClick={this.deleteJob} type="button" id="delete-edit">Delete Job</button>
                            </section>
                            
                        </div>
                    }
                  </div>
                <Footer/>
            </div>
        )
    }
}

export default ViewJobPage;