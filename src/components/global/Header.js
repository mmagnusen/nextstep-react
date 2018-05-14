import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

function Header(props) {
    return (
        <header>
            <div id="header-inner">
                <div id="header-title-container">
                    <h1>The Next Step</h1>
                </div>
                <nav>
                    <NavLink to="/" activeClassName="is-active" exact={true}>Home </NavLink>
                    <NavLink to="/contact" activeClassName="is-active" exact={true}>Contact </NavLink>
                    <NavLink to="/register" activeClassName="is-active" exact={true}>Register </NavLink>
                    <NavLink to="/login" activeClassName="is-active" exact={true}>Login </NavLink>
                    <NavLink to="/dashboard" activeClassName="is-active" exact={true}>Dashboard </NavLink>
                    <NavLink to="/employee_dashboard" activeClassName="is-active" exact={true}>Employee Dashboard </NavLink>
                    <NavLink to="/employer_dashboard" activeClassName="is-active" exact={true}>Employer Dashboard </NavLink>

                    
                </nav>
            </div>
        </header>
    );
}

export default Header;