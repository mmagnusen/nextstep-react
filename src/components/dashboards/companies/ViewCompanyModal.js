import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'


Modal.setAppElement('#app');

class ViewCompanyModal extends React.Component {

    constructor(props) {
        super(props);
        const token = localStorage.getItem('responseToken');
        this.enableEditMode = this.enableEditMode.bind(this);
        this.enableViewMode = this.enableViewMode.bind(this);
        this.updateCompanyName = this.updateCompanyName.bind(this);
        this.submitCompanyChanges = this.submitCompanyChanges.bind(this);
        this.deleteCompany = this.deleteCompany.bind(this);

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

        const givenContent = this.props.companyDescription;
        const parsedContent = JSON.parse(givenContent);
        const immutableContent = convertFromRaw(parsedContent);

        this.state = {
            companyName: this.props.companyName,
            companyId: this.props.companyId,
            token: token,
            viewMode: true,
            editMode: false,
            editorState: EditorState.createWithContent(immutableContent),
        }
    }

    componentWillMount() {
        const contentState = this.state.editorState.getCurrentContent();
        const html = stateToHTML(contentState);
        const outputHtml = {__html: html}
        this.setState({
            html: html,
            outputHtml: outputHtml
        })
     }
 
     onChange(editorState) {
     
         this.setState({
             editorState: editorState,
             stringifiedContent: JSON.stringify(convertToRaw(editorState.getCurrentContent()))
         });
     
         const contentState = editorState.getCurrentContent();
         console.log('content state', convertToRaw(contentState));
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

    enableViewMode() {
        this.setState(
          {
            viewMode: true,
            editMode: false
          }
        );
      }

      enableEditMode() {
        this.setState(
          {
            viewMode: false,
            editMode: true
          }
        );
      }

    updateCompanyName(e) {
        this.setState({
            companyName: e.target.value
        });

    }


    submitCompanyChanges(e) {
        e.preventDefault();

        const existingCompanyEndPoint = `http://localhost:8000/company/company/${this.state.companyId}/`;
        axios.defaults.baseURL = 'https://api.example.com';
        axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('responseToken')
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        axios({
            method: 'put',
            url: existingCompanyEndPoint, 
            data: {  
                name: this.state.companyName,
                description: this.state.stringifiedContent,
            },
            headers: {
                'Authorization': 'JWT '+localStorage.getItem('responseToken'),
                }, 
            responseType: 'json'
        })
        .then( response => { 
   
            if (response.status === 200) {
                enableViewMode();
                this.enableViewMode();
                console.log('enabling view mode');
               
            } else {

            }
        })
        .then ( () => {
            
        }

        )
        .catch(error => {
            console.log("this is an error yo", error);
          })

      
        
    }

    deleteCompany(e) {

        const existingCompanyEndPoint = `http://localhost:8000/company/company/${this.state.companyId}/`;
        axios.defaults.baseURL = 'https://api.example.com';
        axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('responseToken')
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        axios({
            method: 'delete',
            url: existingCompanyEndPoint,
            headers: {
                'Authorization': 'JWT '+localStorage.getItem('responseToken'),
                }, 
            responseType: 'json'
        })
        .then( response => { 
   
            if (response.status === 200) {
    
            } else {

            }
        })
        .then ( () => {
            
        }

        )
        .catch(error => {
            console.log("this is an error yo", error);
          })
    }

    render() {
  
    return (
      <Modal 
        isOpen={this.props.viewCompanyModalIsOpen}
        contentLabel="learn-path-modal"
        onRequestClose={this.props.closeViewCompanyModal}
      >
      {
        this.state.viewMode && 
        <div>
            <p>Showing view mode</p>
            <div>
                <h3>Company Name:</h3>
                <h3>{this.state.companyName}</h3>
            </div>
            <div>
                <h3>Company Description</h3>
                <div dangerouslySetInnerHTML={this.state.outputHtml}></div>
            </div>
            <button onClick={this.enableEditMode} type="button">Edit Company</button>
        </div>
        }

      { this.state.editMode &&
        <div>
            <form onSubmit={this.submitCompanyChanges}>
                <fieldset>
                    <label for="view-company-modal-company-name">Company Name:</label>
                    <input type="text" id="view-company-modal-company-name" value={this.state.companyName} onChange={this.updateCompanyName}/>
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
            <button onClick={this.enableViewMode} type="button">Cancel Changes</button>
            <button onClick={this.deleteCompany} type="button">Delete Company</button>
        </div>
        }
      </Modal>
    )}
  
}

export default ViewCompanyModal;