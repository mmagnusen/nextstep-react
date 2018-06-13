import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

class SingleDashboardJob extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            area: this.props.area,
            created_date: this.props.created_date,
            description: this.props.description,
            experience: this.props.experience,
            hours: this.props.hours,
            location: this.props.location,
            posted_by_company: this.props.posted_by_company,
            companyName: this.props.companyName,
            salary: this.props.salary,
            slug: this.props.slug,
            title: this.props.title,
            id: this.props.id,
            userCompanies: this.props.userCompanies
        }
    }

    render() {
        return (
            <div className="single-company-job">
                <div className="single-job-titles">
                    <h1>Job: {this.state.title}, {this.state.posted_by_company}</h1>
                </div>
                <div className="single-job-button-containers">
                    <Link  to={{ pathname: "/view_job/" + this.state.id, state: { userCompanies: this.state.userCompanies, companyName: this.state.companyName} }}><button>View Job</button></Link>
                </div>
            </div>
        )
    }
}

export default SingleDashboardJob;