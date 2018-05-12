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
                </nav>
            </div>
        </header>
    );
}

export default Header;