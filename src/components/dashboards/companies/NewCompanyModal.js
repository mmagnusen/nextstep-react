import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'


Modal.setAppElement('#app');

class NewCompanyModal extends React.Component {

    constructor(props) {
        super(props);
        const token = localStorage.getItem('responseToken')
        this.updateCompanyName = this.updateCompanyName.bind(this);
        this.updateCompanyDescription = this.updateCompanyDescription.bind(this);
        this.submitNewCompany = this.submitNewCompany.bind(this);

        this.state = {
            companyName: "",
            companyDescription: "",
            token: token
        }
    }

    updateCompanyName(e) {
        this.setState({
            companyName: e.target.value
        });

    }

    updateCompanyDescription(e) {
        this.setState({
            companyDescription: e.target.value
        });
    }

    submitNewCompany(e) {
        e.preventDefault();

        const newCompanyEndPoint = 'http://localhost:8000/company/company/';
        axios.defaults.baseURL = 'https://api.example.com';
        axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('responseToken')
        console.log('Bearer '+localStorage.getItem('responseToken'))
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        axios({
            method: 'post',
            url: newCompanyEndPoint, 
            data: {  
                name: this.state.companyName,
                description: this.state.companyDescription,
            },
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
        .catch(error => {
            console.log("this is an error yo", error);
          })
        
    }

    render() {
  
    return (
      <Modal 
        isOpen={this.props.newCompanyModalIsOpen}
        contentLabel="learn-path-modal"
        onRequestClose={this.props.closeNewCompanyModal}
      >
        <form onSubmit={this.submitNewCompany}>
            <fieldset>
                <label for="new-company-modal-company-name">Company Name:</label>
                <input type="text" id="new-company-modal-company-name" value={this.state.companyName} onChange={this.updateCompanyName}/>
            </fieldset>
            <fieldset>
                <label for="new-company-modal-company-description">Company Description:</label>
                <textarea id="new-company-modal-company-description" value={this.state.companyDescription} onChange={this.updateCompanyDescription}/>
            </fieldset>
            <input type="submit"/>
        </form>
      </Modal>
    )}
  
}

export default NewCompanyModal;