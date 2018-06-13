import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Header from '../../global/Header.js';
import Footer from '../../global/Footer.js';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';


axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class ViewCompanyPage extends React.Component {

    constructor(props) {
        super(props);
        const token = localStorage.getItem('token');
        this.enableEditMode = this.enableEditMode.bind(this);
        this.enableViewMode = this.enableViewMode.bind(this);

        this.updateCompanyName = this.updateCompanyName.bind(this);
        this.updateSmallLogo = this.updateSmallLogo.bind(this);
        this.updateLargeLogo = this.updateLargeLogo.bind(this);
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

        this.state = {
            token: token,
            viewMode: true,
            editMode: false,
            companyId: this.props.match.params.id,
            companyInfo: {},
            redirectToDashboard: false,
            
        }
    }

    componentWillMount() {

        const existingCompanyEndPoint = `/company/company/${this.state.companyId}/`;
        axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token')
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        axios({
            method: 'get',
            url: existingCompanyEndPoint, 
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
                    companyInfo: response.data,
                    editorState: EditorState.createWithContent(immutableContent),
                    name: response.data.name,
                    small_logo: null,
                    large_logo: null,
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
        name: e.target.value
    });
}

updateSmallLogo(e) {
    this.setState({
        small_logo: e.target.files[0]
    })
}

updateLargeLogo(e) {
    this.setState({
        large_logo: e.target.files[0]
    })
}

submitCompanyChanges(e) {
    e.preventDefault();

    const existingCompanyEndPoint = `/company/company/${this.state.companyId}/`;
    axios.defaults.headers.common['Authorization'] = 'JWT '+localStorage.getItem('token')
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    const stringifiedContent = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));

    const formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('description', stringifiedContent);

    if ( this.state.small_logo ) {
        formData.append('small_logo', this.state.small_logo,);
    }

    if ( this.state.large_logo ) {
        formData.append('large_logo', this.state.large_logo,);
    }
    
    

    axios({
        method: 'put',
        url: existingCompanyEndPoint, 
        data: formData,
        headers: {
            'Authorization': 'JWT '+localStorage.getItem('token'),
            'content-type': 'multipart-form-data'
            }, 
        responseType: 'json'
    })
    .then( response => { 

        if (response.status === 200) {
            this.setState({
                redirectToDashboard: true
            });
           
        } else {

        }
    })
    .catch(error => {
        this.setState({
            formError: error
            });
        console.log("this is an error yo", error);
      })
}

deleteCompany(e) {

    const existingCompanyEndPoint = `/company/company/${this.state.companyId}/`;
    axios.defaults.headers.common['Authorization'] = 'JWT '+localStorage.getItem('token')
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    axios({
        method: 'delete',
        url: existingCompanyEndPoint,
        headers: {
            'Authorization': 'JWT '+localStorage.getItem('token'),
            }, 
        responseType: 'json'
    })
    .then( response => { 

        if (response.status === 200) {
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
                    <div id="view-company-wrapper">
                    {
                    this.state.viewMode && 
                    <div>
                        

                            { 
                                this.state.companyInfo.small_logo && 
                                <div className="view-logo">
                                    <div className="logo-label">
                                        <p>Small Logo</p>
                                    </div>
                                    <div className="logo-image">
                                        <img src={this.state.companyInfo.small_logo} alt="company logo"/>
                                    </div>
                                </div>
                            }
            
                            { 
                                this.state.companyInfo.large_logo && 
                                <div className="view-logo">
                                    <div className="logo-label">
                                        <p>Large Logo</p>
                                    </div>
                                    <div className="logo-image">
                                        <img src={this.state.companyInfo.large_logo} alt="company logo"/>
                                    </div>
                                </div>
                            }
                       
                        <section id="view-name-container">
                            <div id="view-name-label">
                                <h3>Company Name:</h3>
                            </div>
                            <div id="view-name-name">
                                <p>{this.state.name}</p>
                            </div>
                        </section>
                        <section>
                            <div id="view-description-title">
                                <h3>Company Description</h3>
                            </div>

                            <div dangerouslySetInnerHTML={this.state.outputHtml}></div>
                        </section>
                        <section id="edit-button-container">
                            <button onClick={this.enableEditMode} type="button">Edit Company</button>
                        </section>
                    </div>
                    }

                    { this.state.editMode &&
                        <div>
                            <form onSubmit={this.submitCompanyChanges}>
                                <section id="edit-name-container">
                                    <div id="edit-name-label">
                                        <p>Company Name:</p>
                                    </div>
                                    <div id="edit-name-name">
                                        <input type="text" value={this.state.name} onChange={this.updateCompanyName}/>
                                    </div>
                                </section>
                                <section className="edit-company-section">
                                    <div className="edit-company-label">
                                        <p>Small Logo:</p>
                                    </div>
                                    <div className="edit-company-logo">
                                        <input type="file" name="small_logo" onChange={this.updateSmallLogo}/>
                                    </div>
                                </section>
                                <section className="edit-company-section">
                                    <div className="edit-company-label">
                                        <p>Large Logo:</p>
                                    </div>
                                    <div className="edit-company-logo">
                                        <input type="file" name="large_logo" onChange={this.updateLargeLogo}/>
                                    </div>
                                </section>
                                <section id="edit-company-description">
                                    <section id="company-description-title">
                                        <h2>Company Description</h2>
                                    </section>
                                    <section id="editor-buttons">
                                        <button onClick={this.onUnderlineClick} type="button" className="editor-button"><i class="fas fa-underline"></i></button>
                                        <button onClick={this.onBoldClick} type="button" className="editor-button"><i class="fas fa-bold"></i></button>
                                        <button onClick={this.onItalicClick} type="button" className="editor-button"><i class="fas fa-italic"></i></button>
                                    </section>
                                    <section id="edit-company-editor">
                                        <Editor 
                                        editorState={this.state.editorState} 
                                        handleKeyCommand={this.handleKeyCommand}
                                        onChange={this.onChange} />
                                    </section>
                                </section>
                                <section id="edit-company-submit-container">
                                    <input type="submit"/>
                                </section>
                            </form> 
                            <div id="edit-cancel-delete">
                                <button onClick={this.enableViewMode} type="button" id="cancel-edit-changes">Cancel Changes</button>
                                <button onClick={this.deleteCompany} type="button" id="delete-edit">Delete Company</button>
                            </div>
                        </div>
                        }

                        {
                            this.state.formError &&
                            <div id="form-error">
                                <p>Something went wrong, your company was not updated.</p>
                                <p>Please try again or contact marilyn@thenextsep.io for help</p>
                            </div>
                        }
                    </div>
                <Footer/>
              
            </div>
        )
    }
}

}

export default ViewCompanyPage;