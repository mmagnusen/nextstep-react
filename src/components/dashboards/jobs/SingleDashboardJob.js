import React from 'react';
import JobEditModal from './JobEditModal.js';

class SingleDashboardJob extends React.Component {
    constructor(props) {
        super(props);

        this.openJobModal = this.openJobModal.bind(this);
        this.closeJobModal = this.closeJobModal.bind(this);

        this.state = {
            isOpen: false,
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
            <div>
                <h1>Job Title Here</h1>
                <button onClick={this.openJobModal}>Edit Job</button>
                <JobEditModal isOpen={this.state.isOpen} closeJobModal={this.closeJobModal}/>

            </div>
        )
    }
}

export default SingleDashboardJob;