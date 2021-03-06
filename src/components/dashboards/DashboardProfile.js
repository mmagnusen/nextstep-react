import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class DashboardProfile extends React.Component {

    constructor(props) {
        super(props);

        const first_name = localStorage.getItem('first_name');
        const last_name = localStorage.getItem('last_name');
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        const user_type = localStorage.getItem('user_type');
        const pk = localStorage.getItem('pk');

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.submitProfileChange = this.submitProfileChange.bind(this);

        this.state = {
            first_name: first_name,
            last_name: last_name,
            token: token,
            email: email,
            user_type: user_type,
            pk: pk,
        }
    }

    componentWillMount() {

        const getUserDataEndpoint = '/authenticate/current_user/';
        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';
        const token = localStorage.getItem('token');
        axios({
            method: 'get',
            url: getUserDataEndpoint,
            headers: {
                'Authorization': 'JWT '+ token
                }, 
            responseType: 'json'
        })
        .then( response => { 
            console.log(' componentWillMount, authenticate/current_user response:', response.data)

            if (response.status === 200) {
                this.setState({
                    returnedResponse: response.data,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    token: response.data.token,
                    pk: response.data.pk,
                });
                localStorage.setItem('first_name', response.data.first_name);
                localStorage.setItem('last_name', response.data.last_name);
                localStorage.setItem('user_type', response.data.user_type);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('pk', response.data.pk);
                localStorage.setItem('tokenIsValid', true);

            } else {
                
            }
        })
        .catch(error => {
            console.log("this is an error yo", error);

            localStorage.clear();
                this.setState({
                    redirectToHome: true
                })

          })
    }

    handleFirstNameChange(e) {

        this.setState({
            first_name: e.target.value,
            saveChanges: true
        })
        
    }

    handleLastNameChange(e) {
        this.setState({
            last_name: e.target.value,
            saveChanges: true
        })
    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value,
            saveChanges: true
        })
    }

    submitProfileChange(e) {
        e.preventDefault();

        console.log('submitting profile changes');
        
        const token = localStorage.getItem('token');
        const updateProfileUrl = `/authenticate/users/${this.state.pk}/`;

        axios({
            method: 'put',
            url: updateProfileUrl,
            data: {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email
            },
            headers: {
                'Authorization': 'JWT '+ token
                }, 
            responseType: 'json'
        })
        .then( response => { 
            this.setState({
                returnedResponse: response
            });

            if (response.status === 200) {
                this.setState({
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    email: response.data.email,
                    user_type: response.data.user_type,
                    token: response.data.token,
                    pk: response.data.pk,
                });
                localStorage.setItem('first_name', response.data.first_name);
                localStorage.setItem('last_name', response.data.last_name);
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('user_type', response.data.user_type);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('pk', response.data.pk);
                localStorage.setItem('tokenIsValid', true);

            } else {
                
            }
        })
        .catch(error => {
            console.log("this is an error yo", error);

            localStorage.clear();
                this.setState({
                    redirectToHome: true
                })
          })

    }


    render() {
        return (
            <section id="profile-section">
                <div id="profile-section-inner">
                    <h1>Profile</h1>
                    <form onSubmit={this.submitProfileChange}>
                        <section className="profile-attribute">
                            <div className="profile-section-label">
                                <p>First Name:</p>
                            </div>
                            <div className="profile-section-value">
                                <input value={ this.state.first_name } onChange={ this.handleFirstNameChange  }/> 
                            </div>
                        </section>
                        <section className="profile-attribute">
                            <div className="profile-section-label">
                                <p>Surname:</p>
                            </div>
                            <div className="profile-section-value">
                                <input value={this.state.last_name} onChange={ this.handleLastNameChange }/>
                            </div>
                        </section>
                        <section className="profile-attribute">
                            <div className="profile-section-label">
                                <p>Email:</p>
                            </div>
                            <div className="profile-section-value">
                                <input value={this.state.email} onChange={ this.handleEmailChange }/> 
                            </div>
                        </section>
                        {
                        this.state.saveChanges == true && 

                        <section id="profile-save-changes">
                            <input type='submit'/>
                        </section> 
                        }
                </form>
            </div>
        </section>
        )
    }

}

export default DashboardProfile;