import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../global/Header.js';
import Footer from '../global/Footer.js';
import JobsPage from '../jobs/JobsPage.js';
import axios from 'axios';


class Dashboard extends React.Component { 

    render() {
        return (
            <div>
                <Header/>
                <h1>Dashboard</h1>
                <Footer/>
            </div>
        )
    }
}

export default Dashboard;