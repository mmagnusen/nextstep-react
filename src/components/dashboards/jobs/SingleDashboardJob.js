import React from 'react';
import JobEditModal from './JobEditModal.js';

class SingleDashboardJob extends React.Component {
    constructor(props) {
        super(props);

        this.openJobModal = this.openJobModal.bind(this);
        this.closeJobModal = this.closeJobModal.bind(this);

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

    openJobModal() {
        this.setState({
            isOpen: true
        })
    }

    closeJobModal() {
        this.setState({
            isOpen: false
        })
    }

    render() {
        return (
            <div className="single-company-job">
            <div className="single-job-header">
                <h1>Job: {this.state.title}, {this.state.posted_by_company}</h1>
                <button onClick={this.openJobModal}>View Job</button>
            </div>
                <JobEditModal 
                isOpen={this.state.isOpen} 
                closeJobModal={this.closeJobModal}
                area={this.state.area}
                description={this.state.description}
                experience={this.state.experience}
                hours={this.state.hours}
                location={this.state.location}
                salary={this.state.salary}
                slug={this.state.slug}
                title={this.state.title}
                posted_by_company={this.state.posted_by_company}
                id={this.state.id}
                />
            </div>
        )
    }
}

export default SingleDashboardJob;