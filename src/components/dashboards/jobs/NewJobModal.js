import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'


Modal.setAppElement('#app');

class NewJobModal extends React.Component {

    constructor(props) {
        super(props);
        const token = localStorage.getItem('responseToken')

        this.updateJobArea = this.updateJobArea.bind(this);
        this.updateJobExperience =  this.updateJobExperience.bind(this);
        this.updateJobHours = this.updateJobHours.bind(this);
        this.updateJobLocation = this.updateJobLocation.bind(this);
        this.updateJobSalary = this.updateJobSalary.bind(this);
        this.updateJobSlug = this.updateJobSlug.bind(this);
        this.updateJobTitle = this.updateJobTitle.bind(this);
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

        const newJobEndPoint = 'http://localhost:8000/job/job/';
        axios.defaults.baseURL = 'https://api.example.com';
        axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('responseToken')
        console.log('Bearer '+localStorage.getItem('responseToken'))
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
                title: this.state.jobTitle
            },
            headers: {
                'Authorization': 'JWT '+localStorage.getItem('responseToken'),
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
      <Modal 
        isOpen={this.props.newJobModalIsOpen}
        contentLabel="learn-path-modal"
        onRequestClose={this.props.closeNewJobModal}
      >
        <form onSubmit={this.submitNewJob}>
            <fieldset>
                <label for="new-job-modal-job-area">Job Area:</label>
                <input type="text" id="new-job-modal-job-area" value={this.state.jobArea} onChange={this.updateJobArea}/>
            </fieldset>
            <fieldset>
                <label for="new-job-modal-job-experience">Experience:</label>
                <input type="text" id="new-job-modal-job-experience" value={this.state.jobExperience} onChange={this.updateJobExperience}/>
            </fieldset>
            <fieldset>
                <label for="new-job-modal-job-hours">Hours:</label>
                <input type="text" id="new-job-modal-job-hours" value={this.state.jobHours} onChange={this.updateJobHours}/>
            </fieldset>
                <fieldset>
                <label for="new-job-modal-job-location">Location:</label>
            <input type="text" id="new-job-modal-job-location" value={this.state.jobLocation} onChange={this.updateJobLocation}/>
            </fieldset>
            <fieldset>
                <label for="new-job-modal-job-salary">Salary:</label>
                <input type="text" id="new-job-modal-job-salary" value={this.state.jobSalary} onChange={this.updateJobSalary}/>
            </fieldset>
            <fieldset>
                <label for="new-job-modal-job-slug">Slug:</label>
                <input type="text" id="new-job-modal-job-slug" value={this.state.jobSlug} onChange={this.updateJobSlug}/>
            </fieldset>
            <fieldset>
                <label for="new-job-modal-job-title">Job Title:</label>
                <input type="text" id="new-job-modal-job-title" value={this.state.jobTitle} onChange={this.updateJobTitle}/>
            </fieldset>
            <fieldset>
                    <p>Job Description:</p>
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
      </Modal>
    )}
  
}

export default NewJobModal;