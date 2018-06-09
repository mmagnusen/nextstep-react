import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../../components/global/Header.js';
import Footer from '../../components/global/Footer.js';
import JobsPage from '../../components/jobs/JobsPage.js';
import JobPost from '../../components/jobs/JobPost.js';
import NewCompanyPage from '../../components/dashboards/companies/NewCompanyPage.js';
import ViewCompanyPage from '../../components/dashboards/companies/ViewCompanyPage.js';
import NewJobPage from '../../components/dashboards/jobs/NewJobPage.js';
import ViewJobPage from '../../components/dashboards/jobs/ViewJobPage.js';
import Home from '../../components/global/Home.js';
import About from '../../components/global/About.js';
import Contact from '../../components/global/Contact.js';
import Register from '../../components/global/Register.js';
import Login from '../../components/global/Login.js';
import MyAccount from '../../components/dashboards/MyAccount.js';
import EmployeeDashboard from '../../components/dashboards/EmployeeDashboard.js';
import EmployerDashboard from '../../components/dashboards/EmployerDashboard.js';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';


function AppRouter(props) {
    return (
    <BrowserRouter>
       <Switch>
            <Route path="/" component={Home} exact={true} />
            <Route path="/my_account" component={MyAccount}/>
            <Route path="/employee_dashboard" component={EmployeeDashboard}/>
            <Route path="/employer_dashboard" component={EmployerDashboard}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/about" component={About}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/new_company" component={NewCompanyPage}/>
            <Route path="/view_company/:id" component={ViewCompanyPage}/>
            <Route path="/new_job" component={NewJobPage}/>
            <Route path="/view_job/:id" component={ViewJobPage}/>
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