import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../../global/Header.js';
import Footer from '../../global/Footer.js';
import axios from 'axios';
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

      const newCompanyEndPoint = 'http://localhost:8000/company/company/';
      axios.defaults.baseURL = 'https://api.example.com';
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
 
          if (response.status === 200) {

             
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
                    <form onSubmit={this.submitNewCompany}>
                        <fieldset>
                            <label for="new-company-modal-company-name">Company Name:</label>
                            <input type="text" id="new-company-modal-company-name" value={this.state.companyName} onChange={this.updateCompanyName}/>
                        </fieldset>
                        <fieldset>
                            <label>Small Logo:</label>
                            <input type="file" name="small_logo" onChange={this.updateSmallLogo}/>
                        </fieldset>
                        <fieldset>
                            <label>Large Logo:</label>
                            <input type="file" name="large_logo" onChange={this.updateLargeLogo}/>
                        </fieldset>
                        <fieldset>
                                <p>Company Description:</p>
                                <section id="editor-buttons">
                                    <button onClick={this.onUnderlineClick} type="button" className="editor-button"><i class="fas fa-underline"></i></button>
                                    <button onClick={this.onBoldClick} type="button" className="editor-button"><i class="fas fa-bold"></i></button>
                                    <button onClick={this.onItalicClick} type="button" className="editor-button"><i class="fas fa-italic"></i></button>
                                    <button onClick={this.onMediumClick} type="button" className="editor-button">Medium</button>
                                    <button onClick={this.onLargeClick} type="button" className="editor-button">Large</button>
                                    <button onClick={this.onLeftAlignClick} type="button" className="editor-button"><i class="fas fa-align-left"></i></button>
                                    <button onClick={this.onJustifyClick} type="button" className="editor-button"><i class="fas fa-align-justify"></i></button>
                                    <button onClick={this.onRightAlignClick} type="button" className="editor-button"><i class="fas fa-align-right"></i></button>
                                    <button onClick={this.onUnorderedListClick} type="button" className="editor-button"><i class="fas fa-list-ul"></i></button>
                                    <button onClick={this.onOrderedListClick} type="button" className="editor-button"><i class="fas fa-list-ol"></i></button>
                                </section>
                                <div id="employer-draft">
                                    
                                    <Editor 
                                    editorState={this.state.editorState} 
                                    handleKeyCommand={this.handleKeyCommand}
                                    onChange={this.onChange} />
                                </div>
                            </fieldset>
                        <input type="submit"/>
                    </form>
                <Footer/>
            </div>
        )
    }
}

export default NewCompanyPage;