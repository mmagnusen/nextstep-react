import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

class ResumeOnDashboard extends React.Component {
    constructor(props) {
        super(props);

        const name = this.props.name;
        const share_url = this.props.share_url;
        const pk = this.props.pk;

        this.state = {
            name: name,
            share_url: share_url,
            'pk': pk,
        }
    }

    render() {
        return (
            <section className="single-resume-container">
                <div className="single-resume-title-div">
                    <h3>{this.state.name}</h3>
                </div>
                <div className="single-resume-view-div">
                    <Link to={"/edit_resume/" + this.state.share_url}><button> Edit </button></Link>
                </div>
            </section>
        )
    }
}

export default ResumeOnDashboard;