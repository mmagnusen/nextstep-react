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
        }
    }

    componentWillMount() { 
        
        const existingJobEndPoint = `http://localhost:8000/job/job/${this.state.id}/`;
        axios.defaults.baseURL = 'https://api.example.com';
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
        const existingJobEndPoint = `http://localhost:8000/job/job/${this.state.id}/`;
        axios.defaults.baseURL = 'https://api.example.com';
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
    
          const existingJobEndPoint = `http://localhost:8000/job/job/${this.state.id}/`;
          axios.defaults.baseURL = 'https://api.example.com';
          axios.defaults.headers.common['Authorization'] = 'JWT '+localStorage.getItem('token')
          console.log('Bearer '+localStorage.getItem('token'))
          axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    
          axios({
              method: 'put',
              url: existingJobEndPoint, 
              data: {  
                  area: this.state.jobArea,
                  description: this.state.stringifiedContent,
                  experience: this.state.jobExperience,
                  hours: this.state.jobHours,
                  location: this.state.jobLocation,
                  salary: this.state.jobSalary,
                  slug: this.state.jobSlug,
                  title: this.state.jobTitle,
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
                { this.state.viewMode && 
                    <div>
                        <h1>Showing View Mode</h1>
                        <div>
                        <p>Job Title:</p>
                        <p>{this.state.jobTitle}</p>
                        </div>
                        
                        <div>
                        <p>Job Area:</p>
                        <p>{this.state.jobArea}</p>
                        </div>
                        <div>
                        <p>Job Experience:</p>
                        <p>{this.state.jobExperience}</p>
                        </div>
        
                        <div>
                        <p>Job Hours:</p>
                        <p>{this.state.jobHours}</p>
                        </div>
        
                        <div>
                        <p>Job Location:</p>
                        <p>{this.state.jobLocation}</p>
                        </div>
        
                        <div>
                        <p>Job Salary:</p>
                        <p>{this.state.jobSalary}</p>
                        </div>
        
                        <div>
                        <p>Job Slug:</p>
                        <p>{this.state.jobSlug}</p>
                        </div>
                        <div><h1>Job Description</h1></div>
                        <div dangerouslySetInnerHTML={this.state.outputHtml}></div>
        
                        <button onClick={this.enableEditMode} type="button">Edit Job</button>
                    </div>
                }

                {
                    this.state.editMode && 
                    <div>
                      
                       <form onSubmit={this.submitJobChanges}>
                           <fieldset>
                               <label for="edit-job-modal-job-area">Job Area:</label>
                               <input type="text" id="edit-job-modal-job-area" value={this.state.jobArea} onChange={this.updateJobArea}/>
                           </fieldset>
                           <fieldset>
                               <label for="edit-job-modal-job-experience">Experience:</label>
                               <input type="text" id="edit-job-modal-job-experience" value={this.state.jobExperience} onChange={this.updateJobExperience}/>
                           </fieldset>
                           <fieldset>
                               <label for="edit-job-modal-job-hours">Hours:</label>
                               <input type="text" id="edit-job-modal-job-hours" value={this.state.jobHours} onChange={this.updateJobHours}/>
                           </fieldset>
                               <fieldset>
                               <label for="edit-job-modal-job-location">Location:</label>
                           <input type="text" id="edit-job-modal-job-location" value={this.state.jobLocation} onChange={this.updateJobLocation}/>
                           </fieldset>
                           <fieldset>
                               <label for="edit-job-modal-job-salary">Salary:</label>
                               <input type="text" id="edit-job-modal-job-salary" value={this.state.jobSalary} onChange={this.updateJobSalary}/>
                           </fieldset>
                           <fieldset>
                               <label for="edit-job-modal-job-slug">Slug:</label>
                               <input type="text" id="edit-job-modal-job-slug" value={this.state.jobSlug} onChange={this.updateJobSlug}/>
                           </fieldset>
                           <fieldset>
                               <label for="edit-job-modal-job-title">Job Title:</label>
                               <input type="text" id="edit-job-modal-job-title" value={this.state.jobTitle} onChange={this.updateJobTitle}/>
                           </fieldset>
                           <fieldset>
                           <h1>Job Description</h1>
                               <div id="employer-draft">
                                   <button onClick={this.onUnderlineClick} type="button"><i class="fas fa-underline"></i></button>
                                   <button onClick={this.onBoldClick} type="button"><i class="fas fa-bold"></i></button>
                                   <button onClick={this.onItalicClick} type="button"><i class="fas fa-italic"></i></button>
                                   <button onClick={this.onMediumClick} type="button">Medium</button>
                                   <button onClick={this.onLargeClick} type="button">Large</button>
                                   <button onClick={this.onLeftAlignClick} type="button"><i class="fas fa-align-left"></i></button>
                                   <button onClick={this.onJustifyClick} type="button"><i class="fas fa-align-justify"></i></button>
                                   <button onClick={this.onRightAlignClick} type="button"><i class="fas fa-align-right"></i></button>
                                   <button onClick={this.onUnorderedListClick} type="button"><i class="fas fa-list-ul"></i></button>
                                   <button onClick={this.onOrderedListClick} type="button"><i class="fas fa-list-ol"></i></button>
                                   <Editor 
                                   editorState={this.state.editorState} 
                                   handleKeyCommand={this.handleKeyCommand}
                                   onChange={this.onChange} />
                               </div>
                           </fieldset>
                           <input type="submit"/>
                       </form>
                       <button onClick={this.enableViewMode}>Cancel Changes</button>
                       <button onClick={this.deleteJob} type="button">Delete Job</button>
                     
                   </div>
                  }
                <Footer/>
            </div>
        )
    }
}

export default ViewJobPage;