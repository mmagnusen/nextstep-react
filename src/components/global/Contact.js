import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.js';
import Footer from './Footer.js';
import JobsPage from '../jobs/JobsPage.js';

function Contact(props) {

    console.log(props);

        return (
            <div>
                <Header>
                    {props.children}
                </Header>
                <div id="contact-outer-wrapper">
                    <div id="contact-inner-wrapper">
                        <div id="contact-title">
                            <h1>Contact</h1>
                        </div>
                        <div>
                            <h2>Adding a listing</h2>
                            <p>To add a job post to the site, please email marilyn@thenextstep.io</p>
                            <p>Posts should follow the following format:</p>
                            <ul>
                                <li><p>Role being advertised</p></li>
                                <li><p>Tagline (1 short sentence displayed on job listing page)</p></li>
                                <li><p>Hours - full-time or part-time</p></li>
                                <li><p>Area: Front-end, Full-stack, Designer etc</p></li>
                                <li><p>Location</p></li>
                                <li><p>Salary - please note, we will not publish posts that do not list a salary range.</p></li>
                                <li><p>Full job description - this can be as long as you like</p></li>
                                <li><p>Please also attach a 300x300px logo for your company</p></li>
                            </ul>
                            <h2>Additional notes</h2>
                            <p>We're happy to post internships, but these must be paid internships</p>
                            <p>You're also welcome to post contract/freelance projects</p>
                            <p>Please don't forget to include details of how to apply for the post</p>
                        </div>
                    </div>
                </div>

                <Footer/>

            </div>
        );
     
}

export default Contact;