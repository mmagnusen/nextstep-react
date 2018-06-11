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
            salary: this.props.salary,
            slug: this.props.slug,
            title: this.props.title,
            id: this.props.id
        }
    }

    render() {
        return (
            <div className="single-company-job">
                <div className="single-job-header">
                    <h1>Job: {this.state.title}, {this.state.posted_by_company}</h1>
                    <Link to={"/view_job/" + this.state.id}><button>View Job</button></Link>
                </div>
            </div>
        )
    }
}

export default SingleDashboardJob;