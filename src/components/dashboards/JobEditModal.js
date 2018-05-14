import React from 'react';
import Modal from 'react-modal';
import {Editor, EditorState} from 'draft-js';

Modal.setAppElement('#app');

class JobEditModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
  
    return (
      <Modal 
        isOpen={this.props.isOpen}
        contentLabel="learn-path-modal"
        onRequestClose={this.props.closeJobModal}
      >

      
      <i className="fas fa-times-circle learn-path-close" onClick={this.props.closeJobModal}></i>
      <MyEditor/>
      </Modal>
    )}
  
}

class MyEditor extends React.Component {
    constructor(props) {
      super(props);
      this.state = {editorState: EditorState.createEmpty()};
      this.onChange = (editorState) => this.setState({editorState});
    }
    render() {
      return (
          <Editor editorState={this.state.editorState} onChange={this.onChange} id="employer-draft"/>
      );
    }
  }

export default JobEditModal;