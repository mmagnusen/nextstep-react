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
                            <h2>Adding a job listing</h2>
                            <p>To add a job post to the site, please register for a new account by hitting the register/login button</p>
                            <p>Get started by creating a new company. This allows you to create multiple job posts for each company, 
                                re-using the same company details</p>
                            <p>All fields should be completed including:</p>
                            <ul>
                                <li><p>Role being advertised</p></li>
                                <li><p>Tagline (1 short sentence displayed on job listing page)</p></li>
                                <li><p>Hours: full-time or part-time</p></li>
                                <li><p>Area: Front-end, Full-stack, Designer etc</p></li>
                                <li><p>Location</p></li>
                                <li><p>Salary</p></li>
                                <li><p>Full job description - please make this as accurate as possible</p></li>
                            </ul>
                            <h2>Additional notes</h2>
                            <p>We're happy to post internships, but these must be paid internships. Any unpaid interships will be removed.</p>
                            <p>You're also welcome to post contract/freelance projects.</p>
                            <p>Please remember to include details of how to apply for the post.</p>
                        </div>

                        <div id="contact-details">
                            <h2>Contact Us</h2>
                            <p>Find us on twitter: <a href="https://twitter.com/nextstep_online"><i class="fab fa-twitter twitter"></i>@nextstep_online</a></p>
                            <p>Reach out by email: marilyn@thenextstep.io</p>
                        </div>
                    </div>
                    
                </div>

                <Footer/>

            </div>
        );
     
}

export default Contact;