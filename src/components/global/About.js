import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.js';
import Footer from './Footer.js';
import JobsPage from '../jobs/JobsPage.js';

class About extends React.Component {
    render() {
        return (
            <div>
                <Header>
                    {this.props.children}
                </Header>
                <h1>About</h1>

                <Footer/>

            </div>
        );
    }     
}

export default About;