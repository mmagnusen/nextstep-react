import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';

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
        this.updateCompanyDescription = this.updateCompanyDescription.bind(this);
        this.submitCompanyChanges = this.submitCompanyChanges.bind(this);
        this.deleteCompany = this.deleteCompany.bind(this);

        this.state = {
            companyName: this.props.companyName,
            companyDescription: this.props.companyDescription,
            companyId: this.props.companyId,
            token: token,
            viewMode: true,
            editMode: false,
        }
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

    updateCompanyDescription(e) {
        this.setState({
            companyDescription: e.target.value
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
                description: this.state.companyDescription,
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
                <h3>Company Description:</h3>
                <p>{this.props.companyDescription}</p>
            </div>
            <button onClick={this.enableEditMode}>Edit Company</button>
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
                    <label for="view-company-modal-company-description">Company Description:</label>
                    <textarea id="view-company-modal-company-description" value={this.state.companyDescription} onChange={this.updateCompanyDescription}/>
                </fieldset>
                <input type="submit"/>
            </form> 
            <button onClick={this.enableViewMode}>Cancel Changes</button>
            <button onClick={this.deleteCompany}>Delete Company</button>
        </div>
        }
      </Modal>
    )}
  
}

export default ViewCompanyModal;