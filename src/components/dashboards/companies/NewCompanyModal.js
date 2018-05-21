import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#app');

class NewCompanyModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
  
    return (
      <Modal 
        isOpen={this.props.newCompanyModalIsOpen}
        contentLabel="learn-path-modal"
        onRequestClose={this.props.closeNewCompanyModal}
      >
        <form>
            <fieldset>
                <label for="new-company-modal-company-name">Company Name:</label>
                <input type="text" id="new-company-modal-company-name"/>
            </fieldset>
            <fieldset>
                <label for="new-company-modal-company-description">Company Description:</label>
                <textarea id="new-company-modal-company-description"/>
            </fieldset>
            <input type="submit"/>
        </form>
      </Modal>
    )}
  
}

export default NewCompanyModal;