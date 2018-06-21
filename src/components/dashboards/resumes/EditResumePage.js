import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../../global/Header.js';
import Footer from '../../global/Footer.js';
import axios from 'axios';
import ToolTip from './Tooltip.js';
import { Redirect } from 'react-router-dom';
import { Editor, EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import { timestamp } from 'rxjs/operators';

class EditResumePage extends React.Component {
    constructor(props) {
        super(props);

        this.updateName = this.updateName.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
        this.handleInfoMenu = this.handleInfoMenu.bind(this);
        this.submitResumeChanges = this.submitResumeChanges.bind(this);

        this.autoSave = this.autoSave.bind(this);

        const timeStamp = Date.now();

        this.state = {
            name: null,
            pk: null,
            editorState: null,
            share_url: this.props.match.params.share_url,
            redirectToDashboard: false,
            infoMenuVisible: false,
            wordCount: 1560,
            isOwner: true,
            lastSaved: timeStamp,
            timeSinceSave: 0,

            tickingTime: new Date().toLocaleString(),
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

       
            if (response.status === 200) {

                const givenContent = response.data.content;
                const parsedContent = JSON.parse(givenContent);
                const immutableContent = convertFromRaw(parsedContent);

                this.setState({
                    editorState: EditorState.createWithContent(immutableContent),
                    name: response.data.name,
                    pk: response.data.pk,
                });
                console.log('response from resume', response.data);
            } else {
                this.setState({
                    isOwner: false,
                });
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

            this.setState({
                isOwner: false,
            });
          });

    }

    componentDidMount() {
        this.intervalID = setInterval(
          () => this.tick(),
          1000
        );
      }

    tick() {
        this.setState({
            tickingTime: new Date().toLocaleString(),
        });
      }

    updateName(e) {
        this.setState({
            name: e.target.value,
        })
    }

    onChange(editorState) {
     
        this.setState({
            editorState: editorState,
        });

        this.autoSave();

        const currentTime = Date.now();

        const calculateTimeSince = currentTime - this.state.lastSaved;

        const convertedSeconds = Math.floor(calculateTimeSince/1000);

        this.setState({
            timeSinceSave: convertedSeconds,
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
   
   handleInfoMenu(e) {

    if (this.state.infoMenuVisible == false ) {
        this.setState({
            infoMenuVisible: true,
        })
    } else {
        this.setState({
            infoMenuVisible: false,
        })
    }
    
   }


   autoSave(e) {
        const newTime = Date.now();
        
        if ( newTime - this.state.lastSaved > 5000 ) {
            console.log( 'more than 30 secs');

            this.setState({
                lastSaved: newTime,
            })

            this.submitResumeChanges();

        } else {
            console.log( 'less than 30 secs');
        }

        // this.setState({
        //     time: timeStamp,
        // })

   }

  
   submitResumeChanges() {

        const existingResumeEndPoint = `/resume/resume/${this.state.pk}/`;
        axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token')
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        const editorState = this.state.editorState;

        axios({
            method: 'put',
            url: existingResumeEndPoint, 
            data: {   
                name: this.state.name,
                content: JSON.stringify(convertToRaw(editorState.getCurrentContent()))    
                },
            headers: {
                'Authorization': 'JWT '+localStorage.getItem('token')
                }, 
            responseType: 'json'
        })
        .then( response => { 
   
            if (response.status === 200) {
                
            } 
        })
        .catch(error => {
            console.log("this is an error yo", error);
          })

   }

    render() {

        if (this.state.redirectToDashboard) {
            return <Redirect to='/dashboard'/>
        } else {  
        return (
            <div>
                <Header/>
                <div id="edit-resume-outer-wrapper">
                    <section id="edit-resume-inner-wrapper">
                    {
                        this.state.isOwner === true ? 
                        <form onSubmit={this.submitResumeChanges}>
                            <div id="edit-header">
                                <section id="edit-title-div">
                                    <div id="edit-title-input">
                                        <input value={this.state.name} onChange={this.updateName}/>
                                    </div>
                                    <div id="edit-title-icon">
                                        <i class="fas fa-info-circle resume-info-icon" onClick={this.handleInfoMenu}></i>
                                    </div>
                                </section>
                                { this.state.infoMenuVisible &&
                                <div id="edit-dropdown">
                                    <ul>
                                        <li>Word Count: {this.state.wordCount}</li>
                                        <li>View share url</li>
                                        <li><Link to={"/view_resume/" + this.state.share_url}>View Resume</Link></li>
                                        <li>Download <i class="fas fa-file-pdf"></i></li>
                                    </ul>
                                </div>
                            }
                            </div>

                            {
                                this.state.editorState &&
                                <section id="edit-resume-editor">
                                <div id="tooltip-outer">
                                    <div id="tooltip-inner">
                                        <i class="fas fa-bold tooltip-icon"></i>
                                        <i class="fas fa-italic tooltip-icon"></i>
                                        <i class="fas fa-underline tooltip-icon"></i>
                                    </div>
                                </div>
                                    <Editor 
                                    editorState={this.state.editorState} 
                                    handleKeyCommand={this.handleKeyCommand}
                                    onChange={this.onChange} />
                                </section>
                            }
                            <div>
                                <div>
                                    <p>Saved {this.state.timeSinceSave} second(s) ago</p>
                                    <p>Ticking time: {this.state.tickingTime}</p>
                                </div>
                            </div>
                        </form> : 

                        <div id="no-permission-wrapper-outer">
                            <section id="no-permission-wrapper-inner">
                                <h1>Sorry, you do not have permission to view this page</h1>
                                <Link to="/">Return to homepage</Link>
                            </section>
                        </div>

                        }
                    </section>
                    
                </div>
                <Footer/>
            </div>
        )}
    }
}



const getTime = () => {

}

export default EditResumePage;