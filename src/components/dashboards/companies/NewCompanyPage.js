import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../../global/Header.js';
import Footer from '../../global/Footer.js';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';

class NewCompanyPage extends React.Component {

    constructor(props) {
        super(props);
        const token = localStorage.getItem('responseToken')
        this.updateCompanyName = this.updateCompanyName.bind(this);
        this.updateSmallLogo = this.updateSmallLogo.bind(this);
        this.updateLargeLogo = this.updateLargeLogo.bind(this);

        this.submitNewCompany = this.submitNewCompany.bind(this);
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
            companyName: "",
            companyDescription: "",
            small_logo: null,
            large_logo: null,
            token: token,
            editorState: EditorState.createEmpty(),
            redirectToDashboard: false,
            formError: ""
        }
    }

    updateCompanyName(e) {
        this.setState({
            companyName: e.target.value
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

  submitNewCompany(e) {
      e.preventDefault();

      const newCompanyEndPoint = '/company/company/';
      axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token')
      console.log('Bearer '+localStorage.getItem('token'))
      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

      const formData = new FormData();
      formData.append('name', this.state.companyName);
      formData.append('description', this.state.stringifiedContent);
      formData.append('small_logo', this.state.small_logo,);
      formData.append('large_logo', this.state.large_logo,);
      axios({
          method: 'post',
          url: newCompanyEndPoint, 
          data: formData,
          headers: {
              'Authorization': 'JWT '+localStorage.getItem('token'),
              'content-type': 'multipart-form-data'
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
                    <div id="new-company-wrapper">
                        <form onSubmit={this.submitNewCompany}>
                            <div>
                                <h2>Create a new company</h2>
                            </div>
                            <section className="new-company-section"> 
                                <div className="new-company-label">
                                    <p>Company Name:</p>
                                </div>
                                <div className="new-company-input">
                                    <input type="text" value={this.state.companyName} id="company-name-input" onChange={this.updateCompanyName}/>
                                </div>
                            </section>
                            <section className="new-company-section">
                                <div className="new-company-label">
                                    <p>Small Logo:</p>
                                </div>
                                <div className="new-company-input">
                                    <input type="file" name="small_logo" onChange={this.updateSmallLogo}/>
                                </div>
                            </section>
                            <section className="new-company-section">
                                <div className="new-company-label">
                                    <p>Large Logo:</p>
                                </div>
                                <div className="new-company-input">
                                    <input type="file" name="large_logo" onChange={this.updateLargeLogo}/>
                                </div>
                            </section>
                            <section id="new-company-description">
                                <section id="company-description-title">
                                    <p>Company Description:</p>
                                </section>
                               
                                <section id="editor-buttons">
                                    <button onClick={this.onUnderlineClick} type="button" className="editor-button"><i class="fas fa-underline"></i></button>
                                    <button onClick={this.onBoldClick} type="button" className="editor-button"><i class="fas fa-bold"></i></button>
                                    <button onClick={this.onItalicClick} type="button" className="editor-button"><i class="fas fa-italic"></i></button>
                                </section>
                                <div id="new-company-editor">
                                    
                                    <Editor 
                                    editorState={this.state.editorState} 
                                    handleKeyCommand={this.handleKeyCommand}
                                    onChange={this.onChange} />
                                </div>
                            </section>
                            <section id="new-company-submit-container">
                                <input type="submit"/>
                            </section>
                        </form>
                        {
                            this.state.formError &&
                            <div id="form-error">
                                <p>Something went wrong, your new company was not created.</p>
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

export default NewCompanyPage;