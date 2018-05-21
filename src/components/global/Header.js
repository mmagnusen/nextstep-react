import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

class Header extends React.Component {

    constructor(props) {
        super(props);

        const token = localStorage.getItem('responseToken');

        this.state = {
            token: token,
        }
    }
    
    render() {
        return (
            <header>
                <div id="header-inner">
                    <div id="header-title-container">
                        <h1>The Next Step</h1>
                    </div>
                    <nav>
                        <NavLink to="/" activeClassName="is-active" exact={true}>Home </NavLink>
                        <NavLink to="/contact" activeClassName="is-active" exact={true}>Contact </NavLink>
                        {
                            this.state.token ? <NavLink to="/employer_dashboard" activeClassName="is-active" exact={true}>Employer Dashboard </NavLink> : <NavLink to="/my_account" activeClassName="is-active" exact={true}>Login/Register </NavLink>
                        }
                          
                    </nav>
                </div>
            </header>
        );
    }
}

export default Header;