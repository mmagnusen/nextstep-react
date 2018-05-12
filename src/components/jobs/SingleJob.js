import React from 'react';
import ReactDOM from 'react-dom';

function SingleJob(props) {
    return (
        <div className="single-job">
            <div className="front-list-title">
                <h2>{props.jobTitle}</h2>
                <p>{props.jobCompany}</p>
            </div>
            <div className="front-list-middle">
                <p>{props.jobSlug}</p>
                <div className="front-list-details">
                    <div className="front-list-description-group"><i className="far fa-clock front-list-icon"></i><p>{props.jobHours}</p></div>
                    <div className="front-list-description-group"><i className="fas fa-flask front-list-icon"></i><p>{props.jobArea}</p></div>
                    <div className="front-list-description-group"><i className="fas fa-map-marker-alt front-list-icon"></i><p>Location: London</p></div>
                    <div className="front-list-description-group"><i className="fas fa-dollar-sign front-list-icon"></i><p>Salary: Negotiable</p></div>
                </div>
            </div>
            <div className="front-listing-company-logo"><i className="far fa-building"></i></div>
        </div>
    );
}

export default SingleJob;