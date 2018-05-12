import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../../components/global/Header.js';
import Footer from '../../components/global/Footer.js';
import JobsPage from '../../components/jobs/JobsPage.js';
import JobPost from '../../components/jobs/JobPost.js';
import Home from '../../components/global/Home.js';
import About from '../../components/global/About.js';
import Contact from '../../components/global/Contact.js';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';


function AppRouter(props) {
    return (
    <BrowserRouter>
       <Switch>
            <Route path="/" component={Home} exact={true} />
            <Route path="/about" component={About}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/job_post/:id" component={JobPost}/>
            <Route component={NotFoundPage}/>
       </Switch>
    </BrowserRouter>
    )
}

function NotFoundPage(props) {
    return (
        <div>
            <h1>404 page</h1>
            <Link to="/">Got to homepage</Link>
        </div>
    );
}

export default AppRouter;