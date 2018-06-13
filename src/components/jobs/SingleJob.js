import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class SingleJob extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            jobCompanyId: this.props.jobCompany
        }
    }

    componentWillMount() {
      const existingCompanyEndPoint = `/company/api/${this.props.jobCompany}/`;
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
 
        this.setState({
            company: response.data
        })
      })
      .catch(error => {
          console.log("this is an error yo", error);
        })
    }

    render() {
    return (
        <div className="single-job">
            <div className="front-list-title">
                <h2>{this.props.jobTitle}</h2>
                {this.state.company && 
                    <div>
                        <p>{this.state.company.name}</p>
                    </div>
                }
            </div>
            <div className="front-list-middle">
                <p>{this.props.jobSlug}</p>
                <div className="front-list-details">
                    <div className="front-list-description-group"><i className="far fa-clock front-list-icon"></i><p>{this.props.jobHours}</p></div>
                    <div className="front-list-description-group"><i className="fas fa-flask front-list-icon"></i><p>{this.props.jobArea}</p></div>
                    <div className="front-list-description-group"><i className="fas fa-map-marker-alt front-list-icon"></i><p>{this.props.jobLocation}</p></div>
                    <div className="front-list-description-group"><i className="fas fa-dollar-sign front-list-icon"></i><p>{this.props.jobSalary}</p></div>
                </div>
            </div>
            <div className="front-listing-company-logo">
                {this.state.company && 
               
                        <img src={this.state.company.small_logo} alt="company logo"/>
                    
                }
            </div>
        </div>
    );
    }
}

export default SingleJob;