import React from 'react';
import SingleDashboardJob from '../jobs/SingleDashboardJob.js';

class Company extends React.Component {
    constructor(props) {
        super(props);

        
    }

    render() {
        return (
            <div className="single-company">
                <div className="company-header"><h2>{this.props.title}</h2></div>
                <div className="button-container"><button className="delete-company-button">Delete</button></div>
                <section>
                    <h1>Job Postings for this {this.props.title}</h1>
                    <SingleDashboardJob/>
                    <SingleDashboardJob/>
                </section>    
            </div>
        )
    }
}

export default Company;